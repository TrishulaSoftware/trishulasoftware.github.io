// TRISHULA SOFTWARE — SOVEREIGN INTERACTIVE TERMINAL ENGINE
// Trishula Architecture Labs — Autonomous Telemetry Core

document.addEventListener('DOMContentLoaded', () => {
  initLiveTelemetry();
  initTerminalTabs();
  initEvTable();
  initApiPlayground();
  initConsultationModal();
});

// 1. LIVE TELEMETRY TICKER
let currentBlock = 119982420;
let currentGas = 0.05;
let currentIngestion = 12480;

function initLiveTelemetry() {
  const blockEl = document.getElementById('live-block');
  const gasEl = document.getElementById('live-gas');
  const ingestionEl = document.getElementById('live-ingestion');

  setInterval(() => {
    currentBlock += Math.floor(Math.random() * 2) + 1;
    currentGas = (0.048 + Math.random() * 0.005).toFixed(3);
    currentIngestion = 12450 + Math.floor(Math.random() * 80);

    if (blockEl) blockEl.textContent = '#' + currentBlock.toLocaleString();
    if (gasEl) gasEl.textContent = currentGas + ' Gwei';
    if (ingestionEl) ingestionEl.textContent = currentIngestion.toLocaleString() + ' pts/sec';
  }, 3000);
}

// 2. TERMINAL TABS
function initTerminalTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.terminal-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active', 'border-cyan-400', 'text-cyan-300'));
      btn.classList.add('active', 'border-cyan-400', 'text-cyan-300');

      tabPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
      if (window.lucide) window.lucide.createIcons();
    });
  });
}

