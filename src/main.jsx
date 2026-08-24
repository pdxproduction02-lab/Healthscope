import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity, BarChart3, BookOpen, Camera, Check, ChevronRight, Droplets, Home,
  Info, Leaf, MessageCircle, Moon, Plus, ScanLine, Send, ShieldCheck, Sparkles,
  Sun, Trash2, Upload, UserRound, Utensils, X, Zap
} from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './styles.css'

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

function Logo() { return <div className="logo"><ScanLine size={18} /></div> }
function Brand() { return <div className="brand"><Logo /><div><b>HealthScope</b><small>Understand. Track. Stay Informed.</small></div></div> }

function App() {
  const [page, setPage] = useState('home')
  const [entries, setEntries] = useLocal('hs_entries', seed)
  const [dark, setDark] = useLocal('hs_dark', false)
  const [chatOpen, setChatOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [labelData, setLabelData] = useState(null)

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => {
    if (!toast) return undefined
    const id = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(id)
  }, [toast])

  const nav = (next) => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const saveEntry = (entry) => { setEntries([...entries, entry]); setToast('Wellness entry saved') }
  const clearLocal = () => {
    localStorage.removeItem('hs_entries'); localStorage.removeItem('hs_dark')
    setEntries([]); setLabelData(null); setToast('Local demo data cleared')
  }

  return <div className="app">
    <aside><Brand /><nav>
      <NavButton active={page === 'home'} icon={Home} label="Home" onClick={() => nav('home')} />
      <NavButton active={page === 'track'} icon={BarChart3} label="Track" onClick={() => nav('track')} />
      <NavButton active={page === 'label'} icon={ScanLine} label="LabelScope" onClick={() => nav('label')} />
      <NavButton active={page === 'learn'} icon={BookOpen} label="Learn" onClick={() => nav('learn')} />
      <NavButton active={page === 'profile'} icon={UserRound} label="Profile" onClick={() => nav('profile')} />
    </nav><button className="ask" onClick={() => setChatOpen(true)}><Sparkles size={17} />Ask HealthScope</button><small><ShieldCheck size={14} />Privacy-first</small></aside>
    <main className="main">
      <header><div className="mobile-brand"><Logo />HealthScope</div><div className="top"><button aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button><span>● Demo Mode</span></div></header>
      <div className="content">
        {page === 'home' && <HomePage nav={nav} entries={entries} ask={() => setChatOpen(true)} />}
        {page === 'track' && <Track entries={entries} save={saveEntry} />}
        {page === 'label' && <LabelScope data={labelData} setData={setLabelData} done={() => setToast('Label ready')} />}
        {page === 'learn' && <Learn />}
        {page === 'profile' && <Profile dark={dark} setDark={setDark} clear={clearLocal} />}
      </div>
    </main>
    <div className="bottom">
      {[['home', Home, 'Home'], ['track', BarChart3, 'Track'], ['label', ScanLine, 'Label'], ['learn', BookOpen, 'Learn'], ['profile', UserRound, 'Profile']].map(([id, Icon, label]) => <button className={page === id ? 'active' : ''} onClick={() => nav(id)} key={id}><Icon size={19} /><small>{label}</small></button>)}
    </div>
    {chatOpen && <Chat close={() => setChatOpen(false)} />}
    {toast && <div className="toast"><Check size={15} />{toast}</div>}
  </div>
}

function NavButton({ active, icon: Icon, label, onClick }) { return <button className={active ? 'active' : ''} onClick={onClick}><Icon size={18} />{label}</button> }
function Title({ k, h, p }) { return <div className="title"><div><label>{k}</label><h1>{h}</h1><p>{p}</p></div></div> }
function Disclaimer() { return <div className="disclaimer"><ShieldCheck size={16} /><span><b>HealthScope informs. It does not diagnose.</b> General wellness and health-education information only.</span></div> }
function Metric({ icon: Icon, name, value }) { return <div className="card metric"><Icon size={18} /><span>{name}</span><b>{value}</b><small>Self-entered</small></div> }
function Action({ icon: Icon, title, description, onClick, hot }) { return <button className={`action ${hot ? 'hot' : ''}`} onClick={onClick}><i><Icon size={19} /></i><div><b>{title}</b><small>{description}</small></div><ChevronRight size={16} /></button> }

