<script setup lang="ts">
import { computed } from "vue";
import { translations } from "../i18n/translations";
import SectionHeader from "../components/SectionHeader.vue";

const props = defineProps<{
  language: "en" | "ro";
}>();

const t = computed(() => translations[props.language]);
</script>

<template>
  <div class="contact-page">
    <section class="content-section">
      <SectionHeader :title="t.contactTitle" :subtitle="t.contactIntro" />

      <div class="contact-grid">
        <div class="contact-card">
          <h2>{{ t.contactLabels.email }}</h2>
          <a :href="`mailto:${t.contactDetails.email}`" class="contact-link">
            {{ t.contactDetails.email }}
          </a>
        </div>

        <div class="contact-card">
          <h2>{{ t.contactLabels.phone }}</h2>
          <p>{{ t.contactDetails.phone }}</p>
        </div>

        <div class="contact-card full-width">
          <h2>{{ t.contactLabels.address }}</h2>
          <p>{{ t.contactDetails.address }}</p>
        </div>
      </div>

      <div class="social-section">
        <h2>{{ t.followUsTitle }}</h2>
        <div class="social-links">
          <a
            :href="t.contactDetails.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <span class="social-icon">📸</span>
            <span>{{ t.contactLabels.instagram }}</span>
          </a>
          <a
            :href="t.contactDetails.tiktok"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <span class="social-icon">🎵</span>
            <span>{{ t.contactLabels.tiktok }}</span>
          </a>
          <a
            :href="t.contactDetails.youtube"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <span class="social-icon">📺</span>
            <span>{{ t.contactLabels.youtube }}</span>
          </a>
          <a
            :href="t.contactDetails.facebook"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <span class="social-icon">👍</span>
            <span>{{ t.contactLabels.facebook }}</span>
          </a>
          <a
            :href="t.contactDetails.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <span class="social-icon">💼</span>
            <span>{{ t.contactLabels.linkedin }}</span>
          </a>
        </div>
      </div>

      <div class="info-section">
        <div class="info-card">
          <h3>{{ t.scheduleDemoTitle }}</h3>
          <p>{{ t.scheduleDemo }}</p>
          <a
            :href="`mailto:${t.contactDetails.email}?subject=${
              language === 'en'
                ? 'Schedule a Demo Request'
                : 'Cerere Programare Demonstrație'
            }&body=${
              language === 'en'
                ? 'Hi Mechabyte Team,%0D%0A%0D%0AI would like to schedule a robot demonstration.'
                : 'Bună echipa Mechabyte,%0D%0A%0D%0AAș dori să programez o demonstrație cu robotul.'
            }`"
            class="btn-primary schedule-demo-btn"
          >
            {{
              language === "en"
                ? "Schedule a Demo"
                : "Programează o Demonstrație"
            }}
          </a>
        </div>

        <div class="info-card">
          <h3>{{ t.stayConnectedTitle }}</h3>
          <p>{{ t.connectWithUs }}</p>
          <a
            :href="t.contactDetails.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary stay-connected-btn"
          >
            {{ language === "en" ? "Stay Connected" : "Rămâi Conectat" }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2vw 0;
}

.content-section {
  display: flex;
  width: clamp(68.75vw, 1200px, 90vw);
  padding: 2vw;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vw;
  border: 0.1vw solid var(--mechabyte-green);
  margin-bottom: 2vw;
}

h1 {
  color: var(--mechabyte-green);
  width: 100%;
}

h2 {
  color: var(--mechabyte-green);
  margin-bottom: 0.5vw;
  font-size: clamp(18px, 1.5vw, 24px);
}

.intro-text {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5vw;
  width: 100%;
}

.contact-card {
  padding: 1.5vw;
  background: var(--dark-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.contact-card.full-width {
  grid-column: 1 / -1;
}

.contact-card p {
  line-height: 1.6;
  font-size: clamp(14px, 1.2vw, 20px);
}

.contact-link {
  color: var(--mechabyte-green);
  text-decoration: none;
  font-size: clamp(14px, 1.2vw, 20px);
  word-break: break-all;
}

.contact-link:hover {
  text-decoration: underline;
}

.social-section {
  width: 100%;
  padding: 1.5vw;
  background: var(--mechabyte-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
}

.social-links {
  display: flex;
  gap: 2vw;
  margin-top: 1vw;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5vw;
  padding: 1vw 1.5vw;
  background: var(--dark-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  color: var(--mechabyte-green);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--mechabyte-green);
  color: var(--background-grey);
  transform: scale(1.05);
}

.social-icon {
  font-size: clamp(18px, 1.5vw, 28px);
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2vw;
  width: 100%;
}

.info-card {
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  background: var(--dark-grey);
  border-radius: 0.5vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card h3 {
  color: var(--mechabyte-green);
  margin-bottom: 0.5rem;
}

.info-card p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.schedule-demo-btn,
.stay-connected-btn {
  margin-top: auto;
  text-decoration: none;
  text-align: center;
  display: inline-block;
}

@media only screen and (max-width: 1000px) {
  .content-section {
    width: 90vw;
    padding: 20px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .contact-card {
    padding: 15px;
  }

  .social-section {
    padding: 15px;
  }

  .social-links {
    flex-direction: column;
    gap: 10px;
  }

  .social-link {
    padding: 12px 16px;
  }

  .info-section {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .info-card {
    padding: 15px;
  }
}
</style>
