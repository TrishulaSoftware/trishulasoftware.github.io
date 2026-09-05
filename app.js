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

// 3. MULTI-SPORT +EV DATA & TABLE
const EV_DATA = [
  { sport: 'NFL', player: 'Lamar Jackson', team: 'BAL vs KC', prop: 'Over 48.5 Rush Yds', bookOdds: '+108', fairOdds: '-118', ev: '+11.4%', conf: '94%', action: 'HIGH VALUE' },
  { sport: 'NFL', player: 'CeeDee Lamb', team: 'DAL vs CLE', prop: 'Over 7.5 Receptions', bookOdds: '+120', fairOdds: '+102', ev: '+8.9%', conf: '89%', action: 'DISCREPANCY' },
  { sport: 'CFB', player: 'Carson Beck', team: 'UGA vs CLEM', prop: 'Over 275.5 Pass Yds', bookOdds: '+110', fairOdds: '-105', ev: '+9.8%', conf: '91%', action: 'HIGH VALUE' },
  { sport: 'CFB', player: 'Travis Hunter', team: 'COL vs NDSU', prop: 'Over 82.5 Rec Yds', bookOdds: '-110', fairOdds: '-135', ev: '+12.1%', conf: '96%', action: 'SHARP EDGE' },
  { sport: 'MLB', player: 'Shohei Ohtani', team: 'LAD at ARI', prop: 'Over 1.5 Total Bases', bookOdds: '-115', fairOdds: '-142', ev: '+12.8%', conf: '95%', action: 'SHARP EDGE' },
  { sport: 'MLB', player: 'Tarik Skubal', team: 'DET vs BOS', prop: 'Over 7.5 Strikeouts', bookOdds: '+115', fairOdds: '-102', ev: '+10.4%', conf: '90%', action: 'HIGH VALUE' },
  { sport: 'WNBA', player: "A'ja Wilson", team: 'LVA at NYL', prop: 'Over 26.5 Points', bookOdds: '-110', fairOdds: '-138', ev: '+12.5%', conf: '97%', action: 'SHARP EDGE' },
  { sport: 'WNBA', player: 'Caitlin Clark', team: 'IND vs CHI', prop: 'Over 8.5 Assists', bookOdds: '+112', fairOdds: '-108', ev: '+9.6%', conf: '92%', action: 'DISCREPANCY' }
];

let activeSportFilter = 'ALL';

function getSportBadgeClass(sport) {
  switch (sport) {
    case 'NFL': return 'bg-amber-950/70 border border-amber-500/50 text-amber-300';
    case 'CFB': return 'bg-blue-950/70 border border-blue-500/50 text-blue-300';
    case 'MLB': return 'bg-red-950/70 border border-red-500/50 text-red-300';
    case 'WNBA': return 'bg-purple-950/70 border border-purple-500/50 text-purple-300';
    default: return 'bg-slate-800 text-slate-300';
  }
}

function initEvTable() {
  const container = document.getElementById('ev-table-body');
  const filterBtns = document.querySelectorAll('.sport-filter-btn');

  function renderRows() {
    if (!container) return;
    container.innerHTML = '';

    const filtered = activeSportFilter === 'ALL' 
      ? EV_DATA 
      : EV_DATA.filter(item => item.sport === activeSportFilter);

    filtered.forEach(row => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-800/80 hover:bg-slate-800/40 transition font-mono text-sm';
      tr.innerHTML = `
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded text-xs font-bold ${getSportBadgeClass(row.sport)}">${row.sport}</span>
        </td>
        <td class="py-3 px-4 font-semibold text-slate-100">
          ${row.player}
          <div class="text-xs text-slate-400 font-normal">${row.team}</div>
        </td>
        <td class="py-3 px-4 text-cyan-300">${row.prop}</td>
        <td class="py-3 px-4 text-slate-300 font-bold">${row.bookOdds}</td>
        <td class="py-3 px-4 text-slate-400">${row.fairOdds}</td>
        <td class="py-3 px-4 text-emerald-400 font-bold glow-emerald">${row.ev}</td>
        <td class="py-3 px-4 text-amber-400 font-semibold">${row.conf}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-1 rounded text-xs tracking-wide font-bold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">${row.action}</span>
        </td>
      `;
      container.appendChild(tr);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400'));
      btn.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400');
      activeSportFilter = btn.getAttribute('data-sport');
      renderRows();
    });
  });

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

// 5. CONSULTATION MODAL
function initConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  const openBtns = document.querySelectorAll('.open-consultation-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const form = document.getElementById('consultation-form');
  const successMsg = document.getElementById('consultation-success');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
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
