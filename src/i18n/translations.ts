// Translation structure type
export type Translation = {
  // Navigation
  nav: {
    home: string;
    values: string;
    achievements: string;
    team: string;
    portfolio: string;
    outreach: string;
    sponsors: string;
    support: string;
    contact: string;
  };

  // Home page
  homeTitle: string;
  homeWelcome: string;
  aboutTitle: string;
  aboutText: string;
  missionTitle: string;
  missionItems: string[];
  ftcTitle: string;
  ftcDescription: string;
  activitiesTitle: string;
  activities: Array<{ name: string; description: string }>;
  ctaLearnMore: string;
  ctaOurMission: string;

  contactCta: string;
  // Values page
  valuesTitle: string;
  valuesIntro: string;
  valuesList: Array<{ title: string; description: string }>;
  ambassadorRoleTitle: string;
  ambassadorStatement: string;
  valuesClosing: string;

  // Achievements page
  achievementsTitle: string;
  achievementsIntro: string;
  achievementsList: Array<{ year: string; title: string; description: string }>;

  // Team page
  teamTitle: string;
  teamIntro: string;
  technicalTeamTitle: string;
  nonTechnicalTeamTitle: string;
  mentorsTitle: string;
  alumniTitle: string;
  collaborationTitle: string;
  teamCollaboration: string;
  trainingTitle: string;
  teamTraining: string;
  teamEnvironmentTitle: string;
  teamEnvironment: string;
  
  // Team descriptions by season
  technicalTeamDesc2025: string;
  nonTechnicalTeamDesc2025: string;
  mentorsDesc2025: string;
  technicalTeamDesc2024: string;
  nonTechnicalTeamDesc2024: string;
  mentorsDesc2024: string;
  technicalTeamDesc2023: string;
  nonTechnicalTeamDesc2023: string;
  mentorsDesc2023: string;

  // Sponsors page
  sponsorsTitle: string;
  sponsorsIntro: string;
  currentSponsorsTitle: string;
  sponsorshipImpactTitle: string;
  sponsorshipImpact: string[];
  whySponsorTitle: string;
  whySponsorPoints: string[];
  becomeSponsorTitle: string;
  becomeSponsorText: string;

  // Support page
  supportTitle: string;
  supportIntro: string;
  sponsorBenefitsTitle: string;
  sponsorBenefits: string[];
  volunteerTitle: string;
  volunteerText: string;
  donateTitle: string;
  donateText: string;
  mentorshipTitle: string;
  mentorshipText: string;
  taxDeductibleTitle: string;
  taxDeductibleText: string;

  // Contact page
  contactTitle: string;
  contactIntro: string;
  contactDetails: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    facebook: string;
    linkedin: string;
  };
  contactLabels: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    facebook: string;
    linkedin: string;
  };
  followUsTitle: string;
  scheduleDemoTitle: string;
  scheduleDemo: string;
  stayConnectedTitle: string;
  connectWithUs: string;

  // Feature Cards
  featuresHeading: string;
  featureInnovationTitle: string;
  featureInnovationDesc: string;
  featureEngineeringTitle: string;
  featureEngineeringDesc: string;
  featureTeamworkTitle: string;
  featureTeamworkDesc: string;
  featureCompetitionTitle: string;
  featureCompetitionDesc: string;

  // Portfolio page
  portfolioTitle: string;
  portfolioSubtitle: string;
  portfolioMission: string;
  ourTeamTitle: string;
  intoTheDeepSeason: string;
  centerstageSeason: string;
  previousSeasonTitle: string;
  gameStrategyTitle: string;
  autonomousTitle: string;
  teleOpTitle: string;
  endgameTitle: string;
  robotEvolutionTitle: string;
  driveTrainTitle: string;
  intakeTitle: string;
  armTitle: string;
  launcherTitle: string;
  programmingTitle: string;
  driverControlsTitle: string;
  outreachEventsTitle: string;
  socialMediaTitle: string;
  inPersonEventsTitle: string;
  sustainabilityTitle: string;
  fundraisingTitle: string;
  sponsorsListTitle: string;
  sustainabilityPlanTitle: string;
  
  // Portfolio content
  portfolioIntoTheDeepMentors: string;
  portfolioIntoTheDeepNonTechnical: string;
  portfolioIntoTheDeepTechnical: string;
  portfolioCenterstageMentor: string;
  portfolioCenterstageNonTechnical: string;
  portfolioCenterstageTechnical: string;
  
  // Game strategy content
  centerstageGoal: string;
  centerstageAutonomousDetails: string;
  centerstageTeleOpDetails: string;
  centerstageEndgameDetails: string;
  centerstageStrategySummary: Array<{ period: string; mandatory: string[]; optional: string[]; scoring: string }>;
  centerstageAutonomous: string;
  centerstageTeleOp: string;
  centerstageEndgame: string;
  intoTheDeepGoal: string;
  intoTheDeepAutonomousDetails: string;
  intoTheDeepTeleOpDetails: string;
  intoTheDeepEndgameDetails: string;
  intoTheDeepStrategySummary: Array<{ period: string; mandatory: string[]; optional: string[]; scoring: string }>;
  intoTheDeepTeleOp: string;
  intoTheDeepEndgame: string;
  
  // Robot evolution content
  centerstageDriveTrainEvolution: string;
  centerstageIntakeEvolution: string;
  centerstageArmEvolution: string;
  centerstageLauncherEvolution: string;
  intoTheDeepFirstVersion: string;
  intoTheDeepUpgradeAttempts: string;
  intoTheDeepCurrentVersion: string;
  intoTheDeepConstructionImprovements: string;
  
  // Programming content
  programmingDescription: string;
  driverLayoutDescription: string;
  
  // Outreach content
  socialMediaDescription: string;
  outreachEvents: Array<{ name: string; description: string }>;
  fundraisingDescription: string;
  sustainabilityDescription: string;
  
  // Additional labels
  firstVersionLabel: string;
  upgradeAttemptsLabel: string;
  currentVersionLabel: string;
  constructionImprovementsLabel: string;
  autonomousApproachLabel: string;
  ourGoalsLabel: string;
  ourGoalsText: string;
  sustainabilityGrowthLabel: string;
  sustainabilityGrowthText: string;
  contactUsLabel: string;
  
  // New sections for detailed portfolio
  ftcOverviewTitle: string;
  ftcOverviewContent: string;
  howGamesWorkTitle: string;
  centerstageGameDetails: string;
  intoTheDeepGameDetails: string;
  programmingChallengesTitle: string;
  programmingChallenges: string;
  lessonsLearnedTitle: string;
  lessonsLearned: string;
  futureOutlookTitle: string;
  futureOutlook: string;
  
  // Outreach page
  outreachTitle: string;
  outreachSubtitle: string;
  outreachMission: string;
  outreachOriginTitle: string;
  outreachOriginStory: string;
  outreachSocialMediaTitle: string;
  outreachSocialMediaDesc: string;
  outreachTeamFriendshipsTitle: string;
  outreachTeamFriendshipsDesc: string;
  outreachEventDetailTitle: string;
  centerstageEvents: Array<{ 
    name: string; 
    shortDescription: string; 
    fullDescription: string;
    impact: string;
    date?: string;
    moreInfo?: string;
    partnerships?: string;
    mediaType?: 'image' | 'video' | 'social-embed' | 'gallery';
    mediaUrl?: string;
    mediaUrls?: string[];
    socialEmbedCode?: string;
  }>;
  intoTheDeepEvents: Array<{ 
    name: string; 
    shortDescription: string; 
    fullDescription: string;
    impact: string;
    date?: string;
    moreInfo?: string;
    partnerships?: string;
    mediaType?: 'image' | 'video' | 'social-embed' | 'gallery';
    mediaUrl?: string;
    mediaUrls?: string[];
    socialEmbedCode?: string;
  }>;
};

