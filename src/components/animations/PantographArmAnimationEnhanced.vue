<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let currentVersion = 0; // 0: 1 Servo, 1: 2 Servos, 2: Tetrix Motor
  let transitionTimer = 0;
  const transitionTime = 420; // 7 seconds at 60fps
  let armAngle = 0;
  let extending = true;
  let pixelAttached = false;
  
  p.setup = () => {
    if (!canvasContainer.value) return;
    const canvas = p.createCanvas(800, 600);
    canvas.parent(canvasContainer.value);
  };

  p.draw = () => {
    p.background(18, 20, 28);
    
    transitionTimer++;
    
    if (transitionTimer > transitionTime) {
      currentVersion = (currentVersion + 1) % 3;
      transitionTimer = 0;
      armAngle = 0;
      extending = true;
    }
    
    // Animate arm extension/retraction
    if (extending) {
      armAngle += 0.015;
      if (armAngle > 1.0) {
        extending = false;
        pixelAttached = true;
      }
    } else {
      armAngle -= 0.015;
      if (armAngle < 0) {
        extending = true;
        armAngle = 0;
        pixelAttached = false;
      }
    }
    
    // Title
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text('Pantograph Arm Evolution: Power Upgrade', p.width / 2, 30);
    
    // Draw version indicator
    drawVersionIndicator(p, currentVersion);
    
    if (currentVersion === 0) {
      drawServoV1(p, armAngle);
    } else if (currentVersion === 1) {
      drawServoV2(p, armAngle);
    } else {
      drawTetrixMotor(p, armAngle);
    }
    
    // Progress bar
    drawProgressBar(p, transitionTimer, transitionTime);
  };

  const drawVersionIndicator = (p: p5, version: number) => {
    const y = 65;
    const spacing = 220;
    const startX = p.width / 2 - spacing;
    
    // V1 - 1 Servo
    p.fill(version === 0 ? 255 : 100, version === 0 ? 150 : 100, 0, version === 0 ? 255 : 100);
    p.noStroke();
    p.circle(startX, y, 16);
    p.textSize(12);
    p.fill(version === 0 ? 255 : 150, version === 0 ? 150 : 130, version === 0 ? 0 : 100);
    p.text('V1: 1 Servo', startX, y + 25);
    
    // V2 - 2 Servos
    p.fill(version === 1 ? 255 : 100, version === 1 ? 180 : 100, 0, version === 1 ? 255 : 100);
    p.noStroke();
    p.circle(p.width / 2, y, 16);
    p.textSize(12);
    p.fill(version === 1 ? 255 : 150, version === 1 ? 180 : 130, version === 1 ? 0 : 100);
    p.text('V2: 2 Servos', p.width / 2, y + 25);
    
    // V3 - Tetrix Motor
    p.fill(0, version === 2 ? 255 : 100, version === 2 ? 100 : 50, version === 2 ? 255 : 100);
    p.circle(startX + spacing * 2, y, 16);
    p.textSize(12);
    p.fill(0, version === 2 ? 255 : 150, version === 2 ? 150 : 100);
    p.text('V3: Tetrix 40:1 (Final)', startX + spacing * 2, y + 25);
  };

  const drawServoV1 = (p: p5, angle: number) => {
    const centerX = p.width / 2 - 180;
    const centerY = p.height / 2 + 60;
    
    // Version label
    p.textSize(18);
    p.fill(255, 150, 0);
    p.noStroke();
    p.text('Version 1: Single Continuous-Rotation Servo', centerX, 110);
    
    p.textSize(14);
    p.fill(180, 180, 200);
    p.text('Initial design - lacked torque for lifting', centerX, 135);
    
    // Base mount
    p.fill(50, 55, 70);
    p.stroke(0, 200, 0);
    p.strokeWeight(4);
    p.rect(centerX - 35, centerY - 15, 70, 30, 3);
    
    p.textSize(11);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text('Chassis Mount', centerX, centerY);
    
    // Single servo
    p.fill(80, 80, 100);
    p.stroke(0, 200, 0);
    p.strokeWeight(3);
    p.rect(centerX - 20, centerY - 50, 40, 35, 2);
    
    p.textSize(9);
    p.fill(255, 200, 50);
    p.noStroke();
    p.text('CR Servo', centerX, centerY - 32);
    
    // Draw pantograph mechanism
    const extension = angle * 0.7; // Limited extension due to lack of power
    drawPantographMechanism(p, centerX, centerY, extension, false);
    
    // Struggling indicator when extended
    if (extension > 0.5) {
      p.textSize(11);
      p.fill(255, 100, 100);
      p.noStroke();
      p.text('⚠ Struggling with weight', centerX, centerY - 140);
      
      // Shaking effect
      const shake = Math.sin(transitionTimer * 0.3) * 2;
      p.fill(255, 150, 150, 100);
      p.noStroke();
      p.circle(centerX + shake, centerY - 100, 20);
    }
    
    // Problems list on the right
    const problemsX = p.width / 2 + 200;
    p.textSize(14);
    p.fill(255, 150, 100);
    p.noStroke();
    p.text('⚠ Critical Issues:', problemsX, centerY - 60);
    
    p.textSize(13);
    p.fill(220, 200, 200);
    const problems = [
      '• Insufficient torque',
      '• Cannot lift pixel reliably',
      '• Arm sags under load',
      '• Position inconsistent'
    ];
    
    for (let i = 0; i < problems.length; i++) {
      p.text(problems[i], problemsX, centerY - 35 + i * 22);
    }
    
    // Team attribution
    p.textSize(10);
    p.fill(120, 120, 140);
    p.text('Initial Build: David Grigore, Ștefan Albu', centerX, p.height - 25);
  };

  const drawServoV2 = (p: p5, angle: number) => {
    const centerX = p.width / 2 - 180;
    const centerY = p.height / 2 + 60;
    
    // Version label
    p.textSize(18);
    p.fill(255, 180, 0);
    p.noStroke();
    p.text('Version 2: Two Position Servos in Parallel', centerX, 110);
    
    p.textSize(14);
    p.fill(180, 180, 200);
    p.text('Improved torque but still limited', centerX, 135);
    
    // Base mount
    p.fill(50, 55, 70);
    p.stroke(0, 200, 0);
    p.strokeWeight(4);
    p.rect(centerX - 35, centerY - 15, 70, 30, 3);
    
    p.textSize(11);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text('Chassis Mount', centerX, centerY);
    
    // Two servos side by side
    p.fill(90, 90, 110);
    p.stroke(0, 220, 0);
    p.strokeWeight(3);
    p.rect(centerX - 32, centerY - 50, 28, 35, 2);
    p.rect(centerX + 4, centerY - 50, 28, 35, 2);
    
    p.textSize(9);
    p.fill(255, 200, 50);
    p.noStroke();
    p.text('Servo 1', centerX - 18, centerY - 32);
    p.text('Servo 2', centerX + 18, centerY - 32);
    
    // Parallel linkage indicator
    p.stroke(150, 200, 255);
    p.strokeWeight(2);
    p.line(centerX - 18, centerY - 52, centerX + 18, centerY - 52);
    p.textSize(8);
    p.fill(150, 200, 255);
    p.noStroke();
    p.text('Parallel', centerX, centerY - 58);
    
    // Draw pantograph mechanism
    const extension = angle * 0.85; // Better extension than V1
    drawPantographMechanism(p, centerX, centerY, extension, pixelAttached);
    
    // Pixel being carried (when attached)
    if (pixelAttached && extension > 0.3) {
      const endPoint = calculateArmEndpoint(centerX, centerY, extension);
      drawPixel(p, endPoint.x, endPoint.y - 25, 12, '#FF00FF');
    }
    
    // Better performance indicator
    if (extension > 0.5) {
      p.textSize(11);
      p.fill(255, 200, 100);
      p.noStroke();
      p.text('✓ Better stability', centerX, centerY - 140);
    }
    
    // Issues list on the right
    const issuesX = p.width / 2 + 200;
    p.textSize(14);
    p.fill(255, 180, 100);
    p.noStroke();
    p.text('⚠ Limitations:', issuesX, centerY - 60);
    
    p.textSize(13);
    p.fill(220, 200, 200);
    const issues = [
      '• Still limited torque',
      '• Needed Expansion Hub',
      '• Servo coordination complex',
      '• Not optimal for heavy loads'
    ];
    
    for (let i = 0; i < issues.length; i++) {
      p.text(issues[i], issuesX, centerY - 35 + i * 22);
    }
    
    // Team attribution
    p.textSize(10);
    p.fill(120, 120, 140);
    p.text('Upgrade: Maia Sava, Șerban Untu', centerX, p.height - 25);
  };

  const drawTetrixMotor = (p: p5, angle: number) => {
    const centerX = p.width / 2 - 180;
    const centerY = p.height / 2 + 60;
    
    // Version label
    p.textSize(18);
    p.fill(0, 255, 150);
    p.noStroke();
    p.text('Version 3: Tetrix 40:1 Motor (Final Solution)', centerX, 110);
    
    p.textSize(14);
    p.fill(180, 200, 220);
    p.text('Expansion Hub enabled powerful motor upgrade', centerX, 135);
    
    // Base mount - more robust
    p.fill(60, 65, 85);
    p.stroke(0, 255, 150);
    p.strokeWeight(4);
    p.rect(centerX - 40, centerY - 18, 80, 36, 3);
    
    // Mounting bolts
    p.fill(150, 200, 150);
    p.noStroke();
    for (let ox of [-35, -15, 15, 35]) {
      p.circle(centerX + ox, centerY - 12, 6);
      p.circle(centerX + ox, centerY + 12, 6);
    }
    
    p.textSize(11);
    p.fill(0, 255, 150);
    p.noStroke();
    p.text('Custom Mount', centerX, centerY);
    
    // Tetrix motor - larger and more powerful looking
    p.fill(100, 100, 130);
    p.stroke(0, 255, 150);
    p.strokeWeight(3);
    p.rect(centerX - 28, centerY - 65, 56, 48, 3);
    
    // Motor details
    p.fill(80, 80, 110);
    p.noStroke();
    p.rect(centerX - 24, centerY - 61, 48, 8);
    p.rect(centerX - 24, centerY - 25, 48, 8);
    
    // Gear indicator
    p.fill(120, 180, 120);
    p.stroke(80, 140, 80);
    p.strokeWeight(2);
    p.circle(centerX, centerY - 41, 24);
    
    // Gear teeth
    for (let i = 0; i < 8; i++) {
      const gearAngle = (p.TWO_PI / 8) * i + (transitionTimer * 0.02);
      const x = centerX + 14 * Math.cos(gearAngle);
      const y = centerY - 41 + 14 * Math.sin(gearAngle);
      p.line(centerX + 10 * Math.cos(gearAngle), centerY - 41 + 10 * Math.sin(gearAngle), x, y);
    }
    
    p.textSize(10);
    p.fill(255, 255, 150);
    p.noStroke();
    p.text('Tetrix', centerX, centerY - 50);
    p.text('40:1', centerX, centerY - 38);
    
    // Power indicator
    p.fill(100, 255, 100, 150);
    p.noStroke();
    const powerLevel = Math.abs(Math.sin(transitionTimer * 0.05)) * 20 + 5;
    p.rect(centerX - 35, centerY - 72, powerLevel * 3, 5, 2);
    
    p.textSize(8);
    p.fill(100, 255, 100);
    p.text('High Torque', centerX, centerY - 75);
    
    // Draw pantograph mechanism - full extension capability
    const extension = angle; // Full extension range
    drawPantographMechanism(p, centerX, centerY, extension, pixelAttached);
    
    // Pixel being carried smoothly
    if (pixelAttached && extension > 0.3) {
      const endPoint = calculateArmEndpoint(centerX, centerY, extension);
      drawPixel(p, endPoint.x, endPoint.y - 25, 12, '#FF00FF');
      
      // Motion trail
      p.stroke(255, 0, 255, 50);
      p.strokeWeight(2);
      p.noFill();
      const trailPoints = 5;
      for (let i = 0; i < trailPoints; i++) {
        const trailExt = extension - (i * 0.05);
        if (trailExt > 0) {
          const trailPt = calculateArmEndpoint(centerX, centerY, trailExt);
          p.circle(trailPt.x, trailPt.y - 25, 8 - i);
        }
      }
    }
    
    // Success indicator
    if (extension > 0.6) {
      p.textSize(12);
      p.fill(100, 255, 150);
      p.noStroke();
      p.text('✓ Smooth & Powerful', centerX, centerY - 150);
    }
    
    // Advantages list on the right
    const advantagesX = p.width / 2 + 200;
    p.textSize(14);
    p.fill(100, 255, 150);
    p.noStroke();
    p.text('✓ Advantages:', advantagesX, centerY - 60);
    
    p.textSize(13);
    p.fill(200, 220, 220);
    const advantages = [
      '• High torque for lifting',
      '• Smooth position control',
      '• Reliable under load',
      '• Expansion Hub powered',
      '• Successfully deployed!'
    ];
    
    for (let i = 0; i < advantages.length; i++) {
      p.text(advantages[i], advantagesX, centerY - 35 + i * 22);
    }
    
    // Team attribution
    p.textSize(10);
    p.fill(120, 140, 140);
    p.text('Final Design: Maia Sava, Cristian Ghidireac', centerX, p.height - 25);
  };

  const drawPantographMechanism = (p: p5, baseX: number, baseY: number, extension: number, hasPixel: boolean) => {
    const segmentLength = 70;
    const verticalOffset = 60;
    const angle = extension * (p.PI / 3); // Max 60 degrees
    
    // Calculate linkage points (parallelogram)
    const p1 = { x: baseX, y: baseY - 15 }; // Base pivot
    const p2 = { x: baseX + segmentLength * Math.cos(-angle), y: baseY - 15 - segmentLength * Math.sin(-angle) };
    const p3 = { x: p2.x, y: p2.y - verticalOffset };
    const p4 = { x: baseX, y: baseY - 15 - verticalOffset };
    
    // Draw linkages (arms)
    p.stroke(100, 220, 120);
    p.strokeWeight(4);
    p.line(p1.x, p1.y, p2.x, p2.y);
    p.line(p4.x, p4.y, p3.x, p3.y);
    
    // Vertical supports
    p.stroke(80, 180, 100);
    p.strokeWeight(3);
    p.line(p1.x, p1.y, p4.x, p4.y);
    p.line(p2.x, p2.y, p3.x, p3.y);
    
    // Pivot joints
    p.fill(150, 255, 150);
    p.noStroke();
    p.circle(p1.x, p1.y, 12);
    p.circle(p2.x, p2.y, 12);
    p.circle(p3.x, p3.y, 12);
    p.circle(p4.x, p4.y, 12);
    
    // Inner pivot circles
    p.fill(80, 180, 100);
    p.circle(p1.x, p1.y, 6);
    p.circle(p2.x, p2.y, 6);
    p.circle(p3.x, p3.y, 6);
    p.circle(p4.x, p4.y, 6);
    
    // Intake claw at end
    p.fill(100, 180, 220);
    p.stroke(60, 120, 160);
    p.strokeWeight(3);
    p.rect(p3.x - 20, p3.y - 15, 40, 30, 3);
    
    // Claw details
    p.fill(80, 150, 180);
    p.noStroke();
    p.rect(p3.x - 18, p3.y - 12, 16, 24, 2);
    p.rect(p3.x + 2, p3.y - 12, 16, 24, 2);
    
    p.textSize(9);
    p.fill(255);
    p.noStroke();
    p.text('Claw', p3.x, p3.y + 2);
    
    // Constant angle indicator (horizontal line through claw)
    p.stroke(255, 200, 0);
    p.strokeWeight(2);
    p.line(p3.x - 30, p3.y, p3.x + 30, p3.y);
    
    p.textSize(8);
    p.fill(255, 200, 0);
    p.noStroke();
    p.text('Constant angle', p3.x, p3.y + 35);
    
    // Extension measurement
    const extPercent = Math.round(extension * 100);
    p.textSize(10);
    p.fill(150, 200, 255);
    p.text(extPercent + '% extended', baseX, baseY - 160);
  };

  const calculateArmEndpoint = (baseX: number, baseY: number, extension: number) => {
    const segmentLength = 70;
    const verticalOffset = 60;
    const angle = extension * (p.PI / 3);
    
    const x = baseX + segmentLength * Math.cos(-angle);
    const y = baseY - 15 - segmentLength * Math.sin(-angle) - verticalOffset;
    
    return { x, y };
  };

  const drawPixel = (p: p5, x: number, y: number, size: number, color: string) => {
    p.push();
    p.translate(x, y);
    
    // Hexagonal pixel
    p.fill(color);
    p.stroke(200, 200, 220);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (p.PI / 3) * i - p.PI / 6;
      const px = size * p.cos(angle);
      const py = size * p.sin(angle);
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);
    
    // Inner detail
    p.noFill();
    p.stroke(150, 150, 170, 150);
    p.strokeWeight(1);
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const angle = (p.PI / 3) * i - p.PI / 6;
      const px = (size * 0.6) * p.cos(angle);
      const py = (size * 0.6) * p.sin(angle);
      p.vertex(px, py);
    }
    p.endShape(p.CLOSE);
    
    p.pop();
  };

  const drawProgressBar = (p: p5, current: number, total: number) => {
    const barWidth = 350;
    const barHeight = 8;
    const x = (p.width - barWidth) / 2;
    const y = p.height - 45;
    
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
    p.text('Transition in ' + Math.ceil((total - current) / 60) + 's', p.width / 2, y - 15);
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
