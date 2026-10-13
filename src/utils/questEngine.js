import { PROTAGONISTS, QUEST_TEMPLATES } from '../data/animeData';

// Generates dynamic side-quests tailored to what the user is avoiding and their chosen companion
export function generateSideQuests(avoidedTask, procrastinationReason, companionId, energyLevel = 'medium') {
  const companion = PROTAGONISTS.find(p => p.id === companionId) || PROTAGONISTS[0];

  // Base matches from templates
  const companionQuests = QUEST_TEMPLATES.filter(q => q.protagonistId === companion.id);
  const otherQuests = QUEST_TEMPLATES.filter(q => q.protagonistId !== companion.id);

  // Dynamic tailored quest directly addressing what they are avoiding
  const customAvoidanceQuests = [
    {
      id: `custom-micro-prep-${Date.now()}`,
      category: 'Setup Advantage',
      title: `${companion.name}’s 2-Minute Warmup Protocol for "${avoidedTask || 'The Final Boss Task'}"`,
      desc: `Don't actually start "${avoidedTask || 'your task'}" yet! Just open the document, rename the tab/file nicely, and type 1 joke sentence. Then walk away for 30 seconds.`,
      xp: 250,
      timeEst: '2 mins',
      tag: 'Prep Jutsu',
      difficulty: 'Easy',
      protagonistId: companion.id,
      whyItHelps: `Eliminates the fear of the blank slate without committing to hard mental labor.`
    },
    {
      id: `custom-anti-dopamine-${Date.now() + 1}`,
      category: 'Dopamine Detour',
      title: `${companion.name}'s Forbidden Brain Refresh`,
      desc: `You said you're procrastinating because: "${procrastinationReason || 'Overwhelmed'}". Turn off the screen, put on an epic anime OST (like Attack on Titan or Naruto battle theme), and drink 1 glass of ice water.`,
      xp: 160,
      timeEst: '3 mins',
      tag: 'Mindset Shift',
      difficulty: 'Fast',
      protagonistId: companion.id,
      whyItHelps: `Resets cortisol spike and replaces dread with battle excitement.`
    }
  ];

  // Combine and sort
  const allAvailable = [
    ...customAvoidanceQuests,
    ...companionQuests,
    ...otherQuests
  ];

  // Select 3-4 top recommendations
  return allAvailable.slice(0, 4);
}

// Generate companion banter and battle dialogue
export function getCompanionDialogue(companionId, avoidedTask, state = 'thinking') {
  const companion = PROTAGONISTS.find(p => p.id === companionId) || PROTAGONISTS[0];
  
  if (state === 'greeting') {
    return `"${companion.catchphrase}" I am ${companion.name}! Avoiding "${avoidedTask || 'important work'}"? Don't just sit there scrolling TikTok—let's turn this diversion into an S-Rank training montage!`;
  }

  if (state === 'victory') {
    return companion.reactions.complete;
  }

  return companion.reactions.avoiding;
}
