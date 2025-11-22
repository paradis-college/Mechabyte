<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import p5 from 'p5';

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let tensionAmount = 0;
  let released = false;
  let droneY = 0;
  let droneVelocityY = 0;
  let animationTimer = 0;

  p.setup = () => {
    const canvas = p.createCanvas(600, 400);
    canvas.parent(canvasContainer.value!);
  };

  p.draw = () => {
    p.background(30, 30, 40);
    animationTimer++;
    
    // Title
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text('Drone Launcher Mechanism', p.width / 2, 30);
    
    p.textSize(11);
    p.fill(200);
    p.text('Elastic band under tension releases drone', p.width / 2, 50);
    
    if (!released && animationTimer < 180) {
      // Building tension phase
      tensionAmount = p.map(animationTimer, 0, 180, 0, 60);
    } else if (!released && animationTimer >= 180) {
      // Release!
      released = true;
      droneVelocityY = -8;
    } else if (released) {
      // Drone flying
      droneY += droneVelocityY;
      droneVelocityY += 0.15; // Gravity
    }
    
    // Reset animation smoothly
    if (animationTimer > 400) {
      animationTimer = 0;
      released = false;
      droneY = 0;
      droneVelocityY = 0;
      tensionAmount = 0;
    }
    
    drawLauncher(p, tensionAmount, released, droneY);
  };

  const drawLauncher = (p: p5, tension: number, isReleased: boolean, dY: number) => {
    const baseX = p.width / 2;
    const baseY = p.height / 2 + 50;
    
    // Launcher plate
    p.fill(80, 80, 90);
    p.stroke(0, 200, 0);
    p.strokeWeight(3);
    p.rect(baseX - 100, baseY - 40, 200, 80);
    
    // Three channels
    p.textSize(8);
    p.fill(150);
    p.noStroke();
    p.text('Drone', baseX - 60, baseY - 20);
    p.text('Elastic', baseX, baseY - 20);
    p.text('Rod', baseX + 60, baseY - 20);
    
    // Channel guides
    p.stroke(100);
    p.strokeWeight(1);
    p.line(baseX - 60, baseY - 30, baseX - 60, baseY + 30);
    p.line(baseX, baseY - 30, baseX, baseY + 30);
    p.line(baseX + 60, baseY - 30, baseX + 60, baseY + 30);
    
    // Elastic band (stretched based on tension)
    if (!isReleased) {
      p.stroke(255, 200, 0);
      p.strokeWeight(4);
      const elasticStart = baseY - 30;
      const elasticEnd = baseY + 30 - tension;
      p.line(baseX, elasticStart, baseX, elasticEnd);
      
      // Mobile rod holding elastic
      p.fill(150);
      p.stroke(200);
      p.strokeWeight(2);
      p.rect(baseX - 15, elasticEnd - 5, 30, 10);
      
      // Servo controlling rod
      p.fill(100);
      p.stroke(0, 255, 0);
      p.circle(baseX + 80, elasticEnd, 20);
      p.textSize(7);
      p.fill(0, 255, 0);
      p.noStroke();
      p.text('Servo', baseX + 80, elasticEnd + 3);
      
      // Connection to servo
      p.stroke(150);
      p.strokeWeight(1);
      p.line(baseX + 15, elasticEnd, baseX + 70, elasticEnd);
    } else {
      // Elastic released - show stretched position
      p.stroke(255, 200, 0);
      p.strokeWeight(2);
      p.line(baseX, baseY - 30, baseX, baseY + 30);
    }
    
    // Paper drone
    if (!isReleased) {
      p.fill(255, 200, 100);
      p.stroke(200);
      p.strokeWeight(1);
      p.triangle(baseX - 60, baseY - 20, baseX - 70, baseY - 10, baseX - 50, baseY - 10);
    } else {
      // Flying drone
      const droneX = baseX - 60;
      const droneYPos = baseY - 20 + dY;
      p.fill(255, 200, 100);
      p.stroke(200);
      p.strokeWeight(1);
      p.triangle(droneX, droneYPos, droneX - 10, droneYPos + 10, droneX + 10, droneYPos + 10);
      
      // Motion lines
      p.stroke(255, 200, 100, 100);
      p.strokeWeight(2);
      for (let i = 1; i < 4; i++) {
        p.line(droneX, droneYPos + i * 15, droneX, droneYPos + i * 15 + 5);
      }
    }
    
    // Labels
    p.textSize(9);
    p.fill(0, 255, 0);
    p.noStroke();
    if (!isReleased) {
      p.text('Arming: Building tension...', p.width / 2, p.height - 60);
      p.fill(200);
      p.text(`Tension: ${Math.floor(tension / 60 * 100)}%`, p.width / 2, p.height - 45);
    } else {
      p.text('Released! Drone launched', p.width / 2, p.height - 60);
    }
    
    // Team attribution
    p.textSize(8);
    p.fill(150);
    p.text('Built by: Cristian Ghidireac, David Grigore', p.width / 2, p.height - 20);
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
    <p class="animation-caption">Drone launcher: Elastic band held under tension by servo-controlled rod, released during endgame</p>
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
