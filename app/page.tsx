'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, FileText, Sun, Moon, ArrowUp, Send, X, Check, MessageCircle } from 'lucide-react';
import { Montserrat, Mulish } from 'next/font/google';

const display = Montserrat({ subsets: ['latin'], weight: ['700', '800', '900'] });
const body = Mulish({ subsets: ['latin'], weight: ['400', '500', '700'] });

/* ------------------------------------------------------------------ */
/*  DONNÉES : tout se modifie ici, le JSX plus bas n'a pas à changer.  */
/* ------------------------------------------------------------------ */

const EMAIL = 'kandedienaba02@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/di%C3%A9naba-kande-439525374/';
const GITHUB = 'https://github.com/dienabaKande';
const CV_PDF = '/Cv-DienabaKande.pdf'; // à placer dans le dossier /public

const ROLES = ['des applications web et mobiles.', 'de la supervision IoT en temps réel.', 'des modèles de Data & IA.'];

const techs = [
  'Python', 'Java', 'JavaScript', 'React', 'React Native', 'NestJS', 'Laravel', 'MQTT',
  'SQL', 'NoSQL', 'Docker', 'Linux', 'AWS', 'OVH', 'Git', 'Postman', 'Machine Learning', 'Hadoop', 'Spark',
];

const experiences = [
  {
    role: 'Développeuse Full-Stack (stage)',
    org: 'ArrawTech, Dakar',
    period: 'Mai 2026 – Juillet 2026',
    points: [
      'Développement et déploiement de la plateforme NOFLAY pour superviser à distance (IoT) deux machines agro-industrielles.',
      "Backend en NestJS (API, MQTT), plateforme d'administration web en React et première version de l'application mobile en React Native.",
      "Analyse des besoins techniques des utilisateurs, intégration de bases de données et de services API.",
    ],
  },
  {
    role: 'Développeuse (stage) · Monitoring temps réel des APIs',
    org: 'Sonatel, Dakar',
    period: 'Juin 2025 – Septembre 2025',
    points: [
      'Supervision automatique des APIs internes en temps réel : statut, latence et alertes.',
      'Historique des vérifications, organisé par groupe et par environnement (test, production).',
    ],
  },
  {
    role: 'Stagiaire · Module de collecte de données',
    org: "ProSE SARL, cabinet d'ingénierie logicielle, Dakar",
    period: 'Mai 2024 – Juillet 2024',
    points: ['Génération de formulaires dynamiques.', 'Arrimage des formulaires au découpage géographique (SIG).'],
  },
];

const CATS = ['Tous', 'Web & mobile', 'Data & IA', 'IoT & monitoring'] as const;

type Project = {
  title: string;
  context: string;
  description: string;
  tags: string[];
  cats: string[];
  links?: { label: string; href: string }[];
};

// Les 4 premiers viennent du CV. Les 2 suivants sont tes anciens projets du portfolio :
// vérifie les descriptions, ajoute les liens, et ajoute ici les projets absents du CV.
const projects: Project[] = [
  {
    title: 'NOFLAY',
    context: 'ArrawTech · 2026',
    description:
      'Plateforme de supervision IoT de deux machines agro-industrielles : API et MQTT côté serveur, administration web et application mobile.',
    tags: ['NestJS', 'MQTT', 'React', 'React Native'],
    cats: ['IoT & monitoring', 'Web & mobile'],
  },
  {
    title: 'TerraSense',
    context: 'Projet académique, M1 IA & Big Data',
    description:
      'Modèle de Machine Learning pour prédire le rendement de la tomate au Sénégal (Niayes, Saint-Louis, Ziguinchor), construit sur un jeu de données synthétique de 120 observations et 21 variables (NASA POWER, ISRIC, CIRAD). Analyse exploratoire et présentation orale.',
    tags: ['Python', 'Machine Learning', 'EDA'],
    cats: ['Data & IA'],
  },
  {
    title: 'Monitoring des APIs',
    context: 'Sonatel · 2025',
    description:
      'Suivi en temps réel du statut et de la latence des APIs internes, avec alertes et historique par groupe et par environnement.',
    tags: ['API', 'Monitoring', 'Alertes'],
    cats: ['IoT & monitoring'],
  },
  {
    title: 'Collecte de données',
    context: 'ProSE SARL · 2024',
    description: 'Module de génération de formulaires dynamiques, rattachés au découpage géographique du pays.',
    tags: ['Formulaires dynamiques', 'SIG'],
    cats: ['Web & mobile', 'Data & IA'],
  },
  {
    title: 'TrainConnect',
    context: 'Projet personnel',
    description:
      "Application web de réservation et d'achat de billets de train : gestion des trajets et des places, paiement et espace administrateur.",
    tags: ['Laravel', 'MySQL', 'JavaScript', 'Bootstrap', 'API REST'],
    cats: ['Web & mobile'],
    links: [{ label: 'Code source', href: 'https://github.com/dienabaKande/train-connect' }],
  },
  {
    title: 'Plateforme de parrainage',
    context: 'Projet personnel',
    description:
      "Collecte et validation de parrainages pour une élection présidentielle au Sénégal, avec vérification d'identité et cartographie par région.",
    tags: ['Laravel', 'Vue.js', 'PostgreSQL'],
    cats: ['Web & mobile'],
  },
];

