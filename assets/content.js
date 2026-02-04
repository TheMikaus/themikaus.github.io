window.PORTFOLIO = {
  name: 'Michael “Mikaus” Whiteley',
  shortName: 'Mikaus',
  tagline: 'AI • Gameplay • Tools',
  heroTitle: 'AI / Gameplay / Tools Engineer',
  heroLead:
    'I enable teams to tell their story through gameplay, and the tools that craft them.',

  availability: 'Available for new opportunities',
  locationLine: 'Remote/Hybrid • Seattle',

  ctas: [
    //{ label: 'GitHub', href: 'https://github.com/TheMikaus', kind: 'primary' },
    //{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/mikaus-game-dev/', kind: 'ghost' },
    //{ label: 'Download Resume (PDF)', href: '#', kind: 'ghost' },
  ],

  metaPills: [
    //'Unreal Engine • C++',
    //'Gameplay Ability System',
    //'AI Systems • Debug/Tools',
  ],

  quickStats: [
    { k: 'Focus', v: 'AI •  Gameplay • Tools' },
    { k: 'Strength', v: 'Customer-focused' },
    { k: 'Engines', v: 'Lumberyard • UE5' },
    { k: 'Languages', v: 'C/C++ • Java • Lua • Python' },
    { k: 'CMS', v: 'Diversion • Git • Perforce' },
  ],

  nowLine: 'Currently: Looking for a new adventure.',

  projects: [
    {
      name: 'Unannounced Unreal Project',
      description:
        'Creating tools, and gameplay systems in UE for an unannounced project.',
      tags: ['Unreal', 'GAS', 'Tools', 'ImGui', 'Workflow'],
      links: [
        //{ label: 'Samples', href: '#', type: 'link' },
      ],
      highlights: [
        'Exploring Unreal Engine and its underlying systems.',
        'Implementing gameplay systems using Gameplay Ability System (GAS).', 
      ],
      enabled: true, // set to false to hide this project
    },
    {
      name: 'Sample Project',
      description: 'Add description',
      tags: ['Unreal', 'GAS', 'Tools', 'ImGui', 'Workflow'],
      links: [
        //{ label: 'Samples', href: '#', type: 'link' },
      ],
      highlights: [
        'STUFF',
      ],
      enabled: false, // set to false to hide this project
    },
  ],

  experience: [
    {
      title: 'Software Engineer (AI/Gameplay/Tools)',
      org: 'Amazon Game Studios',
      when: 'August 2020 - January 2026',
      where: 'Remote',
      bullets: [
        'Designed and implemented metadata export, validation, and debugging systems for conversation and adventure creation in an unannounced Unreal Engine project.',
        'Led a team of co-devs through the implementation of several key features and system changes required to have New World: Aeternum meet TRCs and XRs for console launch. Systems ranged from UI (Radial Wheel Menu), Input(new plugin system, action consumption layer for UI, and shift modifiers to allow for more actions on the gamepad), User to controller association, and Trophies/Achievements.',
        'Developed and supported AI systems for a live large-scale online multiplayer game.',
        'Evaluated and planned a refactor of New World\’s datatables to a more mergeable format.',
        'Designed an AI Agent communication system broken into multiple parts that allowed AI to write to other AI blackboards, pass along, and set extra tags for targeting purposes.',
        'Mentored a junior engineer through the process of his first major feature in the game for the NightHaven expansion.',
        'Designed and implemented AI stuck detection, included a heat map that allowed us to pinpoint and fix areas that were problematic for AI.',
        'Created an AI threat system to manage how the AI chooses targets. Added building block features like entity tagging/selection, and multitargeting to the AI.',
      ],
    },
    {
      title: 'Software Engineer (UI/Gameplay)',
      org: 'Microsoft',
      when: 'February 2019 - August 2020',
      where: 'Redmond, WA',
      bullets: [
        'Designed and implemented extensible font system enabling TrueType fonts in Minecraft UI.',
        'Designed and implemented UI changes for Minecraft Earth and Minecraft\'s character customization system.',
      ],
    },
    {
      title: 'Software Engineer (UI/Gameplay)',
      org: 'Insight Global (Contract for Microsoft)',
      when: 'September 2018 - February 2019',
      where: 'Redmond, WA',
      bullets: [
        'Evaluated UI framework for Minecraft Earth prototype.',
      ],
    },
    {
      title: 'Software Engineer (Gameplay/Tools/Services)',
      org: 'Amazon Game Studios',
      when: 'April 2012 - September 2018',
      where: 'Seattle, WA / Irvine, CA',
      bullets: [
        'Worked on strike team completing territory management, durability systems, and hazards for survival crafting version of New World.',
        'Created high-level architecture for client/server infrastructure and launch roadmap for unannounced mobile project.',
        'Created pitch documents covering USP, team size, estimated costs, timelines, and estimated profit.',
        'Simplified narrative and audio pipeline for unannounced Crytek PC game, improving modification and validation workflows.',
        'Designed and implemented device-side home automation daemon on Amazon Echo enabling Hue bulb discovery and control.',
        'Mentored struggling Echo team over six weeks, taking them from nothing to working prototype for calling/texting features.',
        'Implemented authentication service and platform layer for Echo registration and user interaction between cloud applications.',
        'Awarded multiple patents for software systems designed during Echo development.',
      ],
    },
    {
      title: 'Software Engineer (Tools/Pipelines)',
      org: 'Lockheed Martin',
      when: 'December 2007 - March 2012',
      where: 'Orlando, FL',
      bullets: [
        'Created and maintained data-driven launcher for multiple radar simulations.',
        'Created and maintained build and installation system for radar product.',
      ],
    },
  ],

  skills: [
    'Unreal Engine (UE5.x)',
    'C++',
    'Gameplay Ability System (GAS)',
    'AI Behavior Tree & Threat Systems',
    'Replication / Networking fundamentals',
    'Tools & Pipelines',
    'Debug UX / Visualization',
    'Python',
    'Java',
    'Lua',
    'Lumberyard',
    'Unity',
    'Input Handling',
    'UI Systems',
    'Live-Ops Support',
    'Data validation and export',
    'Data-driven design',
    'Performance profiling',
  ],

  education: [
    {
      degree: 'Master of Science in Computer Science',
      school: 'University of Central Florida',
      when: 'Fall 2007',
      details: [],
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Central Florida',
      when: 'Fall 2004',
      details: [],
    },
  ],

  talks: [
    { title: 'Eventually', when: 'TBD', link: '#', enabled: false }, // set enabled to true to show
  ],

  contact: [
    {
      k: 'GitHub',
      v: 'github.com/TheMikaus',
      href: 'https://github.com/TheMikaus',
      label: 'View profile',
    },
    {
      k: 'LinkedIn',
      v: 'linkedin.com/in/mikaus-game-dev',
      href: 'https://www.linkedin.com/in/mikaus-game-dev/',
      label: 'Open LinkedIn',
    }
  ],

  siteUrl: 'https://themikaus.github.io/',
};
