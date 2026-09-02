import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity, BarChart3, BookOpen, Camera, Check, ChevronRight, Droplets, Home,
  Info, Leaf, MessageCircle, Moon, Plus, ScanLine, Send, ShieldCheck, Sparkles, Bell,
  Sun, Trash2, Upload, UserRound, Utensils, X, Zap
} from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './styles.css'
import SplashScreen from "./SplashScreen";
const LEARN_TOPICS = [
  {
    id: 'heart',
    title: 'How does your heart work?',
    category: 'Body Systems',
    icon: '❤️',
    summary:
      'Your heart is a muscular pump that works with blood vessels to circulate blood throughout your body.',
    intro:
      'Your heart is part of the circulatory system. Its chambers, valves and coordinated contractions help keep blood moving in the correct direction.',
    sections: [
      {
        heading: 'The pumping cycle',
        text:
          'The heart repeatedly relaxes and contracts. These movements help fill its chambers with blood and then push blood onward through the circulation.'
      },
      {
        heading: 'Why rhythm matters',
        text:
          'Specialized electrical signals help coordinate the timing of heart muscle contractions so the pumping cycle can work efficiently.'
      }
    ],
    process: [
      'Blood returns to the heart',
      'The heart pumps blood toward the lungs or body',
      'Blood travels through blood vessels',
      'Blood eventually returns to the heart'
    ],
    fact:
      'The heart and blood vessels form a continuous circulatory system that transports oxygen and many other substances.',
    myth: 'The heart is just one simple hollow muscle.',
    truth:
      'The heart has multiple chambers and valves that work together to direct blood flow.',
    aiQuestions: [
      'How does the heart know when to beat?',
      'Why does my heart beat faster during exercise?',
      'What do heart valves do?'
    ]
  },

  {
    id: 'lungs',
    title: 'How do your lungs exchange oxygen?',
    category: 'Body Systems',
    icon: '🫁',
    summary:
      'Your lungs bring air into the body and exchange oxygen and carbon dioxide with the bloodstream.',
    intro:
      'When you breathe, air travels through branching airways toward tiny air sacs called alveoli, where gas exchange takes place.',
    sections: [
      {
        heading: 'Air travels inward',
        text:
          'Air moves through the nose or mouth, down the airways and into increasingly smaller branches inside the lungs.'
      },
      {
        heading: 'Gas exchange',
        text:
          'In the alveoli, oxygen can move into nearby blood while carbon dioxide can move from the blood into the air to be exhaled.'
      }
    ],
    process: [
      'You breathe in',
      'Air travels through the airways',
      'Air reaches tiny alveoli',
      'Oxygen enters the bloodstream',
      'Carbon dioxide is breathed out'
    ],
    fact:
      'Breathing and circulation work together: the lungs exchange gases while blood transports them around the body.',
    myth: 'Breathing faster always means you are getting more oxygen.',
    truth:
      'Gas exchange depends on several factors, not simply how quickly a person breathes.',
    aiQuestions: [
      'Why do I breathe faster during exercise?',
      'What are alveoli?',
      'Why do we breathe out carbon dioxide?'
    ]
  },

  {
    id: 'brain',
    title: 'How does your brain communicate?',
    category: 'Brain & Mental Wellness',
    icon: '🧠',
    summary:
      'The brain uses vast networks of nerve cells to process information and coordinate many body functions.',
    intro:
      'Brain cells communicate using electrical and chemical signals. Different networks contribute to movement, sensation, memory, emotions and many other functions.',
    sections: [
      {
        heading: 'Neural communication',
        text:
          'Neurons can send electrical signals along their length and communicate with other cells at specialized connections called synapses.'
      },
      {
        heading: 'Networks work together',
        text:
          'The brain does not operate as a single processor. Many connected networks can be active and coordinate with each other.'
      }
    ],
    process: [
      'Information is detected',
      'Signals travel through nerve cells',
      'Networks process information',
      'The body or brain responds'
    ],
    fact:
      'Different brain regions can become more active during different tasks, while many systems work together.',
    myth: 'Humans only use 10% of their brain.',
    truth:
      'The popular 10% claim is a myth. Different parts of the brain have different roles and activity patterns.',
    aiQuestions: [
      'How are memories formed?',
      'What is a neuron?',
      'How do nerves send signals?'
    ]
  },

  {
    id: 'kidneys',
    title: 'How do kidneys filter blood?',
    category: 'Body Systems',
    icon: '🫘',
    summary:
      'The kidneys help filter blood, remove certain waste products and regulate water and important dissolved substances.',
    intro:
      'Kidneys contain tiny filtering units called nephrons. They filter blood and selectively reabsorb substances that the body still needs.',
    sections: [
      {
        heading: 'Filtering and sorting',
        text:
          'The kidneys filter components from the blood and then selectively return many useful substances and water back to the bloodstream.'
      },
      {
        heading: 'More than waste removal',
        text:
          'Kidneys contribute to fluid and electrolyte balance and participate in several other important body-regulation processes.'
      }
    ],
    process: [
      'Blood enters the kidneys',
      'Filtering begins in nephrons',
      'Useful substances are selectively reabsorbed',
      'Some waste leaves the body in urine'
    ],
    fact:
      'Kidneys do more than remove waste: they help regulate the body’s internal fluid environment.',
    myth: 'Kidneys work like a simple coffee filter.',
    truth:
      'Kidneys actively filter and selectively reabsorb many substances rather than simply removing everything that passes through.',
    aiQuestions: [
      'What is a nephron?',
      'How do kidneys control water balance?',
      'Why does the body produce urine?'
    ]
  },

  {
    id: 'vaccines',
    title: 'How do vaccines work?',
    category: 'Immunity & Health Science',
    icon: '💉',
    summary:
      'Vaccines help the immune system learn to recognize specific threats and prepare for future encounters.',
    intro:
      'Different vaccines use different scientific approaches, but their general goal is to safely expose the immune system to information that helps it recognize a particular infectious threat.',
    sections: [
      {
        heading: 'Immune recognition',
        text:
          'The immune system can recognize features associated with infectious agents. Vaccination helps train immune responses against selected targets.'
      },
      {
        heading: 'Immune memory',
        text:
          'After an immune response, memory cells may help the body respond more quickly or effectively to future encounters with the same or a similar target.'
      }
    ],
    process: [
      'Vaccine introduces immune-relevant information',
      'The immune system recognizes the target',
      'An immune response develops',
      'Immune memory can form',
      'Future responses may be faster'
    ],
    fact:
      'Different vaccines can work through different mechanisms, which is why schedules and doses can vary.',
    myth: 'Vaccines simply give you the disease so you become immune.',
    truth:
      'Vaccines are designed to train immune responses using carefully developed approaches and do not require a person to experience the disease itself in order to build protection.',
    aiQuestions: [
      'Why do some vaccines need multiple doses?',
      'What is immune memory?',
      'How does the immune system recognize germs?'
    ]
  },

  {
    id: 'digestion',
    title: 'What happens to food after you swallow?',
    category: 'Body Systems',
    icon: '🍎',
    summary:
      'Digestion breaks food into smaller components that can be absorbed and used by the body.',
    intro:
      'The digestive system uses movement, enzymes and other processes to break food down and help the body absorb nutrients.',
    sections: [
      {
        heading: 'Breaking food down',
        text:
          'Digestion begins in the mouth and continues through the digestive tract as food is mechanically and chemically processed.'
      },
      {
        heading: 'Absorbing nutrients',
        text:
          'Much nutrient absorption occurs in the small intestine, where digested components can move into the body for use or storage.'
      }
    ],
    process: [
      'Food enters the mouth',
      'Food travels through the digestive tract',
      'Digestive processes break components down',
      'Nutrients are absorbed',
      'Remaining material continues onward'
    ],
    fact:
      'Digestion involves both physical movement and chemical processes.',
    myth: 'Digestion only happens in the stomach.',
    truth:
      'Digestion begins before food reaches the stomach and continues through multiple parts of the digestive system.',
    aiQuestions: [
      'Why does the stomach make acid?',
      'Where are nutrients absorbed?',
      'How long does digestion take?'
    ]
  },

  {
    id: 'immune-system',
    title: 'How does the immune system defend the body?',
    category: 'Immunity & Health Science',
    icon: '🛡️',
    summary:
      'The immune system uses multiple layers of defense to recognize and respond to potentially harmful microbes and other threats.',
    intro:
      'Immune defenses include barriers, cells and signaling systems that work together. Responses can differ depending on the type of challenge.',
    sections: [
      {
        heading: 'Multiple layers of defense',
        text:
          'Physical barriers and innate immune responses provide early protection, while adaptive immune responses can develop targeted recognition and memory.'
      },
      {
        heading: 'Recognition and response',
        text:
          'Immune cells communicate using chemical signals and can coordinate different types of responses.'
      }
    ],
    process: [
      'A potential threat is detected',
      'Immune cells and signals respond',
      'The response adapts to the challenge',
      'Some immune memory may remain'
    ],
    fact:
      'The immune system is not one single organ; it involves many cells, tissues and signaling systems.',
    myth: 'A stronger immune response is always better.',
    truth:
      'Immune responses need to be regulated. Both insufficient and excessive responses can cause problems.',
    aiQuestions: [
      'What is the difference between innate and adaptive immunity?',
      'How do immune cells communicate?',
      'What are antibodies?'
    ]
  },

  {
    id: 'sleep',
    title: 'What happens in your body while you sleep?',
    category: 'Brain & Mental Wellness',
    icon: '😴',
    summary:
      'Sleep is an active biological state associated with changing brain activity and important body processes.',
    intro:
      'Sleep includes different stages and patterns of brain and body activity. Regular sleep supports many aspects of normal functioning and wellbeing.',
    sections: [
      {
        heading: 'Sleep is active',
        text:
          'The brain and body continue many organized processes during sleep. Brain activity changes across different sleep stages.'
      },
      {
        heading: 'Why sleep patterns matter',
        text:
          'Sleep timing, duration and quality can all influence how rested and alert a person feels.'
      }
    ],
    process: [
      'The body prepares for sleep',
      'Sleep stages change over the night',
      'Brain and body activity shifts',
      'The sleep-wake cycle continues'
    ],
    fact:
      'Sleep is not simply the brain switching off; patterns of brain activity continue to change throughout the night.',
    myth: 'You can permanently replace regular sleep with occasional catch-up sleep.',
    truth:
      'Occasional extra sleep may help after short-term sleep loss, but regular sleep patterns remain important for overall wellbeing.',
    aiQuestions: [
      'Why do we dream?',
      'What are sleep stages?',
      'Why do I feel tired after poor sleep?'
    ]
  },
  {
  id: 'meditation',
  icon: '🧘',
  category: 'Mental Wellness',
  title: 'Meditation and mindful pauses',
  summary:
    'Learn how short periods of mindful attention and calm breathing can be used as a relaxation practice.',
  intro:
    'Meditation is a practice of intentionally paying attention to the present moment. Some people use it as a quiet pause, a breathing practice, or a way to develop awareness. Experiences vary from person to person.',
  sections: [
    {
      heading: 'What is meditation?',
      text:
        'Meditation includes a range of practices that involve intentionally directing attention. A simple practice may involve sitting comfortably and gently returning attention to the breath whenever the mind wanders.'
    },
    {
      heading: 'Why take a mindful pause?',
      text:
        'A short pause can provide time to slow down, notice your surroundings, and focus on the present moment. Some people find regular practice helpful for relaxation or concentration, although individual experiences can differ.'
    },
    {
      heading: 'A simple approach',
      text:
        'Choose a comfortable position, breathe naturally, and notice the sensation of breathing. There is no need to force thoughts away; simply notice when attention has wandered and gently return to the present activity.'
    }
  ],
  fact:
    'Meditation does not require a special location or long session. Even a short intentional pause can be used to practice mindful attention.',
  myth:
    'Meditation means completely stopping all thoughts.',
  truth:
    'Thoughts naturally occur. Many meditation practices focus on noticing them without judgment and gently returning attention to a chosen point of focus.',
  aiQuestions: [
    'What is meditation?',
    'How can I start a simple mindfulness practice?',
    'What should I focus on during meditation?'
  ],
  special: 'meditation'
  },
  {
  id: 'bmi',
  icon: '🧮',
  category: 'Body Metrics',
  title: 'Understanding BMI',
  summary:
    'Learn what Body Mass Index measures, how the calculation works, and its important limitations.',
  intro:
    'Body Mass Index, commonly called BMI, is a mathematical value calculated using height and weight. It is often used as a screening measure, but it cannot provide a complete picture of an individual’s health.',
  sections: [
    {
      heading: 'How is BMI calculated?',
      text:
        'BMI is calculated by dividing weight in kilograms by the square of height in meters. The calculation is straightforward, but the result is only one piece of information.'
    },
    {
      heading: 'What does BMI measure?',
      text:
        'BMI is a mathematical relationship between height and weight. It is often used in public-health research and screening, but it does not directly measure body composition.'
    },
    {
      heading: 'Why does context matter?',
      text:
        'BMI cannot distinguish between different body compositions and does not independently describe fitness, nutrition, or overall health. For children and teenagers, interpretation also depends on age and growth-related context.'
    }
  ],
  fact:
    'BMI is calculated from only two measurements: height and weight.',
  myth:
    'BMI alone can completely describe whether a person is healthy.',
  truth:
    'BMI is only one screening measure and should be understood alongside broader health and developmental context.',
  aiQuestions: [
    'How is BMI calculated?',
    'What are the limitations of BMI?',
    'Why is BMI interpreted differently for teenagers?'
  ],
  special: 'bmi'
  }
]