const skills = [
  { title: 'Langages', items: ['Python', 'Java', 'JavaScript'] },
  { title: 'Web & mobile', items: ['React', 'React Native', 'NestJS', 'Laravel', 'HTML / CSS'] },
  { title: 'Données', items: ['SQL', 'NoSQL', 'Bases en Machine Learning', 'Notions de Big Data (Hadoop, Spark)'] },
  { title: 'Cloud & outils', items: ['OVH', 'AWS', 'Docker', 'Linux', 'Git / GitHub', 'Postman', 'API REST'] },
];

const education = [
  { degree: 'Master 2 · Intelligence Artificielle et Big Data', school: 'ESP Dakar', period: 'Oct. 2026 – en cours', current: true },
  { degree: 'Master 1 · Intelligence Artificielle et Big Data', school: 'ESP Dakar', period: 'Janv. 2025 – Janv. 2026' },
  { degree: "Licence · Génie Logiciel et Système d'Information", school: 'ESP Dakar', period: 'Janv. 2024 – Janv. 2025' },
  { degree: 'Diplôme de Technicien Supérieur en Informatique', school: 'ESP Dakar', period: 'Janv. 2023 – Janv. 2024' },
  { degree: 'Baccalauréat', school: 'Lycée Alpha Molo Balde, Kolda', period: '2022' },
];

const certifications = [
  { title: 'HCIA-Datacom V1.0', issuer: 'Huawei Talent Online', date: 'Mai 2023' },
  { title: '3DAS 2022 · attestation de participation', issuer: 'ASTIC', date: 'Mai 2022' },
];

const languages = [
  { name: 'Français', level: 'C1', label: 'Courant', filled: 5 },
  { name: 'Anglais', level: 'A2', label: 'Notions', filled: 2 },
];

const stats = [
  { n: 3, label: 'stages en entreprise' },
  { n: projects.length, label: 'projets présentés' },
  { n: 2, label: 'machines supervisées avec NOFLAY' },
  { n: 5, label: 'années à l’ESP Dakar' },
];

const nav = [
  ['Parcours', '#experience'],
  ['Projets', '#projects'],
  ['Compétences', '#skills'],
  ['Formation', '#education'],
];

/* ------------------------------------------------------------------ */
/*  STYLE : variables de thème + animations                            */
/* ------------------------------------------------------------------ */

const ORANGE = '#F0922B';

const themes = {
  light: {
    '--bg': '#FFFFFF', '--fg': '#121212', '--muted': '#5A5A5A', '--line': 'rgba(0,0,0,0.11)',
    '--card': '#F3F5F8', '--dot': 'rgba(0,0,0,0.13)', '--accent-text': '#B85A00', '--nav': 'rgba(255,255,255,0.82)',
  },
  dark: {
    '--bg': '#0E0E10', '--fg': '#F2F2F2', '--muted': '#A3A3A8', '--line': 'rgba(255,255,255,0.13)',
    '--card': '#19191D', '--dot': 'rgba(255,255,255,0.1)', '--accent-text': '#F0922B', '--nav': 'rgba(14,14,16,0.82)',
  },
} as const;

