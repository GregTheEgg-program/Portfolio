// Editable content gathered from the supplied GitHub and public LinkedIn profile.
// Source links and retrieval limits are documented in README.md.

export const profile = {
  name: 'Gregory Sherris',
  github: 'https://github.com/GregTheEgg-program',
  linkedin: 'https://www.linkedin.com/in/gregory-sherris-computerscience/',
  introduction: 'I’m a game developer and Computer Science–RTIS student at DigiPen Institute of Technology. I’m continuing to develop games while exploring what else I can build with programming.',
  about: 'I’m studying Real-Time Interactive Simulation at DigiPen and building my experience as a game developer. I enjoy creating games, learning new programming concepts, and exploring other areas of software development.',
  interests: 'Beyond games, I’m interested in cybersecurity. My projects also use Perforce, so my GitHub history represents only part of my development work.',
};

const rpsSource = 'https://github.com/GregTheEgg-program/RPS/blob/main/Assets/Scripts';

export const project = {
  title: 'RPS',
  subtitle: 'Rock, paper, scissors — with combat and combos.',
  year: '2024',
  repository: 'https://github.com/GregTheEgg-program/RPS',
  description: 'A Unity game that turns rock, paper, scissors into a combat system. Round outcomes affect player and enemy health, while three-move sequences trigger damage buffs, rerolls, or temporary health.',
  setting: 'The story takes place in Chronobridge, where a ban on fighting pushes rival gangs to settle their conflicts through a different kind of showdown.',
  focusAreas: [
    {
      label: 'Combat',
      title: 'Simple choices. Connected systems.',
      description: 'Round resolution connects the chosen moves to health changes and combo effects for both sides.',
      details: [
        'Win, lose, and tie outcomes resolved with C# tuple matching.',
        'Three-move sequences activate damage buffs, rerolls, or temporary health.',
        'Player and enemy health changes update the UI and end-state scenes.',
      ],
      file: 'enemyScript.cs',
      source: `${rpsSource}/enemyScript.cs`,
    },
    {
      label: 'Enemy logic',
      title: 'Decisions with a sequence in mind.',
      description: 'The opponent selects a three-move combo based on its health and available effects, then follows that sequence across rounds.',
      details: [
        'Health checks influence the next combo selection.',
        'The enemy can select damage, reroll, or temporary-health combos.',
        'Counters track progress through the sequence and active effects.',
      ],
      file: 'enemyScript.cs',
      source: `${rpsSource}/enemyScript.cs`,
    },
    {
      label: 'Feedback',
      title: 'Making each round visible and audible.',
      description: 'Gameplay results feed into sprite changes, sound effects, health bars, and scene transitions.',
      details: [
        'Player and enemy sprites react to chosen moves and round outcomes.',
        'Attack, success, and failure sounds reinforce the result.',
        'A timed countdown coordinates the reveal of each round.',
      ],
      file: 'Interact.cs',
      source: `${rpsSource}/Interact.cs`,
    },
  ],
};

export const background = [
  {
    label: 'EDUCATION',
    title: 'DigiPen Institute of Technology',
    description: 'Undergraduate studies in Computer Science in Real-Time Interactive Simulation (RTIS).',
  },
  {
    label: 'EXPERIENCE',
    title: 'Small business internship',
    description: 'Helped streamline business operations and improve services for clients.',
  },
  {
    label: 'CURRENT FOCUS',
    title: 'Summer 2027 internship',
    description: 'Seeking an internship while continuing to build games and expand my programming experience.',
  },
];

export const skills = [
  { label: 'Languages', items: ['C++', 'C#', 'Java', 'Python'] },
  { label: 'Game development', items: ['Unity', 'Gameplay logic', 'Combat systems', 'UI & audio feedback'] },
  { label: 'Development tools', items: ['Git', 'GitHub', 'Perforce'] },
];
