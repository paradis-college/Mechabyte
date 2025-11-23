<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  mediaType?: 'image' | 'video' | 'social-embed' | 'gallery';
  mediaUrl?: string;
  mediaUrls?: string[];
  socialEmbedCode?: string;
  altText?: string;
}>();

const currentImageIndex = ref(0);

const nextImage = () => {
  if (props.mediaUrls && currentImageIndex.value < props.mediaUrls.length - 1) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

const goToImage = (index: number) => {
  currentImageIndex.value = index;
};
</script>

<template>
  <div v-if="mediaType" class="media-viewer">
    <!-- Single Image -->
    <div v-if="mediaType === 'image' && mediaUrl" class="media-image">
      <img :src="mediaUrl" :alt="altText || 'Event media'" />
    </div>

    <!-- Image Gallery -->
    <div v-else-if="mediaType === 'gallery' && mediaUrls && mediaUrls.length > 0" class="media-gallery">
      <div class="gallery-main">
        <button 
          v-if="currentImageIndex > 0" 
          class="gallery-nav prev" 
          @click="prevImage"
          aria-label="Previous image"
        >
          ‹
        </button>
        <div class="gallery-image-container">
          <img 
            :src="mediaUrls[currentImageIndex]" 
            :alt="`${altText || 'Event media'} ${currentImageIndex + 1}`"
            class="gallery-image"
          />
        </div>
        <button 
          v-if="currentImageIndex < mediaUrls.length - 1" 
          class="gallery-nav next" 
          @click="nextImage"
          aria-label="Next image"
        >
          ›
        </button>
      </div>
      <div class="gallery-thumbnails">
        <button
          v-for="(url, index) in mediaUrls"
          :key="index"
          :class="['thumbnail', { active: index === currentImageIndex }]"
          @click="goToImage(index)"
          :aria-label="`View image ${index + 1}`"
        >
          <img :src="url" :alt="`Thumbnail ${index + 1}`" />
        </button>
      </div>
      <div class="gallery-counter">
        {{ currentImageIndex + 1 }} / {{ mediaUrls.length }}
      </div>
    </div>

    <!-- Video -->
    <div v-else-if="mediaType === 'video' && mediaUrl" class="media-video">
      <video controls :src="mediaUrl">
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Social Media Embed -->
    <!-- Note: socialEmbedCode should only contain trusted embed codes from official social media platforms (Instagram, Twitter, Facebook, TikTok) -->
    <!-- The team controls these values in translations.ts - never accept user-generated HTML -->
    <div v-else-if="mediaType === 'social-embed' && socialEmbedCode" class="media-social" v-html="socialEmbedCode"></div>

    <!-- Placeholder -->
    <div v-else class="media-placeholder">
      <div class="placeholder-icon">📸</div>
      <p>Media content will be added here</p>
    </div>
  </div>
</template>

<style scoped>
.media-viewer {
  width: 100%;
  margin: 1.5vw 0;
}

.media-image img {
  width: 100%;
  height: auto;
  border-radius: 0.5vw;
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
}

.media-gallery {
  width: 100%;
}

.gallery-main {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1vw;
  margin-bottom: 1vw;
}

.gallery-image-container {
  flex: 1;
  overflow: hidden;
  border-radius: 0.5vw;
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  background: #000;
}

.gallery-image {
  width: 100%;
  height: auto;
  display: block;
}

.gallery-nav {
  background: rgba(0, 255, 0, 0.2);
  border: 0.1vw solid var(--mechabyte-green);
  color: var(--mechabyte-green);
  font-size: 2vw;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.gallery-nav:hover {
  background: rgba(0, 255, 0, 0.4);
  transform: scale(1.1);
}

.gallery-thumbnails {
  display: flex;
  gap: 0.5vw;
  overflow-x: auto;
  padding: 0.5vw 0;
}

.thumbnail {
  flex-shrink: 0;
  width: 5vw;
  height: 5vw;
  border-radius: 0.3vw;
  overflow: hidden;
  border: 0.15vw solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #000;
  padding: 0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail:hover {
  border-color: var(--mechabyte-green);
  transform: scale(1.05);
}

.thumbnail.active {
  border-color: var(--mechabyte-green);
  box-shadow: 0 0 0.5vw rgba(0, 255, 0, 0.5);
}

.gallery-counter {
  text-align: center;
  color: var(--mechabyte-green);
  font-size: 0.9vw;
  margin-top: 0.5vw;
}

.media-video video {
  width: 100%;
  border-radius: 0.5vw;
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
}

.media-social {
  width: 100%;
  overflow: hidden;
  border-radius: 0.5vw;
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
}

.media-placeholder {
  background: rgba(0, 255, 0, 0.05);
  border: 0.2vw dashed rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
  padding: 3vw;
  text-align: center;
  color: #888;
}

.placeholder-icon {
  font-size: 4vw;
  margin-bottom: 1vw;
}

.media-placeholder p {
  font-size: 1vw;
  font-style: italic;
}

@media only screen and (max-width: 1000px) {
  .media-viewer {
    margin: 20px 0;
  }

  .media-image img {
    border-radius: 8px;
    border: 2px solid rgba(0, 255, 0, 0.3);
  }

  .gallery-main {
    gap: 10px;
    margin-bottom: 15px;
  }

  .gallery-image-container {
    border-radius: 8px;
    border: 2px solid rgba(0, 255, 0, 0.3);
  }

  .gallery-nav {
    font-size: 28px;
    width: 40px;
    height: 40px;
    border: 2px solid var(--mechabyte-green);
  }

  .gallery-thumbnails {
    gap: 8px;
    padding: 8px 0;
  }

  .thumbnail {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    border: 2px solid transparent;
  }

  .gallery-counter {
    font-size: 13px;
    margin-top: 8px;
  }

  .media-video video {
    border-radius: 8px;
    border: 2px solid rgba(0, 255, 0, 0.3);
  }

  .media-social {
    border-radius: 8px;
    border: 2px solid rgba(0, 255, 0, 0.3);
  }

  .media-placeholder {
    border: 3px dashed rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 40px;
  }

  .placeholder-icon {
    font-size: 50px;
    margin-bottom: 15px;
  }

  .media-placeholder p {
    font-size: 14px;
  }
}
</style>