// 3. MULTI-SPORT +EV DATA & 24H DETERMINISTIC DAILY CYCLE ENGINE
const MASTER_PROP_POOLS = {
  NFL: [
    { sport: 'NFL', player: 'Lamar Jackson', team: 'BAL vs KC', prop: 'Over 48.5 Rush Yds', bookOdds: '+108', fairOdds: '-118', ev: '+11.4%', conf: '94%', action: 'HIGH VALUE' },
    { sport: 'NFL', player: 'CeeDee Lamb', team: 'DAL vs CLE', prop: 'Over 7.5 Receptions', bookOdds: '+120', fairOdds: '+102', ev: '+8.9%', conf: '89%', action: 'DISCREPANCY' },
    { sport: 'NFL', player: 'Patrick Mahomes', team: 'KC vs BAL', prop: 'Over 268.5 Pass Yds', bookOdds: '-105', fairOdds: '-128', ev: '+9.2%', conf: '91%', action: 'SHARP EDGE' },
    { sport: 'NFL', player: 'Christian McCaffrey', team: 'SF vs NYJ', prop: 'Over 72.5 Rush Yds', bookOdds: '-112', fairOdds: '-136', ev: '+10.5%', conf: '93%', action: 'SHARP EDGE' },
    { sport: 'NFL', player: 'Justin Jefferson', team: 'MIN at NYG', prop: 'Over 84.5 Rec Yds', bookOdds: '+100', fairOdds: '-116', ev: '+7.8%', conf: '88%', action: 'HIGH VALUE' },
    { sport: 'NFL', player: 'Josh Allen', team: 'BUF vs ARI', prop: 'Over 1.5 Passing TDs', bookOdds: '-125', fairOdds: '-155', ev: '+11.1%', conf: '95%', action: 'SHARP EDGE' },
    { sport: 'NFL', player: 'Derrick Henry', team: 'BAL vs KC', prop: 'Anytime Touchdown', bookOdds: '-110', fairOdds: '-140', ev: '+12.6%', conf: '96%', action: 'SHARP EDGE' },
    { sport: 'NFL', player: 'Amon-Ra St. Brown', team: 'DET vs LAR', prop: 'Over 6.5 Receptions', bookOdds: '-115', fairOdds: '-135', ev: '+8.4%', conf: '90%', action: 'HIGH VALUE' },
    { sport: 'NFL', player: 'Tyreek Hill', team: 'MIA vs JAX', prop: 'Over 88.5 Rec Yds', bookOdds: '+105', fairOdds: '-115', ev: '+9.5%', conf: '92%', action: 'HIGH VALUE' },
    { sport: 'NFL', player: 'Breece Hall', team: 'NYJ at SF', prop: 'Over 28.5 Rec Yds', bookOdds: '-110', fairOdds: '-132', ev: '+9.8%', conf: '91%', action: 'SHARP EDGE' },
    { sport: 'NFL', player: 'C.J. Stroud', team: 'HOU at IND', prop: 'Over 264.5 Pass Yds', bookOdds: '-110', fairOdds: '-126', ev: '+7.5%', conf: '87%', action: 'DISCREPANCY' },
    { sport: 'NFL', player: 'Jahmyr Gibbs', team: 'DET vs LAR', prop: 'Over 44.5 Rush Yds', bookOdds: '-115', fairOdds: '-138', ev: '+10.1%', conf: '93%', action: 'HIGH VALUE' },
    { sport: 'NFL', player: "Ja'Marr Chase", team: 'CIN vs NE', prop: 'Over 76.5 Rec Yds', bookOdds: '+102', fairOdds: '-118', ev: '+9.0%', conf: '90%', action: 'HIGH VALUE' },
    { sport: 'NFL', player: 'Saquon Barkley', team: 'PHI vs GB', prop: 'Over 66.5 Rush Yds', bookOdds: '-108', fairOdds: '-128', ev: '+8.8%', conf: '89%', action: 'DISCREPANCY' }
  ],
  CFB: [
    { sport: 'CFB', player: 'Carson Beck', team: 'UGA vs CLEM', prop: 'Over 275.5 Pass Yds', bookOdds: '+110', fairOdds: '-105', ev: '+9.8%', conf: '91%', action: 'HIGH VALUE' },
    { sport: 'CFB', player: 'Travis Hunter', team: 'COL vs NDSU', prop: 'Over 82.5 Rec Yds', bookOdds: '-110', fairOdds: '-135', ev: '+12.1%', conf: '96%', action: 'SHARP EDGE' },
    { sport: 'CFB', player: 'Quinn Ewers', team: 'TEX vs MICH', prop: 'Over 248.5 Pass Yds', bookOdds: '-115', fairOdds: '-138', ev: '+10.2%', conf: '93%', action: 'SHARP EDGE' },
    { sport: 'CFB', player: 'Shedeur Sanders', team: 'COL vs NDSU', prop: 'Over 310.5 Pass Yds', bookOdds: '+105', fairOdds: '-115', ev: '+9.4%', conf: '90%', action: 'HIGH VALUE' },
    { sport: 'CFB', player: 'Dillon Gabriel', team: 'ORE vs BOISE', prop: 'Over 2.5 Passing TDs', bookOdds: '+120', fairOdds: '+101', ev: '+9.1%', conf: '89%', action: 'DISCREPANCY' },
    { sport: 'CFB', player: 'Ollie Gordon II', team: 'OKST vs SDSU', prop: 'Over 118.5 Rush Yds', bookOdds: '-110', fairOdds: '-135', ev: '+11.8%', conf: '95%', action: 'SHARP EDGE' },
    { sport: 'CFB', player: 'Jaxson Dart', team: 'MISS vs FUR', prop: 'Over 288.5 Pass Yds', bookOdds: '-112', fairOdds: '-130', ev: '+8.1%', conf: '88%', action: 'HIGH VALUE' },
    { sport: 'CFB', player: 'Tetairoa McMillan', team: 'ARIZ vs UNM', prop: 'Over 94.5 Rec Yds', bookOdds: '+105', fairOdds: '-120', ev: '+11.2%', conf: '94%', action: 'SHARP EDGE' },
    { sport: 'CFB', player: 'Jalen Milroe', team: 'ALA vs WKU', prop: 'Over 42.5 Rush Yds', bookOdds: '-110', fairOdds: '-134', ev: '+10.5%', conf: '92%', action: 'SHARP EDGE' },
    { sport: 'CFB', player: 'Nico Iamaleava', team: 'TENN vs UTC', prop: 'Over 235.5 Pass Yds', bookOdds: '-115', fairOdds: '-132', ev: '+7.6%', conf: '88%', action: 'DISCREPANCY' },
    { sport: 'CFB', player: 'Luther Burden III', team: 'MIZ vs MURR', prop: 'Over 78.5 Rec Yds', bookOdds: '-108', fairOdds: '-130', ev: '+10.0%', conf: '92%', action: 'HIGH VALUE' },
    { sport: 'CFB', player: 'Cam Ward', team: 'MIA at FLA', prop: 'Over 262.5 Pass Yds', bookOdds: '+110', fairOdds: '-110', ev: '+9.5%', conf: '91%', action: 'HIGH VALUE' },
    { sport: 'CFB', player: 'Will Howard', team: 'OSU vs AKR', prop: 'Over 2.5 Passing TDs', bookOdds: '+115', fairOdds: '-105', ev: '+9.7%', conf: '90%', action: 'HIGH VALUE' },
    { sport: 'CFB', player: 'TreVeyon Henderson', team: 'OSU vs AKR', prop: 'Over 74.5 Rush Yds', bookOdds: '-112', fairOdds: '-135', ev: '+10.8%', conf: '93%', action: 'SHARP EDGE' }
  ],
  MLB: [
    { sport: 'MLB', player: 'Shohei Ohtani', team: 'LAD at ARI', prop: 'Over 1.5 Total Bases', bookOdds: '-115', fairOdds: '-142', ev: '+12.8%', conf: '95%', action: 'SHARP EDGE' },
    { sport: 'MLB', player: 'Tarik Skubal', team: 'DET vs BOS', prop: 'Over 7.5 Strikeouts', bookOdds: '+115', fairOdds: '-102', ev: '+10.4%', conf: '90%', action: 'HIGH VALUE' },
    { sport: 'MLB', player: 'Aaron Judge', team: 'NYY at TEX', prop: 'Over 0.5 Home Runs', bookOdds: '+220', fairOdds: '+175', ev: '+13.5%', conf: '94%', action: 'SHARP EDGE' },
    { sport: 'MLB', player: 'Zack Wheeler', team: 'PHI vs ATL', prop: 'Over 6.5 Strikeouts', bookOdds: '-110', fairOdds: '-135', ev: '+11.2%', conf: '94%', action: 'SHARP EDGE' },
    { sport: 'MLB', player: 'Bobby Witt Jr.', team: 'KC vs CLE', prop: 'Over 1.5 Total Bases', bookOdds: '-120', fairOdds: '-148', ev: '+11.6%', conf: '95%', action: 'SHARP EDGE' },
    { sport: 'MLB', player: 'Paul Skenes', team: 'PIT at CHC', prop: 'Over 7.5 Strikeouts', bookOdds: '-105', fairOdds: '-130', ev: '+11.0%', conf: '93%', action: 'SHARP EDGE' },
    { sport: 'MLB', player: 'Gunnar Henderson', team: 'BAL vs CWS', prop: 'Over 1.5 Total Bases', bookOdds: '-110', fairOdds: '-130', ev: '+8.7%', conf: '89%', action: 'DISCREPANCY' },
    { sport: 'MLB', player: 'Chris Sale', team: 'ATL at PHI', prop: 'Over 7.5 Strikeouts', bookOdds: '+110', fairOdds: '-110', ev: '+9.5%', conf: '91%', action: 'HIGH VALUE' },
    { sport: 'MLB', player: 'Juan Soto', team: 'NYY at TEX', prop: 'Over 0.5 Bases on Balls', bookOdds: '-125', fairOdds: '-160', ev: '+12.4%', conf: '96%', action: 'SHARP EDGE' },
    { sport: 'MLB', player: 'Corbin Burnes', team: 'BAL vs CWS', prop: 'Over 6.5 Strikeouts', bookOdds: '-115', fairOdds: '-140', ev: '+10.8%', conf: '92%', action: 'HIGH VALUE' },
    { sport: 'MLB', player: 'Bryce Harper', team: 'PHI vs ATL', prop: 'Over 1.5 Total Bases', bookOdds: '-110', fairOdds: '-132', ev: '+9.8%', conf: '91%', action: 'HIGH VALUE' },
    { sport: 'MLB', player: 'Dylan Cease', team: 'SD vs SF', prop: 'Over 7.5 Strikeouts', bookOdds: '+108', fairOdds: '-112', ev: '+9.3%', conf: '90%', action: 'DISCREPANCY' },
    { sport: 'MLB', player: 'Freddie Freeman', team: 'LAD at ARI', prop: 'Over 1.5 Total Bases', bookOdds: '-105', fairOdds: '-126', ev: '+8.8%', conf: '89%', action: 'HIGH VALUE' },
    { sport: 'MLB', player: 'Cole Ragans', team: 'KC vs CLE', prop: 'Over 6.5 Strikeouts', bookOdds: '-110', fairOdds: '-134', ev: '+10.2%', conf: '92%', action: 'SHARP EDGE' }
  ],
  WNBA: [
    { sport: 'WNBA', player: "A'ja Wilson", team: 'LVA at NYL', prop: 'Over 26.5 Points', bookOdds: '-110', fairOdds: '-138', ev: '+12.5%', conf: '97%', action: 'SHARP EDGE' },
    { sport: 'WNBA', player: 'Caitlin Clark', team: 'IND vs CHI', prop: 'Over 8.5 Assists', bookOdds: '+112', fairOdds: '-108', ev: '+9.6%', conf: '92%', action: 'DISCREPANCY' },
    { sport: 'WNBA', player: 'Breanna Stewart', team: 'NYL vs LVA', prop: 'Over 9.5 Rebounds', bookOdds: '-115', fairOdds: '-140', ev: '+11.0%', conf: '94%', action: 'SHARP EDGE' },
    { sport: 'WNBA', player: 'Sabrina Ionescu', team: 'NYL vs LVA', prop: 'Over 2.5 Made 3s', bookOdds: '-120', fairOdds: '-150', ev: '+12.0%', conf: '95%', action: 'SHARP EDGE' },
    { sport: 'WNBA', player: 'Alyssa Thomas', team: 'CON vs MIN', prop: 'Over 7.5 Assists', bookOdds: '-110', fairOdds: '-132', ev: '+9.7%', conf: '91%', action: 'HIGH VALUE' },
    { sport: 'WNBA', player: 'Napheesa Collier', team: 'MIN at CON', prop: 'Over 20.5 Points', bookOdds: '-115', fairOdds: '-136', ev: '+9.2%', conf: '90%', action: 'HIGH VALUE' },
    { sport: 'WNBA', player: 'Kelsey Plum', team: 'LVA at NYL', prop: 'Over 17.5 Points', bookOdds: '-110', fairOdds: '-128', ev: '+8.0%', conf: '88%', action: 'DISCREPANCY' },
    { sport: 'WNBA', player: 'Angel Reese', team: 'CHI at IND', prop: 'Over 12.5 Rebounds', bookOdds: '-125', fairOdds: '-155', ev: '+11.5%', conf: '94%', action: 'SHARP EDGE' },
    { sport: 'WNBA', player: 'Aliyah Boston', team: 'IND vs CHI', prop: 'Over 13.5 Points', bookOdds: '-115', fairOdds: '-134', ev: '+8.5%', conf: '89%', action: 'HIGH VALUE' },
    { sport: 'WNBA', player: 'Jewell Loyd', team: 'SEA vs DAL', prop: 'Over 19.5 Points', bookOdds: '+105', fairOdds: '-115', ev: '+9.4%', conf: '91%', action: 'HIGH VALUE' },
    { sport: 'WNBA', player: 'Arike Ogunbowale', team: 'DAL at SEA', prop: 'Over 21.5 Points', bookOdds: '-110', fairOdds: '-130', ev: '+8.9%', conf: '90%', action: 'DISCREPANCY' },
    { sport: 'WNBA', player: 'Chelsea Gray', team: 'LVA at NYL', prop: 'Over 5.5 Assists', bookOdds: '-108', fairOdds: '-128', ev: '+8.8%', conf: '89%', action: 'HIGH VALUE' },
    { sport: 'WNBA', player: 'Jonquel Jones', team: 'NYL vs LVA', prop: 'Over 8.5 Rebounds', bookOdds: '-112', fairOdds: '-132', ev: '+8.6%', conf: '89%', action: 'HIGH VALUE' },
    { sport: 'WNBA', player: 'Kayla McBride', team: 'MIN at CON', prop: 'Over 2.5 Made 3s', bookOdds: '+115', fairOdds: '-105', ev: '+9.8%', conf: '91%', action: 'SHARP EDGE' }
  ]
};