function HomePage({ nav, entries, ask }) {
  const current = entries.at(-1) || seed.at(-1)
  return <>
    <section className="hero"><div><label>WELLNESS SNAPSHOT · DEMO</label><h1>Understand your everyday wellness.</h1><p>Track simple patterns, explore food labels, and learn health information without the medical jargon.</p></div><div className="badge"><Sparkles size={19} />Education, not diagnosis.</div></section>
    <section className="metrics"><Metric icon={Moon} name="Sleep" value={`${current.sleep.toFixed(1)}h`} /><Metric icon={Droplets} name="Water" value={`${current.water}/8`} /><Metric icon={Activity} name="Movement" value={`${current.movement} min`} /><Metric icon={Zap} name="Energy" value={`${current.energy}/5`} /></section>
    <div className="section"><div><label>RECENT PATTERN</label><h2>A quick look at your entries</h2></div><button className="link" onClick={() => nav('track')}>Open tracker <ChevronRight size={15} /></button></div>
    <section className="dash"><div className="card chart"><b>Sleep trend</b><small>Last 7 logged days</small><ResponsiveContainer width="100%" height="88%"><AreaChart data={entries.length ? entries : seed}><defs><linearGradient id="sleepFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#23b7a3" stopOpacity=".3" /><stop offset="1" stopColor="#23b7a3" stopOpacity="0" /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" /><XAxis dataKey="date" tickLine={false} axisLine={false} /><YAxis domain={[5, 9]} tickLine={false} axisLine={false} /><Tooltip /><Area type="monotone" dataKey="sleep" stroke="#23b7a3" fill="url(#sleepFill)" strokeWidth={3} /></AreaChart></ResponsiveContainer></div><div className="card insight"><Sparkles size={20} /><label>HEALTHSCOPE INSIGHT</label><h3>Your logged sleep looks fairly consistent.</h3><p>Your recent entries show a simple personal pattern. Consistent routines can support general wellbeing.</p><small>Based only on self-entered data.</small></div></section>
    <div className="section"><div><label>EXPLORE</label><h2>Make the next step useful.</h2></div></div>
    <section className="actions"><Action icon={BarChart3} title="Log wellness" description="Add simple daily observations." onClick={() => nav('track')} /><Action icon={ScanLine} title="Scan a label" description="Explore nutrition and ingredients." onClick={() => nav('label')} hot /><Action icon={MessageCircle} title="Ask HealthScope" description="Get a clear educational explanation." onClick={ask} /><Action icon={BookOpen} title="Explore Learn" description="Build practical health literacy." onClick={() => nav('learn')} /></section>
    <Disclaimer />
  </>
}

function Track({ entries, save }) {
  const [sleep, setSleep] = useState(7.5), [water, setWater] = useState(6), [movement, setMovement] = useState(45), [mood, setMood] = useState(4), [energy, setEnergy] = useState(4)
  const submit = () => save({ date: new Date().toLocaleDateString('en-US', { weekday: 'short' }), sleep, water, movement, mood, energy })
  return <><Title k="TRACK" h="Your wellness, your way." p="Log simple everyday observations. Nothing here is a medical measurement." /><section className="trackgrid"><div className="card form"><Control icon={Moon} name="Sleep duration" value={`${sleep.toFixed(1)} hours`}><input type="range" min="3" max="12" step=".1" value={sleep} onChange={e => setSleep(+e.target.value)} /></Control><Control icon={Droplets} name="Water intake" value={`${water}/8 glasses`}><input type="range" min="0" max="12" value={water} onChange={e => setWater(+e.target.value)} /></Control><Control icon={Activity} name="Movement" value={`${movement} minutes`}><input type="range" min="0" max="180" value={movement} onChange={e => setMovement(+e.target.value)} /></Control><Scale name="Mood" value={mood} setValue={setMood} /><Scale name="Energy" value={energy} setValue={setEnergy} /><button className="primary" onClick={submit}><Plus size={17} />Save entry</button></div><div className="card chartbox"><b>Movement trend</b><small>Self-entered observations</small><ResponsiveContainer width="100%" height="80%"><AreaChart data={entries.length ? entries : seed}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)" /><XAxis dataKey="date" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Area type="monotone" dataKey="movement" stroke="#23b7a3" fill="#23b7a3" fillOpacity=".1" strokeWidth={3} /></AreaChart></ResponsiveContainer><p><b>Observed:</b> your recent movement entries vary across days. This is a personal log, not a clinical assessment.</p></div></section></>
}
function Control({ icon: Icon, name, value, children }) { return <div className="control"><div><span><Icon size={16} />{name}</span><b>{value}</b></div>{children}</div> }
function Scale({ name, value, setValue }) { return <div className="control"><div><span><Sun size={16} />{name}</span><b>{value}/5</b></div><div className="scale">{[1, 2, 3, 4, 5].map(x => <button className={x === value ? 'sel' : ''} onClick={() => setValue(x)} key={x}>{x}</button>)}</div></div> }

