const menus = [
  // 한식
  { name: "김치찌개", emoji: "🍲", category: "한식", desc: "얼큰하고 깊은 맛의 국민 찌개" },
  { name: "된장찌개", emoji: "🫕", category: "한식", desc: "구수하고 건강한 한국의 소울푸드" },
  { name: "삼겹살", emoji: "🥩", category: "한식", desc: "불판 위에서 구워 먹는 최고의 고기" },
  { name: "비빔밥", emoji: "🍚", category: "한식", desc: "형형색색 나물과 고추장이 조화로운 밥" },
  { name: "불고기", emoji: "🥢", category: "한식", desc: "달콤짭짤한 양념의 부드러운 소고기" },
  { name: "순대국밥", emoji: "🍜", category: "한식", desc: "진한 국물의 따뜻하고 든든한 국밥" },
  { name: "삼계탕", emoji: "🍗", category: "한식", desc: "인삼과 닭이 어우러진 보양식" },
  { name: "제육볶음", emoji: "🫔", category: "한식", desc: "매콤달콤한 돼지고기 볶음 정식" },

  // 중식
  { name: "짜장면", emoji: "🍝", category: "중식", desc: "고소한 춘장 소스의 국민 면 요리" },
  { name: "짬뽕", emoji: "🌶️", category: "중식", desc: "해물과 채소가 가득한 얼큰한 국물 면" },
  { name: "마라탕", emoji: "🔥", category: "중식", desc: "혀가 얼얼한 중국식 매운 탕" },
  { name: "탕수육", emoji: "🍖", category: "중식", desc: "바삭한 튀김에 새콤달콤 소스" },
  { name: "볶음밥", emoji: "🍳", category: "중식", desc: "고소한 기름에 볶아낸 간편한 한 끼" },

  // 일식
  { name: "초밥", emoji: "🍣", category: "일식", desc: "신선한 재료가 올라간 한 입 초밥" },
  { name: "라멘", emoji: "🍜", category: "일식", desc: "진한 육수에 쫄깃한 면이 들어간 국물 요리" },
  { name: "돈까스", emoji: "🍱", category: "일식", desc: "바삭하게 튀긴 두툼한 돼지고기 커틀릿" },
  { name: "우동", emoji: "🍜", category: "일식", desc: "쫄깃한 굵은 면의 시원한 국물 요리" },
  { name: "규동", emoji: "🥩", category: "일식", desc: "달콤한 소고기 덮밥으로 든든하게" },
  { name: "카레라이스", emoji: "🍛", category: "일식", desc: "향긋한 일본식 카레와 밥" },

  // 양식
  { name: "파스타", emoji: "🍝", category: "양식", desc: "다양한 소스로 즐기는 이탈리아 면 요리" },
  { name: "피자", emoji: "🍕", category: "양식", desc: "치즈가 쭉 늘어나는 모두의 최애 음식" },
  { name: "샌드위치", emoji: "🥪", category: "양식", desc: "신선한 재료를 빵 사이에 넣은 간편한 한 끼" },
  { name: "스테이크", emoji: "🥩", category: "양식", desc: "육즙이 가득한 고급 소고기 요리" },
  { name: "버거", emoji: "🍔", category: "양식", desc: "패티와 채소가 가득한 든든한 버거" },

  // 분식
  { name: "떡볶이", emoji: "🌶️", category: "분식", desc: "쫄깃한 떡에 매콤달콤한 소스" },
  { name: "순대", emoji: "🫙", category: "분식", desc: "따뜻하고 든든한 길거리 간식" },
  { name: "김밥", emoji: "🍙", category: "분식", desc: "한 줄이면 든든한 국민 간편식" },
  { name: "라면", emoji: "🍜", category: "분식", desc: "5분이면 완성되는 최고의 혼밥 메뉴" },
  { name: "만두", emoji: "🥟", category: "분식", desc: "속이 꽉 찬 쫄깃한 만두" },
];

const categories = ["전체", "한식", "중식", "일식", "양식", "분식"];
let selectedCategory = "전체";
let excludedMenu = null;
let isSpinning = false;

function getFilteredMenus() {
  let list = selectedCategory === "전체" ? menus : menus.filter(m => m.category === selectedCategory);
  if (excludedMenu) list = list.filter(m => m.name !== excludedMenu);
  return list;
}

function initExcludeSelect() {
  const sel = document.getElementById("exclude-select");
  menus.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.name;
    opt.textContent = `${m.emoji} ${m.name} (${m.category})`;
    sel.appendChild(opt);
  });
  sel.addEventListener("change", () => {
    excludedMenu = sel.value || null;
    const badge = document.getElementById("exclude-badge");
    const clearBtn = document.getElementById("exclude-clear");
    if (excludedMenu) {
      const menu = menus.find(m => m.name === excludedMenu);
      badge.innerHTML = `<span class="exclude-tag">${menu.emoji} ${menu.name} 제외됨</span>`;
      clearBtn.style.display = "inline-block";
    } else {
      badge.innerHTML = "";
      clearBtn.style.display = "none";
    }
    resetCard();
  });
}