const css = `
html { scroll-behavior: smooth; }
.reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
.reveal.is-in { opacity: 1; transform: none; }
.bar { transform: scaleX(0); transform-origin: left; transition: transform .9s cubic-bezier(.2,.7,.2,1) .25s; }
.is-in .bar { transform: scaleX(1); }
.tline { transform: scaleY(0); transform-origin: top; transition: transform 1.4s cubic-bezier(.3,.6,.2,1) .2s; }
.is-in .tline { transform: scaleY(1); }

.letter { display: inline-block; opacity: 0; animation: rise .8s cubic-bezier(.2,.8,.2,1) forwards; transition: color .2s, transform .25s; cursor: default; }
.letter:hover { color: ${ORANGE}; transform: translateY(-10px) rotate(-4deg); }
@keyframes rise { from { opacity: 0; transform: translateY(70%) rotate(6deg); } to { opacity: 1; transform: none; } }
.fade-in { opacity: 0; animation: fade 1s ease forwards; }
@keyframes fade { to { opacity: 1; } }
.caret { display: inline-block; width: .55em; height: 1.05em; margin-left: 3px; background: ${ORANGE}; vertical-align: -0.15em; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
.live-dot { animation: ping 1.6s ease-out infinite; }
@keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(74,222,128,.7); } 100% { box-shadow: 0 0 0 10px rgba(74,222,128,0); } }

.dots { background-image: radial-gradient(var(--dot) 1.3px, transparent 1.4px); background-size: 26px 26px; }
.dots-hot {
  background-image: radial-gradient(${ORANGE} 1.7px, transparent 1.8px); background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(240px circle at var(--mx, 70%) var(--my, 30%), #000, transparent);
          mask-image: radial-gradient(240px circle at var(--mx, 70%) var(--my, 30%), #000, transparent);
}

.marquee { display: flex; width: max-content; animation: scroll 38s linear infinite; }
.marquee:hover { animation-play-state: paused; }
@keyframes scroll { to { transform: translateX(-50%); } }

.tilt { transition: transform .25s ease-out, border-color .2s; transform-style: preserve-3d; position: relative; overflow: hidden; }
.tilt::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .25s;
  background: radial-gradient(260px circle at var(--gx, 50%) var(--gy, 50%), rgba(240,146,43,.22), transparent 65%); }
.tilt:hover { border-color: ${ORANGE}; }
.tilt:hover::after { opacity: 1; }
.pop { opacity: 0; animation: pop .55s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes pop { from { opacity: 0; transform: translateY(22px) scale(.97); } to { opacity: 1; transform: none; } }

.chip { transition: transform .2s, border-color .2s, background .2s, color .2s; }
.chip:hover { transform: translateY(-3px) rotate(-1.5deg); border-color: ${ORANGE}; }

@keyframes float { 0%, 100% { transform: translateZ(40px) translateY(0); } 50% { transform: translateZ(40px) translateY(-12px); } }
.floaty { animation: float 5s ease-in-out infinite; }
@keyframes idle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
.idle { animation: idle 7s ease-in-out infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.ring { position: relative; padding: 3px; border-radius: 1.5rem; overflow: hidden; }
.ring::before { content: ''; position: absolute; inset: -60%;
  background: conic-gradient(from 0deg, ${ORANGE}, transparent 25%, #FFD08A 50%, transparent 75%, ${ORANGE}); animation: spin 6s linear infinite; }
.ring-in { position: relative; border-radius: calc(1.5rem - 3px); overflow: hidden; }
.shine::after { content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(110deg, transparent 40%, rgba(255,255,255,.32) 50%, transparent 60%); transform: translateX(-120%); animation: shine 5.5s ease-in-out infinite; }
@keyframes shine { 0%, 55% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
.bubble-in { animation: bubble .45s cubic-bezier(.2,.9,.3,1.3); }
@keyframes bubble { from { opacity: 0; transform: translateY(8px) scale(.85); } to { opacity: 1; transform: none; } }
.face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .floaty, .idle, .ring::before, .shine::after, .bubble-in { animation: none !important; }
  .reveal, .letter, .fade-in, .pop { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
  .bar, .tline { transform: none !important; transition: none !important; }
  .marquee, .caret, .live-dot { animation: none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Petits hooks et composants animés                                  */
/* ------------------------------------------------------------------ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const h = () => setReduced(m.matches);
    m.addEventListener('change', h);
    return () => m.removeEventListener('change', h);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${seen ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Typewriter({ words }: { words: string[] }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const w = words[i];
    let delay = del ? 35 : 75;
    if (!del && text === w) delay = 1500;
    if (del && text === '') delay = 350;
    const t = setTimeout(() => {
      if (!del && text === w) setDel(true);
      else if (del && text === '') { setDel(false); setI((i + 1) % words.length); }
      else setText(del ? w.slice(0, text.length - 1) : w.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, del, i, words, reduced]);
  return <>{reduced ? words[0] : text}<span className="caret" aria-hidden /></>;
}

function CountUp({ to }: { to: number }) {
  const reduced = useReducedMotion();
  const [ref, seen] = useInView<HTMLSpanElement>(0.6);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduced) { setN(to); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, reduced]);
  return <span ref={ref}>{n}</span>;
}

/* ------------------------------------------------------------------ */
/*  Photo animée + carte qui se retourne pour laisser un message        */
/* ------------------------------------------------------------------ */

const GREETINGS = ['Salut 👋', 'Hello 👋', 'Salaam 👋'];
// Clé gratuite sur https://web3forms.com (voir le fichier .env.local expliqué dans le message)
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

function Greeting() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % GREETINGS.length), 2200);
    return () => clearInterval(id);
  }, [reduced]);
  return (
    <div
      className="absolute top-4 left-4 z-10 px-3.5 py-1.5 text-sm font-black text-black bg-white shadow-lg"
      style={{ borderRadius: '1rem 1rem 1rem 0.25rem' }}
      aria-hidden
    >
      <span key={i} className="bubble-in inline-block">{GREETINGS[i]}</span>
    </div>
  );
}

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'mailto';

function MessageForm({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>('idle');
  const [err, setErr] = useState('');
  const [who, setWho] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get('botcheck')) return; // piège anti-spam : un humain ne coche pas cette case
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();
    if (name.length < 2) return setErr('Dis-moi ton prénom.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Cet e-mail ne semble pas valide.");
    if (message.length < 10) return setErr('Ton message est un peu court (10 caractères minimum).');
    setErr('');
    setWho(name);

    // Sans clé configurée : on ouvre l'application mail avec le message déjà rédigé.
    if (!WEB3FORMS_KEY) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Message depuis ton portfolio')}&body=${body}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio · message de ${name}`,
          from_name: name,
          name,
          email,
          message,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error('refused');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const field =
    'w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:border-[#F0922B] transition-colors placeholder:opacity-60';
  const fieldStyle = { background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--fg)' };

  if (status === 'sent' || status === 'mailto') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 px-2">
        <span className="pop inline-flex items-center justify-center w-16 h-16 rounded-full text-black" style={{ background: ORANGE }}>
          <Check size={32} strokeWidth={3} />
        </span>
        <p className={`${display.className} text-2xl font-extrabold`}>
          {status === 'sent' ? `Merci ${who} !` : 'Presque fini !'}
        </p>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          {status === 'sent'
            ? 'Ton message est bien arrivé, je te réponds très vite.'
            : "Ton application mail s'est ouverte avec ton message : il ne reste qu'à l'envoyer."}
        </p>
        <button onClick={onClose} className="mt-2 px-5 py-2.5 rounded-full text-sm font-bold border hover:-translate-y-0.5 transition" style={{ borderColor: 'var(--line)' }}>
          Revenir à la photo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex-1 flex flex-col gap-3 min-h-0" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <label className="sr-only" htmlFor="m-name">Ton prénom</label>
      <input id="m-name" name="name" required placeholder="Ton prénom" autoComplete="given-name" className={field} style={fieldStyle} />
      <label className="sr-only" htmlFor="m-email">Ton e-mail</label>
      <input id="m-email" name="email" type="email" required placeholder="Ton e-mail" autoComplete="email" className={field} style={fieldStyle} />
      <label className="sr-only" htmlFor="m-msg">Ton message</label>
      <textarea id="m-msg" name="message" required placeholder="Dis-moi tout : projet, stage, opportunité…" className={`${field} flex-1 min-h-[96px] resize-none`} style={fieldStyle} />
      <p className="text-xs min-h-[1rem]" role="alert" style={{ color: '#E5484D' }}>
        {err || (status === 'error' ? `L'envoi a échoué. Réessaie, ou écris-moi à ${EMAIL}.` : '')}
      </p>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-black hover:-translate-y-0.5 hover:shadow-lg transition disabled:opacity-60"
        style={{ background: ORANGE }}
      >
        {status === 'sending' ? 'Envoi…' : <>Envoyer <Send size={16} /></>}
      </button>
    </form>
  );
}