const seed = [
  { date: 'Mon', sleep: 7.2, water: 6, movement: 42, mood: 4, energy: 4 },
  { date: 'Tue', sleep: 7.6, water: 7, movement: 51, mood: 4, energy: 4 },
  { date: 'Wed', sleep: 6.9, water: 5, movement: 38, mood: 3, energy: 3 },
  { date: 'Thu', sleep: 7.8, water: 8, movement: 63, mood: 5, energy: 4 },
  { date: 'Fri', sleep: 7.4, water: 7, movement: 56, mood: 4, energy: 4 },
  { date: 'Sat', sleep: 8, water: 6, movement: 71, mood: 5, energy: 5 },
  { date: 'Sun', sleep: 7.7, water: 7, movement: 60, mood: 4, energy: 4 },
]

const demoLabel = {
  product: 'OAT & CRUNCH', serving: '1 bar (40 g)', calories: 180, protein: 6, carbs: 25,
  sugars: 8, fat: 7, satFat: 2, sodium: 120, fiber: 4,
  ingredients: ['Whole grain oats', 'Peanut butter', 'Date paste', 'Brown rice syrup', 'Chia seeds', 'Cocoa powder', 'Sea salt', 'Natural vanilla flavor']
}

const ingredientInfo = {
  'Whole grain oats': 'Whole-grain cereal ingredient; contributes carbohydrate and fiber.',
  'Peanut butter': 'Ground peanut ingredient used for flavor, texture, protein and fat.',
  'Date paste': 'Fruit-based sweetener and texture ingredient.',
  'Brown rice syrup': 'Rice-derived sweetener used for sweetness and binding.',
  'Chia seeds': 'Seed ingredient that can contribute fiber and texture.',
  'Cocoa powder': 'Cocoa ingredient used for flavor and color.',
  'Sea salt': 'Salt used primarily for flavor and formulation.',
  'Natural vanilla flavor': 'Flavoring ingredient used to provide vanilla character.'
}

function useLocal(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial }
  })
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value])
  return [value, setValue]
}

function Logo() {
  return (
    <div className="logo healthscope-logo">
      <img
        src="/healthscope-icon-transparent.png"
        alt="HealthScope"
      />
    </div>
  );
}

function Brand() { return <div className="brand"><Logo /><div><b>HealthScope</b><small>Understand. Track. Stay Informed.</small></div></div> }
function Reminders({
  reminders,
  setReminders,
  notify,
  notificationPermission,
  requestNotificationPermission,
  pushStatus
}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('water');
  const [time, setTime] = useState('09:00');
  const [frequency, setFrequency] = useState('daily');
  const [day, setDay] = useState('Monday');

  const addReminder = async (e) => {
  e.preventDefault();

  if (!title.trim()) return;

  const newReminder = {
    id: Date.now().toString(),
    title: title.trim(),
    type,
    time,
    frequency,
    day: frequency === 'weekly' ? day : null,
    createdAt: new Date().toISOString(),
    completed: false
  };

  try {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service worker is not supported');
    }

    const registration = await navigator.serviceWorker.ready;

    const subscription =
      await registration.pushManager.getSubscription();

    if (!subscription) {
      notify('Please enable notifications first');
      return;
    }

    const response = await fetch('/api/save-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reminder: newReminder,
        subscription: subscription.toJSON()
      })
    });

    const responseText = await response.text();

let result = {};

try {
  result = JSON.parse(responseText);
} catch {
  result = {
    error: responseText
  };
}

if (!response.ok) {
  throw new Error(
    result.error || 'Failed to send push notification'
  );
}

    setReminders([...reminders, newReminder]);

    setTitle('');
    setType('water');
    setTime('09:00');
    setFrequency('daily');
    setDay('Monday');

    notify('Reminder saved 🔔');

  } catch (error) {
    console.error('Reminder save error:', error);
    notify('Could not save reminder');
  }
};
  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
    notify('Reminder deleted');
  };

    const toggleReminder = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );

    notify('Reminder updated');
  };

const testNotification = async () => {
  if (typeof Notification === 'undefined') {
    notify('Notifications are not supported in this browser');
    return;
  }

  if (Notification.permission !== 'granted') {
    notify('Please enable notifications first');
    return;
  }

  if (
    !('serviceWorker' in navigator) ||
    !('PushManager' in window)
  ) {
    notify('Push notifications are not supported in this browser');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    let subscription =
      await registration.pushManager.getSubscription();

    // Create PushSubscription if one does not exist
    if (!subscription) {
      const vapidPublicKey =
        import.meta.env.VITE_VAPID_PUBLIC_KEY;

      if (!vapidPublicKey) {
        throw new Error('VAPID public key is missing');
      }

      const padding = '='.repeat(
  (4 - (vapidPublicKey.length % 4)) % 4
);

const base64 = (
  vapidPublicKey + padding
)
  .replace(/-/g, '+')
  .replace(/_/g, '/');

const rawData = window.atob(base64);

const applicationServerKey = Uint8Array.from(
  [...rawData].map((char) => char.charCodeAt(0))
);
      subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey
        });
    }

    // Send subscription to Vercel API
    const response = await fetch('/api/send-push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        title: 'HealthScope 🔔',
        body: 'Test successful! Your HealthScope notifications are working.',
        url: '/'
      })
    });

    const responseText = await response.text();

let result = {};

try {
  result = JSON.parse(responseText);
} catch {
  result = {
    error: responseText
  };
}

