const schoolWeeks = [
  { n: 1, start: "2025-09-08", end: "2025-09-13", note: "Bắt đầu học kỳ I" },
  { n: 2, start: "2025-09-15", end: "2025-09-20", note: "" },
  { n: 3, start: "2025-09-22", end: "2025-09-27", note: "" },
  { n: 4, start: "2025-09-29", end: "2025-10-04", note: "" },
  { n: 5, start: "2025-10-06", end: "2025-10-11", note: "" },
  { n: 6, start: "2025-10-13", end: "2025-10-18", note: "" },
  { n: 7, start: "2025-10-20", end: "2025-10-25", note: "" },
  { n: 8, start: "2025-10-27", end: "2025-11-01", note: "" },
  { n: 9, start: "2025-11-03", end: "2025-11-08", note: "" },
  { n: 10, start: "2025-11-10", end: "2025-11-15", note: "" },
  { n: 11, start: "2025-11-17", end: "2025-11-22", note: "" },
  { n: 12, start: "2025-11-24", end: "2025-11-29", note: "" },
  { n: 13, start: "2025-12-01", end: "2025-12-06", note: "" },
  { n: 14, start: "2025-12-08", end: "2025-12-13", note: "" },
  { n: 15, start: "2025-12-15", end: "2025-12-20", note: "" },
  { n: 16, start: "2025-12-22", end: "2025-12-27", note: "" },
  { n: 17, start: "2025-12-29", end: "2026-01-03", note: "" },
  { n: 18, start: "2026-01-05", end: "2026-01-10", note: "Kết thúc học kỳ I" },
  { n: 19, start: "2026-01-12", end: "2026-01-17", note: "Bắt đầu học kỳ II" },
  { n: 20, start: "2026-01-19", end: "2026-01-24", note: "" },
  { n: 21, start: "2026-01-26", end: "2026-01-31", note: "" },
  { n: 22, start: "2026-02-02", end: "2026-02-07", note: "" },
  { n: null, start: "2026-02-09", end: "2026-02-14", note: "Nghỉ Tết Bính Ngọ", holiday: true },
  { n: null, start: "2026-02-16", end: "2026-02-21", note: "Nghỉ Tết Bính Ngọ", holiday: true },
  { n: 23, start: "2026-02-23", end: "2026-02-28", note: "" },
  { n: 24, start: "2026-03-02", end: "2026-03-07", note: "" },
  { n: 25, start: "2026-03-09", end: "2026-03-14", note: "" },
  { n: 26, start: "2026-03-16", end: "2026-03-21", note: "" },
  { n: 27, start: "2026-03-23", end: "2026-03-28", note: "" },
  { n: 28, start: "2026-03-30", end: "2026-04-04", note: "" },
  { n: 29, start: "2026-04-06", end: "2026-04-11", note: "" },
  { n: 30, start: "2026-04-13", end: "2026-04-18", note: "" },
  { n: 31, start: "2026-04-20", end: "2026-04-25", note: "" },
  { n: 32, start: "2026-04-27", end: "2026-05-02", note: "" },
  { n: 33, start: "2026-05-04", end: "2026-05-09", note: "" },
  { n: 34, start: "2026-05-11", end: "2026-05-16", note: "" },
  { n: 35, start: "2026-05-18", end: "2026-05-23", note: "Kết thúc học kỳ II" }
];

const teachers = [
  {
    id: "nguyen-thi-thanh-van",
    name: "Nguyễn Thị Thanh Vân",
    subject: "PHÂN MÔN LỊCH SỬ",
    assignment: "Dạy 7A3",
    rankCode: "V.07.04.31",
    salaryLevel: "3/8",
    salaryCoeff: "4.68",
    weeklyNorm: 19
  },
  {
    id: "tran-thi-van",
    name: "Trần Thị Vân",
    subject: "GDCD",
    assignment: "Dạy GDCD K6,7,8,9; HĐTN 6",
    rankCode: "V.07.04.31",
    salaryLevel: "3",
    salaryCoeff: "4.68",
    weeklyNorm: 19
  }
];

const els = {
  monthSelect: document.querySelector("#monthSelect"),
  teacherSelect: document.querySelector("#teacherSelect"),
  teacherName: document.querySelector("#teacherName"),
  subject: document.querySelector("#subject"),
  assignment: document.querySelector("#assignment"),
  rankCode: document.querySelector("#rankCode"),
  salaryLevel: document.querySelector("#salaryLevel"),
  salaryCoeff: document.querySelector("#salaryCoeff"),
  weeklyNorm: document.querySelector("#weeklyNorm"),
  allowanceList: document.querySelector("#allowanceList"),
  weekRows: document.querySelector("#weekRows"),
  weekHint: document.querySelector("#weekHint"),
  weekCountBadge: document.querySelector("#weekCountBadge"),
  totalActual: document.querySelector("#totalActual"),
  totalRemainingNorm: document.querySelector("#totalRemainingNorm"),
  totalResult: document.querySelector("#totalResult"),
  printTitle: document.querySelector("#printTitle"),
  printMeta: document.querySelector("#printMeta"),
  previewTable: document.querySelector("#previewTable")
};

