<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import p5 from 'p5';

const props = defineProps<{
  season: 'centerstage' | 'into-the-deep';
  driverNumber: 1 | 2;
}>();

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Color constants
const COLORS = {
  PRIMARY: [0, 255, 0] as [number, number, number],
  WARNING: [255, 200, 0] as [number, number, number],
  DANGER: [255, 100, 0] as [number, number, number],
  INFO: [100, 200, 255] as [number, number, number]
};

// Controller mappings based on season and driver
const controllerMappings = {
  centerstage: {
    1: [
      { button: 'Left Stick', action: 'Drive & Strafe', color: COLORS.PRIMARY },
      { button: 'Right Stick', action: 'Rotate', color: COLORS.PRIMARY },
      { button: 'D-Pad Up/Down', action: 'Raise/Lower Arm', color: COLORS.PRIMARY },
      { button: 'Y Button', action: 'Arm Drone', color: COLORS.WARNING },
      { button: 'A Button', action: 'Release Drone', color: COLORS.DANGER }
    ],
    2: [
      { button: 'Left Bumper', action: 'Open Intake', color: COLORS.PRIMARY },
      { button: 'Right Bumper', action: 'Close Intake', color: COLORS.PRIMARY },
      { button: 'D-Pad Up/Down', action: 'Assist Arm (Secondary)', color: COLORS.INFO }
    ]
  },
  'into-the-deep': {
    1: [
      { button: 'Left Stick', action: 'Drive & Strafe', color: COLORS.PRIMARY },
      { button: 'Right Stick', action: 'Rotate', color: COLORS.PRIMARY }
    ],
    2: [
      { button: 'D-Pad Up/Down', action: 'Extend/Retract Slider', color: COLORS.PRIMARY },
      { button: 'Left Stick Y', action: 'Raise/Lower Intake', color: COLORS.PRIMARY },
      { button: 'Left Bumper', action: 'Open Intake', color: COLORS.WARNING },
      { button: 'Right Bumper', action: 'Close Intake & Out-take', color: COLORS.DANGER }
    ]
  }
};

