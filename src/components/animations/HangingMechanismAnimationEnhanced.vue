<template>
  <div class="animation-container">
    <div ref="sketchContainer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import p5 from "p5";

const sketchContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

// Easing function for smooth animations
const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

onMounted(() => {
  if (sketchContainer.value) {
    p5Instance = new p5((p: p5) => {
      let phase = 0; // 0: Retracted, 1: Extending, 2: Hooked, 3: Ascending
      let phaseTimer = 0;
      const PHASE_DURATION = 180; // 6 seconds per phase

      // Robot and hook positions
      let robotY = 0;
      let hookExtension = 0;
      let hookRotation = 0;
      let ascentProgress = 0;

      // Animation states
      let isHooked = false;
      let winchRotation = 0;

      p.setup = () => {
        p.createCanvas(800, 600);
        p.frameRate(30);
        robotY = 500; // Starting position on ground
      };

      p.draw = () => {
        p.background(20, 25, 35);

        // Update phase
        phaseTimer++;
        if (phaseTimer >= PHASE_DURATION) {
          phaseTimer = 0;
          phase = (phase + 1) % 4;
        }

        const phaseProgress = phaseTimer / PHASE_DURATION;

        // Draw field elements
        drawField(p);
        drawSubmersible(p);

        // Update and draw robot with hanging mechanism
        updateMechanism(phaseProgress);
        drawRobot(p);
        drawHangingMechanism(p);

        // Draw status panel
        drawStatusPanel(p, phaseProgress);

        // Draw progress bar
        drawProgressBar(p, phaseProgress);
      };

      function updateMechanism(progress: number) {
        switch (phase) {
          case 0: // Retracted - robot on ground
            hookExtension = p.lerp(hookExtension, 0, 0.1);
            hookRotation = p.lerp(hookRotation, 0, 0.1);
            robotY = p.lerp(robotY, 500, 0.1);
            isHooked = false;
            ascentProgress = 0;
            break;

          case 1: // Extending hook upward
            hookExtension = p.lerp(0, 200, easeInOutQuad(progress));
            hookRotation = p.lerp(0, -p.PI / 6, easeInOutQuad(progress));
            winchRotation += 0.2;
            break;

          case 2: // Hooked on rung
            hookExtension = 200;
            if (progress > 0.3) {
              isHooked = true;
              hookRotation = p.lerp(-p.PI / 6, 0, (progress - 0.3) / 0.7);
            }
            break;

          case 3: // Ascending
            hookExtension = 200;
            isHooked = true;
            ascentProgress = progress;
            // Robot moves up as winch pulls
            robotY = p.lerp(500, 320, easeInOutQuad(progress));
            winchRotation += 0.3;
            break;
        }
      }

      function drawField(p: p5) {
        // Floor
        p.fill(40, 45, 55);
        p.noStroke();
        p.rect(0, 520, 800, 80);

        // Floor line
        p.stroke(100, 255, 120);
        p.strokeWeight(2);
        p.line(0, 520, 800, 520);

        // Zone markings
        p.fill(100, 255, 120, 30);
        p.rect(50, 520, 200, 80);
        p.fill(255);
        p.textSize(12);
        p.textAlign(p.CENTER);
        p.text("Observation Zone", 150, 560);
      }

      function drawSubmersible(p: p5) {
        // Submersible structure (hanging apparatus)
        p.fill(80, 90, 110);
        p.stroke(60, 70, 90);
        p.strokeWeight(3);

        // Vertical posts
        p.rect(600, 100, 30, 420);
        p.rect(730, 100, 30, 420);

        // Top cross beam
        p.fill(70, 80, 100);
        p.rect(600, 100, 160, 30);

        // Rungs (high, low)
        const rungPositions = [
          { y: 180, label: "High Rung (30 pts)", color: [255, 200, 50] },
          { y: 280, label: "Low Rung (15 pts)", color: [100, 200, 255] },
        ];

        rungPositions.forEach((rung) => {
          p.fill(rung.color[0], rung.color[1], rung.color[2]);
          p.stroke(rung.color[0] - 30, rung.color[1] - 30, rung.color[2] - 30);
          p.strokeWeight(2);
          p.rect(600, rung.y, 160, 15);

          // Rung label
          p.fill(255);
          p.noStroke();
          p.textSize(11);
          p.textAlign(p.RIGHT);
          p.text(rung.label, 590, rung.y + 10);
        });

        // Touch low rung indicator (3 pts)
        p.fill(150, 255, 150, 100);
        p.noStroke();
        p.rect(600, 360, 160, 40);
        p.fill(255);
        p.textSize(10);
        p.textAlign(p.CENTER);
        p.text("Touch Zone (3 pts)", 680, 380);
      }

      function drawRobot(p: p5) {
        const robotX = 400;

        // Robot chassis
        p.fill(50, 55, 70);
        p.stroke(100, 255, 120);
        p.strokeWeight(3);
        p.rect(robotX - 60, robotY - 60, 120, 60, 5);

        // Wheels
        p.fill(80, 80, 100);
        p.noStroke();
        for (let i = 0; i < 4; i++) {
          const wheelX = robotX - 45 + (i % 2) * 90;
          const wheelY = robotY + 5;
          p.circle(wheelX, wheelY, 20);

          // Wheel treads
          p.stroke(100, 100, 120);
          p.strokeWeight(1);
          for (let j = 0; j < 3; j++) {
            const angle = (p.frameCount * 0.1 + (j * p.TWO_PI) / 3) % p.TWO_PI;
            p.line(
              wheelX + p.cos(angle) * 5,
              wheelY + p.sin(angle) * 5,
              wheelX + p.cos(angle) * 8,
              wheelY + p.sin(angle) * 8,
            );
          }
        }

        // Control hub
        p.fill(55, 60, 85);
        p.noStroke();
        p.rect(robotX - 20, robotY - 45, 40, 25, 3);

        // Hub indicator light
        p.fill(100, 255, 120);
        p.circle(robotX, robotY - 35, 6);
      }

      function drawHangingMechanism(p: p5) {
        const robotX = 400;
        const baseY = robotY - 60;

        // Winch motor
        p.fill(60, 80, 110);
        p.stroke(100, 255, 120);
        p.strokeWeight(2);
        p.rect(robotX - 25, baseY - 40, 50, 40, 3);

        // Motor label
        p.fill(255);
        p.noStroke();
        p.textSize(9);
        p.textAlign(p.CENTER);
        p.text("Winch", robotX, baseY - 18);

        // Animated gears on motor
        p.push();
        p.translate(robotX - 10, baseY - 15);
        p.rotate(winchRotation);
        p.stroke(200, 220, 240);
        p.strokeWeight(1);
        p.noFill();
        for (let i = 0; i < 6; i++) {
          p.line(0, 0, p.cos((i * p.PI) / 3) * 8, p.sin((i * p.PI) / 3) * 8);
        }
        p.pop();

        // String/cable spool
        p.fill(220, 180, 60);
        p.noStroke();
        p.rect(robotX - 5, baseY - 35, 10, 30);

        // Cable line going up
        p.stroke(220, 180, 60);
        p.strokeWeight(3);
        const cableStartY = baseY - 40;
        const hookY = baseY - 40 - hookExtension;
        p.line(robotX, cableStartY, robotX, hookY);

        // Cable length indicator
        if (hookExtension > 10) {
          p.fill(255, 255, 100);
          p.noStroke();
          p.textSize(10);
          p.textAlign(p.LEFT);
          p.text(
            `${(hookExtension / 2).toFixed(0)}cm`,
            robotX + 15,
            hookY + 20,
          );
        }

        // Hook mechanism
        p.push();
        p.translate(robotX, hookY);
        p.rotate(hookRotation);

        // Hook arm
        p.fill(120, 140, 160);
        p.stroke(100, 120, 140);
        p.strokeWeight(2);
        p.rect(-8, 0, 16, 50, 3);

        // Hook end (curved)
        p.noFill();
        p.stroke(120, 140, 160);
        p.strokeWeight(4);
        p.arc(0, 50, 30, 30, 0, p.PI);

        // Hook tip
        p.stroke(200, 50, 50);
        p.strokeWeight(3);
        p.point(-15, 50);
        p.point(15, 50);

        p.pop();

        // Hooked indicator
        if (isHooked) {
          const targetRungY = 280; // Low rung position
          const hookTipY = hookY + 50;

          // Connection line showing hook locked on rung
          p.stroke(100, 255, 120, 150);
          p.strokeWeight(2);
          p.line(robotX, hookTipY, robotX + 280, targetRungY);

          // Hook locked icon
          p.fill(100, 255, 120);
          p.noStroke();
          p.textSize(12);
          p.textAlign(p.CENTER);
          p.text("🔒", robotX + 140, targetRungY - 10);
        }

        // Extension percentage
        if (hookExtension > 0) {
          const extPercent = ((hookExtension / 200) * 100).toFixed(0);
          p.fill(255);
          p.noStroke();
          p.textSize(11);
          p.textAlign(p.CENTER);
          p.text(
            `Extension: ${extPercent}%`,
            robotX,
            baseY - hookExtension - 20,
          );
        }
      }

      function drawStatusPanel(p: p5, progress: number) {
        // Panel background
        p.fill(30, 35, 45, 220);
        p.noStroke();
        p.rect(20, 20, 300, 140, 5);

        // Title
        p.fill(100, 255, 120);
        p.textSize(16);
        p.textAlign(p.LEFT);
        p.textStyle(p.BOLD);
        p.text("Hanging Mechanism", 30, 45);

        // Phase indicators
        const phases = [
          { name: "Retracted", desc: "Ready position on ground" },
          { name: "Extending", desc: "Hook reaches upward" },
          { name: "Hooked", desc: "Latched onto low rung" },
          { name: "Ascending", desc: "Winch pulls robot up (15 pts)" },
        ];

        p.textStyle(p.NORMAL);
        p.textSize(12);
        const currentPhase = phases[phase];
        p.fill(255, 255, 100);
        p.text(`Phase: ${currentPhase.name}`, 30, 70);

        p.fill(200, 200, 200);
        p.textSize(11);
        p.text(currentPhase.desc, 30, 88);

        // Current action
        p.fill(255);
        p.text("Action:", 30, 110);
        p.fill(180, 180, 180);
        p.textSize(10);

        let action = "";
        switch (phase) {
          case 0:
            action = "Robot waiting on ground, hook retracted";
            break;
          case 1:
            action = "Winch extends cable, hook moves upward";
            break;
          case 2:
            action = "Hook latches onto rung, securing position";
            break;
          case 3:
            action = "Winch retracts, lifting robot off ground";
            break;
        }

        // Word wrap for action text
        const words = action.split(" ");
        let line = "";
        let y = 125;
        for (let word of words) {
          const testLine = line + word + " ";
          if (p.textWidth(testLine) > 260 && line.length > 0) {
            p.text(line, 30, y);
            line = word + " ";
            y += 15;
          } else {
            line = testLine;
          }
        }
        p.text(line, 30, y);

        // Ascent progress
        if (phase === 3) {
          p.fill(100, 255, 120);
          p.textSize(11);
          p.text(`Ascent: ${(ascentProgress * 100).toFixed(0)}%`, 30, 155);
        }
      }

      function drawProgressBar(p: p5, progress: number) {
        const barX = 20;
        const barY = 580;
        const barWidth = 760;
        const barHeight = 15;

        // Background
        p.fill(40, 45, 55);
        p.noStroke();
        p.rect(barX, barY, barWidth, barHeight, 5);

        // Progress fill
        p.fill(100, 255, 120);
        p.rect(barX, barY, barWidth * progress, barHeight, 5);

        // Text
        p.fill(255);
        p.textSize(11);
        p.textAlign(p.CENTER);
        p.text(
          `Phase ${phase + 1}/4 - ${(progress * 100).toFixed(0)}%`,
          400,
          592,
        );

        // Time remaining
        const remaining = ((1 - progress) * (PHASE_DURATION / 30)).toFixed(1);
        p.textSize(9);
        p.text(`${remaining}s`, 740, 592);
      }
    }, sketchContainer.value);
  }
});

onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});
</script>

<style scoped>
.animation-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  background: linear-gradient(135deg, #1a1f2e 0%, #2d3748 100%);
  padding: 1rem;
  border-radius: 8px;
}
</style>