if (!response.ok) {
  throw new Error(
    result.error || 'Failed to send push notification'
  );
}

    setPushStatus('subscribed');
    notify('Test notification sent successfully 🔔');

  } catch (error) {
  console.error('Notification error:', error);

  notify(
    error?.message
      ? `Push error: ${error.message}`
      : 'Notification setup failed'
  );
  }
};
  return (
    <>
      <Title
        k="REMINDERS"
        h="Stay on schedule."
        p="Create reminders for water, medicines, and important routines."
      /><section className="card pad notification-panel">
  <div className="notification-panel-info">
    <div className="notification-icon">
      <Bell size={21} />
    </div>

    <div>
      <label>NOTIFICATIONS</label>

      <h3>
        {notificationPermission === 'granted'
          ? 'Notifications are enabled'
          : notificationPermission === 'denied'
            ? 'Notifications are blocked'
            : 'Stay on track with reminders'}
      </h3>

      <p>
        {notificationPermission === 'granted'
          ? 'HealthScope can show reminder notifications when the app is active.'
          : notificationPermission === 'denied'
            ? 'Enable notifications from your browser or device settings to receive reminders.'
            : 'Allow notifications so HealthScope can alert you when a reminder is due.'}
      </p>
    </div>
  </div>

  <div className="notification-actions">
  {notificationPermission !== 'granted' ? (
    <button
      className="primary notification-enable"
      type="button"
      onClick={requestNotificationPermission}
    >
      <Bell size={17} />
      Enable notifications
    </button>
  ) : (
    <button
      className="notification-test"
      type="button"
      onClick={testNotification}
    >
      <Bell size={17} />
      Send test notification
    </button>
    )}

  <div className="push-status">
    <div className={`push-dot ${pushStatus}`}></div>

    <div>
      <b>
        {pushStatus === 'subscribed'
          ? 'Background notifications connected'
          : pushStatus === 'ready'
            ? 'Background notifications available'
            : pushStatus === 'unsupported'
              ? 'Background notifications unavailable'
              : pushStatus === 'error'
                ? 'Background notification setup needs attention'
                : 'Checking notification capability...'}
      </b>

      <small>
        {pushStatus === 'subscribed'
          ? 'This device is connected for HealthScope push notifications.'
          : pushStatus === 'ready'
            ? 'This device supports background notification setup.'
            : 'HealthScope is checking your browser capabilities.'}
      </small>
    </div>
  </div>

</div>
</section>

      <section className="card pad reminder-form-card">
        <div className="reminder-form-heading">
          <div>
            <label>NEW REMINDER</label>
            <h2>Create a reminder</h2>
          </div>
          <Bell size={22} />
        </div>

        <form onSubmit={addReminder} className="reminder-form">

          <label>
            Reminder name
            <input
              type="text"
              placeholder="e.g. Drink water"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={60}
            />
          </label>

          <label>
            Reminder type
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);

                if (e.target.value === 'water' && !title) {
                  setTitle('Drink water');
                }
              }}
            >
              <option value="water">💧 Water</option>
              <option value="medicine">💊 Medicine</option>
              <option value="custom">🔔 Custom</option>
            </select>
          </label>

          <label>
            Time
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <label>
            Repeat
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </label>

          {frequency === 'weekly' && (
            <label>
              Day
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
            </label>
          )}

          <button className="primary" type="submit">
            <Plus size={17} />
            Save reminder
          </button>
        </form>
      </section>
      <section className="reminders-list">
        <div className="section">
          <div>
            <label>YOUR REMINDERS</label>
            <h2>Saved schedules</h2>
          </div>
        </div>

        {reminders.length === 0 ? (
          <div className="card pad reminder-empty">
            <Bell size={24} />
            <h3>No reminders yet</h3>
            <p>Create your first reminder above to keep your routine organized.</p>
          </div>
        ) : (
          <div className="reminder-cards">
            {reminders.map((reminder) => (
              <div className="card reminder-item" key={reminder.id}>
                <div className="reminder-icon">
                  {reminder.type === 'water'
                    ? '💧'
                    : reminder.type === 'medicine'
                      ? '💊'
                      : '🔔'}
                </div>

                <div className="reminder-info">
                  <b>{reminder.title}</b>

                  <small>
                    {reminder.frequency === 'once'
                      ? `Once at ${reminder.time}`
                      : reminder.frequency === 'daily'
                        ? `Every day at ${reminder.time}`
                        : `Every ${reminder.day} at ${reminder.time}`}
                  </small>
                </div>

                <div className="reminder-time">
                  <b>
                    {new Date(`2000-01-01T${reminder.time}`)
                      .toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                  </b>

                  <small>
                    {reminder.frequency === 'once'
                      ? 'Once'
                      : reminder.frequency === 'daily'
                        ? 'Daily'
                        : 'Weekly'}
                  </small>
                </div>
                <div className="reminder-actions">
  <button
    type="button"
    className={`reminder-toggle ${reminder.completed ? 'paused' : ''}`}
    onClick={() => toggleReminder(reminder.id)}
    title={reminder.completed ? 'Resume reminder' : 'Pause reminder'}
  >
    {reminder.completed ? '▶' : 'Ⅱ'}
  </button>

  <button
    type="button"
    className="reminder-delete"
    onClick={() => deleteReminder(reminder.id)}
    title="Delete reminder"
  >
    <Trash2 size={17} />
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </section>

    </>
  );
}

function App() {
  const [page, setPage] = useState('home')
  const [entries, setEntries] = useLocal('hs_entries', [])
  const [dark, setDark] = useLocal('hs_dark', false)
  const [chatOpen, setChatOpen] = useState(false)
  const [pendingQuestion, setPendingQuestion] = useState('')
  const [toast, setToast] = useState('')
  const [labelData, setLabelData] = useState(null)
  const [reminders, setReminders] = useLocal('hs_reminders', [])
  const [notificationPermission, setNotificationPermission] = useState(
  typeof Notification !== 'undefined'
    ? Notification.permission
    : 'unsupported'
)
  const [pushStatus, setPushStatus] = useState('checking')
useEffect(() => {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register('/sw.js').catch((error) => {
    console.error('Service Worker registration failed:', error);
  });
}, []);
  useEffect(() => {
  const checkPushSupport = async () => {
    const supported =
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      typeof Notification !== 'undefined'

    if (!supported) {
      setPushStatus('unsupported')
      return
    }

    try {
      const registration = await navigator.serviceWorker.ready

      const subscription =
        await registration.pushManager.getSubscription()

      setPushStatus(subscription ? 'subscribed' : 'ready')
    } catch (error) {
      console.error('Push capability check failed:', error)
      setPushStatus('error')
    }
  }

  checkPushSupport()
}, [])
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => {
    if (!toast) return undefined
    const id = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(id)
  }, [toast])
  const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat(
    (4 - (base64String.length % 4)) % 4
  )

  const base64 = (
    base64String + padding
  )
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0))
  )
  }
  const requestNotificationPermission = async () => {
  if (
    typeof Notification === 'undefined' ||
    !('serviceWorker' in navigator) ||
    !('PushManager' in window)
  ) {
    setToast('Push notifications are not supported')
    return
  }

  try {
    // 1. Ask for notification permission
    const permission = await Notification.requestPermission()
    setNotificationPermission(permission)

    if (permission !== 'granted') {
      if (permission === 'denied') {
        setToast('Notifications blocked in browser settings')
      } else {
        setToast('Notification permission not granted')
      }
      return
    }

    // 2. Wait for the HealthScope service worker
    const registration = await navigator.serviceWorker.ready

    // 3. Get existing subscription
let subscription =
  await registration.pushManager.getSubscription()

// 4. Always create a fresh subscription using the current VAPID key
if (subscription) {
  await subscription.unsubscribe()
  subscription = null
}

const vapidPublicKey =
  import.meta.env.VITE_VAPID_PUBLIC_KEY

if (!vapidPublicKey) {
  throw new Error('VAPID public key is missing')
}

const applicationServerKey =
  urlBase64ToUint8Array(vapidPublicKey)

subscription =
  await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey
})

      const applicationServerKey =
        urlBase64ToUint8Array(vapidPublicKey)

      subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey
        })

    // 5. Send the subscription to our Vercel API
    const response = await fetch('/api/send-push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        title: 'HealthScope 🔔',
        body: 'Notifications are now connected!',
        url: '/'
      })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        result.error || 'Failed to send push notification'
      )
    }

    // 6. Update UI
    setPushStatus('subscribed')
    setToast('Notifications enabled 🔔')

  } catch (error) {
    console.error('Notification setup failed:', error)
    setToast('Could not enable notifications')
  }
  }
  const nav = (next) => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  
  const clearLocal = () => {
    localStorage.removeItem('hs_entries'); localStorage.removeItem('hs_dark')
    setEntries([]); setLabelData(null); setToast('Local demo data cleared')
  }
  const saveEntry = (entry) => {
  const now = new Date();

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('-');

  const newEntry = {
    ...entry,
    id: today,
    date: now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }),
    createdAt: now.toISOString()
  };

  setEntries(prev => {
    const existingIndex = prev.findIndex(item => item.id === today);

    if (existingIndex >= 0) {
      const updated = [...prev];
      updated[existingIndex] = newEntry;
      return updated;
    }

    return [...prev, newEntry];
  });

  setToast('Wellness entry saved');
};
  return <div className="app">
    <aside><Brand /><nav>
      <NavButton active={page === 'home'} icon={Home} label="Home" onClick={() => nav('home')} />
      <NavButton active={page === 'track'} icon={BarChart3} label="Track" onClick={() => nav('track')} />
      <NavButton active={page === 'label'} icon={ScanLine} label="LabelScope" onClick={() => nav('label')} />
      <NavButton active={page === 'learn'} icon={BookOpen} label="Learn" onClick={() => nav('learn')} />
      <NavButton active={page === 'reminders'} icon={Bell} label="Reminders" onClick={() => nav('reminders')} />
      <NavButton active={page === 'profile'} icon={UserRound} label="Profile" onClick={() => nav('profile')} />
    </nav><button className="ask" onClick={() => setChatOpen(true)}><Sparkles size={17} />Ask HealthScope</button><small><ShieldCheck size={14} />Privacy-first</small></aside>
    <main className="main">
      <header><div className="mobile-brand"><Logo />HealthScope</div><div className="top"><button aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button><span>● Demo Mode</span></div></header>
      <div className="content">
        {page === 'home' && <HomePage nav={nav} entries={entries} ask={() => setChatOpen(true)} />}
        {page === 'track' && <Track entries={entries} save={saveEntry} />}
        {page === 'label' && <LabelScope data={labelData} setData={setLabelData} done={() => setToast('Label ready')} />}
        {page === 'learn' && (
  <Learn
    askTopic={(question) => {
      setPendingQuestion(question);
      setChatOpen(true);
    }}
  />
)}
        {page === 'reminders' && (
  <Reminders
    reminders={reminders}
    setReminders={setReminders}
    notify={setToast}
    notificationPermission={notificationPermission}
    requestNotificationPermission={requestNotificationPermission}
    pushStatus={pushStatus}
  />
)}
        {page === 'profile' && <Profile dark={dark} setDark={setDark} clear={clearLocal} />}
      </div>
    </main>
    <div className="bottom">
  {[
    ['home', Home, 'Home'],
    ['track', BarChart3, 'Track'],
    ['label', ScanLine, 'Label'],
    ['learn', BookOpen, 'Learn'],
    ['reminders', Bell, 'Reminders'],
    ['profile', UserRound, 'Profile']
  ].map(([id, Icon, label]) => (
    <button
      className={page === id ? 'active' : ''}
      onClick={() => nav(id)}
      key={id}
    >
      <Icon size={19} />
      <small>{label}</small>
    </button>
  ))}
