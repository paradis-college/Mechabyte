<script setup lang="ts">
const props = defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="model-viewer-placeholder">
    <div class="placeholder-header">
      <h4>🔧 {{ title }}</h4>
      <p v-if="description" class="description">{{ description }}</p>
    </div>
    <div class="viewer-container">
      <div class="model-icon">
        <div class="cube">
          <div class="cube-face front">3D</div>
          <div class="cube-face back">3D</div>
          <div class="cube-face right">3D</div>
          <div class="cube-face left">3D</div>
          <div class="cube-face top">3D</div>
          <div class="cube-face bottom">3D</div>
        </div>
      </div>
      <div class="controls-hint">
        <span>🖱️ Click & Drag to Rotate</span>
        <span>🔍 Scroll to Zoom</span>
      </div>
    </div>
    <p class="placeholder-note">Interactive 3D model to be added</p>
  </div>
</template>

<style scoped>
.model-viewer-placeholder {
  width: 100%;
  background: rgba(0, 255, 0, 0.03);
  border: 0.15vw dashed rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
  padding: 2vw;
  margin: 2vw 0;
}

.placeholder-header h4 {
  color: var(--mechabyte-green);
  font-size: 1.4vw;
  margin-bottom: 0.5vw;
}

.description {
  color: #ccc;
  font-size: 0.9vw;
  margin-bottom: 1.5vw;
}

.viewer-container {
  background: rgba(0, 0, 0, 0.3);
  border: 0.1vw solid rgba(0, 255, 0, 0.2);
  border-radius: 0.3vw;
  padding: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 20vw;
  position: relative;
}

.model-icon {
  perspective: 1000px;
  margin-bottom: 2vw;
}

.cube {
  width: 8vw;
  height: 8vw;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 8s infinite linear;
}

.cube-face {
  position: absolute;
  width: 8vw;
  height: 8vw;
  background: rgba(0, 255, 0, 0.1);
  border: 0.15vw solid var(--mechabyte-green);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  font-weight: 700;
  color: var(--mechabyte-green);
  opacity: 0.8;
}

.front {
  transform: rotateY(0deg) translateZ(4vw);
}

.back {
  transform: rotateY(180deg) translateZ(4vw);
}

.right {
  transform: rotateY(90deg) translateZ(4vw);
}

.left {
  transform: rotateY(-90deg) translateZ(4vw);
}

.top {
  transform: rotateX(90deg) translateZ(4vw);
}

.bottom {
  transform: rotateX(-90deg) translateZ(4vw);
}

@keyframes rotateCube {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

.controls-hint {
  display: flex;
  gap: 2vw;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8vw;
}

.controls-hint span {
  display: flex;
  align-items: center;
  gap: 0.5vw;
}

.placeholder-note {
  color: rgba(0, 255, 0, 0.6);
  font-size: 0.85vw;
  font-style: italic;
  text-align: center;
  margin-top: 1vw;
}

@media only screen and (max-width: 1000px) {
  .model-viewer-placeholder {
    padding: 20px;
    border: 2px dashed rgba(0, 255, 0, 0.3);
  }
  
  .placeholder-header h4 {
    font-size: 18px;
  }
  
  .description {
    font-size: 13px;
  }
  
  .viewer-container {
    padding: 30px;
    min-height: 250px;
  }
  
  .cube {
    width: 100px;
    height: 100px;
  }
  
  .cube-face {
    width: 100px;
    height: 100px;
    font-size: 24px;
    border: 2px solid var(--mechabyte-green);
  }
  
  .front {
    transform: rotateY(0deg) translateZ(50px);
  }
  
  .back {
    transform: rotateY(180deg) translateZ(50px);
  }
  
  .right {
    transform: rotateY(90deg) translateZ(50px);
  }
  
  .left {
    transform: rotateY(-90deg) translateZ(50px);
  }
  
  .top {
    transform: rotateX(90deg) translateZ(50px);
  }
  
  .bottom {
    transform: rotateX(-90deg) translateZ(50px);
  }
  
  .controls-hint {
    gap: 20px;
    font-size: 11px;
    flex-direction: column;
    text-align: center;
  }
  
  .placeholder-note {
    font-size: 12px;
  }
}
</style>
