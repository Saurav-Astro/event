export type Event = {
  id: string;
  type: 'Hackathon' | 'Workshop' | 'Conference' | 'Robotics' | 'Coding' | 'CTF';
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  details: {
    rules?: string[];
    prizes?: string[];
    judgingCriteria?: string[];
    speakers?: { name: string; topic: string; skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' }[];
    tagline?: string;
    languageSupport?: string[];
    tracks?: { title: string; description: string }[];
    timeline?: { event: string; time: string }[];
    perks?: string[];
    duration?: string;
    requirement?: string;
  };
};

export type Sponsor = {
  id: string;
  name: string;
  logo: string;
  website: string;
  tier: 'Platinum' | 'Gold' | 'In-Kind';
};

export const events: Event[] = [
  {
    id: 'robowars',
    type: 'Robotics',
    title: 'RoboWars (15kg)',
    date: 'Mar 16, 2026',
    location: 'Robo-Arena',
    description: 'An all-out battle for supremacy in a 20ft x 20ft bulletproof arena. Robots must use weaponry to immobilize the opponent.',
    image: 'event1',
    details: {
      tagline: 'Let the sparks fly.',
      rules: ['No internal combustion engines.', 'Max battery voltage 24V.', '3-minute matches.'],
    },
  },
  {
    id: 'drone-racing-league',
    type: 'Robotics',
    title: 'Drone Racing League',
    date: 'Mar 15, 2026',
    location: 'Main Campus Field',
    description: 'An FPV (First Person View) obstacle course designed to test the agility of your quadcopters.',
    image: 'event2',
    details: {
      tagline: 'Speed through the skies.',
    },
  },
  {
    id: 'code-sprint',
    type: 'Coding',
    title: 'Code-Sprint',
    date: 'Mar 15, 2026',
    location: 'The Dev Den',
    description: 'A 3-hour ICPC-style contest focusing on algorithms and data structures.',
    image: 'event3',
    details: {
      languageSupport: ['C++', 'Java', 'Python'],
    },
  },
  {
    id: 'capture-the-flag',
    type: 'CTF',
    title: 'Capture the Flag (CTF)',
    date: 'Mar 16, 2026',
    location: 'The Dev Den',
    description: 'A 6-hour cybersecurity challenge covering Web exploitation, Steganography, and Cryptography.',
    image: 'event4',
    details: {},
  },
  {
    id: 'codequest-hackathon',
    type: 'Hackathon',
    title: 'CodeQuest: 36 Hours of Non-Stop Innovation',
    date: 'Mar 15-17, 2026',
    location: 'Main Auditorium',
    description: 'The flagship hackathon of IGNITE 2025. Choose a track and build something amazing.',
    image: 'event1', // Re-using image
    details: {
      tracks: [
        { title: 'AI/ML', description: 'Predictive analysis for sustainable urban planning.' },
        { title: 'Web3', description: 'Decentralized identity solutions for student records.' },
        { title: 'FinTech', description: 'Fraud detection using real-time behavioral biometrics.' },
        { title: 'HealthTech', description: 'IoT-integrated systems for rural diagnostics.' },
      ],
      timeline: [
        { event: 'Starts', time: 'Day 1, 10:00 PM' },
        { event: 'Mid-Review', time: 'Day 2, 10:00 AM' },
        { event: 'Final Submission', time: 'Day 3, 10:00 AM' },
      ],
      perks: ['24/7 Energy Drinks', 'Sleeping Pods', 'On-site Mentors', 'Custom T-shirts'],
    },
  },
    {
    id: 'gen-ai-workshop',
    type: 'Workshop',
    title: 'Generative AI & LLMs',
    date: 'Mar 16, 2026',
    location: 'CS Department, Lab 3',
    description: 'A deep dive into the world of Large Language Models and Generative AI.',
    image: 'event2', // Re-using image
    details: {
      duration: '6 Hours',
      requirement: 'Laptop with Python 3.8+',
      speakers: [
        { name: 'Senior Data Scientist from Tech Partner', topic: 'Prompt Engineering, Fine-tuning Llama-3, RAG Architectures.', skillLevel: 'Intermediate' },
      ],
    },
  },
  {
    id: 'iot-workshop',
    type: 'Workshop',
    title: 'IoT with Arduino',
    date: 'Mar 17, 2026',
    location: 'ECE Department, Lab 1',
    description: 'Get hands-on experience with the Internet of Things. Kit included.',
    image: 'event3', // Re-using image
    details: {
      duration: '4 Hours',
      requirement: 'Included Kit: Arduino Uno, ESP8266, Sensor Array.',
       speakers: [
        { name: 'Professor from ECE Dept.', topic: 'Cloud data logging, Home automation basics.', skillLevel: 'Beginner' },
      ],
    },
  },
  {
    id: 'cybersecurity-workshop',
    type: 'Workshop',
    title: 'Cybersecurity Essentials',
    date: 'Mar 15, 2026',
    location: 'Cyber Hub, Room 404',
    description: 'Learn the fundamentals of ethical hacking and threat mitigation.',
    image: 'event4',
    details: {
      duration: '5 Hours',
      requirement: 'Laptop with Kali Linux (VM is fine).',
      speakers: [
        { name: 'Cybersecurity Analyst from Secure Solutions', topic: 'Network sniffing, SQL injection, and XSS.', skillLevel: 'Beginner' }
      ]
    }
  },
];

export const workshops = events.filter(e => e.type === 'Workshop');

export const sponsors: Sponsor[] = [
  { id: 'microsoft', name: 'Microsoft', logo: 'sponsor1', website: '#', tier: 'Platinum' },
  { id: 'aws', name: 'AWS', logo: 'sponsor2', website: '#', tier: 'Gold' },
  { id: 'github', name: 'GitHub', logo: 'sponsor3', website: '#', tier: 'Gold' },
  { id: 'intel', name: 'Intel', logo: 'sponsor4', website: '#', tier: 'Gold' },
  { id: 'redbull', name: 'Red Bull', logo: 'sponsor5', website: '#', tier: 'In-Kind' },
  { id: 'dominos', name: 'Domino’s', logo: 'sponsor6', website: '#', tier: 'In-Kind' },
];
