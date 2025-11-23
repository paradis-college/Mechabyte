<script setup lang="ts">
import { ref, computed } from 'vue';
import { translations } from '../i18n/translations';
import SeasonTabs from '../components/SeasonTabs.vue';
import CollapsibleSection from '../components/CollapsibleSection.vue';
import MoreInfoPopup from '../components/MoreInfoPopup.vue';
import CenterStageFieldAnimation from '../components/animations/CenterStageFieldAnimation.vue';
import IntoTheDeepFieldAnimation from '../components/animations/IntoTheDeepFieldAnimation.vue';
import IntakeEvolutionAnimationEnhanced from '../components/animations/IntakeEvolutionAnimationEnhanced.vue';
import ChassisEvolutionAnimationEnhanced from '../components/animations/ChassisEvolutionAnimationEnhanced.vue';
import PantographArmAnimationEnhanced from '../components/animations/PantographArmAnimationEnhanced.vue';
import DroneLauncherAnimationEnhanced from '../components/animations/DroneLauncherAnimationEnhanced.vue';
import BladeStabilizationAnimationEnhanced from '../components/animations/BladeStabilizationAnimationEnhanced.vue';
import SliderSystemAnimationEnhanced from '../components/animations/SliderSystemAnimationEnhanced.vue';
import HangingMechanismAnimationEnhanced from '../components/animations/HangingMechanismAnimationEnhanced.vue';
import AutonomousTrajectoryAnimation from '../components/animations/AutonomousTrajectoryAnimation.vue';
import IntoTheDeepAutonomousAnimation from '../components/animations/IntoTheDeepAutonomousAnimation.vue';
import IntoTheDeepTeleOpAnimation from '../components/animations/IntoTheDeepTeleOpAnimation.vue';
import IntoTheDeepEndgameAnimation from '../components/animations/IntoTheDeepEndgameAnimation.vue';
import CenterstageTeleOpAnimation from '../components/animations/CenterStageTeleOpAnimation.vue';
import CenterstageEndgameAnimation from '../components/animations/CenterstageEndgameAnimation.vue';
import DriverControlTable from '../components/DriverControlTable.vue';
import StrategySummaryTable from '../components/StrategySummaryTable.vue';
import PhotoGalleryPlaceholder from '../components/PhotoGalleryPlaceholder.vue';
import Model3DPlaceholder from '../components/Model3DPlaceholder.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);
const activeSeason = ref<'2023-2024' | '2024-2025' | '2025-2026'>('2024-2025');
</script>

