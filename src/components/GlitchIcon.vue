<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import p5 from 'p5';

interface Props {
  imageSrc?: string;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  imageSrc: '/banner.png',
  height: 300,
});

const canvasContainer = ref<HTMLDivElement | null>(null);
let sketch: p5 | null = null;

onMounted(() => {
  if (!canvasContainer.value) return;

  sketch = new p5((p: p5) => {
    const channelLen = 4;
    let imgOrigin: p5.Image | null = null;
    let copyData: number[] = [];
    let isLoaded = false;

    const flowLineImgs: Array<{ pixels: number[] | null; t1: number; speed: number; randX: number }> = [];
    const shiftLineImgs: Array<number[] | null> = [];
    const shiftRGBs: Array<number[] | null> = [];
    const scatImgs: Array<{ img: p5.Image | null; x: number; y: number }> = [];

    let throughFlag = true;

    function replaceData(destImg: p5.Image, srcPixels: number[]) {
      for (let y = 0; y < destImg.height; y++) {
        for (let x = 0; x < destImg.width; x++) {
          const index = (y * destImg.width + x) * channelLen;
          destImg.pixels[index]     = srcPixels[index];
          destImg.pixels[index + 1] = srcPixels[index + 1];
          destImg.pixels[index + 2] = srcPixels[index + 2];
          destImg.pixels[index + 3] = srcPixels[index + 3];
        }
      }
      destImg.updatePixels();
    }

    function flowLine(srcImg: p5.Image, obj: { pixels: number[] | null; t1: number; speed: number; randX: number }): number[] {
      const destPixels = [...srcImg.pixels];
      obj.t1 %= srcImg.height;
      obj.t1 += obj.speed;
      const tempY = p.floor(obj.t1);
      for (let y = 0; y < srcImg.height; y++) {
        if (tempY === y) {
          for (let x = 0; x < srcImg.width; x++) {
            const index = (y * srcImg.width + x) * channelLen;
            destPixels[index]     = srcImg.pixels[index]     + obj.randX;
            destPixels[index + 1] = srcImg.pixels[index + 1] + obj.randX;
            destPixels[index + 2] = srcImg.pixels[index + 2] + obj.randX;
            destPixels[index + 3] = srcImg.pixels[index + 3];
          }
        }
      }
      return destPixels;
    }

    function shiftLine(srcImg: p5.Image): number[] {
      const destPixels = [...srcImg.pixels];
      const rangeH = srcImg.height;
      const rangeMin = p.floor(p.random(0, rangeH));
      const rangeMax = rangeMin + p.floor(p.random(1, rangeH - rangeMin));
      const offsetX = channelLen * p.floor(p.random(-40, 40));

      for (let y = 0; y < srcImg.height; y++) {
        if (y > rangeMin && y < rangeMax) {
          for (let x = 0; x < srcImg.width; x++) {
            const index = (y * srcImg.width + x) * channelLen;
            const r2 = index + offsetX;
            const g2 = index + 1 + offsetX;
            const b2 = index + 2 + offsetX;
            destPixels[index]     = srcImg.pixels[r2] ?? 0;
            destPixels[index + 1] = srcImg.pixels[g2] ?? 0;
            destPixels[index + 2] = srcImg.pixels[b2] ?? 0;
            destPixels[index + 3] = srcImg.pixels[index + 3];
          }
        }
      }
      return destPixels;
    }

    function shiftRGB(srcImg: p5.Image): number[] {
      const range = 16;
      const destPixels = [...srcImg.pixels];
      const randR = (p.floor(p.random(-range, range)) * srcImg.width + p.floor(p.random(-range, range))) * channelLen;
      const randG = (p.floor(p.random(-range, range)) * srcImg.width + p.floor(p.random(-range, range))) * channelLen;
      const randB = (p.floor(p.random(-range, range)) * srcImg.width + p.floor(p.random(-range, range))) * channelLen;

      for (let y = 0; y < srcImg.height; y++) {
        for (let x = 0; x < srcImg.width; x++) {
          const index = (y * srcImg.width + x) * channelLen;
          const r2 = (index + randR) % srcImg.pixels.length;
          const g2 = (index + 1 + randG) % srcImg.pixels.length;
          const b2 = (index + 2 + randB) % srcImg.pixels.length;
          destPixels[index]     = srcImg.pixels[r2];
          destPixels[index + 1] = srcImg.pixels[g2];
          destPixels[index + 2] = srcImg.pixels[b2];
          destPixels[index + 3] = srcImg.pixels[index + 3];
        }
      }
      return destPixels;
    }

    function getRandomRectImg(srcImg: p5.Image): p5.Image {
      const startX = p.floor(p.random(0, srcImg.width - 30));
      const startY = p.floor(p.random(0, srcImg.height - 50));
      const rectW  = p.floor(p.random(30, srcImg.width - startX));
      const rectH  = p.floor(p.random(1, 50));
      const destImg = srcImg.get(startX, startY, rectW, rectH) as p5.Image;
      destImg.loadPixels();
      return destImg;
    }

    function showGlitch() {
      if (!imgOrigin) return;

      replaceData(imgOrigin, copyData);

      const n = p.floor(p.random(100));
      if (n > 75 && throughFlag) {
        throughFlag = false;
        setTimeout(() => { throughFlag = true; }, p.floor(p.random(40, 400)));
      }
      if (!throughFlag) {
        p.push();
        p.translate((p.width - imgOrigin.width) / 2, (p.height - imgOrigin.height) / 2);
        p.image(imgOrigin, 0, 0);
        p.pop();
        return;
      }

      flowLineImgs.forEach((v, i, arr) => {
        arr[i].pixels = flowLine(imgOrigin!, v);
        if (arr[i].pixels) replaceData(imgOrigin!, arr[i].pixels!);
      });

      shiftLineImgs.forEach((v, i, arr) => {
        if (p.floor(p.random(100)) > 50) {
          arr[i] = shiftLine(imgOrigin!);
          replaceData(imgOrigin!, arr[i]!);
        } else if (arr[i]) {
          replaceData(imgOrigin!, arr[i]!);
        }
      });

      shiftRGBs.forEach((v, i, arr) => {
        if (p.floor(p.random(100)) > 65) {
          arr[i] = shiftRGB(imgOrigin!);
          replaceData(imgOrigin!, arr[i]!);
        }
      });

      p.push();
      p.translate((p.width - imgOrigin.width) / 2, (p.height - imgOrigin.height) / 2);
      p.image(imgOrigin, 0, 0);
      p.pop();

      scatImgs.forEach((obj) => {
        p.push();
        p.translate((p.width - imgOrigin!.width) / 2, (p.height - imgOrigin!.height) / 2);
        if (p.floor(p.random(100)) > 80) {
          obj.x   = p.floor(p.random(-imgOrigin!.width * 0.3, imgOrigin!.width * 0.7));
          obj.y   = p.floor(p.random(-imgOrigin!.height * 0.1, imgOrigin!.height));
          obj.img = getRandomRectImg(imgOrigin!);
        }
        if (obj.img) p.image(obj.img, obj.x, obj.y);
        p.pop();
      });
    }

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, props.height);
      canvas.parent(canvasContainer.value!);

      p.loadImage(props.imageSrc, (img: p5.Image) => {
        imgOrigin = img;
        imgOrigin.loadPixels();
        copyData = [...imgOrigin.pixels];

        for (let i = 0; i < 1; i++) {
          flowLineImgs.push({
            pixels: null,
            t1: p.floor(p.random(0, 1000)),
            speed: p.floor(p.random(4, 24)),
            randX: p.floor(p.random(24, 80)),
          });
        }
        for (let i = 0; i < 6; i++) shiftLineImgs.push(null);
        for (let i = 0; i < 1; i++) shiftRGBs.push(null);
        for (let i = 0; i < 3; i++) scatImgs.push({ img: null, x: 0, y: 0 });

        isLoaded = true;
      });
    };

    p.draw = () => {
      p.clear();
      if (isLoaded) showGlitch();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, props.height);
    };
  }, canvasContainer.value);
});

onUnmounted(() => {
  sketch?.remove();
  sketch = null;
});
</script>

<template>
  <div ref="canvasContainer" class="glitch-icon" :style="{ height: `${height}px` }" aria-hidden="true" />
</template>

<style scoped>
.glitch-icon {
  width: 100%;
  overflow: hidden;
}

.glitch-icon :deep(canvas) {
  display: block;
}
</style>
