<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import p5 from 'p5';

const props = defineProps<{
  season: 'centerstage' | 'into-the-deep';
}>();

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  // Constants - Properly paced to match game structure
  const CANVAS_BASE_SIZE = 800;
  const CANVAS_ASPECT_RATIO = 0.7;
  const ANIMATION_SPEED = 0.02; // Slower, more realistic pace
  const FIELD_SIZE = 360;
  const FIELD_BOUNDS = 150; // Keep robot within field bounds
  
  // Enhanced color scheme
  const COLORS = {
    SAMPLE_YELLOW: [255, 220, 0],
    PIXEL_PURPLE: [180, 50, 255],
    BASKET_BLUE: [0, 180, 255],
    BACKDROP_BLUE: [0, 150, 200],
    ROBOT_GREEN: [0, 255, 100],
    CONTROLLER_ACTIVE: [0, 255, 150]
  };
  
  // State with physics
  let animationPhase = 0;
  let robotX = 0, robotY = 0, robotVelX = 0, robotVelY = 0;
  let robotAngle = 0;
  let sliderHeight = 0;
  let clawAngle = 45;
  let sampleHeld = false;
  let samplesScored = 0;
  let samples: Array<{x: number, y: number, held: boolean, scored: boolean}> = [];
  
  let controllerInputs = {
    driver1: { leftStick: { x: 0, y: 0 }, rightStick: { x: 0, y: 0 }, buttons: {} as Record<string, boolean> },
    driver2: { leftStick: { x: 0, y: 0 }, rightStick: { x: 0, y: 0 }, buttons: {} as Record<string, boolean> }
  };

  p.setup = () => {
    const container = canvasContainer.value;
    if (!container) return;
    const width = container.clientWidth;
    const height = Math.min(CANVAS_BASE_SIZE, width * CANVAS_ASPECT_RATIO);
    p.createCanvas(width, height);
    p.frameRate(60);
    
    // Initialize samples
    if (props.season === 'into-the-deep') {
      samples = [{x: -80, y: 40, held: false, scored: false}, {x: -60, y: 60, held: false, scored: false}];
    } else {
      samples = [{x: -70, y: 50, held: false, scored: false}];
    }
  };

  p.draw = () => {
    p.background(15, 20, 25);
    const scale = Math.min(p.width, p.height) / 700;
    animationPhase += ANIMATION_SPEED;
    
    updateAnimation(animationPhase);
    
    // Apply physics with boundary constraints
    robotX += robotVelX;
    robotY += robotVelY;
    
    // Keep robot within field bounds
    robotX = p.constrain(robotX, -FIELD_BOUNDS, FIELD_BOUNDS);
    robotY = p.constrain(robotY, -FIELD_BOUNDS / 2, FIELD_BOUNDS);
    
    robotVelX *= 0.92;
    robotVelY *= 0.92;
    
    // Draw field
    drawField(p, scale);
    
    // Draw samples
    samples.forEach(s => {
      if (!s.held && !s.scored) drawSample(p, scale, s.x, s.y);
    });
    
    // Draw robot
    p.push();
    p.translate(p.width/2 + robotX*scale, p.height*0.25 + robotY*scale);
    p.rotate(robotAngle);
    drawRobot(p, scale, sliderHeight, clawAngle);
    p.pop();
    
    // Draw held sample
    if (sampleHeld) drawSample(p, scale, robotX, robotY - 20 - sliderHeight*0.8);
    
    // Draw controllers
    p.push();
    p.translate(0, p.height * 0.6);
    drawControllers(p, scale);
    p.pop();
    
    // Draw UI
    drawUI(p, scale);
  };

  const updateAnimation = (phase: number) => {
    // Match game structure: Autonomous (3-4s) → Teleop (12-15s) → Endgame (3-4s)
    const cycleDuration = props.season === 'into-the-deep' ? 20 : 22;
    
    if (phase > cycleDuration) {
      animationPhase = 0;
      robotX = robotY = robotVelX = robotVelY = robotAngle = sliderHeight = 0;
      clawAngle = 45;
      sampleHeld = false;
      samplesScored = 0;
      samples.forEach(s => { s.held = s.scored = false; });
      controllerInputs.driver1 = { leftStick: {x:0, y:0}, rightStick: {x:0, y:0}, buttons: {} };
      controllerInputs.driver2 = { leftStick: {x:0, y:0}, rightStick: {x:0, y:0}, buttons: {} };
      return;
    }
    
    if (props.season === 'into-the-deep') {
      // AUTONOMOUS (0-3s): park robot + place sample in net zone
      if (phase < 3) {
        controllerInputs.driver1.leftStick.y = -0.7;
        robotVelY = -2.5;
      }
      // TELEOP (3-16s): collect samples and score in high basket
      else if (phase < 4.5) {
        // Driver 2: Lower intake
        controllerInputs.driver1.leftStick.y = 0;
        robotVelY = 0;
        controllerInputs.driver2.buttons['dpad_down'] = true;
      } else if (phase < 6.5) {
        // Driver 2: Close claw, grab sample
        controllerInputs.driver2.buttons['dpad_down'] = false;
        controllerInputs.driver2.buttons['left_bumper'] = true;
        clawAngle = p.lerp(45, 15, (phase - 4.5) / 2);
        if (phase > 6 && !sampleHeld) {
          const nearSample = samples.find(s => !s.held && !s.scored && Math.abs(s.x - robotX) < 25 && Math.abs(s.y - robotY) < 25);
          if (nearSample) { 
            nearSample.held = true; 
            sampleHeld = true; 
          }
        }
      } else if (phase < 9) {
        // Driver 2: Raise slider
        controllerInputs.driver2.buttons['left_bumper'] = false;
        controllerInputs.driver2.buttons['dpad_up'] = true;
        sliderHeight = p.lerp(0, 100, (phase - 6.5) / 2.5);
      } else if (phase < 12) {
        // Driver 1: Navigate to high basket
        controllerInputs.driver2.buttons['dpad_up'] = false;
        controllerInputs.driver1.leftStick.x = 0.8;
        controllerInputs.driver1.leftStick.y = -0.2;
        robotVelX = 3;
        robotVelY = -0.5;
      } else if (phase < 14) {
        // Driver 2: Release sample → SCORE
        controllerInputs.driver1.leftStick.x = 0;
        controllerInputs.driver1.leftStick.y = 0;
        robotVelX = 0;
        robotVelY = 0;
        controllerInputs.driver2.buttons['right_bumper'] = true;
        clawAngle = p.lerp(15, 50, (phase - 12) / 2);
        if (phase > 13 && sampleHeld) {
          const heldSample = samples.find(s => s.held);
          if (heldSample && robotX > 80) {
            heldSample.held = false;
            heldSample.scored = true;
            sampleHeld = false;
            samplesScored++;
          }
        }
      }
      // ENDGAME (16-20s): park in netzone or ascend
      else if (phase < 17) {
        // Return movement
        controllerInputs.driver2.buttons['right_bumper'] = false;
        controllerInputs.driver1.leftStick.x = -0.6;
        robotVelX = -2.5;
        sliderHeight *= 0.85;
      } else {
        // Park in netzone
        controllerInputs.driver1.leftStick.x = 0;
        robotVelX = 0;
        sliderHeight *= 0.8;
      }
    } else {
      // CENTERSTAGE - Similar structure
      // AUTONOMOUS (0-3s)
      if (phase < 3) {
        controllerInputs.driver1.leftStick.y = -0.7;
        robotVelY = -2.5;
      }
      // TELEOP (3-18s)
      else if (phase < 5) {
        // Raise arm + open intake
        controllerInputs.driver1.leftStick.y = 0;
        robotVelY = 0;
        controllerInputs.driver1.buttons['dpad_up'] = true;
        controllerInputs.driver2.buttons['left_bumper'] = true;
        sliderHeight = p.lerp(0, 40, (phase - 3) / 2);
      } else if (phase < 7.5) {
        // Close intake, grab pixel
        controllerInputs.driver1.buttons['dpad_up'] = false;
        controllerInputs.driver2.buttons['left_bumper'] = false;
        controllerInputs.driver2.buttons['right_bumper'] = true;
        clawAngle = p.lerp(45, 15, (phase - 5) / 2.5);
        if (phase > 7 && !sampleHeld) {
          const nearPixel = samples.find(s => !s.held && !s.scored && Math.abs(s.x - robotX) < 25 && Math.abs(s.y - robotY) < 25);
          if (nearPixel) { 
            nearPixel.held = true; 
            sampleHeld = true; 
          }
        }
      } else if (phase < 10) {
        // Raise arm higher
        controllerInputs.driver2.buttons['right_bumper'] = false;
        controllerInputs.driver1.buttons['dpad_up'] = true;
        sliderHeight = p.lerp(40, 90, (phase - 7.5) / 2.5);
      } else if (phase < 13.5) {
        // Navigate to backdrop
        controllerInputs.driver1.buttons['dpad_up'] = false;
        controllerInputs.driver1.leftStick.x = 0.8;
        controllerInputs.driver1.leftStick.y = -0.2;
        robotVelX = 3;
        robotVelY = -0.5;
      } else if (phase < 15.5) {
        // Release pixel → SCORE
        controllerInputs.driver1.leftStick.x = 0;
        controllerInputs.driver1.leftStick.y = 0;
        robotVelX = 0;
        robotVelY = 0;
        controllerInputs.driver2.buttons['left_bumper'] = true;
        clawAngle = p.lerp(15, 50, (phase - 13.5) / 2);
        if (phase > 14.5 && sampleHeld) {
          const heldPixel = samples.find(s => s.held);
          if (heldPixel && robotX > 80) {
            heldPixel.held = false;
            heldPixel.scored = true;
            sampleHeld = false;
            samplesScored++;
          }
        }
      }
      // ENDGAME (18-22s)
      else if (phase < 19) {
        // Return movement
        controllerInputs.driver2.buttons['left_bumper'] = false;
        controllerInputs.driver1.leftStick.x = -0.6;
        robotVelX = -2.5;
        sliderHeight *= 0.85;
      } else {
        // Park
        controllerInputs.driver1.leftStick.x = 0;
        robotVelX = 0;
        sliderHeight *= 0.8;
      }
    }
  };

  const drawField = (p: p5, scale: number) => {
    const fieldHeight = p.height * 0.55;
    const fieldWidth = FIELD_SIZE * scale;
    const fieldX = (p.width - fieldWidth) / 2;
    const fieldY = 20 * scale;
    
    // Field border
    p.fill(30, 35, 40);
    p.stroke(...COLORS.ROBOT_GREEN as [number, number, number], 150);
    p.strokeWeight(3 * scale);
    p.rect(fieldX, fieldY, fieldWidth, fieldWidth);
    
    // Tiles
    p.stroke(50, 55, 60);
    p.strokeWeight(1 * scale);
    for (let i = 0; i <= 6; i++) {
      p.line(fieldX + i * fieldWidth / 6, fieldY, fieldX + i * fieldWidth / 6, fieldY + fieldWidth);
      p.line(fieldX, fieldY + i * fieldWidth / 6, fieldX + fieldWidth, fieldY + i * fieldWidth / 6);
    }
    
    // Scoring zone
    const basketX = fieldX + fieldWidth - 70 * scale;
    const basketY = fieldY + 40 * scale;
    
    if (props.season === 'into-the-deep') {
      p.fill(...COLORS.BASKET_BLUE as [number, number, number], 150);
      p.stroke(...COLORS.BASKET_BLUE as [number, number, number]);
      p.strokeWeight(3 * scale);
      p.rect(basketX, basketY, 55 * scale, 55 * scale, 3 * scale);
      p.fill(...COLORS.BASKET_BLUE as [number, number, number]);
      p.noStroke();
      p.textSize(10 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('HIGH\nBASKET\n8 PTS', basketX + 27.5 * scale, basketY + 27.5 * scale);
    } else {
      p.fill(...COLORS.BACKDROP_BLUE as [number, number, number], 150);
      p.stroke(...COLORS.BACKDROP_BLUE as [number, number, number]);
      p.strokeWeight(3 * scale);
      p.rect(basketX, basketY, 55 * scale, 70 * scale, 3 * scale);
      p.fill(...COLORS.BACKDROP_BLUE as [number, number, number]);
      p.noStroke();
      p.textSize(9 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('BACKDROP\n3 PTS', basketX + 27.5 * scale, basketY + 60 * scale);
    }
    
    // Score
    p.fill(...COLORS.ROBOT_GREEN as [number, number, number]);
    p.textSize(14 * scale);
    p.textAlign(p.LEFT, p.TOP);
    p.text(`Scored: ${samplesScored}`, fieldX + 10 * scale, fieldY + 10 * scale);
  };

  const drawRobot = (p: p5, scale: number, sliderH: number, clawAng: number) => {
    const s = scale * 0.9;
    
    // Chassis
    p.fill(50, 55, 65);
    p.stroke(...COLORS.ROBOT_GREEN as [number, number, number]);
    p.strokeWeight(2 * s);
    p.rect(-35 * s, -25 * s, 70 * s, 50 * s, 5 * s);
    
    // Control hub
    p.fill(0, 150, 50);
    p.rect(-12 * s, -12 * s, 24 * s, 24 * s, 2 * s);
    
    // Mecanum wheels
    [-32, 32].forEach(x => [-22, 22].forEach(y => {
      p.fill(70, 70, 70);
      p.ellipse(x * s, y * s, 14 * s, 20 * s);
    }));
    
    // Slider
    p.stroke(120, 120, 120);
    p.strokeWeight(4 * s);
    p.line(0, -25 * s, 0, -85 * s);
    
    // Carriage
    p.push();
    p.translate(0, -25 * s - sliderH * s * 0.6);
    p.fill(70, 75, 80);
    p.stroke(...COLORS.ROBOT_GREEN as [number, number, number]);
    p.strokeWeight(2 * s);
    p.rect(-18 * s, -12 * s, 36 * s, 18 * s, 3 * s);
    
    // Claw arms
    [-12, 12].forEach((side, i) => {
      p.push();
      p.translate(side * s, 6 * s);
      p.rotate((i === 0 ? -1 : 1) * clawAng * Math.PI / 180);
      p.fill(80, 180, 80);
      p.rect(-4 * s, 0, 8 * s, 25 * s, 2 * s);
      p.fill(...COLORS.ROBOT_GREEN as [number, number, number], 200);
      p.circle(0, 20 * s, 10 * s);
      p.pop();
    });
    
    p.pop();
  };

  const drawSample = (p: p5, scale: number, x: number, y: number) => {
    const sx = p.width/2 + x*scale;
    const sy = p.height*0.25 + y*scale;
    const color = props.season === 'into-the-deep' ? COLORS.SAMPLE_YELLOW : COLORS.PIXEL_PURPLE;
    
    p.fill(...color as [number, number, number]);
    p.stroke(color[0]-50, color[1]-50, color[2]);
    p.strokeWeight(2 * scale);
    
    if (props.season === 'into-the-deep') {
      p.beginShape();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        p.vertex(sx + Math.cos(angle) * 10 * scale, sy + Math.sin(angle) * 10 * scale);
      }
      p.endShape(p.CLOSE);
    } else {
      p.rect(sx - 9 * scale, sy - 9 * scale, 18 * scale, 18 * scale, 2 * scale);
    }
  };

  const drawControllers = (p: p5, scale: number) => {
    [0.25, 0.75].forEach((pos, i) => {
      p.push();
      p.translate(p.width * pos, p.height * 0.08);
      drawController(p, scale * 1.1, i === 0 ? controllerInputs.driver1 : controllerInputs.driver2, i + 1);
      p.pop();
    });
  };

  const drawController = (p: p5, scale: number, inputs: typeof controllerInputs.driver1, driverNum: number) => {
    const activeColor = COLORS.CONTROLLER_ACTIVE;
    
    // Body
    p.fill(55, 60, 70);
    p.stroke(...COLORS.ROBOT_GREEN as [number, number, number], 120);
    p.strokeWeight(2 * scale);
    p.beginShape();
    [-50, 50, 60, 50, -50, -60].forEach((x, i) => {
      const y = [25, 25, 0, -25, -25, 0][i];
      p.vertex(x * scale, y * scale);
    });
    p.endShape(p.CLOSE);
    
    // Grips
    [-40, 40].forEach(x => p.ellipse(x * scale, 10 * scale, 25 * scale, 35 * scale));
    
    // Sticks
    [-30, 30].forEach((x, i) => {
      const stick = i === 0 ? inputs.leftStick : inputs.rightStick;
      const active = stick.x !== 0 || stick.y !== 0;
      p.fill(active ? activeColor[0] : 70, active ? activeColor[1] : 75, active ? activeColor[2] : 80);
      p.stroke(active ? p.color(...activeColor as [number, number, number]) : p.color(100, 100, 100));
      p.strokeWeight(active ? 3 * scale : 1 * scale);
      p.circle(x * scale + stick.x * 10 * scale, stick.y * 10 * scale, 18 * scale);
    });
    
    // D-pad
    const dpadActive = inputs.buttons['dpad_up'] || inputs.buttons['dpad_down'];
    p.fill(dpadActive ? activeColor[0] : 60, dpadActive ? activeColor[1] : 65, dpadActive ? activeColor[2] : 70);
    p.rect(-38 * scale, -23 * scale, 16 * scale, 6 * scale);
    p.rect(-33 * scale, -28 * scale, 6 * scale, 16 * scale);
    
    // Bumpers
    [inputs.buttons['left_bumper'], inputs.buttons['right_bumper']].forEach((active, i) => {
      p.fill(active ? activeColor[0] : 60, active ? activeColor[1] : 65, active ? activeColor[2] : 70);
      p.rect((i === 0 ? -50 : 20) * scale, -32 * scale, 30 * scale, 5 * scale, 2 * scale);
    });
    
    // Label
    p.fill(...COLORS.ROBOT_GREEN as [number, number, number]);
    p.noStroke();
    p.textSize(11 * scale);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`Driver ${driverNum}`, 0, 40 * scale);
  };

  const drawUI = (p: p5, scale: number) => {
    const phase = animationPhase;
    let phaseText = '';
    let gamePhase = '';
    
    if (props.season === 'into-the-deep') {
      if (phase < 3) {
        gamePhase = 'AUTONOMOUS';
        phaseText = 'Park robot in netzone (3 pts)';
      } else if (phase < 4.5) {
        gamePhase = 'TELEOP';
        phaseText = 'Driver 2: Lower intake';
      } else if (phase < 6.5) {
        gamePhase = 'TELEOP';
        phaseText = 'Driver 2: Close claw → Grab sample';
      } else if (phase < 9) {
        gamePhase = 'TELEOP';
        phaseText = 'Driver 2: Raise slider';
      } else if (phase < 12) {
        gamePhase = 'TELEOP';
        phaseText = 'Driver 1: Navigate to HIGH BASKET';
      } else if (phase < 14) {
        gamePhase = 'TELEOP';
        phaseText = `Driver 2: Release sample → SCORE! (8 pts) | Scored: ${samplesScored}`;
      } else if (phase < 16) {
        gamePhase = 'ENDGAME';
        phaseText = 'Continue scoring samples';
      } else {
        gamePhase = 'ENDGAME';
        phaseText = 'Park in netzone (3 pts)';
      }
    } else {
      if (phase < 3) {
        gamePhase = 'AUTONOMOUS';
        phaseText = 'Park robot (3 pts)';
      } else if (phase < 5) {
        gamePhase = 'TELEOP';
        phaseText = 'D1: Raise arm + D2: Open intake';
      } else if (phase < 7.5) {
        gamePhase = 'TELEOP';
        phaseText = 'Driver 2: Close intake → Grab pixel';
      } else if (phase < 10) {
        gamePhase = 'TELEOP';
        phaseText = 'Driver 1: Raise arm higher';
      } else if (phase < 13.5) {
        gamePhase = 'TELEOP';
        phaseText = 'Driver 1: Navigate to BACKDROP';
      } else if (phase < 15.5) {
        gamePhase = 'TELEOP';
        phaseText = `Driver 2: Release pixel → SCORE! (3 pts) | Scored: ${samplesScored}`;
      } else if (phase < 18) {
        gamePhase = 'ENDGAME';
        phaseText = 'Continue scoring pixels';
      } else {
        gamePhase = 'ENDGAME';
        phaseText = 'Park robot (3 pts)';
      }
    }
    
    // UI Box
    p.fill(0, 0, 0, 200);
    p.noStroke();
    p.rect(15 * scale, 15 * scale, p.width - 30 * scale, 50 * scale, 6 * scale);
    
    // Game Phase Label
    p.fill(...COLORS.ROBOT_GREEN as [number, number, number]);
    p.textSize(11 * scale);
    p.textAlign(p.LEFT, p.TOP);
    p.textStyle(p.BOLD);
    p.text(gamePhase, 25 * scale, 22 * scale);
    
    // Phase Text
    p.textStyle(p.NORMAL);
    p.textSize(12 * scale);
    p.text(phaseText, 25 * scale, 38 * scale);
  };

  p.windowResized = () => {
    const container = canvasContainer.value;
    if (!container) return;
    const width = container.clientWidth;
    const height = Math.min(CANVAS_BASE_SIZE, width * CANVAS_ASPECT_RATIO);
    p.resizeCanvas(width, height);
  };
};

