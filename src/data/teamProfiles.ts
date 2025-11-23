import type { TeamMemberProfile } from '../components/TeamMemberPopup.vue';

export const teamProfiles: Record<string, TeamMemberProfile> = {
  // 2025-2026 Season - Current Team
  'Ianis Cotoc': {
    name: 'Ianis Cotoc',
    role: 'Team Leader',
    department: 'Technical',
    bio: 'Leading the technical team with vision and determination. Ianis brings three years of robotics experience and a passion for innovation.',
    philosophy: 'Great robots are built by great teams. Leadership is about empowering every member to contribute their best work.',
    skills: [
      'Team leadership and project management',
      'Advanced robot design and CAD modeling',
      'Java programming and autonomous systems',
      'Strategic planning and problem solving'
    ],
    beliefs: [
      'Continuous improvement through iteration',
      'Empowering team members to lead',
      'Learning from every competition'
    ],
    contributions: [
      'Led the transition to advanced mecanum drive systems',
      'Mentored junior members in programming and design',
      'Coordinated successful competition strategies',
      'Improved team workflow and collaboration processes'
    ]
  },

  'David Grigore': {
    name: 'David Grigore',
    role: 'Senior Design',
    department: 'Technical',
    bio: 'Senior designer with expertise in CAD and mechanical systems. David has been instrumental in creating innovative robot mechanisms.',
    philosophy: 'Design is not just how it looks, but how it works. Every component should have a purpose and function beautifully.',
    skills: [
      'Advanced CAD design (SolidWorks, Fusion 360)',
      'Mechanical engineering principles',
      '3D printing and rapid prototyping',
      'Structural analysis and optimization'
    ],
    beliefs: [
      'Form follows function in robot design',
      'Iterative design leads to perfection',
      'Simplicity is the ultimate sophistication'
    ],
    contributions: [
      'Designed the innovative pantograph arm for CenterStage',
      'Created custom 3D-printed components for optimization',
      'Pioneered the mecanum chassis design',
      'Mentored new members in CAD software'
    ]
  },

  'Ștefan Albu': {
    name: 'Ștefan Albu',
    role: 'Senior Design',
    department: 'Technical',
    bio: 'Design specialist focused on precision and reliability. Ștefan excels at creating robust mechanical systems.',
    philosophy: 'Reliability is non-negotiable. A robot that works 99% of the time still fails when it matters most.',
    skills: [
      'Precision mechanical design',
      'CAD modeling and technical drawing',
      'Material selection and testing',
      'Quality assurance and testing protocols'
    ],
    beliefs: [
      'Quality over speed in design',
      'Testing validates every decision',
      'Details make the difference in competition'
    ],
    contributions: [
      'Developed stress-tested mounting systems',
      'Improved robot durability through design refinements',
      'Created standardized design documentation',
      'Reduced component failure rates significantly'
    ]
  },

  'Alexia Vancea': {
    name: 'Alexia Vancea',
    role: 'Senior',
    department: 'Technical',
    bio: 'Versatile team member bridging technical and non-technical roles. Alexia combines marketing expertise with technical understanding.',
    philosophy: 'Technology should be accessible and exciting. Great engineering deserves great storytelling.',
    skills: [
      'Social media and content creation',
      'Technical documentation',
      'Photography and videography',
      'Cross-team communication'
    ],
    beliefs: [
      'STEM should be fun and engaging',
      'Every team member has unique value',
      'Sharing knowledge multiplies success'
    ],
    contributions: [
      'Created compelling social media presence',
      'Documented robot development process',
      'Bridged communication between technical and marketing teams',
      'Organized successful fundraising campaigns'
    ]
  },

  'Teodor Matricală': {
    name: 'Teodor Matricală',
    role: 'Senior',
    department: 'Technical',
    bio: 'Programming and systems integration specialist. Teodor focuses on making all components work together seamlessly.',
    philosophy: 'The whole is greater than the sum of its parts. Integration is where magic happens.',
    skills: [
      'Java programming',
      'Robot control systems',
      'Sensor integration',
      'Debugging and troubleshooting'
    ],
    beliefs: [
      'Code should be clean and maintainable',
      'Testing catches problems before competition',
      'Good communication prevents integration issues'
    ],
    contributions: [
      'Developed timing-based autonomous routines',
      'Integrated complex sensor systems',
      'Created reusable code libraries',
      'Improved robot response time and reliability'
    ]
  },

  'Catrinel Bănuță': {
    name: 'Catrinel Bănuță',
    role: 'Junior',
    department: 'Technical',
    bio: 'Enthusiastic first-year member eager to learn and contribute. Catrinel brings fresh perspectives and determination.',
    philosophy: 'Every expert was once a beginner. Learning never stops, and mistakes are opportunities to grow.',
    skills: [
      'Basic programming concepts',
      'Hardware assembly',
      'Problem-solving mindset',
      'Quick learner and adaptable'
    ],
    beliefs: [
      'Asking questions leads to understanding',
      'Hands-on experience is the best teacher',
      'Persistence overcomes obstacles'
    ],
    contributions: [
      'Assisted in robot assembly and testing',
      'Learning Java and contributing to codebase',
      'Helped with competition logistics',
      'Brings enthusiasm and fresh ideas'
    ]
  },

  'Rareș Berheci': {
    name: 'Rareș Berheci',
    role: 'Junior',
    department: 'Technical',
    bio: 'New team member with a passion for robotics and technology. Rareș is building skills rapidly.',
    philosophy: 'Start small, think big. Every journey begins with a single step.',
    skills: [
      'Basic electronics knowledge',
      'Mechanical assembly',
      'Logical thinking',
      'Teamwork and collaboration'
    ],
    beliefs: [
      'Practice makes perfect',
      'Learn from seniors and mentors',
      'Contribute wherever possible'
    ],
    contributions: [
      'Assisted in robot build sessions',
      'Learning programming fundamentals',
      'Supported team logistics',
      'Eager to take on new challenges'
    ]
  },

  'Alexandra Maftei': {
    name: 'Alexandra Maftei',
    role: 'Team Leader',
    department: 'Non-Technical',
    bio: 'Marketing and outreach leader with exceptional organizational skills. Alexandra ensures the team\'s story reaches the community.',
    philosophy: 'Impact is measured not just by what we build, but by who we inspire and the communities we serve.',
    skills: [
      'Marketing strategy and campaigns',
      'Event planning and coordination',
      'Sponsor relations and fundraising',
      'Team coordination and leadership'
    ],
    beliefs: [
      'Outreach creates lasting impact',
      'Every interaction builds our brand',
      'Sponsorships are partnerships'
    ],
    contributions: [
      'Secured multiple sponsorships totaling 7,000+ RON',
      'Organized successful fundraising events',
      'Led community outreach initiatives',
      'Built strong relationships with sponsors and partners'
    ]
  },

  'Veronika Glazkova': {
    name: 'Veronika Glazkova',
    role: 'Senior',
    department: 'Non-Technical',
    bio: 'Marketing specialist with creative vision. Veronika creates compelling content that tells the team\'s story.',
    philosophy: 'Creativity connects hearts and minds. Our story deserves to be told beautifully.',
    skills: [
      'Content creation and copywriting',
      'Social media management',
      'Graphic design basics',
      'Campaign planning'
    ],
    beliefs: [
      'Authenticity resonates with audiences',
      'Consistent messaging builds recognition',
      'Visual storytelling is powerful'
    ],
    contributions: [
      'Created engaging social media content',
      'Managed team\'s online presence',
      'Developed marketing materials',
      'Increased follower engagement by 150%'
    ]
  },

  'Cristiana Balan': {
    name: 'Cristiana Balan',
    role: 'Senior',
    department: 'Non-Technical',
    bio: 'Design and visual communications specialist. Cristiana ensures all team materials look professional and cohesive.',
    philosophy: 'Design is intelligence made visible. Every visual element should communicate purpose and passion.',
    skills: [
      'Graphic design and branding',
      'Visual identity development',
      'Print and digital design',
      'Creative problem solving'
    ],
    beliefs: [
      'Consistency builds brand recognition',
      'Good design is good business',
      'Attention to detail matters'
    ],
    contributions: [
      'Created team branding and visual identity',
      'Designed fundraising materials',
      'Developed presentation templates',
      'Maintained brand consistency across all materials'
    ]
  },

  'Alexandra Sîmbotin Gășpărel': {
    name: 'Alexandra Sîmbotin Gășpărel',
    role: 'Junior',
    department: 'Non-Technical',
    bio: 'Outreach coordinator focused on community engagement. Alexandra connects the team with the community.',
    philosophy: 'Community is our foundation. Every connection we make today plants seeds for tomorrow.',
    skills: [
      'Event coordination',
      'Community outreach',
      'Communication skills',
      'Volunteer management'
    ],
    beliefs: [
      'Relationships take time to build',
      'Genuine engagement creates impact',
      'Community support is invaluable'
    ],
    contributions: [
      'Coordinated participation in community events',
      'Built relationships with local organizations',
      'Organized team volunteer activities',
      'Expanded team\'s community presence'
    ]
  },

  'Andreea Ioniță': {
    name: 'Andreea Ioniță',
    role: 'Team Mentor',
    department: 'Mentor',
    bio: 'Founding mentor who guided the team from inception. Andreea provides strategic direction and mentorship.',
    philosophy: 'Mentorship is about asking the right questions, not giving all the answers. Growth comes from guided discovery.',
    skills: [
      'Educational leadership',
      'Robotics competition experience',
      'Strategic planning',
      'Student mentorship and development'
    ],
    beliefs: [
      'Students learn best by doing',
      'Failure is a stepping stone to success',
      'Independence builds confidence'
    ],
    contributions: [
      'Founded Mechabyte team in 2023',
      'Provided strategic guidance for competitions',
      'Mentored students in technical and soft skills',
      'Built partnerships with school and sponsors'
    ]
  },

  'Tudor Tocila': {
    name: 'Tudor Tocila',
    role: 'Business Teacher',
    department: 'Mentor',
    bio: 'Business teacher and mentor providing entrepreneurial guidance. Tudor helps the team develop business acumen and strategic thinking.',
    philosophy: 'Success in robotics requires both technical excellence and business savvy. Understanding markets, sponsors, and strategy is equally important.',
    skills: [
      'Business strategy and planning',
      'Financial management',
      'Entrepreneurship education',
      'Marketing and sponsorship strategies'
    ],
    beliefs: [
      'Business skills complement technical skills',
      'Strategic thinking drives success',
      'Real-world business experience teaches valuable lessons'
    ],
    contributions: [
      'Guided team\'s business and fundraising strategies',
      'Provided mentorship on sponsor relationships',
      'Taught entrepreneurial mindset',
      'Helped develop professional presentation skills'
    ]
  },

  'Sebastian Rosca': {
    name: 'Sebastian Rosca',
    role: 'Mentor',
    department: 'Mentor',
    bio: 'Mentor focused on team development and competition strategy. Sebastian helps the team reach their full potential.',
    philosophy: 'Excellence is a journey, not a destination. Every competition is a chance to learn and improve.',
    skills: [
      'Competition strategy',
      'Team dynamics and motivation',
      'Technical advising',
      'Performance optimization'
    ],
    beliefs: [
      'Preparation prevents poor performance',
      'Teams win, not individuals',
      'Continuous improvement is key'
    ],
    contributions: [
      'Developed competition strategies',
      'Improved team collaboration',
      'Provided technical guidance',
      'Helped build team culture'
    ]
  },

  'Bobu Dragos': {
    name: 'Bobu Dragos',
    role: 'Web Developer',
    department: 'Collaborator',
    bio: 'Professional web developer who created and maintains the team\'s website. Dragos brings modern web development expertise to showcase the team\'s work.',
    philosophy: 'A great website tells your story and opens doors. Code should be clean, accessible, and performant.',
    skills: [
      'Full-stack web development',
      'Vue.js and modern JavaScript frameworks',
      'UI/UX design principles',
      'Performance optimization and SEO'
    ],
    beliefs: [
      'User experience is paramount',
      'Good code is maintainable code',
      'Web presence builds credibility'
    ],
    contributions: [
      'Designed and developed team website from scratch',
      'Implemented interactive portfolio showcasing robots',
      'Created responsive design for all devices',
      'Maintains and updates website with new content'
    ]
  }
};
