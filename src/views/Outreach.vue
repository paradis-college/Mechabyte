<script setup lang="ts">
import { ref, computed } from 'vue';
import { translations } from '../i18n/translations';
import SeasonTabs from '../components/SeasonTabs.vue';
import PhotoGalleryPlaceholder from '../components/PhotoGalleryPlaceholder.vue';
import MoreInfoPopup from '../components/MoreInfoPopup.vue';
import CollapsibleSection from '../components/CollapsibleSection.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);
const activeSeason = ref<'2023-2024' | '2024-2025' | '2025-2026'>('2024-2025');
</script>

<template>
  <div class="outreach-page">
    <!-- Header Section -->
    <section class="content-section header-section">
      <h1 class="main-title">{{ t.outreachTitle }}</h1>
      <h2 class="subtitle">{{ t.outreachSubtitle }}</h2>
      <p class="mission-statement">{{ t.outreachMission }}</p>
    </section>

    <!-- Origin Story & Key Themes (before tabs) -->
    <section class="content-section origin-section">
      <CollapsibleSection :title="language === 'en' ? 'Our Journey: Starting from Scratch' : 'Călătoria Noastră: Pornind de la Zero'">
        <p class="origin-story">{{ t.outreachOriginStory }}</p>
      </CollapsibleSection>

      <CollapsibleSection :title="t.outreachSocialMediaTitle">
        <p class="social-media-desc">{{ t.outreachSocialMediaDesc }}</p>
      </CollapsibleSection>

      <CollapsibleSection :title="t.outreachTeamFriendshipsTitle">
        <p class="team-friendships-desc">{{ t.outreachTeamFriendshipsDesc }}</p>
      </CollapsibleSection>
    </section>

    <!-- Season Navigation -->
    <SeasonTabs v-model:activeSeason="activeSeason" />

    <!-- 2023-2024 CenterStage Season -->
    <div v-if="activeSeason === '2023-2024'" class="season-content">
      <section class="content-section">
        <h2 class="section-title">CenterStage Season Events</h2>
        <p class="intro-text">
          During the 2023-2024 season, we focused on building community connections and raising funds 
          to support our robotics program while sharing our passion for STEM with the broader community.
        </p>

        <div class="events-container">
          <div 
            v-for="(event, index) in t.centerstageEvents" 
            :key="index" 
            class="event-detail-card"
          >
            <h3 class="event-name">{{ event.name }}</h3>
            <p class="event-date" v-if="event.date">{{ event.date }}</p>
            <p class="event-full-description">{{ event.fullDescription }}</p>
            <div class="event-impact">
              <h4>Impact:</h4>
              <p>{{ event.impact }}</p>
            </div>
            <MoreInfoPopup v-if="event.moreInfo" :title="event.name + ' - Detailed Story'" buttonText="More Info">
              <p>{{ event.moreInfo }}</p>
              <p v-if="event.partnerships" class="partnerships-info">
                <strong>Partnerships:</strong> {{ event.partnerships }}
              </p>
            </MoreInfoPopup>
          </div>
        </div>

        <PhotoGalleryPlaceholder 
          title="CenterStage Outreach Events" 
          caption="Community engagement and fundraising activities from 2023-2024"
          :count="4" 
        />
      </section>
    </div>

    <!-- 2024-2025 Into the Deep Season -->
    <div v-if="activeSeason === '2024-2025'" class="season-content">
      <section class="content-section">
        <h2 class="section-title">Into the Deep Season Events</h2>
        <p class="intro-text">
          The 2024-2025 season saw us expand our outreach efforts with competition participation, 
          university collaborations, and creative fundraising initiatives that strengthened our 
          ties with the local community.
        </p>

        <div class="events-container">
          <div 
            v-for="(event, index) in t.intoTheDeepEvents" 
            :key="index" 
            class="event-detail-card"
          >
            <h3 class="event-name">{{ event.name }}</h3>
            <p class="event-date" v-if="event.date">{{ event.date }}</p>
            <p class="event-full-description">{{ event.fullDescription }}</p>
            <div class="event-impact">
              <h4>Impact:</h4>
              <p>{{ event.impact }}</p>
            </div>
            <MoreInfoPopup v-if="event.moreInfo" :title="event.name + ' - Detailed Story'" buttonText="More Info">
              <p>{{ event.moreInfo }}</p>
              <p v-if="event.partnerships" class="partnerships-info">
                <strong>Partnerships:</strong> {{ event.partnerships }}
              </p>
            </MoreInfoPopup>
          </div>
        </div>

        <PhotoGalleryPlaceholder 
          title="Into the Deep Outreach Events" 
          caption="Competitions and community engagement from 2024-2025"
          :count="4" 
        />
      </section>
    </div>

    <!-- 2025-2026 Upcoming Season -->
    <div v-if="activeSeason === '2025-2026'" class="season-content">
      <section class="content-section upcoming-season">
        <h2 class="section-title">2025-2026 Season</h2>
        <div class="coming-soon">
          <p class="coming-soon-text">🤝 Coming Soon!</p>
          <p>We're planning exciting new outreach initiatives for the 2025-2026 season. 
             Stay tuned for updates on community events, partnerships, and ways to get involved!</p>
          <div class="placeholder-areas">
            <div class="placeholder-box">
              <h4>Community Events</h4>
              <p>School demonstrations, STEM workshops, and public showcases</p>
            </div>
            <div class="placeholder-box">
              <h4>Fundraising Activities</h4>
              <p>Creative fundraising events to support the team</p>
            </div>
            <div class="placeholder-box">
              <h4>Partnerships</h4>
              <p>Collaborations with other teams and organizations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.outreach-page {
  width: 100%;
  min-height: 100vh;
  background: var(--background-grey);
  color: white;
}