onMounted(() => {
  if (canvasContainer.value) {
    p5Instance = new p5(sketch, canvasContainer.value);
  }
});

onBeforeUnmount(() => {
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }
});
</script>

<template>
  <div class="controller-robot-coordination">
    <div class="animation-header">
      <h4>{{ season === 'into-the-deep' ? 'Into the Deep' : 'CenterStage' }} - Controller-Robot Coordination</h4>
      <p class="description">Simulation following game structure: Autonomous → Teleop → Endgame</p>
    </div>
    <div ref="canvasContainer" class="canvas-container"></div>
    <div class="animation-footer">
      <p class="hint">
        <strong>Game Structure:</strong>
        {{ season === 'into-the-deep' 
          ? 'Autonomous (park + sample) → Teleop (collect & score in high basket: 8 pts) → Endgame (park or ascend)' 
          : 'Autonomous (park) → Teleop (collect & place on backdrop: 3 pts) → Endgame (park)' 
        }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.controller-robot-coordination {
  width: 100%;
  margin: 2vw 0;
  background: linear-gradient(135deg, rgba(0, 20, 30, 0.95), rgba(0, 40, 50, 0.95));
  border: 0.2vw solid rgba(0, 255, 100, 0.5);
  border-radius: 0.8vw;
  padding: 2vw;
  overflow: hidden;
  box-shadow: 0 0.5vw 2vw rgba(0, 255, 100, 0.15);
}

.animation-header {
  text-align: center;
  margin-bottom: 1.5vw;
  padding-bottom: 1vw;
  border-bottom: 0.1vw solid rgba(0, 255, 100, 0.3);
}

.animation-header h4 {
  color: var(--mechabyte-green);
  font-size: 1.6vw;
  margin-bottom: 0.5vw;
  text-shadow: 0 0 1vw rgba(0, 255, 100, 0.4);
}

.description {
  color: #bbb;
  font-size: 1vw;
  font-style: italic;
}

.canvas-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(10, 15, 20, 0.6);
  border-radius: 0.5vw;
  border: 0.1vw solid rgba(0, 255, 100, 0.2);
}

.animation-footer {
  text-align: center;
  margin-top: 1.5vw;
  padding-top: 1vw;
  border-top: 0.1vw solid rgba(0, 255, 100, 0.3);
}

.hint {
  color: #aaa;
  font-size: 0.95vw;
}

.hint strong {
  color: var(--mechabyte-green);
}

@media only screen and (max-width: 1000px) {
  .controller-robot-coordination {
    border: 2px solid rgba(0, 255, 100, 0.5);
    border-radius: 10px;
    padding: 20px;
  }

  .animation-header h4 {
    font-size: 20px;
  }

  .description {
    font-size: 14px;
  }

  .hint {
    font-size: 13px;
  }
}
</style>