const sketch = (p: p5) => {
  let rotation = 0;
  let pulsePhase = 0;
  let activeButton = 0;
  let buttonHighlights: number[] = [];

  p.setup = () => {
    const container = canvasContainer.value;
    if (!container) return;
    
    const width = container.clientWidth;
    const height = Math.min(500, width * 0.6);
    p.createCanvas(width, height);
    p.frameRate(30);
    
    // Initialize button highlights
    const mappings = controllerMappings[props.season][props.driverNumber];
    buttonHighlights = new Array(mappings.length).fill(0);
  };

  p.draw = () => {
    // Dark background
    p.background(20, 25, 30);
    p.translate(p.width / 2, p.height / 2);

    const mappings = controllerMappings[props.season][props.driverNumber];
    
    // Draw controller body
    drawController(p);
    
    // Draw button indicators
    drawButtonIndicators(p, mappings);
    
    // Animate highlights
    pulsePhase += 0.05;
    activeButton = Math.floor((pulsePhase / 3) % mappings.length);
    
    for (let i = 0; i < buttonHighlights.length; i++) {
      if (i === activeButton) {
        buttonHighlights[i] = Math.min(1, buttonHighlights[i] + 0.05);
      } else {
        buttonHighlights[i] = Math.max(0, buttonHighlights[i] - 0.03);
      }
    }
  };

  const drawController = (p: p5) => {
    const scale = Math.min(p.width, p.height) / 400;
    
    p.push();
    // Controller body
    p.fill(40, 45, 50);
    p.stroke(0, 255, 0, 100);
    p.strokeWeight(2 * scale);
    
    // Main body
    p.beginShape();
    p.vertex(-120 * scale, -60 * scale);
    p.vertex(120 * scale, -60 * scale);
    p.vertex(140 * scale, 0);
    p.vertex(120 * scale, 60 * scale);
    p.vertex(-120 * scale, 60 * scale);
    p.vertex(-140 * scale, 0);
    p.endShape(p.CLOSE);
    
    // Left grip
    p.ellipse(-100 * scale, 0, 60 * scale, 80 * scale);
    // Right grip
    p.ellipse(100 * scale, 0, 60 * scale, 80 * scale);
    
    // Left stick
    p.fill(60, 65, 70);
    p.stroke(0, 255, 0, 150);
    p.circle(-60 * scale, 10 * scale, 40 * scale);
    
    // Right stick
    p.circle(60 * scale, 10 * scale, 40 * scale);
    
    // D-pad
    p.push();
    p.translate(-60 * scale, -30 * scale);
    p.fill(50, 55, 60);
    p.noStroke();
    p.rect(-15 * scale, -5 * scale, 30 * scale, 10 * scale); // horizontal
    p.rect(-5 * scale, -15 * scale, 10 * scale, 30 * scale); // vertical
    p.pop();
    
    // Action buttons (A, B, X, Y)
    const buttonPositions = [
      { x: 60 * scale, y: -30 * scale, label: 'Y' },
      { x: 75 * scale, y: -15 * scale, label: 'B' },
      { x: 60 * scale, y: 0, label: 'A' },
      { x: 45 * scale, y: -15 * scale, label: 'X' }
    ];
    
    buttonPositions.forEach(btn => {
      p.fill(50, 55, 60);
      p.stroke(0, 255, 0, 150);
      p.strokeWeight(1 * scale);
      p.circle(btn.x, btn.y, 15 * scale);
      p.fill(0, 255, 0);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(10 * scale);
      p.text(btn.label, btn.x, btn.y);
    });
    
    // Bumpers
    p.fill(50, 55, 60);
    p.stroke(0, 255, 0, 150);
    p.strokeWeight(2 * scale);
    p.rect(-100 * scale, -70 * scale, 60 * scale, 8 * scale, 4 * scale); // Left bumper
    p.rect(40 * scale, -70 * scale, 60 * scale, 8 * scale, 4 * scale); // Right bumper
    
    // Center button (Home/Mode)
    p.fill(40, 45, 50);
    p.circle(0, -10 * scale, 20 * scale);
    
    p.pop();
  };

  const drawButtonIndicators = (p: p5, mappings: typeof controllerMappings['centerstage'][1]) => {
    const scale = Math.min(p.width, p.height) / 400;
    const startY = p.height / 2 - 100 * scale;
    const leftX = -p.width / 2 + 20;
    const lineHeight = 25 * scale;
    
    p.push();
    p.translate(-p.width / 2, -p.height / 2);
    
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(12 * scale);
    
    mappings.forEach((mapping, index) => {
      const y = startY + index * lineHeight;
      const highlight = buttonHighlights[index];
      const pulseGlow = Math.sin(pulsePhase * 2) * 0.3 + 0.7;
      
      // Highlight background
      if (highlight > 0) {
        p.fill(mapping.color[0], mapping.color[1], mapping.color[2], highlight * 30);
        p.noStroke();
        p.rect(leftX, y, p.width / 2 - 40, lineHeight - 2, 4);
      }
      
      // Button circle
      const circleGlow = highlight * pulseGlow;
      p.fill(mapping.color[0], mapping.color[1], mapping.color[2], 150 + circleGlow * 100);
      p.stroke(mapping.color[0], mapping.color[1], mapping.color[2], 200 + circleGlow * 55);
      p.strokeWeight((1 + highlight * 2) * scale);
      p.circle(leftX + 10 * scale, y + lineHeight / 2, 12 * scale);
      
      // Button label
      p.fill(200, 200, 200);
      p.noStroke();
      p.text(mapping.button, leftX + 20 * scale, y + 2);
      
      // Action description
      p.fill(mapping.color[0], mapping.color[1], mapping.color[2]);
      p.text(mapping.action, leftX + 20 * scale, y + lineHeight / 2 + 2);
    });
    
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

// Restart animation when props change
watch(() => [props.season, props.driverNumber], () => {
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }
  if (canvasContainer.value) {
    p5Instance = new p5(sketch, canvasContainer.value);
  }
});
</script>

<template>
  <div class="controller-animation">
    <div class="controller-header">
      <h4>Driver {{ driverNumber }} Controller</h4>
      <p class="driver-role">
        <template v-if="season === 'centerstage'">
          {{ driverNumber === 1 ? 'Movement & Arm Control' : 'Intake & Drone Assist' }}
        </template>
        <template v-else>
          {{ driverNumber === 1 ? 'Movement Control' : 'Slider & Intake Control' }}
        </template>
      </p>
    </div>
    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>

<style scoped>
.controller-animation {
  width: 100%;
  margin: 2vw 0;
  background: rgba(0, 0, 0, 0.3);
  border: 0.15vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
  padding: 1.5vw;
  overflow: hidden;
}

.controller-header {
  text-align: center;
  margin-bottom: 1vw;
}

.controller-header h4 {
  color: var(--mechabyte-green);
  font-size: 1.4vw;
  margin-bottom: 0.5vw;
}

.driver-role {
  color: #aaa;
  font-size: 0.9vw;
  font-style: italic;
}

.canvas-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 1000px) {
  .controller-animation {
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 15px;
  }

  .controller-header h4 {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .driver-role {
    font-size: 13px;
  }
}
</style>
