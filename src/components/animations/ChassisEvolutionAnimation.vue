<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let showVersion = 0; // 0: X-drive, 1: Mecanum
  let transitionTimer = 0;
  const transitionTime = 240;

  p.setup = () => {
    const canvas = p.createCanvas(600, 400);
    canvas.parent(canvasContainer.value!);
  };

  p.draw = () => {
    p.background(30, 30, 40);
    
    transitionTimer++;
    if (transitionTimer > transitionTime) {
      showVersion = (showVersion + 1) % 2;
      transitionTimer = 0;
    }
    
    // Title
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Chassis Evolution', p.width / 2, 30);
    
    if (showVersion === 0) {
      drawXDrive(p);
    } else {
      drawMecanumDrive(p);
    }
  };

  const drawXDrive = (p: p5) => {
    const centerX = p.width / 2;
    const centerY = p.height / 2;
    
    p.textSize(14);
    p.fill(0, 255, 0);
    p.text('Version 1: X-Drive (45° Omni Wheels)', centerX, 60);
    
    p.textSize(11);
    p.fill(200);
    p.text('Stable but cramped - Control Hub zip-tied', centerX, 85);
    
    // Chassis frame
    p.stroke(0, 200, 0);
    p.strokeWeight(3);
    p.noFill();
    p.rect(centerX - 100, centerY - 80, 200, 160);
    
    // X-Drive wheels at 45 degrees
    const wheelPositions = [
      { x: centerX - 90, y: centerY - 70 },  // Top-left
      { x: centerX + 90, y: centerY - 70 },  // Top-right
      { x: centerX - 90, y: centerY + 70 },  // Bottom-left
      { x: centerX + 90, y: centerY + 70 }   // Bottom-right
    ];
    
    for (let i = 0; i < wheelPositions.length; i++) {
      const pos = wheelPositions[i];
      p.push();
      p.translate(pos.x, pos.y);
      p.rotate(p.PI / 4); // 45 degree rotation
      
      // Wheel
      p.fill(255, 200, 0);
      p.stroke(200);
      p.strokeWeight(2);
      p.rect(-15, -8, 30, 16);
      
      // Rollers to show omni wheel
      p.stroke(150);
      p.strokeWeight(1);
      for (let j = -10; j < 15; j += 5) {
        p.line(j, -8, j, 8);
      }
      
      p.pop();
    }
    
    // Control hub (with zip-tie indicator)
    p.fill(60, 60, 80);
    p.stroke(0, 255, 0);
    p.strokeWeight(2);
    p.rect(centerX - 30, centerY - 20, 60, 40);
    
    p.textSize(8);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Control Hub', centerX, centerY);
    
    // Zip-tie (red indicator of fragile attachment)
    p.stroke(255, 50, 50);
    p.strokeWeight(3);
    p.noFill();
    p.arc(centerX - 30, centerY - 20, 20, 20, p.PI, p.PI + p.HALF_PI);
    
    // Issues label
    p.textSize(9);
    p.fill(255, 100, 100);
    p.text('Issue: Zip-tied hub, cramped space', centerX, centerY + 110);
    
    // Team attribution
    p.textSize(8);
    p.fill(150);
    p.text('Built by: Maia Sava, Șerban Untu, Rareș Cozma', centerX, p.height - 20);
  };

  const drawMecanumDrive = (p: p5) => {
    const centerX = p.width / 2;
    const centerY = p.height / 2;
    
    p.textSize(14);
    p.fill(0, 255, 0);
    p.text('Version 2: Mecanum Drive (Final)', centerX, 60);
    
    p.textSize(11);
    p.fill(200);
    p.text('Spacious, stable, with Expansion Hub', centerX, 85);
    
    // Larger chassis frame
    p.stroke(0, 200, 0);
    p.strokeWeight(3);
    p.noFill();
    p.rect(centerX - 120, centerY - 90, 240, 180);
    
    // Mecanum wheels (0 degree, with rollers at 45°)
    const wheelPositions = [
      { x: centerX - 110, y: centerY - 80 },
      { x: centerX + 110, y: centerY - 80 },
      { x: centerX - 110, y: centerY + 80 },
      { x: centerX + 110, y: centerY + 80 }
    ];
    
    for (let i = 0; i < wheelPositions.length; i++) {
      const pos = wheelPositions[i];
      p.push();
      p.translate(pos.x, pos.y);
      
      // Wheel body
      p.fill(255, 200, 0);
      p.stroke(200);
      p.strokeWeight(2);
      p.rect(-15, -10, 30, 20);
      
      // Diagonal rollers for mecanum
      p.stroke(150);
      p.strokeWeight(2);
      const rollerAngle = (i === 0 || i === 3) ? p.PI / 4 : -p.PI / 4;
      for (let j = -12; j < 15; j += 6) {
        p.push();
        p.translate(j, 0);
        p.rotate(rollerAngle);
        p.line(0, -12, 0, 12);
        p.pop();
      }
      
      p.pop();
    }
    
    // Control Hub + Expansion Hub (properly mounted)
    p.fill(60, 60, 80);
    p.stroke(0, 255, 0);
    p.strokeWeight(2);
    p.rect(centerX - 40, centerY - 30, 80, 25);
    p.rect(centerX - 40, centerY + 5, 80, 25);
    
    p.textSize(7);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Control Hub', centerX, centerY - 17);
    p.text('Expansion Hub', centerX, centerY + 18);
    
    // Custom holders (green mounting points)
    p.fill(0, 255, 0);
    for (let dx of [-40, 40]) {
      for (let dy of [-30, 30]) {
        p.circle(centerX + dx, centerY + dy, 8);
      }
    }
    
    // Success label
    p.textSize(9);
    p.fill(0, 255, 0);
    p.text('Success: Stable, custom mounts, more space', centerX, centerY + 110);
    
    // Team attribution
    p.textSize(8);
    p.fill(150);
    p.text('Built by: Maia Sava, Șerban Untu, Cristian Ghidireac', centerX, p.height - 20);
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
    <p class="animation-caption">Chassis Evolution: From cramped X-drive to spacious Mecanum drive with proper hub mounting</p>
  </div>
</template>

<style scoped>
.animation-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vw;
  margin: 2vw 0;
}

.canvas-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  border: 0.2vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  background: #1a1a20;
}

.animation-caption {
  font-size: 0.9vw;
  color: var(--mechabyte-green);
  text-align: center;
  font-style: italic;
}

@media only screen and (max-width: 1000px) {
  .animation-caption {
    font-size: 12px;
  }
  
  .canvas-container {
    border: 2px solid var(--mechabyte-green);
  }
}
</style>
