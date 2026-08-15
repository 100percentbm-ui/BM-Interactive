const STORAGE_KEY = 'droidTycoonSessionLog';
const USERNAME_KEY = 'droidTycoonUsername';
const MANUAL_TOTALS_KEY = 'droidTycoonManualTotals';
const SHARE_TOGGLES_KEY = 'droidTycoonShareToggles';
const STAT_ORDER_KEY = 'droidTycoonStatOrder';
const THEME_KEY = 'droidTycoonTheme';
const GOALS_KEY = 'droidTycoonGoals';

function loadEntries() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function loadUsername() {
  return localStorage.getItem(USERNAME_KEY) || '';
}

function saveUsername(name) {
  localStorage.setItem(USERNAME_KEY, name);
}

function loadManualTotals() {
  const raw = JSON.parse(localStorage.getItem(MANUAL_TOTALS_KEY) || '{}');
  return {
    credits: raw.credits || 0,
    chips: raw.chips || 0,
    crystals: raw.crystals || 0,
    rebirths: raw.rebirths || 0,
    superRebirths: raw.superRebirths || 0,
    craftedForDroids: raw.craftedForDroids || 0,
  };
}

function saveManualTotals(totals) {
  localStorage.setItem(MANUAL_TOTALS_KEY, JSON.stringify(totals));
}

function loadShareToggles() {
  return JSON.parse(localStorage.getItem(SHARE_TOGGLES_KEY) || '{}');
}

function saveShareToggles(toggles) {
  localStorage.setItem(SHARE_TOGGLES_KEY, JSON.stringify(toggles));
}

function loadStatOrder() {
  const raw = JSON.parse(localStorage.getItem(STAT_ORDER_KEY) || '[]');
  return Array.isArray(raw) ? raw : [];
}

function saveStatOrder(order) {
  localStorage.setItem(STAT_ORDER_KEY, JSON.stringify(order));
}

function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

function wireThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const sync = () => {
    const theme = loadTheme();
    btn.textContent = theme === 'dark' ? '☀' : '☽';
    btn.title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  };
  sync();
  btn.addEventListener('click', () => {
    const next = loadTheme() === 'dark' ? 'light' : 'dark';
    saveTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    sync();
  });
}

function loadGoals() {
  const raw = JSON.parse(localStorage.getItem(GOALS_KEY) || '[]');
  return Array.isArray(raw) ? raw : [];
}

function saveGoals(goals) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

const VARIANTS = ['Default', 'Gold', 'Diamond', 'Rainbow', 'Beskar', 'Galactic'];

const RARITY_ORDER = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Iconic'];