</div>
 {chatOpen && (
  <Chat
    close={() => setChatOpen(false)}
    initialQuestion={pendingQuestion}
  />
)}
{toast && <div className="toast"><Check size={15} />{toast}</div>}
</div>
}
function NavButton({ active, icon: Icon, label, onClick }) { return <button className={active ? 'active' : ''} onClick={onClick}><Icon size={18} />{label}</button> }
function Title({ k, h, p }) { return <div className="title"><div><label>{k}</label><h1>{h}</h1><p>{p}</p></div></div> }
function Disclaimer() { return <div className="disclaimer"><ShieldCheck size={16} /><span><b>HealthScope informs. It does not diagnose.</b> General wellness and health-education information only.</span></div> }
function Metric({ icon: Icon, name, value }) { return <div className="card metric"><Icon size={18} /><span>{name}</span><b>{value}</b><small>Self-entered</small></div> }
function Action({ icon: Icon, title, description, onClick, hot }) { return <button className={`action ${hot ? 'hot' : ''}`} onClick={onClick}><i><Icon size={19} /></i><div><b>{title}</b><small>{description}</small></div><ChevronRight size={16} /></button> }

function HomePage({ nav, entries, ask }) {
  const now = new Date();

const todayId = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0')
].join('-');

const todayEntry = entries.find(entry => entry.id === todayId);

const current = todayEntry || {
  sleep: 0,
  water: 0,
  movement: 0,
  mood: 0,
  energy: 0
};
  return <>
    <section className="hero"><div><label>WELLNESS SNAPSHOT · DEMO</label><h1>Understand your everyday wellness.</h1><p>Track simple patterns, explore food labels, and learn health information without the medical jargon.</p></div><div className="badge"><Sparkles size={19} />Education, not diagnosis.</div></section>
    {!todayEntry && (
  <section className="newday card">
    <div className="newday-icon">
      <Sun size={24} />
    </div>

    <div className="newday-content">
      <label>NEW DAY</label>
      <h2>New day, new energy.</h2>
      <p>
        What would you like to focus on today? Start with a few simple
        wellness observations and build your personal history over time.
      </p>
    </div>

    <button
      className="primary"
      onClick={() => nav('track')}
    >
      Start today's log
      <ChevronRight size={17} />
    </button>
  </section>
)}
    <section className="metrics">
  <Metric
    icon={Moon}
    name="Sleep"
    value={entries.length ? `${current.sleep.toFixed(1)}h` : '—'}
  />
  <Metric
    icon={Droplets}
    name="Water"
    value={entries.length ? `${current.water}/8` : '—'}
  />
  <Metric
    icon={Activity}
    name="Movement"
    value={entries.length ? `${current.movement} min` : '—'}
  />
  <Metric
    icon={Zap}
    name="Energy"
    value={entries.length ? `${current.energy}/5` : '—'}
  />
</section>
    <div className="section"><div><label>RECENT PATTERN</label><h2>A quick look at your entries</h2></div><button className="link" onClick={() => nav('track')}>Open tracker <ChevronRight size={15} /></button></div>
    <section className="dash">

  <div className="card chart">
    <b>Sleep trend</b>

    <small>
      {entries.length
        ? 'Your logged wellness history'
        : 'Start logging to build your personal trend'}
    </small>

    {entries.length > 0 ? (
      <ResponsiveContainer width="100%" height="88%">
        <AreaChart data={entries}>
          <defs>
            <linearGradient id="sleepFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#23b7a3" stopOpacity=".3" />
              <stop offset="1" stopColor="#23b7a3" stopOpacity="0" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="var(--line)"
          />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[3, 12]}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="sleep"
            stroke="#23b7a3"
            fill="url(#sleepFill)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    ) : (
      <div className="chart-empty">
        <Moon size={26} />
        <b>No wellness history yet</b>
        <span>
          Save your first daily entry to start building your personal trend.
        </span>
        <button
          className="secondary"
          onClick={() => nav('track')}
        >
          Log today's wellness
        </button>
      </div>
    )}
  </div>

  <div className="card insight">
  <Sparkles size={20} />

  <label>HEALTHSCOPE INSIGHT</label>

  {entries.length === 0 ? (
    <>
      <h3>Your personal wellness story starts here.</h3>
      <p>
        Add your first wellness entry to begin building a genuine record of
        your everyday habits.
      </p>
      <small>
        Insights are based only on information you choose to record.
      </small>
    </>
  ) : entries.length === 1 ? (
    <>
      <h3>Your first wellness entry is saved.</h3>
      <p>
        Keep logging over time to see patterns in your own self-entered
        wellness history.
      </p>
      <small>Based only on your recorded data.</small>
    </>
  ) : (
    <>
      <h3>You’re building your personal wellness history.</h3>
      <p>
        HealthScope can compare your self-entered observations over time and
        help you understand simple patterns.
      </p>
      <small>
        Educational information only · Not a medical assessment.
      </small>
    </>
  )}
</div>

</section>
    <div className="section"><div><label>EXPLORE</label><h2>Make the next step useful.</h2></div></div>
    <section className="actions"><Action icon={BarChart3} title="Log wellness" description="Add simple daily observations." onClick={() => nav('track')} /><Action icon={ScanLine} title="Scan a label" description="Explore nutrition and ingredients." onClick={() => nav('label')} hot /><Action icon={MessageCircle} title="Ask HealthScope" description="Get a clear educational explanation." onClick={ask} /><Action icon={BookOpen} title="Explore Learn" description="Build practical health literacy." onClick={() => nav('learn')} /></section>
    <Disclaimer />
  </>
}

function Track({ entries, save }) {
  const [sleep, setSleep] = useState(7.5), [water, setWater] = useState(6), [movement, setMovement] = useState(45), [mood, setMood] = useState(4), [energy, setEnergy] = useState(4)
  const [overview, setOverview] = useState('');
const [overviewLoading, setOverviewLoading] = useState(false);
const [overviewError, setOverviewError] = useState('');
  const generateOverview = async () => {
  if (!entries.length) return;

  setOverviewLoading(true);
  setOverviewError('');
  setOverview('');

  try {
    const response = await fetch('/api/wellness-overview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        entries
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || 'Unable to generate wellness overview.'
      );
    }

    if (!result.overview) {
      throw new Error('No wellness overview was returned.');
    }

    setOverview(result.overview);

  } catch (error) {
    console.error('Wellness overview error:', error);

    setOverviewError(
      error.message || 'Unable to generate wellness overview.'
    );

  } finally {
    setOverviewLoading(false);
  }
};
  const sortedEntries = [...entries].sort((a, b) =>
  new Date(a.createdAt) - new Date(b.createdAt)
);

const latestEntry = sortedEntries.at(-1);
const previousEntry =
  sortedEntries.length >= 2
    ? sortedEntries.at(-2)
    : null;

