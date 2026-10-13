import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Flame, 
  Sword, 
  CheckCircle2, 
  RotateCcw, 
  Trophy, 
  Zap, 
  Timer, 
  Compass, 
  ChevronRight,
  ShieldAlert,
  Brain,
  Coffee,
  Heart,
  Volume2
} from 'lucide-react';
import { PROTAGONISTS, getRankForXp } from './data/animeData';
import { generateSideQuests, getCompanionDialogue } from './utils/questEngine';

export default function App() {
  // User state
  const [avoidedTask, setAvoidedTask] = useState('Write quarterly report & clean data');
  const [procrastinationReason, setProcrastinationReason] = useState('Feeling overwhelmed & low dopamine');
  const [selectedCompanionId, setSelectedCompanionId] = useState('naruto');
  const [energyLevel, setEnergyLevel] = useState('medium'); // low, medium, high
  
  // App state
  const [activeQuests, setActiveQuests] = useState([]);
  const [completedQuestIds, setCompletedQuestIds] = useState([]);
  const [totalXp, setTotalXp] = useState(320);
  const [completedCount, setCompletedCount] = useState(2);
  const [questTimer, setQuestTimer] = useState(null); // active quest being timed
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [dialogueOverride, setDialogueOverride] = useState('');

  const currentCompanion = PROTAGONISTS.find(p => p.id === selectedCompanionId) || PROTAGONISTS[0];
  const userRank = getRankForXp(totalXp);

  // Initialize quests
  useEffect(() => {
    generateNewQuests();
  }, [selectedCompanionId]);

  // Timer countdown hook
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      triggerConfetti();
      setDialogueOverride(`${currentCompanion.name}: "TIME'S UP! Mission accomplished! You didn't waste time, you sharpened your blade!"`);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const generateNewQuests = () => {
    const quests = generateSideQuests(avoidedTask, procrastinationReason, selectedCompanionId, energyLevel);
    setActiveQuests(quests);
    setDialogueOverride('');
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCompleteQuest = (quest) => {
    if (completedQuestIds.includes(quest.id)) return;
    
    const newCompleted = [...completedQuestIds, quest.id];
    setCompletedQuestIds(newCompleted);
    setTotalXp(prev => prev + quest.xp);
    setCompletedCount(prev => prev + 1);

    triggerConfetti();
    setDialogueOverride(currentCompanion.reactions.complete);
  };

  const startQuestTimer = (quest) => {
    // parse time like "5 mins" or "30 secs"
    let seconds = 300;
    if (quest.timeEst.includes('min')) {
      const mins = parseInt(quest.timeEst) || 5;
      seconds = mins * 60;
    } else {
      seconds = 180;
    }
    setQuestTimer(quest);
    setTimeLeft(seconds);
    setIsTimerRunning(true);
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ minHeight: '100vh', padding: '24px 16px 80px' }}>
      <div className="anime-speed-lines" />

      {/* Top Header / Brand */}
      <header style={{ maxWidth: '1100px', margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '52px', 
            height: '52px', 
            borderRadius: '16px', 
            background: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
          }}>
            ⚡
          </div>
          <div>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '28px', 
              fontWeight: '900', 
              background: 'linear-gradient(to right, #ffffff, #a855f7, #ec4899)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              ProcrastinAnime
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Turning Avoidance into Productive Anime Training Arcs
            </p>
          </div>
        </div>

        {/* User Ninja Rank / Stats */}
        <div className="glass-panel" style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Power Level</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: '#fbbf24', fontSize: '18px' }}>
              <Zap size={18} fill="#fbbf24" /> {totalXp} XP
            </div>
          </div>
          <div style={{ width: '1px', height: '30px', background: 'var(--border-subtle)' }} />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current Rank</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: '#38bdf8', fontSize: '14px' }}>
              <span>{userRank.icon}</span> {userRank.rank}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1.8fr)', gap: '28px' }}>
        
        {/* LEFT COLUMN: The Avoidance Chamber & Protagonist Selector */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Active Avoidance Status */}
          <div className="glass-panel" style={{ padding: '24px', borderLeft: `4px solid ${currentCompanion.accentColor}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f43f5e', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase' }}>
                <ShieldAlert size={16} /> Boss Task You're Evading
              </div>
              <span className="tag-pill" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185' }}>
                Avoidance Active
              </span>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
                What are you supposed to be doing right now?
              </label>
              <input 
                type="text" 
                value={avoidedTask} 
                onChange={(e) => setAvoidedTask(e.target.value)}
                placeholder="e.g. Finish chemistry assignment or submit invoice..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(10, 11, 20, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-main)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
                Why are you slacking? (Your Honest Reason)
              </label>
              <select 
                value={procrastinationReason}
                onChange={(e) => setProcrastinationReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(10, 11, 20, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-main)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="Overwhelmed by how huge it is">Overwhelmed by how huge it is (Dread)</option>
                <option value="Bored out of my mind / Zero dopamine">Bored out of my mind / Zero dopamine</option>
                <option value="Perfectionism / Scared it won't be good">Perfectionism / Scared it won't be good</option>
                <option value="Physical lethargy / Glued to the chair">Physical lethargy / Glued to the chair</option>
                <option value="Need a quick 10-minute mental buffer">Need a quick 10-minute mental buffer</option>
              </select>
            </div>

            <button 
              className="btn-primary" 
              onClick={generateNewQuests}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Sparkles size={18} /> Summon New Anime Side-Quests
            </button>
          </div>

          {/* Anime Protagonist Selector */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sword size={18} color="#a855f7" /> Choose Your Sensei / Protagonist
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Every hero has their own battle philosophy for turning slacking into a win.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {PROTAGONISTS.map(protagonist => {
                const isSelected = protagonist.id === selectedCompanionId;
                return (
                  <button
                    key={protagonist.id}
                    onClick={() => setSelectedCompanionId(protagonist.id)}
                    style={{
                      background: isSelected ? 'rgba(147, 51, 234, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? `2px solid ${protagonist.accentColor}` : '1px solid var(--border-subtle)',
                      borderRadius: '14px',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                      textAlign: 'left',
                      position: 'relative',
                      transition: 'all 0.2s',
                      transform: isSelected ? 'scale(1.02)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', marginBottom: '4px' }}>
                      <span style={{ fontSize: '22px' }}>{protagonist.avatar}</span>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: '700', fontSize: '14px', color: isSelected ? '#ffffff' : 'var(--text-main)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {protagonist.name}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                          {protagonist.anime}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '11px', color: protagonist.accentColor, fontWeight: '600', marginTop: '4px' }}>
                      {protagonist.vibe.split('&')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats & Training Summary */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#10b981' }}>{completedCount}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Quests Done</div>
            </div>
            <div style={{ width: '1px', height: '36px', background: 'var(--border-subtle)' }} />
            <div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#38bdf8' }}>{completedCount * 5}m</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Productive Slacking</div>
            </div>
            <div style={{ width: '1px', height: '36px', background: 'var(--border-subtle)' }} />
            <div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#f59e0b' }}>100%</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Guilt Removed</div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Dialogue & Dynamic Side-Quest Board */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Protagonist Speech Box (Manga Dialogue Style) */}
          <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden', border: `1px solid ${currentCompanion.accentColor}44` }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-10px',
              fontSize: '110px',
              opacity: 0.08,
              userSelect: 'none',
              pointerEvents: 'none'
            }}>
              {currentCompanion.avatar}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: currentCompanion.bgGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                flexShrink: 0,
                boxShadow: `0 0 20px ${currentCompanion.accentColor}66`
              }}>
                {currentCompanion.avatar}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>{currentCompanion.name}</h3>
                  <span className="tag-pill" style={{ background: `${currentCompanion.accentColor}22`, color: currentCompanion.accentColor, border: `1px solid ${currentCompanion.accentColor}66` }}>
                    {currentCompanion.title}
                  </span>
                </div>
                
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '12px', marginBottom: '12px' }}>
                  "{currentCompanion.motto}"
                </p>

                {/* Animated speech bubble */}
                <div style={{
                  background: 'rgba(10, 11, 20, 0.9)',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  borderLeft: `4px solid ${currentCompanion.accentColor}`,
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: '#e2e8f0'
                }}>
                  {dialogueOverride || getCompanionDialogue(currentCompanion.id, avoidedTask, 'avoiding')}
                </div>
              </div>
            </div>
          </div>

          {/* Active Timer Box if a quest is running */}
          {questTimer && (
            <div className="glass-panel animate-glow" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(15, 23, 42, 0.9))', border: '1px solid #818cf8' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Timer size={22} color="#a5b4fc" />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#c7d2fe', fontWeight: '600' }}>ACTIVE SIDE-QUEST IN PROGRESS</div>
                    <div style={{ fontWeight: '800', fontSize: '15px', color: '#ffffff' }}>{questTimer.title}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '900', color: '#38bdf8', letterSpacing: '1px' }}>
                    {formatTimer(timeLeft)}
                  </div>
                  <button 
                    onClick={() => {
                      handleCompleteQuest(questTimer);
                      setQuestTimer(null);
                      setIsTimerRunning(false);
                    }}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '8px 16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <CheckCircle2 size={16} /> Mark Complete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Suggested Side-Quests Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={20} color="#f97316" /> High-Value Productive Side-Quests
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  If you won't work on the main task yet, gain stats here instead of doomscrolling!
                </p>
              </div>

              <button 
                onClick={generateNewQuests}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw size={14} /> Refresh Quests
              </button>
            </div>

            {/* Quests List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {activeQuests.map((quest, idx) => {
                const isCompleted = completedQuestIds.includes(quest.id);
                return (
                  <div 
                    key={quest.id || idx}
                    className="glass-panel"
                    style={{
                      padding: '20px',
                      border: isCompleted ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                      background: isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)',
                      opacity: isCompleted ? 0.75 : 1,
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span className="tag-pill" style={{ background: 'rgba(147, 51, 234, 0.15)', color: '#c084fc' }}>
                            {quest.category}
                          </span>
                          <span className="tag-pill" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                            <Timer size={12} /> {quest.timeEst}
                          </span>
                          <span className="tag-pill" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                            <Zap size={12} /> +{quest.xp} XP
                          </span>
                          {isCompleted && (
                            <span className="tag-pill" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                              <CheckCircle2 size={12} /> Completed
                            </span>
                          )}
                        </div>

                        <h3 style={{ 
                          fontSize: '16px', 
                          fontWeight: '800', 
                          color: isCompleted ? '#94a3b8' : '#ffffff', 
                          marginBottom: '6px',
                          textDecoration: isCompleted ? 'line-through' : 'none'
                        }}>
                          {quest.title}
                        </h3>

                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '10px' }}>
                          {quest.desc}
                        </p>

                        <div style={{ 
                          fontSize: '12px', 
                          color: '#38bdf8', 
                          background: 'rgba(6, 182, 212, 0.08)', 
                          padding: '6px 10px', 
                          borderRadius: '8px',
                          display: 'inline-block'
                        }}>
                          💡 <strong>Why it beats scrolling:</strong> {quest.whyItHelps}
                        </div>
                      </div>

                      {/* Quest Action Buttons */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '130px' }}>
                        {!isCompleted ? (
                          <>
                            <button
                              onClick={() => startQuestTimer(quest)}
                              style={{
                                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '10px 14px',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                              }}
                            >
                              <Timer size={15} /> Start Sprint
                            </button>
                            <button
                              onClick={() => handleCompleteQuest(quest)}
                              style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-main)',
                                borderRadius: '10px',
                                padding: '8px 12px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                              }}
                            >
                              <CheckCircle2 size={14} color="#10b981" /> Done Already
                            </button>
                          </>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#10b981', fontWeight: '700', fontSize: '13px' }}>
                            ✨ S-Rank Victory!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational Shonen Philosophy Banner */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
            <div style={{ fontSize: '32px' }}>🔥</div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '15px', color: '#f43f5e' }}>The Protagonist Law of Procrastination</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                "A ninja doesn't feel guilty about taking the scenic route, so long as each step sharpens the kunai." Gain momentum with a 5-minute side-quest, then strike down your main task with 100% focused crit damage!
              </div>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}