function LabelScope({ data, setData, done }) {
  const videoRef = useRef(null), streamRef = useRef(null)
  const [cameraOn, setCameraOn] = useState(false), [error, setError] = useState(''), [processing, setProcessing] = useState(false)
  useEffect(() => {
    if (cameraOn && videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current
  }, [cameraOn])
  useEffect(() => () => stopCamera(), [])
  const stopCamera = () => { streamRef.current?.getTracks().forEach(track => track.stop()); streamRef.current = null; setCameraOn(false) }
  const startCamera = async () => {
    setError('')
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) { setError('Camera access requires HTTPS and a supported browser. You can upload an image or use the demo label.'); return }
    try { streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false }); setCameraOn(true) }
    catch { setError('Camera access isn’t available. You can upload a photo or use the demo label instead.') }
  }
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
          throw new Error(result.error || 'Could not analyze this label.');
        }

        setData(result.data);
        stopCamera();
        done();

      } catch (err) {
        console.error(err);
        setError('We could not confidently read this label. Try another photo.');
      } finally {
        setProcessing(false);
      }
    };

    reader.onerror = () => {
      setError('We could not read this image. Please try another one.');
      setProcessing(false);
    };

    reader.readAsDataURL(file);

  } catch (err) {
    console.error(err);
    setError('Something went wrong while preparing the image.');
    setProcessing(false);
  }
};

const capturePhoto = () => {
  if (!videoRef.current) return;

  const video = videoRef.current;

  if (!video.videoWidth || !video.videoHeight) {
    setError('Camera is still starting. Please wait a moment and try again.');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    if (!blob) {
      setError('We could not capture the image. Please try again.');
      return;
    }

    const file = new File(
      [blob],
      'label-photo.jpg',
      { type: 'image/jpeg' }
    );

    analyzeImage(file);
  }, 'image/jpeg', 0.9);
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
  if (data) return <LabelResult data={data} reset={() => setData(null)} />
  return <><Title k="LABELSCOPE" h="Understand what’s inside your food." p="Scan, upload, or use a demo label. Results are educational and nutritional context varies between people." /><section className="scanlayout"><div className="card scanner">{cameraOn ? <><video ref={videoRef} autoPlay playsInline muted /><div className="camera-overlay"><span>Align the nutrition panel inside the frame</span></div><div className="camera-actions"><button className="secondary" onClick={stopCamera}>Cancel</button><button className="shutter" aria-label="Capture and analyze" onClick={capturePhoto}><Camera size={22} /></button></div></> : <div className="scanempty"><div className="scanicon"><ScanLine size={32} /></div><h2>Scan a packaged-food label</h2><p>Use your camera when available, or choose another input method.</p><button className="primary" onClick={startCamera}><Camera size={17} />Open camera</button><label className="secondary"><Upload size={17} />Upload image<input hidden type="file" accept="image/*" onChange={e => analyzeImage(e.target.files?.[0])} /></label><button className="link" onClick={useDemoLabel}>Use demo label</button>{processing && <small className="processing">Analyzing label…</small>}</div>}</div><div className="card how"><label>HOW IT WORKS</label>{[['01', 'Capture', 'Take a clear photo of the nutrition panel.'], ['02', 'Analyze', 'Extract readable nutrition information.'], ['03', 'Understand', 'Explore nutrients and ingredient functions.']].map(row => <div className="howrow" key={row[0]}><b>{row[0]}</b><span><strong>{row[1]}</strong>{row[2]}</span></div>)}<div className="notice"><Info size={16} /><span><b>Camera permissions</b><br />Production camera access requires HTTPS. If permission is denied, upload or manual entry remains available.</span></div></div></section>{error && <div className="error"><Info size={16} /><span>{error}</span><button onClick={() => setError('')}><X size={15} /></button></div>}</>
}

