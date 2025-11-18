<script setup lang="ts">
import TeamMemberCard from "./components/TeamMemberCard.vue";
import NavButton from "./components/NavigationButton.vue";

import { ref, computed, onMounted } from "vue";

const isVideoAvailable = false;
const displayNav = ref<number[]>([0, 0, 0, 0]);

// Language state
const language = ref<'en' | 'ro'>('en');

type Member = {
  name: string,
  department: string,
  role?: string
};

let members = ref<Member[]>([
  // Technical Team
  {
    name: "Alexandra",
    department: "Technical",
    role: "Programming"
  },
  {
    name: "Alessia Sabie",
    department: "Technical",
    role: "Programming"
  },
  {
    name: "Alexandru Săvescu",
    department: "Technical",
    role: "Programming"
  },
  {
    name: "Ștefan Albu",
    department: "Technical",
    role: "Hardware"
  },
  {
    name: "Ionas Pilat",
    department: "Technical",
    role: "Hardware"
  },
  {
    name: "Luca Stăncila",
    department: "Technical",
    role: "CAD"
  },
  {
    name: "David Grigore",
    department: "Technical",
    role: "CAD"
  },
  {
    name: "Teodor Matricală",
    department: "Technical",
    role: "CAD"
  },
  {
    name: "Ianis Cotoc",
    department: "Technical",
    role: "Technical"
  },
  // Non-Technical Team
  {
    name: "Alexandra Maftei",
    department: "Non-Technical",
    role: "Marketing"
  },
  {
    name: "Alexia Vancea",
    department: "Non-Technical",
    role: "Marketing"
  },
  {
    name: "Cristiana Balan",
    department: "Non-Technical",
    role: "Design"
  },
  {
    name: "Tudor Androne",
    department: "Non-Technical",
    role: "Design"
  },
  {
    name: "Lia Onișor",
    department: "Non-Technical",
    role: "Outreach"
  },
  {
    name: "Patric Tamaș",
    department: "Non-Technical",
    role: "Outreach"
  },
  // Mentor
  {
    name: "Andreea Ioniță",
    department: "Mentor",
    role: "Team Mentor"
  }
]);