let activeSportFilter = 'ALL';
let slateDayOffset = 0; // 0 = Current Live Day, 1 = Tomorrow Preview

function getSportBadgeClass(sport) {
  switch (sport) {
    case 'NFL': return 'bg-amber-950/70 border border-amber-500/50 text-amber-300';
    case 'CFB': return 'bg-blue-950/70 border border-blue-500/50 text-blue-300';
    case 'MLB': return 'bg-red-950/70 border border-red-500/50 text-red-300';
    case 'WNBA': return 'bg-purple-950/70 border border-purple-500/50 text-purple-300';
    default: return 'bg-slate-800 text-slate-300';
  }
}

function getDayNumber(offset = 0) {
  const d = new Date();
  if (offset !== 0) {
    d.setUTCDate(d.getUTCDate() + offset);
  }
  // Days since epoch (UTC)
  return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000);
}

function getFormattedSlateDate(offset = 0) {
  const d = new Date();
  if (offset !== 0) {
    d.setUTCDate(d.getUTCDate() + offset);
  }
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' };
  const formatted = d.toLocaleDateString('en-US', options);
  if (offset === 0) {
    return `TODAY (${formatted})`;
  } else if (offset === 1) {
    return `TOMORROW'S PREVIEW (${formatted})`;
  } else {
    return formatted;
  }
}

