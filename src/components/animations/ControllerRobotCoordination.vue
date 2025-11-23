<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import p5 from 'p5';

const props = defineProps<{
  season: 'centerstage' | 'into-the-deep';
}>();

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  // Constants - FASTER, MORE ACCURATE
  const CANVAS_BASE_SIZE = 800;
  const CANVAS_ASPECT_RATIO = 0.7;
  const ANIMATION_SPEED = 0.04; // 2.5x faster
  const FIELD_SIZE = 360;
  
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
    
    // Apply physics
    robotX += robotVelX;
    robotY += robotVelY;
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
    const cycleDuration = props.season === 'into-the-deep' ? 10 : 11;
    
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
      if (phase < 1.5) {
        controllerInputs.driver1.leftStick.y = -0.9;
        robotVelY = -4.5;
      } else if (phase < 2.5) {
        controllerInputs.driver1.leftStick.y = 0;
        robotVelY = 0;
        controllerInputs.driver2.buttons['dpad_down'] = true;
      } else if (phase < 4) {
        controllerInputs.driver2.buttons['dpad_down'] = false;
        controllerInputs.driver2.buttons['left_bumper'] = true;
        clawAngle = p.lerp(45, 15, (phase - 2.5) / 1.5);
        if (phase > 3.5 && !sampleHeld) {
          const nearSample = samples.find(s => !s.held && !s.scored && Math.abs(s.x - robotX) < 20 && Math.abs(s.y - robotY) < 20);
          if (nearSample) { nearSample.held = true; sampleHeld = true; }
        }
      } else if (phase < 5.5) {
        controllerInputs.driver2.buttons['left_bumper'] = false;
        controllerInputs.driver2.buttons['dpad_up'] = true;
        sliderHeight = p.lerp(0, 100, (phase - 4) / 1.5);
      } else if (phase < 7.5) {
        controllerInputs.driver2.buttons['dpad_up'] = false;
        controllerInputs.driver1.leftStick.x = 0.9;
        controllerInputs.driver1.leftStick.y = -0.3;
        robotVelX = 5;
        robotVelY = -1;
      } else if (phase < 8.5) {
        controllerInputs.driver1.leftStick.x = 0;
        robotVelX = robotVelY = 0;
        controllerInputs.driver2.buttons['right_bumper'] = true;
        clawAngle = p.lerp(15, 50, (phase - 7.5) / 1);
        if (phase > 8 && sampleHeld) {
          const heldSample = samples.find(s => s.held);
          if (heldSample && robotX > 100) {
            heldSample.held = false;
            heldSample.scored = true;
            sampleHeld = false;
            samplesScored++;
          }
        }
      } else {
        controllerInputs.driver2.buttons['right_bumper'] = false;
        controllerInputs.driver1.leftStick.x = -0.8;
        robotVelX = -4;
        sliderHeight *= (1 - (phase - 8.5) / 1.5);
      }
    } else {
      // CenterStage
      if (phase < 1.5) {
        controllerInputs.driver1.leftStick.y = -0.9;
        robotVelY = -4.5;
      } else if (phase < 3) {
        controllerInputs.driver1.leftStick.y = 0;
        robotVelY = 0;
        controllerInputs.driver1.buttons['dpad_up'] = true;
        controllerInputs.driver2.buttons['left_bumper'] = true;
        sliderHeight = p.lerp(0, 40, (phase - 1.5) / 1.5);
      } else if (phase < 4.5) {
        controllerInputs.driver1.buttons['dpad_up'] = false;
        controllerInputs.driver2.buttons['left_bumper'] = false;
        controllerInputs.driver2.buttons['right_bumper'] = true;
        clawAngle = p.lerp(45, 15, (phase - 3) / 1.5);
        if (phase > 4 && !sampleHeld) {
          const nearPixel = samples.find(s => !s.held && !s.scored && Math.abs(s.x - robotX) < 20 && Math.abs(s.y - robotY) < 20);
          if (nearPixel) { nearPixel.held = true; sampleHeld = true; }
        }
      } else if (phase < 6) {
        controllerInputs.driver2.buttons['right_bumper'] = false;
        controllerInputs.driver1.buttons['dpad_up'] = true;
        sliderHeight = p.lerp(40, 90, (phase - 4.5) / 1.5);
      } else if (phase < 8) {
        controllerInputs.driver1.buttons['dpad_up'] = false;
        controllerInputs.driver1.leftStick.x = 0.9;
        controllerInputs.driver1.leftStick.y = -0.2;
        robotVelX = 5;
        robotVelY = -0.8;
      } else if (phase < 9) {
        controllerInputs.driver1.leftStick.x = 0;
        robotVelX = robotVelY = 0;
        controllerInputs.driver2.buttons['left_bumper'] = true;
        clawAngle = p.lerp(15, 50, (phase - 8) / 1);
        if (phase > 8.5 && sampleHeld) {
          const heldPixel = samples.find(s => s.held);
          if (heldPixel && robotX > 100) {
            heldPixel.held = false;
            heldPixel.scored = true;
            sampleHeld = false;
            samplesScored++;
          }
        }
      } else {
        controllerInputs.driver2.buttons['left_bumper'] = false;
        controllerInputs.driver1.leftStick.x = -0.8;
        robotVelX = -4;
        sliderHeight *= (1 - (phase - 9) / 2);
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
    
    if (props.season === 'into-the-deep') {
      if (phase < 1.5) phaseText = 'Driver 1: Navigate to sample';
      else if (phase < 2.5) phaseText = 'Driver 2: Lower intake';
      else if (phase < 4) phaseText = 'Driver 2: Grab sample';
      else if (phase < 5.5) phaseText = 'Driver 2: Raise slider';
      else if (phase < 7.5) phaseText = 'Driver 1: Navigate to HIGH BASKET';
      else if (phase < 8.5) phaseText = 'Driver 2: SCORE → 8 Points!';
      else phaseText = 'Return to start';
    } else {
      if (phase < 1.5) phaseText = 'Driver 1: Navigate to pixel';
      else if (phase < 3) phaseText = 'D1: Raise arm + D2: Open intake';
      else if (phase < 4.5) phaseText = 'Driver 2: Grab pixel';
      else if (phase < 6) phaseText = 'Driver 1: Raise arm higher';
      else if (phase < 8) phaseText = 'Driver 1: Navigate to BACKDROP';
      else if (phase < 9) phaseText = 'Driver 2: SCORE → 3 Points!';
      else phaseText = 'Return to start';
    }
    
    p.fill(0, 0, 0, 200);
    p.noStroke();
    p.rect(15 * scale, 15 * scale, p.width - 30 * scale, 40 * scale, 6 * scale);
    p.fill(...COLORS.ROBOT_GREEN as [number, number, number]);
    p.textSize(13 * scale);
    p.textAlign(p.LEFT, p.TOP);
    p.text(phaseText, 25 * scale, 25 * scale);
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
      <p class="description">Enhanced, faster-paced simulation matching game strategy</p>
    </div>
    <div ref="canvasContainer" class="canvas-container"></div>
    <div class="animation-footer">
      <p class="hint">
        <strong>Strategy:</strong>
        {{ season === 'into-the-deep' 
          ? 'Collect samples → Score in high basket (8 pts each) → Maximize efficiency' 
          : 'Collect pixels → Place on backdrop (3 pts each) → Create mosaics' 
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
