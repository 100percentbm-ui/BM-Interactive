const STORAGE_KEY = 'droidTycoonSessionLog';
const USERNAME_KEY = 'droidTycoonUsername';
const MANUAL_TOTALS_KEY = 'droidTycoonManualTotals';
const SHARE_TOGGLES_KEY = 'droidTycoonShareToggles';
const STAT_ORDER_KEY = 'droidTycoonStatOrder';

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

  const craftedByType = {};
  entries.forEach(e => {
    if (e.droidType && e.crafted) {
      craftedByType[e.droidType] = (craftedByType[e.droidType] || 0) + e.crafted;
    }
  });
  let topDroidType = '-';
  let topDroidCount = -1;
  Object.entries(craftedByType).forEach(([type, count]) => {
    if (count > topDroidCount) { topDroidType = type; topDroidCount = count; }
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
    avgRate, best, topDroidType, topDroidCount, firstDate, lastDate,
  };
}

function sortedByTimestamp(entries) {
  return [...entries].sort((a, b) => {
    const ta = `${a.date || ''}T${a.time || '00:00'}`;
    const tb = `${b.date || ''}T${b.time || '00:00'}`;
    return ta.localeCompare(tb);
  });
}