function getDailySlateData(offset = 0, sportFilter = 'ALL') {
  const dayNum = getDayNumber(offset);
  const sports = ['NFL', 'CFB', 'MLB', 'WNBA'];

  if (sportFilter === 'ALL') {
    // 2 high-conviction props per sport = 8 marquee props daily
    const combined = [];
    sports.forEach(sport => {
      const pool = MASTER_PROP_POOLS[sport];
      const poolLen = pool.length;
      // Step by 3 each calendar day for non-repeating permutation
      const idx1 = (dayNum * 3 + 0) % poolLen;
      const idx2 = (dayNum * 3 + 1) % poolLen;
      combined.push(pool[idx1]);
      combined.push(pool[idx2]);
    });
    return combined;
  } else {
    // Sport-specific view: return 5 distinct daily props for that sport
    const pool = MASTER_PROP_POOLS[sportFilter] || [];
    const poolLen = pool.length;
    const picks = [];
    for (let i = 0; i < Math.min(5, poolLen); i++) {
      const idx = (dayNum * 3 + i) % poolLen;
      picks.push(pool[idx]);
    }
    return picks;
  }
}

function initEvTable() {
  const container = document.getElementById('ev-table-body');
  const filterBtns = document.querySelectorAll('.sport-filter-btn');
  const slateDateEl = document.getElementById('ev-slate-date');
  const countdownEl = document.getElementById('ev-countdown');
  const previewBtn = document.getElementById('ev-preview-toggle-btn');
  const previewBtnText = document.getElementById('ev-preview-btn-text');

  function renderRows() {
    if (!container) return;
    container.innerHTML = '';

    if (slateDateEl) {
      slateDateEl.textContent = getFormattedSlateDate(slateDayOffset);
    }

    const filtered = getDailySlateData(slateDayOffset, activeSportFilter);

    filtered.forEach(row => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-800/80 hover:bg-slate-800/40 transition text-sm';
      tr.innerHTML = `
        <td class="py-3 px-4 font-mono">
          <span class="px-2 py-0.5 rounded text-xs font-bold ${getSportBadgeClass(row.sport)}">${row.sport}</span>
        </td>
        <td class="py-3 px-4">
          <div class="font-sans font-bold text-slate-100 text-sm tracking-tight leading-snug">${row.player}</div>
          <div class="font-sans text-xs text-slate-400 font-normal mt-0.5">${row.team}</div>
        </td>
        <td class="py-3 px-4 font-sans font-semibold text-cyan-300 text-sm tracking-tight">${row.prop}</td>
        <td class="py-3 px-4 font-mono text-slate-300 font-bold">${row.bookOdds}</td>
        <td class="py-3 px-4 font-mono text-slate-400">${row.fairOdds}</td>
        <td class="py-3 px-4 font-mono text-emerald-400 font-bold glow-emerald">${row.ev}</td>
        <td class="py-3 px-4 font-mono text-amber-400 font-semibold">${row.conf}</td>
        <td class="py-3 px-4 font-mono">
          <span class="px-2 py-1 rounded text-xs tracking-wide font-bold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">${row.action}</span>
        </td>
      `;
      container.appendChild(tr);
    });
  }

  // Sport filter triggers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400'));
      btn.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400');
      activeSportFilter = btn.getAttribute('data-sport');
      renderRows();
    });
  });

  // Tomorrow Preview Toggle
  if (previewBtn) {
    previewBtn.addEventListener('click', () => {
      slateDayOffset = slateDayOffset === 0 ? 1 : 0;
      if (slateDayOffset === 1) {
        previewBtn.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400');
        if (previewBtnText) previewBtnText.textContent = "VIEW TODAY'S SLATE";
      } else {
        previewBtn.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400');
        if (previewBtnText) previewBtnText.textContent = "PREVIEW TOMORROW'S SLATE";
      }
      renderRows();
    });
  }

  // Live 24H Midnight Countdown Clock
  function updateCountdown() {
    if (!countdownEl) return;
    const now = new Date();
    const nextMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
    const diff = nextMidnight - now;
    if (diff <= 0) {
      renderRows(); // Auto-roll slate when clock crosses midnight!
      return;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    countdownEl.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  renderRows();
}

// 4. INTERACTIVE API PLAYGROUND
const API_SCHEMAS = {
  'ev-radar': {
    endpoint: 'GET /v1/props/ev-radar?sport=nfl&min_edge=8.0',
    response: {
      status: 200,
      timestamp: new Date().toISOString(),
      source: "Trishula Sovereign Telemetry Core",
      query_latency_ms: 14.8,
      results_count: 2,
      data: [
        {
          player: "Lamar Jackson",
          sport: "NFL",
          prop: "Passing + Rushing Yards",
          line: 284.5,
          market_best_price: "+105",
          trishula_fair_price: "-122",
          ev_percentage: 11.4,
          model_confidence: 0.94,
          exploitable_defensive_gap: "CLE shadow coverage mismatch in 3rd & intermediate"
        }
      ]
    },
    pythonSnippet: "import requests\n\nheaders = {'Authorization': 'Bearer YOUR_TRISHULA_API_KEY'}\nparams = {'sport': 'nfl', 'min_edge': 8.0}\n\nres = requests.get('https://api.trishulasoftware.com/v1/props/ev-radar', headers=headers, params=params)\nprint(res.json())",
    tsSnippet: "const response = await fetch('https://api.trishulasoftware.com/v1/props/ev-radar?sport=nfl&min_edge=8.0', {\n  headers: { 'Authorization': 'Bearer YOUR_TRISHULA_API_KEY' }\n});\nconst data = await response.json();\nconsole.log(data);",
    curlSnippet: "curl -X GET 'https://api.trishulasoftware.com/v1/props/ev-radar?sport=nfl&min_edge=8.0' -H 'Authorization: Bearer YOUR_TRISHULA_API_KEY'"
  },
  'bsc-pulse': {
    endpoint: 'GET /v1/telemetry/bsc/chain-pulse',
    response: {
      status: 200,
      timestamp: new Date().toISOString(),
      chain: "Binance Smart Chain (BSC)",
      rpc_node_pool: "https://1rpc.io/bnb [Decentralized Failover]",
      latest_block: 119982422,
      gas_price_gwei: 0.05,
      pancakeswap_v3_wbnb_volume_24h_usd: "142,850,210",
      net_liquidity_flow: "+$4,120,500 [BULLISH CONVICTION]"
    },
    pythonSnippet: "import requests\n\nres = requests.get('https://api.trishulasoftware.com/v1/telemetry/bsc/chain-pulse')\nprint(res.json())",
    tsSnippet: "const res = await fetch('https://api.trishulasoftware.com/v1/telemetry/bsc/chain-pulse');\nconsole.log(await res.json());",
    curlSnippet: "curl -X GET 'https://api.trishulasoftware.com/v1/telemetry/bsc/chain-pulse'"
  }
};

function initApiPlayground() {
  const select = document.getElementById('api-endpoint-select');
  const output = document.getElementById('api-output-code');
  const snippet = document.getElementById('code-snippet');
  const executeBtn = document.getElementById('api-execute-btn');
  const copyBtn = document.getElementById('copy-api-snippet-btn');

  function updateView() {
    const key = select ? select.value : 'ev-radar';
    const schema = API_SCHEMAS[key] || API_SCHEMAS['ev-radar'];
    if (output) output.textContent = JSON.stringify(schema.response, null, 2);
    if (snippet) snippet.textContent = schema.pythonSnippet;
  }

  if (select) {
    select.addEventListener('change', updateView);
  }
  updateView();

  if (executeBtn) {
    executeBtn.addEventListener('click', () => {
      executeBtn.textContent = '⚡ Fetching...';
      setTimeout(() => {
        executeBtn.textContent = '⚡ Execute Query (Live Simulation)';
        updateView();
      }, 250);
    });
  }

  if (copyBtn && snippet) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(snippet.textContent);
      const prev = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span>Copied!</span>';
      setTimeout(() => copyBtn.innerHTML = prev, 1500);
    });
  }
}