let state = {
  month: "2025-12",
  teacherId: teachers[0].id,
  profile: { ...teachers[0] },
  allowances: [],
  entries: []
};

function dateOnly(value) {
  return new Date(`${value}T00:00:00`);
}

function formatDate(value) {
  const d = dateOnly(value);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function monthLabel(month) {
  const [year, mm] = month.split("-");
  return `tháng ${Number(mm)} năm ${year}`;
}

function storageKey() {
  return `ke-gio:${state.teacherId}:${state.month}`;
}

function monthsFromWeeks() {
  const months = new Set();
  schoolWeeks.forEach((week) => {
    const start = dateOnly(week.start);
    const end = dateOnly(week.end);
    const cursor = new Date(start);
    cursor.setDate(1);
    while (cursor <= end) {
      months.add(`${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`);
      cursor.setMonth(cursor.getMonth() + 1);
    }
  });
  return [...months].sort();
}

function weeksForMonth(month) {
  const [year, mm] = month.split("-").map(Number);
  const monthStart = new Date(year, mm - 1, 1);
  const monthEnd = new Date(year, mm, 0);
  return schoolWeeks.filter((week) => dateOnly(week.start) <= monthEnd && dateOnly(week.end) >= monthStart);
}

function defaultEntries() {
  return weeksForMonth(state.month).map((week) => ({
    key: `${week.n || "holiday"}:${week.start}`,
    n: week.n,
    start: week.start,
    end: week.end,
    status: week.holiday ? "holiday" : "teaching",
    content: week.holiday ? week.note : state.profile.assignment,
    regular: week.holiday ? 0 : "",
    extra: 0,
    reduction: 0,
    note: week.note || ""
  }));
}

function loadCurrentRecord() {
  const saved = localStorage.getItem(storageKey());
  if (saved) {
    state = { ...state, ...JSON.parse(saved) };
    return;
  }
  state.entries = defaultEntries();
  state.allowances = [];
}

function saveCurrentRecord() {
  syncProfileFromInputs();
  localStorage.setItem(storageKey(), JSON.stringify(state));
}

function syncProfileFromInputs() {
  state.profile = {
    ...state.profile,
    name: els.teacherName.value.trim(),
    subject: els.subject.value.trim(),
    assignment: els.assignment.value.trim(),
    rankCode: els.rankCode.value.trim(),
    salaryLevel: els.salaryLevel.value.trim(),
    salaryCoeff: els.salaryCoeff.value.trim(),
    weeklyNorm: Number(els.weeklyNorm.value || 0)
  };
}

function setProfileInputs() {
  els.teacherName.value = state.profile.name || "";
  els.subject.value = state.profile.subject || "";
  els.assignment.value = state.profile.assignment || "";
  els.rankCode.value = state.profile.rankCode || "";
  els.salaryLevel.value = state.profile.salaryLevel || "";
  els.salaryCoeff.value = state.profile.salaryCoeff || "";
  els.weeklyNorm.value = state.profile.weeklyNorm || 0;
}

function numberValue(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function totalAllowanceReduction() {
  return state.allowances.reduce((sum, item) => sum + numberValue(item.periods), 0);
}

function calculate() {
  const weeklyNorm = numberValue(state.profile.weeklyNorm);
  const allowancePerWeek = totalAllowanceReduction();
  const rows = state.entries.map((entry) => {
    const active = entry.status === "teaching";
    const regular = active ? numberValue(entry.regular) : 0;
    const extra = active ? numberValue(entry.extra) : 0;
    const reduction = active ? numberValue(entry.reduction) + allowancePerWeek : 0;
    const actual = regular + extra;
    const norm = active ? weeklyNorm : 0;
    const remainingNorm = Math.max(norm - reduction, 0);
    const diff = actual - remainingNorm;
    return { ...entry, regular, extra, reduction, actual, norm, remainingNorm, diff };
  });

  const totals = rows.reduce(
    (acc, row) => {
      acc.actual += row.actual;
      acc.norm += row.norm;
      acc.reduction += row.reduction;
      acc.remainingNorm += row.remainingNorm;
      acc.diff += row.diff;
      return acc;
    },
    { actual: 0, norm: 0, reduction: 0, remainingNorm: 0, diff: 0 }
  );

  return { rows, totals };
}

function resultText(value) {
  if (value > 0) return `Thừa ${formatNumber(value)} tiết`;
  if (value < 0) return `Thiếu ${formatNumber(Math.abs(value))} tiết`;
  return "Không thừa, thiếu";
}

function formatNumber(value) {
  return Number(value.toFixed(2)).toLocaleString("vi-VN");
}

function statusLabel(status) {
  return {
    teaching: "Kê giờ",
    no_report: "Không kê giờ",
    holiday: "Nghỉ theo khung"
  }[status];
}

function renderAllowances() {
  els.allowanceList.innerHTML = "";
  state.allowances.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "allowance-row";
    row.innerHTML = `
      <input aria-label="Công tác kiêm nhiệm" value="${escapeAttr(item.name || "")}" placeholder="Chủ nhiệm, tổ trưởng..." />
      <input aria-label="Số tiết giảm" type="number" min="0" step="0.5" value="${escapeAttr(item.periods ?? "")}" />
      <button type="button" class="secondary" aria-label="Xóa">×</button>
    `;
    const [nameInput, periodInput, removeBtn] = row.children;
    nameInput.addEventListener("input", () => {
      state.allowances[index].name = nameInput.value;
      renderAll();
    });
    periodInput.addEventListener("input", () => {
      state.allowances[index].periods = periodInput.value;
      renderAll();
    });
    removeBtn.addEventListener("click", () => {
      state.allowances.splice(index, 1);
      renderAll();
    });
    els.allowanceList.appendChild(row);
  });
}