.content-section {
  max-width: 1200px;
  margin: 0 auto 4vw;
  padding: 0 2vw;
}

.header-section {
  text-align: center;
  padding: 4vw 2vw;
}

.main-title {
  font-size: 3.5vw;
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
}

.subtitle {
  font-size: 1.8vw;
  color: #ddd;
  margin-bottom: 2vw;
}

.mission-statement {
  font-size: 1.1vw;
  line-height: 1.8;
  color: #ccc;
  max-width: 800px;
  margin: 0 auto;
}

.origin-section {
  margin-bottom: 3vw;
}

.origin-story,
.social-media-desc,
.team-friendships-desc {
  font-size: 1vw;
  line-height: 1.8;
  color: #ddd;
}

.partnerships-info {
  margin-top: 1vw;
  padding-top: 1vw;
  border-top: 0.1vw solid rgba(0, 255, 0, 0.2);
  font-size: 0.95vw;
  color: #ccc;
}

.section-title {
  font-size: 2.2vw;
  color: var(--mechabyte-green);
  margin-bottom: 2vw;
  border-bottom: 0.2vw solid var(--mechabyte-green);
  padding-bottom: 0.8vw;
}

.intro-text {
  font-size: 1.1vw;
  line-height: 1.8;
  color: #ddd;
  margin-bottom: 3vw;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 3vw;
  margin-bottom: 3vw;
}

.event-detail-card {
  background: rgba(0, 0, 0, 0.3);
  border: 0.15vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
  padding: 2vw;
  transition: all 0.3s ease;
}

.event-detail-card:hover {
  background: rgba(0, 255, 0, 0.05);
  border-color: var(--mechabyte-green);
  transform: translateX(0.5vw);
}

.event-name {
  font-size: 1.8vw;
  color: var(--mechabyte-green);
  margin-bottom: 0.5vw;
}

.event-date {
  font-size: 0.9vw;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  margin-bottom: 1vw;
}

.event-full-description {
  font-size: 1vw;
  line-height: 1.7;
  color: #ddd;
  margin-bottom: 1.5vw;
}

.event-impact {
  background: rgba(0, 255, 0, 0.05);
  border-left: 0.3vw solid var(--mechabyte-green);
  padding: 1vw 1.5vw;
  border-radius: 0 0.3vw 0.3vw 0;
}

.event-impact h4 {
  font-size: 1.1vw;
  color: var(--mechabyte-green);
  margin-bottom: 0.5vw;
}

.event-impact p {
  font-size: 0.95vw;
  line-height: 1.6;
  color: #ccc;
}

.upcoming-season {
  text-align: center;
  padding: 4vw 2vw;
}

.coming-soon {
  background: rgba(0, 0, 0, 0.3);
  border: 0.2vw dashed rgba(0, 255, 0, 0.5);
  border-radius: 1vw;
  padding: 4vw;
  margin: 2vw 0;
}

.coming-soon-text {
  font-size: 3vw;
  color: var(--mechabyte-green);
  margin-bottom: 1.5vw;
}

.placeholder-areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2vw;
  margin-top: 3vw;
}

.placeholder-box {
  background: rgba(0, 255, 0, 0.05);
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
  padding: 2vw;
}

.placeholder-box h4 {
  color: var(--mechabyte-green);
  font-size: 1.4vw;
  margin-bottom: 1vw;
}

.placeholder-box p {
  font-size: 1vw;
  color: #aaa;
  font-style: italic;
}

@media only screen and (max-width: 1000px) {
  .main-title {
    font-size: 32px;
  }
  
  .subtitle {
    font-size: 20px;
  }
  
  .mission-statement {
    font-size: 15px;
  }

  .origin-story,
  .social-media-desc,
  .team-friendships-desc {
    font-size: 14px;
  }

  .partnerships-info {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 2px solid rgba(0, 255, 0, 0.2);
    font-size: 13px;
  }
  
  .section-title {
    font-size: 24px;
    border-bottom: 2px solid var(--mechabyte-green);
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .intro-text {
    font-size: 15px;
    margin-bottom: 25px;
  }

  .events-container {
    gap: 25px;
  }

  .event-detail-card {
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 20px;
  }

  .event-detail-card:hover {
    transform: translateX(5px);
  }
  
  .event-name {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .event-date {
    font-size: 13px;
    margin-bottom: 10px;
  }

  .event-full-description {
    font-size: 14px;
    margin-bottom: 15px;
  }

  .event-impact {
    border-left: 3px solid var(--mechabyte-green);
    padding: 12px 15px;
    border-radius: 0 5px 5px 0;
  }

  .event-impact h4 {
    font-size: 15px;
    margin-bottom: 8px;
  }

  .event-impact p {
    font-size: 13px;
  }
  
  .coming-soon-text {
    font-size: 28px;
  }
  
  .placeholder-box h4 {
    font-size: 18px;
  }
  
  .placeholder-box p {
    font-size: 14px;
  }
}
</style>
