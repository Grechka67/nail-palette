const { useState, useEffect } = React;

// ---------- lucide vanilla → React wrapper ----------
// window.lucide (vanilla UMD) exposes icons as PascalCase tuples:
//   IconName = ['svg', svgAttrs, children]   where children = [tag, attrs][]
// Wrap each one as a React component that respects className / fill / strokeWidth overrides.
function makeLucideIcon(name) {
  return function LucideIcon({ className = '', style, fill, strokeWidth, ...rest }) {
    const data = (window.lucide && window.lucide[name]) || null;
    if (!data) {
      // Fallback placeholder so missing icons don't crash the tree.
      return <span className={className} style={style} aria-hidden="true"></span>;
    }
    const [, attrs, children] = data;
    const baseAttrs = {
      xmlns: 'http://www.w3.org/2000/svg',
      width: 24,
      height: 24,
      viewBox: attrs.viewBox || '0 0 24 24',
      fill: fill ?? attrs.fill ?? 'none',
      stroke: attrs.stroke || 'currentColor',
      strokeWidth: strokeWidth ?? attrs['stroke-width'] ?? 2,
      strokeLinecap: attrs['stroke-linecap'] || 'round',
      strokeLinejoin: attrs['stroke-linejoin'] || 'round',
    };
    return (
      <svg {...baseAttrs} className={className} style={style} {...rest}>
        {(children || []).map((c, i) => {
          const [tag, a] = c;
          // remap kebab-case SVG attrs to React-friendly camelCase where needed
          const reactAttrs = {};
          for (const k in a) {
            if (k === 'stroke-width') reactAttrs.strokeWidth = a[k];
            else if (k === 'stroke-linecap') reactAttrs.strokeLinecap = a[k];
            else if (k === 'stroke-linejoin') reactAttrs.strokeLinejoin = a[k];
            else if (k === 'fill-rule') reactAttrs.fillRule = a[k];
            else if (k === 'clip-rule') reactAttrs.clipRule = a[k];
            else reactAttrs[k] = a[k];
          }
          return React.createElement(tag, { key: i, ...reactAttrs });
        })}
      </svg>
    );
  };
}

const Home           = makeLucideIcon('Home');
const Compass        = makeLucideIcon('Compass');
const ShoppingBag    = makeLucideIcon('ShoppingBag');
const Heart          = makeLucideIcon('Heart');
const User           = makeLucideIcon('User');
const Menu           = makeLucideIcon('Menu');
const Bell           = makeLucideIcon('Bell');
const Search         = makeLucideIcon('Search');
const Star           = makeLucideIcon('Star');
const ChevronLeft    = makeLucideIcon('ChevronLeft');
const ChevronRight   = makeLucideIcon('ChevronRight');
const X              = makeLucideIcon('X');
const MessageCircle  = makeLucideIcon('MessageCircle');
const Settings       = makeLucideIcon('Settings');
const Users          = makeLucideIcon('Users');
const Bookmark       = makeLucideIcon('Bookmark');
const Send           = makeLucideIcon('Send');
const Sparkles       = makeLucideIcon('Sparkles');
const Plus           = makeLucideIcon('Plus');
const Edit3          = makeLucideIcon('Edit3');
const MoreHorizontal = makeLucideIcon('MoreHorizontal');
const MapPin         = makeLucideIcon('MapPin');
const Clock          = makeLucideIcon('Clock');
const Camera         = makeLucideIcon('Camera');
const Share2         = makeLucideIcon('Share2');
const Reply          = makeLucideIcon('Reply');
const ThumbsUp       = makeLucideIcon('ThumbsUp');
const ShoppingCart   = makeLucideIcon('ShoppingCart');
const ArrowRight     = makeLucideIcon('ArrowRight');
const Check          = makeLucideIcon('Check');

// ---------- sample data ----------
const POSTS = [
  { id: 1, user: '@jennieblackwing', caption: 'chrome glaze era 💅✨', likes: '12.4k', h: 'h-56', grad: 'from-pink-200 via-rose-200 to-fuchsia-300', accent: '🎀' },
  { id: 2, user: '@kimmylee',         caption: 'soft girl french 🤍',  likes: '8.2k',  h: 'h-44', grad: 'from-rose-100 via-pink-100 to-rose-200', accent: '✨' },
  { id: 3, user: '@nickiminos',       caption: 'barbie pink bows 🩷',  likes: '24.1k', h: 'h-52', grad: 'from-pink-300 via-rose-300 to-pink-400', accent: '🎀' },
  { id: 4, user: '@obamyslayy26',     caption: 'y2k aura nails 💜',    likes: '5.7k',  h: 'h-48', grad: 'from-purple-200 via-fuchsia-200 to-pink-200', accent: '💫' },
  { id: 5, user: '@cherrybloom',      caption: 'cherry red gloss 🍒',  likes: '15.9k', h: 'h-56', grad: 'from-rose-300 via-red-200 to-pink-300', accent: '🍒' },
  { id: 6, user: '@y2kbarbie',        caption: 'glitter french tip ✨', likes: '9.3k',  h: 'h-44', grad: 'from-fuchsia-200 via-pink-200 to-violet-200', accent: '✨' },
  { id: 7, user: '@lunavibes',        caption: 'milky lavender 🦋',    likes: '6.8k',  h: 'h-48', grad: 'from-violet-200 via-purple-200 to-indigo-200', accent: '🦋' },
  { id: 8, user: '@sugarpeach',       caption: 'peachy ombré 🍑',      likes: '11.2k', h: 'h-52', grad: 'from-orange-100 via-pink-200 to-rose-200', accent: '🍑' },
];

const CATEGORIES = ['Reference', 'Colour', 'Service', 'Feet', 'Product', 'Trends'];

const TRENDS = [
  { name: 'Chrome',     emoji: '💅', grad: 'from-slate-200 via-pink-100 to-purple-200' },
  { name: 'French Tip', emoji: '🤍', grad: 'from-pink-100 via-rose-50 to-pink-200' },
  { name: 'Aura',       emoji: '💫', grad: 'from-purple-200 via-pink-200 to-fuchsia-200' },
  { name: 'Cat Eye',    emoji: '🐈', grad: 'from-fuchsia-200 via-violet-200 to-indigo-200' },
  { name: 'Jelly',      emoji: '🍓', grad: 'from-rose-200 via-pink-200 to-red-200' },
  { name: 'Bows',       emoji: '🎀', grad: 'from-pink-200 via-rose-200 to-pink-300' },
];