function renderWeeks() {
  const { rows } = calculate();
  els.weekRows.innerHTML = "";
  els.weekCountBadge.textContent = `${rows.length} dòng`;
  const teachingWeeks = rows.filter((row) => row.status === "teaching").length;
  els.weekHint.textContent = `${monthLabel(state.month)} có ${rows.length} dòng theo khung năm học; đang kê ${teachingWeeks} dòng.`;

  rows.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.className = row.status === "holiday" ? "status-holiday" : row.status === "no_report" ? "status-no-report" : "";
    const resultClass = row.diff < 0 ? "result-negative" : row.diff > 0 ? "result-positive" : "";
    tr.innerHTML = `
      <td>${row.n ? `Tuần ${row.n}` : "Nghỉ"}</td>
      <td>${formatDate(row.start)} - ${formatDate(row.end)}</td>
      <td>
        <select data-field="status">
          <option value="teaching"${row.status === "teaching" ? " selected" : ""}>Kê giờ</option>
          <option value="no_report"${row.status === "no_report" ? " selected" : ""}>Không kê giờ</option>
          <option value="holiday"${row.status === "holiday" ? " selected" : ""}>Nghỉ theo khung</option>
        </select>
      </td>
      <td><input class="wide-input" data-field="content" value="${escapeAttr(row.content || "")}" /></td>
      <td><input data-field="regular" type="number" min="0" step="0.5" value="${escapeAttr(row.regular || "")}" /></td>
      <td><input data-field="extra" type="number" min="0" step="0.5" value="${escapeAttr(row.extra || "")}" /></td>
      <td><input data-field="reduction" type="number" min="0" step="0.5" value="${escapeAttr(row.reduction || "")}" /></td>
      <td class="${resultClass}">${resultText(row.diff)}</td>
      <td><input class="note-input" data-field="note" value="${escapeAttr(row.note || "")}" /></td>
    `;
    tr.querySelectorAll("[data-field]").forEach((input) => {
      input.addEventListener("input", () => {
        state.entries[index][input.dataset.field] = input.value;
        if (input.dataset.field === "status" && input.value !== "teaching") {
          state.entries[index].regular = 0;
          state.entries[index].extra = 0;
        }
        renderAll();
      });
      input.addEventListener("change", () => {
        state.entries[index][input.dataset.field] = input.value;
        if (input.dataset.field === "status" && input.value !== "teaching") {
          state.entries[index].regular = 0;
          state.entries[index].extra = 0;
        }
        renderAll();
      });
    });
    els.weekRows.appendChild(tr);
  });
}

function renderSummary() {
  const { totals } = calculate();
  els.totalActual.textContent = formatNumber(totals.actual);
  els.totalRemainingNorm.textContent = formatNumber(totals.remainingNorm);
  els.totalResult.textContent = resultText(totals.diff);
}

