// Database of iconic anime protagonists with their traits, mantras, sound bites, and productivity quests
export const PROTAGONISTS = [
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    title: 'Hokage of Konoha & King of Grit',
    anime: 'Naruto Shippuden',
    avatar: '🍜',
    accentColor: '#f97316', // Orange
    bgGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    catchphrase: 'Believe it! (Dattebayo!)',
    motto: 'I never go back on my word. That is my nindo, my ninja way!',
    vibe: 'Relentless Willpower & High Energy',
    questStrategy: 'Shadow Clone Sprint: Knock out 3 small micro-tasks simultaneously.',
    reactions: {
      avoiding: "Oi oi oi! You're staring at that spreadsheet like it's an S-Rank mission! If you can't fight it head-on yet, do some chakra pushups first!",
      complete: "DATTEBAYO! That's what I'm talking about! You didn't just procrastinate, you gathered sage mode energy!"
    }
  },
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    title: 'Captain of the Straw Hat Pirates',
    anime: 'One Piece',
    avatar: '🍖',
    accentColor: '#ef4444', // Red
    bgGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    catchphrase: "I'm gonna be King of the Pirates!",
    motto: 'If you don’t take risks, you can’t create a future!',
    vibe: 'Chaotic Adventure & Direct Action',
    questStrategy: 'Gear Second Quick Burst: Spend 10 energetic minutes on an IRL exploration quest.',
    reactions: {
      avoiding: "Booooring work! My stomach is rumbling! If we're gonna procrastinate, let's at least conquer a mini-island or organize the ship's treasure!",
      complete: "SUGEEEE! That was awesome! Now we feast! Meat for everyone!"
    }
  },
  {
    id: 'saitama',
    name: 'Saitama',
    title: 'Hero for Fun (One Punch Man)',
    anime: 'One Punch Man',
    avatar: '🥊',
    accentColor: '#eab308', // Yellow
    bgGradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
    catchphrase: 'OK.',
    motto: '100 push-ups, 100 sit-ups, 100 squats, and a 10km run EVERY SINGLE DAY!',
    vibe: 'Chill, Minimalist & Unfazed',
    questStrategy: 'Single Punch Precision: Eliminate one lingering domestic chore in 5 minutes flat.',
    reactions: {
      avoiding: "Work is tough. I forgot today was bargain day at the supermarket... Look, if you're stuck, just stretch or wipe your desk. Don't overthink it.",
      complete: "Oh, neat. You finished it in one punch. Pretty good."
    }
  },
  {
    id: 'goku',
    name: 'Son Goku',
    title: 'Super Saiyan God',
    anime: 'Dragon Ball Z / Super',
    avatar: '⚡',
    accentColor: '#3b82f6', // Super Saiyan Blue / Orange
    bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    catchphrase: "Hey, it's me, Goku!",
    motto: 'Power comes in response to a need, not a desire.',
    vibe: 'Hyperbolic Time Chamber Training',
    questStrategy: 'Gravity Chamber Physical Boost: Do 20 desk pushups or posture reset.',
    reactions: {
      avoiding: "Your power level is dropping while you stare at that tab! Let's get our blood pumping with a quick gravity-defying drill before confronting that boss!",
      complete: "KAMEHAMEHA! Your power level just shot through the roof! Ready for the next opponent!"
    }
  },
  {
    id: 'levi',
    name: 'Levi Ackerman',
    title: "Humanity's Strongest Soldier",
    anime: 'Attack on Titan',
    avatar: '⚔️',
    accentColor: '#10b981', // Scout green
    bgGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    catchphrase: 'Tch. Give up on your dreams and die.',
    motto: 'The only thing we’re allowed to do is believe that we won’t regret the choice we made.',
    vibe: 'Obsessive Cleanliness & Cold Precision',
    questStrategy: 'Scout Regiment Sanitization: Clean your physical desk or inbox ruthlessly.',
    reactions: {
      avoiding: "Tch. Look at your workspace. It's filthy. You can't execute complex maneuvers in this squalor. Clean it up right now.",
      complete: "Tch. Acceptable. Not spotless, but at least your gear won't jam during the next titan raid."
    }
  },
  {
    id: 'light',
    name: 'Light Yagami',
    title: 'God of the New World',
    anime: 'Death Note',
    avatar: '🍎',
    accentColor: '#8b5cf6', // Dark Purple
    bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    catchphrase: "I will take a potato chip... AND EAT IT!",
    motto: 'I am justice! I protect the innocent and a world of my ideal design.',
    vibe: 'Calculated Strategy & Master Planning',
    questStrategy: 'Death Note Task Purge: Write down 5 unneeded tasks and strike them out forever.',
    reactions: {
      avoiding: "Everything is going according to plan (keikaku). If you can't touch that primary task yet, manipulate the surrounding variables by organizing your strategy sheet.",
      complete: "All within calculations. The opponent didn't even notice you gained ground while feigning idleness."
    }
  }
];

