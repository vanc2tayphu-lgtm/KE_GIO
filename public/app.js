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
  printArea: document.querySelector("#printArea")
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

function formatShortDate(value) {
  const d = dateOnly(value);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
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
  const monthNumber = Number(mm);
  const lastDay = new Date(Number(year), monthNumber, 0);
  const totalSurplus = rows.reduce((sum, row) => sum + Math.max(row.diff, 0), 0);
  const totalShortage = rows.reduce((sum, row) => sum + Math.max(-row.diff, 0), 0);
  const signedTotal = totals.diff > 0 ? `+${formatNumber(totals.diff)}` : totals.diff < 0 ? `-${formatNumber(Math.abs(totals.diff))}` : "0";
  const signatureSurplus = totalSurplus ? `+${formatNumber(totalSurplus)}` : "0";
  const signatureShortage = totalShortage ? `-${formatNumber(totalShortage)}` : "0";
  const totalText = resultText(totals.diff);
  const allowances = [...state.allowances, {}, {}, {}].slice(0, 3);

  els.printArea.innerHTML = `
    <div class="print-page page-one">
      <div class="mau-header">
        <div>
          <p>UBND XÃ TÂY PHÚ</p>
          <strong>TRƯỜNG THCS TÂY PHÚ</strong>
        </div>
        <div>
          <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
          <p class="underline">Độc lập - Tự do - Hạnh phúc</p>
        </div>
      </div>

      <div class="mau-title">
        <strong>BẢNG KÊ CHI TIẾT</strong>
        <strong>XÁC ĐỊNH SỐ GIỜ THỪA-THIẾU THÁNG ${String(monthNumber).padStart(2, "0")} NĂM ${year}</strong>
      </div>

      <div class="mau-meta">
        <span>Họ tên giáo viên :</span><strong>${escapeHtml(state.profile.name)}</strong>
        <span>Môn :</span><strong>${escapeHtml(state.profile.subject)}</strong>
        <span>Phân công lớp dạy (cột 3) :</span><span>${escapeHtml(state.profile.assignment)}</span>
        <span>Tổng số tiết dạy :</span><span>${formatNumber(rows[0]?.regular || 0)}</span>
      </div>

      <div class="mau-line">Kiêm nhiệm : (cột 7)</div>
      <table class="mau-table allowance-table">
        <thead>
          <tr>
            <th rowspan="2">TT</th>
            <th rowspan="2">Công tác kiêm nhiệm</th>
            <th colspan="2">Thời gian hưởng</th>
            <th rowspan="2">Số tiết</th>
            <th rowspan="2">Ghi chú<br>(Kèm QĐ, chứng từ...)</th>
          </tr>
          <tr>
            <th>Từ...</th>
            <th>đến....</th>
          </tr>
        </thead>
        <tbody>
          ${allowances
            .map(
              (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${escapeHtml(item.name || (index === 2 ? "............" : ""))}</td>
                  <td></td>
                  <td></td>
                  <td>${item.periods ? formatNumber(numberValue(item.periods)) : ""}</td>
                  <td></td>
                </tr>`
            )
            .join("")}
          <tr>
            <td></td>
            <td>Cộng</td>
            <td></td>
            <td></td>
            <td>${totalAllowanceReduction() ? formatNumber(totalAllowanceReduction()) : ""}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div class="mau-rank">
        <span>Mã ngạch :</span><span>${escapeHtml(state.profile.rankCode)}</span>
        <span>Bậc :</span><span>${escapeHtml(state.profile.salaryLevel)}</span>
        <span>HSL-cơ bản :</span><span>${escapeHtml(state.profile.salaryCoeff)}</span>
        <span>Phụ cấp chức vụ :</span><span></span>
      </div>
      <div class="mau-line">Qui định : <strong>${formatNumber(numberValue(state.profile.weeklyNorm))}</strong>&nbsp; tiết/ tuần</div>

      <table class="mau-table main-report-table">
        <thead>
          <tr>
            <th rowspan="2">Thời gian</th>
            <th rowspan="2">Dạy thường xuyên ( dạy đột xuất : dạy thay ai , lớp , tiết , ngày,ghi nơi cột đột xuất )</th>
            <th colspan="3">Tổng số tiết thực dạy</th>
            <th rowspan="2">Số tiết định mức</th>
            <th rowspan="2">Số tiết được giảm định mức</th>
            <th rowspan="2">Số tiết định mức còn lại</th>
            <th colspan="2">Số tiết thừa , thiếu</th>
          </tr>
          <tr>
            <th>Thường xuyên</th>
            <th>Dạy đột xuất</th>
            <th>Cộng</th>
            <th>Thừa</th>
            <th>Thiếu</th>
          </tr>
          <tr class="col-numbers">
            <th>(1)</th><th>(2)</th><th>(3)</th><th>(4)</th><th>(5)</th><th>(6)</th><th>(7)</th><th>(8)</th><th>(9)</th><th>(10)</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => reportRowHtml(row)).join("")}
          <tr class="total-row">
            <td colspan="2">CỘNG</td>
            <td>${formatNumber(totals.actual - rows.reduce((s, row) => s + row.extra, 0))}</td>
            <td>${formatNumber(rows.reduce((s, row) => s + row.extra, 0))}</td>
            <td>${formatNumber(totals.actual)}</td>
            <td>${formatNumber(totals.norm)}</td>
            <td>${formatNumber(totals.reduction)}</td>
            <td>${formatNumber(totals.remainingNorm)}</td>
            <td>${formatNumber(totalSurplus)}</td>
            <td>${formatNumber(totalShortage)}</td>
          </tr>
        </tbody>
      </table>

      <div class="mau-total">
        <strong>Tổng số tiết thừa, thiếu :</strong>
        <span>${signedTotal}</span>
        <strong>Bằng chữ:</strong>
        <span>${escapeHtml(totalText)}</span>
      </div>
    </div>

    <div class="print-page page-two">
      <h3>Thời khóa biểu</h3>
      ${scheduleTableHtml()}
      <p class="date-line">Thoại Sơn, ngày ${String(lastDay.getDate()).padStart(2, "0")} tháng ${String(monthNumber).padStart(2, "0")} năm ${year}</p>
      <div class="signature-grid">
        <div>
          <strong>Duyệt Ban Giám hiệu</strong>
          <strong>PHÓ HIỆU TRƯỞNG</strong>
          <strong class="signature-name">Lê Văn Cường</strong>
        </div>
        <div>
          <strong>Xác nhận tổ trưởng</strong>
          <span>Thừa: ${signatureSurplus}, Thiếu: ${signatureShortage}</span>
          <strong class="signature-name">Lê Thị Mỹ Phụng</strong>
        </div>
        <div>
          <strong>Người dạy</strong>
          <strong class="signature-name">${escapeHtml(state.profile.name)}</strong>
        </div>
      </div>
      <div class="notes">
        <strong><em><u>Ghi chú :</u></em></strong>
        <p>- GV phải kê khai đầy đủ các thông tin trong bảng kê, nếu có dạy thay ai hoặc dạy bù phải ghi bên cột đột xuất (cột 4) và ghi đầy đủ thông tin diễn giải (cột 2), Thời khóa biểu phải khoanh tròn tiết dạy thay hoặc dạy bù đó.</p>
        <p>- Tất cả GV đều phải kê khai giờ buổi.</p>
        <p>- Các chức danh mà giáo viên kiêm nhiệm được giảm định mức tiết dạy hoặc quy đổi thành tiết dạy được quy định tại thông tư 05/2005/TT-BGDĐT, ngày 07/03/2025, phải kèm theo minh chứng (quyết định, chứng từ... hợp pháp). Các chức danh mà giáo viên kiêm nhiệm không được quy</p>
        <p>- BGH, Tổ trưởng có trách nhiệm kiểm tra việc kê khai của GV.</p>
        <p>- Số tiết thừa phải ghi dấu "+" phía trước, số tiết thiếu phải ghi dấu "-" phía trước.</p>
        <p>- Cột (5) = cột (3) + cột (4); cột (8) = cột (6) - cột (7); cột (9) = cột (5) - cột (8); cột (10) = cột (5) - cột (8).</p>
      </div>
    </div>
  `;
}

function reportRowHtml(row) {
  const content = row.status === "teaching" ? row.content : statusLabel(row.status);
  const surplus = Math.max(row.diff, 0);
  const shortage = Math.max(-row.diff, 0);
  return `
    <tr class="week-report-row">
      <td>
        ${row.n ? `Tuần ${row.n}<br>` : "Nghỉ<br>"}
        Từ ${formatShortDate(row.start)}<br>
        Đến ${formatShortDate(row.end)}
      </td>
      <td class="lesson-cell">
        <div>${escapeHtml(content || "")}</div>
        <div class="dotted-line"></div>
        <div class="dotted-line"></div>
        <div class="dotted-line"></div>
      </td>
      <td>${row.regular ? formatNumber(row.regular) : ""}</td>
      <td>${row.extra ? formatNumber(row.extra) : ""}</td>
      <td>${row.actual ? formatNumber(row.actual) : ""}</td>
      <td>${row.norm ? formatNumber(row.norm) : ""}</td>
      <td>${row.reduction ? formatNumber(row.reduction) : ""}</td>
      <td>${row.remainingNorm ? formatNumber(row.remainingNorm) : ""}</td>
      <td>${surplus ? formatNumber(surplus) : ""}</td>
      <td>${shortage ? formatNumber(shortage) : ""}</td>
    </tr>
  `;
}

function scheduleTableHtml() {
  const days = ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const dayRows = days
    .map(
      (day) => `
        <tr>
          <td>${day}</td><td></td><td></td><td></td><td></td><td></td><td></td>
          <td>${day}</td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>`
    )
    .join("");
  return `
    <table class="mau-table schedule-table">
      <thead>
        <tr><th colspan="7">Sáng</th><th colspan="7">Chiều</th></tr>
        <tr>
          <th>Tiết</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>Cộng</th>
          <th>Tiết</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>Cộng</th>
        </tr>
      </thead>
      <tbody>${dayRows}</tbody>
    </table>
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
      <head><meta charset="utf-8" /><style>${exportStyles()}</style></head>
      <body class="excel-export">${document.querySelector("#printArea").innerHTML}</body>
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

function exportStyles() {
  return `
    body { font-family: "Times New Roman", Times, serif; color: #000; }
    .print-page { page-break-after: always; width: 8.5in; padding: .45in; }
    .mau-header, .signature-grid { display: grid; grid-template-columns: repeat(2, 1fr); text-align: center; }
    .signature-grid { grid-template-columns: repeat(3, 1fr); }
    .mau-title { text-align: center; font-size: 20px; font-weight: bold; }
    .mau-meta, .mau-rank, .mau-total { display: grid; gap: 8px; }
    table { border-collapse: collapse; width: 100%; table-layout: fixed; }
    th, td { border: 1px solid #000; text-align: center; vertical-align: middle; padding: 3px; }
    th { font-weight: bold; }
    .notes { font-size: 14px; line-height: 1.35; }
  `;
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