function renderPreview() {
  const { rows, totals } = calculate();
  const [year, mm] = state.month.split("-");
  els.printTitle.textContent = `BẢNG KÊ CHI TIẾT XÁC ĐỊNH SỐ GIỜ THỪA-THIẾU THÁNG ${Number(mm)} NĂM ${year}`;
  els.printMeta.innerHTML = `
    <div><strong>Họ tên giáo viên:</strong> ${escapeHtml(state.profile.name)}</div>
    <div><strong>Môn:</strong> ${escapeHtml(state.profile.subject)}</div>
    <div><strong>Phân công lớp dạy:</strong> ${escapeHtml(state.profile.assignment)}</div>
    <div><strong>Mã ngạch:</strong> ${escapeHtml(state.profile.rankCode)} - <strong>Bậc:</strong> ${escapeHtml(state.profile.salaryLevel)} - <strong>HSL:</strong> ${escapeHtml(state.profile.salaryCoeff)}</div>
  `;
  els.previewTable.innerHTML = `
    <thead>
      <tr>
        <th>Thời gian</th>
        <th>Nội dung dạy</th>
        <th>Thực dạy</th>
        <th>Định mức</th>
        <th>Giảm</th>
        <th>Còn lại</th>
        <th>Thừa/thiếu</th>
        <th>Ghi chú</th>
      </tr>
    </thead>
    <tbody>
      ${rows
        .map(
          (row) => `
          <tr>
            <td>${row.n ? `Tuần ${row.n}<br>` : ""}${formatDate(row.start)} - ${formatDate(row.end)}</td>
            <td>${escapeHtml(row.content || statusLabel(row.status))}</td>
            <td>${formatNumber(row.actual)}</td>
            <td>${formatNumber(row.norm)}</td>
            <td>${formatNumber(row.reduction)}</td>
            <td>${formatNumber(row.remainingNorm)}</td>
            <td>${escapeHtml(resultText(row.diff))}</td>
            <td>${escapeHtml(row.note || "")}</td>
          </tr>`
        )
        .join("")}
      <tr>
        <th colspan="2">Cộng</th>
        <th>${formatNumber(totals.actual)}</th>
        <th>${formatNumber(totals.norm)}</th>
        <th>${formatNumber(totals.reduction)}</th>
        <th>${formatNumber(totals.remainingNorm)}</th>
        <th>${escapeHtml(resultText(totals.diff))}</th>
        <th></th>
      </tr>
    </tbody>
  `;
}

function renderAll() {
  syncProfileFromInputs();
  renderAllowances();
  renderWeeks();
  renderSummary();
  renderPreview();
}

function resetForSelection() {
  const teacher = teachers.find((item) => item.id === state.teacherId) || teachers[0];
  state.profile = { ...teacher };
  loadCurrentRecord();
  setProfileInputs();
  renderAll();
}

function exportExcel() {
  saveCurrentRecord();
  const html = `
    <html>
      <head><meta charset="utf-8" /></head>
      <body>${document.querySelector("#printArea").innerHTML}</body>
    </html>
  `;
  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ke-gio-${state.profile.name || "giao-vien"}-${state.month}.xls`.replace(/\s+/g, "-");
  a.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function init() {
  monthsFromWeeks().forEach((month) => {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = monthLabel(month);
    els.monthSelect.appendChild(option);
  });
  teachers.forEach((teacher) => {
    const option = document.createElement("option");
    option.value = teacher.id;
    option.textContent = teacher.name;
    els.teacherSelect.appendChild(option);
  });
  els.monthSelect.value = state.month;
  els.teacherSelect.value = state.teacherId;
  resetForSelection();

  els.monthSelect.addEventListener("change", () => {
    saveCurrentRecord();
    state.month = els.monthSelect.value;
    loadCurrentRecord();
    renderAll();
  });
  els.teacherSelect.addEventListener("change", () => {
    saveCurrentRecord();
    state.teacherId = els.teacherSelect.value;
    resetForSelection();
  });
  ["teacherName", "subject", "assignment", "rankCode", "salaryLevel", "salaryCoeff", "weeklyNorm"].forEach((key) => {
    els[key].addEventListener("input", renderAll);
  });
  document.querySelector("#addAllowance").addEventListener("click", () => {
    state.allowances.push({ name: "", periods: 0 });
    renderAll();
  });
  document.querySelector("#saveBtn").addEventListener("click", () => {
    saveCurrentRecord();
    alert("Đã lưu bảng kê trên trình duyệt này.");
  });
  document.querySelector("#printBtn").addEventListener("click", () => {
    saveCurrentRecord();
    window.print();
  });
  document.querySelector("#exportBtn").addEventListener("click", exportExcel);
}

init();
