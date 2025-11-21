<script setup lang="ts">
import { computed } from 'vue';
import { translations } from '../i18n/translations';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);
</script>

<template>
  <div class="portfolio-page">
    <!-- Header Section -->
    <section class="content-section header-section">
      <h1 class="main-title">{{ t.portfolioTitle }}</h1>
      <h2 class="subtitle">{{ t.portfolioSubtitle }}</h2>
      <p class="mission-statement">{{ t.portfolioMission }}</p>
    </section>

    <!-- Team Composition Section -->
    <section class="content-section">
      <h2 class="section-title">{{ t.ourTeamTitle }}</h2>
      
      <div class="season-section">
        <h3 class="season-title">{{ t.intoTheDeepSeason }}</h3>
        <div class="team-roles">
          <div class="role-card">
            <h4>{{ t.mentorsTitle }}</h4>
            <p>{{ t.portfolioIntoTheDeepMentors }}</p>
          </div>
          <div class="role-card">
            <h4>{{ t.nonTechnicalTeamTitle }}</h4>
            <p>{{ t.portfolioIntoTheDeepNonTechnical }}</p>
          </div>
          <div class="role-card">
            <h4>{{ t.technicalTeamTitle }}</h4>
            <p>{{ t.portfolioIntoTheDeepTechnical }}</p>
          </div>
        </div>
      </div>

      <div class="season-section">
        <h3 class="season-title">{{ t.centerstageSeason }}</h3>
        <div class="team-roles">
          <div class="role-card">
            <h4>{{ t.mentorsTitle }}</h4>
            <p>{{ t.portfolioCenterstageMentor }}</p>
          </div>
          <div class="role-card">
            <h4>{{ t.nonTechnicalTeamTitle }}</h4>
            <p>{{ t.portfolioCenterstageNonTechnical }}</p>
          </div>
          <div class="role-card">
            <h4>{{ t.technicalTeamTitle }}</h4>
            <p>{{ t.portfolioCenterstageTechnical }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Game Strategy Section -->
    <section class="content-section">
      <h2 class="section-title">{{ t.gameStrategyTitle }}</h2>
      
      <div class="strategy-season">
        <h3 class="season-title">{{ t.centerstageSeason }}</h3>
        <div class="strategy-phases">
          <div class="phase-card">
            <h4>{{ t.autonomousTitle }}</h4>
            <p>{{ t.centerstageAutonomous }}</p>
          </div>
          <div class="phase-card">
            <h4>{{ t.teleOpTitle }}</h4>
            <p>{{ t.centerstageTeleOp }}</p>
          </div>
          <div class="phase-card">
            <h4>{{ t.endgameTitle }}</h4>
            <p>{{ t.centerstageEndgame }}</p>
          </div>
        </div>
      </div>

      <div class="strategy-season">
        <h3 class="season-title">{{ t.intoTheDeepSeason }}</h3>
        <div class="strategy-phases">
          <div class="phase-card">
            <h4>{{ t.teleOpTitle }}</h4>
            <p>{{ t.intoTheDeepTeleOp }}</p>
          </div>
          <div class="phase-card">
            <h4>{{ t.endgameTitle }}</h4>
            <p>{{ t.intoTheDeepEndgame }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Robot Evolution Section -->
    <section class="content-section">
      <h2 class="section-title">{{ t.robotEvolutionTitle }}</h2>
      
      <div class="evolution-season">
        <h3 class="season-title">{{ t.centerstageSeason }}</h3>
        
        <div class="component-evolution">
          <h4>{{ t.driveTrainTitle }}</h4>
          <p>{{ t.centerstageDriveTrainEvolution }}</p>
        </div>
        
        <div class="component-evolution">
          <h4>{{ t.intakeTitle }}</h4>
          <p>{{ t.centerstageIntakeEvolution }}</p>
        </div>
        
        <div class="component-evolution">
          <h4>{{ t.armTitle }}</h4>
          <p>{{ t.centerstageArmEvolution }}</p>
        </div>
        
        <div class="component-evolution">
          <h4>{{ t.launcherTitle }}</h4>
          <p>{{ t.centerstageLauncherEvolution }}</p>
        </div>
      </div>

      <div class="evolution-season">
        <h3 class="season-title">{{ t.intoTheDeepSeason }}</h3>
        
        <div class="component-evolution">
          <h4>{{ t.firstVersionLabel }}</h4>
          <p>{{ t.intoTheDeepFirstVersion }}</p>
        </div>
        
        <div class="component-evolution">
          <h4>{{ t.upgradeAttemptsLabel }}</h4>
          <p>{{ t.intoTheDeepUpgradeAttempts }}</p>
        </div>
        
        <div class="component-evolution">
          <h4>{{ t.currentVersionLabel }}</h4>
          <p>{{ t.intoTheDeepCurrentVersion }}</p>
        </div>
        
        <div class="component-evolution">
          <h4>{{ t.constructionImprovementsLabel }}</h4>
          <p>{{ t.intoTheDeepConstructionImprovements }}</p>
        </div>
      </div>
    </section>

    <!-- Programming & Controls Section -->
    <section class="content-section">
      <h2 class="section-title">{{ t.programmingTitle }}</h2>
      
      <div class="programming-content">
        <h4>{{ t.autonomousApproachLabel }}</h4>
        <p>{{ t.programmingDescription }}</p>
      </div>
      
      <div class="programming-content">
        <h4>{{ t.driverControlsTitle }}</h4>
        <p>{{ t.driverLayoutDescription }}</p>
      </div>
    </section>

    <!-- Outreach & Events Section -->
    <section class="content-section">
      <h2 class="section-title">{{ t.outreachEventsTitle }}</h2>
      
      <div class="outreach-subsection">
        <h3>{{ t.socialMediaTitle }}</h3>
        <p>{{ t.socialMediaDescription }}</p>
      </div>

      <div class="outreach-subsection">
        <h3>{{ t.inPersonEventsTitle }}</h3>
        <div class="events-grid">
          <div 
            v-for="(event, index) in t.outreachEvents" 
            :key="index"
            class="event-card"
          >
            <h4>{{ event.name }}</h4>
            <p>{{ event.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sustainability & Funding Section -->
    <section class="content-section">
      <h2 class="section-title">{{ t.sustainabilityTitle }}</h2>
      
      <div class="sustainability-content">
        <h3>{{ t.fundraisingTitle }}</h3>
        <p>{{ t.fundraisingDescription }}</p>
      </div>
      
      <div class="sustainability-content">
        <h3>{{ t.sustainabilityPlanTitle }}</h3>
        <p>{{ t.sustainabilityDescription }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portfolio-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2vw 0;
  gap: 2vw;
}

.content-section {
  display: flex;
  width: clamp(68.75vw, 1200px, 90vw);
  padding: 2vw;
  flex-direction: column;
  gap: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  background: var(--dark-grey);
}

.header-section {
  text-align: center;
  align-items: center;
}

.main-title {
  color: var(--mechabyte-green);
  font-size: 3vw;
  margin-bottom: 0.5vw;
}

.subtitle {
  color: var(--mechabyte-green);
  font-size: 1.8vw;
  margin-bottom: 1vw;
  font-weight: 400;
}

.mission-statement {
  line-height: 1.8;
  max-width: 80%;
  text-align: left;
  font-size: 1.1vw;
}

.section-title {
  color: var(--mechabyte-green);
  font-size: 2.2vw;
  margin-bottom: 1vw;
  border-bottom: 0.2vw solid var(--mechabyte-green);
  padding-bottom: 0.5vw;
}

.season-section,
.strategy-season,
.evolution-season {
  margin-bottom: 2vw;
}

.season-title {
  color: var(--mechabyte-green);
  font-size: 1.6vw;
  margin-bottom: 1vw;
}

.team-roles,
.strategy-phases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5vw;
}

.role-card,
.phase-card {
  background: var(--background-grey);
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
}

.role-card h4,
.phase-card h4 {
  color: var(--mechabyte-green);
  margin-bottom: 0.8vw;
  font-size: 1.3vw;
}

.role-card p,
.phase-card p {
  line-height: 1.6;
  font-size: 1vw;
}

.component-evolution {
  margin-bottom: 2vw;
  padding: 1.5vw;
  background: var(--background-grey);
  border-left: 0.3vw solid var(--mechabyte-green);
}

.component-evolution h4 {
  color: var(--mechabyte-green);
  margin-bottom: 0.8vw;
  font-size: 1.4vw;
}

.component-evolution p {
  line-height: 1.7;
  font-size: 1vw;
}

.programming-content {
  margin-bottom: 1.5vw;
}

.programming-content h4 {
  color: var(--mechabyte-green);
  margin-bottom: 0.8vw;
  font-size: 1.3vw;
}

.programming-content p {
  line-height: 1.7;
  font-size: 1vw;
}

.outreach-subsection {
  margin-bottom: 2vw;
}

.outreach-subsection h3 {
  color: var(--mechabyte-green);
  font-size: 1.5vw;
  margin-bottom: 1vw;
}

.outreach-subsection > p {
  line-height: 1.7;
  margin-bottom: 1.5vw;
  font-size: 1vw;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5vw;
}

.event-card {
  background: var(--background-grey);
  padding: 1.2vw;
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  transition: transform 0.2s, box-shadow 0.2s;
}

.event-card:hover {
  transform: translateY(-0.3vw);
  box-shadow: 0 0.4vw 0.8vw rgba(0, 255, 0, 0.2);
}

.event-card h4 {
  color: var(--mechabyte-green);
  margin-bottom: 0.6vw;
  font-size: 1.2vw;
}

.event-card p {
  line-height: 1.6;
  font-size: 0.95vw;
}

.sustainability-content {
  margin-bottom: 1.5vw;
}

.sustainability-content h3 {
  color: var(--mechabyte-green);
  font-size: 1.5vw;
  margin-bottom: 0.8vw;
}

.sustainability-content p {
  line-height: 1.7;
  font-size: 1vw;
}

@media only screen and (max-width: 1000px) {
  .portfolio-page {
    padding: 20px 0;
    gap: 20px;
  }

  .content-section {
    width: 90vw;
    padding: 20px;
    gap: 20px;
  }

  .main-title {
    font-size: 32px;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .mission-statement {
    font-size: 16px;
    max-width: 100%;
  }

  .section-title {
    font-size: 26px;
    margin-bottom: 15px;
    border-bottom: 2px solid var(--mechabyte-green);
    padding-bottom: 8px;
  }

  .season-title {
    font-size: 22px;
    margin-bottom: 15px;
  }

  .team-roles,
  .strategy-phases {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .role-card,
  .phase-card {
    padding: 15px;
  }

  .role-card h4,
  .phase-card h4 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .role-card p,
  .phase-card p {
    font-size: 14px;
  }

  .component-evolution {
    padding: 15px;
    margin-bottom: 20px;
    border-left: 3px solid var(--mechabyte-green);
  }

  .component-evolution h4 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .component-evolution p {
    font-size: 14px;
  }

  .programming-content h4,
  .outreach-subsection h3,
  .sustainability-content h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .programming-content p,
  .outreach-subsection > p,
  .sustainability-content p {
    font-size: 14px;
  }

  .events-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .event-card {
    padding: 15px;
  }

  .event-card:hover {
    transform: translateY(-3px);
  }

  .event-card h4 {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .event-card p {
    font-size: 13px;
  }
}
</style>