const hasComparison = latestEntry && previousEntry;
  const comparison = hasComparison
  ? {
      sleep: latestEntry.sleep - previousEntry.sleep,
      water: latestEntry.water - previousEntry.water,
      movement: latestEntry.movement - previousEntry.movement,
      mood: latestEntry.mood - previousEntry.mood,
      energy: latestEntry.energy - previousEntry.energy
    }
  : null;
  const submit = () =>
  save({
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }),
    sleep,
    water,
    movement,
    mood,
    energy
    });

  return (
    <>
      <Title
        k="TRACK"
        h="Your wellness, your way."
        p="Log simple everyday observations. Nothing here is a medical measurement."
      />

      <section className="trackgrid">

        <div className="card form">

          <Control
            icon={Moon}
            name="Sleep duration"
            value={`${sleep.toFixed(1)} hours`}
          >
            <input
              type="range"
              min="3"
              max="12"
              step=".1"
              value={sleep}
              onChange={e => setSleep(+e.target.value)}
            />
          </Control>

          <Control
            icon={Droplets}
            name="Water intake"
            value={`${water}/8 glasses`}
          >
            <input
              type="range"
              min="0"
              max="12"
              value={water}
              onChange={e => setWater(+e.target.value)}
            />
          </Control>

          <Control
            icon={Activity}
            name="Movement"
            value={`${movement} minutes`}
          >
            <input
              type="range"
              min="0"
              max="180"
              value={movement}
              onChange={e => setMovement(+e.target.value)}
            />
          </Control>

          <Scale name="Mood" value={mood} setValue={setMood} />

          <Scale name="Energy" value={energy} setValue={setEnergy} />

          <button className="primary" onClick={submit}>
            <Plus size={17} />
            Save entry
          </button>

        </div>

        <div className="card chartbox">
          <b>Movement trend</b>

          <small>
            {entries.length
              ? 'Your self-entered observations'
              : 'Your trend will appear after you save entries'}
          </small>

          {entries.length > 0 ? (
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={entries}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--line)"
                />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="movement"
                  stroke="#23b7a3"
                  fill="#23b7a3"
                  fillOpacity=".1"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-empty">
              <Activity size={26} />
              <b>No movement history yet</b>
              <span>
                Save your first wellness entry to begin tracking your activity
                pattern.
              </span>
            </div>
          )}

          <p>
            <b>Observed:</b>{' '}
            {entries.length
              ? 'These values come only from your self-entered wellness records.'
              : 'No observations have been recorded yet.'}
          </p>
        </div>
{hasComparison && (
  <section className="card comparison-card">
    <div className="comparison-head">
      <div>
        <label>RECENT CHANGE</label>
        <h2>Compared with your previous entry</h2>
      </div>

      <BarChart3 size={22} />
    </div>

    <p className="comparison-note">
      These are changes between your two most recent self-entered wellness
      records.
    </p>

    <div className="comparison-grid">

      <div className="comparison-item">
        <span>🌙 Sleep</span>
        <b>
          {comparison.sleep > 0 ? '+' : ''}
          {comparison.sleep.toFixed(1)} h
        </b>
      </div>

      <div className="comparison-item">
        <span>💧 Water</span>
        <b>
          {comparison.water > 0 ? '+' : ''}
          {comparison.water} glasses
        </b>
      </div>

      <div className="comparison-item">
        <span>🚶 Movement</span>
        <b>
          {comparison.movement > 0 ? '+' : ''}
          {comparison.movement} min
        </b>
      </div>

      <div className="comparison-item">
        <span>🙂 Mood</span>
        <b>
          {comparison.mood > 0 ? '+' : ''}
          {comparison.mood}
        </b>
      </div>

      <div className="comparison-item">
        <span>⚡ Energy</span>
        <b>
          {comparison.energy > 0 ? '+' : ''}
          {comparison.energy}
        </b>
      </div>

    </div>

    <div className="comparison-summary">
  {comparison.sleep !== 0 && (
    <p>
      You logged{' '}
      <b>{Math.abs(comparison.sleep).toFixed(1)} hours {comparison.sleep > 0 ? 'more' : 'less'}</b>
      {' '}of sleep than your previous entry.
    </p>
  )}

  {comparison.water !== 0 && (
    <p>
      You logged{' '}
      <b>{Math.abs(comparison.water)} {Math.abs(comparison.water) === 1 ? 'glass' : 'glasses'} {comparison.water > 0 ? 'more' : 'less'}</b>
      {' '}of water than your previous entry.
    </p>
  )}

  {comparison.movement !== 0 && (
    <p>
      You logged{' '}
      <b>{Math.abs(comparison.movement)} minutes {comparison.movement > 0 ? 'more' : 'less'}</b>
      {' '}of movement than your previous entry.
    </p>
  )}

  {comparison.sleep === 0 &&
    comparison.water === 0 &&
    comparison.movement === 0 && (
      <p>
        Your sleep, water, and movement entries were the same as your
        previous record.
      </p>
    )}

  <small>
    A change is not automatically better or worse. It simply reflects
    differences between your own recorded observations.
  </small>
</div>
  </section>
)}
      </section><section className="card ai-overview">
  <div className="ai-overview-head">
    <div className="ai-overview-icon">
      <Sparkles size={21} />
    </div>

    <div>
      <label>AI WELLNESS OVERVIEW</label>
      <h2>Your personal wellness pattern</h2>
    </div>
  </div>

  <p className="ai-overview-intro">
    Generate a short educational overview based only on your self-entered
    wellness history.
  </p>

  {entries.length === 0 ? (
    <div className="ai-overview-empty">
      <p>Save your first wellness entry to start building a personal overview.</p>
    </div>
  ) : (
    <>
      {!overview && !overviewLoading && (
        <button
          className="primary"
          onClick={generateOverview}
        >
          <Sparkles size={17} />
          Generate overview
        </button>
      )}

      {overviewLoading && (
        <div className="ai-overview-loading">
          <Sparkles size={18} />
          <span>HealthScope is reviewing your logged patterns…</span>
        </div>
      )}

      {overviewError && (
        <div className="ai-overview-error">
          {overviewError}
        </div>
      )}

      {overview && (
        <div className="ai-overview-result">
          <p>{overview}</p>

          <button
            className="secondary"
            onClick={generateOverview}
          >
            Generate again
          </button>
        </div>
      )}
    </>
  )}

  <small className="ai-overview-note">
    Educational pattern summary only. This does not diagnose conditions or
    replace professional medical advice.
  </small>
</section><section className="history-section">
  <div className="section">
    <div>
      <label>YOUR HISTORY</label>
      <h2>Wellness entries over time</h2>
    </div>
  </div>

  {entries.length === 0 ? (
    <div className="card history-empty">
      <BookOpen size={26} />
      <b>No wellness history yet</b>
      <p>
        Your saved daily observations will appear here as you build your
        personal wellness history.
      </p>
    </div>
  ) : (
    <div className="history-list">
      {[...entries].reverse().map((entry) => (
        <div className="card history-item" key={entry.id}>
          <div className="history-date">
            <b>{entry.date}</b>
            <small>
              {entry.id ===
              [
                new Date().getFullYear(),
                String(new Date().getMonth() + 1).padStart(2, '0'),
                String(new Date().getDate()).padStart(2, '0')
              ].join('-')
                ? 'Today'
                : 'Saved entry'}
            </small>
          </div>

          <div className="history-values">
            <span>🌙 {entry.sleep.toFixed(1)}h</span>
            <span>💧 {entry.water}/8</span>
            <span>🚶 {entry.movement} min</span>
            <span>⚡ {entry.energy}/5</span>
          </div>
        </div>
      ))}
    </div>
  )}
</section>
    </>
  );
}
function Control({ icon: Icon, name, value, children }) { return <div className="control"><div><span><Icon size={16} />{name}</span><b>{value}</b></div>{children}</div> }
function Scale({ name, value, setValue }) { return <div className="control"><div><span><Sun size={16} />{name}</span><b>{value}/5</b></div><div className="scale">{[1, 2, 3, 4, 5].map(x => <button className={x === value ? 'sel' : ''} onClick={() => setValue(x)} key={x}>{x}</button>)}</div></div> }
function LabelScope({ data, setData, done }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (cameraOn && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraOn]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  const startCamera = async () => {
    setError('');

    if (
      !window.isSecureContext ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setError(
        'Camera access requires HTTPS and a supported browser. You can upload an image or use the demo label.'
      );
      return;
    }

    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: 'environment'
          }
        },
        audio: false
      });

      setCameraOn(true);
    } catch {
      setError(
        'Camera access isn’t available. You can upload a photo or use the demo label instead.'
      );
    }
  };

  const analyzeImage = async (file) => {
    if (!file) return;

    setProcessing(true);
    setError('');

    try {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const response = await fetch('/api/analyze-label', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image: reader.result
            })
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              result.error || 'Could not analyze this label.'
            );
          }

          setData(result.data);
          stopCamera();
          done();
        } catch (err) {
          console.error(err);
          setError(
            'We could not confidently read this label. Try another photo.'
          );
        } finally {
          setProcessing(false);
        }
      };

      reader.onerror = () => {
        setError(
          'We could not read this image. Please try another one.'
        );
        setProcessing(false);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setError(
        'Something went wrong while preparing the image.'
      );
      setProcessing(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (!video.videoWidth || !video.videoHeight) {
      setError(
        'Camera is still starting. Please wait a moment and try again.'
      );
      return;
    }

    const canvas = document.createElement('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');

    if (!context) {
      setError('We could not capture the image. Please try again.');
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError(
            'We could not capture the image. Please try again.'
          );
          return;
        }

        const file = new File(
          [blob],
          'label-photo.jpg',
          {
            type: 'image/jpeg'
          }
        );

        analyzeImage(file);
      },
      'image/jpeg',
      0.9
    );
  };

  const useDemoLabel = () => {
    setProcessing(true);

    setTimeout(() => {
      stopCamera();
      setData(demoLabel);
      setProcessing(false);
      done();
    }, 500);
  };

  if (data) {
    return (
      <LabelResult
        data={data}
        reset={() => setData(null)}
      />
    );
  }

  return (
    <>
      <Title
        k="LABELSCOPE"
        h="Understand what’s inside your food."
        p="Scan, upload, or use a demo label. Results are educational and nutritional context varies between people."
      />

      {/* WHY FOOD LABELS MATTER */}

      <section className="label-why card">
        <div className="label-why-icon">
          <Sparkles size={19} />
        </div>

        <div className="label-why-content">
          <label>WHY UNDERSTAND FOOD LABELS?</label>

          <h3>
            The front of a package doesn’t tell the whole story.
          </h3>

          <p>
            Nutrition facts, serving sizes, sugars, sodium, fats,
            protein, and ingredients can give you a clearer picture
            of what a packaged food contains.
          </p>

          <div className="label-why-points">

            <div>
              <span>🔍</span>
              <strong>Know what’s inside</strong>
              <small>
                Explore ingredients and nutrition information.
              </small>
            </div>

            <div>
              <span>📊</span>
              <strong>Understand the numbers</strong>
              <small>
                Put serving sizes and nutrient values into context.
              </small>
            </div>

            <div>
              <span>🧠</span>
              <strong>Make informed choices</strong>
              <small>
                Use the label as a tool for learning, not judgment.
              </small>
            </div>

          </div>

          <small className="label-why-note">
            <Info size={13} />

            <span>
              LabelScope provides educational information and does
              not determine whether a food is medically appropriate
              for an individual.
            </span>
          </small>
        </div>
      </section>


      {/* SCANNER */}

      <section className="scanlayout">

        <div className="card scanner">

          {cameraOn ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />

              <div className="camera-overlay">
                <span>
                  Align the nutrition panel inside the frame
                </span>
              </div>

              <div className="camera-actions">

                <button
                  className="secondary"
                  onClick={stopCamera}
                >
                  Cancel
                </button>

                <button
                  className="shutter"
                  aria-label="Capture and analyze"
                  onClick={capturePhoto}
                >
                  <Camera size={22} />
                </button>

              </div>
            </>
          ) : (
            <div className="scanempty">

              <div className="scanicon">
                <ScanLine size={32} />
              </div>

              <h2>
                Scan a packaged-food label
              </h2>

              <p>
                Use your camera when available, or choose another
                input method.
              </p>

              <button
                className="primary"
                onClick={startCamera}
              >
                <Camera size={17} />
                Open camera
              </button>

              <label className="secondary">
                <Upload size={17} />
                Upload image

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    analyzeImage(e.target.files?.[0])
                  }
                />
              </label>

              <button
                className="link"
                onClick={useDemoLabel}
              >
                Use demo label
              </button>

              {processing && (
                <small className="processing">
                  Analyzing label…
                </small>
              )}

            </div>
          )}

        </div>


        {/* HOW IT WORKS */}

        <div className="card how">

          <label>HOW IT WORKS</label>

          {[
            [
              '01',
              'Capture',
              'Take a clear photo of the nutrition panel.'
            ],
            [
              '02',
              'Analyze',
              'Extract readable nutrition information.'
            ],
            [
              '03',
              'Understand',
              'Explore nutrients and ingredient functions.'
            ]
          ].map(row => (
            <div
              className="howrow"
              key={row[0]}
            >
              <b>{row[0]}</b>

              <span>
                <strong>{row[1]}</strong>
                {row[2]}
              </span>
            </div>
          ))}

          <div className="notice">

            <Info size={16} />

            <span>
              <b>Camera permissions</b>
              <br />

              Production camera access requires HTTPS. If permission
              is denied, upload or manual entry remains available.
            </span>

          </div>

        </div>

      </section>


      {/* ERROR */}

      {error && (
        <div className="error">

          <Info size={16} />

          <span>
            {error}
          </span>

          <button
            onClick={() => setError('')}
          >
            <X size={15} />
          </button>

        </div>
      )}

    </>
  );
}
function calculateLabelInsightScore(data) {
  let score = 3;

  const getNumber = (value) => {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      value === 'Not detected'
    ) {
      return null;
    }

    const number = parseFloat(value);

    return Number.isFinite(number) ? number : null;
  };

  const sugar = getNumber(data.sugars);
  const sodium = getNumber(data.sodium);
  const fiber = getNumber(data.fiber);
  const protein = getNumber(data.protein);
  const satFat = getNumber(data.satFat);

  /*
   * This is an educational label-profile score.
   * It is NOT a health score or medical recommendation.
   *
   * Start from a neutral midpoint.
   */
  
  // Sugar signal
  if (sugar !== null) {
    if (sugar <= 5) score += 0.5;
    else if (sugar > 20) score -= 0.7;
    else if (sugar > 10) score -= 0.4;
  }

  // Fiber signal
  if (fiber !== null) {
    if (fiber >= 5) score += 0.5;
    else if (fiber >= 3) score += 0.25;
  }

  // Protein signal
  if (protein !== null) {
    if (protein >= 10) score += 0.35;
    else if (protein >= 5) score += 0.15;
  }

  // Sodium signal
  if (sodium !== null) {
    if (sodium < 120) score += 0.25;
    else if (sodium >= 400) score -= 0.5;
    else if (sodium >= 300) score -= 0.25;
  }

  // Saturated fat signal
  if (satFat !== null) {
    if (satFat >= 5) score -= 0.45;
    else if (satFat >= 2) score -= 0.2;
  }

  /*
   * Keep the score within 1–5.
   */
  score = Math.max(1, Math.min(5, score));

  /*
   * Round to one decimal place.
   */
  return Math.round(score * 10) / 10;
}

