function confirmDelete() {
  return confirm("Delete this transaction?");
}

let chartNet = null;
let chartBar = null;
let chartPie = null;

function formatCurrency(v) {
  return '$' + Number(v).toFixed(2);
}

function createOrUpdateCharts(insightsData) {
  const months = (insightsData.monthly_series || []).map(s => s.month);
  const net = (insightsData.monthly_series || []).map(s => s.net);
  const inc = (insightsData.monthly_series || []).map(s => s.income);
  const exp = (insightsData.monthly_series || []).map(s => s.expense);
  const catLabels = Object.keys(insightsData.expenses_by_category || {});
  const catValues = Object.values(insightsData.expenses_by_category || {});

  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#1e90ff';
  const success = getComputedStyle(document.documentElement).getPropertyValue('--success') || '#00c865';
  const danger = getComputedStyle(document.documentElement).getPropertyValue('--danger') || '#c0392b';

  const netCtx = document.getElementById('netChart');
  if (netCtx) {
    if (chartNet) {
      chartNet.data.labels = months;
      chartNet.data.datasets = [{ label: 'Net', data: net, borderColor: accent.trim(), backgroundColor: 'rgba(30,144,255,0.08)', tension:0.25 }];
      chartNet.update();
    } else {
      chartNet = new Chart(netCtx, {
        type: 'line',
        data: { labels: months, datasets: [{ label: 'Net', data: net, borderColor: accent.trim(), backgroundColor: 'rgba(30,144,255,0.08)', tension:0.25 }] },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }

  const barCtx = document.getElementById('barChart');
  if (barCtx) {
    if (chartBar) {
      chartBar.data.labels = months;
      chartBar.data.datasets = [ { label: 'Income', data: inc, backgroundColor: success.trim() }, { label: 'Expense', data: exp, backgroundColor: danger.trim() } ];
      chartBar.update();
    } else {
      chartBar = new Chart(barCtx, { type: 'bar', data: { labels: months, datasets: [ { label: 'Income', data: inc, backgroundColor: success.trim() }, { label: 'Expense', data: exp, backgroundColor: danger.trim() } ] }, options: { responsive: true, maintainAspectRatio: false } });
    }
  }

  const pieCtx = document.getElementById('pieChart');
  if (pieCtx) {
    if (chartPie) {
      chartPie.data.labels = catLabels;
      chartPie.data.datasets = [{ data: catValues, backgroundColor: catLabels.map((_,i)=>`hsl(${i*40 % 360} 70% 60%)`) }];
      chartPie.update();
    } else {
      chartPie = new Chart(pieCtx, { type: 'pie', data: { labels: catLabels, datasets: [{ data: catValues, backgroundColor: catLabels.map((_,i)=>`hsl(${i*40 % 360} 70% 60%)`) }] }, options: { responsive: true, maintainAspectRatio: false } });
    }
  }
}

function renderTable(items) {
  const tbody = document.getElementById('txTableBody');
  if (!tbody) return;
  // sort by date desc
  const arr = (items || []).slice().sort((a,b)=> b.date.localeCompare(a.date));
  tbody.innerHTML = '';
  for (const t of arr) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${t.date}</td>
      <td>${(t.description||'').replace(/</g,'&lt;')}</td>
      <td>${(t.category||'').replace(/</g,'&lt;')}</td>
      <td>${t.type}</td>
      <td style="text-align:right;">${formatCurrency(t.amount)}</td>
      <td><button class="danger delete-btn" data-id="${t.id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  }

  // attach delete handlers
  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      if (!confirm('Delete this transaction?')) return;
      deleteTx(id);
    });
  });

  // color amounts
  tbody.querySelectorAll('tr').forEach(r => {
    const amtCell = r.cells[r.cells.length - 2];
    if (!amtCell) return;
    const num = parseFloat(amtCell.textContent.replace(/[^0-9.-]+/g,'')) || 0;
    if (num > 0) amtCell.style.color = getComputedStyle(document.documentElement).getPropertyValue('--success').trim() || '#00c865';
    if (num < 0) amtCell.style.color = getComputedStyle(document.documentElement).getPropertyValue('--danger').trim() || '#c0392b';
  });
}

async function deleteTx(id) {
  try {
    const res = await fetch(`/api/delete/${id}`, { method: 'POST' });
    const j = await res.json();
    if (!j.ok) throw new Error(j.error || 'Delete failed');
    window.txItemsRaw = j.items;
    window.insightsDataRaw = j.insights;
    renderTable(j.items);
    createOrUpdateCharts(j.insights);
  } catch (err) {
    console.error(err);
    alert('Delete failed: ' + err.message);
  }
}

async function submitAddForm(evt) {
  evt.preventDefault();
  const form = evt.target;
  const fd = new FormData(form);
  const data = Object.fromEntries(fd.entries());
  try {
    const res = await fetch('/api/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const j = await res.json();
    if (!j.ok) throw new Error(j.error || 'Add failed');
    // update client
    window.txItemsRaw = j.items;
    window.insightsDataRaw = j.insights;
    renderTable(j.items);
    createOrUpdateCharts(j.insights);
    form.reset();
    // put today's date back
    const dateEl = form.querySelector('input[name="date"]');
    if (dateEl) dateEl.value = new Date().toISOString().slice(0,10);
  } catch (err) {
    console.error(err);
    alert('Add failed: ' + err.message);
  }
}

function initDashboard() {
  try {
    const insightsData = window.insightsDataRaw || { monthly_series: [], expenses_by_category: {} };
    const items = window.txItemsRaw || [];
    renderTable(items);
    createOrUpdateCharts(insightsData);

    // search
    const searchEl = document.getElementById('txSearch');
    if (searchEl) {
      searchEl.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        const table = document.getElementById('txTableBody');
        if (!table) return;
        for (const row of table.rows) {
          const cells = Array.from(row.cells).map(c => c.textContent.toLowerCase());
          const match = q === '' || cells.some(t => t.includes(q));
          row.style.display = match ? '' : 'none';
        }
      });
    }

    // bind add form for AJAX
    const addForm = document.getElementById('addForm');
    if (addForm) addForm.addEventListener('submit', submitAddForm);

    // intercept any server-rendered delete forms (fallback)
    document.querySelectorAll('form[data-txid]').forEach(f => {
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = f.getAttribute('data-txid');
        if (!id) return;
        if (!confirm('Delete this transaction?')) return;
        deleteTx(id);
      });
    });

  } catch (err) {
    console.error('initDashboard error', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}
  