function clearExclude() {
  excludedMenu = null;
  document.getElementById("exclude-select").value = "";
  document.getElementById("exclude-badge").innerHTML = "";
  document.getElementById("exclude-clear").style.display = "none";
  resetCard();
}

function renderCategories() {
  const container = document.getElementById("categories");
  container.innerHTML = categories.map(cat => `
    <button class="cat-btn ${cat === selectedCategory ? "active" : ""}" onclick="selectCategory('${cat}')">
      ${cat}
    </button>
  `).join("");
}

function selectCategory(cat) {
  selectedCategory = cat;
  renderCategories();
  resetCard();
}

function resetCard() {
  const card = document.getElementById("result-card");
  card.classList.remove("visible");
  card.innerHTML = "";
}

function recommend() {
  if (isSpinning) return;
  isSpinning = true;

  const btn = document.getElementById("recommend-btn");
  btn.disabled = true;
  btn.textContent = "고르는 중...";

  const filtered = getFilteredMenus();
  const card = document.getElementById("result-card");
  card.classList.remove("visible");

  let count = 0;
  const maxFlash = 12;
  const interval = setInterval(() => {
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    card.innerHTML = `<div class="flash-emoji">${random.emoji}</div><div class="flash-name">${random.name}</div>`;
    card.classList.add("visible", "spinning");
    count++;

    if (count >= maxFlash) {
      clearInterval(interval);
      const chosen = filtered[Math.floor(Math.random() * filtered.length)];
      showResult(chosen);
      btn.disabled = false;
      btn.textContent = "오늘 뭐 먹지? 🎲";
      isSpinning = false;
    }
  }, 80);
}

function showResult(menu) {
  const card = document.getElementById("result-card");
  card.classList.remove("spinning");
  card.innerHTML = `
    <div class="result-emoji">${menu.emoji}</div>
    <div class="result-category">${menu.category}</div>
    <div class="result-name">${menu.name}</div>
    <div class="result-desc">${menu.desc}</div>
    <button class="record-btn" onclick="recordLunch('${menu.name}', '${menu.emoji}', '${menu.category}')">✅ 오늘 점심으로 먹었어요!</button>
  `;
  card.classList.add("visible");
}

// ── 점심 기록 ──────────────────────────────────────────

function getRecords() {
  return JSON.parse(localStorage.getItem("lunchRecords") || "[]");
}