// Translations object
const translations = {
  en: {
    aboutTitle: "About Us",
    aboutText: "Mechabyte is a passionate robotics team from Paradise International College in Iași, Romania, competing in the FIRST Tech Challenge (FTC). We are a diverse group of students dedicated to innovation, teamwork, and community engagement.",
    missionTitle: "Our Mission",
    missionItems: [
      "Promote STEM education and robotics in our community",
      "Develop technical skills in programming, engineering, and design",
      "Foster teamwork, leadership, and problem-solving abilities",
      "Inspire the next generation of innovators and engineers",
      "Represent Romania on the international FTC stage"
    ],
    ftcTitle: "About FIRST Tech Challenge",
    ftcDescription: "FIRST Tech Challenge (FTC) is a global robotics competition for students aged 12-18. Teams design, build, program, and compete with robots to complete challenges. FTC promotes STEM education, teamwork, and gracious professionalism while preparing students for future careers in technology and engineering.",
    activitiesTitle: "2024-2025 Activities & Timeline",
    activities: [
      {
        name: "Paradis Run",
        description: "Community running event promoting health and school spirit"
      },
      {
        name: "Annual Movie Night",
        description: "School-wide event bringing together students and families"
      },
      {
        name: "Iași Meet",
        description: "Regional robotics meetup with other FTC teams in Iași"
      },
      {
        name: "Initiative to Give Sweets and Books",
        description: "Community outreach program sharing joy and education with local children"
      },
      {
        name: "FTC Regionals 2025",
        description: "Competitive robotics tournament representing our school and region"
      }
    ],
    supportTitle: "Support Us",
    whySponsorTitle: "Why Sponsor Us?",
    whySponsorPoints: [
      "Support STEM education and inspire young innovators in Romania",
      "Gain visibility at regional and international robotics competitions",
      "Associate your brand with innovation, technology, and education",
      "Invest in the future workforce and next generation of engineers",
      "Demonstrate corporate social responsibility and community engagement",
      "Access to talented students for internships and recruitment opportunities"
    ],
    sponsorBenefitsTitle: "Sponsor Benefits",
    sponsorBenefits: [
      "Logo placement on team robot, banners, and competition materials",
      "Recognition on our website and social media platforms",
      "Mentions in press releases and media coverage",
      "Invitation to team demonstrations and competition events",
      "Opportunity to engage with students and showcase your organization",
      "Tax-deductible contribution supporting education"
    ],
    contactTitle: "Contact Us",
    contactDetails: {
      email: "mechabyte22590@gmail.com",
      phone: "+40 743 173 583",
      address: "Str. Dealul Zorilor 8C, Mechabyte – Paradise International College, Iași",
      instagram: "https://www.instagram.com/mechabyte22590/",
      tiktok: "https://www.tiktok.com/@mechabyte22590"
    },
    contactLabels: {
      email: "Email",
      phone: "Phone",
      address: "Address",
      instagram: "Instagram",
      tiktok: "TikTok"
    },
    languageToggle: {
      en: "EN",
      ro: "RO"
    }
  },
  ro: {
    aboutTitle: "Despre Noi",
    aboutText: "Mechabyte este o echipă pasionată de robotică de la Paradise International College din Iași, România, care participă la FIRST Tech Challenge (FTC). Suntem un grup divers de studenți dedicați inovației, muncii în echipă și implicării comunitare.",
    missionTitle: "Misiunea Noastră",
    missionItems: [
      "Promovarea educației STEM și a roboticii în comunitatea noastră",
      "Dezvoltarea abilităților tehnice în programare, inginerie și design",
      "Încurajarea muncii în echipă, leadershipului și abilităților de rezolvare a problemelor",
      "Inspirarea următorei generații de inovatori și ingineri",
      "Reprezentarea României pe scena internațională FTC"
    ],
    ftcTitle: "Despre FIRST Tech Challenge",
    ftcDescription: "FIRST Tech Challenge (FTC) este o competiție globală de robotică pentru studenți cu vârste între 12-18 ani. Echipele proiectează, construiesc, programează și concurează cu roboți pentru a completa provocări. FTC promovează educația STEM, munca în echipă și profesionalismul grațios, pregătind studenții pentru cariere viitoare în tehnologie și inginerie.",
    activitiesTitle: "Activități 2024-2025",
    activities: [
      {
        name: "Paradis Run",
        description: "Eveniment comunitar de alergare care promovează sănătatea și spiritul școlar"
      },
      {
        name: "Seara Anuală de Film",
        description: "Eveniment la nivel de școală care reunește studenți și familii"
      },
      {
        name: "Iași Meet",
        description: "Întâlnire regională de robotică cu alte echipe FTC din Iași"
      },
      {
        name: "Inițiativă de Oferire de Dulciuri și Cărți",
        description: "Program de implicare comunitară care împărtășește bucurie și educație copiilor locali"
      },
      {
        name: "FTC Regionals 2025",
        description: "Turneu de robotică competitiv reprezentând școala și regiunea noastră"
      }
    ],
    supportTitle: "Susține-ne",
    whySponsorTitle: "De ce să ne sponsorizați?",
    whySponsorPoints: [
      "Susțineți educația STEM și inspirați tineri inovatori din România",
      "Obțineți vizibilitate la competiții regionale și internaționale de robotică",
      "Asociați brandul dumneavoastră cu inovația, tehnologia și educația",
      "Investiți în forța de muncă viitoare și următoarea generație de ingineri",
      "Demonstrați responsabilitate socială corporativă și implicare comunitară",
      "Acces la studenți talentați pentru stagii și oportunități de recrutare"
    ],
    sponsorBenefitsTitle: "Beneficiile Sponsorilor",
    sponsorBenefits: [
      "Plasarea logo-ului pe robotul echipei, bannere și materiale de competiție",
      "Recunoaștere pe site-ul nostru web și platformele de social media",
      "Mențiuni în comunicatele de presă și acoperirea media",
      "Invitație la demonstrații ale echipei și evenimente de competiție",
      "Oportunitatea de a interacționa cu studenții și de a prezenta organizația dumneavoastră",
      "Contribuție deductibilă fiscal care susține educația"
    ],
    contactTitle: "Contactați-ne",
    contactDetails: {
      email: "mechabyte22590@gmail.com",
      phone: "0743 173 583",
      address: "Str. Dealul Zorilor 8C, Mechabyte – Paradise International College, Iași",
      instagram: "https://www.instagram.com/mechabyte22590/",
      tiktok: "https://www.tiktok.com/@mechabyte22590"
    },
    contactLabels: {
      email: "Email",
      phone: "Telefon",
      address: "Adresă",
      instagram: "Instagram",
      tiktok: "TikTok"
    },
    languageToggle: {
      en: "EN",
      ro: "RO"
    }
  }
};

