// Translation structure type
export type Translation = {
  // Navigation
  nav: {
    home: string;
    values: string;
    achievements: string;
    team: string;
    portfolio: string;
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
  };
  contactLabels: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
    tiktok: string;
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
  centerstageAutonomous: string;
  centerstageTeleOp: string;
  centerstageEndgame: string;
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
        description: 'Mechabyte 22590 was founded at Paradise International College, bringing together passionate students interested in robotics and STEM education.'
      },
      {
        year: '2024',
        title: 'First Robot Build',
        description: 'Completed our first competitive robot for the FTC INTO THE DEEP season, incorporating innovative designs in hardware and software.'
      },
      {
        year: '2024',
        title: 'Community Outreach Begins',
        description: 'Launched our first community outreach programs, including workshops at local schools to promote STEM education and robotics awareness.'
      },
      {
        year: '2024',
        title: 'Paradis Run Participation',
        description: 'Successfully organized and participated in the Paradis Run community event, promoting health and school spirit while raising awareness about our team.'
      },
      {
        year: '2024',
        title: 'Annual Movie Night',
        description: 'Hosted a successful school-wide movie night event that brought together students and families while showcasing our team and mission.'
      },
      {
        year: '2025',
        title: 'Iași Regional Meet',
        description: 'Participated in regional robotics meetup with other FTC teams in Iași, building valuable connections and sharing technical knowledge.'
      },
      {
        year: '2025',
        title: 'Books and Sweets Initiative',
        description: 'Launched community outreach initiative distributing books and sweets to local children, combining education and joy in our community.'
      },
      {
        year: '2025',
        title: 'FTC Regional Competition',
        description: 'Competed in FTC Regionals 2025, representing Paradise International College and demonstrating our technical capabilities and gracious professionalism.'
      },
      {
        year: 'Ongoing',
        title: 'STEM Workshops',
        description: 'Regularly hosting robotics workshops for middle-school students, inspiring the next generation of engineers and problem-solvers.'
      },
      {
        year: 'Ongoing',
        title: 'Technical Development',
        description: 'Continuous improvement of our robot design, programming, and team processes through regular meetings, testing, and iteration.'
      }
    ],

    teamTitle: 'Meet Our Team',
    teamIntro: 'New season, fresh leaders, continuing legacy.',
    technicalTeamTitle: 'Technical Team',
    nonTechnicalTeamTitle: 'Non-Technical Team',
    mentorsTitle: 'Mentors',
    alumniTitle: 'Alumni',
    collaborationTitle: 'Collaboration Across Departments',
    teamCollaboration: 'Our team operates on the principle of collaboration across all departments. Technical and non-technical members work closely together, recognizing that success in FTC requires both engineering excellence and effective communication, marketing, and outreach. Regular team meetings ensure everyone stays informed and aligned with our goals, while sub-team sessions allow specialists to dive deep into their areas of expertise.',
    trainingTitle: 'Training New Members',
    teamTraining: 'Training new members is a priority at Mechabyte. We provide comprehensive onboarding that includes technical workshops, team culture introduction, and hands-on experience with our robot and tools. Experienced members mentor newcomers, creating a supportive environment where everyone can grow. We believe in learning by doing, so new members quickly become involved in real projects where they can apply their skills and gain confidence.',
    teamEnvironmentTitle: 'Team Environment',
    teamEnvironment: 'We foster an inclusive and supportive environment where every team member feels valued and empowered to contribute. Our culture emphasizes gracious professionalism, encouraging members to help each other, celebrate successes together, and learn from setbacks as a team. Beyond robotics, we build lasting friendships and develop life skills like time management, leadership, and effective communication that will serve our members well beyond their time with Mechabyte.',

    sponsorsTitle: 'Our Sponsors',
    sponsorsIntro: 'Partner with Mechabyte — strengthen local STEM, gain tax benefits and connect with bright talent.',
    currentSponsorsTitle: 'Current Sponsors',
    sponsorshipImpactTitle: 'How Sponsorships Help',
    sponsorshipImpact: [
      'Equipment & Materials: Sponsorships fund the purchase of motors, sensors, structural components, and other materials needed to build and improve our robot throughout the season.',
      'Competition Fees & Travel: Support covers registration fees for competitions and travel expenses to regional and potentially national tournaments.',
      'Tools & Workspace: Contributions help us maintain our workshop with necessary tools, safety equipment, and workspace improvements.',
      'Outreach Programs: Funding enables us to conduct community workshops, purchase materials for demonstrations, and expand our impact in promoting STEM education.',
      'Professional Development: Sponsorships support team training, including workshops, technical resources, and learning materials that enhance our skills.',
      'Team Operations: Support covers operational costs such as team uniforms, marketing materials, website hosting, and communication tools.'
    ],
    whySponsorTitle: 'Why Sponsor Mechabyte?',
    whySponsorPoints: [
      'Support STEM education and inspire young innovators in Romania, contributing to the development of the next generation of engineers and problem-solvers',
      'Gain visibility at regional and international robotics competitions, with your logo displayed on our robot, banners, and team materials',
      'Associate your brand with innovation, technology, and education, demonstrating commitment to future workforce development',
      'Invest in the future workforce and next generation of engineers, with potential access to talented students for internships and recruitment',
      'Demonstrate corporate social responsibility and community engagement, making a tangible impact on youth development in Iași',
      'Access to talented students for internships and recruitment opportunities, connecting with motivated individuals passionate about technology'
    ],
    becomeSponsorTitle: 'Become a Sponsor',
    becomeSponsorText: 'Join us in empowering the next generation of innovators. Your support will help us continue developing technical skills, competing at the highest level, and inspiring our community through STEM education.',

    supportTitle: 'Support Our Mission',
    supportIntro: 'There are many ways to support Mechabyte and contribute to STEM education in our community. Whether through financial sponsorship, volunteer time, equipment donations, or mentorship, your support makes a real difference.',
    sponsorBenefitsTitle: 'Sponsorship Benefits',
    sponsorBenefits: [
      'Logo placement on team robot, banners, and competition materials with prominent visibility at events',
      'Recognition on our website and social media platforms, reaching our community and followers',
      'Mentions in press releases and media coverage related to our competitions and achievements',
      'Invitation to team demonstrations and competition events, with opportunities to interact with team members',
      'Opportunity to engage with students and showcase your organization through workshops or facility tours',
      'Tax-deductible contribution supporting education, with documentation provided for tax purposes'
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
      tiktok: 'https://www.tiktok.com/@mechabyte22590'
    },
    contactLabels: {
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      instagram: 'Instagram',
      tiktok: 'TikTok'
    },
    followUsTitle: 'Follow Us',
    scheduleDemoTitle: 'Schedule a Demo',
    scheduleDemo: 'Interested in seeing our robot in action? We regularly conduct demonstrations for schools, organizations, and community groups. Contact us to schedule a visit or invite us to your event. Our team is excited to share our passion for robotics and inspire others to explore STEM fields.',
    stayConnectedTitle: 'Stay Connected',
    connectWithUs: 'Follow us on social media to stay updated on our progress, competitions, and community activities. We regularly share behind-the-scenes content, technical updates, and stories from our team members. Join our community and be part of our robotics journey!',

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
    centerstageAutonomous: 'Robot starts with a pre-loaded pixel in the intake claw. No odometry is used; all movements are based on timing. We have two main starting positions: backstage-facing (drive straight to park and drop pixel) and audience-facing (drive forward to tile C2, then sideways to backstage).',
    centerstageTeleOp: 'Drivers navigate through the truss or stage door to collect pixels from stacks or the human station. We deliver one pixel at a time to the backdrop. If a pixel falls in backstage, we leave it and fetch another. Our goal is to form mosaics and cross lines on the backdrop for bonus points.',
    centerstageEndgame: 'We continue scoring pixels for 15-20 seconds, then launch the drone and park in backstage for additional points.',
    intoTheDeepTeleOp: 'We navigate to pick up one sample at a time from the field or submersible. Samples are placed in the highest basket in the net zone. If a sample falls, we abandon it and fetch a new one to maximize scoring efficiency.',
    intoTheDeepEndgame: 'We continue scoring in the high basket until the final seconds, then launch the drone and park in the net zone for maximum points.',

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
    
    // Additional labels
    firstVersionLabel: 'First Version',
    upgradeAttemptsLabel: 'Upgrade Attempts',
    currentVersionLabel: 'Current Version',
    constructionImprovementsLabel: 'Construction Improvements',
    autonomousApproachLabel: 'Autonomous Approach',
    ourGoalsLabel: 'Our Goals',
    ourGoalsText: 'We implement STEM core values—responsibility, compassion, and perseverance—as we constantly improve our capabilities. Our mission is to inspire future generations to follow their dreams in science, technology, engineering, and mathematics while building a strong, collaborative team that exemplifies gracious professionalism.',
    sustainabilityGrowthLabel: 'Sustainability & Growth',
    sustainabilityGrowthText: 'Early seasons relied heavily on fundraising events like pancake sales, biscuit sales, and decorations at Christmas markets. Now, with two full FTC seasons of experience and solid competition results, we can better present our achievements to potential sponsors. Our sustainability plan includes recruiting and training younger students, maintaining an alumni support network, partnering with corporations that share our values, and careful budgeting with categories for equipment expenditure and emergency funds.',
    contactUsLabel: 'Contact Us'
  },

  ro: {
    nav: {
      home: 'Acasă',
      values: 'Valori',
      achievements: 'Realizări',
      team: 'Echipă',
      portfolio: 'Portofoliu',
      sponsors: 'Sponsori',
      support: 'Susține',
      contact: 'Contact'
    },

    homeTitle: 'Bine ați venit la Mechabyte',
    homeWelcome: 'Inovăm Viitorul Prin Robotică',
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
    ftcDescription: 'FIRST Tech Challenge (FTC) este o competiție globală de robotică pentru studenți cu vârste între 12-18 ani. Echipele proiectează, construiesc, programează și concurează cu roboți pentru a completa provocări pe un teren de 12x12 picioare. FTC promovează educația STEM, munca în echipă și profesionalismul grațios, pregătind studenții pentru cariere viitoare în tehnologie și inginerie. Fiecare sezon prezintă o nouă provocare de joc care testează atât abilitățile tehnice, cât și gândirea strategică, necesitând ca echipele să lucreze împreună pentru a rezolva probleme complexe.',
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
        description: 'Mechabyte 22590 a fost înființată la Paradise International College, reunind studenți pasionați de robotică și educație STEM.'
      },
      {
        year: '2024',
        title: 'Prima Construcție de Robot',
        description: 'Am finalizat primul nostru robot competitiv pentru sezonul FTC INTO THE DEEP, încorporând design-uri inovatoare în hardware și software.'
      },
      {
        year: '2024',
        title: 'Începutul Outreach-ului Comunitar',
        description: 'Am lansat primele noastre programe de outreach comunitar, incluzând workshop-uri la școlile locale pentru a promova educația STEM și conștientizarea roboticii.'
      },
      {
        year: '2024',
        title: 'Participarea la Paradis Run',
        description: 'Am organizat și participat cu succes la evenimentul comunitar Paradis Run, promovând sănătatea și spiritul școlar în timp ce creștem gradul de conștientizare despre echipa noastră.'
      },
      {
        year: '2024',
        title: 'Seara Anuală de Film',
        description: 'Am găzduit un eveniment de succes la nivel de școală care a reunit studenți și familii, prezentând echipa și misiunea noastră.'
      },
      {
        year: '2025',
        title: 'Întâlnirea Regională Iași',
        description: 'Am participat la întâlnirea regională de robotică cu alte echipe FTC din Iași, construind conexiuni valoroase și schimbând cunoștințe tehnice.'
      },
      {
        year: '2025',
        title: 'Inițiativa Cărți și Dulciuri',
        description: 'Am lansat inițiativa de outreach comunitar distribuind cărți și dulciuri copiilor locali, combinând educația și bucuria în comunitatea noastră.'
      },
      {
        year: '2025',
        title: 'Competiția Regională FTC',
        description: 'Am concurat în FTC Regionals 2025, reprezentând Paradise International College și demonstrând capacitățile noastre tehnice și profesionalismul grațios.'
      },
      {
        year: 'În derulare',
        title: 'Workshop-uri STEM',
        description: 'Găzduim regulat workshop-uri de robotică pentru elevi de gimnaziu, inspirând următoarea generație de ingineri și soluționatori de probleme.'
      },
      {
        year: 'În derulare',
        title: 'Dezvoltare Tehnică',
        description: 'Îmbunătățirea continuă a designului robotului, programării și proceselor echipei prin întâlniri regulate, testare și iterație.'
      }
    ],

    teamTitle: 'Cunoaște Echipa Noastră',
    teamIntro: 'Sezon nou, lideri proaspeți, moștenire continuă.',
    technicalTeamTitle: 'Echipa Tehnică',
    nonTechnicalTeamTitle: 'Echipa Non-Tehnică',
    mentorsTitle: 'Mentori',
    alumniTitle: 'Alumni',
    collaborationTitle: 'Colaborare Între Departamente',
    teamCollaboration: 'Echipa noastră operează pe principiul colaborării între toate departamentele. Membrii tehnici și non-tehnici lucrează îndeaproape împreună, recunoscând că succesul în FTC necesită atât excelență în inginerie, cât și comunicare eficientă, marketing și outreach. Întâlnirile regulate ale echipei asigură că toată lumea rămâne informată și aliniată cu obiectivele noastre, în timp ce sesiunile sub-echipelor permit specialiștilor să aprofundeze în domeniile lor de expertiză.',
    trainingTitle: 'Instruirea Noilor Membri',
    teamTraining: 'Instruirea noilor membri este o prioritate la Mechabyte. Oferim un onboarding cuprinzător care include workshop-uri tehnice, introducere în cultura echipei și experiență practică cu robotul și uneltele noastre. Membrii experimentați îndrumă noii veniți, creând un mediu de susținere în care toată lumea poate crește. Credem în învățarea prin practică, astfel încât noii membri se implică rapid în proiecte reale unde pot aplica abilitățile lor și câștiga încredere.',
    teamEnvironmentTitle: 'Mediul Echipei',
    teamEnvironment: 'Promovăm un mediu incluziv și de susținere în care fiecare membru al echipei se simte valorizat și împuternicit să contribuie. Cultura noastră subliniază profesionalismul grațios, încurajând membrii să se ajute reciproc, să sărbătorească succesele împreună și să învețe din eșecuri ca o echipă. Dincolo de robotică, construim prietenii durabile și dezvoltăm abilități de viață precum managementul timpului, leadershipul și comunicarea eficientă care vor servi membrii noștri mult după timpul lor cu Mechabyte.',

    sponsorsTitle: 'Sponsorii Noștri',
    sponsorsIntro: 'Partener cu Mechabyte — întărește STEM-ul local, obține beneficii fiscale și conectează-te cu talente strălucitoare.',
    currentSponsorsTitle: 'Sponsori Actuali',
    sponsorshipImpactTitle: 'Cum Ajută Sponsorizările',
    sponsorshipImpact: [
      'Echipament și Materiale: Sponsorizările finanțează achiziționarea de motoare, senzori, componente structurale și alte materiale necesare pentru a construi și îmbunătăți robotul nostru pe parcursul sezonului.',
      'Taxe de Competiție și Călătorie: Susținerea acoperă taxele de înregistrare pentru competiții și cheltuielile de călătorie la turnee regionale și potențial naționale.',
      'Unelte și Spațiu de Lucru: Contribuțiile ne ajută să menținem atelierul nostru cu unelte necesare, echipament de siguranță și îmbunătățiri ale spațiului de lucru.',
      'Programe de Outreach: Finanțarea ne permite să desfășurăm workshop-uri comunitare, să achiziționăm materiale pentru demonstrații și să extindem impactul nostru în promovarea educației STEM.',
      'Dezvoltare Profesională: Sponsorizările susțin instruirea echipei, incluzând workshop-uri, resurse tehnice și materiale de învățare care ne îmbunătățesc abilitățile.',
      'Operațiuni ale Echipei: Susținerea acoperă costurile operaționale precum uniforme de echipă, materiale de marketing, găzduire site web și instrumente de comunicare.'
    ],
    whySponsorTitle: 'De Ce Să Sponsorizați Mechabyte?',
    whySponsorPoints: [
      'Susțineți educația STEM și inspirați tineri inovatori din România, contribuind la dezvoltarea următorei generații de ingineri și soluționatori de probleme',
      'Obțineți vizibilitate la competiții regionale și internaționale de robotică, cu logo-ul dumneavoastră afișat pe robotul nostru, bannere și materiale ale echipei',
      'Asociați brandul dumneavoastră cu inovația, tehnologia și educația, demonstrând angajamentul față de dezvoltarea forței de muncă viitoare',
      'Investiți în forța de muncă viitoare și următoarea generație de ingineri, cu acces potențial la studenți talentați pentru stagii și recrutare',
      'Demonstrați responsabilitate socială corporativă și implicare comunitară, având un impact tangibil asupra dezvoltării tinerilor din Iași',
      'Acces la studenți talentați pentru stagii și oportunități de recrutare, conectându-vă cu persoane motivate pasionate de tehnologie'
    ],
    becomeSponsorTitle: 'Deveniți Sponsor',
    becomeSponsorText: 'Alăturați-vă nouă în împuternicirea următorei generații de inovatori. Susținerea dumneavoastră ne va ajuta să continuăm să dezvoltăm abilități tehnice, să concurăm la cel mai înalt nivel și să inspirăm comunitatea noastră prin educația STEM.',

    supportTitle: 'Susține Misiunea Noastră',
    supportIntro: 'Există multe modalități de a susține Mechabyte și de a contribui la educația STEM în comunitatea noastră. Fie prin sponsorizare financiară, timp voluntar, donații de echipamente sau mentorat, susținerea dumneavoastră face o diferență reală.',
    sponsorBenefitsTitle: 'Beneficiile Sponsorilor',
    sponsorBenefits: [
      'Plasarea logo-ului pe robotul echipei, bannere și materiale de competiție cu vizibilitate proeminentă la evenimente',
      'Recunoaștere pe site-ul nostru web și platformele de social media, ajungând la comunitatea și urmăritorii noștri',
      'Mențiuni în comunicatele de presă și acoperirea media legată de competițiile și realizările noastre',
      'Invitație la demonstrații ale echipei și evenimente de competiție, cu oportunități de a interacționa cu membrii echipei',
      'Oportunitatea de a interacționa cu studenții și de a prezenta organizația dumneavoastră prin workshop-uri sau tururi ale facilității',
      'Contribuție deductibilă fiscal care susține educația, cu documentație furnizată în scopuri fiscale'
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
      tiktok: 'https://www.tiktok.com/@mechabyte22590'
    },
    contactLabels: {
      email: 'Email',
      phone: 'Telefon',
      address: 'Adresă',
      instagram: 'Instagram',
      tiktok: 'TikTok'
    },
    followUsTitle: 'Urmăriți-ne',
    scheduleDemoTitle: 'Programați o Demonstrație',
    scheduleDemo: 'Interesați să vedeți robotul nostru în acțiune? Desfășurăm regulat demonstrații pentru școli, organizații și grupuri comunitare. Contactați-ne pentru a programa o vizită sau invitați-ne la evenimentul dumneavoastră. Echipa noastră este entuziasmată să împărtășească pasiunea noastră pentru robotică și să inspire pe alții să exploreze domeniile STEM.',
    stayConnectedTitle: 'Rămâneți Conectați',
    connectWithUs: 'Urmăriți-ne pe social media pentru a rămâne la curent cu progresul nostru, competițiile și activitățile comunitare. Împărtășim regulat conținut din culise, actualizări tehnice și povești de la membrii echipei noastre. Alăturați-vă comunității noastre și fiți parte din călătoria noastră robotică!',

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
    centerstageAutonomous: 'Robotul pornește cu un pixel pre-încărcat în gheara de colectare. Nu folosim odometrie; toate mișcările sunt bazate pe timp. Avem două poziții principale de pornire: față către backstage (mers drept pentru parcare și eliberare pixel) și față către public (mers înainte către tile C2, apoi lateral către backstage).',
    centerstageTeleOp: 'Șoferii navighează prin truss sau ușa scenei pentru a colecta pixeli de la stive sau stația umană. Livrăm câte un pixel pe rând către backdrop. Dacă un pixel cade în backstage, îl lăsăm și luăm altul. Scopul nostru este să formăm mozaicuri și să traversăm linii pe backdrop pentru puncte bonus.',
    centerstageEndgame: 'Continuăm să marcăm pixeli timp de 15-20 secunde, apoi lansăm drona și parcăm în backstage pentru puncte suplimentare.',
    intoTheDeepTeleOp: 'Navigăm pentru a lua câte o mostră pe rând de pe teren sau din submersibil. Mostrele sunt plasate în coșul cel mai înalt din zona de plasă. Dacă o mostră cade, o abandonăm și luăm una nouă pentru a maximiza eficiența punctajului.',
    intoTheDeepEndgame: 'Continuăm să marcăm în coșul înalt până în ultimele secunde, apoi lansăm drona și parcăm în zona de plasă pentru puncte maxime.',

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
    sustainabilityGrowthLabel: 'Sustenabilitate și Creștere',
    sustainabilityGrowthText: 'Sezoanele timpurii s-au bazat în mare măsură pe evenimente de strângere de fonduri precum vânzări de clătite, biscuiți și decorațiuni la târgurile de Crăciun. Acum, cu două sezoane complete FTC de experiență și rezultate solide în competiție, putem prezenta mai bine realizările noastre sponsorilor potențiali. Planul nostru de sustenabilitate include recrutarea și instruirea studenților mai tineri, menținerea unei rețele de suport a absolvenților, parteneriate cu corporații care împărtășesc valorile noastre și bugetare atentă cu categorii pentru cheltuieli de echipament și fonduri de urgență.',
    contactUsLabel: 'Contactați-ne'
  }
};
