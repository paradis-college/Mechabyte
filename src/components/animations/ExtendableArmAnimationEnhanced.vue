<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import p5 from "p5";

const sketchContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

onMounted(() => {
  if (!sketchContainer.value) return;

  const sketch = (p: p5) => {
    // Animation state
    let phase = 0; // 0: Retracted, 1: Extending, 2: Grabbing, 3: Retracting
    let phaseStartTime = 0;
    const phaseDurations = [3000, 3000, 3000, 3000]; // milliseconds

    // Arm state
    let armExtension = 0; // 0-1 (0 = retracted, 1 = fully extended)
    let gripperOpen = 0; // 0-1 (0 = closed, 1 = open)
    let hasSample = false;
    let samplePos = { x: 0, y: 0 };

    // Physics
    let targetExtension = 0;
    let targetGripperOpen = 0;

    p.setup = () => {
      p.createCanvas(800, 600);
      p.frameRate(30);
      phaseStartTime = p.millis();
    };

    p.draw = () => {
      p.background(40, 45, 55);

      // Update phase
      const elapsed = p.millis() - phaseStartTime;
      if (elapsed > phaseDurations[phase]) {
        phase = (phase + 1) % 4;
        phaseStartTime = p.millis();

        // Update targets based on phase
        if (phase === 0) {
          // Retracted
          targetExtension = 0;
          targetGripperOpen = 0;
          hasSample = false;
        } else if (phase === 1) {
          // Extending
          targetExtension = 1;
          targetGripperOpen = 1;
        } else if (phase === 2) {
          // Grabbing
          targetExtension = 1;
          targetGripperOpen = 0;
          if (elapsed < 500) hasSample = false;
          else hasSample = true;
        } else if (phase === 3) {
          // Retracting
          targetExtension = 0;
          targetGripperOpen = 0;
        }
      }

      // Smooth transitions
      armExtension = p.lerp(armExtension, targetExtension, 0.05);
      gripperOpen = p.lerp(gripperOpen, targetGripperOpen, 0.08);

      // Draw field elements
      drawField(p);

      // Draw robot and arm
      drawRobot(p);
      drawArm(p);

      // Draw sample
      if (phase === 1 || (phase === 2 && !hasSample)) {
        drawSampleAtSubmersible(p);
      }
      if (hasSample) {
        drawSampleInGripper(p);
      }

      // Draw UI
      drawStatusPanel(p);
      drawProgressBar(p);
    };

    function drawField(p: p5) {
      // Floor
      p.fill(50, 55, 65);
      p.noStroke();
      p.rect(0, 500, 800, 100);

      // Field lines
      p.stroke(80, 90, 110);
      p.strokeWeight(2);
      p.line(0, 500, 800, 500);

      // Submersible (sample source)
      p.fill(80, 90, 110);
      p.stroke(100, 110, 130);
      p.strokeWeight(3);
      p.rect(600, 450, 80, 50);
      p.fill(200);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(12);
      p.text("Submersible", 640, 475);

      // High basket (target)
      p.fill(60, 70, 90);
      p.stroke(255, 200, 0);
      p.strokeWeight(3);
      p.rect(50, 300, 60, 80);
      p.fill(255, 200, 0);
      p.noStroke();
      p.textSize(10);
      p.text("High", 80, 325);
      p.text("Basket", 80, 340);
      p.text("8 pts", 80, 360);
    }

    function drawRobot(p: p5) {
      const robotX = 200;
      const robotY = 450;

      // Robot chassis
      p.fill(50, 55, 70);
      p.stroke(80, 100, 130);
      p.strokeWeight(3);
      p.rect(robotX - 40, robotY - 30, 80, 80);

      // Control hub
      p.fill(55, 60, 85);
      p.rect(robotX - 20, robotY - 10, 40, 20);

      // Wheels
      p.fill(40, 40, 40);
      p.circle(robotX - 35, robotY + 55, 20);
      p.circle(robotX + 35, robotY + 55, 20);

      // Wheel hubs
      p.fill(100, 100, 100);
      p.circle(robotX - 35, robotY + 55, 10);
      p.circle(robotX + 35, robotY + 55, 10);

      // Mounting brackets for arm
      p.fill(150, 255, 150);
      p.rect(robotX + 30, robotY - 25, 15, 40);

      // Mounting bolts
      p.fill(80, 80, 100);
      p.circle(robotX + 37, robotY - 15, 6);
      p.circle(robotX + 37, robotY + 5, 6);
    }

    function drawArm(p: p5) {
      const robotX = 200;
      const robotY = 450;
      const armBaseX = robotX + 40;
      const armBaseY = robotY;

      // Calculate arm extension
      const maxExtension = 400;
      const currentExtension = armExtension * maxExtension;
      const armEndX = armBaseX + currentExtension;
      const armEndY = armBaseY;

      // Arm segments (3 telescoping sections)
      const segment1Length = currentExtension * 0.4;
      const segment2Length = currentExtension * 0.35;
      const segment3Length = currentExtension * 0.25;

      // Draw telescoping arm segments
      // Segment 1 (base, largest)
      p.fill(100, 220, 120);
      p.stroke(80, 200, 100);
      p.strokeWeight(3);
      p.rect(armBaseX, armBaseY - 15, segment1Length, 30);

      // Rails on segment 1
      p.stroke(60, 180, 80);
      p.strokeWeight(2);
      p.line(armBaseX, armBaseY - 10, armBaseX + segment1Length, armBaseY - 10);
      p.line(armBaseX, armBaseY + 10, armBaseX + segment1Length, armBaseY + 10);

      // Segment 2 (middle)
      const seg2Start = armBaseX + segment1Length * 0.2;
      p.fill(100, 200, 120);
      p.stroke(80, 180, 100);
      p.strokeWeight(3);
      p.rect(seg2Start, armBaseY - 12, segment2Length, 24);

      // Segment 3 (end, smallest)
      const seg3Start = seg2Start + segment2Length * 0.3;
      p.fill(100, 180, 120);
      p.stroke(80, 160, 100);
      p.strokeWeight(3);
      p.rect(seg3Start, armBaseY - 9, segment3Length, 18);

      // Extension indicator line
      if (armExtension > 0.1) {
        p.stroke(255, 255, 100, 150);
        p.strokeWeight(1);
        const context = p.drawingContext as CanvasRenderingContext2D;
        context.setLineDash([5, 5]);
        p.line(armBaseX, armBaseY - 25, armEndX, armBaseY - 25);
        context.setLineDash([]);

        // Arrow
        p.fill(255, 255, 100);
        p.noStroke();
        p.triangle(
          armEndX,
          armBaseY - 25,
          armEndX - 8,
          armBaseY - 30,
          armEndX - 8,
          armBaseY - 20,
        );
      }

      // Gripper at end
      drawGripper(p, armEndX, armEndY);

      // Linear actuator/motor
      p.fill(60, 80, 110);
      p.stroke(100, 120, 150);
      p.strokeWeight(3);
      p.rect(armBaseX - 20, armBaseY - 20, 25, 40);

      // Motor shaft
      p.fill(120, 140, 160);
      p.noStroke();
      p.rect(armBaseX - 10, armBaseY - 5, 15, 10);

      // Power indicator
      if (phase === 1 || phase === 3) {
        p.fill(0, 255, 100);
        p.circle(armBaseX - 7, armBaseY - 15, 6);
      }
    }

    function drawGripper(p: p5, x: number, y: number) {
      const openAmount = gripperOpen * 20;

      // Gripper base/wrist
      p.fill(100, 180, 100);
      p.stroke(80, 160, 80);
      p.strokeWeight(2);
      p.rect(x - 10, y - 12, 20, 24);

      // Servo
      p.fill(100, 100, 130);
      p.circle(x, y, 12);

      // Gripper fingers (open/close)
      p.fill(100, 200, 120);
      p.stroke(80, 180, 100);
      p.strokeWeight(3);

      // Top finger
      p.beginShape();
      p.vertex(x + 5, y - openAmount);
      p.vertex(x + 30, y - openAmount - 3);
      p.vertex(x + 30, y - openAmount + 5);
      p.vertex(x + 5, y - openAmount + 8);
      p.endShape(p.CLOSE);

      // Bottom finger
      p.beginShape();
      p.vertex(x + 5, y + openAmount);
      p.vertex(x + 30, y + openAmount + 3);
      p.vertex(x + 30, y + openAmount - 5);
      p.vertex(x + 5, y + openAmount - 8);
      p.endShape(p.CLOSE);

      // Finger tips (gripping surface)
      p.fill(200, 50, 50);
      p.noStroke();
      p.rect(x + 27, y - openAmount - 3, 5, 8);
      p.rect(x + 27, y + openAmount - 5, 5, 8);

      // Gripping indicator
      if (gripperOpen < 0.3) {
        p.stroke(0, 255, 100);
        p.strokeWeight(2);
        p.noFill();
        p.arc(x + 15, y, 25, 25, -p.PI / 4, p.PI / 4);
      }
    }

    function drawSampleAtSubmersible(p: p5) {
      // Yellow sample at submersible
      p.fill(255, 255, 0);
      p.stroke(200, 200, 0);
      p.strokeWeight(2);
      p.circle(640, 475, 20);

      // Inner detail
      p.fill(200, 200, 0);
      p.noStroke();
      p.circle(640, 475, 10);
    }

    function drawSampleInGripper(p: p5) {
      const robotX = 200;
      const robotY = 450;
      const armBaseX = robotX + 40;
      const armBaseY = robotY;
      const maxExtension = 400;
      const currentExtension = armExtension * maxExtension;
      const armEndX = armBaseX + currentExtension;

      // Sample in gripper
      p.fill(255, 255, 0);
      p.stroke(200, 200, 0);
      p.strokeWeight(2);
      p.circle(armEndX + 20, armBaseY, 18);

      // Inner detail
      p.fill(200, 200, 0);
      p.noStroke();
      p.circle(armEndX + 20, armBaseY, 9);

      // If fully retracted and phase is 3 end, show in basket
      if (armExtension < 0.1 && phase === 3) {
        p.fill(255, 255, 0, 200);
        p.stroke(200, 200, 0, 200);
        p.strokeWeight(2);
        p.circle(80, 350, 15);
      }
    }

    function drawStatusPanel(p: p5) {
      // Panel background
      p.fill(30, 35, 45, 220);
      p.noStroke();
      p.rect(10, 10, 300, 140);

      // Title
      p.fill(100, 255, 150);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(18);
      p.text("Extendable Horizontal Arm", 20, 20);

      // Phase name
      const phaseNames = [
        "Retracted",
        "Extending to Sample",
        "Grabbing Sample",
        "Retracting to Score",
      ];
      p.fill(255, 255, 255);
      p.textSize(14);
      p.text(`Phase: ${phaseNames[phase]}`, 20, 50);

      // Current action
      const actions = [
        "Arm stored in robot chassis",
        "Extending horizontally toward submersible",
        "Gripper closing to capture sample",
        "Retracting to deposit in basket",
      ];
      p.fill(200, 200, 200);
      p.textSize(12);
      p.text(actions[phase], 20, 75);

      // Extension percentage
      p.fill(255, 200, 100);
      p.text(`Extension: ${Math.floor(armExtension * 100)}%`, 20, 100);

      // Gripper status
      const gripStatus = gripperOpen > 0.5 ? "OPEN" : "CLOSED";
      const gripColor = gripperOpen > 0.5 ? [255, 200, 100] : [100, 255, 150];
      p.fill(gripColor[0], gripColor[1], gripColor[2]);
      p.text(`Gripper: ${gripStatus}`, 20, 120);
    }

    function drawProgressBar(p: p5) {
      // Progress bar background
      p.fill(30, 35, 45, 220);
      p.noStroke();
      p.rect(10, 560, 780, 30);

      // Progress bar border
      p.stroke(100, 255, 150);
      p.strokeWeight(2);
      p.noFill();
      p.rect(15, 565, 770, 20);

      // Progress fill
      const totalDuration = phaseDurations[phase];
      const elapsed = p.millis() - phaseStartTime;
      const progress = Math.min(elapsed / totalDuration, 1);

      p.fill(100, 255, 150, 180);
      p.noStroke();
      p.rect(15, 565, 770 * progress, 20);

      // Phase counter
      p.fill(255, 255, 255);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(12);
      p.text(
        `Phase ${phase + 1}/4  •  ${Math.floor(
          (1 - progress) * (totalDuration / 1000),
        )}s remaining`,
        400,
        575,
      );
    }
  };

  p5Instance = new p5(sketch, sketchContainer.value);
});

onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove();
  }
});
</script>

<template>
  <div class="animation-container">
    <div ref="sketchContainer" class="sketch-container"></div>
    <p class="animation-caption">
      Horizontal extendable arm system with 3-stage telescoping design. Extends
      up to 40cm to reach samples from the submersible, then retracts to deposit
      them in the high basket for scoring. Features servo-controlled gripper
      with force-sensing capabilities.
    </p>
  </div>
</template>

<style scoped>
.animation-container {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sketch-container {
  border: 2px solid var(--mechabyte-green);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.animation-caption {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #ccc;
  max-width: 800px;
}

@media (max-width: 1000px) {
  .sketch-container {
    max-width: 100%;
  }

  .animation-caption {
    font-size: 0.8rem;
  }
}
</style>