<template>
  <div class="portfolio-page">
    <!-- Header Section -->
    <section class="content-section header-section">
      <h1 class="main-title">{{ t.portfolioTitle }}</h1>
      <h2 class="subtitle">{{ t.portfolioSubtitle }}</h2>
      <p class="mission-statement">{{ t.portfolioMission }}</p>
    </section>

    <!-- Season Navigation -->
    <SeasonTabs v-model:activeSeason="activeSeason" />

    <!-- 2023-2024 CenterStage Season -->
    <div v-if="activeSeason === '2023-2024'" class="season-content">
      <!-- How the Games Work -->
      <section class="content-section">
        <h2 class="section-title">How the Games Work</h2>
        <p class="intro-text">
          <strong>CenterStage (2023-24):</strong> Robots collect hexagonal pixels and place them on backdrops, create mosaics, and launch paper drones.
        </p>
        <CenterStageFieldAnimation />
        <MoreInfoPopup title="CenterStage Detailed Rules" buttonText="More Info">
          <p>{{ t.centerstageGameDetails }}</p>
          <ul>
            <li><strong>Autonomous:</strong> Place purple pixel on spike mark (10 pts) or team-prop (20 pts); pixels backstage (3 pts) or backdrop (5 pts)</li>
            <li><strong>Teleop:</strong> Place pixels backstage (1 pt) or backdrop (3 pts); create mosaics (10 pt bonus); cross height lines (10 pts/line)</li>
            <li><strong>Endgame:</strong> Launch drones over truss (variable pts); parking positions (10-30 pts); suspend from rigging (20 pts)</li>
          </ul>
        </MoreInfoPopup>
      </section>

      <!-- Game Strategy -->
      <section class="content-section">
        <h2 class="section-title">Game Strategy</h2>
        <p class="strategy-goal"><strong>Goal:</strong> {{ t.centerstageGoal }}</p>
        
        <h3>Strategy Summary</h3>
        <StrategySummaryTable :summary="t.centerstageStrategySummary" />
        
        <div class="strategy-phase">
          <h3>Autonomous</h3>
          <p>Start with pre-loaded pixel. Follow timing-based trajectory to park backstage and drop pixel.</p>
          <AutonomousTrajectoryAnimation />
          <MoreInfoPopup title="Autonomous Details" buttonText="More Info">
            <p>{{ t.centerstageAutonomousDetails }}</p>
          </MoreInfoPopup>
        </div>

        <div class="strategy-phase">
          <h3>Teleop</h3>
          <p>Navigate through truss/stage door, collect pixels, place on backdrop. Focus on mosaics and height lines.</p>
          <CenterstageTeleOpAnimation />
          <MoreInfoPopup title="Teleop Details" buttonText="More Info">
            <p>{{ t.centerstageTeleOpDetails }}</p>
          </MoreInfoPopup>
        </div>

        <div class="strategy-phase">
          <h3>Endgame</h3>
          <p>Score pixels for 15-20 seconds, then launch drone and park backstage.</p>
          <CenterstageEndgameAnimation />
          <MoreInfoPopup title="Endgame Details" buttonText="More Info">
            <p>{{ t.centerstageEndgameDetails }}</p>
          </MoreInfoPopup>
        </div>
      </section>

      <!-- Robot Evolution -->
      <section class="content-section">
        <h2 class="section-title">Robot Evolution</h2>
        
        <Model3DPlaceholder title="3D Model: Complete Robot - CenterStage" description="Explore the full robot design in 3D" />
        
        <div class="evolution-component">
          <h3>Chassis</h3>
          <p><strong>Final Solution:</strong> Mecanum wheel drive with spacious layout and proper hub mounting.</p>
          <ChassisEvolutionAnimationEnhanced />
        <MoreInfoPopup title="Design Evolution: Chassis">
          <p>Initial X-drive chassis was cramped. Control Hub attached with single screw and zip-tie, making it fragile. Solved by redesigning with mecanum wheels, adding Expansion Hub, and creating custom mounting holders.</p>
        </MoreInfoPopup>
        </div>

        <div class="evolution-component">
          <h3>Intake</h3>
          <p><strong>Final Solution:</strong> Angled "crab claw" with toothed wheels for reliable pixel capture.</p>
          <IntakeEvolutionAnimationEnhanced />
          <MoreInfoPopup title="Design Evolution: Intake">
            <p><strong>V1 - Dynamic Brush:</strong> Spinning shaft with toilet-brush head. Abandoned due to motor limitations (no expansion hub).</p>
            <p><strong>V2 - Precision Claw:</strong> Single-pixel claw with position servo. Required too-precise alignment.</p>
            <p><strong>V3 - Angled Claw:</strong> Scissor mechanism with counter-rotating gears. More forgiving capture angle.</p>
          </MoreInfoPopup>
        </div>

        <div class="evolution-component">
          <h3>Pantograph Arm</h3>
          <p><strong>Final Solution:</strong> Tetrix 40:1 motor-powered pantograph maintaining constant angle.</p>
          <PantographArmAnimationEnhanced />
          <MoreInfoPopup title="Design Evolution: Pantograph Arm">
            <p>Initially one continuous-rotation servo (lacked torque). Upgraded to two servos in parallel. After obtaining Expansion Hub, replaced with Tetrix 40:1 motor for greater lifting power.</p>
          </MoreInfoPopup>
        </div>

        <div class="evolution-component">
          <h3>Drone Launcher</h3>
          <p><strong>Final Solution:</strong> Elastic band mechanism with servo-controlled release rod.</p>
          <DroneLauncherAnimationEnhanced />
          <MoreInfoPopup title="Design Evolution: Drone Launcher">
            <p>V1: Basic design. V2: Added custom mounting holes to secure launcher to chassis. Elastic held under tension by position servo, armed during match, released in endgame.</p>
          </MoreInfoPopup>
        </div>

        <PhotoGalleryPlaceholder 
          title="Team Build Photos - CenterStage" 
          caption="Building and testing the robot throughout the season"
          :count="4" 
        />
      </section>

      <!-- Programming Approach -->
      <section class="content-section">
        <h2 class="section-title">Programming Approach</h2>
        <p><strong>Autonomous:</strong> Timing-based movements (no odometry/vision). 4 programs for different starting positions.</p>
        <p><strong>Teleop:</strong> Driver 1 handles movement and arm; Driver 2 handles intake and drone.</p>
        
        <h4>Driver Controls</h4>
        <DriverControlTable season="centerstage" :language="language" />

        <MoreInfoPopup title="Programming Challenges" buttonText="More Info">
          <p>{{ t.programmingChallenges }}</p>
          <p><strong>Phone Power Issue:</strong> Motorola G4 Play couldn't power two controllers. Solved by switching to Nokia 5 and redistributing tasks.</p>
        </MoreInfoPopup>
      </section>

      <!-- Outreach & Events -->
      <section class="content-section">
        <h2 class="section-title">Outreach & Events</h2>
        <div class="events-grid">
          <div class="event-card">
            <h4>Movie Night</h4>
            <p>Fundraising event with robot showcase</p>
          </div>
          <div class="event-card">
            <h4>Pancakes Sale</h4>
            <p>Raised ~5,000 RON</p>
          </div>
          <div class="event-card">
            <h4>Paradis Run</h4>
            <p>Charity event participation</p>
          </div>
          <div class="event-card">
            <h4>Nikola Tesla Festival</h4>
            <p>Collaborated with other teams</p>
          </div>
        </div>
        <PhotoGalleryPlaceholder 
          title="Outreach Events" 
          caption="Community engagement and fundraising activities"
          :count="4" 
        />
      </section>

      <!-- Team Credits -->
      <section class="content-section team-credits">
        <h2 class="section-title">All of this was possible thanks to these people:</h2>
        <div class="team-roles">
          <div class="role-card">
            <h4>{{ t.mentorsTitle }}</h4>
            <p>{{ t.portfolioCenterstageMentor }}</p>
          </div>
          <div class="role-card">
            <h4>{{ t.technicalTeamTitle }}</h4>
            <p>{{ t.portfolioCenterstageTechnical }}</p>
          </div>
          <div class="role-card">
            <h4>{{ t.nonTechnicalTeamTitle }}</h4>
            <p>{{ t.portfolioCenterstageNonTechnical }}</p>
          </div>
        </div>
      </section>

      <!-- Collapsible Sections -->
      <CollapsibleSection title="Lessons Learned & Growth">
        <p>{{ t.lessonsLearned }}</p>
      </CollapsibleSection>

      <CollapsibleSection title="Future Outlook">
        <p>{{ t.futureOutlook }}</p>
      </CollapsibleSection>

      <CollapsibleSection title="Sustainability & Funding">
        <p>Fundraising through bake sales, movie nights, and school sponsorship. First corporate sponsor: Professional Dentist. Focus on recruiting younger members and building alumni support network.</p>
      </CollapsibleSection>
    </div>

    <!-- 2024-2025 Into the Deep Season -->
    <div v-if="activeSeason === '2024-2025'" class="season-content">
      <!-- How the Games Work -->
      <section class="content-section">
        <h2 class="section-title">How the Games Work</h2>
        <p class="intro-text">
          <strong>Into the Deep (2024-25):</strong> Robots collect samples, score in baskets/chambers, and climb the submersible.
        </p>
        <IntoTheDeepFieldAnimation />
        <MoreInfoPopup title="Into the Deep Detailed Rules" buttonText="More Info">
          <p>{{ t.intoTheDeepGameDetails }}</p>
          <ul>
            <li><strong>Scoring:</strong> Samples in net zones (2 pts), low basket (4 pts), high basket (8 pts)</li>
            <li><strong>Specimens:</strong> Clips attached by human players. Low chamber (6 pts), high chamber (10 pts)</li>
            <li><strong>Endgame:</strong> Touch low rung (3 pts), low-level ascent (15 pts), high-level ascent (30 pts), park in observation (3 pts)</li>
          </ul>
        </MoreInfoPopup>
      </section>

      <!-- Game Strategy -->
      <section class="content-section">
        <h2 class="section-title">Game Strategy</h2>
        <p class="intro-text">{{ t.intoTheDeepGoal }}</p>
        
        <h3>Strategy Summary</h3>
        <StrategySummaryTable 
          :summary="t.intoTheDeepStrategySummary" 
          class="strategy-table" 
        />
        
        <div class="strategy-phase">
          <h3>Autonomous</h3>
          <p>{{ t.intoTheDeepAutonomousDetails }}</p>
          <IntoTheDeepAutonomousAnimation />
        </div>

        <div class="strategy-phase">
          <h3>Teleop</h3>
          <p>{{ t.intoTheDeepTeleOpDetails }}</p>
          <IntoTheDeepTeleOpAnimation />
        </div>

        <div class="strategy-phase">
          <h3>Endgame</h3>
          <p>{{ t.intoTheDeepEndgameDetails }}</p>
          <IntoTheDeepEndgameAnimation />
        </div>
      </section>

      <!-- Robot Evolution -->
      <section class="content-section">
        <h2 class="section-title">Robot Evolution</h2>
        
        <Model3DPlaceholder title="3D Model: Complete Robot - Into the Deep" description="Explore the full robot design in 3D" />
        
        <div class="evolution-component">
          <h3>Intake System</h3>
          <p><strong>Final Solution:</strong> Lightweight rotating blades with 3D-printed disc stabilizers.</p>
          <BladeStabilizationAnimationEnhanced />
          <MoreInfoPopup title="Design Evolution: Intake System">
            <p><strong>First Version Issues:</strong> Oversized claw couldn't close fully, specimens fell. Heavy butcher-shop blades acted as obstacles, often aligned parallel and failed to grab.</p>
            <p><strong>Solution:</strong> Redesigned claw shape, added structural support, replaced blades with stoppers, created 3D-printed hexagonal discs to lock blades at 90°.</p>
          </MoreInfoPopup>
        </div>

        <div class="evolution-component">
          <h3>Slider System</h3>
          <p><strong>Final Solution:</strong> Single vertical slider with integrated arm.</p>
          <SliderSystemAnimationEnhanced />
          <MoreInfoPopup title="Design Evolution: Slider System">
            <p><strong>First Version:</strong> Dual sliders (horizontal + vertical), off-center, wobbly, storage box didn't reach basket.</p>
            <p><strong>Solution:</strong> Eliminated horizontal slider. Single vertical slider with attached arm. No transfer between containers—intake grabs and slider lifts directly to high basket.</p>
          </MoreInfoPopup>
        </div>

        <div class="evolution-component">
          <h3>Hanging Mechanism</h3>
          <p><strong>Final Solution:</strong> Winch-driven hook system for submersible ascent.</p>
          <HangingMechanismAnimationEnhanced />
          <MoreInfoPopup title="Design Evolution: Hanging Mechanism">
            <p><strong>Challenge:</strong> Endgame requires climbing the submersible for significant points (touch: 3 pts, low-level ascent: 15 pts, high-level ascent: 30 pts).</p>
            <p><strong>Solution:</strong> Implemented a motorized winch system with extendable cable and hook. Hook extends upward to latch onto rung, then winch retracts cable to lift robot off the ground. Reliable and consistent for competition.</p>
          </MoreInfoPopup>
        </div>

        <PhotoGalleryPlaceholder 
          title="Team Build Photos - Into the Deep" 
          caption="Iterating and improving throughout the season"
          :count="4" 
        />
      </section>

      <!-- Programming Approach -->
      <section class="content-section">
        <h2 class="section-title">Programming Approach</h2>
        <p><strong>Autonomous:</strong> Timing-based with 4 cases (forward, backward, left, right) combined based on starting position.</p>
        <p><strong>Teleop:</strong> Driver 1 handles movement; Driver 2 handles slider and intake/outtake.</p>
        
        <h4>Driver Controls</h4>
        <DriverControlTable season="into-the-deep" :language="language" />
      </section>

      <!-- Outreach & Events -->
      <section class="content-section">
        <h2 class="section-title">Outreach & Events</h2>
        <div class="events-grid">
          <div class="event-card">
            <h4>Winter Dive Meet</h4>
            <p>Scored 3/6 matches in Iași</p>
          </div>
          <div class="event-card">
            <h4>STEMPOSSUM</h4>
            <p>Robotics & AI collaboration</p>
          </div>
          <div class="event-card">
            <h4>UGAL Inventics</h4>
            <p>Showcased innovations</p>
          </div>
          <div class="event-card">
            <h4>Christmas Market</h4>
            <p>Raised 2,000 RON from decorations</p>
          </div>
        </div>
        <PhotoGalleryPlaceholder 
          title="Outreach Events" 
          caption="Competitions and community engagement"
          :count="4" 
        />
      </section>

      <!-- Team Credits -->
      <section class="content-section team-credits">
        <h2 class="section-title">All of this was possible thanks to these people:</h2>
        <div class="team-roles">
          <div class="role-card">
            <h4>{{ t.mentorsTitle }}</h4>
            <p>{{ t.portfolioIntoTheDeepMentors }}</p>
          </div>
          <div class="role-card">
            <h4>{{ t.technicalTeamTitle }}</h4>
            <p>{{ t.portfolioIntoTheDeepTechnical }}</p>
          </div>
          <div class="role-card">
            <h4>{{ t.nonTechnicalTeamTitle }}</h4>
            <p>{{ t.portfolioIntoTheDeepNonTechnical }}</p>
          </div>
        </div>
      </section>

      <!-- Collapsible Sections -->
      <CollapsibleSection title="Lessons Learned & Growth">
        <p>Applied lessons from CenterStage to streamline mechanisms. Focused on weight distribution and reliability. Adopted 3D-printed improvements. Programming evolved to multi-case autonomous routines.</p>
      </CollapsibleSection>

      <CollapsibleSection title="Future Outlook">
        <p>Integration of sensors for autonomous navigation could improve scoring. Corporate sponsorships may fund advanced motors and vision systems. Sustainability plan ensures continued growth.</p>
      </CollapsibleSection>

      <CollapsibleSection title="Sustainability & Funding">
        <p>Continued fundraising through sales and events. Expanded sponsor network. Focus on recruiting younger students and maintaining alumni support.</p>
      </CollapsibleSection>
    </div>

    <!-- 2025-2026 Upcoming Season -->
    <div v-if="activeSeason === '2025-2026'" class="season-content">
      <section class="content-section upcoming-season">
        <h2 class="section-title">2025-2026 Season</h2>
        <div class="coming-soon">
          <p class="coming-soon-text">🚀 Coming Soon!</p>
          <p>The 2025-2026 FTC season game will be revealed soon. Stay tuned for our robot design, strategy, and journey documentation.</p>
          <div class="placeholder-areas">
            <div class="placeholder-box">
              <h4>Game Overview</h4>
              <p>Game mechanics and field layout will be added once announced</p>
            </div>
            <div class="placeholder-box">
              <h4>Robot Design</h4>
              <p>Design process and evolution will be documented here</p>
            </div>
            <div class="placeholder-box">
              <h4>Team & Events</h4>
              <p>Team roster and outreach activities for the new season</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.portfolio-page {
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
  margin-bottom: 2vw;
}

