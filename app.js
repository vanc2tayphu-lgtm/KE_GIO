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
        <colgroup>
          <col class="allowance-no">
          <col class="allowance-duty">
          <col class="allowance-from">
          <col class="allowance-to">
          <col class="allowance-periods">
          <col class="allowance-note">
        </colgroup>
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

async function exportExcel() {
  saveCurrentRecord();
  const blob = await buildXlsxBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ke-gio-${state.profile.name || "giao-vien"}-${state.month}.xlsx`.replace(/\s+/g, "-");
  a.click();
  URL.revokeObjectURL(url);
}

async function buildXlsxBlob() {
  const files = {
    "[Content_Types].xml": contentTypesXml(),
    "_rels/.rels": rootRelsXml(),
    "xl/workbook.xml": workbookXml(),
    "xl/_rels/workbook.xml.rels": workbookRelsXml(),
    "xl/styles.xml": stylesXml(),
    "xl/worksheets/sheet1.xml": worksheetXml()
  };
  return new Blob([zipFiles(files)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
}

function worksheetXml() {
  const { rows, totals } = calculate();
  const [year, mm] = state.month.split("-");
  const monthNumber = Number(mm);
  const lastDay = new Date(Number(year), monthNumber, 0);
  const totalExtra = rows.reduce((sum, row) => sum + row.extra, 0);
  const totalRegular = totals.actual - totalExtra;
  const totalSurplus = rows.reduce((sum, row) => sum + Math.max(row.diff, 0), 0);
  const totalShortage = rows.reduce((sum, row) => sum + Math.max(-row.diff, 0), 0);
  const signedTotal = totals.diff > 0 ? `+${formatNumber(totals.diff)}` : totals.diff < 0 ? `-${formatNumber(Math.abs(totals.diff))}` : "0";
  const signatureSurplus = totalSurplus ? `+${formatNumber(totalSurplus)}` : "0";
  const signatureShortage = totalShortage ? `-${formatNumber(totalShortage)}` : "0";
  const activeRows = rows.slice(0, 5);
  const weekStarts = [20, 24, 28, 32, 36];
  const cells = new Map();

  const set = (addr, value, style = 0) => cells.set(addr, { value, style });
  const setN = (addr, value, style = 0) => cells.set(addr, { value, style, type: "n" });
  const setStyle = (addr, style) => {
    const cell = cells.get(addr) || { value: "" };
    cell.style = style;
    cells.set(addr, cell);
  };
  const styleRange = (ref, style) => {
    const [start, end] = ref.split(":");
    const a = parseCellRef(start);
    const b = parseCellRef(end || start);
    for (let row = a.row; row <= b.row; row += 1) {
      for (let col = a.col; col <= b.col; col += 1) {
        setStyle(`${colName(col)}${row}`, style);
      }
    }
  };

  set("A1", "UBND XÃ TÂY PHÚ", 1);
  set("G1", "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", 2);
  set("A2", "TRƯỜNG THCS TÂY PHÚ", 2);
  set("G2", "Độc lập - Tự do - Hạnh phúc", 3);
  set("A4", `BẢNG KÊ CHI TIẾT \nXÁC ĐỊNH SỐ GIỜ THỪA-THIẾU THÁNG ${String(monthNumber).padStart(2, "0")} NĂM ${year}`, 4);

  set("A6", "Họ tên giáo viên :      ", 5);
  set("D6", state.profile.name, 6);
  set("J6", "Môn :", 5);
  set("K6", state.profile.subject, 6);
  set("A7", "Phân công lớp dạy (cột 3) :", 5);
  set("E7", state.profile.assignment, 5);
  set("L7", "Tổng số tiết dạy :", 5);
  setN("N7", activeRows[0]?.regular || 0, 5);
  set("A8", "Kiêm nhiệm :  (cột 7)", 5);

  set("B9", "TT", 7);
  set("C9", "Công tác kiêm nhiệm", 7);
  set("J9", "Thời gian hưởng", 7);
  set("L9", "Số tiết", 7);
  set("M9", "Ghi chú \n(Kèm QĐ, chứng từ...)", 7);
  set("J10", "Từ...", 7);
  set("K10", "đến....", 7);
  const allowances = [...state.allowances, {}, {}, {}].slice(0, 3);
  allowances.forEach((item, i) => {
    const r = 11 + i;
    setN(`B${r}`, i + 1, 8);
    set(`C${r}`, item.name || (i === 2 ? "............" : ""), 8);
    set(`L${r}`, item.periods ? numberValue(item.periods) : "", 8);
  });
  set("C14", "Cộng", 8);
  set("L14", totalAllowanceReduction() || "", 8);

  set("A15", "Mã ngạch :", 5);
  set("C15", state.profile.rankCode, 5);
  set("G15", "Bậc :", 5);
  set("H15", state.profile.salaryLevel, 5);
  set("I15", "HSL-cơ bản :", 5);
  set("K15", state.profile.salaryCoeff, 5);
  set("L15", "Phụ cấp chức vụ :", 5);
  set("A16", "Qui định :", 5);
  setN("B16", numberValue(state.profile.weeklyNorm), 5);
  set("C16", "tiết/ tuần", 5);

  set("A17", "Thời gian", 9);
  set("B17", "Dạy thường xuyên ( dạy đột xuất : dạy thay ai , lớp , tiết , ngày,ghi nơi cột đột xuất )", 9);
  set("G17", "Tổng số tiết thực dạy", 9);
  set("J17", "Số tiết định mức", 9);
  set("K17", "Số tiết được giảm định mức", 9);
  set("L17", "Số tiết định mức còn lại", 9);
  set("M17", "Số tiết thừa , thiếu", 9);
  set("G18", "Thường xuyên", 9);
  set("H18", "Dạy đột xuất", 9);
  set("I18", "Cộng", 9);
  set("M18", "Thừa", 9);
  set("N18", "Thiếu", 9);
  ["(1)", "(2)", "", "", "", "", "(3)", "(4)", "(5)", "(6)", "(7)", "(8)", "(9)", "(10)"].forEach((v, i) => set(`${colName(i + 1)}19`, v, 10));

  weekStarts.forEach((start, index) => {
    const row = activeRows[index];
    const blank = !row;
    const label = row ? `${row.n ? `Tuần ${row.n}` : "Nghỉ"}\nTừ ${formatShortDate(row.start)}\nĐến ${formatShortDate(row.end)}` : "";
    set(`A${start}`, label, 11);
    set(`B${start}`, row ? (row.status === "teaching" ? row.content : statusLabel(row.status)) : "", 12);
    set(`B${start + 1}`, "", 13);
    set(`B${start + 2}`, "", 13);
    set(`B${start + 3}`, "", 14);
    if (!blank) {
      setN(`G${start}`, row.regular || "", 15);
      setN(`H${start}`, row.extra || "", 15);
      setN(`I${start}`, row.actual || "", 15);
      setN(`J${start}`, row.norm || "", 15);
      setN(`K${start}`, row.reduction || "", 15);
      setN(`L${start}`, row.remainingNorm || "", 15);
      setN(`M${start}`, Math.max(row.diff, 0) || "", 15);
      setN(`N${start}`, Math.max(-row.diff, 0) || "", 15);
    }
  });

  set("A40", "       CỘNG", 16);
  setN("G40", totalRegular, 16);
  setN("H40", totalExtra, 16);
  setN("I40", totals.actual, 16);
  setN("J40", totals.norm, 16);
  setN("K40", totals.reduction, 16);
  setN("L40", totals.remainingNorm, 16);
  setN("M40", totalSurplus, 16);
  setN("N40", totalShortage, 16);
  set("A41", " Tổng số tiết thừa, thiếu :  ", 17);
  set("E41", signedTotal, 17);
  set("G41", "Bằng chữ:", 18);
  set("I41", resultText(totals.diff), 17);

  set("A45", "Thời khóa biểu", 2);
  set("A46", "Sáng", 19);
  set("H46", "Chiều", 19);
  ["Tiết", "1", "2", "3", "4", "5", "Cộng", "Tiết", "1", "2", "3", "4", "5", "Cộng"].forEach((v, i) => set(`${colName(i + 1)}47`, v, 19));
  ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"].forEach((day, i) => {
    const r = 48 + i;
    set(`A${r}`, day, 20);
    set(`H${r}`, day, 20);
  });
  set("J54", `Thoại Sơn, ngày ${String(lastDay.getDate()).padStart(2, "0")} tháng ${String(monthNumber).padStart(2, "0")} năm ${year}`, 21);
  set("A55", "   Duyệt Ban Giám hiệu", 2);
  set("F55", "Xác nhận tổ trưởng", 2);
  set("J55", "Người dạy", 2);
  set("A56", "PHÓ HIỆU TRƯỞNG", 2);
  set("F56", `Thừa: ${signatureSurplus}`, 5);
  set("H56", ",Thiếu:", 5);
  set("I56", signatureShortage, 5);
  set("A61", "Lê Văn Cường", 2);
  set("F61", "Lê Thị Mỹ Phụng", 2);
  set("J61", state.profile.name, 2);
  set("A73", "Ghi chú :", 22);
  set("A74", "- GV phải kê khai đầy đủ các thông tin trong bảng kê, nếu có dạy thay ai hoặc dạy bù phải ghi bên cột đột xuất (cột 4) và ghi đầy đủ thông tin diễn giải (cột 2), Thời khóa biểu phải khoanh tròn tiết dạy thay hoặc dạy bù đó.", 23);
  set("A75", "- Tất cả GV đều phải kê khai giờ buổi.", 23);
  set("A76", "- Các chức danh mà giáo viên kiêm nhiệm được giảm định mức tiết dạy hoặc quy đổi thành tiết dạy được quy định tại thông tư 05/2005/TT-BGDĐT, ngày 07/03/2025, phải kèm theo minh chứng (quyết định, chứng từ... hợp pháp). Các chức danh mà giáo viên kiêm nhiệm không được quy", 23);
  set("A77", "- BGH, Tổ trưởng có trách nhiệm kiểm tra việc kê khai của GV.", 23);
  set("A78", '- Số tiết thừa phải ghi dấu "+" phía trước, số tiết thiếu phải ghi dấu "-" phía trước.', 23);
  set("A79", "- Cột (5) = cột (3) + cột (4); cột (8) = cột (6) - cột (7); cột (9) = cột (5) - cột (8); cột (10) = cột (5) - cột (8).", 23);

  styleRange("B9:N10", 7);
  styleRange("B11:N14", 8);
  styleRange("A17:N18", 9);
  styleRange("A19:N19", 10);
  weekStarts.forEach((start) => {
    styleRange(`A${start}:N${start + 3}`, 15);
    styleRange(`A${start}:A${start + 3}`, 11);
    styleRange(`B${start}:F${start}`, 12);
    styleRange(`B${start + 1}:F${start + 2}`, 13);
    styleRange(`B${start + 3}:F${start + 3}`, 14);
  });
  styleRange("A40:N40", 16);
  styleRange("A46:N47", 19);
  styleRange("A48:N53", 20);

  const rowHeights = {
    1: 16.8, 2: 17.25, 3: 12.75, 4: 18.75, 5: 23.25, 6: 24.75, 7: 20.55, 8: 22.95, 9: 15.75, 10: 29.25,
    15: 16.5, 16: 17.25, 17: 21.75, 18: 42, 40: 16.5, 41: 18.75, 42: 18.75, 43: 18.75, 44: 13.5,
    55: 17.25, 56: 17.25, 61: 17.25, 74: 35.25, 75: 15.45, 76: 66.75, 78: 18.75, 79: 15.45
  };
  for (let r = 20; r <= 39; r += 1) rowHeights[r] = 13.05;

  const sheetData = Array.from({ length: 79 }, (_, i) => {
    const r = i + 1;
    const rowCells = [];
    for (let c = 1; c <= 14; c += 1) {
      const addr = `${colName(c)}${r}`;
      if (cells.has(addr)) rowCells.push(cellXml(addr, cells.get(addr)));
    }
    const attrs = rowHeights[r] ? ` r="${r}" ht="${rowHeights[r]}" customHeight="1"` : ` r="${r}"`;
    return `<row${attrs}>${rowCells.join("")}</row>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetPr><pageSetUpPr fitToPage="1"/></sheetPr>
  <dimension ref="A1:N79"/>
  <sheetViews><sheetView workbookViewId="0"/></sheetViews>
  <sheetFormatPr defaultRowHeight="15"/>
  <cols>${[8.7265625,4.7265625,13,5.26953125,4.81640625,6.1796875,7,7.453125,5.7265625,9.5,9.5,7.453125,6.7265625,9.5]
    .map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols>
  <sheetData>${sheetData}</sheetData>
  <mergeCells count="${xlsxMerges().length}">${xlsxMerges().map((ref) => `<mergeCell ref="${ref}"/>`).join("")}</mergeCells>
  <printOptions horizontalCentered="0" verticalCentered="0"/>
  <pageMargins left="0.62" right="0.21" top="0.59" bottom="0.5" header="0.47" footer="0.38"/>
  <pageSetup paperSize="1" orientation="portrait" fitToWidth="1" fitToHeight="2"/>
  <rowBreaks count="1" manualBreakCount="1"><brk id="43" max="16383" man="1"/></rowBreaks>
</worksheet>`;
}

function xlsxMerges() {
  return [
    "A1:E1", "G1:N1", "A2:E2", "G2:N2", "A4:N5", "D6:I6", "K6:N6", "E7:K7", "L7:M7",
    "B9:B10", "C9:I10", "J9:K9", "M9:N10", "C11:I11", "M11:N11", "C12:I12", "M12:N12", "C13:I13", "M13:N13", "C14:I14", "M14:N14",
    "C15:E15", "L15:M15", "C16:F16", "A17:A18", "B17:F18", "G17:I17", "J17:J18", "K17:K18", "L17:L18", "M17:N17", "B19:F19",
    "A20:A23", "B20:F20", "B21:F21", "B22:F22", "B23:F23", "G20:G23", "H20:H23", "I20:I23", "J20:J23", "K20:K23", "L20:L23", "M20:M23", "N20:N23",
    "A24:A27", "B24:F24", "B25:F25", "B26:F26", "B27:F27", "G24:G27", "H24:H27", "I24:I27", "J24:J27", "K24:K27", "L24:L27", "M24:M27", "N24:N27",
    "A28:A31", "B28:F28", "B29:F29", "B30:F30", "B31:F31", "G28:G31", "H28:H31", "I28:I31", "J28:J31", "K28:K31", "L28:L31", "M28:M31", "N28:N31",
    "A32:A35", "B32:F32", "B33:F33", "B34:F34", "B35:F35", "G32:G35", "H32:H35", "I32:I35", "J32:J35", "K32:K35", "L32:L35", "M32:M35", "N32:N35",
    "A36:A39", "B36:F36", "B37:F37", "B38:F38", "B39:F39", "G36:G39", "H36:H39", "I36:I39", "J36:J39", "K36:K39", "L36:L39", "M36:M39", "N36:N39",
    "A40:F40", "G41:H41", "I41:N41", "A44:N44", "A45:N45", "A46:G46", "H46:N46", "J54:N54", "A55:E55", "F55:I55", "J55:N55", "A56:E56", "F56:G56", "J56:N56", "A61:E61", "F61:I61", "J61:N61",
    "A73:N73", "A74:N74", "A75:N75", "A76:N76", "A77:N77", "A78:N78", "A79:N79"
  ];
}

function cellXml(addr, cell) {
  const style = cell.style ? ` s="${cell.style}"` : "";
  if (cell.value === "" || cell.value === null || cell.value === undefined) return `<c r="${addr}"${style}/>`;
  if (cell.type === "n" && cell.value !== "") return `<c r="${addr}"${style}><v>${Number(cell.value)}</v></c>`;
  return `<c r="${addr}" t="inlineStr"${style}><is><t xml:space="preserve">${escapeXml(String(cell.value))}</t></is></c>`;
}

function colName(index) {
  let name = "";
  let n = index;
  while (n > 0) {
    const rem = (n - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    n = Math.floor((n - 1) / 26);
  }
  return name;
}

function parseCellRef(ref) {
  const match = /^([A-Z]+)(\d+)$/.exec(ref);
  if (!match) throw new Error(`Invalid cell reference: ${ref}`);
  const col = [...match[1]].reduce((sum, ch) => sum * 26 + ch.charCodeAt(0) - 64, 0);
  return { col, row: Number(match[2]) };
}

function stylesXml() {
  const fonts = [
    `<font><sz val="11"/><name val="Times New Roman"/></font>`,
    `<font><b/><sz val="12"/><name val="Times New Roman"/></font>`,
    `<font><b/><sz val="14"/><name val="Times New Roman"/></font>`,
    `<font><sz val="12"/><name val="Times New Roman"/></font>`,
    `<font><b/><i/><sz val="10"/><name val="Times New Roman"/></font>`,
    `<font><b/><sz val="10"/><name val="Times New Roman"/></font>`,
    `<font><sz val="10"/><name val="Times New Roman"/></font>`
  ];
  const borders = [
    `<border><left/><right/><top/><bottom/><diagonal/></border>`,
    borderXml("thin"),
    borderXml("medium"),
    borderXml("thin", "thin", "medium", "dashed"),
    borderXml("thin", "thin", "dashed", "dashed"),
    borderXml("thin", "thin", "dashed", "medium"),
    borderXml("medium")
  ];
  const xf = (fontId, borderId = 0, align = "") => `<xf numFmtId="0" fontId="${fontId}" fillId="0" borderId="${borderId}" xfId="0" applyFont="1" applyBorder="${borderId ? 1 : 0}" applyAlignment="${align ? 1 : 0}">${align}</xf>`;
  const center = `<alignment horizontal="center" vertical="center"/>`;
  const centerWrap = `<alignment horizontal="center" vertical="center" wrapText="1"/>`;
  const left = `<alignment horizontal="left" vertical="center"/>`;
  const justifyWrap = `<alignment horizontal="left" vertical="justify" wrapText="1"/>`;
  const cellXfs = [
    xf(0),
    xf(3, 0, center),
    xf(1, 0, center),
    xf(1, 0, `<alignment horizontal="center"/><protection/>`),
    xf(2, 0, `<alignment horizontal="center" wrapText="1"/>`),
    xf(3, 0, left),
    xf(0, 0, center),
    xf(0, 1, centerWrap),
    xf(0, 1, center),
    xf(5, 1, centerWrap),
    xf(5, 1, center),
    xf(6, 6, centerWrap),
    xf(6, 3, centerWrap),
    xf(6, 4, centerWrap),
    xf(6, 5, centerWrap),
    xf(3, 2, center),
    xf(5, 2, center),
    xf(3, 0, center),
    xf(1, 0, center),
    xf(1, 1, center),
    xf(3, 1, left),
    xf(3, 0, `<alignment horizontal="center"/><protection/>`),
    xf(4, 0, left),
    xf(3, 0, justifyWrap)
  ];
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="${fonts.length}">${fonts.join("")}</fonts>
  <fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>
  <borders count="${borders.length}">${borders.join("")}</borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="${cellXfs.length}">${cellXfs.join("")}</cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
  <dxfs count="0"/>
  <tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleLight16"/>
</styleSheet>`;
}

function borderXml(style, right = style, top = style, bottom = style) {
  const side = (s) => s ? `<color auto="1"/>` : "";
  return `<border><left style="${style}">${side(style)}</left><right style="${right}">${side(right)}</right><top style="${top}">${side(top)}</top><bottom style="${bottom}">${side(bottom)}</bottom><diagonal/></border>`;
}

function workbookXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <bookViews><workbookView xWindow="0" yWindow="0" windowWidth="16000" windowHeight="9000"/></bookViews>
  <sheets><sheet name="Bảng kê" sheetId="1" r:id="rId1"/></sheets>
</workbook>`;
}

function workbookRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
}

function rootRelsXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;
}

function contentTypesXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;
}

function zipFiles(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;
  Object.entries(files).forEach(([name, text]) => {
    const nameBytes = encoder.encode(name.replaceAll("\\", "/"));
    const data = encoder.encode(text);
    const crc = crc32(data);
    const local = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(local.buffer);
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 20, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, 0, true);
    view.setUint16(12, 0, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, data.length, true);
    view.setUint32(22, data.length, true);
    view.setUint16(26, nameBytes.length, true);
    local.set(nameBytes, 30);
    chunks.push(local, data);

    const cd = new Uint8Array(46 + nameBytes.length);
    const cdv = new DataView(cd.buffer);
    cdv.setUint32(0, 0x02014b50, true);
    cdv.setUint16(4, 20, true);
    cdv.setUint16(6, 20, true);
    cdv.setUint16(8, 0, true);
    cdv.setUint16(10, 0, true);
    cdv.setUint16(12, 0, true);
    cdv.setUint16(14, 0, true);
    cdv.setUint32(16, crc, true);
    cdv.setUint32(20, data.length, true);
    cdv.setUint32(24, data.length, true);
    cdv.setUint16(28, nameBytes.length, true);
    cdv.setUint32(42, offset, true);
    cd.set(nameBytes, 46);
    central.push(cd);
    offset += local.length + data.length;
  });
  const centralOffset = offset;
  const centralSize = central.reduce((sum, item) => sum + item.length, 0);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, central.length, true);
  endView.setUint16(10, central.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, centralOffset, true);
  return new Blob([...chunks, ...central, end]);
}

function crc32(bytes) {
  let crc = -1;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
})();

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

window.__keGio = {
  buildXlsxBlob,
  exportExcel
};

init();
