// Translation structure type
export type Translation = {
  // Navigation
  nav: {
    home: string;
    values: string;
    achievements: string;
    team: string;
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
};

// Translations object with English and Romanian content
export const translations: { en: Translation; ro: Translation } = {
  en: {
    nav: {
      home: 'Home',
      values: 'Values',
      achievements: 'Achievements',
      team: 'Team',
      sponsors: 'Sponsors',
      support: 'Support',
      contact: 'Contact'
    },

    homeTitle: 'Welcome to Mechabyte',
    homeWelcome: 'Innovating the Future Through Robotics',
    aboutTitle: 'About Us',
    aboutText: 'Mechabyte is a passionate robotics team from Paradise International College in Iași, Romania, competing in the FIRST Tech Challenge (FTC). We are a diverse group of students dedicated to innovation, teamwork, and community engagement. Our team brings together technical expertise in programming, engineering, and CAD design with creative skills in marketing, outreach, and design to create competitive robots while making a positive impact in our community.',
    missionTitle: 'Our Mission',
    missionItems: [
      'Promote STEM education and robotics in our community through workshops and demonstrations',
      'Develop technical skills in programming, engineering, and design while fostering innovation',
      'Foster teamwork, leadership, and problem-solving abilities in a collaborative environment',
      'Inspire the next generation of innovators and engineers through outreach programs',
      'Represent Romania on the international FTC stage with excellence and dedication',
      'Build lasting partnerships with sponsors, mentors, and the local community'
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
    valuesIntro: 'At Mechabyte, we are guided by fundamental principles that shape how we work, compete, and contribute to our community. These values define our identity and drive our pursuit of excellence.',
    valuesList: [
      {
        title: 'Innovation',
        description: 'We constantly push boundaries and explore creative solutions to engineering challenges, embracing new technologies and methodologies to improve our robot and processes.'
      },
      {
        title: 'Teamwork',
        description: 'We believe in the power of collaboration, where diverse skills and perspectives come together to achieve goals that would be impossible individually.'
      },
      {
        title: 'Integrity',
        description: 'We maintain the highest standards of honesty and ethical behavior in all our activities, from competition to community outreach, upholding gracious professionalism.'
      },
      {
        title: 'Excellence',
        description: 'We strive for the highest quality in everything we do, continuously improving our technical skills, team dynamics, and community impact.'
      },
      {
        title: 'Community',
        description: 'We are committed to making a positive impact beyond our team, sharing our passion for STEM with others and building lasting connections in our community.'
      },
      {
        title: 'Learning',
        description: 'We embrace every challenge as an opportunity to grow, fostering a culture where questions are encouraged and mistakes are viewed as valuable learning experiences.'
      }
    ],
    ambassadorRoleTitle: 'Team Ambassador Role',
    ambassadorStatement: 'Members represent not only the team but also the educational organisation and the Nație prin Educație programme, acting as ambassadors for STEM education, innovation, and gracious professionalism in all their interactions.',
    valuesClosing: 'These values guide our daily work, from designing and building our robot to engaging with sponsors and conducting outreach programs. They remind us that success in FTC is measured not just by competition results, but by the positive impact we make on each other and our community.',

    achievementsTitle: 'Our Journey',
    achievementsIntro: 'Since our inception, Mechabyte has been making strides in robotics competition and community engagement. Here are the milestones that have shaped our team:',
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
    teamIntro: 'Mechabyte is powered by dedicated students who bring diverse skills and perspectives to create something extraordinary. Our team combines technical expertise with creativity and passion.',
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
    sponsorsIntro: 'Mechabyte is grateful for the generous support of our sponsors who make our participation in FTC possible. Their contributions enable us to acquire materials, tools, and equipment necessary for building competitive robots and conducting community outreach.',
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
      phone: '+40 743 173 583',
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
    featureInnovationDesc: 'Building cutting-edge robotic solutions with modern technology and creative problem-solving.',
    featureEngineeringTitle: 'Engineering Excellence',
    featureEngineeringDesc: 'Precision engineering and design thinking applied to every mechanical and software component.',
    featureTeamworkTitle: 'Teamwork',
    featureTeamworkDesc: 'Collaborative environment where diverse skills come together to achieve common goals.',
    featureCompetitionTitle: 'Competition Ready',
    featureCompetitionDesc: 'Preparing for FTC competitions with rigorous testing, iteration, and strategic planning.'
  },

  ro: {
    nav: {
      home: 'Acasă',
      values: 'Valori',
      achievements: 'Realizări',
      team: 'Echipă',
      sponsors: 'Sponsori',
      support: 'Susține',
      contact: 'Contact'
    },

    homeTitle: 'Bine ați venit la Mechabyte',
    homeWelcome: 'Inovăm Viitorul Prin Robotică',
    aboutTitle: 'Despre Noi',
    aboutText: 'Mechabyte este o echipă pasionată de robotică de la Paradise International College din Iași, România, care participă la FIRST Tech Challenge (FTC). Suntem un grup divers de studenți dedicați inovației, muncii în echipă și implicării comunitare. Echipa noastră reunește expertiza tehnică în programare, inginerie și design CAD cu abilități creative în marketing, outreach și design pentru a crea roboți competitivi, având în același timp un impact pozitiv în comunitatea noastră.',
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
    valuesIntro: 'La Mechabyte, suntem ghidați de principii fundamentale care modelează modul în care lucrăm, concurăm și contribuim la comunitatea noastră. Aceste valori definesc identitatea noastră și conduc căutarea noastră a excelenței.',
    valuesList: [
      {
        title: 'Inovație',
        description: 'Împingem constant limitele și explorăm soluții creative la provocările de inginerie, îmbrățișând tehnologii și metodologii noi pentru a îmbunătăți robotul și procesele noastre.'
      },
      {
        title: 'Muncă în echipă',
        description: 'Credem în puterea colaborării, unde abilități și perspective diverse se unesc pentru a atinge obiective care ar fi imposibile individual.'
      },
      {
        title: 'Integritate',
        description: 'Menținem cele mai înalte standarde de onestitate și comportament etic în toate activitățile noastre, de la competiție la outreach comunitar, susținând profesionalismul grațios.'
      },
      {
        title: 'Excelență',
        description: 'Ne străduim pentru cea mai înaltă calitate în tot ce facem, îmbunătățind continuu abilitățile noastre tehnice, dinamica echipei și impactul comunitar.'
      },
      {
        title: 'Comunitate',
        description: 'Suntem dedicați să avem un impact pozitiv dincolo de echipa noastră, împărtășind pasiunea noastră pentru STEM cu alții și construind conexiuni durabile în comunitatea noastră.'
      },
      {
        title: 'Învățare',
        description: 'Îmbrățișăm fiecare provocare ca o oportunitate de a crește, promovând o cultură în care întrebările sunt încurajate și greșelile sunt văzute ca experiențe valoroase de învățare.'
      }
    ],
    ambassadorRoleTitle: 'Rolul de Ambasador al Echipei',
    ambassadorStatement: 'Membrii reprezintă nu doar echipa, ci și organizația educațională și programul Nație prin Educație, acționând ca ambasadori pentru educația STEM, inovație și profesionalism grațios în toate interacțiunile lor.',
    valuesClosing: 'Aceste valori ghidează munca noastră zilnică, de la proiectarea și construirea robotului nostru până la implicarea cu sponsorii și desfășurarea programelor de outreach. Ne amintesc că succesul în FTC este măsurat nu doar prin rezultatele competiției, ci prin impactul pozitiv pe care îl avem unul asupra celuilalt și asupra comunității noastre.',

    achievementsTitle: 'Călătoria Noastră',
    achievementsIntro: 'De la înființarea noastră, Mechabyte a făcut progrese în competiția de robotică și implicarea comunitară. Iată momentele cheie care au modelat echipa noastră:',
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
    teamIntro: 'Mechabyte este alimentat de studenți dedicați care aduc abilități și perspective diverse pentru a crea ceva extraordinar. Echipa noastră combină expertiza tehnică cu creativitatea și pasiunea.',
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
    sponsorsIntro: 'Mechabyte este recunoscător pentru susținerea generoasă a sponsorilor noștri care fac posibilă participarea noastră în FTC. Contribuțiile lor ne permit să achiziționăm materiale, unelte și echipamente necesare pentru construirea de roboți competitivi și desfășurarea outreach-ului comunitar.',
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
      phone: '0743 173 583',
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
    featureInnovationDesc: 'Construim soluții robotice de ultimă generație cu tehnologie modernă și rezolvare creativă a problemelor.',
    featureEngineeringTitle: 'Excelență în Inginerie',
    featureEngineeringDesc: 'Inginerie de precizie și gândire de design aplicate fiecărei componente mecanice și software.',
    featureTeamworkTitle: 'Muncă în Echipă',
    featureTeamworkDesc: 'Mediu colaborativ în care abilități diverse se unesc pentru a atinge obiective comune.',
    featureCompetitionTitle: 'Pregătit pentru Competiție',
    featureCompetitionDesc: 'Pregătire pentru competițiile FTC cu testare riguroasă, iterație și planificare strategică.'
  }
};