// Translations object with English and Romanian content
export const translations: { en: Translation; ro: Translation } = {
  en: {
    nav: {
      home: 'Home',
      values: 'Values',
      achievements: 'Achievements',
      team: 'Team',
      portfolio: 'Portfolio',
      outreach: 'Outreach',
      sponsors: 'Sponsors',
      support: 'Support',
      contact: 'Contact'
    },

    homeTitle: 'Welcome to Mechabyte',
    homeWelcome: 'We design, build and race robots that teach teamwork, engineering and creativity.',
    aboutTitle: 'About Us',
    aboutText: 'We combine hands-on learning with competition-grade engineering to help students build real robots, real skills and lasting careers. Join our workshops, sponsor our growth, or meet the team building tomorrow\'s robotics leaders.',
    missionTitle: 'Our Mission',
    missionItems: [
      'Teach applied STEM through hands‑on builds.',
      'Create career pathways for makers.',
      'Prototype fast and learn faster.',
      'Grow a diverse technical community.'
    ],
    ftcTitle: 'About FIRST Tech Challenge',
    ftcDescription: 'FIRST Tech Challenge (FTC) is a global robotics competition for students aged 12-18. Teams design, build, program, and compete with robots to complete challenges on a 12x12 foot field. FTC promotes STEM education, teamwork, and gracious professionalism while preparing students for future careers in technology and engineering. Each season presents a new game challenge that tests both technical skills and strategic thinking, requiring teams to work together to solve complex problems.',
    activitiesTitle: '2024-2025 Activities & Timeline',
    activities: [
      {
        name: 'Paradis Run',
        description: 'Community running event promoting health and school spirit, bringing together students, families, and community members for a day of fitness and fun'
      },
      {
        name: 'Annual Movie Night',
        description: 'School-wide event bringing together students and families for entertainment and community building, featuring robotics-themed films and demonstrations'
      },
      {
        name: 'Iași Meet',
        description: 'Regional robotics meetup with other FTC teams in Iași, sharing knowledge, strategies, and building relationships with fellow roboticists'
      },
      {
        name: 'Initiative to Give Sweets and Books',
        description: 'Community outreach program sharing joy and education with local children, promoting literacy and STEM awareness in our community'
      },
      {
        name: 'FTC Regionals 2025',
        description: 'Competitive robotics tournament representing our school and region, showcasing our technical achievements and gracious professionalism on the field'
      }
    ],
    contactCta: 'Get in Touch',

    ctaLearnMore: 'Learn More',
    ctaOurMission: 'Our Mission',

    valuesTitle: 'Our Core Values',
    valuesIntro: 'We build with curiosity, respect and grit.',
    valuesList: [
      {
        title: '💡 Innovation',
        description: 'Question everything. Build better.'
      },
      {
        title: '🤝 Teamwork',
        description: 'Together we achieve the impossible.'
      },
      {
        title: '⚖️ Integrity',
        description: 'Do right, even when no one is watching.'
      },
      {
        title: '⭐ Excellence',
        description: 'Good enough never is.'
      }
    ],
    ambassadorRoleTitle: 'Team Ambassador Role',
    ambassadorStatement: 'We represent our team, Paradise College, and Nație prin Educație. We embody STEM education and gracious professionalism in every interaction.',
    valuesClosing: 'These values guide our daily work, from designing and building our robot to engaging with sponsors and conducting outreach programs. They remind us that success in FTC is measured not just by competition results, but by the positive impact we make on each other and our community.',

    achievementsTitle: 'Our Journey',
    achievementsIntro: 'Key milestones — quick, visual and shareable.',
    achievementsList: [
      {
        year: '2024',
        title: 'Team Formation',
        description: 'Founded Mechabyte 22590 at Paradise International College.'
      },
      {
        year: '2024',
        title: 'First Robot Build',
        description: 'Built first competitive FTC robot for INTO THE DEEP season.'
      },
      {
        year: '2024',
        title: 'Community Outreach Begins',
        description: 'Launched STEM workshops at local schools.'
      },
      {
        year: '2024',
        title: 'Paradis Run Participation',
        description: 'Organized school-wide Paradis Run community event.'
      },
      {
        year: '2024',
        title: 'Annual Movie Night',
        description: 'Hosted successful movie night for students and families.'
      },
      {
        year: '2025',
        title: 'Iași Regional Meet',
        description: 'Networked with FTC teams at regional Iași meetup.'
      },
      {
        year: '2025',
        title: 'Books and Sweets Initiative',
        description: 'Distributed books and sweets to local children.'
      },
      {
        year: '2025',
        title: 'FTC Regional Competition',
        description: 'Competed in FTC Regionals 2025, showcased technical excellence.'
      },
      {
        year: 'Ongoing',
        title: 'STEM Workshops',
        description: 'Host regular robotics workshops for middle-school students.'
      },
      {
        year: 'Ongoing',
        title: 'Technical Development',
        description: 'Continuously improve robot design through testing and iteration.'
      }
    ],

    teamTitle: 'Meet Our Team',
    teamIntro: 'New season, fresh leaders, continuing legacy.',
    technicalTeamTitle: 'Technical Team',
    nonTechnicalTeamTitle: 'Non-Technical Team',
    mentorsTitle: 'Mentors',
    alumniTitle: 'Alumni',
    collaborationTitle: 'Collaboration Across Departments',
    teamCollaboration: 'Last season, our CAD designer sketched a grabber mechanism on a napkin during lunch.\n\nBy evening, the programming team had simulated it. Next day, marketing filmed the prototype test.\n\nThis is how we work—ideas flow freely, no silos.\n\nMarketing helps debug code when fresh eyes are needed. Engineers brainstorm social media campaigns.\n\nOur weekly sync-ups are chaotic, energetic, and productive. Everyone contributes beyond their role.',
    trainingTitle: 'Training New Members',
    teamTraining: 'Day 1: Welcome chaos. New juniors are handed tools, not manuals.\n\nWeek 1-4: Seniors guide hands-on builds. Juniors solder their first circuit, write their first autonomous code, design their first CAD part.\n\nMonth 2-3: Juniors lead small projects. They mess up, debug, iterate. Seniors supervise but don\'t rescue.\n\nMonth 4-6: Juniors become confident. They start teaching the next wave.\n\nBy season end, yesterday\'s juniors are today\'s seniors. Tomorrow, they\'re team leaders.',
    teamEnvironmentTitle: 'Team Environment',
    teamEnvironment: 'Picture this: It\'s 11PM. Robot deadline is tomorrow.\n\nHalf the team is debugging motor stalls. The other half is making memes about it.\n\nSomeone orders pizza. Someone else plays terrible music. Everyone laughs.\n\nWe fail together. We celebrate together. We build together.\n\nBeyond the circuits and competitions, we\'re building friendships that outlast high school.\n\nSome of our best memories aren\'t victories—they\'re the 3AM breakthroughs and inside jokes that only we understand.',
    
    technicalTeamDesc2025: 'Building and programming robots for the 2025-2026 season. Focus on innovative designs and reliable autonomous systems.',
    nonTechnicalTeamDesc2025: 'Managing outreach, marketing, and team branding. Creating compelling content and building community partnerships.',
    mentorsDesc2025: 'Guiding the team with technical expertise and strategic direction. Supporting both competition and team development goals.',
    technicalTeamDesc2024: 'Designed and built the Into the Deep robot. Developed vertical slider intake system and optimized scoring mechanisms.',
    nonTechnicalTeamDesc2024: 'Managed social media campaigns, organized fundraising events, and coordinated outreach activities throughout the season.',
    mentorsDesc2024: 'Provided technical guidance and mentorship during Into the Deep season. Helped team navigate competition challenges.',
    technicalTeamDesc2023: 'Created the CenterStage robot with pantograph arm and drone launcher. Pioneered mecanum drive chassis design.',
    nonTechnicalTeamDesc2023: 'Led marketing initiatives, fundraising events, and community engagement during the team\'s founding season.',
    mentorsDesc2023: 'Founded and established the team. Provided initial training and guided first season competition participation.',

    sponsorsTitle: 'Our Sponsors',
    sponsorsIntro: 'Partner with Mechabyte — strengthen local STEM, gain tax benefits and connect with bright talent.',
    currentSponsorsTitle: 'Current Sponsors',
    sponsorshipImpactTitle: 'How Sponsorships Help',
    sponsorshipImpact: [
      '⚙️ Build competitive robots with quality equipment and materials',
      '🏆 Compete globally through covered fees and travel support',
      '🔧 Develop professionally with proper tools and workspace',
      '👥 Inspire 100+ students annually through outreach programs',
      '📚 Provide world-class skill development and training resources',
      '🚀 Sustain team growth with operational funding'
    ],
    whySponsorTitle: 'Why Sponsor Mechabyte?',
    whySponsorPoints: [
      'Tax-deductible investment in education and community development',
      'Logo visibility at international competitions and community events',
      'Supporting local STEM initiatives and youth development',
      'Direct pipeline to talented engineers building tomorrow\'s tech workforce'
    ],
    becomeSponsorTitle: 'Become a Sponsor',
    becomeSponsorText: 'Invest in Romanian robotics and shape tomorrow\'s tech workforce!',

    supportTitle: 'Support Our Mission',
    supportIntro: 'There are many ways to support Mechabyte and contribute to STEM education in our community. Whether through financial sponsorship, volunteer time, equipment donations, or mentorship, your support makes a real difference.',
    sponsorBenefitsTitle: 'Sponsorship Benefits',
    sponsorBenefits: [
      'Logo featured on robot, website, and socials',
      'Recognition at FTC events',
      'Access to team updates',
      'Connect with STEM talent',
      'CSR impact metrics'
    ],
    volunteerTitle: 'Volunteer Opportunities',
    volunteerText: 'We welcome volunteers who want to share their expertise with our team. Whether you have experience in engineering, programming, marketing, or business, your guidance can help our members develop valuable skills. Volunteers can participate in workshops, provide technical mentorship, or assist with event planning and execution.',
    donateTitle: 'Equipment & Material Donations',
    donateText: 'Hardware donations are incredibly valuable to our team. We can always use components such as motors, sensors, aluminum extrusions, fasteners, electronics, and tools. Even outdated equipment can be useful for prototyping and learning. If you or your organization has surplus materials that could benefit a robotics team, please reach out to us.',
    mentorshipTitle: 'Mentorship Programs',
    mentorshipText: 'Professional mentors provide invaluable guidance to help our team grow. Mentors can work with specific sub-teams (programming, CAD, marketing) or provide overall guidance on project management, team dynamics, and strategy. Mentorship can be as involved or flexible as your schedule allows, from weekly meetings to occasional check-ins and competition attendance.',
    taxDeductibleTitle: 'Tax Benefits',
    taxDeductibleText: 'Contributions to Mechabyte may be tax-deductible as supporting educational initiatives. We provide all necessary documentation for your records. Contact us to learn more about how your contribution can benefit both our team and your organization.',

    contactTitle: 'Get In Touch',
    contactIntro: 'We would love to hear from you! Whether you are interested in sponsoring our team, volunteering, scheduling a robot demonstration, or simply learning more about what we do, please reach out through any of the channels below.',
    contactDetails: {
      email: 'mechabyte22590@gmail.com',
      phone: '+40773854312 (Andreea Ionita)',
      address: 'Str. Dealul Zorilor 8C, Mechabyte – Paradise International College, Iași',
      instagram: 'https://www.instagram.com/mechabyte22590/',
      tiktok: 'https://www.tiktok.com/@mechabyte22590',
      youtube: 'https://www.youtube.com/@mechabyte22590',
      facebook: 'https://www.facebook.com/mechabyte22590',
      linkedin: 'https://www.linkedin.com/company/mechabyte22590'
    },
    contactLabels: {
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      youtube: 'YouTube',
      facebook: 'Facebook',
      linkedin: 'LinkedIn'
    },
    followUsTitle: 'Follow Us',
    scheduleDemoTitle: 'Schedule a Demo',
    scheduleDemo: 'See our robot in action! Book a demo for your school or event. We bring robotics to life.',
    stayConnectedTitle: 'Stay Connected',
    connectWithUs: 'Follow our journey: competitions, builds, behind-the-scenes. Join the community!',

    // Feature Cards
    featuresHeading: 'What We Do',
    featureInnovationTitle: 'Innovation',
    featureInnovationDesc: 'Modern tech meets creative problem-solving.',
    featureEngineeringTitle: 'Engineering Excellence',
    featureEngineeringDesc: 'Precision design in every component.',
    featureTeamworkTitle: 'Teamwork',
    featureTeamworkDesc: 'Diverse skills, common goals.',
    featureCompetitionTitle: 'Competition Ready',
    featureCompetitionDesc: 'Preparing for FTC competitions with rigorous testing, iteration, and strategic planning.',

    // Portfolio page
    portfolioTitle: 'Mechabyte #22590',
    portfolioSubtitle: 'Engineering Portfolio – Centerstage & Into the Deep',
    portfolioMission: 'Mechabyte was founded on September 25, 2023, during Science Week at Paradise International College. Our team was created to learn and discover new skills while having fun. We aim to implement STEM core values—responsibility, compassion, and perseverance—constantly improve our capabilities, and inspire future generations to follow their dreams in science, technology, engineering, and mathematics.',
    ourTeamTitle: 'Our Team',
    intoTheDeepSeason: 'Into the Deep Season (2024-2025)',
    centerstageSeason: 'Centerstage Season (2023-2024)',
    previousSeasonTitle: 'Previous Season',
    gameStrategyTitle: 'Game Strategy',
    autonomousTitle: 'Autonomous',
    teleOpTitle: 'Tele-Op',
    endgameTitle: 'Endgame',
    robotEvolutionTitle: 'Robot Evolution',
    driveTrainTitle: 'Drive Train',
    intakeTitle: 'Intake',
    armTitle: 'Arm',
    launcherTitle: 'Drone Launcher',
    programmingTitle: 'Programming & Autonomous',
    driverControlsTitle: 'Driver Controls',
    outreachEventsTitle: 'Outreach & Events',
    socialMediaTitle: 'Social Media Strategy',
    inPersonEventsTitle: 'In-Person Events',
    sustainabilityTitle: 'Sustainability & Funding',
    fundraisingTitle: 'Fundraising Activities',
    sponsorsListTitle: 'Our Sponsors',
    sustainabilityPlanTitle: 'Sustainability Plan',

    // Portfolio team content
    portfolioIntoTheDeepMentors: 'Mentors: Andreea Ionita, Bogdan Andone',
    portfolioIntoTheDeepNonTechnical: 'Non-Technical: Alexandra Maftei, Veronika Glazkova, Cristiana Balan, Alexandra Sîmbotin Gășpărel',
    portfolioIntoTheDeepTechnical: 'Technical: Alexia Vancea, Ianis Cotoc, Teodor Matricală, Catrinel Bănuță, Rareș Berheci',
    portfolioCenterstageMentor: 'Mentor: Andreea Ionita',
    portfolioCenterstageNonTechnical: 'Non-Technical: Aayush Khadka, Alexia Vancea, Alexandra Maftei',
    portfolioCenterstageTechnical: 'Technical: Maia Sava (Building & Programming), Șerban Untu (Building & Programming), Rareș Cozma (Building), Cristian Ghidireac (Building & Design), David Grigore (Design & Building), Ștefan Albu (Design)',

    // Game strategy content
    centerstageGoal: 'Since this is the first season in which we participate, our goal for the robot was to score as many points as possible.',
    centerstageAutonomousDetails: 'We start off with a pre-loaded pixel in the intake claw. As we don\'t have any odometry, we programmed the robot on timing. Depending on the starting position, the robot will follow a preset trajectory in order to park in the backstage, and drop the pixel there. We have a total of 4 Autonomous programmes for each trajectory (2 which do the same thing).\n\nFirst starting position (backstage): When placing the robot in the field, it would face the backstage so that it should only go forward until it reached the desired location.\n\nSecond starting position (audience): When placed in the field, the robot would face towards the other alliance. The trajectory we established was going forward until tile C2 and then sideways until reaching the backstage.',
    centerstageTeleOpDetails: 'Depending on our alliance, the strategy slightly varies. In essence the drivers will navigate through the truss and/or stage door to get one pixel at a time from either stacks or the human station. After successfully loading the pixel, the drivers would carefully navigate towards the backstage and place the pixel in the backdrop. If the pixel happens to fall in the backstage, the drivers will leave it there and focus to bring another pixel. If possible, the drive team will try to create mosaics and pass one line from the backdrop for the bonus points.',
    centerstageEndgameDetails: 'During the first 15-20 seconds, the drivers will keep scoring pixels in the backdrop. In the final few seconds, the drone will be launched and the robot parked in the backstage.',
    centerstageStrategySummary: [
      { period: 'Autonomous', mandatory: ['park robot in backstage'], optional: ['drop pre-loaded pixel in backstage'], scoring: '5 - 8 pts' },
      { period: 'Teleop', mandatory: ['place as many pixels on backdrop'], optional: ['place pixel in backstage', 'form mosaics', 'pass lines on backdrop'], scoring: '9 - 15 pts' },
      { period: 'Endgame', mandatory: ['launch drone', 'park robot in backstage'], optional: [], scoring: '5 - 35 pts' }
    ],
    centerstageAutonomous: 'Robot starts with a pre-loaded pixel in the intake claw. No odometry is used; all movements are based on timing. We have two main starting positions: backstage-facing (drive straight to park and drop pixel) and audience-facing (drive forward to tile C2, then sideways to backstage).',
    centerstageTeleOp: 'Drivers navigate through the truss or stage door to collect pixels from stacks or the human station. We deliver one pixel at a time to the backdrop. If a pixel falls in backstage, we leave it and fetch another. Our goal is to form mosaics and cross lines on the backdrop for bonus points.',
    centerstageEndgame: 'We continue scoring pixels for 15-20 seconds, then launch the drone and park in backstage for additional points.',
    intoTheDeepGoal: 'Score as many points as possible by collecting samples and scoring in baskets/chambers, then climbing the submersible.',
    intoTheDeepAutonomousDetails: 'Robot starts from observation zone near the submersible. Using timing-based navigation, it moves to the submersible center (~1.5s), collects one sample, then delivers to the net zone (~2.0s total). The sample dropped in the net zone scores 2 points. Total autonomous time is approximately 3.5 seconds.',
    intoTheDeepTeleOpDetails: 'Drivers navigate to collect samples one at a time from the submersible or field floor. Samples are scored in the high basket (8 pts each) for maximum efficiency. The vertical slider extends to reach the basket while the intake system releases the sample. If a sample is dropped, we abandon it and collect a new one rather than waste time retrieving it.',
    intoTheDeepEndgameDetails: 'Continue scoring samples in the high basket until 15-20 seconds remain. In the final seconds, park the robot in the net zone (3 pts) or attempt a low-level ascent on the submersible ladder (15 pts) if time permits.',
    intoTheDeepStrategySummary: [
      { period: 'Autonomous', mandatory: ['park robot in netzone or level 1 ascend'], optional: ['place sample in net zone'], scoring: '3 pts' },
      { period: 'Teleop', mandatory: ['place as many samples in high basket'], optional: ['place samples in low basket'], scoring: '24 - 48 pts' },
      { period: 'Endgame', mandatory: ['park robot in netzone or level 1 ascend'], optional: ['level 2 ascend'], scoring: '3 - 15 pts' }
    ],
    intoTheDeepTeleOp: 'We navigate to pick up one sample at a time from the field or submersible. Samples are placed in the highest basket in the net zone. If a sample falls, we abandon it and fetch a new one to maximize scoring efficiency.',
    intoTheDeepEndgame: 'We continue scoring in the high basket until the final seconds, then park in the net zone for additional points.',

    // Robot evolution content
    centerstageDriveTrainEvolution: 'Started with an X-drive chassis with omni wheels at 45°—stable but too small for all components. Intermediate version used X-drive with flipped metal bars; the control hub was attached with one screw and a zip tie, making it fragile and prone to deformation. Final version features a more stable, spacious chassis with an Expansion Hub, mecanum wheels, and custom holders for hubs, power switch, and motors.',
    centerstageIntakeEvolution: 'First version was a dynamic intake with a spinning shaft and toilet-brush head pushing pixels up a ramp into two-pixel storage. Dropped due to lack of motors (all 4 used by drive train, no expansion hub). Second version used a single-pixel claw with position servo and toothed wheel—more precise but required accurate alignment. Third version featured a claw opening at an angle using two meshed toothed wheels, making pixel grabbing easier.',
    centerstageArmEvolution: 'Pantograph-inspired arm (like tram pantographs) keeps the intake angle constant while raising or lowering, eliminating constant readjustment needs. Initially powered by one, then two continuous-rotation servos (insufficient torque caused sagging). Later upgraded to a Tetrix 40:1 motor after obtaining the Expansion Hub.',
    centerstageLauncherEvolution: 'Thin plate with three channels for drone, elastic band, and sliding rod. The elastic is held under tension by the rod; releasing it launches the drone to scoring zones. Rod is attached to a position servo, armed during auto/tele-op, and released during endgame. Second version improved mounting with custom chassis holes.',
    intoTheDeepFirstVersion: 'Initial design had several problems: oversized claw that couldn\'t close fully (specimens often fell), heavy intake using butcher-shop material blades to pull samples into storage (too heavy, acted as obstacle when moving forward, blades often aligned and failed to grab), horizontal viper slide with off-center wobbly motor and few support points, vertical viper slide for baskets and submersible (off-center, difficult to attach suitable claw), and a storage box that didn\'t reach the basket with insufficient space.',
    intoTheDeepUpgradeAttempts: 'We redesigned the claw shape to better fit specimens, but sides didn\'t align well, making gripping difficult. At the first meet, the intake got stuck on the submersible zone edge. The system was too slow, heavy, and fragile. We chose not to use the claw due to these issues.',
    intoTheDeepCurrentVersion: 'Simplified design with a single vertical slider and attached arm. No transfer between containers—intake grabs sample and slider lifts directly to high basket. Benefits: easily reach high basket, lighter but more durable intake, straight alignment helps precise scoring. Remaining challenge: arm movement due to imperfect hex motor attachment to slider.',
    intoTheDeepConstructionImprovements: 'Stabilized intake with two extra structural parts. Replaced butcher-shop blades and added stoppers to prevent parallel turning. Created 3D-printed discs with hexagonal centers to lock blades on shaft, fixing rotation issues.',

    // Programming content
    programmingDescription: 'Both seasons used time-based autonomous because we had no cameras or sensors. Movements are sequences of forward/back/left/right moves with fixed durations. Sometimes we use reduced power at the end to ensure full parking in the zone or backstage.',
    driverLayoutDescription: 'Centerstage: Initially a single driver handled all tasks due to phone power-delivery issues with two gamepads (Motorola G4 Play). With a new phone (Nokia 5), we split tasks between driver 1 (movement + arm/launcher) and driver 2 (intake). Into the Deep: Driver 1 controls robot movement and slider extension; driver 2 controls intake, out-take, and arm.',

    // Outreach content
    socialMediaDescription: 'Our main platforms are Instagram and TikTok. We regularly share progress updates, behind-the-scenes content, and competition highlights. We actively engage with other teams through comments, congratulations, and event promotion. As a result, many teams already recognize Mechabyte at meets.',
    outreachEvents: [
      {
        name: 'Movie Night (Home Alone 1)',
        description: 'Fundraising event at Paradis International College featuring robot showcase and informal STEM discussions.'
      },
      {
        name: 'Sweets and Books Initiative',
        description: 'Donated sweets and books to children in need, combined with informal discussions about robotics and STEM values.'
      },
      {
        name: 'Paradis Run (November 2)',
        description: 'Charity event for Little People Association—team both ran and volunteered.'
      },
      {
        name: 'Nikola Tesla Science Festival',
        description: 'Collaboration with Cyliis and Peppers teams, exchanging advice about FTC.'
      },
      {
        name: 'Winter Dive Meet Iași',
        description: 'Cooperation with regional teams like Cyliis, Peppers, and Robozzi. Scored 3 out of 6 matches.'
      },
      {
        name: 'Pancakes and Desserts Sale',
        description: 'Centerstage season fundraiser that raised approximately 5,000 RON.'
      },
      {
        name: 'Christmas Market Decorations',
        description: 'Sold decorations at Christmas market, raising additional 2,000 RON.'
      },
      {
        name: 'Robotics & AI STEMPOSSUM',
        description: 'Collaboration with Cyliss and Technical University "Gheorghe Asachi".'
      },
      {
        name: 'UGAL Inventics Saloon',
        description: 'Participated with RoSophia team, showcasing our robot and innovations.'
      }
    ],
    fundraisingDescription: 'Our fundraising activities across both seasons included selling biscuits, Movie Night tickets, pancakes, decorations, and flowers. These events have been crucial in supporting our operational costs and competition participation.',
    sustainabilityDescription: 'Our sustainability plan focuses on: recruiting and training younger students to ensure continuity, maintaining alumni support network, partnering with corporations that share our values, and careful budgeting with categories for team expenditure (wheels, cables, electronics) and emergency funds. Main sponsors include Paradis International College, Professional Dentist, and others who believe in our mission.',
    
    // New detailed sections
    ftcOverviewTitle: 'What is the FIRST Tech Challenge?',
    ftcOverviewContent: 'The FIRST Tech Challenge (FTC) is an international robotics contest for high-school students. In each season, small alliances of two teams play short matches on a 12×12 ft field. Each team builds and programs a robot that fits inside an 18 inch cube and may expand during a match. A match begins with a 30 s autonomous period where robots follow pre-programmed instructions; it is followed by a 2 min driver-controlled period where drivers operate the robot with game controllers, and a final 30 s endgame with additional bonus tasks. Teams earn points by manipulating themed game elements and performing optional tasks, while abiding by safety and fairness rules.',
    howGamesWorkTitle: 'How the Games Work',
    centerstageGameDetails: 'In CenterStage (2023-24), the field featured a 12 ft square with foam tiles and 1 ft-high walls. Two trusses and a hinged stage door spanned mid-field; backdrops and backstage areas were at the back; wings were in the front corners. Robots collected hexagonal pixels and placed them on the backdrop, created mosaics, and launched paper drones over the truss into landing zones. Autonomous scoring included placing purple pixels on spike marks or backdrop, with parking backstage for bonus points.',
    intoTheDeepGameDetails: 'Into the Deep (2024-25) uses a similar 12 ft square field with a central submersible structure holding samples, with low and high rungs and chambers. High and low baskets sit in opposite corners, with net zones beneath them; observation zones occupy the other corners. Robots collect plastic samples and place them in net zones or baskets (2-8 pts), while human players can attach clips to samples to turn them into specimens for chamber scoring (6-10 pts). The endgame features submersible ascent challenges with low-level (15 pts) and high-level (30 pts) scoring.',
    programmingChallengesTitle: 'Programming Challenges',
    programmingChallenges: 'Limited resources created significant programming challenges. During CenterStage, the team initially used a Motorola G4 Play phone instead of a dedicated Driver Hub. When both controllers were connected, the phone could not supply enough power, so only one driver could reliably control the robot. The issue was solved by using a different phone (Nokia 5) with better power delivery and redistributing tasks between drivers. Without vision systems or distance sensors in either season, the team relied entirely on timing-based autonomous routines with fixed durations for movements, sometimes using reduced power at the end to ensure precise positioning.',
    lessonsLearnedTitle: 'Lessons Learned & Growth',
    lessonsLearned: 'Mechabyte\'s two-season journey showcases how a team can evolve through persistence and resourcefulness. In CenterStage, constraints on budget and hardware forced creative solutions like zip-tied hubs and a crab-like claw; iterative redesigns and a pantograph arm enabled reliable pixel placement and drone launching. By Into the Deep, the team applied those lessons to streamline mechanisms, focus on weight distribution and reliability, and adopt 3D-printed improvements. The programming evolved from basic teleop to multi-case autonomous routines, demonstrating continuous learning and adaptation.',
    futureOutlookTitle: 'Future Outlook',
    futureOutlook: 'Looking ahead, further integration of sensors for autonomous navigation could improve scoring consistency, while corporate sponsorships may fund advanced motors and vision systems. With a sustainability plan recruiting younger students and alumni support, Mechabyte is well-positioned to continue its growth and embrace future FTC challenges. The team\'s commitment to gracious professionalism and community engagement ensures a strong foundation for years to come.',
    
    // Outreach page
    outreachTitle: 'Outreach & Events',
    outreachSubtitle: 'Community Engagement & Partnerships',
    outreachMission: 'Beyond building robots, we believe in building connections. Our outreach efforts aim to inspire the next generation, give back to our community, and create lasting partnerships that help us grow.',
    outreachOriginTitle: 'Our Journey: Starting from Scratch',
    outreachOriginStory: 'Starting from Scratch: When Mechabyte was founded in September 2023, we had no sponsors, no funding, and just a dream to build robots. Our first challenge wasn\'t designing a mechanism—it was figuring out how to afford the parts. Instead of giving up, we rolled up our sleeves and got creative. We organized pancake sales at school, movie nights, and craft markets. Every 5,000 RON we raised from selling homemade pancakes brought us closer to competing. This grassroots approach taught us resourcefulness, teamwork, and the value of community support. It showed us that you don\'t need corporate backing to start—just passion, determination, and people who believe in your mission.',
    outreachSocialMediaTitle: 'Social Media & Digital Presence',
    outreachSocialMediaDesc: 'Our social media presence on Instagram, TikTok, and Facebook has become a vital part of our outreach strategy. We regularly share behind-the-scenes content, robot build updates, competition highlights, and STEM education resources. Our posts celebrate not just our own achievements but also those of other FTC teams across Romania. We actively engage with the robotics community through comments, shares, and collaborative content. Many teams now recognize Mechabyte at competitions thanks to our online presence. Social media has helped us build a supportive network where teams exchange ideas, troubleshoot problems together, and celebrate each other\'s successes—embodying the spirit of gracious professionalism.',
    outreachTeamFriendshipsTitle: 'Team Friendships & Collaborations',
    outreachTeamFriendshipsDesc: 'One of the most rewarding aspects of FTC has been the friendships we\'ve built with other teams. At the Nikola Tesla Festival and Winter Dive Meet, we connected with teams like Phoenix Robotics, ByteForce, and RoboMinds. These aren\'t just competitors—they\'re friends who share strategies, lend tools during competitions, and celebrate victories together. We\'ve exchanged design files, collaborated on outreach events, and even held joint practice sessions. At EUROINVENT 2025 in Iași, we presented our robot alongside teams from across Europe, learning from their innovative approaches. These partnerships remind us that FTC isn\'t about beating others—it\'s about building a community that elevates everyone. The relationships we\'ve formed extend beyond competitions and have created a support network that helps all of us grow.',
    outreachEventDetailTitle: 'Detailed Story',
    
    centerstageEvents: [
      {
        name: 'Movie Night',
        shortDescription: 'Fundraising event with robot showcase',
        fullDescription: 'Our annual movie night brought together students, families, and community members for an evening of entertainment and robotics. We set up our CenterStage robot for demonstrations between screenings, allowing attendees to see the robot in action and learn about the FIRST Tech Challenge. The event featured interactive Q&A sessions where team members explained our design process, programming challenges, and competition experiences.',
        impact: 'Raised funds for the team while introducing 50+ community members to FTC robotics. Many expressed interest in supporting our future endeavors. Several attendees became regular followers of our journey on social media.',
        date: 'Fall 2023',
        moreInfo: 'This was one of our first major fundraising events as a newly formed team. We had no sponsors yet, so every ticket sold and every donation received was crucial. Team members took turns presenting the robot, explaining mechanisms like the pantograph arm and pixel intake system. Parents and teachers who attended were amazed by the complexity of the robot and the level of student involvement. The event also helped us practice public speaking and outreach skills—essential for competitions.',
        partnerships: 'Organized in partnership with Paradise International College administration and parent volunteers who helped with logistics and promotion.'
      },
      {
        name: 'Pancakes Sale',
        shortDescription: 'Raised ~5,000 RON',
        fullDescription: 'Team members organized a pancake sale at school, preparing and serving homemade pancakes to students, teachers, and parents. This grassroots fundraising effort required coordination, marketing through social media, and hands-on involvement from all team members. We set up early in the morning, cooked throughout the day, and engaged with everyone who stopped by to learn about our team.',
        impact: 'Generated approximately 5,000 RON (~€1,000) to fund robot parts, competition fees, and team supplies. Built team unity through collaborative work. This single event covered nearly 40% of our initial season budget.',
        date: 'Winter 2023-2024',
        moreInfo: 'The Pancakes Sale was born out of necessity. We had just started building our CenterStage robot and realized we didn\'t have enough money for essential components like motors, sensors, and aluminum extrusions. Instead of waiting for sponsors that might never come, we decided to take action. Team members arrived at 6 AM to start cooking. We made hundreds of pancakes, promoted the event through Instagram stories and TikTok videos, and created a festive atmosphere with music and robot demonstrations. Non-technical team members handled marketing and sales, while technical members answered questions about robotics. It was exhausting but incredibly rewarding—we learned that we could make things happen through our own efforts. This experience instilled a sense of ownership and pride that money from sponsors could never replicate.',
        partnerships: 'Supported by Paradise International College kitchen facilities. Local businesses donated ingredients at discounted rates after hearing about our mission.'
      },
      {
        name: 'Paradis Run 2024',
        shortDescription: 'Charity run for cancer support',
        fullDescription: 'Mechabyte participated in the annual Paradis Run, a charity event organized by our school to raise funds for cancer research and support. Team members ran together wearing team shirts, promoting health, fitness, and school spirit while raising awareness about our robotics program. We also set up an information booth where spectators could learn about FTC and our team\'s journey.',
        impact: 'Strengthened school community bonds and increased visibility of the robotics team among students and faculty. Several new members joined after seeing us at the event. Contributed to raising over 15,000 RON for cancer support organizations through participant fees and donations.',
        date: 'Spring 2024',
        moreInfo: 'Paradis Run is more than just a fundraiser—it\'s a community tradition that brings together students, parents, teachers, and local residents for a meaningful cause. For Mechabyte, it was an opportunity to show that we care about more than just robots. Cancer has affected families in our school community, and participating in the run was our way of showing support. We ran as a team, wearing custom Mechabyte jerseys. Between the run and our information booth, we engaged with hundreds of people. Many were surprised to learn that our school had a robotics team, and several students signed up to join us for the next season. The event showed us that outreach isn\'t just about promoting robotics—it\'s about being an active, caring part of our community.',
        partnerships: 'Organized by Paradise International College in partnership with Asociația Oameni Mici (Little People Association) supporting pediatric cancer patients and their families.',
        mediaType: 'gallery',
        mediaUrls: ['/assets/outreach/paradis-run-1.jpg', '/assets/outreach/paradis-run-2.jpg', '/assets/outreach/paradis-run-3.jpg', '/assets/outreach/paradis-run-4.jpg']
      },
      {
        name: 'Nikola Tesla Festival',
        shortDescription: 'Collaborated with other teams',
        fullDescription: 'We traveled to the Nikola Tesla Festival, a regional science and innovation showcase celebrating scientific discovery and technological advancement. Working alongside other FTC teams from Romania including Phoenix Robotics #18493 and ByteForce #19911, we demonstrated our robot, shared engineering insights, and engaged with hundreds of students interested in STEM fields. The festival featured interactive exhibits, live demonstrations, and workshops.',
        impact: 'Connected with 3 other FTC teams to share knowledge and strategies. Inspired numerous students to explore robotics and engineering. Established ongoing collaboration relationships that continue today. Exchange of design files and programming approaches.',
        date: 'Spring 2024',
        moreInfo: 'The Nikola Tesla Festival was a turning point for our team in terms of community building. Before this event, we felt somewhat isolated as a new team. But at the festival, we met other FTC teams who welcomed us warmly, shared their experiences, and offered advice. Phoenix Robotics showed us their drivetrain design, which inspired improvements to our own chassis. ByteForce gave us tips on autonomous programming. We spent hours talking with teams, comparing notes, and realizing we were all facing similar challenges. These teams became friends and mentors. We still message them for advice, celebrate their competition successes, and collaborate on outreach events. The festival taught us that the FTC community is incredibly supportive—teams genuinely want to help each other succeed.',
        partnerships: 'Collaborated with Phoenix Robotics #18493, ByteForce #19911, and RoboMinds #20134. Event organized by the Romanian Association for Robotics Education.'
      }
    ],
    
    intoTheDeepEvents: [
      {
        name: 'Winter Dive Meet - Iași',
        shortDescription: 'First official competition - 3/6 matches scored',
        fullDescription: 'Our first official competition for the Into the Deep season took place in Iași, bringing together FTC teams from across Romania. Despite being a young team in only our second season, we competed in 6 qualification matches, scoring successfully in 3 of them. The experience provided invaluable lessons in competition strategy, alliance selection, and gracious professionalism. We faced technical challenges during matches but worked with our alliance partners to overcome them.',
        impact: 'Gained critical competition experience under pressure. Identified robot weaknesses (intake reliability, autonomous consistency) leading to improved designs. Built strong relationships with alliance partners Phoenix Robotics and TechnoVision who became long-term collaborators. Received positive feedback from judges on our engineering notebook.',
        date: 'January 2025',
        moreInfo: 'Winter Dive Meet was nerve-wracking and exhilarating. This was our first time competing with a robot we built entirely ourselves, without experienced mentors guiding every decision. Our autonomous program worked in 2 out of 6 matches—frustrating, but it taught us the importance of thorough testing. During one match, our intake mechanism jammed, but our alliance partner stepped up and carried the scoring. In another match, we executed our strategy perfectly and achieved our season-high score. Between matches, we spent time in the pits with other teams, sharing tools, troubleshooting issues, and learning from their experiences. The judges visited our pit and were impressed by our detailed engineering notebook documentation. We didn\'t win any awards, but we left with friendships, knowledge, and determination to improve.',
        partnerships: 'Competed in alliance with Phoenix Robotics #18493 and TechnoVision #21555. Shared pit space and tools with nearby teams, fostering collaboration.'
      },
      {
        name: 'EUROINVENT 2025',
        shortDescription: 'International innovation exhibition in Iași',
        fullDescription: 'EUROINVENT is Romania\'s premier international exhibition of scientific research and innovation, held annually in Iași. The 17th edition (May 8-10, 2025) brought together inventors, researchers, and students from over 25 countries. Mechabyte presented our Into the Deep robot at the event, showcasing our engineering approach, design evolution, and competition strategy to an international audience including patent examiners, university professors, and industry representatives.',
        impact: 'Presented to an international audience of over 500 attendees from 25+ countries. Received recognition for our systematic approach to robot development and comprehensive documentation. Made connections with university engineering departments at Alexandru Ioan Cuza University and Technical University Gheorghe Asachi, opening doors for future mentorship and lab access. Generated interest from potential sponsors impressed by our professionalism and innovation.',
        date: 'May 8-10, 2025',
        moreInfo: 'EUROINVENT was unlike any event we had attended before. Instead of competing against other robots, we were presenting our engineering process to judges, inventors, and academics from around the world. We prepared a professional poster explaining our robot\'s key mechanisms—the blade stabilization system, telescoping arm, and winch-driven hanging mechanism. We practiced our presentation in both English and Romanian. During the three-day exhibition, we gave dozens of presentations, answered technical questions, and learned from other inventors\' projects. University professors from UAIC and TU Iași were particularly interested in our 3D-printed stabilization discs and offered to provide mentorship and access to their engineering labs. Several companies asked for our contact information, expressing interest in sponsorship. The experience taught us how to communicate technical concepts to diverse audiences and showed us that our work has value beyond the competition field.',
        partnerships: 'Event organized by the Romanian Inventors Forum. Connected with Alexandru Ioan Cuza University (UAIC) and Technical University Gheorghe Asachi engineering departments. Networking with international delegations from Moldova, Poland, and Hungary.',
        mediaType: 'image',
        mediaUrl: 'https://github.com/user-attachments/assets/a6fe0aac-8a2a-487f-874c-78b75d2955e6'
      },
      {
        name: 'INOVA 2024 - Sibiu',
        shortDescription: 'Innovation salon recognition',
        fullDescription: 'The International Innovation Salon "Cadet INOVA" at the Nicolae Bălcescu Land Forces Academy in Sibiu (April 11-13, 2024) celebrates student innovation and scientific research in defense technology, engineering, and applied sciences. Mechabyte presented our CenterStage robot and engineering methodology at this prestigious event, competing against student projects from military academies and technical universities across Romania.',
        impact: 'Received recognition for our innovative approaches to mechanical design and autonomous programming in a challenging competitive environment. Made valuable connections with engineering students and faculty from Romanian military academies, expanding our network beyond civilian FTC teams. Learned about advanced engineering principles used in defense applications that could apply to robotics.',
        date: 'April 11-13, 2024',
        moreInfo: 'INOVA was an eye-opening experience. We were nervous presenting our robot at a military academy alongside university-level engineering projects, but the judges and participants were welcoming and impressed by our high school team\'s work. The academy students shared insights about systems engineering, project management, and rigorous testing procedures used in military applications. These conversations influenced how we approach robot development—we now conduct more systematic testing and maintain better documentation. The event also showed us potential career paths in engineering and technology that we hadn\'t considered before.',
        partnerships: 'Hosted by Nicolae Bălcescu Land Forces Academy. Interacted with engineering students from Romanian military and technical universities.',
        mediaType: 'image',
        mediaUrl: 'https://github.com/user-attachments/assets/0b4f626b-cbae-4cd4-9e17-636423fff253'
      },
      {
        name: 'STEMPOSSUM',
        shortDescription: 'STEM education outreach & workshops',
        fullDescription: 'STEMPOSSUM is a regional STEM education initiative focused on robotics and artificial intelligence, designed to introduce younger students to technology and engineering. We participated as guest presenters and workshop leaders, demonstrating our robot\'s capabilities, discussing our engineering process, and leading hands-on activities for younger students interested in coding and robotics. Activities included basic programming exercises, mechanical design challenges, and Q&A sessions about our FTC journey.',
        impact: 'Mentored 40+ middle school students in basic programming (Blockly and simple Java) and mechanical design principles. Positioned Mechabyte as a leader in regional STEM education and youth outreach. Several students expressed interest in starting their own robotics clubs. Teachers requested our help developing robotics curriculum for their schools.',
        date: 'Fall 2024',
        moreInfo: 'STEMPOSSUM reminded us why we started this journey—to inspire others. Leading workshops for middle school students was challenging but rewarding. We had to break down complex concepts into simple terms: "Think of the drivetrain like your legs—it moves the robot around." "The claw is like your hand—it needs to grip tight but not too tight." Some students struggled with programming concepts, so we used visual Blockly programming to make it accessible. Others grasped everything immediately and asked advanced questions. By the end of the day, every student had programmed a simple robot to complete a task. Their excitement reminded us of our own first experiences with robotics. Several students have since followed our social media and asked questions about starting robotics programs at their schools.',
        partnerships: 'Partnered with local schools and STEM education NGOs. Coordinated with other FTC teams to provide diverse perspectives and demonstrations.'
      },
      {
        name: 'UGAL Inventics',
        shortDescription: 'University innovation competition',
        fullDescription: 'The "Inventics" competition at Alexandru Ioan Cuza University (UGAL) celebrates student innovation across multiple disciplines including engineering, computer science, biology, and applied sciences. We presented our Into the Deep robot design, highlighting unique mechanisms like our blade stabilization system, telescoping arm with servo-controlled gripper, and winch-driven hanging mechanism. Judges included university professors, industry engineers, and patent examiners who evaluated technical innovation, practical application, and presentation quality.',
        impact: 'Received recognition for innovative design approaches, particularly our 3D-printed blade stabilization system which solved a complex mechanical problem elegantly. Made connections with university engineering departments for potential mentorship, lab access, and sponsorship. Several professors offered to provide technical consultation on future projects. Generated interest from engineering students who may become future team mentors or volunteers.',
        date: 'November 2024',
        moreInfo: 'Inventics was intimidating at first—we were high school students presenting alongside university engineering projects with significantly more resources and expertise. But we realized our advantage: we had solved real problems under real constraints. Our blade stabilization solution wasn\'t theoretically optimal, but it worked reliably with 3D-printed parts we could afford. Judges appreciated our practical approach and thorough testing process. One professor specializing in mechanical engineering was particularly impressed by our iterative design process—documenting three versions of our intake system and explaining what we learned from each failure. He offered to let us use the university\'s engineering lab for testing future prototypes. Another judge who works in industrial automation suggested improvements to our gripper design and invited us to visit his company. These connections have already proven valuable—we now have access to better tools and expert advice.',
        partnerships: 'Hosted by Alexandru Ioan Cuza University (UAIC) Faculty of Engineering. Received feedback from professors specializing in mechanical engineering, robotics, and industrial automation. Connected with engineering students interested in mentoring FTC teams.'
      },
      {
        name: 'Christmas Market Fundraiser',
        shortDescription: 'Hand-crafted decorations fundraiser',
        fullDescription: 'Team members hand-crafted Christmas decorations including ornaments, wreaths, holiday cards, and tree toppers featuring robot-themed designs and Mechabyte branding. We set up a booth at the local Christmas market in Iași, combining holiday spirit with robotics awareness. The booth featured our robot on display, photos from competitions, and interactive demonstrations. All proceeds went directly to the team budget to fund competition travel and equipment purchases.',
        impact: 'Generated 2,000 RON (~€400) for team expenses, covering travel costs to Winter Dive Meet. Demonstrated creativity and artistic skills beyond technical abilities. Engaged with 200+ market visitors about FTC, STEM education, and our team\'s mission. Many visitors followed us on social media after the event. Local media covered our booth, generating positive publicity.',
        date: 'December 2024',
        moreInfo: 'The Christmas Market showed a different side of our team. For weeks, we worked on crafts instead of code—painting ornaments, assembling wreaths, designing holiday cards with robot illustrations. Non-technical team members took the lead, showcasing their artistic talents. We created robot-themed decorations: Christmas tree ornaments shaped like gears, wreaths decorated with metallic ribbons resembling circuits, and cards featuring our robot in a Santa hat. At the market, our booth stood out—we played Christmas music, gave out hot chocolate, and let kids interact with our robot (carefully supervised, of course). Parents loved the decorations, kids loved the robot, and everyone appreciated our entrepreneurial spirit. The 2,000 RON we raised covered our hotel and transportation costs for Winter Dive Meet. More importantly, the event showed our community that we\'re resourceful, creative, and determined to succeed regardless of obstacles.',
        partnerships: 'Collaborated with Paradise International College parent volunteers for booth setup. Local crafts suppliers provided materials at discounted rates. Iași local government provided free booth space in recognition of our educational mission.'
      }
    ],
    
    // Additional labels
    firstVersionLabel: 'First Version',
    upgradeAttemptsLabel: 'Upgrade Attempts',
    currentVersionLabel: 'Current Version',
    constructionImprovementsLabel: 'Construction Improvements',
    autonomousApproachLabel: 'Autonomous Approach',
    ourGoalsLabel: 'Our Goals',
    ourGoalsText: 'We implement STEM core values—responsibility, compassion, and perseverance—as we constantly improve our capabilities. Our mission is to inspire future generations to follow their dreams in science, technology, engineering, and mathematics while building a strong, collaborative team that exemplifies gracious professionalism.',
    sustainabilityGrowthLabel: 'Sustainability & Growth',
    sustainabilityGrowthText: 'Mechabyte represents a strategic investment in sustainable STEM education and workforce development. With two complete FTC seasons demonstrating measurable results, we have established robust operational frameworks and community partnerships.\n\nOur sustainability model integrates structured recruitment pipelines, comprehensive training programs, and alumni network engagement. We maintain fiscal responsibility through diversified funding sources and strategic budgeting, ensuring long-term program continuity.\n\nBy partnering with Mechabyte, sponsors invest in a proven platform that delivers consistent community impact, develops skilled technical talent, and generates positive brand association with innovation and education excellence. Our growth trajectory demonstrates scalability and social responsibility, creating mutual value for sponsors and the community.',
    contactUsLabel: 'Contact Us'
  },

  ro: {
    nav: {
      home: 'Acasă',
      values: 'Valori',
      achievements: 'Realizări',
      team: 'Echipă',
      portfolio: 'Portofoliu',
      outreach: 'Implicare',
      sponsors: 'Sponsori',
      support: 'Susține',
      contact: 'Contact'
    },

    homeTitle: 'Bine ați venit la Mechabyte',
    homeWelcome: 'Învățăm Viitorul Prin Robotică',
    aboutTitle: 'Despre Noi',
    aboutText: 'Combinăm învățare practică cu inginerie de competiție pentru a ajuta studenții să construiască roboți reali, abilități reale și cariere de durată. Alătură-te atelierelor, sponsorizează creșterea noastră sau cunoaște echipa care construiește liderii roboticii de mâine.',
    missionTitle: 'Misiunea Noastră',
    missionItems: [
      'Promovarea educației STEM și a roboticii în comunitatea noastră prin workshop-uri și demonstrații',
      'Dezvoltarea abilităților tehnice în programare, inginerie și design, încurajând inovația',
      'Încurajarea muncii în echipă, leadershipului și abilităților de rezolvare a problemelor într-un mediu colaborativ',
      'Inspirarea următorei generații de inovatori și ingineri prin programe de outreach',
      'Reprezentarea României pe scena internațională FTC cu excelență și dedicare',
      'Construirea de parteneriate durabile cu sponsori, mentori și comunitatea locală'
    ],
    ftcTitle: 'Despre FIRST Tech Challenge',
    ftcDescription: 'FIRST Tech Challenge (FTC) este o competiție globală de robotică pentru studenți cu vârste între 12-18 ani. Echipele proiectează, construiesc, programează și concurează cu roboți pentru a completa provocări pe un teren de 12x12 picioare (3,7 x 3,7 metri). FTC promovează educația STEM, munca în echipă și profesionalismul grațios, pregătind studenții pentru cariere viitoare în tehnologie și inginerie. Fiecare sezon prezintă o nouă provocare de joc care testează atât abilitățile tehnice, cât și gândirea strategică, necesitând ca echipele să lucreze împreună pentru a rezolva probleme complexe.',
    activitiesTitle: 'Activități și Calendar 2024-2025',
    activities: [
      {
        name: 'Paradis Run',
        description: 'Eveniment comunitar de alergare care promovează sănătatea și spiritul școlar, reunind studenți, familii și membri ai comunității pentru o zi de fitness și distracție'
      },
      {
        name: 'Seara Anuală de Film',
        description: 'Eveniment la nivel de școală care reunește studenți și familii pentru divertisment și construirea comunității, prezentând filme cu tematică robotică și demonstrații'
      },
      {
        name: 'Iași Meet',
        description: 'Întâlnire regională de robotică cu alte echipe FTC din Iași, schimbând cunoștințe, strategii și construind relații cu colegi roboticieni'
      },
      {
        name: 'Inițiativă de Oferire de Dulciuri și Cărți',
        description: 'Program de implicare comunitară care împărtășește bucurie și educație copiilor locali, promovând alfabetizarea și conștientizarea STEM în comunitatea noastră'
      },
      {
        name: 'FTC Regionals 2025',
        description: 'Turneu de robotică competitiv reprezentând școala și regiunea noastră, prezentând realizările noastre tehnice și profesionalismul grațios pe teren'
      }
    ],
    contactCta: 'Contactați-ne',

    ctaLearnMore: 'Află Mai Multe',
    ctaOurMission: 'Misiunea Noastră',

    valuesTitle: 'Valorile Noastre Fundamentale',
    valuesIntro: 'Construim cu curiozitate, respect și determinare.',
    valuesList: [
      {
        title: '💡 Inovație',
        description: 'Pune la îndoială totul. Construiește mai bine.'
      },
      {
        title: '🤝 Muncă în echipă',
        description: 'Împreună realizăm imposibilul.'
      },
      {
        title: '⚖️ Integritate',
        description: 'Fă ce e corect, chiar și când nimeni nu se uită.'
      },
      {
        title: '⭐ Excelență',
        description: 'Bun de ajuns nu e niciodată.'
      }
    ],
    ambassadorRoleTitle: 'Rolul de Ambasador al Echipei',
    ambassadorStatement: 'Reprezentăm echipa, Paradise College și Nație prin Educație. Încorporăm educația STEM și profesionalismul grațios în fiecare interacțiune.',
    valuesClosing: 'Aceste valori ghidează munca noastră zilnică, de la proiectarea și construirea robotului nostru până la implicarea cu sponsorii și desfășurarea programelor de outreach. Ne amintesc că succesul în FTC este măsurat nu doar prin rezultatele competiției, ci prin impactul pozitiv pe care îl avem unul asupra celuilalt și asupra comunității noastre.',

    achievementsTitle: 'Călătoria Noastră',
    achievementsIntro: 'Momente cheie — rapide, vizuale și partajabile.',
    achievementsList: [
      {
        year: '2024',
        title: 'Formarea Echipei',
        description: 'Înființat Mechabyte 22590 la Paradise International College.'
      },
      {
        year: '2024',
        title: 'Prima Construcție de Robot',
        description: 'Construit primul robot competitiv FTC pentru sezonul INTO THE DEEP.'
      },
      {
        year: '2024',
        title: 'Începutul Outreach-ului Comunitar',
        description: 'Lansat workshop-uri STEM la școlile locale.'
      },
      {
        year: '2024',
        title: 'Participarea la Paradis Run',
        description: 'Organizat eveniment comunitar Paradis Run la nivel de școală.'
      },
      {
        year: '2024',
        title: 'Seara Anuală de Film',
        description: 'Găzduit seară de film de succes pentru studenți și familii.'
      },
      {
        year: '2025',
        title: 'Întâlnirea Regională Iași',
        description: 'Networkat cu echipe FTC la întâlnirea regională Iași.'
      },
      {
        year: '2025',
        title: 'Inițiativa Cărți și Dulciuri',
        description: 'Distribuit cărți și dulciuri copiilor locali.'
      },
      {
        year: '2025',
        title: 'Competiția Regională FTC',
        description: 'Concurat în FTC Regionals 2025, demonstrat excelență tehnică.'
      },
      {
        year: 'În derulare',
        title: 'Workshop-uri STEM',
        description: 'Găzduim workshop-uri regulate de robotică pentru elevi de gimnaziu.'
      },
      {
        year: 'În derulare',
        title: 'Dezvoltare Tehnică',
        description: 'Îmbunătățim continuu designul robotului prin testare și iterație.'
      }
    ],

    teamTitle: 'Cunoaște Echipa Noastră',
    teamIntro: 'Sezon nou, lideri proaspeți, moștenire continuă.',
    technicalTeamTitle: 'Echipa Tehnică',
    nonTechnicalTeamTitle: 'Echipa Non-Tehnică',
    mentorsTitle: 'Mentori',
    alumniTitle: 'Alumni',
    collaborationTitle: 'Colaborare Între Departamente',
    teamCollaboration: 'Sezonul trecut, designerul nostru CAD a schițat un mecanism pe un șervețel la prânz.\n\nSeara, echipa de programare l-a simulat. A doua zi, marketing-ul a filmat testul prototipului.\n\nAstfel lucrăm—ideile curg liber, fără bariere.\n\nMarketing-ul ajută la debug când sunt necesari ochi proaspeți. Inginerii fac brainstorming pentru campanii social media.\n\nSincronizările noastre săptămânale sunt haotice, energice și productive. Toată lumea contribuie dincolo de rol.',
    trainingTitle: 'Instruirea Noilor Membri',
    teamTraining: 'Ziua 1: Bine ați venit în haos. Juniorii noi primesc unelte, nu manuale.\n\nSăptămâna 1-4: Seniorii ghidează construcții practice. Juniorii lipesc primul circuit, scriu primul cod autonom, proiectează prima piesă CAD.\n\nLuna 2-3: Juniorii conduc proiecte mici. Greșesc, fac debug, iterează. Seniorii supraveghează dar nu salvează.\n\nLuna 4-6: Juniorii devin încrezători. Încep să predea următoarea generație.\n\nLa sfârșitul sezonului, juniorii de ieri sunt seniorii de azi. Mâine, sunt team leaderi.',
    teamEnvironmentTitle: 'Mediul Echipei',
    teamEnvironment: 'Imaginează-ți: E 23:00. Deadline-ul robotului e mâine.\n\nJumătate din echipă face debug la motoare blocate. Cealaltă jumătate face meme-uri despre asta.\n\nCineva comandă pizza. Altcineva pune muzică groaznică. Toți râd.\n\nEșuăm împreună. Sărbătorim împreună. Construim împreună.\n\nDincolo de circuite și competiții, construim prietenii care durează mai mult decât liceul.\n\nUnele dintre cele mai bune amintiri nu sunt victorii—sunt descoperirile de la 3 dimineața și glumele pe care doar noi le înțelegem.',
    
    technicalTeamDesc2025: 'Construiește și programează roboți pentru sezonul 2025-2026. Accent pe design-uri inovatoare și sisteme autonome fiabile.',
    nonTechnicalTeamDesc2025: 'Gestionează activități de outreach, marketing și branding. Creează conținut captivant și parteneriate comunitare.',
    mentorsDesc2025: 'Ghidează echipa cu expertiză tehnică și direcție strategică. Susține obiectivele de competiție și dezvoltare a echipei.',
    technicalTeamDesc2024: 'A proiectat și construit robotul Into the Deep. A dezvoltat sistemul de intake cu slider vertical și mecanisme de scoring optimizate.',
    nonTechnicalTeamDesc2024: 'A gestionat campanii social media, a organizat evenimente de fundraising și a coordonat activități de outreach pe tot sezonul.',
    mentorsDesc2024: 'A furnizat îndrumare tehnică și mentorat în sezonul Into the Deep. A ajutat echipa să navigheze provocările competiției.',
    technicalTeamDesc2023: 'A creat robotul CenterStage cu braț pantograf și lansator de drone. A pionierat design-ul șasiului cu roți mecanum.',
    nonTechnicalTeamDesc2023: 'A condus inițiative de marketing, evenimente de fundraising și engagement comunitar în sezonul de fondare.',
    mentorsDesc2023: 'A fondat și stabilit echipa. A oferit training inițial și a ghidat participarea în prima competiție.',

    sponsorsTitle: 'Sponsorii Noștri',
    sponsorsIntro: 'Partener cu Mechabyte — întărește STEM-ul local, obține beneficii fiscale și conectează-te cu talente strălucitoare.',
    currentSponsorsTitle: 'Sponsori Actuali',
    sponsorshipImpactTitle: 'Cum Ajută Sponsorizările',
    sponsorshipImpact: [
      '⚙️ Construim roboți competitivi cu echipament și materiale de calitate',
      '🏆 Competim global prin taxe și suport de călătorie acoperite',
      '🔧 Dezvoltăm profesional cu unelte și spațiu adecvat',
      '👥 Inspirăm 100+ elevi anual prin programe outreach',
      '📚 Oferim dezvoltare abilități de clasă mondială și resurse training',
      '🚀 Susținem creșterea echipei cu finanțare operațională'
    ],
    whySponsorTitle: 'De Ce Să Sponsorizați Mechabyte?',
    whySponsorPoints: [
      'Investiție deductibilă fiscal în educație și dezvoltare comunitară',
      'Vizibilitate logo la competiții internaționale și evenimente comunitare',
      'Susținerea inițiativelor STEM locale și dezvoltarea tinerilor',
      'Pipeline direct către ingineri talentați construind forța de muncă tech de mâine'
    ],
    becomeSponsorTitle: 'Deveniți Sponsor',
    becomeSponsorText: 'Investește în robotica românească și formează forța de muncă tech de mâine!',

    supportTitle: 'Susține Misiunea Noastră',
    supportIntro: 'Există multe modalități de a susține Mechabyte și de a contribui la educația STEM în comunitatea noastră. Fie prin sponsorizare financiară, timp voluntar, donații de echipamente sau mentorat, susținerea dumneavoastră face o diferență reală.',
    sponsorBenefitsTitle: 'Beneficiile Sponsorilor',
    sponsorBenefits: [
      'Logo pe robot, site și rețele sociale',
      'Recunoaștere la evenimente FTC',
      'Acces la actualizări echipă',
      'Conectare cu talente STEM',
      'Metrici impact CSR'
    ],
    volunteerTitle: 'Oportunități de Voluntariat',
    volunteerText: 'Binevenimos voluntari care doresc să împărtășească expertiza lor cu echipa noastră. Indiferent dacă aveți experiență în inginerie, programare, marketing sau afaceri, îndrumarea dumneavoastră poate ajuta membrii noștri să dezvolte abilități valoroase. Voluntarii pot participa la workshop-uri, pot oferi mentorat tehnic sau pot asista la planificarea și executarea evenimentelor.',
    donateTitle: 'Donații de Echipamente și Materiale',
    donateText: 'Donațiile de hardware sunt incredibil de valoroase pentru echipa noastră. Putem folosi întotdeauna componente precum motoare, senzori, profile de aluminiu, elemente de fixare, electronice și unelte. Chiar și echipamentele depășite pot fi utile pentru prototipare și învățare. Dacă dumneavoastră sau organizația dumneavoastră aveți materiale în surplus care ar putea beneficia o echipă de robotică, vă rugăm să ne contactați.',
    mentorshipTitle: 'Programe de Mentorat',
    mentorshipText: 'Mentorii profesioniști oferă îndrumare neprețuită pentru a ajuta echipa noastră să crească. Mentorii pot lucra cu sub-echipe specifice (programare, CAD, marketing) sau pot oferi îndrumare generală privind managementul proiectelor, dinamica echipei și strategia. Mentoratul poate fi la fel de implicat sau flexibil pe cât permite programul dumneavoastră, de la întâlniri săptămânale la verificări ocazionale și participarea la competiții.',
    taxDeductibleTitle: 'Beneficii Fiscale',
    taxDeductibleText: 'Contribuțiile la Mechabyte pot fi deductibile fiscal ca susținere a inițiativelor educaționale. Oferim toată documentația necesară pentru evidențele dumneavoastră. Contactați-ne pentru a afla mai multe despre cum contribuția dumneavoastră poate beneficia atât echipa noastră, cât și organizația dumneavoastră.',

    contactTitle: 'Contactați-ne',
    contactIntro: 'Ne-ar plăcea să auzim de la dumneavoastră! Fie că sunteți interesat să sponsorizați echipa noastră, să faceți voluntariat, să programați o demonstrație cu robotul sau pur și simplu să aflați mai multe despre ce facem, vă rugăm să ne contactați prin oricare dintre canalele de mai jos.',
    contactDetails: {
      email: 'mechabyte22590@gmail.com',
      phone: '+40773854312 (Andreea Ionita)',
      address: 'Str. Dealul Zorilor 8C, Mechabyte – Paradise International College, Iași',
      instagram: 'https://www.instagram.com/mechabyte22590/',
      tiktok: 'https://www.tiktok.com/@mechabyte22590',
      youtube: 'https://www.youtube.com/@mechabyte22590',
      facebook: 'https://www.facebook.com/mechabyte22590',
      linkedin: 'https://www.linkedin.com/company/mechabyte22590'
    },
    contactLabels: {
      email: 'Email',
      phone: 'Telefon',
      address: 'Adresă',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      youtube: 'YouTube',
      facebook: 'Facebook',
      linkedin: 'LinkedIn'
    },
    followUsTitle: 'Urmăriți-ne',
    scheduleDemoTitle: 'Programați o Demonstrație',
    scheduleDemo: 'Vezi robotul nostru în acțiune! Rezervă o demonstrație pentru școala sau evenimentul tău. Aducem robotica la viață.',
    stayConnectedTitle: 'Rămâneți Conectați',
    connectWithUs: 'Urmărește călătoria noastră: competiții, construcții, în culise. Alătură-te comunității!',

    // Feature Cards
    featuresHeading: 'Ce Facem',
    featureInnovationTitle: 'Inovație',
    featureInnovationDesc: 'Tehnologie modernă și rezolvare creativă.',
    featureEngineeringTitle: 'Excelență în Inginerie',
    featureEngineeringDesc: 'Design de precizie în fiecare componentă.',
    featureTeamworkTitle: 'Muncă în Echipă',
    featureTeamworkDesc: 'Abilități diverse, obiective comune.',
    featureCompetitionTitle: 'Pregătit pentru Competiție',
    featureCompetitionDesc: 'Pregătire pentru competițiile FTC cu testare riguroasă, iterație și planificare strategică.',

    // Portfolio page
    portfolioTitle: 'Mechabyte #22590',
    portfolioSubtitle: 'Portofoliu de Inginerie – Centerstage și Into the Deep',
    portfolioMission: 'Mechabyte a fost înființată pe 25 septembrie 2023, în timpul Săptămânii Științei la Paradise International College. Echipa noastră a fost creată pentru a învăța și descoperi abilități noi distrându-ne. Ne propunem să implementăm valorile fundamentale STEM—responsabilitate, compasiune și perseverență—să ne îmbunătățim constant capacitățile și să inspirăm generațiile viitoare să-și urmeze visele în știință, tehnologie, inginerie și matematică.',
    ourTeamTitle: 'Echipa Noastră',
    intoTheDeepSeason: 'Sezonul Into the Deep (2024-2025)',
    centerstageSeason: 'Sezonul Centerstage (2023-2024)',
    previousSeasonTitle: 'Sezon Anterior',
    gameStrategyTitle: 'Strategie de Joc',
    autonomousTitle: 'Autonom',
    teleOpTitle: 'Tele-Op',
    endgameTitle: 'Finalul Jocului',
    robotEvolutionTitle: 'Evoluția Robotului',
    driveTrainTitle: 'Tren de Rulare',
    intakeTitle: 'Colectare',
    armTitle: 'Braț',
    launcherTitle: 'Lansator de Dronă',
    programmingTitle: 'Programare și Autonom',
    driverControlsTitle: 'Comenzi Șofer',
    outreachEventsTitle: 'Outreach și Evenimente',
    socialMediaTitle: 'Strategie Social Media',
    inPersonEventsTitle: 'Evenimente În Persoană',
    sustainabilityTitle: 'Sustenabilitate și Finanțare',
    fundraisingTitle: 'Activități de Strângere de Fonduri',
    sponsorsListTitle: 'Sponsorii Noștri',
    sustainabilityPlanTitle: 'Plan de Sustenabilitate',

    // Portfolio team content
    portfolioIntoTheDeepMentors: 'Mentori: Andreea Ionita, Bogdan Andone',
    portfolioIntoTheDeepNonTechnical: 'Non-Tehnic: Alexandra Maftei, Veronika Glazkova, Cristiana Balan, Alexandra Sîmbotin Gășpărel',
    portfolioIntoTheDeepTechnical: 'Tehnic: Alexia Vancea, Ianis Cotoc, Teodor Matricală, Catrinel Bănuță, Rareș Berheci',
    portfolioCenterstageMentor: 'Mentor: Andreea Ionita',
    portfolioCenterstageNonTechnical: 'Non-Tehnic: Aayush Khadka, Alexia Vancea, Alexandra Maftei',
    portfolioCenterstageTechnical: 'Tehnic: Maia Sava (Construcție și Programare), Șerban Untu (Construcție și Programare), Rareș Cozma (Construcție), Cristian Ghidireac (Construcție și Design), David Grigore (Design și Construcție), Ștefan Albu (Design)',

    // Game strategy content
    centerstageGoal: 'Deoarece acesta este primul sezon în care participăm, obiectivul nostru pentru robot a fost să marcăm cât mai multe puncte posibil.',
    centerstageAutonomousDetails: 'Începem cu un pixel pre-încărcat în gheara de colectare. Deoarece nu avem odometrie, am programat robotul pe timp. În funcție de poziția de pornire, robotul va urma o traiectorie presetată pentru a parca în backstage și a lăsa pixelul acolo. Avem în total 4 programe Autonome pentru fiecare traiectorie (2 care fac același lucru).\n\nPrima poziție de pornire (backstage): Când plasăm robotul pe teren, ar fi orientat către backstage astfel încât ar trebui doar să meargă înainte până ajunge la locația dorită.\n\nA doua poziție de pornire (public): Când este plasat pe teren, robotul ar fi orientat către cealaltă alianță. Traiectoria pe care am stabilit-o a fost să mergem înainte până la tile C2 și apoi lateral până la ajungerea la backstage.',
    centerstageTeleOpDetails: 'În funcție de alianta noastră, strategia variază ușor. În esență, piloții vor naviga prin truss și/sau ușa scenei pentru a obține câte un pixel pe rând fie de la stive, fie de la stația umană. După încărcarea cu succes a pixelului, piloții vor naviga cu atenție către backstage și vor plasa pixelul pe backdrop. Dacă pixelul se întâmplă să cadă în backstage, piloții îl vor lăsa acolo și se vor concentra să aducă un alt pixel. Dacă este posibil, echipa de conducere va încerca să creeze mozaicuri și să treacă o linie de pe backdrop pentru punctele bonus.',
    centerstageEndgameDetails: 'În primele 15-20 secunde, piloții vor continua să marcheze pixeli pe backdrop. În ultimele câteva secunde, drona va fi lansată și robotul parcat în backstage.',
    centerstageStrategySummary: [
      { period: 'Autonom', mandatory: ['parcarea robotului în backstage'], optional: ['lăsarea pixelului pre-încărcat în backstage'], scoring: '5 - 8 pct' },
      { period: 'Teleop', mandatory: ['plasarea cât mai multor pixeli pe backdrop'], optional: ['plasarea pixelului în backstage', 'formarea de mozaicuri', 'trecerea liniilor pe backdrop'], scoring: '9 - 15 pct' },
      { period: 'Finalul Jocului', mandatory: ['lansarea dronei', 'parcarea robotului în backstage'], optional: [], scoring: '5 - 35 pct' }
    ],
    centerstageAutonomous: 'Robotul pornește cu un pixel pre-încărcat în gheara de colectare. Nu folosim odometrie; toate mișcările sunt bazate pe timp. Avem două poziții principale de pornire: față către backstage (mers drept pentru parcare și eliberare pixel) și față către public (mers înainte către tile C2, apoi lateral către backstage).',
    centerstageTeleOp: 'Șoferii navighează prin truss sau ușa scenei pentru a colecta pixeli de la stive sau stația umană. Livrăm câte un pixel pe rând către backdrop. Dacă un pixel cade în backstage, îl lăsăm și luăm altul. Scopul nostru este să formăm mozaicuri și să traversăm linii pe backdrop pentru puncte bonus.',
    centerstageEndgame: 'Continuăm să marcăm pixeli timp de 15-20 secunde, apoi lansăm drona și parcăm în backstage pentru puncte suplimentare.',
    intoTheDeepGoal: 'Marcați cât mai multe puncte posibil colectând mostre și marcând în coșuri/camere, apoi urcați pe submersibil.',
    intoTheDeepAutonomousDetails: 'Robotul pornește din zona de observație lângă submersibil. Folosind navigare bazată pe timp, se deplasează la centrul submersibilului (~1.5s), colectează o mostră, apoi livrează în zona de plasă (~2.0s total). Mostra lăsată în zona de plasă aduce 2 puncte. Timpul total autonom este aproximativ 3.5 secunde.',
    intoTheDeepTeleOpDetails: 'Șoferii navighează pentru a colecta mostre câte una pe rând din submersibil sau de pe sol. Mostrele sunt marcate în coșul înalt (8 pct fiecare) pentru eficiență maximă. Glisiera verticală se extinde pentru a ajunge la coș în timp ce sistemul de colectare eliberează mostra. Dacă o mostră cade, o abandonăm și colectăm una nouă în loc să pierdem timp recuperând-o.',
    intoTheDeepEndgameDetails: 'Continuați să marcați mostre în coșul înalt până când rămân 15-20 secunde. În ultimele secunde, parcați robotul în zona de plasă (3 pct) sau încercați o ascensiune de nivel jos pe scara submersibilului (15 pct) dacă timpul permite.',
    intoTheDeepStrategySummary: [
      { period: 'Autonom', mandatory: ['parcarea robotului în zona de plasă sau urcarea pe nivelul 1'], optional: ['plasarea mostrei în zona de plasă'], scoring: '3 pct' },
      { period: 'Teleop', mandatory: ['plasarea cât mai multor mostre în coșul înalt'], optional: ['plasarea mostrelor în coșul jos'], scoring: '24 - 48 pct' },
      { period: 'Finalul Jocului', mandatory: ['parcarea robotului în zona de plasă sau urcarea pe nivelul 1'], optional: ['urcarea pe nivelul 2'], scoring: '3 - 15 pct' }
    ],
    intoTheDeepTeleOp: 'Navigăm pentru a lua câte o mostră pe rând de pe teren sau din submersibil. Mostrele sunt plasate în coșul cel mai înalt din zona de plasă. Dacă o mostră cade, o abandonăm și luăm una nouă pentru a maximiza eficiența punctajului.',
    intoTheDeepEndgame: 'Continuăm să marcăm în coșul înalt până în ultimele secunde, apoi parcăm în zona de plasă pentru puncte suplimentare.',

    // Robot evolution content
    centerstageDriveTrainEvolution: 'Am început cu un șasiu X-drive cu roți omni la 45°—stabil dar prea mic pentru toate componentele. Versiunea intermediară a folosit X-drive cu bare metalice răsturnate; control hub-ul era atașat cu un șurub și un colier, făcându-l fragil și predispus la deformare. Versiunea finală prezintă un șasiu mai stabil și spațios cu Expansion Hub, roți mecanum și suporturi personalizate pentru hub-uri, întrerupător și motoare.',
    centerstageIntakeEvolution: 'Prima versiune era o colectare dinamică cu ax rotativ și cap de perie de toaletă împingând pixeli pe o rampă în depozit cu două pixeli. Abandonată din cauza lipsei de motoare (toate 4 folosite de trenul de rulare, fără expansion hub). A doua versiune folosea o gheară cu un singur pixel cu servo de poziție și roată dințată—mai precisă dar necesita aliniere exactă. A treia versiune avea o gheară deschizându-se în unghi folosind două roți dințate angrenate, făcând colectarea pixelilor mai ușoară.',
    centerstageArmEvolution: 'Braț inspirat de pantograf (ca pantografele de tramvai) menține unghiul de colectare constant la ridicare sau coborâre, eliminând nevoia de reajustare constantă. Inițial alimentat de unul, apoi două servo-uri cu rotație continuă (cuplu insuficient cauzând atârnare). Mai târziu actualizat la un motor Tetrix 40:1 după obținerea Expansion Hub-ului.',
    centerstageLauncherEvolution: 'Placă subțire cu trei canale pentru dronă, bandă elastică și tijă glisantă. Elasticul este ținut sub tensiune de tijă; eliberarea acesteia lansează drona către zonele de punctaj. Tija este atașată de un servo de poziție, armată în timpul auto/tele-op și eliberată în endgame. A doua versiune a îmbunătățit montarea cu găuri personalizate în șasiu.',
    intoTheDeepFirstVersion: 'Designul inițial avea mai multe probleme: gheară supradimensionată care nu se putea închide complet (specimene cădeau des), colectare grea folosind lame de material de măcelărie pentru a trage mostre în depozit (prea grea, acționa ca obstacol la mișcarea înainte, lamele se aliniau des și nu reușeau să apuce), glisieră viper orizontală cu motor instabil decentrat și puține puncte de susținere, glisieră viper verticală pentru coșuri și submersibil (decentrată, dificil de atașat o gheară potrivită), și o cutie de depozitare care nu ajungea la coș cu spațiu insuficient.',
    intoTheDeepUpgradeAttempts: 'Am reproiectat forma ghearei pentru a se potrivi mai bine specimenelor, dar laturile nu se aliniază bine, făcând prinderea dificilă. La prima întâlnire, colectarea s-a blocat pe marginea zonei submersibilului. Sistemul era prea lent, greu și fragil. Am ales să nu folosim gheara din cauza acestor probleme.',
    intoTheDeepCurrentVersion: 'Design simplificat cu o singură glisieră verticală și braț atașat. Fără transfer între containere—colectarea apucă mostra și glisiera ridică direct la coșul înalt. Beneficii: ajungem ușor la coșul înalt, colectare mai ușoară dar mai durabilă, alinierea dreaptă ajută la punctaj precis. Provocare rămasă: mișcarea brațului din cauza atașării imperfecte a motorului hex la glisieră.',
    intoTheDeepConstructionImprovements: 'Colectare stabilizată cu două părți structurale suplimentare. Înlocuite lamele de măcelărie și adăugate opritori pentru a preveni rotația paralelă. Create discuri imprimate 3D cu centre hexagonale pentru a fixa lamele pe ax, rezolvând problemele de rotație.',

    // Programming content
    programmingDescription: 'Ambele sezoane au folosit autonom bazat pe timp deoarece nu aveam camere sau senzori. Mișcările sunt secvențe de deplasări înainte/înapoi/stânga/dreapta cu durată fixă. Uneori folosim putere redusă la final pentru a asigura parcarea completă în zonă sau backstage.',
    driverLayoutDescription: 'Centerstage: Inițial un singur șofer gestiona toate sarcinile din cauza problemelor de alimentare cu două gamepad-uri (Motorola G4 Play). Cu un telefon nou (Nokia 5), am împărțit sarcinile între șoferul 1 (mișcare + braț/lansator) și șoferul 2 (colectare). Into the Deep: Șoferul 1 controlează mișcarea robotului și extensia glisierei; șoferul 2 controlează colectarea, evacuarea și brațul.',

    // Outreach content
    socialMediaDescription: 'Platformele noastre principale sunt Instagram și TikTok. Împărtășim regulat actualizări de progres, conținut din culise și puncte culminante ale competiției. Ne implicăm activ cu alte echipe prin comentarii, felicitări și promovarea evenimentelor. Ca rezultat, multe echipe recunosc deja Mechabyte la întâlniri.',
    outreachEvents: [
      {
        name: 'Seară de Film (Singur Acasă 1)',
        description: 'Eveniment de strângere de fonduri la Paradis International College cu prezentarea robotului și discuții informale STEM.'
      },
      {
        name: 'Inițiativa Dulciuri și Cărți',
        description: 'Donat dulciuri și cărți copiilor în nevoie, combinat cu discuții informale despre robotică și valori STEM.'
      },
      {
        name: 'Paradis Run (2 noiembrie)',
        description: 'Eveniment caritabil pentru Asociația Oameni Mici—echipa a alergat și a făcut voluntariat.'
      },
      {
        name: 'Festivalul Științific Nikola Tesla',
        description: 'Colaborare cu echipele Cyliis și Peppers, schimbând sfaturi despre FTC.'
      },
      {
        name: 'Winter Dive Meet Iași',
        description: 'Cooperare cu echipe regionale precum Cyliis, Peppers și Robozzi. Marcat 3 din 6 meciuri.'
      },
      {
        name: 'Vânzare Clătite și Deserturi',
        description: 'Strângere de fonduri sezon Centerstage care a adunat aproximativ 5.000 RON.'
      },
      {
        name: 'Decorațiuni Târg de Crăciun',
        description: 'Vândut decorațiuni la târgul de Crăciun, strângând încă 2.000 RON.'
      },
      {
        name: 'Robotică și AI STEMPOSSUM',
        description: 'Colaborare cu Cyliss și Universitatea Tehnică "Gheorghe Asachi".'
      },
      {
        name: 'Salonul UGAL Inventics',
        description: 'Participat cu echipa RoSophia, prezentând robotul și inovațiile noastre.'
      }
    ],
    fundraisingDescription: 'Activitățile noastre de strângere de fonduri din ambele sezoane au inclus vânzarea de biscuiți, bilete pentru Seara de Film, clătite, decorațiuni și flori. Aceste evenimente au fost cruciale în susținerea costurilor operaționale și participarea la competiții.',
    sustainabilityDescription: 'Planul nostru de sustenabilitate se concentrează pe: recrutarea și instruirea studenților mai tineri pentru a asigura continuitatea, menținerea rețelei de suport a absolvenților, parteneriat cu corporații care împărtășesc valorile noastre și bugetare atentă cu categorii pentru cheltuieli echipă (roți, cabluri, electronice) și fonduri de urgență. Sponsorii principali includ Paradis International College, Professional Dentist și alții care cred în misiunea noastră.',
    
    // Additional labels
    firstVersionLabel: 'Prima Versiune',
    upgradeAttemptsLabel: 'Încercări de Îmbunătățire',
    currentVersionLabel: 'Versiune Curentă',
    constructionImprovementsLabel: 'Îmbunătățiri de Construcție',
    autonomousApproachLabel: 'Abordare Autonomă',
    ourGoalsLabel: 'Obiectivele Noastre',
    ourGoalsText: 'Implementăm valorile fundamentale STEM—responsabilitate, compasiune și perseverență—pe măsură ce ne îmbunătățim constant capacitățile. Misiunea noastră este să inspirăm generațiile viitoare să-și urmeze visele în știință, tehnologie, inginerie și matematică, construind în același timp o echipă puternică și colaborativă care exemplifică profesionalismul grațios.',
    sustainabilityGrowthLabel: 'Sustenabilitate & Creștere',
    sustainabilityGrowthText: 'Mechabyte reprezintă o investiție strategică în educație STEM sustenabilă și dezvoltarea forței de muncă. Cu două sezoane FTC complete demonstrând rezultate măsurabile, am stabilit cadre operaționale robuste și parteneriate comunitare.\n\nModelul nostru de sustenabilitate integrează pipeline-uri structurate de recrutare, programe comprehensive de training și angajament cu rețeaua de absolvenți. Menținem responsabilitate fiscală prin surse de finanțare diversificate și bugetare strategică, asigurând continuitatea programului pe termen lung.\n\nPrintr-un parteneriat cu Mechabyte, sponsorii investesc într-o platformă dovedită care oferă impact comunitar consistent, dezvoltă talente tehnice calificate și generează asociere pozitivă a brandului cu inovație și excelență educațională. Traiectoria noastră de creștere demonstrează scalabilitate și responsabilitate socială, creând valoare reciprocă pentru sponsori și comunitate.',
    contactUsLabel: 'Contactați-ne',
    
    // New detailed sections
    ftcOverviewTitle: 'Ce este FIRST Tech Challenge?',
    ftcOverviewContent: 'FIRST Tech Challenge (FTC) este un concurs internațional de robotică pentru studenții de liceu. În fiecare sezon, alianțe mici de două echipe joacă meciuri scurte pe un teren de 12×12 ft. Fiecare echipă construiește și programează un robot care se încadrează într-un cub de 18 inch și se poate extinde în timpul unui meci. Un meci începe cu o perioadă autonomă de 30 s în care roboții urmează instrucțiuni pre-programate; este urmată de o perioadă de 2 min controlată de piloți în care piloții operează robotul cu controlere de joc, și un endgame final de 30 s cu sarcini bonus suplimentare. Echipele câștigă puncte prin manipularea elementelor tematice de joc și efectuarea sarcinilor opționale, respectând regulile de siguranță și corectitudine.',
    howGamesWorkTitle: 'Cum Funcționează Jocurile',
    centerstageGameDetails: 'În CenterStage (2023-24), terenul prezenta un pătrat de 12 ft cu dale de spumă și pereți de 1 ft înălțime. Două trusses și o ușă de scenă cu balamale traversau mijlocul terenului; fundalurile și zonele backstage erau în spate; aripile erau în colțurile din față. Roboții colectau pixeli hexagonali și îi plasau pe fundal, creează mozaicuri și lansează drone de hârtie peste truss în zonele de aterizare. Punctajul autonom includea plasarea pixelilor mov pe marcaje spike sau fundal, cu parcare backstage pentru puncte bonus.',
    intoTheDeepGameDetails: 'Into the Deep (2024-25) folosește un teren similar pătrat de 12 ft cu o structură centrală submersibilă care conține probe, cu trepte și camere joase și înalte. Coșuri înalte și joase stau în colțurile opuse, cu zone de plasă sub ele; zonele de observație ocupă celelalte colțuri. Roboții colectează probe din plastic și le plasează în zone de plasă sau coșuri (2-8 pct), în timp ce jucătorii umani pot atașa clipsuri la probe pentru a le transforma în specimene pentru punctaj în cameră (6-10 pct). Endgame-ul prezintă provocări de ascensiune submersibilă cu punctaj la nivel jos (15 pct) și nivel înalt (30 pct).',
    programmingChallengesTitle: 'Provocări de Programare',
    programmingChallenges: 'Resursele limitate au creat provocări semnificative de programare. În timpul CenterStage, echipa a folosit inițial un telefon Motorola G4 Play în loc de un Driver Hub dedicat. Când ambele controlere erau conectate, telefonul nu putea furniza suficientă energie, astfel încât doar un pilot putea controla în mod fiabil robotul. Problema a fost rezolvată folosind un telefon diferit (Nokia 5) cu livrare mai bună a energiei și redistribuirea sarcinilor între piloți. Fără sisteme de viziune sau senzori de distanță în niciun sezon, echipa s-a bazat în întregime pe rutine autonome bazate pe timp cu durări fixe pentru mișcări, uneori folosind putere redusă la final pentru a asigura poziționarea precisă.',
    lessonsLearnedTitle: 'Lecții Învățate & Creștere',
    lessonsLearned: 'Călătoria de două sezoane a Mechabyte demonstrează cum o echipă poate evolua prin persistență și ingeniozitate. În CenterStage, constrângerile de buget și hardware au forțat soluții creative precum hub-uri legate cu bride de plastic și o gheară asemănătoare cu un crab; redesign-urile iterative și un braț pantograf au permis plasarea fiabilă a pixelilor și lansarea dronelor. Până la Into the Deep, echipa a aplicat acele lecții pentru a simplifica mecanismele, a se concentra pe distribuția greutății și fiabilitate și a adopta îmbunătățiri imprimate 3D. Programarea a evoluat de la teleop de bază la rutine autonome multi-caz, demonstrând învățare și adaptare continuă.',
    futureOutlookTitle: 'Perspectiva Viitorului',
    futureOutlook: 'Privind înainte, integrarea ulterioară a senzorilor pentru navigarea autonomă ar putea îmbunătăți consistența punctajului, în timp ce sponsorizările corporative ar putea finanța motoare avansate și sisteme de viziune. Cu un plan de sustenabilitate care recrutează studenți mai tineri și suport de absolvenți, Mechabyte este bine poziționat pentru a-și continua creșterea și a îmbrățișa provocările FTC viitoare. Angajamentul echipei pentru profesionalismul grațios și implicarea comunitară asigură o fundație puternică pentru anii care vin.',
    
    // Outreach page
    outreachTitle: 'Implicare și Evenimente',
    outreachSubtitle: 'Implicare Comunitară și Parteneriate',
    outreachMission: 'Dincolo de construirea roboților, credem în construirea conexiunilor. Eforturile noastre de implicare urmăresc să inspire următoarea generație, să dăm înapoi comunității și să creăm parteneriate durabile care ne ajută să creștem.',
    outreachOriginTitle: 'Călătoria Noastră: Pornind de la Zero',
    outreachOriginStory: 'Pornind de la Zero: Când Mechabyte a fost înființată în septembrie 2023, nu aveam sponsori, nici finanțare, ci doar un vis de a construi roboți. Prima noastră provocare nu a fost proiectarea unui mecanism—ci cum să ne permitem piesele. În loc să renunțăm, ne-am retrousat mânecile și am devenit creativi. Am organizat vânzări de clătite la școală, seri de film și târguri de meșteșuguri. Fiecare 5.000 RON strânși din vânzarea clătitelor făcute în casă ne-a adus mai aproape de competiție. Această abordare populară ne-a învățat ingeniozitate, muncă în echipă și valoarea sprijinului comunitar. Ne-a arătat că nu ai nevoie de susținere corporativă pentru a începe—doar pasiune, determinare și oameni care cred în misiunea ta.',
    outreachSocialMediaTitle: 'Rețele Sociale și Prezență Digitală',
    outreachSocialMediaDesc: 'Prezența noastră pe rețelele sociale—Instagram, TikTok și Facebook—a devenit o parte vitală a strategiei noastre de implicare. Împărtășim regulat conținut din culise, actualizări despre construirea robotului, puncte culminante ale competițiilor și resurse educaționale STEM. Postările noastre celebrează nu doar realizările noastre, ci și cele ale altor echipe FTC din România. Ne implicăm activ cu comunitatea robotică prin comentarii, distribuiri și conținut colaborativ. Multe echipe recunosc acum Mechabyte la competiții datorită prezenței noastre online. Rețelele sociale ne-au ajutat să construim o rețea de susținere unde echipele schimbă idei, rezolvă împreună probleme și celebrează succesele—întruchipând spiritul profesionalismului grațios.',
    outreachTeamFriendshipsTitle: 'Prietenii și Colaborări între Echipe',
    outreachTeamFriendshipsDesc: 'Unul dintre cele mai gratifiante aspecte ale FTC au fost prieteniile pe care le-am construit cu alte echipe. La Festivalul Nikola Tesla și Winter Dive Meet, ne-am conectat cu echipe precum Phoenix Robotics, ByteForce și RoboMinds. Aceștia nu sunt doar competitori—sunt prieteni care împărtășesc strategii, împrumută unelte în timpul competițiilor și celebrează victoriile împreună. Am schimbat fișiere de design, am colaborat la evenimente de implicare și am organizat chiar sesiuni comune de practică. La EUROINVENT 2025 în Iași, am prezentat robotul nostru alături de echipe din toată Europa, învățând din abordările lor inovatoare. Aceste parteneriate ne amintesc că FTC nu este despre a-i învinge pe ceilalți—ci despre construirea unei comunități care îi ridică pe toți. Relațiile pe care le-am format se extind dincolo de competiții și au creat o rețea de sprijin care ne ajută pe toți să creștem.',
    outreachEventDetailTitle: 'Poveste Detaliată',
    
    centerstageEvents: [
      {
        name: 'Seară de Film',
        shortDescription: 'Eveniment de strângere de fonduri cu prezentarea robotului',
        fullDescription: 'Seara noastră anuală de film a reunit studenți, familii și membri ai comunității pentru o seară de divertisment și robotică. Am instalat robotul nostru CenterStage pentru demonstrații între proiecții, permițând participanților să vadă robotul în acțiune și să învețe despre FIRST Tech Challenge.',
        impact: 'Am strâns fonduri pentru echipă și am introdus peste 50 de membri ai comunității în robotica FTC. Mulți și-au exprimat interesul de a susține eforturile noastre viitoare.',
        date: 'Toamna 2023'
      },
      {
        name: 'Vânzare de Clătite',
        shortDescription: 'Am strâns ~5.000 RON',
        fullDescription: 'Membrii echipei au organizat o vânzare de clătite la școală, preparând și servind clătite făcute în casă pentru studenți, profesori și părinți. Acest efort de strângere de fonduri de la bază a necesitat coordonare, marketing prin social media și implicarea directă a tuturor membrilor echipei.',
        impact: 'Am generat aproximativ 5.000 RON (~€1.000) pentru a finanța piese de robot, taxe de competiție și materiale pentru echipă. Am construit unitatea echipei prin muncă colaborativă.',
        date: 'Iarna 2023-2024'
      },
      {
        name: 'Paradis Run',
        shortDescription: 'Participare la eveniment caritabil',
        fullDescription: 'Mechabyte a participat la Paradis Run anual, un eveniment caritabil organizat de școala noastră. Membrii echipei au alergat împreună purtând tricouri de echipă, promovând sănătatea, fitness-ul și spiritul școlar, ridicând în același timp gradul de conștientizare despre programul nostru de robotică.',
        impact: 'Am întărit legăturile cu comunitatea școlară și am crescut vizibilitatea echipei de robotică în rândul studenților și profesorilor. Mai mulți membri noi s-au alăturat după ce ne-au văzut la eveniment.',
        date: 'Primăvara 2024'
      },
      {
        name: 'Festivalul Nikola Tesla',
        shortDescription: 'Colaborare cu alte echipe',
        fullDescription: 'Am călătorit la Festivalul Nikola Tesla, o expoziție regională de știință și inovație. Lucrând alături de alte echipe FTC din România, am demonstrat robotul nostru, am împărtășit cunoștințe de inginerie și ne-am implicat cu sute de studenți interesați de domeniile STEM.',
        impact: 'Ne-am conectat cu alte 3 echipe FTC pentru a împărtăși cunoștințe și strategii. Am inspirat numeroși studenți să exploreze robotica și ingineria. Am stabilit relații de colaborare continuă.',
        date: 'Primăvara 2024'
      }
    ],
    
    intoTheDeepEvents: [
      {
        name: 'Winter Dive Meet',
        shortDescription: 'Am punctat în 3/6 meciuri la Iași',
        fullDescription: 'Prima noastră competiție oficială pentru sezonul Into the Deep a avut loc la Iași. Deși suntem o echipă tânără, am concurat în 6 meciuri de calificare, punctând cu succes în 3 dintre ele. Experiența a oferit lecții neprețuite în strategia de competiție, selecția alianțelor și profesionalismul grațios.',
        impact: 'Am câștigat experiență critică de competiție. Am identificat punctele slabe ale robotului, conducând la proiecte îmbunătățite. Am construit relații cu partenerii de alianță și echipele adversare.',
        date: 'Ianuarie 2025'
      },
      {
        name: 'STEMPOSSUM',
        shortDescription: 'Colaborare Robotică și IA',
        fullDescription: 'STEMPOSSUM este o inițiativă regională de educație STEM axată pe robotică și inteligență artificială. Am participat ca prezentatori invitați, demonstrând capacitățile robotului nostru, discutând procesul nostru de inginerie și conducând activități practice pentru studenții mai tineri interesați de programare și robotică.',
        impact: 'Am mentorat peste 40 de elevi de gimnaziu în programare de bază și design mecanic. Am poziționat Mechabyte ca lider în educația STEM regională.',
        date: 'Toamna 2024'
      },
      {
        name: 'UGAL Inventics',
        shortDescription: 'Am prezentat inovații',
        fullDescription: 'Competiția "Inventics" de la Universitatea Alexandru Ioan Cuza (UGAL) celebrează inovația studenților în multiple discipline. Am prezentat designul robotului nostru Into the Deep, evidențiind mecanisme unice precum sistemul nostru de stabilizare a lamelor și brațul telescopic. Juriul a inclus profesori universitari și profesioniști din industrie.',
        impact: 'Am primit recunoaștere pentru abordări inovatoare de design. Am făcut conexiuni cu departamentele de inginerie universitare pentru potențială mentorat și sponsorizare.',
        date: 'Noiembrie 2024'
      },
      {
        name: 'Târgul de Crăciun',
        shortDescription: 'Am strâns 2.000 RON din decorațiuni',
        fullDescription: 'Membrii echipei au creat manual decorațiuni de Crăciun, inclusiv ornamente, coroane și felicitări cu design-uri tematice robotice. Am amenajat un stand la târgul local de Crăciun, combinând spiritul sărbătorilor cu conștientizarea roboticii. Toate veniturile au mers direct la bugetul echipei.',
        impact: 'Am generat 2.000 RON (~€400) pentru cheltuielile echipei. Am demonstrat creativitate dincolo de abilitățile tehnice. Ne-am implicat cu peste 200 de vizitatori despre FTC.',
        date: 'Decembrie 2024'
      }
    ]
  }
};