.strategy-goal {
  background: rgba(0, 255, 0, 0.1);
  border-left: 0.3vw solid var(--mechabyte-green);
  padding: 1vw 1.5vw;
  margin-bottom: 2vw;
  font-size: 1.1vw;
}

.strategy-phase {
  margin-bottom: 3vw;
}

.strategy-phase h3 {
  font-size: 1.6vw;
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
}

.strategy-phase p {
  font-size: 1vw;
  line-height: 1.6;
  color: #ddd;
  margin-bottom: 1vw;
}

.evolution-component {
  background: rgba(0, 0, 0, 0.3);
  border: 0.15vw solid rgba(0, 255, 0, 0.2);
  border-radius: 0.5vw;
  padding: 2vw;
  margin-bottom: 3vw;
}

.evolution-component h3 {
  font-size: 1.6vw;
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
}

.evolution-component p {
  font-size: 1vw;
  line-height: 1.6;
  color: #ddd;
  margin-bottom: 1.5vw;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5vw;
  margin-bottom: 2vw;
}

.event-card {
  background: rgba(0, 0, 0, 0.3);
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
  padding: 1.5vw;
  transition: all 0.3s ease;
}

.event-card:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: var(--mechabyte-green);
  transform: translateY(-0.3vw);
}

.event-card h4 {
  color: var(--mechabyte-green);
  font-size: 1.2vw;
  margin-bottom: 0.5vw;
}

.event-card p {
  font-size: 0.9vw;
  color: #ccc;
}

.team-credits {
  background: rgba(0, 255, 0, 0.05);
  border: 0.2vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  padding: 3vw;
}

.team-roles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2vw;
}

.role-card {
  background: rgba(0, 0, 0, 0.5);
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
  padding: 1.5vw;
}

.role-card h4 {
  color: var(--mechabyte-green);
  font-size: 1.3vw;
  margin-bottom: 1vw;
}

.role-card p {
  font-size: 0.95vw;
  line-height: 1.6;
  color: #ddd;
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
  
  .section-title {
    font-size: 24px;
    border-bottom: 2px solid var(--mechabyte-green);
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  
  .intro-text,
  .strategy-goal,
  .strategy-phase p,
  .evolution-component p {
    font-size: 15px;
  }
  
  .strategy-phase h3,
  .evolution-component h3 {
    font-size: 20px;
  }
  
  .event-card h4 {
    font-size: 16px;
  }
  
  .event-card p {
    font-size: 13px;
  }
  
  .role-card h4 {
    font-size: 18px;
  }
  
  .role-card p {
    font-size: 14px;
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