function LabelResult({ data, reset }) {
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
    ) return null;

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
      <div className="resulttop">
        <div>
          <label>EDUCATIONAL SNAPSHOT</label>
          <h2>{data.product}</h2>
          <small>Serving size · {data.serving}</small>
        </div>

        <button className="secondary" onClick={reset}>
          New label
        </button>
      </div>

      <section className="resultgrid">

        <div className="card pad">
  <b>Nutrition facts</b>

  {!nutritionDetected && (
    <div className="nutrition-missing">
      <Info size={17} />
      <span>
        <b>Nutrition information wasn't visible</b>
        <small>
          Try scanning the Nutrition Facts panel for calories and nutrient values.
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
              <div className="nut" key={name}>
                <span>{name}</span>

                <b>
                  {missing ? (
                    <small>Not listed on scanned label</small>
                  ) : (
                    <>
                      {value} <small>{unit}</small>
                    </>
                  )}
                </b>
              </div>
            );
          })}
        </div>

        <div className="card pad">
          <b>Ingredient explorer</b>

          {data.ingredients.length > 0 ? (
            data.ingredients.map((item, i) => (
  <div className="ingredient" key={`${item.name}-${i}`}>
    <i>{i + 1}</i>

    <span>
      <b>{item.name}</b>
      {item.explanation ||
        'General function may vary depending on the product formulation.'}
    </span>
  </div>
))
          ) : (
            <p>No ingredients were detected in the scanned image.</p>
          )}
        </div>

      </section>

      <div className="card pad compare">
        <label>EDUCATIONAL SIGNALS</label>

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
          These are simple educational descriptions based on values detected
          from the scanned label. They are not a medical score and do not
          determine whether a food is right for an individual.
        </small>
      </div>
    </>
  );
}

function Learn() {
  const [query, setQuery] = useState('')
  const articles = [['Nutrition', 'Reading a nutrition label without the jargon', Utensils], ['Nutrition', 'What dietary fiber means', Leaf], ['Sleep', 'Understanding sleep consistency', Moon], ['Wellness', 'Hydration basics', Droplets], ['Movement', 'Everyday activity, explained', Activity], ['Health Literacy', 'How to read health claims', Info]]
  const filtered = articles.filter(([cat, title]) => `${cat} ${title}`.toLowerCase().includes(query.toLowerCase()))
  return <><Title k="LEARN" h="Build practical health literacy." p="Clear explanations for everyday wellness and nutrition topics." /><div className="search"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search topics…" aria-label="Search learning topics" /><BookOpen size={17} /></div><section className="articles">{filtered.map(([cat, title, Icon]) => <article className="card article" key={title}><div className="articleicon"><Icon size={19} /></div><label>{cat} · 4 min</label><h3>{title}</h3><p>Explore a concise, practical explanation designed to make everyday health information easier to understand.</p><button className="link">Read article <ChevronRight size={15} /></button></article>)}</section></>
}

function Profile({ dark, setDark, clear }) { return <><Title k="PROFILE" h="Your data, under your control." p="No account is required for the demo. Keep everyday tracking local where practical." /><section className="profile"><div className="card pad"><div className="avatar"><UserRound size={25} /></div><h2>Guest profile</h2><p>Demo-ready, local-first experience.</p></div><div className="card pad settings"><div className="setting"><Moon size={17} /><span><b>Appearance</b><small>{dark ? 'Dark' : 'Light'} mode</small></span><button className="toggle" onClick={() => setDark(!dark)} aria-label="Toggle dark mode"><i className={dark ? 'on' : ''} /></button></div><div className="setting"><ShieldCheck size={17} /><span><b>Local-first storage</b><small>Wellness entries stay in this browser.</small></span></div><div className="privacy"><ShieldCheck size={17} /><span><b>Privacy principle</b><small>Only send information to AI services when needed. Disclose cloud processing in production.</small></span></div><button className="danger" onClick={clear}><Trash2 size={16} />Delete local demo data</button></div></section><Disclaimer /></> }

function Chat({ close }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I’m Ask HealthScope. I can explain wellness, nutrition, food labels, ingredients, sleep basics, movement and health terminology.'
    }
  ]);

  const [question, setQuestion] = useState('');
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

createRoot(document.getElementById('root')).render(<App />)