const HASHTAGS = ['#chromenails', '#frenchtip', '#y2knails', '#cleangirl', '#bowsonbows', '#milkynails'];

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];
const SERVICES = ['Manicure', 'Gel', 'Acrylic', 'Pedicure', 'Nail Art'];
const ARTISTS = [
  { name: 'Bella Rose',   salon: 'Luxe Nails',   rating: 4.9, reviews: 312, price: 45, grad: 'from-pink-200 to-rose-300' },
  { name: 'Aria Lin',     salon: 'Glow Bar',     rating: 4.8, reviews: 198, price: 55, grad: 'from-purple-200 to-pink-300' },
  { name: 'Mia Chen',     salon: 'Pink Studio',  rating: 5.0, reviews: 421, price: 60, grad: 'from-fuchsia-200 to-violet-300' },
];

const REVIEWS = [
  { user: '@sophie.glow',    rating: 5, text: 'obsessed!! bella did my chrome and they look mirror perfect ✨ already booked my next appt 🎀', likes: 142, replies: 8,  grad: 'from-pink-300 to-rose-400',     photoGrad: 'from-pink-200 to-purple-200' },
  { user: '@taylor.nails',   rating: 5, text: 'softest french tip ive ever had. she really took her time and the shape is immaculate 🤍',         likes: 89,  replies: 3,  grad: 'from-purple-300 to-fuchsia-400', photoGrad: 'from-rose-200 to-pink-200' },
  { user: '@emma.aesthetic', rating: 4, text: 'cute vibes & clean salon. only took off a star bc i waited 15 min past my time but worth it tbh', likes: 56,  replies: 2,  grad: 'from-rose-300 to-pink-400',     photoGrad: 'from-orange-100 to-rose-200' },
  { user: '@ivybloom',       rating: 5, text: 'mia is literally an artist. the bow detail?? cant stop staring at my hands 🩷✨',                  likes: 203, replies: 12, grad: 'from-fuchsia-300 to-purple-400', photoGrad: 'from-pink-200 to-fuchsia-200' },
];

const CALENDAR_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const CAL_START_OFFSET = 5;
const CAL_DAYS = 31;

// ---------- Gen Z social additions ----------
const STORIES = [
  { user: 'your story', grad: 'from-pink-200 via-rose-200 to-purple-200', mine: true,  seen: false, emoji: '➕' },
  { user: '@jennie',    grad: 'from-pink-200 via-rose-200 to-fuchsia-300', mine: false, seen: false, emoji: '💅' },
  { user: '@nicki',     grad: 'from-pink-300 via-rose-300 to-pink-400',    mine: false, seen: false, emoji: '🎀' },
  { user: '@cherry',    grad: 'from-rose-300 via-red-200 to-pink-300',     mine: false, seen: false, emoji: '🍒' },
  { user: '@obama',     grad: 'from-purple-200 via-fuchsia-200 to-pink-200', mine: false, seen: false, emoji: '💫' },
  { user: '@kimmy',     grad: 'from-rose-100 via-pink-100 to-rose-200',    mine: false, seen: true,  emoji: '🤍' },
  { user: '@luna',      grad: 'from-violet-200 via-purple-200 to-indigo-200', mine: false, seen: true,  emoji: '🦋' },
  { user: '@sugar',     grad: 'from-orange-100 via-pink-200 to-rose-200',  mine: false, seen: true,  emoji: '🍑' },
];

const ACTIVITY = [
  { who: '@sophie.glow', what: 'just booked Bella Rose',         emoji: '✨' },
  { who: '@ivybloom',    what: 'saved chrome glaze era',         emoji: '💖' },
  { who: '@taylor.nails',what: 'left a 5★ review at Luxe Nails', emoji: '⭐' },
  { who: '@emma',        what: 'liked your peachy ombré',        emoji: '🩷' },
  { who: '@y2kbarbie',   what: 'posted a new look',              emoji: '🎀' },
  { who: '@lunavibes',   what: 'started following you',          emoji: '💜' },
];

const COMMENTS = [
  { user: '@sophie.glow',  text: 'omg the shape??? immaculate 😭', time: '2m', grad: 'from-pink-300 to-rose-400' },
  { user: '@taylor.nails', text: 'need this for my bday 🎀',       time: '14m', grad: 'from-purple-300 to-fuchsia-400' },
  { user: '@ivybloom',     text: 'chrome supremacy fr',            time: '1h',  grad: 'from-fuchsia-300 to-purple-400' },
  { user: '@emma',         text: 'booking rn',                     time: '3h',  grad: 'from-rose-300 to-pink-400' },
];

// ---------- helper components ----------

// ambient sparkle particles scattered inside a tile
function SparkleField({ count = 4, density = 'cute' }) {
  if (density === 'chill') count = Math.max(2, Math.floor(count / 2));
  if (density === 'extra') count = count * 2;
  const items = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
    top: Math.round(8 + Math.random() * 80) + '%',
    left: Math.round(6 + Math.random() * 86) + '%',
    delay: (Math.random() * 1.6).toFixed(2) + 's',
    size: 8 + Math.round(Math.random() * 8),
    key: i,
  })), [count]);
  return (
    <div className="absolute inset-0 pointer-events-none">
      {items.map(s => (
        <span
          key={s.key}
          className="absolute animate-[twinkle_2.4s_ease-in-out_infinite] text-white/90"
          style={{ top: s.top, left: s.left, fontSize: s.size + 'px', animationDelay: s.delay, filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' }}
        >✦</span>
      ))}
    </div>
  );
}

// floating hearts that rise and fade — feed by passing a numeric `burst` key
function HeartShower({ burstKey }) {
  if (!burstKey) return null;
  const particles = Array.from({ length: 7 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" key={burstKey}>
      {particles.map(i => {
        const x = 20 + Math.random() * 60;
        const drift = (Math.random() * 30 - 15).toFixed(0);
        const delay = (i * 50) + 'ms';
        const size = 18 + Math.round(Math.random() * 18);
        return (
          <span
            key={i}
            className="absolute bottom-1/2 text-pink-500 animate-[heartFloat_900ms_ease-out_forwards]"
            style={{
              left: x + '%',
              fontSize: size + 'px',
              animationDelay: delay,
              ['--drift']: drift + 'px',
              filter: 'drop-shadow(0 0 8px rgba(244,114,182,0.6))',
            }}
          >♥</span>
        );
      })}
    </div>
  );
}

// auto-rotating activity ticker — shows one entry at a time
function ActivityTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % ACTIVITY.length), 3200);
    return () => clearInterval(t);
  }, []);
  const a = ACTIVITY[i];
  return (
    <div className="mx-5 mb-4 rounded-full bg-white/60 backdrop-blur-xl border border-white/70 overflow-hidden">
      <div className="flex items-center gap-2 px-3.5 py-2">
        <span className="relative w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0">
          <span className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-75"></span>
        </span>
        <span className="text-[11.5px] truncate flex-1 leading-tight">
          <strong className="font-semibold text-pink-600">{a.who}</strong>
          <span className="text-gray-600"> {a.what}</span>
        </span>
      </div>
    </div>
  );
}