const displayMembers = computed(() => {
  let result: Member[] = members.value.concat(members.value);
  return result;
});

let leftShift = ref<number>(1780);
let direction = ref<number>(1);
let factor = ref<number>(0.2);

setInterval(() => {
  if (direction.value == 1) {
    leftShift.value -= factor.value;
    if(leftShift.value <= -640) {
      leftShift.value = 1780;
    }
  }
  else {
    leftShift.value += factor.value;
    console.log(leftShift.value);
    if(leftShift.value >= 1780) {
      leftShift.value = -640;
    }
  }
}, 1);

let lastScroll = Date.now() - 250;

function scroll(change: number) {
  if(Math.abs(Date.now() - lastScroll) > 250) {
    lastScroll = Date.now();
    direction.value = change;
    factor.value = 6;
    setTimeout(() => factor.value = 0.2, 200);
  }
}

onMounted(() => {
  let i = 0;
  setInterval(() => {
    if (i < 4) {
      displayNav.value[i] = 1;
      i++;
    }
  }, 200);
});

const computedLeft = computed(() => ({
  'left': `${leftShift.value}px`
}));
</script>

<template>
  <main id="app-container" class="app-container">
    <img id="banner" class="banner" alt="Mechabyte banner" src="../public/banner.png" />
    <video v-if="isVideoAvailable" autoplay loop>
      <source />
      Video not supported.
    </video>
    <img class="snapshot" v-else src="./assets/images/RobotsSnapshot.jpg" />
    <section id="about-us" class="about-us">
      <h1>{{ translations[language].aboutTitle }}</h1>
      <p class="about-text">{{ translations[language].aboutText }}</p>
      
      <h2>{{ translations[language].missionTitle }}</h2>
      <ul class="mission-list">
        <li v-for="(item, index) in translations[language].missionItems" :key="index">{{ item }}</li>
      </ul>
      
      <h2>{{ translations[language].ftcTitle }}</h2>
      <p class="ftc-description">{{ translations[language].ftcDescription }}</p>
      
      <h2>{{ translations[language].activitiesTitle }}</h2>
      <ul class="activities-list">
        <li v-for="(activity, index) in translations[language].activities" :key="index">
          <strong>{{ activity.name }}:</strong> {{ activity.description }}
        </li>
      </ul>
      
      <div class="member-cards-section">
        <img class="arrow arrow-left" src="./assets/images/LeftArrow.png" @click="scroll(-1)" />
        <div class="container-container">
          <div class="member-cards" :style="{ ...computedLeft }">
            <TeamMemberCard class="team-member-card" v-for="(member, index) in displayMembers" :key="index" :member-name="member.name" :department="member.department" />
          </div>
        </div>
        <img class="arrow arrow-right" src="./assets/images/RightArrow.png" @click="scroll(1)" />
      </div>
    </section>
    <section id="support-us" class="support-us">
      <h1>{{ translations[language].supportTitle }}</h1>
      
      <h2>{{ translations[language].whySponsorTitle }}</h2>
      <ul class="sponsor-points">
        <li v-for="(point, index) in translations[language].whySponsorPoints" :key="index">{{ point }}</li>
      </ul>
      
      <h2>{{ translations[language].sponsorBenefitsTitle }}</h2>
      <ul class="sponsor-benefits">
        <li v-for="(benefit, index) in translations[language].sponsorBenefits" :key="index">{{ benefit }}</li>
      </ul>
    </section>
    <section id="contact" class="contact">
      <h1>{{ translations[language].contactTitle }}</h1>
      <div class="contact-details">
        <p>
          <strong>{{ translations[language].contactLabels.email }}:</strong> 
          <a :href="`mailto:${translations[language].contactDetails.email}`">{{ translations[language].contactDetails.email }}</a>
        </p>
        <p>
          <strong>{{ translations[language].contactLabels.phone }}:</strong> 
          {{ translations[language].contactDetails.phone }}
        </p>
        <p>
          <strong>{{ translations[language].contactLabels.address }}:</strong> 
          {{ translations[language].contactDetails.address }}
        </p>
        <p>
          <strong>{{ translations[language].contactLabels.instagram }}:</strong> 
          <a :href="translations[language].contactDetails.instagram" target="_blank" rel="noopener noreferrer">@mechabyte22590</a>
        </p>
        <p>
          <strong>{{ translations[language].contactLabels.tiktok }}:</strong> 
          <a :href="translations[language].contactDetails.tiktok" target="_blank" rel="noopener noreferrer">@mechabyte22590</a>
        </p>
      </div>
    </section>
    <nav id="buttons-container" class="buttons-container">
      <NavButton button-name="Video" heading-id="banner" :style="{'scale': displayNav[0]}" />
      <NavButton button-name="User" heading-id="about-us" :style="{'scale': displayNav[1]}" />
      <NavButton button-name="Heart" heading-id="support-us" :style="{'scale': displayNav[2]}" />
      <NavButton button-name="Phone" heading-id="contact" :style="{'scale': displayNav[3]}" />
      <div class="language-toggle">
        <button 
          @click="language = 'en'" 
          :class="{ active: language === 'en' }"
          class="lang-btn"
        >
          EN
        </button>
        <button 
          @click="language = 'ro'" 
          :class="{ active: language === 'ro' }"
          class="lang-btn"
        >
          RO
        </button>
      </div>
    </nav>
  </main>