function getLabelInsightCategory(score) {
  if (score < 2) {
    return 'Several label factors worth understanding';
  }

  if (score < 3) {
    return 'Several factors worth noticing';
  }

  if (score < 4) {
    return 'Mixed label profile';
  }

  if (score < 4.6) {
    return 'Generally favorable label profile';
  }

  return 'Strong label profile';
    }
function LabelResult({ data, reset }) {
  const labelInsightScore = calculateLabelInsightScore(data);
const labelInsightCategory =
  getLabelInsightCategory(labelInsightScore);
  const [aiSynopsis, setAiSynopsis] = useState(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const generateSynopsis = async () => {
      setAiLoading(true);
      setAiError('');
      setAiSynopsis(null);

      try {
        const response = await fetch('/api/label-synopsis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            label: data
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || 'Could not generate synopsis.'
          );
        }

        if (!cancelled) {
          setAiSynopsis(result.data);
        }
      } catch (error) {
        console.error('LabelScope AI synopsis error:', error);

        if (!cancelled) {
          setAiError(
            'AI synopsis is temporarily unavailable. The scanned label information is still available below.'
          );
        }
      } finally {
        if (!cancelled) {
          setAiLoading(false);
        }
      }
    };

    generateSynopsis();

    return () => {
      cancelled = true;
    };
  }, [data]);

  const rows = [
    ['Calories', data.calories, 'kcal'],
    ['Protein', data.protein, 'g'],
    ['Carbohydrates', data.carbs, 'g'],
    ['Sugars', data.sugars, 'g'],
    ['Fat', data.fat, 'g'],
    ['Saturated fat', data.satFat, 'g'],
    ['Sodium', data.sodium, 'mg'],
    ['Fiber', data.fiber, 'g']
  ];

  const numberValue = (value) => {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      value === 'Not detected'
    ) {
      return null;
    }

    const num = parseFloat(value);

    return Number.isFinite(num) ? num : null;
  };

  const sugar = numberValue(data.sugars);
  const fiber = numberValue(data.fiber);
  const protein = numberValue(data.protein);
  const sodium = numberValue(data.sodium);

  const nutritionValues = [
    data.calories,
    data.protein,
    data.carbs,
    data.sugars,
    data.fat,
    data.satFat,
    data.sodium,
    data.fiber
  ];

  const nutritionDetected = nutritionValues.some(
    value => numberValue(value) !== null
  );

  const ingredientCount = Array.isArray(data.ingredients)
    ? data.ingredients.length
    : 0;

  const productName =
    data.product && data.product !== 'Not detected'
      ? data.product
      : 'this packaged food';

  let quickOverview = '';

  if (nutritionDetected && ingredientCount > 0) {
    quickOverview =
      `This scan shows ${productName}. Nutrition information was detected for the listed serving size, and ${ingredientCount} ingredient${ingredientCount === 1 ? '' : 's'} ${ingredientCount === 1 ? 'was' : 'were'} identified from the visible label.`;
  } else if (nutritionDetected) {
    quickOverview =
      `This scan shows ${productName}. Nutrition information was detected for the listed serving size.`;
  } else if (ingredientCount > 0) {
    quickOverview =
      `This scan shows ${productName}. Ingredient information was detected, but nutrition values were not visible in the uploaded image.`;
  } else {
    quickOverview =
      `This scan shows ${productName}. Limited structured information could be extracted from the uploaded image.`;
  }

  const sugarSignal =
    sugar === null
      ? 'Not listed'
      : sugar <= 1
      ? 'Low'
      : sugar <= 5
      ? 'Moderate'
      : 'Higher';

  const fiberSignal =
    fiber === null
      ? 'Not listed'
      : fiber === 0
      ? 'None listed'
      : fiber < 3
      ? 'Some'
      : 'Present';

  const proteinSignal =
    protein === null
      ? 'Not listed'
      : protein < 3
      ? 'Small amount'
      : protein < 10
      ? 'Moderate'
      : 'Higher';

  const sodiumSignal =
    sodium === null
      ? 'Not listed'
      : sodium < 120
      ? 'Lower'
      : sodium < 400
      ? 'Moderate'
      : 'Higher';

  return (
    <>
      {/* QUICK OVERVIEW */}

      <div className="quick-overview">
        <div className="quick-overview-icon">
          <Sparkles size={18} />
        </div>

        <div>
          <label>QUICK OVERVIEW</label>
          <p>{quickOverview}</p>
        </div>
      </div>


      {/* RESULT HEADER */}

      <div className="resulttop">
        <div>
          <label>EDUCATIONAL SNAPSHOT</label>

          <h2>{data.product}</h2>

          <small>
            Serving size · {data.serving}
          </small>
        </div>

        <button
          className="secondary"
          onClick={reset}
        >
          New label
        </button>
      </div>


      {/* LABELSCOPE AI SYNOPSIS */}

      <section className="card ai-synopsis">

        <div className="ai-synopsis-header">

          <div className="ai-synopsis-title">

            <div className="ai-synopsis-icon">
              <Sparkles size={18} />
            </div>

            <div>
              <label>LABELSCOPE AI</label>
              <h3>Food label synopsis</h3>
            </div>

          </div>

          <span className="ai-badge">
            EDUCATIONAL
          </span>

        </div>


        {/* AI LOADING */}

        {aiLoading && (
          <div className="ai-loading">

            <div className="ai-loading-dot" />

            <span>
              Reading the detected label information…
            </span>

          </div>
        )}


  {/* AI LOADING */}

{aiLoading && (
  <div className="ai-loading">
    <Sparkles size={16} />
    <span>Reading the detected label information…</span>
  </div>
)}

{/* AI SYNOPSIS */}

{!aiLoading && aiSynopsis && (
  <div className="ai-synopsis-content">

    {aiSynopsis.synopsis && (
      <p className="ai-summary">
        {aiSynopsis.synopsis}
      </p>
    )}

    {aiSynopsis.worthNoticing && (
      <div className="ai-point positive">
        <span>✓</span>

        <div>
          <strong>Worth noticing</strong>
          <p>{aiSynopsis.worthNoticing}</p>
        </div>
      </div>
    )}

    {aiSynopsis.keepInMind && (
      <div className="ai-point attention">
        <span>!</span>

        <div>
          <strong>Keep in mind</strong>
          <p>{aiSynopsis.keepInMind}</p>
        </div>
      </div>
    )}

    {aiSynopsis.ingredientNote && (
      <div className="ai-point ingredient-note">
        <span>⌁</span>

        <div>
          <strong>Ingredient note</strong>
          <p>{aiSynopsis.ingredientNote}</p>
        </div>
      </div>
    )}

    <small className="ai-disclaimer">
      AI-generated educational information based only on detected
      label data. Missing information is not assumed.
    </small>

  </div>
)}

{/* AI ERROR */}

{!aiLoading && !aiSynopsis && (
  <div className="ai-error">

    <Info size={16} />

    <span>
      {aiError ||
        'The AI synopsis could not be generated. The scanned label information is still available below.'}
    </span>

  </div>
)}


      {/* NUTRITION + INGREDIENTS */}
      <section className="label-insight-score card">

  <div className="label-score-left">

    <div className="label-score-icon">
      ⭐
    </div>

    <div>
      <label>LABEL INSIGHT SCORE</label>

      <h3>
        Educational label profile
      </h3>

      <p>
        A transparent score based on detected nutrition
        signals. It is not a measure of overall health.
      </p>
    </div>

  </div>


  <div className="label-score-number">

    <strong>
      {labelInsightScore}
    </strong>

    <span>/ 5</span>

  </div>


  <div className="label-score-category">
    {labelInsightCategory}
  </div>


  <div className="label-score-disclaimer">

    <Info size={14} />

    <span>
      This score is an educational summary of selected
      label signals. It does not determine whether a food
      is healthy, unhealthy, or appropriate for an
      individual.
    </span>

  </div>

</section>

      <section className="resultgrid">

        {/* NUTRITION FACTS */}

        <div className="card pad">

          <b>Nutrition facts</b>

          {!nutritionDetected && (
            <div className="nutrition-missing">

              <Info size={17} />

              <span>

                <b>
                  Nutrition information wasn't visible
                </b>

                <small>
                  Try scanning the Nutrition Facts panel
                  for calories and nutrient values.
                </small>

              </span>

            </div>
          )}

          {rows.map(([name, value, unit]) => {

            const missing =
              value === undefined ||
              value === null ||
              value === '' ||
              value === 'Not detected';

            return (
              <div
                className="nut"
                key={name}
              >

                <span>
                  {name}
                </span>

                <b>

                  {missing ? (
                    <small>
                      Not listed on scanned label
                    </small>
                  ) : (
                    <>
                      {value}{' '}
                      <small>
                        {unit}
                      </small>
                    </>
                  )}

                </b>

              </div>
            );
          })}

        </div>


        {/* INGREDIENT EXPLORER */}

        <div className="card pad">

          <b>Ingredient explorer</b>

          {Array.isArray(data.ingredients) &&
          data.ingredients.length > 0 ? (

            data.ingredients.map((item, i) => {

              const ingredientName =
                typeof item === 'string'
                  ? item
                  : item?.name || 'Unknown ingredient';

              const explanation =
                typeof item === 'string'
                  ? ingredientInfo[ingredientName] ||
                    'General function may vary depending on the product formulation.'
                  : item?.explanation ||
                    ingredientInfo[ingredientName] ||
                    'General function may vary depending on the product formulation.';

              return (
                <div
                  className="ingredient"
                  key={`${ingredientName}-${i}`}
                >

                  <i>
                    {i + 1}
                  </i>

                  <span>

                    <b>
                      {ingredientName}
                    </b>

                    {explanation}

                  </span>

                </div>
              );
            })

          ) : (

            <p>
              No ingredients were detected in the scanned image.
            </p>

          )}

        </div>

      </section>


      {/* EDUCATIONAL SIGNALS */}

      <div className="card pad compare">

        <label>
          EDUCATIONAL SIGNALS
        </label>

        <div className="signals">

          <span>
            Sugar <b>{sugarSignal}</b>
          </span>

          <span>
            Fiber <b>{fiberSignal}</b>
          </span>

          <span>
            Protein <b>{proteinSignal}</b>
          </span>

          <span>
            Sodium <b>{sodiumSignal}</b>
          </span>

                </div>

                <small>
          These are simple educational descriptions based
          on values detected from the scanned label. They
          are not a medical score and do not determine
          whether a food is right for an individual.
        </small>
      </div>
    </section>
    </>
  );
}

