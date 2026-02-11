<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import p5 from "p5";

const canvasContainer = ref<HTMLDivElement | null>(null);
let p5Instance: p5 | null = null;

const sketch = (p: p5) => {
  let showVersion = 0; // 0: X-drive, 1: Mecanum
  let transitionTimer = 0;
  const transitionTime = 300;

  p.setup = () => {
    const canvas = p.createCanvas(700, 450);
    canvas.parent(canvasContainer.value!);
  };

  p.draw = () => {
    p.background(25, 25, 35);

    transitionTimer++;
    if (transitionTimer > transitionTime) {
      showVersion = (showVersion + 1) % 2;
      transitionTimer = 0;
    }

    // Title
    p.textAlign(p.CENTER);
    p.textSize(20);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text("Chassis Evolution: Drive System Redesign", p.width / 2, 35);

    if (showVersion === 0) {
      drawXDrive(p);
    } else {
      drawMecanumDrive(p);
    }
  };

  const drawXDrive = (p: p5) => {
    const centerX = p.width / 2;
    const centerY = p.height / 2 + 10;

    p.textSize(16);
    p.fill(255, 180, 0);
    p.text("Initial Design: X-Drive Configuration", centerX, 70);

    p.textSize(12);
    p.fill(200);
    p.text("45° omni wheels • Compact layout • Limited expansion", centerX, 95);

    // Chassis frame - compact
    p.stroke(0, 180, 0);
    p.strokeWeight(4);
    p.noFill();
    p.rect(centerX - 110, centerY - 85, 220, 170);

    // Dimensions
    p.textSize(10);
    p.fill(100, 200, 255);
    p.text('18" × 18"', centerX, centerY - 95);

    // X-Drive wheels at 45 degrees
    const wheelPositions = [
      { x: centerX - 100, y: centerY - 75, label: "FL" },
      { x: centerX + 100, y: centerY - 75, label: "FR" },
      { x: centerX - 100, y: centerY + 75, label: "BL" },
      { x: centerX + 100, y: centerY + 75, label: "BR" },
    ];

    for (let i = 0; i < wheelPositions.length; i++) {
      const pos = wheelPositions[i];
      p.push();
      p.translate(pos.x, pos.y);
      p.rotate(p.PI / 4); // 45 degree rotation

      // Wheel body
      p.fill(255, 200, 0);
      p.stroke(180);
      p.strokeWeight(2);
      p.rect(-18, -10, 36, 20);

      // Rollers to show omni wheel
      p.stroke(120);
      p.strokeWeight(1);
      for (let j = -15; j < 18; j += 6) {
        p.line(j, -10, j, 10);
      }

      // 45° angle indicator
      p.noFill();
      p.stroke(255, 150, 0);
      p.strokeWeight(1);
      p.arc(0, 0, 40, 40, -p.PI / 6, p.PI / 6);

      p.pop();

      // Wheel label
      p.textSize(8);
      p.fill(200);
      p.noStroke();
      p.text(pos.label, pos.x, pos.y - 25);
    }

    // Motor configuration
    p.textSize(9);
    p.fill(255, 200, 0);
    p.text("4 Motors (Drive only)", centerX, centerY - 55);

    // Control hub (cramped space)
    p.fill(50, 50, 70);
    p.stroke(0, 200, 0);
    p.strokeWeight(2);
    p.rect(centerX - 35, centerY - 25, 70, 50);

    p.textSize(9);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text("Control Hub", centerX, centerY - 5);
    p.text("(Single)", centerX, centerY + 8);

    // Technical limitations
    p.textSize(10);
    p.fill(255, 150, 100);
    p.text("Technical Constraints:", centerX, centerY + 105);
    p.textSize(9);
    p.fill(220);
    p.text("• Cramped internal space", centerX, centerY + 125);
    p.text("• No expansion capacity", centerX, centerY + 140);
    p.text("• Limited motor ports", centerX, centerY + 155);

    // Team attribution
    p.textSize(9);
    p.fill(150);
    p.text(
      "Initial Build: Maia Sava, Șerban Untu, Rareș Cozma",
      centerX,
      p.height - 15,
    );
  };

  const drawMecanumDrive = (p: p5) => {
    const centerX = p.width / 2;
    const centerY = p.height / 2 + 10;

    p.textSize(16);
    p.fill(0, 255, 100);
    p.text("Improved Design: Mecanum Drive System", centerX, 70);

    p.textSize(12);
    p.fill(200);
    p.text(
      "Omnidirectional movement • Expansion Hub • Custom mounting",
      centerX,
      95,
    );

    // Larger chassis frame
    p.stroke(0, 220, 0);
    p.strokeWeight(4);
    p.noFill();
    p.rect(centerX - 130, centerY - 95, 260, 190);

    // Dimensions
    p.textSize(10);
    p.fill(100, 200, 255);
    p.text('18" × 18" (More internal space)', centerX, centerY - 105);

    // Mecanum wheels (0 degree, with rollers at 45°)
    const wheelPositions = [
      { x: centerX - 120, y: centerY - 85, label: "FL", rollerDir: 1 },
      { x: centerX + 120, y: centerY - 85, label: "FR", rollerDir: -1 },
      { x: centerX - 120, y: centerY + 85, label: "BL", rollerDir: -1 },
      { x: centerX + 120, y: centerY + 85, label: "BR", rollerDir: 1 },
    ];

    for (let i = 0; i < wheelPositions.length; i++) {
      const pos = wheelPositions[i];
      p.push();
      p.translate(pos.x, pos.y);

      // Wheel body
      p.fill(100, 255, 100);
      p.stroke(180);
      p.strokeWeight(2);
      p.rect(-18, -12, 36, 24);

      // Diagonal rollers for mecanum
      p.stroke(120);
      p.strokeWeight(2);
      const rollerAngle = (pos.rollerDir * p.PI) / 4;
      for (let j = -15; j < 18; j += 6) {
        p.push();
        p.translate(j, 0);
        p.rotate(rollerAngle);
        p.line(0, -14, 0, 14);
        p.pop();
      }

      // Movement direction arrows
      p.noFill();
      p.stroke(0, 255, 200);
      p.strokeWeight(1);
      p.beginShape();
      p.vertex(-25, -18);
      p.vertex(-20, -13);
      p.vertex(-25, -8);
      p.endShape();

      p.pop();

      // Wheel label
      p.textSize(8);
      p.fill(200);
      p.noStroke();
      p.text(pos.label, pos.x, pos.y - 30);
    }

    // Motor configuration
    p.textSize(9);
    p.fill(100, 255, 100);
    p.text("8 Motor Ports Available", centerX, centerY - 55);

    // Control Hub + Expansion Hub (properly mounted)
    p.fill(50, 50, 70);
    p.stroke(0, 220, 0);
    p.strokeWeight(2);
    p.rect(centerX - 50, centerY - 35, 100, 30);
    p.rect(centerX - 50, centerY + 10, 100, 30);

    p.textSize(9);
    p.fill(0, 255, 0);
    p.noStroke();
    p.text("Control Hub", centerX, centerY - 20);
    p.text("Expansion Hub", centerX, centerY + 25);

    // Custom mounting points (structural improvement)
    p.fill(0, 255, 150);
    p.stroke(0, 200, 100);
    p.strokeWeight(1);
    for (let dx of [-50, 50]) {
      for (let dy of [-35, 45]) {
        p.circle(centerX + dx, centerY + dy, 10);
      }
    }

    // Technical improvements
    p.textSize(10);
    p.fill(100, 255, 150);
    p.text("Technical Advantages:", centerX, centerY + 105);
    p.textSize(9);
    p.fill(220);
    p.text("• Omnidirectional movement capability", centerX, centerY + 125);
    p.text("• Expansion Hub for 8 motors total", centerX, centerY + 140);
    p.text("• Custom structural mounts", centerX, centerY + 155);

    // Team attribution
    p.textSize(9);
    p.fill(150);
    p.text(
      "Redesign: Maia Sava, Șerban Untu, Cristian Ghidireac",
      centerX,
      p.height - 15,
    );
  };
};

onMounted(() => {
  if (canvasContainer.value) {
    p5Instance = new p5(sketch);
  }
});

onBeforeUnmount(() => {
  p5Instance?.remove();
});
</script>

<template>
  <div ref="canvasContainer" class="animation-container"></div>
</template>

<style scoped>
.animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}
</style>