// icon sizing helper — replaces lucide-react's missing w-4.5
const ICON_18 = { width: 18, height: 18 };

function NailPalette() {
  const [activeTab, setActiveTab] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashHidden, setSplashHidden] = useState(false);

  const [savedPosts, setSavedPosts] = useState(new Set([2, 4, 5]));
  const [likedPosts, setLikedPosts] = useState(new Set([1, 3]));
  const [heartBurst, setHeartBurst] = useState(null);

  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('2:30 PM');
  const [selectedService, setSelectedService] = useState('Gel');
  const [selectedArtist, setSelectedArtist] = useState(0);
  const [bookingToast, setBookingToast] = useState(false);

  const [collectionsTab, setCollectionsTab] = useState('Wishlist');

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmittedToast, setReviewSubmittedToast] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Reference');

  // Gen Z additions
  const [postDetail, setPostDetail] = useState(null); // post object or null
  const [detailHearts, setDetailHearts] = useState(0); // burst counter
  const [storyOpen, setStoryOpen] = useState(null);    // story index or null
  const [storyProgress, setStoryProgress] = useState(0);

  // Tweaks
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "motion": "on",
    "sparkles": "chill"
  }/*EDITMODE-END*/;
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // edit-mode protocol
  useEffect(() => {
    const handler = (e) => {
      if (!e?.data?.type) return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    try { window.parent?.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
    return () => window.removeEventListener('message', handler);
  }, []);

  const setTweak = (patch) => {
    setTweaks(prev => {
      const next = { ...prev, ...patch };
      try { window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*'); } catch {}
      return next;
    });
  };

  // story auto-advance
  useEffect(() => {
    if (storyOpen === null) return;
    setStoryProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const p = (Date.now() - start) / 3500;
      if (p >= 1) {
        clearInterval(tick);
        if (storyOpen < STORIES.length - 1) setStoryOpen(storyOpen + 1);
        else setStoryOpen(null);
      } else {
        setStoryProgress(p);
      }
    }, 40);
    return () => clearInterval(tick);
  }, [storyOpen]);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashVisible(false), 1600);
    const t2 = setTimeout(() => setSplashHidden(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const toggleSaved = (id) => {
    setSavedPosts(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleLiked = (id) => {
    setLikedPosts(prev => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); } else { n.add(id); setHeartBurst(id); setTimeout(() => setHeartBurst(null), 600); }
      return n;
    });
  };

  const handleBook = () => {
    setBookingToast(true);
    setTimeout(() => setBookingToast(false), 2600);
  };

  const handleSubmitReview = () => {
    if (reviewRating === 0) return;
    setReviewModalOpen(false);
    setReviewRating(0);
    setReviewText('');
    setReviewSubmittedToast(true);
    setTimeout(() => setReviewSubmittedToast(false), 2400);
  };

  const navigate = (tab) => {
    setActiveTab(tab);
    setDrawerOpen(false);
  };

  const NailPostCard = ({ p }) => (
    <div className="mb-3 break-inside-avoid relative group">
      <button
        type="button"
        onClick={() => setPostDetail(p)}
        aria-label={`open ${p.user} look — ${p.caption}`}
        className={`relative ${p.h} w-full rounded-[1.5rem] overflow-hidden bg-gradient-to-br ${p.grad} transition-transform duration-300 group-hover:scale-[1.02] block text-left`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/40 blur-2xl"></div>
        {tweaks.sparkles !== 'chill' && <SparkleField count={2} density={tweaks.sparkles} />}
        <div className="absolute bottom-2.5 right-3 text-2xl">{p.accent}</div>
        <div className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-md">💅</div>
        {heartBurst === p.id && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-16 h-16 text-pink-500 animate-ping" fill="currentColor" />
          </div>
        )}
      </button>
      {/* save button overlay */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleSaved(p.id); }}
        aria-label={savedPosts.has(p.id) ? 'unsave look' : 'save look'}
        aria-pressed={savedPosts.has(p.id)}
        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10 ${savedPosts.has(p.id) ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
      >
        <Bookmark className="w-3.5 h-3.5" fill={savedPosts.has(p.id) ? 'currentColor' : 'none'} />
      </button>
      <div className="px-1 pt-2 flex items-center gap-1.5">
        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${p.grad} border border-white shadow-sm`}></div>
        <span className="text-[11px] font-semibold text-gray-800 truncate">{p.user}</span>
      </div>
          <p className="px-1 text-[11.5px] text-gray-500 truncate">{p.caption}</p>
      <button
        onClick={(e) => { e.stopPropagation(); toggleLiked(p.id); }}
        aria-label={likedPosts.has(p.id) ? 'unlike look' : 'like look'}
        aria-pressed={likedPosts.has(p.id)}
        className="px-1 pt-0.5 flex items-center gap-1 text-[11px] text-gray-500 hover:text-pink-500 transition"
      >
        <Heart className={`w-3.5 h-3.5 transition-all ${likedPosts.has(p.id) ? 'text-pink-500 scale-110' : ''}`} fill={likedPosts.has(p.id) ? 'currentColor' : 'none'} />
        <span>{p.likes}</span>
      </button>
    </div>
  );

  const SectionHeader = ({ title, action }) => (
    <div className="flex items-end justify-between px-5 mb-3 mt-2">
      <h2 className="font-serif italic text-xl text-gray-900 tracking-tight">{title}</h2>
      {action && <button className="text-[11px] text-pink-500 font-medium flex items-center gap-0.5">{action} <ArrowRight className="w-3 h-3" /></button>}
    </div>
  );

  const renderHome = () => (
    <div className="pb-28">
      {/* stories — the social hook */}
      <div className="overflow-x-auto no-scrollbar mt-3 mb-4">
        <div className="flex gap-3.5 px-5 w-max pb-1">
          {STORIES.map((s, i) => (
            <button
              key={i}
              onClick={() => setStoryOpen(i)}
              aria-label={`open ${s.user} story`}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className={`relative w-14 h-14 rounded-full p-[2px] ${s.seen ? 'bg-gray-200' : 'bg-gradient-to-tr from-pink-400 to-rose-500'} transition-transform group-hover:scale-105 group-active:scale-95`}>
                <div className="w-full h-full rounded-full bg-white p-[2px]">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${s.grad} flex items-center justify-center text-xl`}>
                    {s.mine ? <span className="text-white font-light text-xl">+</span> : s.emoji}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-medium truncate max-w-[60px] ${s.mine ? 'text-pink-600' : 'text-gray-500'}`}>{s.user}</span>
            </button>
          ))}
        </div>
      </div>

      {/* live activity ticker */}
      <ActivityTicker />

      <div className="px-5 mt-1 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="search nail looks…"
            aria-label="search nail looks"
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/60 backdrop-blur-xl border border-white/70 text-[13px] text-gray-800 placeholder:text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar mb-5">
        <div className="flex gap-2 px-5 w-max">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === c
                  ? 'bg-gray-900 text-white'
                  : 'bg-white/60 backdrop-blur-md text-gray-600 border border-white/70 hover:bg-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mb-5">
        <div className="relative h-24 rounded-[1.5rem] overflow-hidden bg-gradient-to-r from-pink-100 via-rose-100 to-purple-100 border border-white/80">
          <div className="absolute -right-6 -bottom-4 text-7xl opacity-40">✨</div>
          <div className="absolute -left-1 top-3 text-3xl opacity-90">💅</div>
          <div className="relative h-full flex flex-col justify-center pl-16 pr-4">
            <p className="text-[9.5px] uppercase tracking-[0.18em] text-pink-500/80 font-semibold">spotlight</p>
            <p className="font-serif italic text-[17px] text-gray-900 leading-tight mt-0.5">glazed donut summer 🍩</p>
            <p className="text-[10.5px] text-gray-500 mt-0.5">explore the trend →</p>
          </div>
        </div>
      </div>

      <div className="px-4 columns-2 gap-3">
        {POSTS.map(p => <NailPostCard key={p.id} p={p} />)}
      </div>
    </div>
  );

  const renderDiscover = () => (
    <div className="pb-28">
      <div className="px-5 mt-3 mb-5">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-purple-200 via-pink-200 to-rose-300 p-5 shadow-[0_12px_32px_-12px_rgba(189,143,255,0.5)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/30 blur-2xl"></div>
          <div className="absolute top-3 right-4 text-4xl animate-pulse">✨</div>
          <div className="absolute bottom-3 right-3 text-3xl">🎀</div>
          <p className="relative text-[10px] uppercase tracking-[0.2em] font-bold text-purple-800/80">this week's vibe</p>
          <h2 className="relative font-serif italic text-3xl text-gray-900 mt-1 leading-tight">glazed lavender aura</h2>
          <p className="relative text-[11.5px] text-gray-700 mt-1 max-w-[200px]">soft, dreamy, with that just-out-of-the-salon shine 💜</p>
          <button className="relative mt-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur text-[11.5px] font-semibold text-gray-900 shadow-sm hover:bg-white transition flex items-center gap-1">
            get the look <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <SectionHeader title="trending styles" action="see all" />
      <div className="px-5 grid grid-cols-2 gap-3 mb-5">
        {TRENDS.map(t => (
          <div key={t.name} className={`relative h-32 rounded-[1.5rem] overflow-hidden bg-gradient-to-br ${t.grad} shadow-md hover:scale-[1.03] hover:-rotate-1 transition-all duration-300 cursor-pointer`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
            <div className="absolute top-2 right-2 text-2xl">{t.emoji}</div>
            <div className="absolute bottom-2 left-3">
              <p className="font-serif italic text-base text-gray-900">{t.name}</p>
              <p className="text-[10px] text-gray-700">trending now</p>
            </div>
            <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-gray-800" />
            </div>
          </div>
        ))}
      </div>

      <SectionHeader title="trending tags" />
      <div className="overflow-x-auto no-scrollbar mb-5">
        <div className="flex gap-2 px-5 w-max">
          {HASHTAGS.map((h, i) => (
            <div key={h} className="px-3.5 py-2 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm">
              <p className="text-[11.5px] font-semibold text-pink-500">{h}</p>
              <p className="text-[9.5px] text-gray-500">{(45 - i * 6).toFixed(1)}k posts</p>
            </div>
          ))}
        </div>
      </div>

      <SectionHeader title="artists for you" />
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-3 px-5 w-max pb-2">
          {ARTISTS.map((a, i) => (
            <div key={i} className="w-36 rounded-[1.5rem] bg-white/70 backdrop-blur-xl border border-white/80 overflow-hidden shadow-sm">
              <div className={`h-20 bg-gradient-to-br ${a.grad} relative`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0"></div>
                <div className="absolute -bottom-5 left-3 w-10 h-10 rounded-full bg-white p-0.5">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${a.grad}`}></div>
                </div>
              </div>
              <div className="pt-6 pb-3 px-3">
                <p className="text-[12px] font-semibold text-gray-900 truncate">{a.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{a.salon}</p>
                <div className="mt-1 flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-amber-400" fill="currentColor" />
                  <span className="text-[10px] font-semibold text-gray-700">{a.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBook = () => (
    <div className="pb-32">
      <div className="px-5 mt-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif italic text-xl text-gray-900">May 2026</h2>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-full bg-white/70 backdrop-blur flex items-center justify-center border border-white/80">
              <ChevronLeft className="w-3.5 h-3.5 text-gray-700" />
            </button>
            <button className="w-7 h-7 rounded-full bg-white/70 backdrop-blur flex items-center justify-center border border-white/80">
              <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-white/70 backdrop-blur-xl border border-white/80 p-3 shadow-sm">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {CALENDAR_DAYS.map((d, i) => (
              <div key={i} className="text-center text-[10px] font-semibold text-pink-400/80">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: CAL_START_OFFSET }).map((_, i) => <div key={`b${i}`}></div>)}
            {Array.from({ length: CAL_DAYS }).map((_, i) => {
              const day = i + 1;
              const isSelected = day === selectedDate;
              const isToday = day === 15;
              const isPast = day < 15;
              return (
                <button
                  key={day}
                  onClick={() => !isPast && setSelectedDate(day)}
                  disabled={isPast}
                  className={`aspect-square rounded-xl text-[11px] font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-br from-pink-300 to-rose-400 text-white shadow-md shadow-pink-200 scale-105'
                      : isToday
                      ? 'text-pink-500 ring-1 ring-pink-300'
                      : isPast
                      ? 'text-gray-300'
                      : 'text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <SectionHeader title="service" />
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2 px-5 w-max">
            {SERVICES.map(s => (
              <button
                key={s}
                onClick={() => setSelectedService(s)}
                className={`px-4 py-2 rounded-full text-[12px] font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedService === s
                    ? 'bg-gradient-to-r from-pink-300 to-rose-400 text-white shadow-md shadow-pink-200'
                    : 'bg-white/70 backdrop-blur-md text-gray-600 border border-white/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <SectionHeader title="time" />
        <div className="px-5 grid grid-cols-3 gap-2">
          {TIME_SLOTS.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={`py-2.5 rounded-2xl text-[11.5px] font-semibold transition-all duration-300 ${
                selectedTime === t
                  ? 'bg-gradient-to-br from-pink-300 to-rose-400 text-white shadow-md shadow-pink-200 scale-[1.02]'
                  : 'bg-white/70 backdrop-blur-md text-gray-700 border border-white/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <SectionHeader title="choose your artist" action="reviews" />
        <div className="px-5 space-y-2.5">
          {ARTISTS.map((a, i) => (
            <button
              key={i}
              onClick={() => setSelectedArtist(i)}
              className={`w-full text-left rounded-[1.25rem] p-3 flex items-center gap-3 transition-all duration-300 ${
                selectedArtist === i
                  ? 'bg-gradient-to-r from-pink-100 to-rose-100 border-2 border-pink-300 shadow-md'
                  : 'bg-white/70 backdrop-blur-xl border-2 border-white/80'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${a.grad} flex items-center justify-center text-xl shadow-sm shrink-0`}>💅</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900 truncate">{a.name}</p>
                <p className="text-[10.5px] text-gray-500 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{a.salon}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-amber-400" fill="currentColor" />
                  <span className="text-[10.5px] font-semibold text-gray-700">{a.rating}</span>
                  <span className="text-[10px] text-gray-400">({a.reviews})</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[15px] font-bold text-pink-500">${a.price}</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider">from</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFavorites = () => {
    const tabs = ['Wishlist', 'Tried', 'Inspo'];
    return (
      <div className="pb-28">
        <div className="px-5 mt-3 mb-4">
          <div className="flex gap-1 p-1 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setCollectionsTab(t)}
                className={`flex-1 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 ${
                  collectionsTab === t
                    ? 'bg-gradient-to-r from-pink-300 to-rose-400 text-white shadow-md'
                    : 'text-gray-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 mb-3 flex items-center justify-between">
          <p className="text-[11.5px] text-gray-500">
            <span className="font-bold text-pink-500">{savedPosts.size}</span> saved looks 💖
          </p>
          <button className="text-[11px] text-pink-500 font-medium flex items-center gap-0.5">
            <Plus className="w-3 h-3" /> new collection
          </button>
        </div>

        <div className="px-4 columns-2 gap-3">
          {POSTS.filter(p => savedPosts.has(p.id) || collectionsTab !== 'Wishlist').slice(0, 6).map(p => (
            <div key={p.id} className="mb-3 break-inside-avoid relative group">
              <div className={`relative ${p.h} rounded-[1.75rem] overflow-hidden bg-gradient-to-br ${p.grad} shadow-md transition-transform duration-300 group-hover:scale-[1.02]`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-md">💅</div>
                <div className="absolute bottom-2 right-3 text-2xl">{p.accent}</div>
                <button
                  onClick={() => toggleSaved(p.id)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm"
                >
                  <Heart className={`w-4 h-4 transition-all duration-300 ${savedPosts.has(p.id) ? 'text-pink-500 scale-110' : 'text-gray-400'}`} fill={savedPosts.has(p.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="px-1 pt-2 text-[11px] font-semibold text-gray-800 truncate">{p.user}</p>
              <p className="px-1 text-[10.5px] text-gray-500 truncate">{p.caption}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderReviews = () => (
    <div className="pb-32 relative">
      <div className="px-5 mt-3">
        <div className="rounded-[1.5rem] bg-white/70 backdrop-blur-xl border border-white/80 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center text-xl">💅</div>
            <div className="flex-1">
              <h2 className="font-serif italic text-lg text-gray-900">Luxe Nails Studio</h2>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />)}
                </div>
                <span className="text-[11px] font-semibold text-gray-800 ml-0.5">4.9</span>
                <span className="text-[10px] text-gray-500">· 312 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionHeader title="reviews" />

      <div className="px-5 space-y-3">
        {REVIEWS.map((r, i) => (
          <div key={i} className="rounded-[1.5rem] bg-white/70 backdrop-blur-xl border border-white/80 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${r.grad} shrink-0 shadow-sm border border-white`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-gray-900">{r.user}</p>
                  <button><MoreHorizontal className="w-4 h-4 text-gray-400" /></button>
                </div>
                <div className="flex gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-3 h-3 ${s <= r.rating ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[12px] text-gray-700 mt-2 leading-relaxed">{r.text}</p>
                <div className="flex gap-1.5 mt-2.5">
                  {[1,2].map(p => (
                    <div key={p} className={`w-14 h-14 rounded-xl bg-gradient-to-br ${r.photoGrad} flex items-center justify-center text-lg shadow-sm`}>💅</div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 text-gray-500">
                  <button className="flex items-center gap-1 text-[10.5px] hover:text-pink-500 transition">
                    <ThumbsUp className="w-3 h-3" /> {r.likes}
                  </button>
                  <button className="flex items-center gap-1 text-[10.5px] hover:text-pink-500 transition">
                    <Reply className="w-3 h-3" /> {r.replies} replies
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setReviewModalOpen(true)}
        className="absolute bottom-24 right-5 px-4 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white text-[12px] font-bold shadow-xl shadow-pink-300/60 flex items-center gap-1.5 hover:scale-105 transition-all duration-300"
      >
        <Edit3 className="w-3.5 h-3.5" /> Write a Review
      </button>
    </div>
  );

  const renderProfile = () => (
    <div className="pb-28">
      <div className="relative h-28 mx-5 mt-3 rounded-[1.5rem] bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0"></div>
        <div className="absolute top-3 right-3 text-3xl">✨</div>
        <div className="absolute bottom-2 right-3 text-2xl">🎀</div>
      </div>

      <div className="px-5 -mt-10 relative z-10">
        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-300 via-rose-400 to-purple-400 flex items-center justify-center text-3xl">💅</div>
        </div>
      </div>

      <div className="px-5 mt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif italic text-xl text-gray-900">@khamzat</h2>
            <p className="text-[11px] text-gray-500">nail art enthusiast 🩷 sf based</p>
          </div>
          <button className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 text-[11.5px] font-semibold text-gray-800 shadow-sm hover:bg-white transition">
            edit profile
          </button>
        </div>

        <p className="text-[12px] text-gray-700 mt-2 leading-relaxed">collecting cute nail looks since 2022 ✨ dm for collabs</p>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: 'posts', val: '127' },
            { label: 'followers', val: '12.4k' },
            { label: 'following', val: '842' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 py-2.5 text-center shadow-sm">
              <p className="text-[15px] font-bold text-gray-900">{s.val}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {[
            { icon: ShoppingBag,   label: 'My Shopping', tab: null },
            { icon: User,           label: 'My Profile',  tab: 'profile' },
            { icon: MessageCircle,  label: 'Messages',    tab: null },
            { icon: Star,           label: 'Reviews',     tab: 'reviews' },
            { icon: Settings,       label: 'Settings',    tab: null },
            { icon: Users,          label: 'Community',   tab: null },
          ].map(l => (
            <button
              key={l.label}
              onClick={() => l.tab && navigate(l.tab)}
              className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 p-3 flex items-center gap-2 shadow-sm hover:bg-white transition"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
                <l.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-[12px] font-semibold text-gray-800">{l.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 mb-2 flex items-center justify-between">
          <h3 className="font-serif italic text-base text-gray-900">my looks</h3>
          <p className="text-[11px] text-gray-400">grid view</p>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {POSTS.slice(0, 6).map(p => (
            <div key={p.id} className={`aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${p.grad} relative shadow-sm hover:scale-[1.04] transition`}>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">💅</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div data-motion={tweaks.motion === 'on' ? 'on' : 'off'} className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 flex items-center justify-center p-4 font-sans relative" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-pink-200/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-purple-200/40 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-20 w-32 h-32 rounded-full bg-rose-200/40 blur-3xl pointer-events-none"></div>

      <div className="relative max-w-sm mx-auto w-full">
        <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
          <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 rounded-[2.5rem] overflow-hidden h-[820px] flex flex-col">

            <div className="relative h-9 flex items-center justify-between px-7 pt-2 shrink-0 z-30">
              <span className="text-[11px] font-semibold text-gray-900">9:41</span>
              <div className="absolute left-1/2 top-1.5 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full"></div>
              <div className="flex items-center gap-1 text-gray-900">
                <span className="text-[10px]">●●●●</span>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 1 L13 5 L11 7 L7 4 L3 7 L1 5 Z" /></svg>
                <div className="w-5 h-2.5 border border-gray-900 rounded-sm relative">
                  <div className="absolute inset-0.5 bg-gray-900 rounded-[1px] w-3/4"></div>
                </div>
              </div>
            </div>

            <div className="relative px-5 py-2.5 flex items-center justify-between shrink-0 z-20">
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="open menu"
                className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 flex items-center justify-center shadow-sm hover:scale-105 transition"
              >
                <Menu className="w-4 h-4 text-gray-800" />
              </button>

              <h1 style={{ width: 'max-content', flexShrink: 0 }} className="font-serif italic text-lg whitespace-nowrap bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent font-bold tracking-tight">
                Nail Palette
              </h1>

              <button aria-label="notifications" className="relative w-10 h-10 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 flex items-center justify-center shadow-sm hover:scale-105 transition">
                <Bell className="w-4 h-4 text-gray-800" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-white animate-pulse"></span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              {activeTab === 'home'      && renderHome()}
              {activeTab === 'discover'  && renderDiscover()}
              {activeTab === 'book'      && renderBook()}
              {activeTab === 'favorites' && renderFavorites()}
              {activeTab === 'reviews'   && renderReviews()}
              {activeTab === 'profile'   && renderProfile()}
            </div>

            {activeTab === 'book' && (
              <div className="absolute bottom-20 left-0 right-0 px-5 z-30">
                <div className="rounded-[1.5rem] bg-white/80 backdrop-blur-2xl border border-white/90 p-2.5 shadow-xl flex items-center gap-2">
                  <div className="flex-1 pl-2">
                    <p className="text-[10px] text-gray-500">{selectedService} · May {selectedDate} · {selectedTime}</p>
                    <p className="text-[14px] font-bold text-gray-900">${ARTISTS[selectedArtist].price}.00</p>
                  </div>
                  <button
                    onClick={handleBook}
                    className="px-5 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white text-[12.5px] font-bold shadow-md shadow-pink-300/50 hover:scale-105 transition-all duration-300 flex items-center gap-1.5"
                  >
                    Book Now <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="shrink-0 px-3 pb-3 z-30">
              <div className="rounded-[2rem] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-lg px-2 py-2 flex items-center justify-around">
                {[
                  { id: 'home',      icon: Home,        label: 'Home',      dot: false },
                  { id: 'discover',  icon: Compass,     label: 'Discover',  dot: true  },
                  { id: 'book',      icon: ShoppingBag, label: 'Book',      dot: false },
                  { id: 'favorites', icon: Heart,       label: 'Saved',     dot: true  },
                  { id: 'profile',   icon: User,        label: 'Profile',   dot: false },
                ].map(n => {
                  const Active = activeTab === n.id;
                  return (
                    <button
                      key={n.id}
                      onClick={() => navigate(n.id)}
                      className="relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 transition-all duration-300"
                    >
                      <div className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        Active ? 'bg-gradient-to-br from-pink-300 to-rose-400 shadow-md shadow-pink-200 scale-110' : ''
                      }`}>
                        <n.icon style={ICON_18} className={`transition ${Active ? 'text-white' : 'text-gray-400'}`} strokeWidth={Active ? 2.5 : 2} />
                        {n.dot && !Active && (
                          <span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                        )}
                      </div>
                      <span className={`text-[9px] font-semibold transition ${Active ? 'text-pink-500' : 'text-gray-400'}`}>{n.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {drawerOpen && (
              <div
                className="absolute inset-0 z-40 bg-gray-900/30 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setDrawerOpen(false)}
              ></div>
            )}
            <div className={`absolute top-0 bottom-0 left-0 w-72 z-50 transition-transform duration-500 ease-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="h-full bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 rounded-r-[2.5rem] shadow-2xl flex flex-col">
                <div className="px-5 pt-12 pb-4 relative">
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="absolute top-12 right-4 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-gray-700" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-white p-1 shadow-md">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-300 via-rose-400 to-purple-400 flex items-center justify-center text-2xl">💅</div>
                    </div>
                    <div>
                      <p className="font-serif italic text-lg text-gray-900">@khamzat</p>
                      <p className="text-[10.5px] text-gray-500">view your profile →</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 px-3 space-y-1">
                  {[
                    { icon: ShoppingBag,   label: 'My Shopping', sub: '3 in cart' },
                    { icon: User,           label: 'My Profile',  sub: '@khamzat', tab: 'profile' },
                    { icon: MessageCircle,  label: 'Messages',    sub: '2 new ✨' },
                    { icon: Star,           label: 'Reviews',     sub: 'Luxe Nails', tab: 'reviews' },
                    { icon: Settings,       label: 'Settings',    sub: 'preferences' },
                    { icon: Users,          label: 'Community',   sub: '12k members 🩷' },
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={() => item.tab && navigate(item.tab)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/60 transition"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center shadow-sm">
                        <item.icon style={ICON_18} className="text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-semibold text-gray-900">{item.label}</p>
                        <p className="text-[10.5px] text-gray-500">{item.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-4">
                  <div className="rounded-2xl bg-gradient-to-br from-pink-200 via-rose-200 to-purple-200 p-3 relative overflow-hidden">
                    <div className="absolute top-1 right-2 text-xl">✨</div>
                    <p className="font-serif italic text-base text-gray-900">go premium</p>
                    <p className="text-[10.5px] text-gray-700">unlock exclusive looks</p>
                    <button className="mt-2 px-3 py-1.5 rounded-full bg-white text-[10.5px] font-bold text-pink-600 shadow-sm">upgrade →</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`absolute top-20 left-0 right-0 flex justify-center z-50 px-5 transition-all duration-500 ${bookingToast ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}`}>
              <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-2xl px-4 py-3 flex items-center gap-3 max-w-[280px]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-900">booked! ✨</p>
                  <p className="text-[10.5px] text-gray-600">{ARTISTS[selectedArtist].name} · May {selectedDate} at {selectedTime}</p>
                </div>
              </div>
            </div>

            <div className={`absolute top-20 left-0 right-0 flex justify-center z-50 px-5 transition-all duration-500 ${reviewSubmittedToast ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}`}>
              <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-2xl px-4 py-3 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <p className="text-[12px] font-semibold text-gray-900">review posted 🩷</p>
              </div>
            </div>

            {reviewModalOpen && (
              <React.Fragment>
                <div
                  className="absolute inset-0 z-50 bg-gray-900/40 backdrop-blur-sm"
                  onClick={() => setReviewModalOpen(false)}
                ></div>
                <div className="absolute inset-x-0 bottom-0 z-50" style={{ animation: 'slideUp 0.4s ease-out' }}>
                  <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 rounded-t-[2rem] p-5 shadow-2xl">
                    <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif italic text-xl text-gray-900">write a review</h3>
                      <button onClick={() => setReviewModalOpen(false)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                        <X className="w-3.5 h-3.5 text-gray-700" />
                      </button>
                    </div>
                    <p className="text-[11.5px] text-gray-500 mb-4">how was your experience at Luxe Nails? ✨</p>

                    <div className="flex justify-center gap-2 mb-4">
                      {[1,2,3,4,5].map(s => (
                        <button
                          key={s}
                          onClick={() => setReviewRating(s)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-9 h-9 transition-all ${s <= reviewRating ? 'text-amber-400 scale-110' : 'text-gray-200'}`}
                            fill={s <= reviewRating ? 'currentColor' : 'none'}
                          />
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={reviewText}
                      onChange={e => setReviewText(e.target.value)}
                      placeholder="tell us about your nails…"
                      rows={3}
                      className="w-full rounded-2xl bg-white/80 backdrop-blur border border-white/90 p-3 text-[12px] text-gray-800 placeholder:text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
                    ></textarea>

                    <div className="flex gap-2 mt-3">
                      <button className="w-14 h-14 rounded-2xl bg-white/80 border-2 border-dashed border-pink-300 flex items-center justify-center">
                        <Camera className="w-4 h-4 text-pink-400" />
                      </button>
                    </div>

                    <button
                      onClick={handleSubmitReview}
                      disabled={reviewRating === 0}
                      className={`w-full mt-4 py-3.5 rounded-full text-[13px] font-bold shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                        reviewRating === 0
                          ? 'bg-gray-200 text-gray-400'
                          : 'bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-pink-300/50 hover:scale-[1.02]'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" /> post review
                    </button>
                  </div>
                </div>
              </React.Fragment>
            )}

            {/* POST DETAIL OVERLAY — TikTok-style fullscreen */}
            {postDetail && (
              <div className="absolute inset-0 z-[55] bg-black/40 backdrop-blur-sm" onClick={() => setPostDetail(null)}>
                <div
                  className="absolute top-2 left-2 right-2 bottom-2 rounded-[2rem] overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 shadow-2xl flex flex-col"
                  style={{ animation: 'pop 280ms cubic-bezier(.2,.9,.3,1.2)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* hero — clickable for double-tap-like effect */}
                  <button
                    onClick={() => {
                      if (!likedPosts.has(postDetail.id)) toggleLiked(postDetail.id);
                      setDetailHearts(k => k + 1);
                    }}
                    className={`relative h-[58%] w-full bg-gradient-to-br ${postDetail.grad} overflow-hidden block`}
                    aria-label="double-tap to like"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
                    <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-white/40 blur-3xl"></div>
                    <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-white/30 blur-3xl"></div>
                    <SparkleField count={10} density={tweaks.sparkles} />
                    <div className="absolute inset-0 flex items-center justify-center text-[10rem] drop-shadow-2xl">💅</div>
                    <div className="absolute bottom-4 left-4 text-6xl drop-shadow-lg">{postDetail.accent}</div>
                    <HeartShower burstKey={detailHearts} />

                    {/* top chrome */}
                    <div className="absolute top-0 inset-x-0 flex items-center justify-between p-3 z-10">
                      <button
                        onClick={(e) => { e.stopPropagation(); setPostDetail(null); }}
                        aria-label="close look"
                        className="w-10 h-10 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur">
                        <span className="text-base">🔥</span>
                        <span className="text-[11px] font-bold text-white tracking-wide">trending now</span>
                      </div>
                    </div>

                    {/* right rail — reels-style action stack */}
                    <div className="absolute right-3 bottom-4 flex flex-col items-center gap-4 z-10">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLiked(postDetail.id); setDetailHearts(k => k + 1); }}
                        aria-label="like"
                        aria-pressed={likedPosts.has(postDetail.id)}
                        className="flex flex-col items-center gap-1"
                      >
                        <span className={`w-12 h-12 rounded-full backdrop-blur flex items-center justify-center transition-transform ${likedPosts.has(postDetail.id) ? 'bg-pink-500 scale-110' : 'bg-white/80'}`}>
                          <Heart className={`w-5 h-5 ${likedPosts.has(postDetail.id) ? 'text-white' : 'text-pink-500'}`} fill={likedPosts.has(postDetail.id) ? 'currentColor' : 'none'} />
                        </span>
                        <span className="text-[10px] font-bold text-white drop-shadow">{postDetail.likes}</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSaved(postDetail.id); }}
                        aria-label="save"
                        aria-pressed={savedPosts.has(postDetail.id)}
                        className="flex flex-col items-center gap-1"
                      >
                        <span className={`w-12 h-12 rounded-full backdrop-blur flex items-center justify-center transition-transform ${savedPosts.has(postDetail.id) ? 'bg-pink-500 scale-110' : 'bg-white/80'}`}>
                          <Bookmark className={`w-5 h-5 ${savedPosts.has(postDetail.id) ? 'text-white' : 'text-pink-500'}`} fill={savedPosts.has(postDetail.id) ? 'currentColor' : 'none'} />
                        </span>
                        <span className="text-[10px] font-bold text-white drop-shadow">save</span>
                      </button>
                      <button aria-label="share" className="flex flex-col items-center gap-1">
                        <span className="w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                          <Share2 className="w-5 h-5 text-pink-500" />
                        </span>
                        <span className="text-[10px] font-bold text-white drop-shadow">share</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveTab('book'); setPostDetail(null); }}
                        aria-label="book this look"
                        className="flex flex-col items-center gap-1"
                      >
                        <span className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </span>
                        <span className="text-[10px] font-bold text-white drop-shadow">book</span>
                      </button>
                    </div>
                  </button>

                  {/* lower sheet — caption + comments */}
                  <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${postDetail.grad} ring-2 ring-white shadow-md`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-900 truncate">{postDetail.user}</p>
                        <p className="text-[10.5px] text-gray-500">nail artist · sf</p>
                      </div>
                      <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white text-[11px] font-bold shadow-md shadow-pink-300/50">+ follow</button>
                    </div>
                    <p className="mt-3 text-[13px] text-gray-800 leading-snug">{postDetail.caption}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {['#chromenails', '#y2knails', '#nailart'].map(t => (
                        <span key={t} className="text-[10.5px] font-semibold text-pink-500">{t}</span>
                      ))}
                    </div>

                    <h4 className="mt-4 mb-2 font-serif italic text-base text-gray-900">comments ({COMMENTS.length})</h4>
                    <div className="space-y-2.5">
                      {COMMENTS.map((c, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${c.grad} shrink-0 border border-white shadow-sm`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11.5px]">
                              <span className="font-bold text-gray-900">{c.user}</span>
                              <span className="text-gray-400 ml-1.5">{c.time}</span>
                            </p>
                            <p className="text-[12px] text-gray-700 leading-snug">{c.text}</p>
                          </div>
                          <button aria-label="like comment" className="text-gray-300 hover:text-pink-500 transition">
                            <Heart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <input
                        placeholder="add a comment…"
                        aria-label="add a comment"
                        className="flex-1 px-4 py-2.5 rounded-full bg-white/80 border border-white/90 text-[12px] placeholder:text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                      <button aria-label="send comment" className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-md">
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STORY OVERLAY */}
            {storyOpen !== null && (
              <div className="absolute inset-0 z-[58] bg-black flex items-center justify-center" onClick={() => setStoryOpen(null)}>
                <div className={`absolute inset-0 bg-gradient-to-br ${STORIES[storyOpen].grad}`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
                  <SparkleField count={14} density="extra" />
                </div>
                {/* progress bars */}
                <div className="absolute top-3 inset-x-3 flex gap-1 z-10">
                  {STORIES.map((_, i) => (
                    <div key={i} className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
                      <div className="h-full bg-white" style={{ width: i < storyOpen ? '100%' : i === storyOpen ? (storyProgress * 100) + '%' : '0%' }}></div>
                    </div>
                  ))}
                </div>
                {/* header */}
                <div className="absolute top-7 inset-x-4 flex items-center gap-2 z-10">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${STORIES[storyOpen].grad} ring-2 ring-white shadow-md flex items-center justify-center text-lg`}>{STORIES[storyOpen].emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-white drop-shadow truncate">{STORIES[storyOpen].user}</p>
                    <p className="text-[10px] text-white/80">just now</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setStoryOpen(null); }} aria-label="close story" className="w-9 h-9 rounded-full bg-black/30 flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
                {/* big nail */}
                <div className="relative text-[12rem] drop-shadow-2xl" style={{ animation: 'pop 400ms ease-out' }}>💅</div>
                {/* caption */}
                <div className="absolute bottom-20 inset-x-6 z-10">
                  <p className="font-serif italic text-2xl text-white drop-shadow text-center leading-tight">{
                    [
                      'chrome era forever ✨',
                      'soft girl autumn 🤍',
                      'bows are back 🎀',
                      'cherry red gloss 🍒',
                      'aura supremacy 💫',
                      'milky lavender mood 🦋',
                      'glitter french tip ✨',
                      'peachy soft 🍑',
                    ][storyOpen] || 'nail era ✨'
                  }</p>
                </div>
                {/* reply */}
                <div className="absolute bottom-5 inset-x-4 flex items-center gap-2 z-10">
                  <input
                    placeholder={`reply to ${STORIES[storyOpen].user}…`}
                    aria-label="reply to story"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 px-4 py-3 rounded-full bg-white/20 border border-white/40 text-[12px] text-white placeholder:text-white/70 focus:outline-none focus:bg-white/30"
                  />
                  <button onClick={(e) => { e.stopPropagation(); toggleLiked(0); }} aria-label="heart story" className="w-11 h-11 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* TWEAKS PANEL */}
            {tweaksOpen && (
              <div className="absolute bottom-24 right-3 z-[70] w-60 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white p-4" style={{ animation: 'pop 220ms ease-out' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif italic text-base text-gray-900">Tweaks</h3>
                  <button
                    onClick={() => {
                      setTweaksOpen(false);
                      try { window.parent?.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch {}
                    }}
                    aria-label="close tweaks"
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>

                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">motion</p>
                <div className="flex gap-1 p-0.5 rounded-full bg-gray-100 mb-3">
                  {['on', 'off'].map(v => (
                    <button
                      key={v}
                      onClick={() => setTweak({ motion: v })}
                      className={`flex-1 py-1.5 rounded-full text-[11px] font-semibold transition ${tweaks.motion === v ? 'bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow' : 'text-gray-500'}`}
                    >{v === 'on' ? 'on ✨' : 'reduced'}</button>
                  ))}
                </div>

                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1.5">sparkles</p>
                <div className="flex gap-1 p-0.5 rounded-full bg-gray-100">
                  {[['chill', 'chill'], ['cute', 'cute'], ['extra', 'extra ✨']].map(([v, label]) => (
                    <button
                      key={v}
                      onClick={() => setTweak({ sparkles: v })}
                      className={`flex-1 py-1.5 rounded-full text-[10.5px] font-semibold transition ${tweaks.sparkles === v ? 'bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow' : 'text-gray-500'}`}
                    >{label}</button>
                  ))}
                </div>

                <p className="mt-3 text-[10px] text-gray-400 text-center">toggle Tweaks again to hide</p>
              </div>
            )}

            {!splashHidden && (
              <div className={`absolute inset-0 z-[60] bg-gradient-to-br from-pink-200 via-rose-200 to-purple-300 flex items-center justify-center transition-opacity duration-700 ${splashVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/40 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-pink-300/40 blur-3xl"></div>
                <div className="relative text-center">
                  <div className="text-6xl mb-3 animate-bounce">💅</div>
                  <h1 className="font-serif italic text-5xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent font-bold tracking-tight">
                    Nail Palette
                  </h1>
                  <p className="mt-2 text-[12px] text-gray-700 tracking-widest uppercase font-semibold">your nail era ✨</p>
                  <div className="flex justify-center gap-1 mt-6">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-white/80 animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<NailPalette />);
