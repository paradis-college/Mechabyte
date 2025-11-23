<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import p5 from 'p5';

const props = defineProps<{
  season: 'centerstage' | 'into-the-deep';
}>();

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  // Animation constants
  const CANVAS_BASE_SIZE = 700;
  const CANVAS_ASPECT_RATIO = 0.75;
  
  // Animation state
  let animationPhase = 0;
  let controllerInputs = {
    driver1: { leftStick: { x: 0, y: 0 }, rightStick: { x: 0, y: 0 }, buttons: {} as Record<string, boolean> },
    driver2: { leftStick: { x: 0, y: 0 }, rightStick: { x: 0, y: 0 }, buttons: {} as Record<string, boolean> }
  };
  
  // Robot state
  let robotX = 0;
  let robotY = 0;
  let robotAngle = 0;
  let sliderHeight = 0;
  let clawOpen = true;
  let sampleHeld = false;
  let sampleX = 0;
  let sampleY = 0;

  p.setup = () => {
    const container = canvasContainer.value;
    if (!container) return;
    
    const width = container.clientWidth;
    const height = Math.min(CANVAS_BASE_SIZE, width * CANVAS_ASPECT_RATIO);
    p.createCanvas(width, height);
    p.frameRate(30);
  };

  p.draw = () => {
    // Background
    p.background(15, 20, 25);
    
    const scale = Math.min(p.width, p.height) / 700;
    animationPhase += 0.015;
    
    // Update animation based on phase
    updateAnimation(animationPhase);
    
    // Draw field (top half)
    p.push();
    p.translate(0, 0);
    drawField(p, scale);
    p.pop();
    
    // Draw robot on field
    p.push();
    p.translate(p.width / 2 + robotX * scale, 150 * scale + robotY * scale);
    p.rotate(robotAngle);
    drawRobot(p, scale, sliderHeight, clawOpen);
    p.pop();
    
    // Draw sample if present
    if (sampleX !== 0 || sampleY !== 0 || sampleHeld) {
      drawSample(p, scale);
    }
    
    // Draw controllers (bottom half)
    p.push();
    p.translate(0, p.height * 0.55);
    drawControllers(p, scale);
    p.pop();
    
    // Draw labels and instructions
    drawPhaseLabel(p, scale);
  };

  const updateAnimation = (phase: number) => {
    const p5 = Math.PI;
    
    // Reset after full cycle
    if (phase > 20) {
      animationPhase = 0;
      robotX = 0;
      robotY = 0;
      robotAngle = 0;
      sliderHeight = 0;
      clawOpen = true;
      sampleHeld = false;
      sampleX = 0;
      sampleY = 0;
      return;
    }
    
    if (props.season === 'into-the-deep') {
      // Phase 1: Driver 1 moves robot forward to sample (0-3s)
      if (phase < 3) {
        controllerInputs.driver1.leftStick.y = -0.8;
        robotY = phase * 20;
      }
      // Phase 2: Driver 2 lowers intake, Driver 1 stops (3-5s)
      else if (phase < 5) {
        controllerInputs.driver1.leftStick.y = 0;
        controllerInputs.driver2.buttons['dpad_down'] = true;
        // Sample appears on field
        if (sampleX === 0 && sampleY === 0) {
          sampleX = 0;
          sampleY = 60 + 30;
        }
      }
      // Phase 3: Driver 2 closes intake to grab sample (5-7s)
      else if (phase < 7) {
        controllerInputs.driver2.buttons['dpad_down'] = false;
        controllerInputs.driver2.buttons['left_bumper'] = true;
        clawOpen = false;
        if (phase > 6) {
          sampleHeld = true;
        }
      }
      // Phase 4: Driver 2 raises slider (7-10s)
      else if (phase < 10) {
        controllerInputs.driver2.buttons['left_bumper'] = false;
        controllerInputs.driver2.buttons['dpad_up'] = true;
        sliderHeight = (phase - 7) * 30;
      }
      // Phase 5: Driver 1 moves robot to basket (10-13s)
      else if (phase < 13) {
        controllerInputs.driver2.buttons['dpad_up'] = false;
        controllerInputs.driver1.leftStick.x = 0.8;
        robotX = (phase - 10) * 25;
      }
      // Phase 6: Driver 2 opens intake to release sample (13-15s)
      else if (phase < 15) {
        controllerInputs.driver1.leftStick.x = 0;
        controllerInputs.driver2.buttons['right_bumper'] = true;
        clawOpen = true;
        if (phase > 14) {
          sampleHeld = false;
          // Sample flies to basket
          const t = (phase - 14);
          sampleX = robotX + 50;
          sampleY = robotY - 80 - t * 20;
        }
      }
      // Phase 7: Reset (15-20s)
      else {
        controllerInputs.driver2.buttons['right_bumper'] = false;
        const t = (phase - 15) / 5;
        sliderHeight = sliderHeight * (1 - t);
        if (phase > 18) {
          sampleX = 0;
          sampleY = 0;
        }
      }
    } else if (props.season === 'centerstage') {
      // CenterStage: Collect pixel and place on backdrop
      // Phase 1: Driver 1 moves robot forward to pixel (0-3s)
      if (phase < 3) {
        controllerInputs.driver1.leftStick.y = -0.8;
        robotY = phase * 20;
      }
      // Phase 2: Driver 1 raises arm, Driver 2 opens intake (3-5s)
      else if (phase < 5) {
        controllerInputs.driver1.leftStick.y = 0;
        controllerInputs.driver1.buttons['dpad_up'] = true;
        controllerInputs.driver2.buttons['left_bumper'] = true;
        // Pixel appears on field
        if (sampleX === 0 && sampleY === 0) {
          sampleX = 0;
          sampleY = 60 + 30;
        }
      }
      // Phase 3: Driver 2 closes intake to grab pixel (5-7s)
      else if (phase < 7) {
        controllerInputs.driver1.buttons['dpad_up'] = false;
        controllerInputs.driver2.buttons['left_bumper'] = false;
        controllerInputs.driver2.buttons['right_bumper'] = true;
        clawOpen = false;
        if (phase > 6) {
          sampleHeld = true;
        }
      }
      // Phase 4: Driver 1 raises arm more (7-10s)
      else if (phase < 10) {
        controllerInputs.driver2.buttons['right_bumper'] = false;
        controllerInputs.driver1.buttons['dpad_up'] = true;
        sliderHeight = (phase - 7) * 30;
      }
      // Phase 5: Driver 1 moves robot to backdrop (10-13s)
      else if (phase < 13) {
        controllerInputs.driver1.buttons['dpad_up'] = false;
        controllerInputs.driver1.leftStick.x = 0.8;
        robotX = (phase - 10) * 25;
      }
      // Phase 6: Driver 2 opens intake to release pixel (13-15s)
      else if (phase < 15) {
        controllerInputs.driver1.leftStick.x = 0;
        controllerInputs.driver2.buttons['left_bumper'] = true;
        clawOpen = true;
        if (phase > 14) {
          sampleHeld = false;
          // Pixel flies to backdrop
          const t = (phase - 14);
          sampleX = robotX + 50;
          sampleY = robotY - 80 - t * 20;
        }
      }
      // Phase 7: Reset (15-20s)
      else {
        controllerInputs.driver2.buttons['right_bumper'] = false;
        const t = (phase - 15) / 5;
        sliderHeight = sliderHeight * (1 - t);
        if (phase > 18) {
          sampleX = 0;
          sampleY = 0;
        }
      }
    }
  };

  const drawField = (p: p5, scale: number) => {
    const fieldHeight = p.height * 0.5;
    
    // Field background
    p.fill(25, 30, 35);
    p.noStroke();
    p.rect(0, 0, p.width, fieldHeight);
    
    // Grid lines
    p.stroke(40, 45, 50);
    p.strokeWeight(1);
    for (let i = 0; i < 10; i++) {
      p.line(i * (p.width / 10), 0, i * (p.width / 10), fieldHeight);
      p.line(0, i * (fieldHeight / 10), p.width, i * (fieldHeight / 10));
    }
    
    // Scoring zone (right side) - Basket or Backdrop
    p.fill(0, 100, 200, 150);
    p.stroke(0, 255, 255);
    p.strokeWeight(2 * scale);
    p.rect(p.width - 80 * scale, 50 * scale, 60 * scale, 60 * scale);
    p.fill(0, 255, 255);
    p.noStroke();
    p.textSize(9 * scale);
    p.textAlign(p.CENTER, p.CENTER);
    const scoringLabel = props.season === 'into-the-deep' ? 'HIGH\nBASKET' : 'BACK\nDROP';
    p.text(scoringLabel, p.width - 50 * scale, 80 * scale);
    
    // Sample/Pixel zone (center-left)
    p.fill(255, 200, 0, 100);
    p.stroke(255, 200, 0);
    p.strokeWeight(2 * scale);
    p.circle(p.width / 2, 200 * scale, 30 * scale);
    p.fill(255, 200, 0);
    p.noStroke();
    p.textSize(8 * scale);
    const itemLabel = props.season === 'into-the-deep' ? 'SAMPLE' : 'PIXEL';
    p.text(itemLabel, p.width / 2, 230 * scale);
  };

  const drawRobot = (p: p5, scale: number, sliderH: number, isClawOpen: boolean) => {
    // Robot chassis
    p.fill(40, 45, 50);
    p.stroke(0, 255, 0);
    p.strokeWeight(2 * scale);
    p.rect(-30 * scale, -20 * scale, 60 * scale, 40 * scale, 3 * scale);
    
    // Wheels
    p.fill(60, 60, 60);
    p.circle(-25 * scale, -18 * scale, 10 * scale);
    p.circle(25 * scale, -18 * scale, 10 * scale);
    p.circle(-25 * scale, 18 * scale, 10 * scale);
    p.circle(25 * scale, 18 * scale, 10 * scale);
    
    // Slider (vertical rail)
    p.stroke(100, 100, 100);
    p.strokeWeight(3 * scale);
    p.line(0, -20 * scale, 0, -20 * scale - 50 * scale);
    
    // Slider carriage
    p.push();
    p.translate(0, -20 * scale - sliderH * scale);
    p.fill(60, 65, 70);
    p.stroke(0, 255, 0);
    p.strokeWeight(2 * scale);
    p.rect(-15 * scale, -10 * scale, 30 * scale, 15 * scale, 2 * scale);
    
    // Intake/Claw
    const clawAngle = isClawOpen ? 40 : 10;
    p.push();
    p.translate(-10 * scale, 5 * scale);
    p.rotate(-clawAngle * Math.PI / 180);
    p.fill(70, 75, 80);
    p.rect(-3 * scale, 0, 6 * scale, 20 * scale);
    p.pop();
    
    p.push();
    p.translate(10 * scale, 5 * scale);
    p.rotate(clawAngle * Math.PI / 180);
    p.fill(70, 75, 80);
    p.rect(-3 * scale, 0, 6 * scale, 20 * scale);
    p.pop();
    
    p.pop();
  };

  const drawSample = (p: p5, scale: number) => {
    if (sampleHeld) {
      // Sample is held by robot
      const sx = p.width / 2 + robotX * scale;
      const sy = 150 * scale + robotY * scale - 20 * scale - sliderHeight * scale;
      p.fill(255, 200, 0);
      p.stroke(255, 150, 0);
      p.strokeWeight(2 * scale);
      p.circle(sx, sy, 12 * scale);
    } else if (sampleX !== 0 || sampleY !== 0) {
      // Sample is on field or in flight
      const sx = p.width / 2 + sampleX * scale;
      const sy = 150 * scale + sampleY * scale;
      p.fill(255, 200, 0);
      p.stroke(255, 150, 0);
      p.strokeWeight(2 * scale);
      p.circle(sx, sy, 12 * scale);
    }
  };

  const drawControllers = (p: p5, scale: number) => {
    const controllerY = p.height * 0.15;
    
    // Driver 1 controller (left)
    p.push();
    p.translate(p.width * 0.25, controllerY);
    drawController(p, scale, controllerInputs.driver1, 1);
    p.pop();
    
    // Driver 2 controller (right)
    p.push();
    p.translate(p.width * 0.75, controllerY);
    drawController(p, scale, controllerInputs.driver2, 2);
    p.pop();
  };

  const drawController = (p: p5, scale: number, inputs: typeof controllerInputs.driver1, driverNum: number) => {
    // Controller body
    p.fill(40, 45, 50);
    p.stroke(0, 255, 0, 150);
    p.strokeWeight(2 * scale);
    p.ellipse(0, 0, 100 * scale, 60 * scale);
    
    // Left stick
    const leftStickX = inputs.leftStick.x * 8 * scale;
    const leftStickY = inputs.leftStick.y * 8 * scale;
    p.fill(60, 65, 70);
    p.stroke(inputs.leftStick.x !== 0 || inputs.leftStick.y !== 0 ? p.color(0, 255, 0) : p.color(0, 255, 0, 100));
    p.strokeWeight(inputs.leftStick.x !== 0 || inputs.leftStick.y !== 0 ? 3 * scale : 1 * scale);
    p.circle(-25 * scale + leftStickX, leftStickY, 15 * scale);
    
    // Right stick
    const rightStickX = inputs.rightStick.x * 8 * scale;
    const rightStickY = inputs.rightStick.y * 8 * scale;
    p.stroke(inputs.rightStick.x !== 0 || inputs.rightStick.y !== 0 ? p.color(0, 255, 0) : p.color(0, 255, 0, 100));
    p.strokeWeight(inputs.rightStick.x !== 0 || inputs.rightStick.y !== 0 ? 3 * scale : 1 * scale);
    p.circle(25 * scale + rightStickX, rightStickY, 15 * scale);
    
    // Buttons
    const buttonActive = (name: string) => inputs.buttons[name] === true;
    
    // D-pad
    p.fill(buttonActive('dpad_up') || buttonActive('dpad_down') ? p.color(0, 255, 0) : p.color(50, 55, 60));
    p.stroke(0, 255, 0, 100);
    p.strokeWeight(1 * scale);
    p.rect(-25 * scale - 6 * scale, -18 * scale - 2 * scale, 12 * scale, 4 * scale);
    p.rect(-25 * scale - 2 * scale, -18 * scale - 6 * scale, 4 * scale, 12 * scale);
    
    // Bumpers
    p.fill(buttonActive('left_bumper') ? p.color(0, 255, 0) : p.color(50, 55, 60));
    p.rect(-35 * scale, -32 * scale, 25 * scale, 4 * scale, 2 * scale);
    
    p.fill(buttonActive('right_bumper') ? p.color(0, 255, 0) : p.color(50, 55, 60));
    p.rect(10 * scale, -32 * scale, 25 * scale, 4 * scale, 2 * scale);
    
    // Driver label
    p.fill(0, 255, 0);
    p.noStroke();
    p.textSize(10 * scale);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`Driver ${driverNum}`, 0, 35 * scale);
  };

  const drawPhaseLabel = (p: p5, scale: number) => {
    const phase = animationPhase;
    let phaseText = '';
    
    if (props.season === 'into-the-deep') {
      if (phase < 3) phaseText = 'Driver 1: Move forward to sample';
      else if (phase < 5) phaseText = 'Driver 2: Lower intake';
      else if (phase < 7) phaseText = 'Driver 2: Close claw, grab sample';
      else if (phase < 10) phaseText = 'Driver 2: Raise slider';
      else if (phase < 13) phaseText = 'Driver 1: Move to basket';
      else if (phase < 15) phaseText = 'Driver 2: Release sample';
      else phaseText = 'Resetting...';
    } else if (props.season === 'centerstage') {
      if (phase < 3) phaseText = 'Driver 1: Move forward to pixel';
      else if (phase < 5) phaseText = 'Driver 1: Raise arm, Driver 2: Open intake';
      else if (phase < 7) phaseText = 'Driver 2: Close intake, grab pixel';
      else if (phase < 10) phaseText = 'Driver 1: Raise arm higher';
      else if (phase < 13) phaseText = 'Driver 1: Move to backdrop';
      else if (phase < 15) phaseText = 'Driver 2: Release pixel';
      else phaseText = 'Resetting...';
    }
    
    p.fill(0, 0, 0, 180);
    p.noStroke();
    p.rect(10 * scale, 10 * scale, p.width - 20 * scale, 35 * scale, 5 * scale);
    
    p.fill(0, 255, 0);
    p.textSize(12 * scale);
    p.textAlign(p.LEFT, p.TOP);
    p.text(phaseText, 20 * scale, 20 * scale);
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
      <h4>Controller-Robot Coordination Demo</h4>
      <p class="description">Watch how both drivers work together to control the robot and complete tasks</p>
    </div>
    <div ref="canvasContainer" class="canvas-container"></div>
    <div class="animation-footer">
      <p class="hint">The animation shows a complete cycle: navigate → collect sample → score in basket</p>
    </div>
  </div>
</template>

<style scoped>
.controller-robot-coordination {
  width: 100%;
  margin: 2vw 0;
  background: rgba(0, 0, 0, 0.4);
  border: 0.15vw solid rgba(0, 255, 0, 0.4);
  border-radius: 0.5vw;
  padding: 1.5vw;
  overflow: hidden;
}

.animation-header {
  text-align: center;
  margin-bottom: 1vw;
}

.animation-header h4 {
  color: var(--mechabyte-green);
  font-size: 1.5vw;
  margin-bottom: 0.5vw;
}

.description {
  color: #aaa;
  font-size: 1vw;
  font-style: italic;
}

.canvas-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.3vw;
}

.animation-footer {
  text-align: center;
  margin-top: 1vw;
  padding-top: 1vw;
  border-top: 0.1vw solid rgba(0, 255, 0, 0.2);
}

.hint {
  color: #888;
  font-size: 0.85vw;
  font-style: italic;
}

@media only screen and (max-width: 1000px) {
  .controller-robot-coordination {
    border: 1px solid rgba(0, 255, 0, 0.4);
    border-radius: 8px;
    padding: 15px;
  }

  .animation-header h4 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .description {
    font-size: 14px;
  }

  .canvas-container {
    border-radius: 5px;
  }

  .animation-footer {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
  }

  .hint {
    font-size: 12px;
  }
}
</style>