// 5. CONSULTATION & WHITELIST MODAL
function initConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  const openBtns = document.querySelectorAll('.open-consultation-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const form = document.getElementById('consultation-form');
  const successMsg = document.getElementById('consultation-success');

  const modalBadge = modal ? modal.querySelector('.modal-badge') : null;
  const modalTitle = modal ? modal.querySelector('.modal-title') : null;
  const modalSubtitle = modal ? modal.querySelector('.modal-subtitle') : null;
  const modalScopeLabel = modal ? modal.querySelector('.modal-scope-label') : null;
  const modalScopeInput = modal ? modal.querySelector('.modal-scope-input') : null;
  const modalSubmitBtn = modal ? modal.querySelector('.modal-submit-btn') : null;
  const modalSuccessTitle = modal ? modal.querySelector('.modal-success-title') : null;
  const modalSuccessDesc = modal ? modal.querySelector('.modal-success-desc') : null;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const indicator = btn.getAttribute('data-indicator');

      if (indicator) {
        if (modalBadge) modalBadge.textContent = `TRADINGVIEW WHITELIST // ${indicator.toUpperCase()}`;
        if (modalTitle) modalTitle.textContent = `Request Whitelist: ${indicator}`;
        if (modalSubtitle) modalSubtitle.textContent = `Direct TradingView whitelist onboarding with Trishula Quantitative Systems.`;
        if (modalScopeLabel) modalScopeLabel.textContent = 'TRADINGVIEW USERNAME & REQUIREMENTS';
        if (modalScopeInput) {
          modalScopeInput.placeholder = `TradingView Username: @your_username
Target Markets: GC1!, BTCUSDT, NQ1!, SPY...
Deployment Mode: Webhook automated bot or discretionary chart overlay...`;
          modalScopeInput.value = `TradingView Username: 
Target Markets: 
Requested Indicator: ${indicator} (Pine Script v5)`;
        }
        if (modalSubmitBtn) modalSubmitBtn.textContent = `SUBMIT ${indicator.toUpperCase()} WHITELIST REQUEST`;
        if (modalSuccessTitle) modalSuccessTitle.textContent = 'Whitelist Application Received';
        if (modalSuccessDesc) modalSuccessDesc.textContent = `Your TradingView whitelist request for ${indicator} has been logged. Trishula Systems Engineering will authorize your account and follow up via email.`;
      } else {
        if (modalBadge) modalBadge.textContent = 'ENTERPRISE ARCHITECTURE RFP';
        if (modalTitle) modalTitle.textContent = 'Request Custom Engineering';
        if (modalSubtitle) modalSubtitle.textContent = 'Direct engagement with Trishula Principal Systems Engineering.';
        if (modalScopeLabel) modalScopeLabel.textContent = 'PROJECT SCOPE / REQUIREMENTS';
        if (modalScopeInput) {
          modalScopeInput.placeholder = 'Describe your required scraper volume, terminal features, or quantitative odds engine...';
          modalScopeInput.value = '';
        }
        if (modalSubmitBtn) modalSubmitBtn.textContent = 'SUBMIT ARCHITECTURE INQUIRY';
        if (modalSuccessTitle) modalSuccessTitle.textContent = 'Inquiry Received';
        if (modalSuccessDesc) modalSuccessDesc.textContent = 'Your architecture specification has been delivered to Trishula Systems Engineering. We will respond within 24 hours.';
      }

      if (modal) modal.classList.remove('hidden');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('hidden');
      if (successMsg) successMsg.classList.remove('hidden');
      setTimeout(() => {
        if (modal) modal.classList.add('hidden');
        form.reset();
        form.classList.remove('hidden');
        if (successMsg) successMsg.classList.add('hidden');
      }, 4000);
    });
  }
}


// =========================================================================
// QUANT SUITE ACCORDION ENGINE (ALL 12 INDICATORS)
// =========================================================================
function toggleIndicatorAccordion(id) {
  const drawer = document.getElementById('drawer-' + id);
  const chevron = document.getElementById('chevron-' + id);
  const label = document.getElementById('label-' + id);

  if (!drawer) return;

  const isHidden = drawer.classList.contains('hidden');
  if (isHidden) {
    drawer.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
    if (label) label.textContent = 'CLICK TO RETRACT';
    if (window.lucide) window.lucide.createIcons();
  } else {
    drawer.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
    if (label) label.textContent = 'CLICK TO EXPAND';
  }
}