const DROID_LIST = [
  // Common
  { name: 'Mouse', class: 'Worker', rarity: 'Common' },
  { name: 'Pit', class: 'Worker', rarity: 'Common' },
  { name: 'Gonk', class: 'Worker', rarity: 'Common' },
  { name: 'CB', class: 'Astromech', rarity: 'Common' },
  { name: 'R3', class: 'Astromech', rarity: 'Common' },
  { name: 'R5', class: 'Astromech', rarity: 'Common' },
  { name: 'R8', class: 'Astromech', rarity: 'Common' },
  { name: 'Imperial Probe', class: 'Battle', rarity: 'Common' },
  { name: 'B1 Battle', class: 'Battle', rarity: 'Common' },
  { name: 'DRK-1 Probe', class: 'Battle', rarity: 'Common' },
  { name: 'ID10', class: 'Battle', rarity: 'Common' },
  // Rare
  { name: 'BDX Explorer', class: 'Worker', rarity: 'Rare' },
  { name: 'ARG', class: 'Worker', rarity: 'Rare' },
  { name: 'Senate Hovercam', class: 'Worker', rarity: 'Rare' },
  { name: 'BU-4D', class: 'Worker', rarity: 'Rare' },
  { name: 'Bal-Core', class: 'Worker', rarity: 'Rare' },
  { name: 'ROLL-R', class: 'Worker', rarity: 'Rare' },
  { name: '2BB', class: 'Astromech', rarity: 'Rare' },
  { name: 'A-LT', class: 'Astromech', rarity: 'Rare' },
  { name: 'R4', class: 'Astromech', rarity: 'Rare' },
  { name: 'R9', class: 'Astromech', rarity: 'Rare' },
  { name: 'B1 Security', class: 'Battle', rarity: 'Rare' },
  { name: 'NAV-EX', class: 'Battle', rarity: 'Rare' },
  { name: 'VECT-Arm', class: 'Battle', rarity: 'Rare' },
  { name: 'HOV-R', class: 'Battle', rarity: 'Rare' },
  // Epic
  { name: 'Groundmech', class: 'Worker', rarity: 'Epic' },
  { name: 'LO', class: 'Worker', rarity: 'Epic' },
  { name: 'AMP Walker', class: 'Worker', rarity: 'Epic' },
  { name: 'SEN-TRI', class: 'Worker', rarity: 'Epic' },
  { name: 'Opti-Pod', class: 'Worker', rarity: 'Epic' },
  { name: 'BB', class: 'Astromech', rarity: 'Epic' },
  { name: 'R2', class: 'Astromech', rarity: 'Epic' },
  { name: 'R6', class: 'Astromech', rarity: 'Epic' },
  { name: 'TRAK-R', class: 'Astromech', rarity: 'Epic' },
  { name: 'ORB-Walker', class: 'Astromech', rarity: 'Epic' },
  { name: 'Util-Tec', class: 'Astromech', rarity: 'Epic' },
  { name: 'B1 Heavy', class: 'Battle', rarity: 'Epic' },
  { name: 'B2 Super', class: 'Battle', rarity: 'Epic' },
  { name: 'B2 Heavy', class: 'Battle', rarity: 'Epic' },
  { name: 'Strike-Orb', class: 'Battle', rarity: 'Epic' },
  { name: 'Haul-R', class: 'Battle', rarity: 'Epic' },
  { name: 'LNG-Shot', class: 'Battle', rarity: 'Epic' },
  { name: 'Proto-Roller', class: 'Battle', rarity: 'Epic' },
  // Legendary
  { name: 'Mecha-Droid', class: 'Worker', rarity: 'Legendary' },
  { name: 'Mono-WLKR', class: 'Worker', rarity: 'Legendary' },
  { name: 'BB9', class: 'Astromech', rarity: 'Legendary' },
  { name: 'R7', class: 'Astromech', rarity: 'Legendary' },
  { name: 'B2-RP', class: 'Battle', rarity: 'Legendary' },
  { name: 'Cyclo-Grav', class: 'Battle', rarity: 'Legendary' },
  { name: 'Opti-STRK', class: 'Battle', rarity: 'Legendary' },
  // Mythic
  { name: 'Snow Mouse', class: 'Worker', rarity: 'Mythic' },
  { name: 'RIC', class: 'Iconic', rarity: 'Mythic' },
  { name: 'LOADLIFTER', class: 'Iconic', rarity: 'Mythic' },
  { name: 'LEP', class: 'Iconic', rarity: 'Mythic' },
  { name: 'RIC-1200', class: 'Iconic', rarity: 'Mythic' },
  { name: 'DRFT-R', class: 'Iconic', rarity: 'Mythic' },
  { name: 'CYCLENS', class: 'Iconic', rarity: 'Mythic' },
  { name: 'MO-TRAK', class: 'Iconic', rarity: 'Mythic' },
  { name: 'TRI-TEK', class: 'Iconic', rarity: 'Mythic' },
  { name: 'IG', class: 'Iconic', rarity: 'Mythic' },
  { name: 'KX', class: 'Iconic', rarity: 'Mythic' },
  // Iconic (event-only droids)
  { name: 'BB-8', class: 'Astromech', rarity: 'Iconic' },
  { name: 'Mister Bones', class: 'Iconic', rarity: 'Iconic' },
  { name: 'IG-11 Marshal', class: 'Iconic', rarity: 'Iconic' },
  { name: 'DJ-R3X', class: 'Iconic', rarity: 'Iconic' },
  { name: 'CB-23', class: 'Iconic', rarity: 'Iconic' },
  { name: 'R2-D2', class: 'Iconic', rarity: 'Iconic' },
  { name: 'C-3PO', class: 'Iconic', rarity: 'Iconic' },
  { name: 'Chopper', class: 'Iconic', rarity: 'Iconic' },
];
const DROID_MAP = Object.fromEntries(DROID_LIST.map(d => [d.name, d]));

const METRICS = [
  { id: 'totalCredits', label: 'Total Credits', get: (t, m) => t.totalCredits },
  { id: 'totalCrystals', label: 'Total Nova Crystals', get: (t, m) => t.totalCrystals },
  { id: 'totalChips', label: 'Total Chips', get: (t, m) => t.totalChips },
  { id: 'totalCrafted', label: 'Droids Crafted', get: (t, m) => t.totalCrafted },
  { id: 'totalSold', label: 'Droids Sold', get: (t, m) => t.totalSold },
  { id: 'netDroids', label: 'Net Droids Held', get: (t, m) => t.totalCrafted - t.totalSold },
  { id: 'totalRebirths', label: 'Total Rebirths', get: (t, m) => t.totalRebirths },
  { id: 'totalSuperRebirths', label: 'Total Super Rebirths', get: (t, m) => t.totalSuperRebirths },
  { id: 'totalPlaytimeMin', label: 'Total Playtime (minutes)', get: (t, m) => t.totalPlaytime },
  { id: 'sessions', label: 'Sessions Logged', get: (t, m) => t.sessions },
  { id: 'currentCredits', label: 'Current Credits (manual)', get: (t, m) => m.credits },
  { id: 'currentChips', label: 'Current Chips (manual)', get: (t, m) => m.chips },
  { id: 'currentCrystals', label: 'Current Nova Crystals (manual)', get: (t, m) => m.crystals },
  { id: 'currentRebirths', label: 'Current Rebirths (manual)', get: (t, m) => m.rebirths },
  { id: 'currentSuperRebirths', label: 'Current Super Rebirths (manual)', get: (t, m) => m.superRebirths },
  { id: 'craftedForDroids', label: 'Total Crafted (manual)', get: (t, m) => m.craftedForDroids },
];
const METRIC_MAP = Object.fromEntries(METRICS.map(m => [m.id, m]));