function saveRecords(records) {
  localStorage.setItem("lunchRecords", JSON.stringify(records));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getMonth() + 1}/${d.getDate()} (${days[d.getDay()]})`;
}

function recordLunch(name, emoji, category) {
  const records = getRecords();
  const today = todayStr();
  const existing = records.findIndex(r => r.date === today);
  if (existing !== -1) records.splice(existing, 1);
  records.unshift({ date: today, name, emoji, category });
  // 최근 31일만 보관
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 31);
  const filtered = records.filter(r => new Date(r.date) >= cutoff);
  saveRecords(filtered);

  // 버튼을 완료 표시로 변경
  const btn = document.querySelector(".record-btn");
  if (btn) {
    btn.textContent = "✔ 기록 완료!";
    btn.disabled = true;
    btn.classList.add("recorded");
  }
  renderHistory();
}

function deleteRecord(date) {
  const records = getRecords().filter(r => r.date !== date);
  saveRecords(records);
  renderHistory();
}

function editRecord(date) {
  // 이미 열려있으면 닫기
  const existing = document.querySelector(`.edit-row[data-date="${date}"]`);
  if (existing) { existing.remove(); return; }

  const item = document.querySelector(`.history-item[data-date="${date}"]`);
  if (!item) return;

  const optionsHtml = menus.map(m =>
    `<option value="${m.name}">${m.emoji} ${m.name} (${m.category})</option>`
  ).join("");

  const editRow = document.createElement("div");
  editRow.className = "edit-row";
  editRow.dataset.date = date;
  editRow.innerHTML = `
    <select class="edit-select">${optionsHtml}</select>
    <button class="edit-confirm-btn" onclick="confirmEdit('${date}')">변경</button>
    <button class="edit-cancel-btn" onclick="this.closest('.edit-row').remove()">취소</button>
  `;
  item.after(editRow);

  // 현재 메뉴로 select 초기화
  const current = getRecords().find(r => r.date === date);
  if (current) editRow.querySelector("select").value = current.name;
}

function confirmEdit(date) {
  const editRow = document.querySelector(`.edit-row[data-date="${date}"]`);
  const selectedName = editRow.querySelector("select").value;
  const menu = menus.find(m => m.name === selectedName);
  if (!menu) return;

  const records = getRecords();
  const idx = records.findIndex(r => r.date === date);
  if (idx !== -1) {
    records[idx] = { date, name: menu.name, emoji: menu.emoji, category: menu.category };
    saveRecords(records);
  }
  renderHistory();
}

function renderHistory() {
  const records = getRecords();
  const container = document.getElementById("history-list");

  if (records.length === 0) {
    container.innerHTML = `<p class="history-empty">아직 기록이 없어요. 추천 메뉴를 먹으면 기록해보세요!</p>`;
    return;
  }

  container.innerHTML = records.map(r => `
    <div class="history-item" data-date="${r.date}">
      <span class="history-emoji">${r.emoji}</span>
      <div class="history-info">
        <span class="history-name">${r.name}</span>
        <span class="history-cat">${r.category}</span>
      </div>
      <span class="history-date">${formatDate(r.date)}</span>
      <button class="history-edit" onclick="editRecord('${r.date}')" title="수정">✏️</button>
      <button class="history-del" onclick="deleteRecord('${r.date}')" title="삭제">✕</button>
    </div>
  `).join("");
}

// ── 뷰 전환 ────────────────────────────────────────────

let currentView = "list";

function switchView(view) {
  currentView = view;
  document.getElementById("view-list").style.display = view === "list" ? "block" : "none";
  document.getElementById("view-calendar").style.display = view === "calendar" ? "block" : "none";
  document.querySelectorAll(".view-tab").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".view-tab")[view === "list" ? 0 : 1].classList.add("active");
  if (view === "calendar") renderCalendar();
}

// ── 달력 ───────────────────────────────────────────────

let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth(); // 0-indexed

function changeMonth(delta) {
  calMonth += delta;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
}

function renderCalendar() {
  const records = getRecords();
  const recordMap = {};
  records.forEach(r => { recordMap[r.date] = r; });

  const title = document.getElementById("cal-title");
  title.textContent = `${calYear}년 ${calMonth + 1}월`;

  const firstDay = new Date(calYear, calMonth, 1).getDay(); // 0=일
  const lastDate = new Date(calYear, calMonth + 1, 0).getDate();
  const today = todayStr();

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  let html = `<div class="cal-header">${dayNames.map(d => `<div class="cal-day-name">${d}</div>`).join("")}</div><div class="cal-body">`;

  // 빈 칸
  for (let i = 0; i < firstDay; i++) html += `<div class="cal-cell empty"></div>`;

  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const record = recordMap[dateStr];
    const isToday = dateStr === today;
    html += `
      <div class="cal-cell ${record ? "has-record" : ""} ${isToday ? "today" : ""}" onclick="showCalDetail('${dateStr}')">
        <span class="cal-date">${d}</span>
        ${record ? `<span class="cal-emoji">${record.emoji}</span><span class="cal-menu-name">${record.name}</span>` : ""}
      </div>`;
  }

  html += `</div>`;
  document.getElementById("calendar-grid").innerHTML = html;
  document.getElementById("cal-detail").innerHTML = "";
}

function showCalDetail(dateStr) {
  const records = getRecords();
  const record = records.find(r => r.date === dateStr);
  const detail = document.getElementById("cal-detail");

  if (!record) {
    detail.innerHTML = `
      <div class="cal-detail-box empty-day">
        <span class="cal-detail-date">${formatDate(dateStr)}</span>
        <span class="cal-detail-empty">기록 없음</span>
      </div>`;
    return;
  }

  detail.innerHTML = `
    <div class="cal-detail-box">
      <span class="cal-detail-date">${formatDate(dateStr)}</span>
      <span class="cal-detail-emoji">${record.emoji}</span>
      <div class="cal-detail-info">
        <span class="cal-detail-name">${record.name}</span>
        <span class="cal-detail-cat">${record.category}</span>
      </div>
      <button class="history-edit" onclick="calEditRecord('${dateStr}')" title="수정">✏️</button>
      <button class="history-del" onclick="calDeleteRecord('${dateStr}')" title="삭제">✕</button>
    </div>`;
}

function calDeleteRecord(date) {
  deleteRecord(date);
  renderCalendar();
}

function calEditRecord(date) {
  const optionsHtml = menus.map(m =>
    `<option value="${m.name}">${m.emoji} ${m.name} (${m.category})</option>`
  ).join("");
  const detail = document.getElementById("cal-detail");
  const current = getRecords().find(r => r.date === date);

  detail.innerHTML = `
    <div class="edit-row">
      <select class="edit-select" id="cal-edit-select">${optionsHtml}</select>
      <button class="edit-confirm-btn" onclick="calConfirmEdit('${date}')">변경</button>
      <button class="edit-cancel-btn" onclick="showCalDetail('${date}')">취소</button>
    </div>`;
  if (current) document.getElementById("cal-edit-select").value = current.name;
}

function calConfirmEdit(date) {
  const selectedName = document.getElementById("cal-edit-select").value;
  const menu = menus.find(m => m.name === selectedName);
  if (!menu) return;
  const records = getRecords();
  const idx = records.findIndex(r => r.date === date);
  if (idx !== -1) {
    records[idx] = { date, name: menu.name, emoji: menu.emoji, category: menu.category };
    saveRecords(records);
  }
  renderHistory();
  renderCalendar();
  showCalDetail(date);
}

// Init
renderCategories();
initExcludeSelect();
renderHistory();