function MeditationTimer() {
  const durations = [1, 3, 5, 10];

  const [selectedMinutes, setSelectedMinutes] = useState(3);
  const [secondsLeft, setSecondsLeft] = useState(3 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const totalSeconds = selectedMinutes * 60;
  const progress =
    totalSeconds > 0
      ? ((totalSeconds - secondsLeft) / totalSeconds) * 100
      : 0;

  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setIsRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const selectDuration = (minutes) => {
    setIsRunning(false);
    setSelectedMinutes(minutes);
    setSecondsLeft(minutes * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(selectedMinutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const breathingMessage =
    !isRunning
      ? 'Take a comfortable position and begin when ready.'
      : secondsLeft % 8 < 4
        ? 'Breathe in slowly…'
        : 'Breathe out gently…';

  return (
    <section className="meditation-timer">
      <div className="meditation-header">
        <div>
          <label>MINDFUL PAUSE</label>
          <h2>Take a moment for yourself</h2>
          <p>
            Choose a short session and focus gently on your breathing.
          </p>
        </div>

        <div className="meditation-icon">🧘</div>
      </div>

      <div className="meditation-duration">
        {durations.map((minutes) => (
          <button
            key={minutes}
            type="button"
            className={selectedMinutes === minutes ? 'active' : ''}
            onClick={() => selectDuration(minutes)}
            disabled={isRunning}
          >
            {minutes} min
          </button>
        ))}
      </div>

      <div className="meditation-clock-wrap">
        <div
          className="meditation-clock"
          style={{
            '--progress': `${progress}%`
          }}
        >
          <div className="meditation-clock-inner">
            <strong>{formatTime(secondsLeft)}</strong>
            <span>{isRunning ? 'IN SESSION' : 'READY'}</span>
          </div>
        </div>
      </div>

      <p className="meditation-breathing">
        {breathingMessage}
      </p>

      <div className="meditation-controls">
        <button
          type="button"
          className="primary meditation-start"
          onClick={() => setIsRunning(!isRunning)}
          disabled={secondsLeft === 0}
        >
          {isRunning ? 'Pause' : secondsLeft === 0 ? 'Completed' : 'Start session'}
        </button>

        <button
          type="button"
          className="meditation-reset"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>

      {secondsLeft === 0 && (
        <div className="meditation-complete">
          ✨ Session complete. Take a moment to notice how you feel.
        </div>
      )}
    </section>
  );
      }
function BMICalculator({ askTopic }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [aiSynopsis, setAiSynopsis] = useState('');
const [aiLoading, setAiLoading] = useState(false);
const [aiError, setAiError] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();

    const heightCm = Number(height);
    const weightKg = Number(weight);

    if (
      !heightCm ||
      !weightKg ||
      heightCm <= 0 ||
      weightKg <= 0
    ) {
      setError('Please enter valid height and weight values.');
      setResult(null);
      return;
    }

    const heightMeters = heightCm / 100;
    const bmi = weightKg / (heightMeters * heightMeters);

    setResult(bmi.toFixed(1));
    setError('');
  };

  const resetCalculator = () => {
    setHeight('');
    setWeight('');
    setResult(null);
    setError('');
  };
  const getAISynopsis = async () => {
  if (!result) return;

  setAiLoading(true);
  setAiError('');
  setAiSynopsis('');

  try {
    const response = await fetch('/api/ask-healthscope', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `
A HealthScope user calculated a BMI value of ${result} using:
Height: ${height} cm
Weight: ${weight} kg

Give a concise, educational explanation of BMI.

Important rules:
- Do NOT diagnose the user.
- Do NOT classify their body or weight.
- Do NOT say whether their BMI is healthy, unhealthy, normal, underweight, overweight, or obese.
- Do NOT give weight-loss, weight-gain, dieting, or body-change advice.
- Explain what BMI mathematically represents.
- Explain important limitations of BMI.
- Mention that BMI does not directly measure body composition or overall health.
- Since the user may be a teenager, clearly explain that BMI interpretation for young people depends on age and growth context.
- Keep the response supportive, neutral, educational, and easy to understand.

Structure the answer with these headings:
What this calculation is
What BMI can and cannot tell us
Important context
Key takeaway
        `.trim()
      })
    });

    if (!response.ok) {
      throw new Error('AI request failed');
    }

    const data = await response.json();

    const answer =
      data.answer ||
      data.reply ||
      data.message ||
      data.text;

    if (!answer) {
      throw new Error('No AI response received');
    }

    setAiSynopsis(answer);

  } catch (err) {
    console.error('BMI AI synopsis error:', err);

    setAiError(
      'HealthScope AI could not generate the synopsis right now. Please try again.'
    );

  } finally {
    setAiLoading(false);
  }
};

  return (
    <section className="bmi-calculator">

      <div className="bmi-header">
        <div>
          <label>BODY METRICS</label>
          <h2>BMI Calculator</h2>
          <p>
            Calculate the mathematical Body Mass Index (BMI) value using height and weight.
          </p>
        </div>

        <div className="bmi-icon">🧮</div>
      </div>

      <form
        className="bmi-form"
        onSubmit={calculateBMI}
      >

        <label>
          Height
          <div className="bmi-input-wrap">
            <input
              type="number"
              inputMode="decimal"
              min="1"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <span>cm</span>
          </div>
        </label>

        <label>
          Weight
          <div className="bmi-input-wrap">
            <input
              type="number"
              inputMode="decimal"
              min="1"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <span>kg</span>
          </div>
        </label>

        <div className="bmi-actions">
          <button
            type="submit"
            className="primary"
          >
            Calculate BMI
          </button>

          <button
            type="button"
            className="bmi-reset"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

      </form>

      {error && (
        <div className="bmi-error">
          {error}
        </div>
      )}

      {result && (
        <div className="bmi-result">

          <div className="bmi-result-label">
            YOUR CALCULATED BMI
          </div>

          <strong>{result}</strong>

          <p>
            This is the mathematical result calculated from the height and weight values entered above.
          </p>

          <div className="bmi-formula">
            BMI = weight (kg) ÷ height² (m)
          </div>

          <div className="bmi-important-note">
            <b>Important:</b> BMI is a screening measure and does not directly measure overall health or body composition. For teenagers, interpreting BMI requires age- and growth-related context, so HealthScope does not provide a personal weight-status classification.
          </div>
          <button
  type="button"
  className="bmi-ai-button"
  onClick={getAISynopsis}
  disabled={aiLoading}
>
  {aiLoading ? (
    <>
      <span className="bmi-ai-spinner" />
      HealthScope AI is thinking...
    </>
  ) : (
    <>
      ✨ Get AI educational synopsis
    </>
  )}
</button>
          {aiError && (
  <div className="bmi-ai-error">
    {aiError}
  </div>
)}

{aiSynopsis && (
  <div className="bmi-ai-result">

    <div className="bmi-ai-result-header">
      <span>✨</span>

      <div>
        <label>HEALTHSCOPE AI</label>
        <h3>Your educational BMI synopsis</h3>
      </div>
    </div>

    <div className="bmi-ai-text">
      {aiSynopsis}
    </div>

    <small>
      AI-generated educational information · Not a medical diagnosis or personal health assessment.
    </small>

  </div>
)}

          <button
            type="button"
            className="learn-ask bmi-ask"
            onClick={() =>
              askTopic?.(
                `My calculated BMI is ${result}. Please explain what BMI measures and its limitations in a general educational way. Do not diagnose me or give me a personal weight classification.`
              )
            }
          >
            <MessageCircle size={16} />
            Ask HealthScope about BMI
          </button>

        </div>
      )}

    </section>
  );
      }

