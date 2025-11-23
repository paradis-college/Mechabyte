<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let showVersion = 0; // 0: X-drive, 1: Mecanum
  let transitionTimer = 0;
  const transitionTime = 420; // 7 seconds at 60fps
  let wheelRotation = 0;
  let robotX = 0;
  let robotY = 0;
  let movementPhase = 0;
  
  p.setup = () => {
    if (!canvasContainer.value) return;
    const canvas = p.createCanvas(800, 550);
    canvas.parent(canvasContainer.value);
  };

  p.draw = () => {
    p.background(20, 22, 30);
    
    transitionTimer++;
    wheelRotation += 0.1;
    
    if (transitionTimer > transitionTime) {
      showVersion = (showVersion + 1) % 2;
      transitionTimer = 0;
      movementPhase = 0;
      robotX = 0;
      robotY = 0;
    }
    
    // Title with better styling
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text('Chassis Evolution: Drive System Redesign', p.width / 2, 30);
    
    // Draw version indicator
    drawVersionIndicator(p, showVersion);
    
    if (showVersion === 0) {
      drawXDrive(p);
    } else {
      drawMecanumDrive(p);
    }
    
    // Progress indicator
    drawProgressBar(p, transitionTimer, transitionTime);
  };

  const drawVersionIndicator = (p: p5, version: number) => {
    const y = 60;
    const x1 = p.width / 2 - 150;
    const x2 = p.width / 2 + 150;
    
    // X-Drive indicator
    p.fill(version === 0 ? 255 : 100, version === 0 ? 180 : 100, 0, version === 0 ? 255 : 100);
    p.noStroke();
    p.circle(x1, y, 16);
    p.textSize(12);
    p.fill(version === 0 ? 255 : 150);
    p.text('X-Drive (Initial)', x1 + 50, y);
    
    // Mecanum indicator
    p.fill(0, version === 1 ? 255 : 100, version === 1 ? 100 : 50, version === 1 ? 255 : 100);
    p.circle(x2, y, 16);
    p.textSize(12);
    p.fill(version === 1 ? 200 : 150);
    p.text('Mecanum (Final)', x2 + 60, y);
  };

  const drawXDrive = (p: p5) => {
    const centerX = p.width / 2 - 180;
    const centerY = p.height / 2 + 30;
    
    // Version label
    p.textSize(18);
    p.fill(255, 180, 0);
    p.noStroke();
    p.text('Initial Design: X-Drive Configuration', centerX, 100);
    
    p.textSize(13);
    p.fill(180, 180, 200);
    p.text('45° omni wheels • Compact layout', centerX, 125);
    
    // Chassis frame - showing cramped design
    p.stroke(220, 180, 0);
    p.strokeWeight(5);
    p.noFill();
    p.rect(centerX - 120, centerY - 90, 240, 180, 5);
    
    // Dimensions with arrows
    p.strokeWeight(1);
    p.stroke(100, 150, 255);
    p.line(centerX - 130, centerY - 95, centerX + 110, centerY - 95);
    drawArrow(p, centerX - 130, centerY - 95, centerX - 125, centerY - 95);
    drawArrow(p, centerX + 110, centerY - 95, centerX + 105, centerY - 95);
    p.textSize(11);
    p.fill(100, 150, 255);
    p.noStroke();
    p.text('18"', centerX, centerY - 105);
    
    // X-Drive wheels at 45 degrees - animated rotation
    const wheelPositions = [
      { x: centerX - 105, y: centerY - 75, label: 'FL', dir: 1 },
      { x: centerX + 105, y: centerY - 75, label: 'FR', dir: -1 },
      { x: centerX - 105, y: centerY + 75, label: 'BL', dir: -1 },
      { x: centerX + 105, y: centerY + 75, label: 'BR', dir: 1 }
    ];
    
    for (let i = 0; i < wheelPositions.length; i++) {
      const pos = wheelPositions[i];
      drawOmniWheel(p, pos.x, pos.y, wheelRotation * pos.dir, 45, false);
      
      // Wheel label
      p.textSize(10);
      p.fill(220, 180, 100);
      p.noStroke();
      p.text(pos.label, pos.x, pos.y - 35);
    }
    
    // Motor indicators
    p.textSize(10);
    p.fill(255, 200, 50);
    p.noStroke();
    for (let i = 0; i < 4; i++) {
      const pos = wheelPositions[i];
      p.text('M', pos.x + 20, pos.y);
    }
    
    // Control hub (showing cramped mounting)
    p.fill(50, 55, 75);
    p.stroke(0, 200, 0);
    p.strokeWeight(3);
    p.rect(centerX - 45, centerY - 30, 90, 60, 3);
    
    // Zip-tie indicator (fragile mounting)
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    p.noFill();
    p.arc(centerX - 50, centerY, 15, 25, p.PI, 0);
    p.arc(centerX + 50, centerY, 15, 25, p.PI, 0);
    
    p.textSize(11);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text('Control Hub', centerX, centerY - 8);
    p.textSize(9);
    p.fill(255, 150, 150);
    p.text('(Zip-tie mount)', centerX, centerY + 8);
    
    // Problems list on the right
    const problemsX = p.width / 2 + 150;
    p.textSize(14);
    p.fill(255, 150, 100);
    p.noStroke();
    p.text('⚠ Design Issues:', problemsX, centerY - 60);
    
    p.textSize(12);
    p.fill(220, 200, 200);
    const problems = [
      '• Cramped internal space',
      '• Hub unstable (1 screw + zip-tie)',
      '• No expansion capability',
      '• Only 4 motor ports',
      '• Limited component access'
    ];
    
    for (let i = 0; i < problems.length; i++) {
      p.text(problems[i], problemsX, centerY - 35 + i * 20);
    }
    
    // Team attribution
    p.textSize(10);
    p.fill(120, 120, 140);
    p.text('Initial Build: Maia Sava, Șerban Untu, Rareș Cozma', centerX, p.height - 20);
  };

  const drawMecanumDrive = (p: p5) => {
    const centerX = p.width / 2 - 180;
    const centerY = p.height / 2 + 30;
    
    // Calculate movement for demonstration
    movementPhase = (transitionTimer / transitionTime) * p.TWO_PI;
    robotX = Math.sin(movementPhase) * 30;
    robotY = Math.cos(movementPhase) * 20;
    
    // Version label
    p.textSize(18);
    p.fill(0, 255, 150);
    p.noStroke();
    p.text('Improved Design: Mecanum Drive System', centerX, 100);
    
    p.textSize(13);
    p.fill(180, 200, 220);
    p.text('Omnidirectional • Expansion Hub • Stable mounting', centerX, 125);
    
    // Larger, more spacious chassis frame
    p.stroke(0, 255, 150);
    p.strokeWeight(5);
    p.noFill();
    p.rect(centerX - 135 + robotX, centerY - 100 + robotY, 270, 200, 5);
    
    // Dimensions
    p.strokeWeight(1);
    p.stroke(100, 200, 255);
    p.line(centerX - 145, centerY - 105, centerX + 125, centerY - 105);
    drawArrow(p, centerX - 145, centerY - 105, centerX - 140, centerY - 105);
    drawArrow(p, centerX + 125, centerY - 105, centerX + 120, centerY - 105);
    p.textSize(11);
    p.fill(100, 200, 255);
    p.noStroke();
    p.text('18" (More internal space)', centerX, centerY - 115);
    
    // Mecanum wheels - with realistic roller pattern
    const wheelPositions = [
      { x: centerX - 125, y: centerY - 85, label: 'FL', rollerDir: 1 },
      { x: centerX + 125, y: centerY - 85, label: 'FR', rollerDir: -1 },
      { x: centerX - 125, y: centerY + 85, label: 'BL', rollerDir: -1 },
      { x: centerX + 125, y: centerY + 85, label: 'BR', rollerDir: 1 }
    ];
    
    for (let i = 0; i < wheelPositions.length; i++) {
      const pos = wheelPositions[i];
      drawMecanumWheel(p, pos.x + robotX, pos.y + robotY, wheelRotation, pos.rollerDir);
      
      // Wheel label
      p.textSize(10);
      p.fill(100, 255, 150);
      p.noStroke();
      p.text(pos.label, pos.x + robotX, pos.y + robotY - 38);
      
      // Motor indicator
      p.textSize(9);
      p.fill(100, 255, 100);
      p.text('M', pos.x + robotX + 25, pos.y + robotY);
    }
    
    // Movement direction arrows (showing omnidirectional capability)
    p.stroke(0, 255, 255);
    p.strokeWeight(2);
    p.noFill();
    const arrowSize = 25;
    drawMovementArrow(p, centerX + robotX, centerY + robotY - 60, 0); // Up
    drawMovementArrow(p, centerX + robotX + 60, centerY + robotY, p.HALF_PI); // Right
    drawMovementArrow(p, centerX + robotX, centerY + robotY + 60, p.PI); // Down
    drawMovementArrow(p, centerX + robotX - 60, centerY + robotY, -p.HALF_PI); // Left
    
    // Control Hub + Expansion Hub (properly mounted with custom brackets)
    // Control Hub
    p.fill(55, 60, 85);
    p.stroke(0, 255, 150);
    p.strokeWeight(3);
    p.rect(centerX - 60 + robotX, centerY - 40 + robotY, 120, 35, 3);
    
    // Mounting brackets (showing improved stability)
    p.fill(80, 255, 150);
    p.noStroke();
    for (let dx of [-65, 55]) {
      for (let dy of [-42, -8]) {
        p.circle(centerX + dx + robotX, centerY + dy + robotY, 8);
      }
    }
    
    // Expansion Hub
    p.fill(55, 60, 85);
    p.stroke(0, 255, 150);
    p.strokeWeight(3);
    p.rect(centerX - 60 + robotX, centerY + 10 + robotY, 120, 35, 3);
    
    // Mounting brackets for expansion hub
    p.fill(80, 255, 150);
    p.noStroke();
    for (let dx of [-65, 55]) {
      for (let dy of [8, 42]) {
        p.circle(centerX + dx + robotX, centerY + dy + robotY, 8);
      }
    }
    
    p.textSize(10);
    p.fill(0, 255, 150);
    p.noStroke();
    p.text('Control Hub', centerX + robotX, centerY - 22 + robotY);
    p.text('Expansion Hub', centerX + robotX, centerY + 28 + robotY);
    
    // Improvements list on the right
    const improvementsX = p.width / 2 + 150;
    p.textSize(14);
    p.fill(100, 255, 150);
    p.noStroke();
    p.text('✓ Improvements:', improvementsX, centerY - 60);
    
    p.textSize(12);
    p.fill(200, 220, 220);
    const improvements = [
      '• Omnidirectional movement',
      '• Expansion Hub (8 motors total)',
      '• Custom mounting brackets',
      '• Spacious internal layout',
      '• Easy component access'
    ];
    
    for (let i = 0; i < improvements.length; i++) {
      p.text(improvements[i], improvementsX, centerY - 35 + i * 20);
    }
    
    // Team attribution
    p.textSize(10);
    p.fill(120, 140, 140);
    p.text('Redesign: Maia Sava, Șerban Untu, Cristian Ghidireac', centerX, p.height - 20);
  };

  const drawOmniWheel = (p: p5, x: number, y: number, rotation: number, angle: number, isMecanum: boolean) => {
    p.push();
    p.translate(x, y);
    p.rotate(p.radians(angle));
    
    // Wheel body
    p.fill(220, 180, 60);
    p.stroke(140, 100, 40);
    p.strokeWeight(2);
    p.rect(-22, -14, 44, 28, 2);
    
    // Omni rollers
    p.stroke(80, 60, 30);
    p.strokeWeight(2);
    for (let j = -18; j < 22; j += 6) {
      p.line(j, -14, j, 14);
    }
    
    // Rotation indicator
    const rotY = Math.sin(rotation) * 3;
    p.fill(255, 200, 80);
    p.noStroke();
    p.circle(0, rotY, 6);
    
    p.pop();
  };

  const drawMecanumWheel = (p: p5, x: number, y: number, rotation: number, rollerDir: number) => {
    p.push();
    p.translate(x, y);
    
    // Wheel body - more realistic green mecanum
    p.fill(80, 200, 100);
    p.stroke(50, 120, 60);
    p.strokeWeight(3);
    p.rect(-24, -16, 48, 32, 3);
    
    // Diagonal rollers for mecanum (45° angle)
    p.stroke(40, 80, 50);
    p.strokeWeight(2.5);
    const rollerAngle = rollerDir * p.PI / 4;
    for (let j = -20; j < 24; j += 7) {
      p.push();
      p.translate(j, 0);
      p.rotate(rollerAngle);
      p.line(0, -18, 0, 18);
      
      // Small roller cylinders
      p.fill(60, 140, 80);
      p.noStroke();
      for (let k = -15; k <= 15; k += 10) {
        p.circle(0, k, 4);
      }
      p.pop();
    }
    
    // Rotation indicator
    p.fill(150, 255, 150);
    p.noStroke();
    const rotOffset = Math.sin(rotation) * 4;
    p.circle(rotOffset, 0, 8);
    
    // Direction arrow (showing roller angle)
    p.stroke(0, 255, 200);
    p.strokeWeight(2);
    p.line(-10 * rollerDir, -10, 10 * rollerDir, 10);
    drawArrow(p, 10 * rollerDir, 10, 8 * rollerDir, 8);
    
    p.pop();
  };

  const drawMovementArrow = (p: p5, x: number, y: number, angle: number) => {
    p.push();
    p.translate(x, y);
    p.rotate(angle);
    
    p.stroke(0, 255, 255);
    p.strokeWeight(2);
    p.line(0, 0, 0, -20);
    
    // Arrow head
    p.fill(0, 255, 255);
    p.noStroke();
    p.triangle(0, -25, -5, -18, 5, -18);
    
    p.pop();
  };

  const drawArrow = (p: p5, x1: number, y1: number, x2: number, y2: number) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    p.fill(100, 150, 255);
    p.noStroke();
    p.triangle(x2, y2, x2 - 6 * Math.cos(angle - 0.3), y2 - 6 * Math.sin(angle - 0.3), x2 - 6 * Math.cos(angle + 0.3), y2 - 6 * Math.sin(angle + 0.3));
  };

  const drawProgressBar = (p: p5, current: number, total: number) => {
    const barWidth = 300;
    const barHeight = 8;
    const x = (p.width - barWidth) / 2;
    const y = p.height - 40;
    
    // Background
    p.fill(40, 40, 50);
    p.noStroke();
    p.rect(x, y, barWidth, barHeight, 4);
    
    // Progress
    const progress = current / total;
    p.fill(0, 255, 100);
    p.rect(x, y, barWidth * progress, barHeight, 4);
    
    // Label
    p.textSize(10);
    p.fill(150);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Transition in ' + Math.ceil((total - current) / 60) + 's', p.width / 2, y - 12);
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
