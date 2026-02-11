<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let phase = 0; // 0: Arming, 1: Tensioning, 2: Release, 3: Flight
  let transitionTimer = 0;
  const armingTime = 120; // 2 seconds
  const tensioningTime = 120; // 2 seconds
  const flightTime = 180; // 3 seconds

  let tensionAmount = 0;
  let droneX = 0;
  let droneY = 0;
  let droneVelocityX = 0;
  let droneVelocityY = 0;
  let droneRotation = 0;

  p.setup = () => {
    if (!canvasContainer.value) return;
    const canvas = p.createCanvas(800, 600);
    canvas.parent(canvasContainer.value);
  };

  p.draw = () => {
    p.background(18, 20, 28);

    transitionTimer++;

    // Phase management
    if (phase === 0 && transitionTimer > armingTime) {
      // Start tensioning
      phase = 1;
      transitionTimer = 0;
    } else if (phase === 1 && transitionTimer > tensioningTime) {
      // Release!
      phase = 2;
      transitionTimer = 0;
      // Initial velocity based on tension (elastic potential energy)
      droneVelocityX = 6;
      droneVelocityY = -15;
      droneRotation = -p.PI / 4;
    } else if (phase === 2 && transitionTimer > flightTime) {
      // Reset
      phase = 0;
      transitionTimer = 0;
      tensionAmount = 0;
      droneX = 0;
      droneY = 0;
      droneVelocityX = 0;
      droneVelocityY = 0;
      droneRotation = 0;
    }

    // Tension animation
    if (phase === 1) {
      tensionAmount = p.map(transitionTimer, 0, tensioningTime, 0, 1);
    }

    // Drone flight physics
    if (phase === 2) {
      droneX += droneVelocityX;
      droneY += droneVelocityY;
      droneVelocityY += 0.3; // Gravity
      droneRotation += 0.08; // Tumbling
      droneVelocityX *= 0.99; // Air resistance
    }

    // Title
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text("Drone Launcher: Elastic Band Catapult", p.width / 2, 30);

    // Draw phase indicator
    drawPhaseIndicator(p, phase);

    drawLauncher(p, phase, tensionAmount, droneX, droneY, droneRotation);

    // Progress bar
    drawProgressBar(
      p,
      phase,
      transitionTimer,
      armingTime,
      tensioningTime,
      flightTime,
    );
  };

  const drawPhaseIndicator = (p: p5, currentPhase: number) => {
    const y = 65;
    const spacing = 200;
    const startX = p.width / 2 - spacing;

    const phases = [
      { name: "Arming", color: [255, 180, 0] },
      { name: "Tensioning", color: [255, 150, 0] },
      { name: "Launch", color: [255, 100, 0] },
    ];

    for (let i = 0; i < phases.length; i++) {
      const isActive = i === currentPhase;
      const col = phases[i].color;

      p.fill(col[0], col[1], col[2], isActive ? 255 : 100);
      p.noStroke();
      p.circle(startX + i * spacing, y, 16);

      p.textSize(12);
      p.fill(col[0], col[1], col[2], isActive ? 255 : 150);
      p.text(phases[i].name, startX + i * spacing, y + 25);
    }
  };

  const drawLauncher = (
    p: p5,
    phase: number,
    tension: number,
    dX: number,
    dY: number,
    rotation: number,
  ) => {
    const centerX = p.width / 2 - 200;
    const centerY = p.height / 2 + 80;

    // Launcher base platform
    p.fill(50, 55, 70);
    p.stroke(0, 200, 0);
    p.strokeWeight(4);
    p.rect(centerX - 120, centerY - 50, 240, 100, 5);

    // Mounting bolts
    p.fill(150, 200, 150);
    p.noStroke();
    for (let ox of [-110, -50, 50, 110]) {
      for (let oy of [-45, 45]) {
        p.circle(centerX + ox, centerY + oy, 8);
      }
    }

    p.textSize(11);
    p.fill(0, 255, 100);
    p.noStroke();
    p.text("Launch Platform", centerX, centerY);

    // Three vertical channels
    const channelPositions = [
      { x: -70, label: "Drone\nChannel" },
      { x: 0, label: "Elastic\nBand" },
      { x: 70, label: "Mobile\nRod" },
    ];

    for (const channel of channelPositions) {
      // Channel guides
      p.stroke(100, 120, 100);
      p.strokeWeight(3);
      p.fill(40, 45, 50);
      p.rect(centerX + channel.x - 15, centerY - 120, 30, 240);

      // Guide rails
      p.stroke(120, 140, 120);
      p.strokeWeight(2);
      p.line(
        centerX + channel.x - 12,
        centerY - 115,
        centerX + channel.x - 12,
        centerY + 115,
      );
      p.line(
        centerX + channel.x + 12,
        centerY - 115,
        centerX + channel.x + 12,
        centerY + 115,
      );

      // Labels
      p.textSize(9);
      p.fill(150, 170, 150);
      p.noStroke();
      const lines = channel.label.split("\n");
      for (let i = 0; i < lines.length; i++) {
        p.text(lines[i], centerX + channel.x, centerY - 130 - i * 12);
      }
    }

    // Calculate rod position based on tension
    const rodY = centerY + 100 - tension * 140;

    // Elastic band visualization
    if (phase < 2) {
      // Stretched elastic
      const elasticStart = centerY - 110;
      const elasticEnd = rodY;

      // Draw elastic as multiple strands for realism
      for (let offset of [-3, 0, 3]) {
        p.stroke(220, 180, 40, 200);
        p.strokeWeight(4);
        p.line(centerX + offset, elasticStart, centerX + offset, elasticEnd);
      }

      // Elastic attachment points
      p.fill(180, 140, 20);
      p.noStroke();
      p.rect(centerX - 12, elasticStart - 8, 24, 8, 2);

      // Show tension visually with shimmer effect
      if (phase === 1) {
        p.stroke(255, 220, 100, 150 + Math.sin(transitionTimer * 0.2) * 100);
        p.strokeWeight(2);
        p.noFill();
        for (let i = 0; i < 3; i++) {
          const offset = 8 + i * 4;
          p.line(centerX - offset, elasticStart, centerX - offset, elasticEnd);
          p.line(centerX + offset, elasticStart, centerX + offset, elasticEnd);
        }
      }
    } else {
      // Released - elastic relaxed
      p.stroke(220, 180, 40, 150);
      p.strokeWeight(3);
      for (let offset of [-3, 0, 3]) {
        p.line(
          centerX + offset,
          centerY - 110,
          centerX + offset,
          centerY + 100,
        );
      }
    }

    // Mobile rod (moves down as tension builds)
    if (phase < 2) {
      p.fill(120, 140, 160);
      p.stroke(80, 100, 120);
      p.strokeWeight(3);
      p.rect(centerX - 25, rodY - 8, 50, 16, 3);

      // Rod guides
      p.fill(100, 120, 140);
      p.noStroke();
      p.rect(centerX - 28, rodY - 6, 6, 12, 2);
      p.rect(centerX + 22, rodY - 6, 6, 12, 2);

      // Servo motor
      p.fill(100, 100, 130);
      p.stroke(0, 255, 150);
      p.strokeWeight(3);
      p.rect(centerX + 70 - 20, rodY - 15, 40, 30, 3);

      // Servo horn
      p.fill(120, 180, 120);
      p.stroke(80, 140, 80);
      p.strokeWeight(2);
      p.circle(centerX + 70, rodY, 12);

      p.textSize(10);
      p.fill(255, 255, 150);
      p.noStroke();
      p.text("Servo", centerX + 70, rodY);

      // Linkage from servo to rod
      p.stroke(150, 150, 170);
      p.strokeWeight(3);
      p.line(centerX + 25, rodY, centerX + 62, rodY);

      // Pivot point
      p.fill(200, 220, 200);
      p.noStroke();
      p.circle(centerX + 25, rodY, 8);
    }

    // Paper drone
    if (phase < 2) {
      // Drone in launcher
      const droneChannelX = centerX - 70;
      const droneYPos = rodY - 30;

      drawDrone(p, droneChannelX, droneYPos, 0, false);

      // Loading indicator
      p.textSize(9);
      p.fill(255, 200, 100);
      p.noStroke();
      p.text("Paper Drone", droneChannelX, droneYPos - 35);
    } else {
      // Flying drone
      const droneFlightX = centerX - 70 + dX;
      const droneFlightY = rodY - 30 + dY;

      if (droneFlightY < p.height + 50) {
        drawDrone(p, droneFlightX, droneFlightY, rotation, true);

        // Motion trail
        p.stroke(255, 200, 100, 100);
        p.strokeWeight(2);
        p.noFill();
        for (let i = 1; i < 5; i++) {
          const trailX = droneFlightX - (dX / 5) * i;
          const trailY = droneFlightY - (dY / 5) * i;
          p.circle(trailX, trailY, 12 - i * 2);
        }
      }
    }

    // Status panel on the right
    const panelX = p.width / 2 + 200;
    const panelY = p.height / 2;

    p.fill(30, 35, 45);
    p.stroke(0, 200, 0);
    p.strokeWeight(2);
    p.rect(panelX - 120, panelY - 100, 240, 200, 5);

    p.textSize(16);
    p.fill(0, 255, 100);
    p.noStroke();

    if (phase === 0) {
      p.text("Phase: Arming", panelX, panelY - 70);
      p.textSize(13);
      p.fill(200, 220, 220);
      p.text("Loading drone into launcher", panelX, panelY - 40);
      p.text("Preparing servo", panelX, panelY - 15);
    } else if (phase === 1) {
      p.text("Phase: Tensioning", panelX, panelY - 70);
      p.textSize(13);
      p.fill(200, 220, 220);
      p.text("Servo pulling rod down", panelX, panelY - 40);
      p.text(`Tension: ${Math.floor(tension * 100)}%`, panelX, panelY - 15);

      // Tension bar
      p.fill(60, 65, 75);
      p.noStroke();
      p.rect(panelX - 100, panelY + 10, 200, 20, 3);

      p.fill(255, 150, 0);
      p.rect(panelX - 100, panelY + 10, 200 * tension, 20, 3);

      // Elastic potential energy indicator
      const energy = Math.floor(tension * 15); // 0-15 Joules
      p.textSize(12);
      p.fill(255, 200, 100);
      p.text(`Stored Energy: ${energy}J`, panelX, panelY + 45);
    } else {
      p.text("Phase: Launch!", panelX, panelY - 70);
      p.textSize(13);
      p.fill(200, 220, 220);
      p.text("Elastic released", panelX, panelY - 40);
      p.text("Drone in flight", panelX, panelY - 15);

      // Flight arc visualization
      if (dY < 200) {
        p.textSize(11);
        p.fill(100, 200, 255);
        p.text(
          `Height: ${Math.max(0, Math.floor(-dY / 5))}m`,
          panelX,
          panelY + 10,
        );
        p.text(`Distance: ${Math.floor(dX / 5)}m`, panelX, panelY + 30);
      }
    }

    // Team attribution
    p.textSize(10);
    p.fill(120, 120, 140);
    p.text(
      "Designed by: Cristian Ghidireac, David Grigore",
      centerX,
      p.height - 25,
    );
  };

  const drawDrone = (
    p: p5,
    x: number,
    y: number,
    rotation: number,
    inFlight: boolean,
  ) => {
    p.push();
    p.translate(x, y);
    p.rotate(rotation);

    // Drone body (paper airplane style)
    p.fill(255, 220, 120);
    p.stroke(200, 160, 80);
    p.strokeWeight(2);

    // Main fuselage
    p.triangle(-8, 8, 0, -15, 8, 8);

    // Wings
    p.fill(255, 200, 100);
    p.triangle(-15, 5, -8, 5, -5, -5);
    p.triangle(15, 5, 8, 5, 5, -5);

    // Tail fins
    p.fill(255, 210, 110);
    p.triangle(-4, 8, 0, 15, 4, 8);

    // Details
    p.stroke(180, 140, 60);
    p.strokeWeight(1);
    p.line(0, -15, 0, 8);

    // Highlight if in flight
    if (inFlight) {
      p.noFill();
      p.stroke(255, 255, 200, 150);
      p.strokeWeight(2);
      p.circle(0, 0, 30);
    }

    p.pop();
  };

  const drawProgressBar = (
    p: p5,
    phase: number,
    timer: number,
    arm: number,
    tension: number,
    flight: number,
  ) => {
    const barWidth = 350;
    const barHeight = 8;
    const x = (p.width - barWidth) / 2;
    const y = p.height - 45;

    let totalTime = arm + tension + flight;
    let currentTime = 0;

    if (phase === 0) currentTime = timer;
    else if (phase === 1) currentTime = arm + timer;
    else currentTime = arm + tension + timer;

    // Background
    p.fill(40, 40, 50);
    p.noStroke();
    p.rect(x, y, barWidth, barHeight, 4);

    // Progress
    const progress = currentTime / totalTime;
    p.fill(255, 150, 0);
    p.rect(x, y, barWidth * progress, barHeight, 4);

    // Label
    p.textSize(10);
    p.fill(150);
    p.textAlign(p.CENTER, p.CENTER);
    const timeLeft = Math.ceil((totalTime - currentTime) / 60);
    p.text("Cycle: " + timeLeft + "s remaining", p.width / 2, y - 15);
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