function Learn({ askTopic }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const categories = [
    'All',
    ...Array.from(new Set(LEARN_TOPICS.map((topic) => topic.category)))
  ];

  const normalizedSearch = search.trim().toLowerCase();

  const filteredTopics = LEARN_TOPICS.filter((topic) => {
    const matchesCategory =
      activeCategory === 'All' ||
      topic.category === activeCategory;

    const searchableText = [
      topic.title,
      topic.category,
      topic.summary,
      topic.intro,
      topic.fact,
      topic.myth,
      topic.truth,
      ...topic.sections.map((section) => section.heading),
      ...topic.sections.map((section) => section.text),
      ...topic.aiQuestions
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      searchableText.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
if (selectedTopic) {
  return (
    <>
      <section className="learn-article">

        <button
          type="button"
          className="learn-back"
          onClick={() => setSelectedTopic(null)}
        >
          ← Back to Learn
        </button>

        <article className="card learn-article-card">

          <div className="learn-article-hero">

            <div className="learn-article-icon">
              {selectedTopic.icon}
            </div>

            <div>
              <label>{selectedTopic.category}</label>
              <h1>{selectedTopic.title}</h1>
            </div>

          </div>

          <p className="learn-article-intro">
            {selectedTopic.intro || selectedTopic.summary}
          </p>

          <div className="learn-article-divider" />

          <section className="learn-article-content">

            {selectedTopic.sections?.map((section, index) => (
              <div
                className="learn-article-section"
                key={index}
              >
                <h2>{section.heading}</h2>
                <p>{section.text}</p>
              </div>
            ))}

          </section>
          {selectedTopic.special === 'meditation' && (
  <MeditationTimer />
)}
          {selectedTopic.special === 'bmi' && (
  <BMICalculator askTopic={askTopic} />
)}

          {selectedTopic.fact && (
            <section className="learn-fact-box">

              <div className="learn-fact-icon">
                💡
              </div>

              <div>
                <label>QUICK FACT</label>
                <p>{selectedTopic.fact}</p>
              </div>

            </section>
          )}

          {(selectedTopic.myth || selectedTopic.truth) && (
            <section className="learn-myth-box">

              <div className="learn-myth-header">
                <span>MYTH VS REALITY</span>
              </div>

              {selectedTopic.myth && (
                <div className="learn-myth">
                  <b>Common myth</b>
                  <p>{selectedTopic.myth}</p>
                </div>
              )}

              {selectedTopic.truth && (
                <div className="learn-truth">
                  <b>What science says</b>
                  <p>{selectedTopic.truth}</p>
                </div>
              )}

            </section>
          )}

          <section className="learn-article-ai">

            <div>
              <label>STILL CURIOUS?</label>
              <h2>Ask HealthScope about this topic</h2>

              <p>
                Ask follow-up questions and explore the topic in more detail.
              </p>
            </div>

            <button
  type="button"
  className="primary learn-article-ask"
  onClick={() =>
    askTopic?.(
      `I am reading about "${selectedTopic.title}". Please help me understand this topic clearly in an educational way.`
    )
  }
>
  <MessageCircle size={17} />
  Ask HealthScope
</button>

          </section>

        </article>
      </section>

      <Disclaimer />
    </>
  );
}
  return (
    <>
      <Title
        k="LEARN"
        h="Explore how your body works."
        p="Discover health science, understand common myths, and explore topics at your own pace."
      />

      <section className="learn-search card pad">
        <div className="learn-search-heading">
          <div>
            <label>EXPLORE HEALTHSCOPE</label>
            <h2>What would you like to understand?</h2>
          </div>
        </div>

        <div className="learn-search-input">
          <Info size={19} />
          <input
            type="search"
            placeholder="Search heart, vaccines, sleep..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <div className="learn-categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? 'active'
                  : ''
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="learn-results">
        <div className="learn-results-head">
          <div>
            <label>TOPICS</label>
            <h2>
              {filteredTopics.length} topic
              {filteredTopics.length !== 1 ? 's' : ''} found
            </h2>
          </div>

          {activeCategory !== 'All' && (
            <button
              className="learn-clear-filter"
              type="button"
              onClick={() => setActiveCategory('All')}
            >
              Show all
            </button>
          )}
        </div>

        {filteredTopics.length === 0 ? (
          <div className="card pad learn-empty">
            <Info size={24} />
            <h3>No topics found</h3>
            <p>
              Try searching for another body system, health topic, or science question.
            </p>

            <button
              type="button"
              className="primary"
              onClick={() => {
                setSearch('');
                setActiveCategory('All');
              }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="learn-topic-grid">
            {filteredTopics.map((topic) => (
              <article
                className="card learn-topic-card"
                key={topic.id}
              >
                <div className="learn-topic-icon">
                  {topic.icon}
                </div>

                <div className="learn-topic-content">
                  <label>{topic.category}</label>

                  <h3>{topic.title}</h3>

                  <p>{topic.summary}</p>

                  <div className="learn-topic-actions">
                    <button
  type="button"
  className="learn-explore"
  onClick={() => setSelectedTopic(topic)}
>
  Explore article
  <ChevronRight size={16} />
</button>

                    <button
                      type="button"
                      className="learn-ask"
                      onClick={() =>
                        askTopic?.(
                          `I have a question about ${topic.title}. Please explain it clearly and educationally.`
                        )
                      }
                    >
                      <MessageCircle size={15} />
                      Ask HealthScope
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Disclaimer />
    </>
  );
}

function Profile({ dark, setDark, clear }) { return <><Title k="PROFILE" h="Your data, under your control." p="No account is required for the demo. Keep everyday tracking local where practical." /><section className="profile"><div className="card pad"><div className="avatar"><UserRound size={25} /></div><h2>Guest profile</h2><p>Demo-ready, local-first experience.</p></div><div className="card pad settings"><div className="setting"><Moon size={17} /><span><b>Appearance</b><small>{dark ? 'Dark' : 'Light'} mode</small></span><button className="toggle" onClick={() => setDark(!dark)} aria-label="Toggle dark mode"><i className={dark ? 'on' : ''} /></button></div><div className="setting"><ShieldCheck size={17} /><span><b>Local-first storage</b><small>Wellness entries stay in this browser.</small></span></div><div className="privacy"><ShieldCheck size={17} /><span><b>Privacy principle</b><small>Only send information to AI services when needed. Disclose cloud processing in production.</small></span></div><button className="danger" onClick={clear}><Trash2 size={16} />Delete local demo data</button></div></section><Disclaimer /></> }

function Chat({ close, initialQuestion }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I’m Ask HealthScope. I can explain wellness, nutrition, food labels, ingredients, sleep basics, movement and health terminology.'
    }
  ]);

  const [question, setQuestion] = useState('');
  useEffect(() => {
  if (initialQuestion) {
    setQuestion(initialQuestion);
  }
}, [initialQuestion]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const q = question.trim();

    if (!q || loading) return;

    // Add the user's message
    setMessages(prev => [
      ...prev,
      { role: 'user', text: q }
    ]);

    setQuestion('');
    setLoading(true);

    // Add temporary AI thinking message
    setMessages(prev => [
      ...prev,
      { role: 'assistant', text: 'Thinking...' }
    ]);

    try {
      const response = await fetch('/api/ask-healthscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: q,
          history: []
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'AI request failed');
      }

      // Replace Thinking... with AI response
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          text: data.answer || 'Sorry, I could not generate a response right now.'
        };
        return updated;
      });

    } catch (error) {
      console.error('HealthScope AI error:', error);

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          text: 'HealthScope AI is temporarily unavailable. Please try again.'
        };
        return updated;
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="chat">

        <header>
          <b>
            <Sparkles size={15} />
            Ask HealthScope
          </b>

          <button
            onClick={close}
            aria-label="Close assistant"
          >
            <X size={18} />
          </button>
        </header>

        <div className="messages">
          {messages.map((m, i) => (
            <div
              className={`msg ${m.role === 'user' ? 'user' : ''}`}
              key={i}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="suggest">
          {[
            'What is dietary fiber?',
            'What does sodium mean?'
          ].map(q => (
            <button
              key={q}
              onClick={() => setQuestion(q)}
            >
              {q}
            </button>
          ))}
        </div>

        <div className="chatinput">
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={loading ? 'HealthScope is thinking...' : 'Ask something…'}
            aria-label="Ask HealthScope"
            disabled={loading}
          />

          <button
            onClick={send}
            disabled={loading}
            aria-label="Send"
          >
            <Send size={17} />
          </button>
        </div>

        <small>
          Educational information only · Not diagnosis or treatment.
        </small>

      </div>
    </div>
  );
}
    
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))

function Root() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <App />

      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('HealthScope service worker registered');
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });
  });
}