const floaters = [
  { label: 'React', pos: 'top-[28%] -left-5 md:-left-8', delay: '0s' },
  { label: 'NestJS', pos: 'top-[52%] -right-5 md:-right-8', delay: '-1.4s' },
  { label: 'Python', pos: 'bottom-[34%] -left-5 md:-left-8', delay: '-2.8s' },
  { label: 'MQTT', pos: 'top-[14%] -right-5 md:-right-8', delay: '-4.1s' },
];

function Photo({ flipped, setFlipped }: { flipped: boolean; setFlipped: (v: boolean) => void }) {
  const reduced = useReducedMotion();
  const tiltRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // Un seul des deux côtés est interactif à la fois (clavier et lecteurs d'écran)
  useEffect(() => {
    if (frontRef.current) (frontRef.current as any).inert = flipped;
    if (backRef.current) (backRef.current as any).inert = !flipped;
  }, [flipped]);

  const move = (e: React.MouseEvent) => {
    if (reduced || flipped || !tiltRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
    if (imgRef.current) imgRef.current.style.transform = `translate(${-x * 16}px, ${-y * 16}px) scale(1.1)`;
  };
  const leave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = '';
    if (imgRef.current) imgRef.current.style.transform = '';
  };

  return (
    <div className="ml-auto w-full max-w-md fade-in" style={{ animationDelay: '.9s' }}>
      <div className="idle" style={{ perspective: 1400 }} onMouseMove={move} onMouseLeave={leave}>
        <div ref={tiltRef} className="relative" style={{ transformStyle: 'preserve-3d', transition: 'transform .25s ease-out' }}>
          {/* Halo orange */}
          <div className="absolute -inset-5 rounded-[2rem] blur-3xl opacity-45" style={{ background: `radial-gradient(circle at 30% 25%, ${ORANGE}, transparent 70%)` }} aria-hidden />

          <div
            className="relative"
            style={{
              aspectRatio: '4 / 5',
              minHeight: 430,
              transformStyle: 'preserve-3d',
              transition: 'transform .85s cubic-bezier(.4,.2,.2,1)',
              transform: flipped ? 'rotateY(180deg)' : 'none',
            }}
          >
            {/* FACE AVANT : photo */}
            <div ref={frontRef} className="face">
              <div className="ring h-full" style={{ boxShadow: '0 30px 80px -25px rgba(240,146,43,.55)' }}>
                <div className="ring-in shine h-full" style={{ background: '#222' }}>
                  <img
                    ref={imgRef}
                    src="/photo-dienaba.jpg"
                    alt="Portrait illustré de Diénaba Kande, souriante, en foulard noir et cardigan vert"
                    className="w-full h-full object-cover"
                    style={{ transform: 'scale(1.06)', transition: 'transform .3s ease-out' }}
                    loading="eager"
                    draggable={false}
                  />
                  <Greeting />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
                    <span className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-full backdrop-blur-md text-white text-xs font-bold" style={{ background: 'rgba(14,14,16,0.55)' }}>
                      <span className="inline-flex items-center gap-2">
                        <span className="live-dot w-2.5 h-2.5 rounded-full" style={{ background: '#4ADE80' }} />
                        Ouverte aux opportunités
                      </span>
                      <span className="opacity-80 font-normal">Dakar, SN</span>
                    </span>
                    <button
                      onClick={() => setFlipped(true)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-black hover:-translate-y-0.5 hover:shadow-xl transition"
                      style={{ background: ORANGE }}
                    >
                      <MessageCircle size={18} /> Laisser un message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FACE ARRIÈRE : formulaire */}
            <div ref={backRef} className="face" style={{ transform: 'rotateY(180deg)' }}>
              <div className="ring h-full" style={{ boxShadow: '0 30px 80px -25px rgba(240,146,43,.55)' }}>
                <div className="ring-in h-full p-6 flex flex-col gap-4" style={{ background: 'var(--card)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className={`${display.className} text-2xl font-extrabold leading-tight`}>Laisse-moi un message</h2>
                      <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Je lis tout et je réponds vite.</p>
                    </div>
                    <button onClick={() => setFlipped(false)} aria-label="Revenir à la photo" className="p-2 rounded-full border hover:rotate-90 transition-transform shrink-0" style={{ borderColor: 'var(--line)' }}>
                      <X size={16} />
                    </button>
                  </div>
                  <MessageForm onClose={() => setFlipped(false)} />
                </div>
              </div>
            </div>
          </div>

          {/* Technologies qui flottent autour de la carte */}
          {floaters.map((f) => (
            <span
              key={f.label}
              className={`floaty absolute ${f.pos} z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border shadow-lg`}
              style={{ background: 'var(--card)', borderColor: 'var(--line)', color: 'var(--fg)', animationDelay: f.delay, transform: 'translateZ(40px)' }}
              aria-hidden
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ORANGE }} />
              {f.label}
            </span>
          ))}
          <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-xs font-black text-black rotate-6 z-10" style={{ background: ORANGE }} aria-hidden>
            Full-Stack
          </div>
        </div>
      </div>
    </div>
  );
}

