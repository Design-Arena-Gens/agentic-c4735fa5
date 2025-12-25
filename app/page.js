'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [subjects, setSubjects] = useState([
    { name: 'Mathematics', chapters: 16, completed: 0, priority: 'high' },
    { name: 'Science', chapters: 13, completed: 0, priority: 'high' },
    { name: 'Social Science', chapters: 24, completed: 0, priority: 'medium' },
    { name: 'English', chapters: 11, completed: 0, priority: 'medium' },
    { name: 'Hindi', chapters: 17, completed: 0, priority: 'medium' }
  ]);

  const [studyPlan, setStudyPlan] = useState(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [dailyGoal, setDailyGoal] = useState('');

  useEffect(() => {
    const examDate = new Date('2026-02-03');
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays);
  }, []);

  const generateStudyPlan = () => {
    const totalChapters = subjects.reduce((sum, s) => sum + (s.chapters - s.completed), 0);
    const daysForStudy = Math.max(daysLeft - 15, 1); // Keep 15 days for revision
    const chaptersPerDay = (totalChapters / daysForStudy).toFixed(1);

    const plan = subjects.map(subject => {
      const remaining = subject.chapters - subject.completed;
      const daysNeeded = Math.ceil(remaining / parseFloat(chaptersPerDay));
      return {
        ...subject,
        remaining,
        daysNeeded,
        chaptersPerDay: (remaining / daysNeeded).toFixed(1)
      };
    });

    plan.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return 0;
    });

    setStudyPlan(plan);
  };

  const updateProgress = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].completed = Math.min(value, newSubjects[index].chapters);
    setSubjects(newSubjects);
  };

  const getDailyTips = () => {
    const tips = [
      '📚 Start with difficult subjects in morning when mind is fresh',
      '⏰ Study in 25-min sessions with 5-min breaks (Pomodoro)',
      '📝 Make short notes for quick revision',
      '🎯 Focus on NCERT books first - JAC Board follows NCERT',
      '💡 Solve previous year papers weekly',
      '🔄 Revise what you studied yesterday before new topics',
      '✍️ Practice numericals daily for Math & Science',
      '🗣️ Teach concepts to friends - best way to learn',
      '🌙 Get 7-8 hours sleep - crucial for memory',
      '📱 Keep phone away during study time'
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            margin: '0 0 10px 0',
            color: '#667eea',
            fontSize: '36px',
            fontWeight: 'bold'
          }}>
            📖 JAC Board 10th Study Agent
          </h1>
          <div style={{ fontSize: '20px', color: '#666' }}>
            <span style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '28px' }}>
              {daysLeft} days
            </span> left until exam (February 3, 2026)
          </div>
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#fff3cd',
            borderRadius: '10px',
            borderLeft: '4px solid #ffc107'
          }}>
            <strong>💡 Daily Tip:</strong> {getDailyTips()}
          </div>
        </div>

        {/* Subject Progress */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, color: '#333' }}>📊 Your Progress</h2>
          {subjects.map((subject, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{subject.name}</span>
                  <span style={{
                    marginLeft: '10px',
                    padding: '4px 12px',
                    background: subject.priority === 'high' ? '#e74c3c' : '#f39c12',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {subject.priority.toUpperCase()}
                  </span>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    max={subject.chapters}
                    value={subject.completed}
                    onChange={(e) => updateProgress(index, parseInt(e.target.value) || 0)}
                    style={{
                      width: '60px',
                      padding: '8px',
                      marginRight: '10px',
                      border: '2px solid #667eea',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  <span style={{ color: '#666' }}>
                    / {subject.chapters} chapters
                  </span>
                </div>
              </div>
              <div style={{
                width: '100%',
                height: '12px',
                background: '#e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(subject.completed / subject.chapters) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          ))}

          <button
            onClick={generateStudyPlan}
            style={{
              width: '100%',
              padding: '15px',
              marginTop: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
          >
            🎯 Generate Smart Study Plan
          </button>
        </div>

        {/* Study Plan */}
        {studyPlan && (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginTop: 0, color: '#333' }}>📅 Your Personalized Study Plan</h2>

            <div style={{
              background: '#d4edda',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              borderLeft: '4px solid #28a745'
            }}>
              <strong>Strategy:</strong> Complete all syllabus by mid-January, then 15 days intensive revision + practice tests
            </div>

            {studyPlan.map((subject, index) => (
              <div key={index} style={{
                padding: '20px',
                marginBottom: '15px',
                background: '#f8f9fa',
                borderRadius: '12px',
                borderLeft: '5px solid #667eea'
              }}>
                <h3 style={{
                  margin: '0 0 10px 0',
                  color: '#667eea',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{subject.name}</span>
                  <span style={{
                    fontSize: '14px',
                    background: '#667eea',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '20px'
                  }}>
                    {subject.daysNeeded} days needed
                  </span>
                </h3>
                <div style={{ fontSize: '16px', color: '#555', lineHeight: '1.8' }}>
                  <div>📖 Remaining chapters: <strong>{subject.remaining}</strong></div>
                  <div>📝 Daily target: <strong>{subject.chaptersPerDay} chapters/day</strong></div>
                  <div style={{ marginTop: '10px', color: '#28a745' }}>
                    ✅ Completed: {subject.completed}/{subject.chapters}
                    ({((subject.completed/subject.chapters)*100).toFixed(0)}%)
                  </div>
                </div>
              </div>
            ))}

            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: '#fff3cd',
              borderRadius: '12px',
              borderLeft: '5px solid #ffc107'
            }}>
              <h3 style={{ marginTop: 0, color: '#856404' }}>🎓 Revision Strategy (Last 15 Days)</h3>
              <ul style={{ margin: '10px 0', paddingLeft: '20px', color: '#856404' }}>
                <li>Day 1-5: Quick revision of all Math formulas and Science concepts</li>
                <li>Day 6-8: Complete 3 full-length previous year papers</li>
                <li>Day 9-11: Focus on weak areas identified from tests</li>
                <li>Day 12-13: Rapid revision of Social Science dates and English grammar</li>
                <li>Day 14-15: Light revision only, stay calm and confident</li>
              </ul>
            </div>

            <div style={{
              marginTop: '20px',
              padding: '20px',
              background: '#d1ecf1',
              borderRadius: '12px',
              borderLeft: '5px solid #0dcaf0'
            }}>
              <h3 style={{ marginTop: 0, color: '#055160' }}>📚 Important Resources for JAC Board</h3>
              <ul style={{ margin: '10px 0', paddingLeft: '20px', color: '#055160' }}>
                <li><strong>Main Books:</strong> NCERT textbooks (JAC follows NCERT)</li>
                <li><strong>Previous Papers:</strong> Last 5 years JAC Board question papers</li>
                <li><strong>Practice:</strong> NCERT Exemplar for Math & Science</li>
                <li><strong>Revision:</strong> Subject-wise short notes and formulas</li>
                <li><strong>Mock Tests:</strong> Take at least 10 full-length tests</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
