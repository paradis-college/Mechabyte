<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import p5 from 'p5';

const props = defineProps<{
  title?: string;
}>();

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let rotation = 0;
  let clawAngle = 0;
  let clawOpen = false;
  let animationPhase = 0;
  
  // Robot component positions
  let intakeY = 0;
  let slideY = 0;
  let sampleHeld = false;
  let sampleX = 0;
  let sampleY = 0;

  p.setup = () => {
    const container = canvasContainer.value;
    if (!container) return;
    
    const width = container.clientWidth;
    const height = Math.min(600, width * 0.7);
    p.createCanvas(width, height);
    p.frameRate(30);
  };

  p.draw = () => {
    // Background - deep ocean theme
    const ctx = p.drawingContext as CanvasRenderingContext2D;
    const gradient = ctx.createLinearGradient(0, 0, 0, p.height);
    gradient.addColorStop(0, '#0a1628');
    gradient.addColorStop(1, '#1a2f4a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, p.width, p.height);
    
    // Field elements
    drawField(p);
    
    p.translate(p.width / 2, p.height / 2);
    
    // Robot chassis
    drawChassis(p);
    
    // Animate robot actions
    animationPhase += 0.02;
    
    // Phase 1: Lower intake (0-2s)
    if (animationPhase < 2) {
      intakeY = p.lerp(0, 60, animationPhase / 2);
    }
    // Phase 2: Close claw / grab sample (2-3s)
    else if (animationPhase < 3) {
      intakeY = 60;
      clawAngle = p.lerp(45, 10, (animationPhase - 2) / 1);
      if (animationPhase > 2.5 && !sampleHeld) {
        sampleHeld = true;
      }
    }
    // Phase 3: Raise slider (3-5s)
    else if (animationPhase < 5) {
      clawAngle = 10;
      intakeY = 60;
      slideY = p.lerp(0, -120, (animationPhase - 3) / 2);
      if (sampleHeld) {
        sampleX = 0;
        sampleY = 60 - slideY;
      }
    }
    // Phase 4: Open claw / release sample (5-6s)
    else if (animationPhase < 6) {
      slideY = -120;
      intakeY = 60;
      clawAngle = p.lerp(10, 45, (animationPhase - 5) / 1);
      if (sampleHeld) {
        sampleX = 0;
        sampleY = 60 - slideY;
      }
      if (animationPhase > 5.5) {
        sampleHeld = false;
        // Sample flies to basket
        const t = (animationPhase - 5.5) / 0.5;
        sampleX = p.lerp(0, 150, t);
        sampleY = p.lerp(60 - slideY, -180 + 50 * Math.sin(t * Math.PI), t);
      }
    }
    // Phase 5: Reset (6-8s)
    else if (animationPhase < 8) {
      const t = (animationPhase - 6) / 2;
      slideY = p.lerp(-120, 0, t);
      intakeY = p.lerp(60, 0, t);
      clawAngle = p.lerp(45, 45, t);
    }
    // Reset animation
    else {
      animationPhase = 0;
      slideY = 0;
      intakeY = 0;
      sampleHeld = false;
    }
    
    // Draw components
    drawSlider(p, slideY);
    drawIntake(p, intakeY, clawAngle);
    
    // Draw sample if being held or in flight
    if (sampleHeld || (animationPhase > 5.5 && animationPhase < 6)) {
      drawSample(p, sampleX, sampleY);
    }
    
    // Labels
    drawLabels(p);
  };

  const drawField = (p: p5) => {
    const scale = Math.min(p.width, p.height) / 600;
    
    p.push();
    // High basket
    p.fill(0, 100, 200, 150);
    p.stroke(0, 255, 255);
    p.strokeWeight(2 * scale);
    p.rect(p.width - 100 * scale, 50 * scale, 80 * scale, 80 * scale);
    p.fill(0, 255, 255);
    p.noStroke();
    p.textSize(10 * scale);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HIGH\nBASKET', p.width - 60 * scale, 90 * scale);
    
    // Submersible rung
    p.stroke(150, 150, 150);
    p.strokeWeight(6 * scale);
    p.line(20 * scale, 80 * scale, 120 * scale, 80 * scale);
    p.fill(150);
    p.noStroke();
    p.textSize(9 * scale);
    p.text('RUNG', 70 * scale, 95 * scale);
    
    // Sample field markers
    p.fill(255, 200, 0, 100);
    p.stroke(255, 200, 0);
    p.strokeWeight(1 * scale);
    for (let i = 0; i < 3; i++) {
      p.circle(50 * scale + i * 40 * scale, p.height - 40 * scale, 20 * scale);
    }
    
    p.pop();
  };

  const drawChassis = (p: p5) => {
    const scale = Math.min(p.width, p.height) / 600;
    
    p.push();
    
    // Main chassis body
    p.fill(40, 45, 50);
    p.stroke(0, 255, 0);
    p.strokeWeight(2 * scale);
    p.rect(-60 * scale, -40 * scale, 120 * scale, 80 * scale, 5 * scale);
    
    // Mecanum wheels
    p.fill(60, 60, 60);
    p.stroke(0, 255, 0, 150);
    p.strokeWeight(1 * scale);
    
    // Front left
    p.push();
    p.translate(-55 * scale, -35 * scale);
    drawMecanumWheel(p, 15 * scale);
    p.pop();
    
    // Front right
    p.push();
    p.translate(55 * scale, -35 * scale);
    drawMecanumWheel(p, 15 * scale);
    p.pop();
    
    // Back left
    p.push();
    p.translate(-55 * scale, 35 * scale);
    drawMecanumWheel(p, 15 * scale);
    p.pop();
    
    // Back right
    p.push();
    p.translate(55 * scale, 35 * scale);
    drawMecanumWheel(p, 15 * scale);
    p.pop();
    
    // Control hub
    p.fill(20, 100, 20);
    p.stroke(0, 255, 0);
    p.strokeWeight(1 * scale);
    p.rect(-25 * scale, -20 * scale, 50 * scale, 40 * scale, 2 * scale);
    p.fill(0, 255, 0);
    p.noStroke();
    p.textSize(8 * scale);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HUB', 0, 0);
    
    p.pop();
  };

  const drawMecanumWheel = (p: p5, size: number) => {
    p.ellipse(0, 0, size, size * 1.5);
    // Roller lines
    p.stroke(0, 255, 0, 100);
    p.strokeWeight(1);
    for (let i = -3; i <= 3; i++) {
      p.line(-size / 2, i * 3, size / 2, i * 3);
    }
  };

  const drawSlider = (p: p5, yOffset: number) => {
    const scale = Math.min(p.width, p.height) / 600;
    
    p.push();
    p.translate(0, yOffset * scale);
    
    // Slider rails
    p.stroke(100, 100, 100);
    p.strokeWeight(3 * scale);
    p.line(-25 * scale, -50 * scale, -25 * scale, 50 * scale);
    p.line(25 * scale, -50 * scale, 25 * scale, 50 * scale);
    
    // Slider carriage
    p.fill(60, 65, 70);
    p.stroke(0, 255, 0);
    p.strokeWeight(2 * scale);
    p.rect(-35 * scale, 40 * scale, 70 * scale, 25 * scale, 3 * scale);
    
    // Slider label
    p.fill(0, 255, 0);
    p.noStroke();
    p.textSize(8 * scale);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('SLIDER', 0, 52 * scale);
    
    p.pop();
  };

  const drawIntake = (p: p5, yOffset: number, angle: number) => {
    const scale = Math.min(p.width, p.height) / 600;
    
    p.push();
    p.translate(0, (60 + yOffset) * scale);
    
    // Intake base
    p.fill(50, 55, 60);
    p.stroke(0, 255, 0);
    p.strokeWeight(2 * scale);
    p.rect(-30 * scale, -10 * scale, 60 * scale, 20 * scale, 3 * scale);
    
    // Claw arms
    p.push();
    p.translate(-20 * scale, 0);
    p.rotate(-angle * Math.PI / 180);
    p.fill(70, 75, 80);
    p.rect(-5 * scale, 0, 10 * scale, 40 * scale, 2 * scale);
    
    // Blade stabilizers (3D printed discs)
    p.fill(0, 200, 0, 150);
    p.circle(0, 35 * scale, 12 * scale);
    p.pop();
    
    p.push();
    p.translate(20 * scale, 0);
    p.rotate(angle * Math.PI / 180);
    p.fill(70, 75, 80);
    p.rect(-5 * scale, 0, 10 * scale, 40 * scale, 2 * scale);
    
    // Blade stabilizers (3D printed discs)
    p.fill(0, 200, 0, 150);
    p.circle(0, 35 * scale, 12 * scale);
    p.pop();
    
    // Label
    p.fill(0, 255, 0);
    p.noStroke();
    p.textSize(8 * scale);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('INTAKE', 0, 0);
    
    p.pop();
  };

  const drawSample = (p: p5, x: number, y: number) => {
    const scale = Math.min(p.width, p.height) / 600;
    
    p.push();
    p.translate(x * scale, y * scale);
    
    // Sample (yellow hexagon/block)
    p.fill(255, 200, 0);
    p.stroke(255, 150, 0);
    p.strokeWeight(2 * scale);
    
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const sx = Math.cos(angle) * 10 * scale;
      const sy = Math.sin(angle) * 10 * scale;
      p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
    
    p.pop();
  };

  const drawLabels = (p: p5) => {
    const scale = Math.min(p.width, p.height) / 600;
    
    p.push();
    p.fill(255, 255, 255, 200);
    p.noStroke();
    p.textSize(11 * scale);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Robot Action Sequence:', -p.width / 2 + 20 * scale, -p.height / 2 + 20 * scale);
    
    const phase = Math.floor(animationPhase / 2);
    const steps = [
      '1. Lower intake to field',
      '2. Close claw, grab sample',
      '3. Raise vertical slider',
      '4. Release into basket'
    ];
    
    p.fill(0, 255, 0);
    p.textSize(10 * scale);
    steps.forEach((step, index) => {
      const alpha = index === phase ? 255 : 100;
      p.fill(0, 255, 0, alpha);
      p.text(step, -p.width / 2 + 30 * scale, -p.height / 2 + 40 * scale + index * 15 * scale);
    });
    
    p.pop();
  };

  p.windowResized = () => {
    const container = canvasContainer.value;
    if (!container) return;
    const width = container.clientWidth;
    const height = Math.min(600, width * 0.7);
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
  <div class="robot-mechanism-animation">
    <div v-if="title" class="animation-header">
      <h4>{{ title }}</h4>
    </div>
    <div ref="canvasContainer" class="canvas-container"></div>
    <div class="animation-description">
      <p>Interactive animation showing the robot's sample collection and scoring mechanism</p>
    </div>
  </div>
</template>

<style scoped>
.robot-mechanism-animation {
  width: 100%;
  margin: 2vw 0;
  background: rgba(0, 0, 0, 0.4);
  border: 0.15vw solid rgba(0, 255, 0, 0.3);
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
  font-size: 1.4vw;
  margin-bottom: 0.5vw;
}

.canvas-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.animation-description {
  text-align: center;
  margin-top: 1vw;
  padding-top: 1vw;
  border-top: 0.1vw solid rgba(0, 255, 0, 0.2);
}

.animation-description p {
  color: #aaa;
  font-size: 0.9vw;
  font-style: italic;
}

@media only screen and (max-width: 1000px) {
  .robot-mechanism-animation {
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
  }

  .animation-header h4 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .animation-description {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
  }

  .animation-description p {
    font-size: 13px;
  }
}
</style>