/* Carte projet avec inclinaison 3D et halo qui suit la souris */
function Tilt({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`tilt ${className}`} style={style}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="mb-12">
      <h2 className={`${display.className} text-3xl md:text-4xl font-extrabold tracking-tight`}>{children}</h2>
      <span className="bar block mt-4 h-1.5 w-16 rounded-full" style={{ background: ORANGE }} />
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */

export default function Home() {
  const [dark, setDark] = useState(false);
  const [cat, setCat] = useState<(typeof CATS)[number]>('Tous');
  const [flipped, setFlipped] = useState(false);
  const openMessage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setFlipped(true), 450);
  };
  const heroRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { if (localStorage.getItem('theme') === 'dark') setDark(true); } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      try { localStorage.setItem('theme', d ? 'light' : 'dark'); } catch {}
      return !d;
    });
  };

  const onHeroMove = (e: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const shown = projects.filter((p) => cat === 'Tous' || p.cats.includes(cat));
  const accent = { color: 'var(--accent-text)' };
  const NAME = ['Diénaba', 'Kande'];
  let li = 0;

  return (
    <div
      className={`${body.className} min-h-screen antialiased transition-colors duration-300`}
      style={{ ...(themes[dark ? 'dark' : 'light'] as React.CSSProperties), background: 'var(--bg)', color: 'var(--fg)' }}
    >
      <style>{css}</style>

      <div ref={progressRef} className="fixed top-0 left-0 right-0 h-1 z-[70] origin-left" style={{ background: ORANGE, transform: 'scaleX(0)' }} aria-hidden />

      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded">
        Aller au contenu
      </a>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur border-b" style={{ background: 'var(--nav)', borderColor: 'var(--line)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <a href="#top" className={`${display.className} font-black text-lg tracking-tight`}>
            DK<span style={{ color: ORANGE }}>.</span>
          </a>
          <ul className="hidden md:flex gap-8 text-sm" style={{ color: 'var(--muted)' }}>
            {nav.map(([label, href]) => (
              <li key={href}><a href={href} className="hover:opacity-100 opacity-90" style={{ transition: 'color .2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)} onMouseLeave={(e) => (e.currentTarget.style.color = '')}>{label}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              className="p-2.5 rounded-full border hover:rotate-12 transition-transform"
              style={{ borderColor: 'var(--line)' }}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="#top" onClick={openMessage} className="px-4 py-2 rounded-full text-sm font-bold text-black hover:brightness-110 transition" style={{ background: ORANGE }}>
              Me contacter
            </a>
          </div>
        </div>
      </nav>

      <main id="main">
        {/* HERO */}
        <header id="top" ref={heroRef} onMouseMove={onHeroMove} className="relative overflow-hidden">
          <div className="dots absolute inset-0" aria-hidden />
          <div className="dots-hot absolute inset-0" aria-hidden />
          <div className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-20 md:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
            <div>
              <p className="fade-in text-sm font-bold" style={{ ...accent, animationDelay: '.1s' }}>
                Développeuse full-stack · Master 2 IA &amp; Big Data, ESP Dakar
              </p>
              <h1 className={`${display.className} mt-5 font-black tracking-tighter leading-[0.92] text-6xl sm:text-7xl md:text-8xl`} aria-label="Diénaba Kande">
                {NAME.map((w) => (
                  <span key={w} className="block" aria-hidden>
                    {w.split('').map((ch) => (
                      <span key={li} className="letter" style={{ animationDelay: `${120 + li++ * 55}ms` }}>{ch}</span>
                    ))}
                  </span>
                ))}
              </h1>
              <div className="mt-6 h-1.5 w-40 md:w-64 rounded-full" style={{ background: ORANGE }} />
              <p className="fade-in mt-8 text-xl md:text-2xl font-bold leading-snug min-h-[3.2rem] md:min-h-[2.2rem]" style={{ animationDelay: '.8s' }}>
                Je construis <Typewriter words={ROLES} />
              </p>
              <p className="fade-in mt-4 max-w-xl leading-relaxed" style={{ color: 'var(--muted)', animationDelay: '1s' }}>
                Je développe mes compétences en collecte, traitement et analyse de données, et je cherche à mettre mon profil technique au service de projets innovants.
              </p>
              <div className="fade-in mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '1.2s' }}>
                <a href={CV_PDF} download="CV-Dienaba-Kande.pdf" className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-black hover:-translate-y-0.5 hover:shadow-lg transition" style={{ background: ORANGE }}>
                  <FileText size={18} /> Télécharger mon CV
                </a>
                <a href="#projects" className="px-5 py-3 rounded-full font-bold border hover:-translate-y-0.5 transition" style={{ borderColor: 'var(--line)' }}>
                  Voir mes projets
                </a>
                {[
                  { href: LINKEDIN, label: 'LinkedIn', icon: <Linkedin size={20} />, ext: true },
                  { href: GITHUB, label: 'GitHub', icon: <Github size={20} />, ext: true },
                  { href: `mailto:${EMAIL}`, label: 'Email', icon: <Mail size={20} />, ext: false },
                ].map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} {...(s.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="p-3 rounded-full border hover:-translate-y-1 hover:border-[#F0922B] transition" style={{ borderColor: 'var(--line)' }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <Photo flipped={flipped} setFlipped={setFlipped} />
          </div>
        </header>

        {/* BANDEAU TECHNOS */}
        <div className="border-y overflow-hidden py-4" style={{ borderColor: 'var(--line)', background: 'var(--card)' }} aria-label="Technologies utilisées">
          <div className="marquee">
            {[...techs, ...techs].map((t, i) => (
              <span key={i} className={`${display.className} mx-6 font-bold text-lg whitespace-nowrap`} style={{ color: 'var(--muted)' }} aria-hidden={i >= techs.length}>
                {t}<span className="ml-12" style={{ color: ORANGE }}>●</span>
              </span>
            ))}
          </div>
        </div>

        {/* CHIFFRES */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className={`${display.className} text-5xl md:text-6xl font-black tabular-nums`} style={accent}>
                  <CountUp to={s.n} />
                </div>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          {/* EXPÉRIENCES */}
          <section id="experience" className="py-16 scroll-mt-16">
            <SectionTitle>Parcours professionnel</SectionTitle>
            <Reveal>
              <ol className="relative ml-1.5 space-y-14">
                <span className="tline absolute left-0 top-1 bottom-1 w-px" style={{ background: ORANGE }} aria-hidden />
                {experiences.map((e) => (
                  <li key={e.org + e.period} className="relative pl-9">
                    <span className="absolute -left-[6px] top-2 w-3 h-3 rounded-full" style={{ background: ORANGE, boxShadow: `0 0 0 5px var(--bg), 0 0 0 6px ${ORANGE}` }} aria-hidden />
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                      <h3 className={`${display.className} text-lg md:text-xl font-bold`}>{e.role}</h3>
                      <span className="text-sm whitespace-nowrap" style={{ color: 'var(--muted)' }}>{e.period}</span>
                    </div>
                    <p className="mb-4" style={{ color: 'var(--muted)' }}>{e.org}</p>
                    <ul className="space-y-2 max-w-2xl leading-relaxed">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Reveal>
          </section>

          {/* PROJETS */}
          <section id="projects" className="py-16 scroll-mt-16">
            <SectionTitle>Projets</SectionTitle>
            <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrer les projets">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className="chip px-4 py-2 rounded-full text-sm font-bold border"
                  style={cat === c ? { background: ORANGE, color: '#000', borderColor: ORANGE } : { borderColor: 'var(--line)' }}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6" key={cat}>
              {shown.map((p, i) => (
                <Tilt key={p.title} className="pop rounded-2xl border p-7 flex flex-col" style={{ background: 'var(--card)', borderColor: 'var(--line)', animationDelay: `${i * 90}ms` }}>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{p.context}</p>
                  <h3 className={`${display.className} mt-1 text-2xl font-extrabold`}>{p.title}</h3>
                  <p className="mt-3 leading-relaxed flex-1">{p.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                    {p.tags.map((t) => (
                      <li key={t} className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ borderColor: 'var(--line)' }}>{t}</li>
                    ))}
                  </ul>
                  {p.links && (
                    <div className="mt-5 flex gap-5">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline underline-offset-4" style={accent}>
                          {l.label} <ExternalLink size={14} />
                        </a>
                      ))}
                    </div>
                  )}
                </Tilt>
              ))}
            </div>
          </section>

          {/* COMPÉTENCES */}
          <section id="skills" className="py-16 scroll-mt-16">
            <SectionTitle>Compétences</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-8">
              {skills.map((s, i) => (
                <Reveal key={s.title} delay={i * 90}>
                  <h3 className={`${display.className} font-bold mb-4`}>{s.title}</h3>
                  <ul className="flex flex-wrap gap-2.5">
                    {s.items.map((it) => (
                      <li key={it} className="chip px-3.5 py-2 rounded-xl border text-sm font-medium" style={{ background: 'var(--card)', borderColor: 'var(--line)' }}>{it}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>

          {/* FORMATION */}
          <section id="education" className="py-16 scroll-mt-16">
            <SectionTitle>Formation</SectionTitle>
            <ul className="space-y-1">
              {education.map((e, i) => (
                <Reveal key={e.degree} delay={i * 70}>
                  <li className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 py-4 border-b" style={{ borderColor: 'var(--line)' }}>
                    <div>
                      <h3 className="font-bold">{e.degree}</h3>
                      <p style={{ color: 'var(--muted)' }}>{e.school}</p>
                    </div>
                    <span className="text-sm whitespace-nowrap font-bold" style={e.current ? accent : { color: 'var(--muted)' }}>{e.period}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="mt-16 grid md:grid-cols-2 gap-12">
              <Reveal>
                <h3 className={`${display.className} font-bold mb-4`}>Certifications</h3>
                <ul className="space-y-3">
                  {certifications.map((c) => (
                    <li key={c.title}>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>{c.issuer}, {c.date}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={100}>
                <h3 className={`${display.className} font-bold mb-4`}>Langues</h3>
                <ul className="space-y-4">
                  {languages.map((l) => (
                    <li key={l.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium">{l.name} <span style={{ color: 'var(--muted)' }}>· {l.label}</span></span>
                        <span style={{ color: 'var(--muted)' }}>{l.level}</span>
                      </div>
                      <div className="flex gap-1.5" aria-hidden>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < l.filled ? ORANGE : 'var(--line)' }} />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        </div>
      </main>

      {/* CONTACT / FOOTER */}
      <footer className="border-t mt-10" style={{ borderColor: 'var(--line)', background: 'var(--card)' }}>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <p className={`${display.className} text-4xl md:text-6xl font-black tracking-tighter`}>Travaillons ensemble.</p>
            <a href={`mailto:${EMAIL}`} className="mt-6 inline-block text-xl font-bold hover:underline underline-offset-8" style={accent}>{EMAIL}</a>
            <p className="mt-3" style={{ color: 'var(--muted)' }}>Dakar, Sénégal</p>
            <button onClick={openMessage} className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black hover:-translate-y-0.5 hover:shadow-lg transition" style={{ background: ORANGE }}>
              <MessageCircle size={18} /> Laisser un message
            </button>
          </Reveal>
          <div className="mt-10 flex justify-center gap-6 text-sm font-medium">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">LinkedIn</a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">GitHub</a>
            <a href={CV_PDF} className="hover:underline underline-offset-4">CV (PDF)</a>
          </div>
          <a href="#top" className="mt-10 inline-flex items-center gap-2 text-sm hover:-translate-y-1 transition" style={{ color: 'var(--muted)' }}>
            <ArrowUp size={16} /> Retour en haut
          </a>
          <p className="mt-6 text-xs" style={{ color: 'var(--muted)' }}>© 2026 Diénaba Kande</p>
        </div>
      </footer>
    </div>
  );
}
