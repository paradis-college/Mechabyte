<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let phase = 0; // 0: Retracted, 1: Extending, 2: Extended/Scoring, 3: Retracting
  let transitionTimer = 0;
  const phaseDurations = [90, 120, 120, 90]; // frames for each phase
  
  let sliderExtension = 0; // 0 to 1
  let armRotation = 0; // arm angle
  let gripperOpen = 0.4; // 0 closed, 1 open
  let sample = { x: 0, y: 0, held: false, scoring: false };
  let scoredSamples = 0;
  let basketGlow = 0;
  
  p.setup = () => {
    if (!canvasContainer.value) return;
    const canvas = p.createCanvas(800, 600);
    canvas.parent(canvasContainer.value);
  };

  p.draw = () => {
    p.background(18, 20, 28);
    
    transitionTimer++;
    
    // Phase management
    if (transitionTimer > phaseDurations[phase]) {
      phase = (phase + 1) % 4;
      transitionTimer = 0;
      
      if (phase === 0) {
        scoredSamples = 0;
        basketGlow = 0;
      }
    }
    
    // Update animations based on phase
    updatePhaseAnimation(p);
    
    // Title
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text('Vertical Slider System with Integrated Arm', p.width / 2, 30);
    
    // Draw field elements
    drawField(p);
    
    // Draw robot and slider system
    drawRobotWithSlider(p);
    
    // Draw sample if applicable
    if (sample.held || sample.scoring) {
      drawSample(p, sample.x, sample.y, sample.scoring);
    }
    
    // Draw status panel
    drawStatusPanel(p);
    
    // Progress bar
    drawProgressBar(p);
  };

  const updatePhaseAnimation = (p: p5) => {
    const progress = transitionTimer / phaseDurations[phase];
    
    if (phase === 0) {
      // Retracted - prepare to extend
      sliderExtension = p.lerp(sliderExtension, 0, 0.08);
      armRotation = p.lerp(armRotation, 0, 0.08);
      gripperOpen = 0.4;
      sample.held = false;
      sample.scoring = false;
    } else if (phase === 1) {
      // Extending - move up and grab sample
      sliderExtension = p.lerp(sliderExtension, 1, 0.06);
      armRotation = p.lerp(armRotation, -p.PI / 6, 0.05);
      
      if (progress > 0.6 && !sample.held) {
        gripperOpen = p.lerp(gripperOpen, 0.1, 0.1);
        if (progress > 0.75) {
          sample.held = true;
        }
      }
    } else if (phase === 2) {
      // Extended - scoring samples
      sliderExtension = 1;
      armRotation = p.lerp(armRotation, -p.PI / 3, 0.05);
      
      // Simulate scoring animation
      if (progress > 0.3 && progress < 0.4 && sample.held) {
        gripperOpen = p.lerp(gripperOpen, 0.8, 0.15);
        if (gripperOpen > 0.6) {
          sample.scoring = true;
          sample.held = false;
          scoredSamples++;
          basketGlow = 1;
        }
      }
      
      // Reset for next sample
      if (progress > 0.5 && scoredSamples < 3) {
        sample.held = true;
        sample.scoring = false;
        gripperOpen = 0.1;
      }
      
      basketGlow = Math.max(0, basketGlow - 0.02);
    } else if (phase === 3) {
      // Retracting - return to base
      sliderExtension = p.lerp(sliderExtension, 0, 0.06);
      armRotation = p.lerp(armRotation, 0, 0.08);
      gripperOpen = 0.4;
      sample.held = false;
      sample.scoring = false;
    }
    
    // Update sample position
    if (sample.held || sample.scoring) {
      const baseX = p.width / 2;
      const baseY = 480;
      const sliderY = baseY - sliderExtension * 250;
      const armLength = 90;
      const armX = baseX + armLength * p.cos(armRotation + p.PI / 2);
      const armY = sliderY + armLength * p.sin(armRotation + p.PI / 2);
      
      if (sample.held) {
        sample.x = armX;
        sample.y = armY;
      } else if (sample.scoring) {
        // Animate falling into basket
        sample.y += 3;
        if (sample.y > 180) {
          sample.scoring = false;
        }
      }
    }
  };

  const drawField = (p: p5) => {
    // High basket (target)
    const basketX = p.width - 120;
    const basketY = 150;
    
    // Basket pole
    p.stroke(120, 120, 140);
    p.strokeWeight(6);
    p.line(basketX, basketY + 50, basketX, p.height - 50);
    
    // High basket
    p.fill(180, 180, 200, 150);
    p.stroke(255, 200, 0, 200 + basketGlow * 55);
    p.strokeWeight(4);
    p.rect(basketX - 50, basketY - 25, 100, 50, 5);
    
    // Basket rim
    p.noFill();
    p.stroke(255, 200, 0);
    p.strokeWeight(3);
    p.arc(basketX, basketY + 25, 100, 30, 0, p.PI);
    
    // Basket label
    p.fill(255, 200, 0);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('High Basket', basketX, basketY - 50);
    p.text('8 pts', basketX, basketY - 35);
    
    // Scoring indicator
    if (scoredSamples > 0) {
      p.textSize(16);
      p.fill(0, 255, 100);
      p.text(`Scored: ${scoredSamples}`, basketX, basketY + 60);
    }
    
    // Net zone (observation area) - parking zone
    p.fill(50, 50, 80, 100);
    p.stroke(150, 150, 200);
    p.strokeWeight(2);
    p.rect(50, p.height - 150, 150, 100);
    
    p.fill(150, 150, 200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Net Zone\n(Park 3pts)', 60, p.height - 145);
    
    // Field floor line
    p.stroke(80, 80, 100);
    p.strokeWeight(2);
    p.line(0, p.height - 50, p.width, p.height - 50);
  };

  const drawRobotWithSlider = (p: p5) => {
    const baseX = p.width / 2;
    const baseY = 480;
    const maxHeight = 250;
    const sliderY = baseY - sliderExtension * maxHeight;
    
    // Robot base (chassis)
    p.fill(50, 55, 70);
    p.stroke(100, 100, 120);
    p.strokeWeight(3);
    p.rect(baseX - 80, baseY - 40, 160, 80, 5);
    
    // Base details
    p.fill(70, 75, 90);
    p.noStroke();
    p.rect(baseX - 70, baseY - 30, 140, 60, 3);
    
    // Wheels
    for (let wx of [-60, -20, 20, 60]) {
      p.fill(60, 60, 80);
      p.stroke(80, 80, 100);
      p.strokeWeight(2);
      p.circle(baseX + wx, baseY + 40, 25);
      
      // Wheel treads
      p.stroke(100, 100, 120);
      p.strokeWeight(1);
      for (let i = 0; i < 3; i++) {
        const angle = (transitionTimer * 0.1 + i * p.TWO_PI / 3) % p.TWO_PI;
        const tx = baseX + wx + 8 * p.cos(angle);
        const ty = baseY + 40 + 8 * p.sin(angle);
        p.line(baseX + wx, baseY + 40, tx, ty);
      }
    }
    
    // Vertical slider tracks (rails)
    p.stroke(120, 140, 160);
    p.strokeWeight(6);
    p.line(baseX - 35, baseY - 40, baseX - 35, baseY - 40 - maxHeight - 30);
    p.line(baseX + 35, baseY - 40, baseX + 35, baseY - 40 - maxHeight - 30);
    
    // Track brackets
    for (let y of [baseY - 40, baseY - 140, baseY - 240, baseY - 40 - maxHeight - 30]) {
      p.fill(100, 120, 140);
      p.stroke(80, 100, 120);
      p.strokeWeight(2);
      p.rect(baseX - 40, y - 5, 10, 10, 2);
      p.rect(baseX + 30, y - 5, 10, 10, 2);
    }
    
    // Slider carriage (moving platform)
    p.fill(80, 100, 130);
    p.stroke(120, 140, 180);
    p.strokeWeight(3);
    p.rect(baseX - 50, sliderY - 30, 100, 60, 4);
    
    // Carriage details
    p.fill(100, 120, 150);
    p.noStroke();
    p.rect(baseX - 45, sliderY - 25, 90, 50, 3);
    
    // Carriage wheels on tracks
    for (let wx of [-35, 35]) {
      p.fill(150, 170, 200);
      p.stroke(120, 140, 180);
      p.strokeWeight(2);
      p.circle(baseX + wx, sliderY, 16);
      
      // Wheel hub
      p.fill(100, 120, 150);
      p.noStroke();
      p.circle(baseX + wx, sliderY, 8);
    }
    
    // Motor (driving the slider)
    p.fill(60, 80, 110);
    p.stroke(80, 100, 130);
    p.strokeWeight(2);
    p.rect(baseX - 25, sliderY - 15, 50, 30, 3);
    
    // Motor label
    p.fill(150, 180, 220);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Motor', baseX, sliderY);
    
    // Integrated arm (extends from slider carriage)
    const armLength = 90;
    const armX = baseX + armLength * p.cos(armRotation + p.PI / 2);
    const armY = sliderY + armLength * p.sin(armRotation + p.PI / 2);
    
    // Arm base joint
    p.fill(100, 140, 100);
    p.stroke(80, 120, 80);
    p.strokeWeight(3);
    p.circle(baseX, sliderY + 30, 24);
    
    // Arm segment
    p.stroke(100, 200, 120);
    p.strokeWeight(8);
    p.line(baseX, sliderY + 30, armX, armY);
    
    // Arm details
    p.stroke(80, 180, 100);
    p.strokeWeight(4);
    p.line(baseX, sliderY + 30, armX, armY);
    
    // Gripper at end of arm
    drawGripper(p, armX, armY, armRotation, gripperOpen);
    
    // Extension indicator
    const percentage = Math.round(sliderExtension * 100);
    p.fill(0, 255, 200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`Extension: ${percentage}%`, 50, baseY - maxHeight - 50);
    
    // Extension bar
    p.fill(40, 40, 50);
    p.noStroke();
    p.rect(50, baseY - maxHeight - 30, 100, 10, 3);
    p.fill(0, 255, 200);
    p.rect(50, baseY - maxHeight - 30, 100 * sliderExtension, 10, 3);
  };

  const drawGripper = (p: p5, x: number, y: number, angle: number, openAmount: number) => {
    p.push();
    p.translate(x, y);
    p.rotate(angle);
    
    // Gripper base
    p.fill(80, 120, 80);
    p.stroke(60, 100, 60);
    p.strokeWeight(2);
    p.rect(-15, -10, 30, 20, 3);
    
    // Gripper fingers
    const fingerSpread = 15 + openAmount * 25;
    
    for (let side of [-1, 1]) {
      // Finger
      p.fill(100, 180, 100);
      p.stroke(80, 160, 80);
      p.strokeWeight(3);
      p.beginShape();
      p.vertex(0, 0);
      p.vertex(side * fingerSpread, 25);
      p.vertex(side * (fingerSpread - 5), 35);
      p.vertex(side * 5, 10);
      p.endShape(p.CLOSE);
      
      // Finger grip texture
      p.stroke(80, 140, 80);
      p.strokeWeight(1);
      for (let i = 10; i < 30; i += 5) {
        p.line(side * 5, i, side * (fingerSpread - 5), i + 15);
      }
    }
    
    // Gripper status
    if (openAmount < 0.3) {
      p.fill(0, 255, 100);
      p.noStroke();
      p.textSize(9);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('HOLD', 0, -20);
    }
    
    p.pop();
  };

  const drawSample = (p: p5, x: number, y: number, isFalling: boolean) => {
    // Yellow sample block
    p.fill(255, 255, 0, isFalling ? 200 : 255);
    p.stroke(200, 200, 0);
    p.strokeWeight(2);
    p.rect(x - 15, y - 15, 30, 30, 3);
    
    // Sample details
    p.fill(220, 220, 0);
    p.noStroke();
    p.rect(x - 12, y - 12, 24, 24, 2);
    
    // Sample marker
    p.fill(180, 180, 0);
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('S', x, y);
    
    // Motion trail if falling
    if (isFalling) {
      for (let i = 1; i < 4; i++) {
        p.fill(255, 255, 0, 100 / i);
        p.noStroke();
        p.rect(x - 12, y - 15 - i * 8, 24, 6, 2);
      }
    }
  };

  const drawStatusPanel = (p: p5) => {
    const panelX = 100;
    const panelY = 100;
    const panelW = 180;
    const panelH = 160;
    
    p.fill(30, 30, 40);
    p.stroke(0, 255, 100);
    p.strokeWeight(2);
    p.rect(panelX, panelY, panelW, panelH, 5);
    
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(14);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text('STATUS', panelX + 10, panelY + 10);
    
    // Phase name
    const phaseNames = ['Retracted', 'Extending', 'Scoring', 'Retracting'];
    p.textSize(12);
    p.fill(200, 220, 220);
    p.text(`Phase: ${phaseNames[phase]}`, panelX + 10, panelY + 35);
    
    // Action description
    p.textSize(11);
    p.fill(180, 200, 200);
    const actions = [
      'Ready at base position',
      'Slider moving up\nGrabbing sample',
      'At maximum height\nScoring in basket',
      'Returning to base\nPrepare for next cycle'
    ];
    p.text(actions[phase], panelX + 10, panelY + 60);
    
    // Specifications
    p.textSize(10);
    p.fill(150, 170, 170);
    p.text('Max Extension: 250mm', panelX + 10, panelY + 120);
    p.text('Arm Reach: 90mm', panelX + 10, panelY + 135);
  };

  const drawProgressBar = (p: p5) => {
    const barWidth = 300;
    const barHeight = 8;
    const x = (p.width - barWidth) / 2;
    const y = p.height - 35;
    
    // Calculate total progress
    let totalTime = phaseDurations.reduce((a, b) => a + b, 0);
    let currentTime = phaseDurations.slice(0, phase).reduce((a, b) => a + b, 0) + transitionTimer;
    
    // Background
    p.fill(40, 40, 50);
    p.noStroke();
    p.rect(x, y, barWidth, barHeight, 4);
    
    // Progress
    const progress = currentTime / totalTime;
    p.fill(0, 255, 200);
    p.rect(x, y, barWidth * progress, barHeight, 4);
    
    // Label
    p.textSize(10);
    p.fill(150);
    p.textAlign(p.CENTER, p.CENTER);
    const timeLeft = Math.ceil((totalTime - currentTime) / 60);
    p.text(`Cycle: ${timeLeft}s remaining`, p.width / 2, y - 12);
  };
};

onMounted(() => {
  if (canvasContainer.value) {
    p5Instance = new p5(sketch);
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
  <div class="animation-wrapper">
    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>

<style scoped>
.animation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2vw 0;
  padding: 1vw;
  background: rgba(0, 0, 0, 0.2);
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
}

.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 1000px) {
  .animation-wrapper {
    margin: 20px 0;
    padding: 10px;
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 5px;
  }
}
</style>