function computeStreak(entries) {
  const dates = [...new Set(entries.map(e => e.date).filter(Boolean))].sort();
  if (!dates.length) return { current: 0, longest: 0 };
  const dayMs = 86400000;
  let longest = 1, run = 1;
  for (let i = 1; i < dates.length; i++) {
    const gap = Math.round((new Date(dates[i]) - new Date(dates[i - 1])) / dayMs);
    run = gap === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }
  const lastDate = dates[dates.length - 1];
  const gapToToday = Math.round((new Date(todayStr()) - new Date(lastDate)) / dayMs);
  let current = 0;
  if (gapToToday <= 1) {
    current = 1;
    for (let i = dates.length - 1; i > 0; i--) {
      const gap = Math.round((new Date(dates[i]) - new Date(dates[i - 1])) / dayMs);
      if (gap === 1) current += 1; else break;
    }
  }
  return { current, longest };
}

function computeRarityBreakdown(entries) {
  const byRarity = {};
  entries.forEach(e => {
    if (!e.droidRarity) return;
    if (!byRarity[e.droidRarity]) byRarity[e.droidRarity] = { rarity: e.droidRarity, crafted: 0, sold: 0 };
    byRarity[e.droidRarity].crafted += e.crafted || 0;
    byRarity[e.droidRarity].sold += e.sold || 0;
  });
  return Object.values(byRarity)
    .map(r => ({ ...r, net: r.crafted - r.sold }))
    .sort((a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity));
}

function computeVariantBreakdown(entries) {
  const byVariant = {};
  entries.forEach(e => {
    if (!e.variant) return;
    if (!byVariant[e.variant]) byVariant[e.variant] = { variant: e.variant, crafted: 0, sold: 0 };
    byVariant[e.variant].crafted += e.crafted || 0;
    byVariant[e.variant].sold += e.sold || 0;
  });
  return Object.values(byVariant)
    .map(r => ({ ...r, net: r.crafted - r.sold }))
    .sort((a, b) => VARIANTS.indexOf(a.variant) - VARIANTS.indexOf(b.variant));
}

function computePersonalBests(entries) {
  const pick = (fn) => entries.reduce((b, e) => fn(e) > (b ? fn(b) : -Infinity) ? e : b, null);
  return {
    bestCredits: pick(e => e.credits || 0),
    bestRate: pick(e => computeRate(e)),
    bestCrafted: pick(e => e.crafted || 0),
    bestPlaytime: pick(e => e.playtime || 0),
  };
}

const ACHIEVEMENTS = [
  { id: 'first-session', label: 'First Steps', desc: 'Log your first session', check: c => c.totals.sessions >= 1 },
  { id: 'ten-sessions', label: 'Regular', desc: 'Log 10 sessions', check: c => c.totals.sessions >= 10 },
  { id: 'fifty-sessions', label: 'Dedicated', desc: 'Log 50 sessions', check: c => c.totals.sessions >= 50 },
  { id: 'crafted-100', label: 'Droid Builder', desc: 'Craft 100 droids', check: c => c.totals.totalCrafted >= 100 },
  { id: 'crafted-1000', label: 'Droid Factory', desc: 'Craft 1,000 droids', check: c => c.totals.totalCrafted >= 1000 },
  { id: 'sold-1000', label: 'Droid Dealer', desc: 'Sell 1,000 droids', check: c => c.totals.totalSold >= 1000 },
  { id: 'credits-1m', label: 'Credits Millionaire', desc: 'Earn 1,000,000 total credits', check: c => c.totals.totalCredits >= 1e6 },
  { id: 'credits-1b', label: 'Credits Billionaire', desc: 'Earn 1,000,000,000 total credits', check: c => c.totals.totalCredits >= 1e9 },
  { id: 'first-rebirth', label: 'Reborn', desc: 'Log your first rebirth', check: c => c.totals.totalRebirths >= 1 },
  { id: 'first-super-rebirth', label: 'Ascended', desc: 'Log your first super rebirth', check: c => c.totals.totalSuperRebirths >= 1 },
  { id: 'streak-3', label: 'On a Roll', desc: '3-day logging streak', check: c => c.streak.longest >= 3 },
  { id: 'streak-7', label: 'Week Warrior', desc: '7-day logging streak', check: c => c.streak.longest >= 7 },
  { id: 'playtime-24h', label: 'Day One', desc: 'Log 24 hours of total playtime', check: c => c.totals.totalPlaytime >= 1440 },
];

