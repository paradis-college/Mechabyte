<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import p5 from 'p5';

const props = defineProps<{
  component: 'claw' | 'intake' | 'viper-slide' | 'storage-box';
  title?: string;
}>();

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;
const currentVersion = ref(1);
const maxVersions = ref(3);

const versionInfo = {
  claw: [
    {
      name: 'V1 - Original Claw',
      description: 'Too big, couldn\'t close fully, specimens fell',
      color: [255, 100, 100]
    },
    {
      name: 'V2 - Redesigned Shape',
      description: 'Added structural support, improved closure',
      color: [255, 200, 100]
    },
    {
      name: 'V3 - Final with Stoppers',
      description: 'Replaced blades with stoppers, added 3D-printed discs',
      color: [100, 255, 100]
    }
  ],
  intake: [
    {
      name: 'V1 - Oversized Design',
      description: 'Heavy butcher-shop blades, often parallel alignment',
      color: [255, 100, 100]
    },
    {
      name: 'V2 - Lighter Blades',
      description: 'Reduced weight, but still alignment issues',
      color: [255, 200, 100]
    },
    {
      name: 'V3 - Blade Stabilizers',
      description: '3D-printed hexagonal discs lock blades at 90°',
      color: [100, 255, 100]
    }
  ],
  'viper-slide': [
    {
      name: 'V1 - Horizontal Viper',
      description: 'Wobbly, off-center, couldn\'t reach basket',
      color: [255, 100, 100]
    },
    {
      name: 'V2 - Vertical Viper',
      description: 'Improved but still unstable',
      color: [255, 200, 100]
    },
    {
      name: 'V3 - Single Vertical Slider',
      description: 'Centered, stable, reaches high basket reliably',
      color: [100, 255, 100]
    }
  ],
  'storage-box': [
    {
      name: 'V1 - Original Box',
      description: 'Didn\'t reach basket, limited space for samples',
      color: [255, 100, 100]
    },
    {
      name: 'V2 - Elevated Design',
      description: 'Better height but still issues with sample drop',
      color: [255, 200, 100]
    },
    {
      name: 'V3 - Direct Transfer',
      description: 'Eliminated box, intake grabs and slider lifts directly',
      color: [100, 255, 100]
    }
  ]
};