</template>

<style scoped>
.app-container {
  padding-bottom: 2px;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  gap: 0.5vw;
  position: relative;
}

.banner {
  width: 15vw;
  height: 10vw;
}

video, .snapshot {
  height: 37.5vw;
}

section {
  display: flex;
  width: clamp(68.75vw, 1200px, 90vw);
  padding: 0.5vw;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vw;
}

h1 {
  position: sticky;
  top: -1px;
  background: var(--background-grey);
  width: 100%;
  z-index: 1100;
}

h2 {
  color: var(--mechabyte-green);
  margin-top: 1.5vw;
  margin-bottom: 0.5vw;
}

.about-text,
.ftc-description {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.mission-list,
.activities-list,
.sponsor-points,
.sponsor-benefits {
  margin-left: 2vw;
  line-height: 1.8;
  list-style-type: disc;
}

.mission-list li,
.activities-list li,
.sponsor-points li,
.sponsor-benefits li {
  margin-bottom: 0.5vw;
}

.contact-details {
  line-height: 2;
}

.contact-details a {
  color: var(--mechabyte-green);
  text-decoration: none;
}

.contact-details a:hover {
  text-decoration: underline;
}

.member-cards-section {
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  padding: 0.5vw;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.arrow {
  width: 3.6vw;
  height: 6.4vw;
  z-index: 1050;
  cursor: pointer;
  position: relative;
}

.container-container {
  width: 1000px;
  overflow-x: hidden;
}

.member-cards {
  z-index: 1040;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  left: 0;
  right: 0;
  transition: left 0ms;
  transition: right 0ms;
}

.about-us,
.contact {
  border: 0.1vw solid var(--mechabyte-green);

  h1 {
    color: var(--mechabyte-green);
  }

  h2 {
    color: var(--mechabyte-green);
  }
}

.support-us {
  border: 0.1vw solid white;

  h1 {
    color: white;
  }

  h2 {
    color: white;
  }
}

.buttons-container {
  z-index: 1200;
  position: fixed;
  left: 1vw;
  bottom: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1vw;
}

.language-toggle {
  display: flex;
  gap: 0.5vw;
  margin-top: 0.5vw;
}

.lang-btn {
  background: var(--background-grey);
  border: 0.15vw solid var(--mechabyte-green);
  color: var(--mechabyte-green);
  padding: 0.5vw 1vw;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.3vw;
  transition: all 0.3s ease;
}

.lang-btn:hover {
  background: var(--mechabyte-green);
  color: var(--background-grey);
}

.lang-btn.active {
  background: var(--mechabyte-green);
  color: var(--background-grey);
}

@media only screen and (max-width: 1000px) {
  .buttons-container {
    background: var(--background-grey);
    padding: 5px;
    flex-direction: row;
    width: 100vw;
    left: 0;
    bottom: 0;
    gap: 5vw;
    align-items: center;
    justify-content: center;
  }
  
  .nav-button {
    width: 70px;
    height: 70px;
  }

  .app-container {
    padding-bottom: 80px;
  }

  .language-toggle {
    margin-top: 0;
  }

  .lang-btn {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
}
</style>