function computeAchievements(ctx) {
  return ACHIEVEMENTS.map(a => ({ ...a, unlocked: a.check(ctx) }));
}

function computeRate(e) {
  return e.playtime > 0 ? e.credits / e.playtime : 0;
}

function fmt(n) {
  if (n === null || n === undefined || isNaN(n)) return '-';
  const num = Number(n);
  const abs = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  if (abs >= 1e12) return sign + (abs / 1e12).toFixed(2) + 'T';
  if (abs >= 1e9) return sign + (abs / 1e9).toFixed(2) + 'B';
  if (abs >= 1e6) return sign + (abs / 1e6).toFixed(2) + 'M';
  if (abs >= 1e3) return sign + (abs / 1e3).toFixed(2) + 'K';
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatDuration(totalMinutes) {
  if (totalMinutes === null || totalMinutes === undefined || isNaN(totalMinutes)) return '-';
  const totalSeconds = Math.round(totalMinutes * 60);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const parts = [];
  if (d) parts.push(d + 'd');
  if (h) parts.push(h + 'h');
  if (m) parts.push(m + 'm');
  if (s || parts.length === 0) parts.push(s + 's');
  return parts.join(' ');
}

function parseDuration(str) {
  if (str === null || str === undefined) return 0;
  str = String(str).trim();
  if (str === '') return 0;
  if (/^\d+(\.\d+)?$/.test(str)) return parseFloat(str);
  const regex = /(\d+(?:\.\d+)?)\s*(d|h|m|s)/gi;
  let match;
  let totalMinutes = 0;
  let matched = false;
  while ((match = regex.exec(str)) !== null) {
    matched = true;
    const val = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (unit === 'd') totalMinutes += val * 1440;
    else if (unit === 'h') totalMinutes += val * 60;
    else if (unit === 'm') totalMinutes += val;
    else if (unit === 's') totalMinutes += val / 60;
  }
  return matched ? totalMinutes : NaN;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function nowTimeStr() {
  const d = new Date();
  return d.toTimeString().slice(0, 5);
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function computeTotals(entries) {
  const sessions = entries.length;
  const totalPlaytime = entries.reduce((s, e) => s + (e.playtime || 0), 0);
  const totalCredits = entries.reduce((s, e) => s + (e.credits || 0), 0);
  const totalCrystals = entries.reduce((s, e) => s + (e.crystals || 0), 0);
  const totalChips = entries.reduce((s, e) => s + (e.chips || 0), 0);
  const totalCrafted = entries.reduce((s, e) => s + (e.crafted || 0), 0);
  const totalSold = entries.reduce((s, e) => s + (e.sold || 0), 0);
  const totalRebirths = entries.reduce((s, e) => s + (e.rebirths || 0), 0);
  const totalSuperRebirths = entries.reduce((s, e) => s + (e.superRebirths || 0), 0);
  const avgRate = totalPlaytime > 0 ? totalCredits / totalPlaytime : 0;

  const best = entries.reduce((b, e) => computeRate(e) > (b ? computeRate(b) : -1) ? e : b, null);

  const craftedByRarity = {};
  entries.forEach(e => {
    if (e.droidRarity && e.crafted) {
      craftedByRarity[e.droidRarity] = (craftedByRarity[e.droidRarity] || 0) + e.crafted;
    }
  });
  let topRarity = '-';
  let topRarityCount = -1;
  Object.entries(craftedByRarity).forEach(([rarity, count]) => {
    if (count > topRarityCount) { topRarity = rarity; topRarityCount = count; }
  });

  const timestamps = entries
    .map(e => e.date)
    .filter(Boolean)
    .sort();
  const firstDate = timestamps.length ? timestamps[0] : null;
  const lastDate = timestamps.length ? timestamps[timestamps.length - 1] : null;

  return {
    sessions, totalPlaytime, totalCredits, totalCrystals, totalChips, totalCrafted, totalSold,
    totalRebirths, totalSuperRebirths,
    avgRate, best, topRarity, topRarityCount, firstDate, lastDate,
  };
}

function sortedByTimestamp(entries) {
  return [...entries].sort((a, b) => {
    const ta = `${a.date || ''}T${a.time || '00:00'}`;
    const tb = `${b.date || ''}T${b.time || '00:00'}`;
    return ta.localeCompare(tb);
  });
}