// Rich quest templates categorized by energy level and type of procrastination
export const QUEST_TEMPLATES = [
  {
    id: 'desk-sweep',
    category: 'Environment',
    title: 'Levi’s Titan-Free Zone Sanitization',
    desc: 'Wipe your desk, toss out 3 old crumpled receipts, and refill your water bottle.',
    xp: 120,
    timeEst: '5 mins',
    tag: 'Physical Reset',
    difficulty: 'Easy',
    protagonistId: 'levi',
    whyItHelps: 'Clears cognitive clutter, reset physical environment, primes focus for high-stakes work.'
  },
  {
    id: 'speed-reading',
    category: 'Knowledge',
    title: 'Sharingan Speed Archive Dive',
    desc: 'Read one bookmark / article you saved 3 weeks ago for exactly 7 minutes, then summarize it in 1 sentence.',
    xp: 180,
    timeEst: '7 mins',
    tag: 'Skill Buff',
    difficulty: 'Medium',
    protagonistId: 'naruto',
    whyItHelps: 'Satisfies curiosity procrastination while actually learning something instead of doomscrolling.'
  },
  {
    id: 'hyperbolic-stretch',
    category: 'Health',
    title: 'Goku’s 100x Gravity Posture Re-Alignment',
    desc: 'Step away from screen. Do 15 squats, stretch shoulder traps, and drink 300ml cold water.',
    xp: 150,
    timeEst: '4 mins',
    tag: 'Body Stamina',
    difficulty: 'Easy',
    protagonistId: 'goku',
    whyItHelps: 'Floods brain with oxygen, snaps you out of screen trance.'
  },
  {
    id: 'saitama-micro',
    category: 'Organization',
    title: 'One-Punch File Purge',
    desc: 'Open your Downloads folder. Delete 10 useless screenshots and .zip installers instantly.',
    xp: 140,
    timeEst: '3 mins',
    tag: 'Digital Hygiene',
    difficulty: 'Fast',
    protagonistId: 'saitama',
    whyItHelps: 'High-satisfaction micro-win that rebuilds action momentum.'
  },
  {
    id: 'keikaku-planner',
    category: 'Strategy',
    title: 'Light’s 4D Keikaku Task Deconstruction',
    desc: 'Take the big scary thing you are avoiding. Chop it down into 3 ridiculously tiny sub-steps that take <2 mins each.',
    xp: 220,
    timeEst: '6 mins',
    tag: 'Mind Game',
    difficulty: 'Medium',
    protagonistId: 'light',
    whyItHelps: 'Shrinks perceived friction to zero, dismantling resistance.'
  },
  {
    id: 'strawhat-reachout',
    category: 'Social',
    title: 'Luffy’s Nakama Gratitude Signal',
    desc: 'Send a genuine 1-sentence compliment or thank-you note to a teammate, friend, or creator you admire.',
    xp: 200,
    timeEst: '2 mins',
    tag: 'Social Buff',
    difficulty: 'Easy',
    protagonistId: 'luffy',
    whyItHelps: 'Triggers positive dopamine and deepens relationships with zero friction.'
  },
  {
    id: 'shadow-clone-inbox',
    category: 'Organization',
    title: 'Shadow Clone Inbox Jutsu',
    desc: 'Archive 20 old newsletter emails without reading them. Unsubscribe from 2 spam lists.',
    xp: 190,
    timeEst: '5 mins',
    tag: 'Digital Hygiene',
    difficulty: 'Medium',
    protagonistId: 'naruto',
    whyItHelps: 'Eliminates unread notification anxiety without taxing deep mental reserves.'
  },
  {
    id: 'tea-ceremony',
    category: 'Mindfulness',
    title: 'Zen Training: The 3-Minute Sensory Reset',
    desc: 'Brew tea or cold brew. Put your phone face-down. Stare out the window with zero input until the cup is ready.',
    xp: 110,
    timeEst: '3 mins',
    tag: 'Mental Recharge',
    difficulty: 'Easy',
    protagonistId: 'saitama',
    whyItHelps: 'Re-sensitizes dopamine baseline and halts hyper-stimulation.'
  }
];

export const ANIME_RANKS = [
  { minXp: 0, rank: 'Academy Slacker', icon: '🌱', title: 'Just woke up in class' },
  { minXp: 200, rank: 'Genin Procrastinator', icon: '🌀', title: 'Knows basic jutsu of avoidance' },
  { minXp: 500, rank: 'Chunin Diverter', icon: '⚔️', title: 'Productive detour specialist' },
  { minXp: 900, rank: 'Special Jonin of Productivity', icon: '🔥', title: 'Master of side-quest efficiency' },
  { minXp: 1400, rank: 'Anbu Black Ops Task Slayer', icon: '🎭', title: 'Silent, deadly, organized' },
  { minXp: 2000, rank: 'Hokage of Constructive Procrastination', icon: '👑', title: 'Legendary Multitasker' }
];

export function getRankForXp(xp) {
  for (let i = ANIME_RANKS.length - 1; i >= 0; i--) {
    if (xp >= ANIME_RANKS[i].minXp) {
      return ANIME_RANKS[i];
    }
  }
  return ANIME_RANKS[0];
}