const sketch = (p: p5) => {
  let animationPhase = 0;

  p.setup = () => {
    const container = canvasContainer.value;
    if (!container) return;
    
    const width = container.clientWidth;
    const height = Math.min(500, width * 0.6);
    p.createCanvas(width, height);
    p.frameRate(30);
  };

  p.draw = () => {
    // Background
    p.background(15, 20, 25);
    
    p.translate(p.width / 2, p.height / 2);
    
    const scale = Math.min(p.width, p.height) / 400;
    animationPhase += 0.02;
    
    const versions = versionInfo[props.component];
    const currentInfo = versions[currentVersion.value - 1];
    
    // Draw component based on type and version
    switch (props.component) {
      case 'claw':
        drawClaw(p, scale, currentVersion.value, currentInfo.color);
        break;
      case 'intake':
        drawIntake(p, scale, currentVersion.value, currentInfo.color);
        break;
      case 'viper-slide':
        drawViperSlide(p, scale, currentVersion.value, currentInfo.color);
        break;
      case 'storage-box':
        drawStorageBox(p, scale, currentVersion.value, currentInfo.color);
        break;
    }
    
    // Draw version info overlay
    drawVersionInfo(p, scale, currentInfo);
  };

  const drawClaw = (p: p5, scale: number, version: number, color: number[]) => {
    const openAngle = Math.sin(animationPhase) * 20 + 30;
    
    p.push();
    
    // Base
    p.fill(50, 55, 60);
    p.stroke(color[0], color[1], color[2]);
    p.strokeWeight(2 * scale);
    p.rect(-30 * scale, -10 * scale, 60 * scale, 20 * scale, 3 * scale);
    
    // Left arm
    p.push();
    p.translate(-20 * scale, 0);
    
    if (version === 1) {
      // V1: Too big, awkward shape
      p.rotate(-openAngle * 1.5 * Math.PI / 180);
      p.fill(60, 65, 70);
      p.rect(-10 * scale, 0, 20 * scale, 60 * scale, 2 * scale);
      // Show gap (can't close)
      p.fill(255, 100, 100, 100);
      p.noStroke();
      p.circle(0, 50 * scale, 15 * scale);
    } else if (version === 2) {
      // V2: Better shape, but still issues
      p.rotate(-openAngle * Math.PI / 180);
      p.fill(70, 75, 80);
      p.rect(-8 * scale, 0, 16 * scale, 50 * scale, 2 * scale);
    } else {
      // V3: Final design with stabilizers
      p.rotate(-openAngle * 0.7 * Math.PI / 180);
      p.fill(70, 75, 80);
      p.rect(-8 * scale, 0, 16 * scale, 45 * scale, 2 * scale);
      // 3D printed disc
      p.fill(color[0], color[1], color[2], 150);
      p.circle(0, 40 * scale, 14 * scale);
      p.fill(255);
      p.noStroke();
      p.textSize(6 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('3D', 0, 40 * scale);
    }
    p.pop();
    
    // Right arm (mirror)
    p.push();
    p.translate(20 * scale, 0);
    
    if (version === 1) {
      p.rotate(openAngle * 1.5 * Math.PI / 180);
      p.fill(60, 65, 70);
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(2 * scale);
      p.rect(-10 * scale, 0, 20 * scale, 60 * scale, 2 * scale);
    } else if (version === 2) {
      p.rotate(openAngle * Math.PI / 180);
      p.fill(70, 75, 80);
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(2 * scale);
      p.rect(-8 * scale, 0, 16 * scale, 50 * scale, 2 * scale);
    } else {
      p.rotate(openAngle * 0.7 * Math.PI / 180);
      p.fill(70, 75, 80);
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(2 * scale);
      p.rect(-8 * scale, 0, 16 * scale, 45 * scale, 2 * scale);
      p.fill(color[0], color[1], color[2], 150);
      p.circle(0, 40 * scale, 14 * scale);
      p.fill(255);
      p.noStroke();
      p.textSize(6 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('3D', 0, 40 * scale);
    }
    p.pop();
    
    p.pop();
  };

  const drawIntake = (p: p5, scale: number, version: number, color: number[]) => {
    const rotation = animationPhase * 50;
    
    p.push();
    
    // Base motor
    p.fill(40, 45, 50);
    p.stroke(color[0], color[1], color[2]);
    p.strokeWeight(2 * scale);
    p.rect(-40 * scale, -15 * scale, 80 * scale, 30 * scale, 3 * scale);
    
    // Rotating shaft
    p.push();
    p.rotate(rotation * Math.PI / 180);
    
    if (version === 1) {
      // V1: Heavy blades
      p.strokeWeight(5 * scale);
      p.stroke(150, 150, 150);
      p.line(-50 * scale, 0, 50 * scale, 0);
      p.line(0, -50 * scale, 0, 50 * scale);
      // Show warning
      p.fill(255, 100, 100, 150);
      p.noStroke();
      p.textSize(8 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('HEAVY', 0, -60 * scale);
    } else if (version === 2) {
      // V2: Lighter but still parallel
      p.strokeWeight(3 * scale);
      p.stroke(180, 180, 180);
      p.line(-45 * scale, 0, 45 * scale, 0);
      p.line(0, -45 * scale, 0, 45 * scale);
    } else {
      // V3: With stabilizers
      p.strokeWeight(2 * scale);
      p.stroke(200, 200, 200);
      p.line(-40 * scale, 0, 40 * scale, 0);
      p.line(0, -40 * scale, 0, 40 * scale);
      
      // Hexagonal disc stabilizers
      p.fill(color[0], color[1], color[2], 200);
      p.noStroke();
      
      for (let i = 0; i < 4; i++) {
        p.push();
        p.rotate((i * Math.PI) / 2);
        p.translate(35 * scale, 0);
        
        // Hexagon
        p.beginShape();
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j;
          const x = Math.cos(angle) * 8 * scale;
          const y = Math.sin(angle) * 8 * scale;
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
        
        p.pop();
      }
    }
    
    p.pop();
    p.pop();
  };

  const drawViperSlide = (p: p5, scale: number, version: number, color: number[]) => {
    const slideExtension = Math.sin(animationPhase) * 40;
    
    p.push();
    
    if (version === 1) {
      // V1: Horizontal + Vertical (complex, wobbly)
      // Vertical rail
      p.stroke(100, 100, 100);
      p.strokeWeight(3 * scale);
      p.line(-30 * scale, -60 * scale, -30 * scale, 60 * scale);
      
      // Horizontal rail (wobbly)
      const wobble = Math.sin(animationPhase * 3) * 5;
      p.stroke(150, 100, 100);
      p.line(-30 * scale, wobble * scale, 60 * scale + slideExtension * scale, wobble * scale);
      
      // Carriage
      p.fill(60, 65, 70);
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(2 * scale);
      p.rect(-30 * scale + slideExtension * scale, -10 * scale + wobble * scale, 30 * scale, 20 * scale);
      
      // Warning indicator
      p.fill(255, 100, 100);
      p.noStroke();
      p.textSize(7 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('WOBBLE', 20 * scale, -40 * scale);
    } else if (version === 2) {
      // V2: Vertical only but still off-center
      p.stroke(120, 120, 120);
      p.strokeWeight(3 * scale);
      p.line(-20 * scale, -60 * scale, -20 * scale, 60 * scale);
      p.line(20 * scale, -60 * scale, 20 * scale, 60 * scale);
      
      // Carriage
      p.fill(65, 70, 75);
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(2 * scale);
      p.rect(-30 * scale, -slideExtension * scale - 10 * scale, 60 * scale, 20 * scale);
    } else {
      // V3: Single centered vertical slider
      p.stroke(140, 140, 140);
      p.strokeWeight(4 * scale);
      p.line(-15 * scale, -70 * scale, -15 * scale, 60 * scale);
      p.line(15 * scale, -70 * scale, 15 * scale, 60 * scale);
      
      // Carriage
      p.fill(70, 75, 80);
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(2 * scale);
      p.rect(-25 * scale, -slideExtension * scale - 10 * scale, 50 * scale, 20 * scale, 3 * scale);
      
      // Checkmark
      p.fill(color[0], color[1], color[2]);
      p.noStroke();
      p.textSize(10 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('✓', 0, -slideExtension * scale);
    }
    
    p.pop();
  };

  const drawStorageBox = (p: p5, scale: number, version: number, color: number[]) => {
    p.push();
    
    const bobbing = Math.sin(animationPhase * 2) * 5;
    
    if (version === 1) {
      // V1: Low box
      p.fill(50, 55, 60);
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(2 * scale);
      p.rect(-40 * scale, 20 * scale + bobbing * scale, 80 * scale, 40 * scale, 3 * scale);
      
      // Show it can't reach
      p.stroke(255, 100, 100);
      p.strokeWeight(1 * scale);
      p.line(0, 20 * scale + bobbing * scale, 0, -60 * scale);
      p.fill(255, 100, 100);
      p.noStroke();
      p.textSize(7 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('CAN\'T REACH', 0, -50 * scale);
    } else if (version === 2) {
      // V2: Higher box
      p.fill(55, 60, 65);
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(2 * scale);
      p.rect(-40 * scale, -10 * scale + bobbing * scale, 80 * scale, 40 * scale, 3 * scale);
      
      // Still issues
      p.fill(255, 200, 100);
      p.noStroke();
      p.textSize(7 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('BETTER', 0, -40 * scale);
    } else {
      // V3: No box - direct transfer
      p.noFill();
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(2 * scale);
      p.circle(0, 0, 80 * scale);
      
      // Arrow showing direct path
      p.stroke(color[0], color[1], color[2]);
      p.strokeWeight(3 * scale);
      p.line(0, -30 * scale, 0, -60 * scale);
      // Arrowhead
      p.line(0, -60 * scale, -10 * scale, -50 * scale);
      p.line(0, -60 * scale, 10 * scale, -50 * scale);
      
      p.fill(color[0], color[1], color[2]);
      p.noStroke();
      p.textSize(8 * scale);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('DIRECT\nTRANSFER', 0, 0);
    }
    
    p.pop();
  };

  const drawVersionInfo = (p: p5, scale: number, info: typeof versionInfo.claw[0]) => {
    p.push();
    
    // Info box
    const boxWidth = p.width * 0.9;
    const boxHeight = 80 * scale;
    const boxX = -boxWidth / 2;
    const boxY = p.height / 2 - boxHeight - 20 * scale;
    
    p.fill(0, 0, 0, 200);
    p.stroke(info.color[0], info.color[1], info.color[2]);
    p.strokeWeight(2 * scale);
    p.rect(boxX, boxY, boxWidth, boxHeight, 5 * scale);
    
    // Version name
    p.fill(info.color[0], info.color[1], info.color[2]);
    p.noStroke();
    p.textSize(11 * scale);
    p.textAlign(p.LEFT, p.TOP);
    p.text(info.name, boxX + 15 * scale, boxY + 15 * scale);
    
    // Description
    p.fill(200, 200, 200);
    p.textSize(9 * scale);
    p.text(info.description, boxX + 15 * scale, boxY + 40 * scale);
    
    p.pop();
  };

  p.windowResized = () => {
    const container = canvasContainer.value;
    if (!container) return;
    const width = container.clientWidth;
    const height = Math.min(500, width * 0.6);
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

watch(() => currentVersion.value, () => {
  // Animation will update automatically through p5 draw loop
});
</script>

<template>
  <div class="component-evolution-animation">
    <div class="animation-header">
      <h4>{{ title || 'Component Evolution' }}</h4>
      <div class="version-selector">
        <button 
          v-for="v in maxVersions" 
          :key="v"
          :class="{ active: currentVersion === v }"
          @click="currentVersion = v"
          class="version-btn"
        >
          V{{ v }}
        </button>
      </div>
    </div>
    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>

<style scoped>
.component-evolution-animation {
  width: 100%;
  margin: 2vw 0;
  background: rgba(0, 0, 0, 0.3);
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
  margin-bottom: 1vw;
}

.version-selector {
  display: flex;
  justify-content: center;
  gap: 1vw;
}

.version-btn {
  padding: 0.6vw 1.5vw;
  background: rgba(0, 0, 0, 0.5);
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.3vw;
  color: #aaa;
  font-size: 0.9vw;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.version-btn:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: var(--mechabyte-green);
  color: var(--mechabyte-green);
}

.version-btn.active {
  background: rgba(0, 255, 0, 0.2);
  border-color: var(--mechabyte-green);
  color: var(--mechabyte-green);
}

.canvas-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 1000px) {
  .component-evolution-animation {
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
  }

  .animation-header h4 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .version-selector {
    gap: 10px;
  }

  .version-btn {
    padding: 8px 15px;
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 5px;
    font-size: 13px;
  }
}
</style>
