const SHEET_NAME = "Tong hop ke gio";
const TEACHER_SHEET_NAME = "Danh sach giao vien";
const ADMIN_EMAIL = "phdungvt@gmail.com";
const MONTHS = [
  "2025-09", "2025-10", "2025-11", "2025-12", "2026-01",
  "2026-02", "2026-03", "2026-04", "2026-05"
];
const TEACHER_HEADERS = ["Ma GV", "Ho ten GV", "Mon", "Email", "Ma bao mat"];
const TEACHER_SEED_NAMES = [
  "Nguyễn Duy Hoài", "Đinh Thị Oanh", "Nguyễn Thị Quyên", "Võ Thị Kiều Tiên",
  "Hồ Minh Triều", "Hồ Ngọc Đệ", "Tô Thị Thùy Dung", "Võ Thị Kim Nga",
  "Hà Thị Hoàng Oanh", "Lê Thị Mỹ Phụng", "Nguyễn Thị Thanh Vân", "Trần Thị Vân",
  "Trần Thị Thu Hồ", "Trương Thị Kim Liễu", "Lê Thị Xuân Mai", "Nguyễn Ánh Nguyệt",
  "Lê Thị Ngọc Giàu", "Võ Văn Hà", "Nguyễn Thị Thu Hà", "Nguyễn Thị Phước Hoài",
  "Châu Thị Cẩm Hồng", "Võ Thị Út Thuỷ", "Nguyễn Thị Bích Tuyền", "Lê Văn Cường",
  "Nguyễn Thị Tú Huyên", "Võ Văn Tuấn Nhỏ", "Lê Văn Phúc", "Trần Hưng Việt",
  "Nguyễn Thái Thị Thu An", "Nguyễn Thị Nhựt Băng", "Võ Thị Lợi", "Dương Văn Nghiêm",
  "Trịnh Thị Nhung", "Thcs Tây Phú", "Phạm Phú Phúc", "Trương Thanh Phương",
  "Bùi Lê Phạm Thị Diễm Phương", "Lê Thành Thạo", "Nguyễn Sỹ Tuấn"
];
const TEACHER_EMAILS = {
  "Hồ Minh Triều": "c2tayphuts_trieu@angiang.edu.vn",
  "Lê Văn Cường": "c2tayphuts_cuong@angiang.edu.vn",
  "Nguyễn Duy Hoài": "c2tayphuts_hoai@angiang.edu.vn",
  "Lê Thị Xuân Mai": "c2tayphuts_mai@angiang.edu.vn",
  "Nguyễn Ánh Nguyệt": "c2tayphuts_nguyet@angiang.edu.vn",
  "Trương Thị Kim Liễu": "c2tayphuts_lieu@angiang.edu.vn",
  "Trần Thị Thu Hồ": "c2tayphuts_ho@angiang.edu.vn",
  "Nguyễn Thị Thanh Vân": "c2tayphuts_van@angiang.edu.vn",
  "Trần Thị Vân": "c2tayphuts_thivan@angiang.edu.vn",
  "Võ Thị Kim Nga": "c2tayphuts_nga@angiang.edu.vn",
  "Đinh Thị Oanh": "c2tayphuts_oanh@angiang.edu.vn",
  "Hồ Ngọc Đệ": "c2tayphuts_de@angiang.edu.vn",
  "Võ Thị Kiều Tiên": "c2tayphuts_ktien@angiang.edu.vn",
  "Nguyễn Thị Quyên": "c2tayphuts_quyen@angiang.edu.vn",
  "Võ Văn Hà": "c2tayphuts_ha@angiang.edu.vn",
  "Nguyễn Thị Thu Hà": "c2tayphuts_thuha@angiang.edu.vn",
  "Võ Thị Út Thuỷ": "c2tayphuts_thuy@angiang.edu.vn",
  "Châu Thị Cẩm Hồng": "c2tayphuts_hong@angiang.edu.vn",
  "Nguyễn Thị Bích Tuyền": "c2tayphuts_tuyen@angiang.edu.vn",
  "Nguyễn Thị Phước Hoài": "c2tayphuts_phuochoai@angiang.edu.vn",
  "Lê Thị Ngọc Giàu": "c2tayphuts_giau@angiang.edu.vn",
  "Trần Hưng Việt": "c2tayphuts_viet@angiang.edu.vn",
  "Lê Văn Phúc": "c2tayphuts_phuc@angiang.edu.vn",
  "Nguyễn Thị Tú Huyên": "c2tayphuts_huyen@angiang.edu.vn",
  "Võ Văn Tuấn Nhỏ": "c2tayphuts_nho@angiang.edu.vn"
};

const HEADER_ROWS = 2;
const DATA_START_ROW = HEADER_ROWS + 1;
const FIRST_MONTH_COL = 4;
const VISIBLE_COLS = FIRST_MONTH_COL - 1 + MONTHS.length * 3;
const TEACHER_KEY_COL = VISIBLE_COLS + 1;
const UPDATED_AT_COL = VISIBLE_COLS + 2;

function setupAuthorization() {
  ensureTeacherDirectory_();
  getSummarySheet_();
  MailApp.getRemainingDailyQuota();
  return "OK - Đã sẵn sàng cấp quyền gửi mail";
}

function doPost(e) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    return json_(handleAction_(payload));
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const result = handleAction_(params);
    return params.callback ? jsonp_(params.callback, result) : json_(result);
  } catch (error) {
    const params = e && e.parameter ? e.parameter : {};
    const result = { ok: false, error: error.message };
    return params.callback ? jsonp_(params.callback, result) : json_(result);
  }
}

function handleAction_(payload) {
  if (!payload.action) {
    const sheet = getSummarySheet_();
    ensureSheetLayout_(sheet);
    ensureTeacherDirectory_();
    return { ok: true, sheetName: SHEET_NAME };
  }
  if (payload.action === "teachers") return teachersResponse_();
  if (payload.action === "resetCode") return resetSecurityCode_(payload.email);
  if (payload.action === "upsertMonthlySummary") return upsertMonthlySummary_(payload);
  throw new Error("Unsupported action");
}

function upsertMonthlySummary_(payload) {
  const teacher = validateTeacher_(payload);
  const sheet = getSummarySheet_();
  ensureSheetLayout_(sheet);
  const monthIndex = MONTHS.indexOf(payload.month);
  if (monthIndex === -1) throw new Error("Month is outside Sep-May school year");

  const row = findOrCreateTeacherRow_(sheet, payload);
  const monthCol = FIRST_MONTH_COL + monthIndex * 3;

  sheet.getRange(row, 2, 1, 2).setValues([[
    teacher.name,
    teacher.subject || payload.subject || ""
  ]]);
  sheet.getRange(row, monthCol, 1, 3).setValues([[
    Number(payload.actual || 0),
    Number(payload.surplus || 0),
    Number(payload.shortage || 0)
  ]]);
  sheet.getRange(row, TEACHER_KEY_COL).setValue(teacher.teacherCode);
  sheet.getRange(row, UPDATED_AT_COL).setValue(new Date());
  renumberTeachers_(sheet);
  updateTotalsRow_(sheet);
  styleDataRows_(sheet);

  return { ok: true, row };
}

function getSummarySheet_() {
  const ss = SpreadsheetApp.getActive();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function getTeacherSheet_() {
  const ss = SpreadsheetApp.getActive();
  return ss.getSheetByName(TEACHER_SHEET_NAME) || ss.insertSheet(TEACHER_SHEET_NAME);
}

function ensureTeacherDirectory_() {
  const sheet = getTeacherSheet_();
  const headerRange = sheet.getRange(1, 1, 1, TEACHER_HEADERS.length);
  const current = headerRange.getValues()[0];
  const needsHeader = TEACHER_HEADERS.some((header, index) => current[index] !== header);
  if (needsHeader) {
    headerRange.setValues([TEACHER_HEADERS]);
    headerRange.setFontWeight("bold").setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }

  const lastRow = sheet.getLastRow();
  const existingNames = lastRow >= 2
    ? sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat().map((name) => String(name).trim())
    : [];
  const rows = [];
  TEACHER_SEED_NAMES.forEach((name, index) => {
    if (!existingNames.includes(name)) {
      rows.push([
        String(100001 + index),
        name,
        defaultSubject_(name),
        teacherEmail_(name),
        randomSecurityCode_()
      ]);
    }
  });
  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, TEACHER_HEADERS.length).setValues(rows);
  }

  const updatedLastRow = sheet.getLastRow();
  if (updatedLastRow >= 2) {
    const values = sheet.getRange(2, 1, updatedLastRow - 1, TEACHER_HEADERS.length).getValues();
    let changed = false;
    values.forEach((row, index) => {
      if (!row[0] && row[1]) {
        row[0] = String(100001 + index);
        changed = true;
      }
      if (!row[4] && row[1]) {
        row[4] = randomSecurityCode_();
        changed = true;
      }
      if (!row[3] && row[1] && teacherEmail_(row[1])) {
        row[3] = teacherEmail_(row[1]);
        changed = true;
      }
    });
    if (changed) sheet.getRange(2, 1, values.length, TEACHER_HEADERS.length).setValues(values);
  }

  sheet.setColumnWidth(1, 95);
  sheet.setColumnWidth(2, 240);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(4, 230);
  sheet.setColumnWidth(5, 110);
  return sheet;
}

function teacherRecords_() {
  const sheet = ensureTeacherDirectory_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, TEACHER_HEADERS.length).getValues()
    .filter((row) => row[0] && row[1])
    .map((row, index) => ({
      row: index + 2,
      teacherCode: String(row[0]).trim(),
      name: String(row[1]).trim(),
      subject: String(row[2] || "").trim(),
      email: String(row[3] || "").trim(),
      securityCode: String(row[4] || "").trim()
    }));
}

function teachersResponse_() {
  const teachers = teacherRecords_().map((teacher) => ({
    id: slugify_(teacher.teacherCode + "-" + teacher.name),
    teacherCode: teacher.teacherCode,
    name: teacher.name,
    subject: teacher.subject,
    email: maskEmail_(teacher.email)
  }));
  return { ok: true, teachers };
}

function validateTeacher_(payload) {
  const teacherCode = normalizeKey_(payload.teacherCode || payload.teacherId || "");
  const securityCode = String(payload.securityCode || "").trim();
  if (!teacherCode) throw new Error("Thiếu mã giáo viên.");
  if (!/^\d{6}$/.test(securityCode)) throw new Error("Mã bảo mật phải gồm 6 chữ số.");
  const teacher = findTeacherForPayload_(payload, teacherCode);
  if (!teacher) throw new Error("Không tìm thấy mã giáo viên trong danh sách.");
  if (String(teacher.securityCode) !== securityCode) throw new Error("Mã bảo mật không đúng.");
  return teacher;
}

function findTeacherForPayload_(payload, teacherCode) {
  const teachers = teacherRecords_();
  const normalizedCode = normalizeKey_(teacherCode);
  const normalizedName = normalizeName_(payload.teacherName || "");
  const normalizedEmail = String(payload.email || "").trim().toLowerCase();
  const normalizedSubject = normalizeName_(payload.subject || "");

  return teachers.find((item) => normalizeKey_(item.teacherCode) === normalizedCode) ||
    teachers.find((item) => normalizedEmail && item.email.toLowerCase() === normalizedEmail) ||
    teachers.find((item) =>
      normalizedName &&
      normalizeName_(item.name) === normalizedName &&
      (!normalizedSubject || !item.subject || normalizeName_(item.subject) === normalizedSubject)
    ) ||
    null;
}

function resetSecurityCode_(email) {
  const cleanEmail = String(email || "").trim().toLowerCase();
  if (!cleanEmail) throw new Error("Vui lòng nhập email.");
  const teachers = teacherRecords_();
  const teacher = teachers.find((item) => item.email.toLowerCase() === cleanEmail);
  if (!teacher) throw new Error("Email này chưa có trong danh sách giáo viên.");
  const newCode = randomSecurityCode_();
  getTeacherSheet_().getRange(teacher.row, 5).setValue(newCode);
  MailApp.sendEmail({
    to: teacher.email,
    cc: ADMIN_EMAIL,
    subject: "Mã bảo mật kê giờ THCS Tây Phú",
    body: `Kính gửi ${teacher.name},\n\nMã bảo mật kê giờ mới của thầy/cô là: ${newCode}\n\nVui lòng không chia sẻ mã này cho người khác.\n\nTHCS Tây Phú`
  });
  return { ok: true };
}

function ensureSheetLayout_(sheet) {
  sheet.getRange(1, 1, HEADER_ROWS, UPDATED_AT_COL).breakApart();
  sheet.getRange(1, 1, HEADER_ROWS, UPDATED_AT_COL).clearContent();

  sheet.getRange("A1:A2").merge().setValue("Số tt");
  sheet.getRange("B1:B2").merge().setValue("Họ tên GV");
  sheet.getRange("C1:C2").merge().setValue("Môn");

  MONTHS.forEach((month, index) => {
    const col = FIRST_MONTH_COL + index * 3;
    sheet.getRange(1, col, 1, 3).merge().setValue(monthTitle_(month));
    sheet.getRange(2, col, 1, 3).setValues([["Tổng", "Thừa", "Thiếu"]]);
  });

  sheet.getRange(1, TEACHER_KEY_COL).setValue("Teacher key");
  sheet.getRange(1, UPDATED_AT_COL).setValue("Cập nhật");
  sheet.hideColumns(TEACHER_KEY_COL, 2);
  sheet.setFrozenRows(HEADER_ROWS);
  sheet.setFrozenColumns(3);

  sheet.setColumnWidth(1, 70);
  sheet.setColumnWidth(2, 260);
  sheet.setColumnWidth(3, 210);
  for (let col = FIRST_MONTH_COL; col <= VISIBLE_COLS; col += 1) {
    sheet.setColumnWidth(col, 105);
  }

  const header = sheet.getRange(1, 1, HEADER_ROWS, VISIBLE_COLS);
  header
    .setFontFamily("Arial")
    .setFontSize(10)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setBackground("#ffffff")
    .setWrap(true);
  header.setBorder(true, true, true, true, true, true, "#000000", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  sheet.setRowHeight(1, 34);
  sheet.setRowHeight(2, 34);
}

function findOrCreateTeacherRow_(sheet, payload) {
  const key = teacherKey_(payload);
  const lastDataRow = getLastTeacherRow_(sheet);
  if (lastDataRow >= DATA_START_ROW) {
    const keys = sheet.getRange(DATA_START_ROW, TEACHER_KEY_COL, lastDataRow - HEADER_ROWS, 1).getValues().flat();
    const keyIndex = keys.findIndex((value) => String(value) === String(key));
    if (keyIndex >= 0) return DATA_START_ROW + keyIndex;
  }

  const totalRow = getTotalRow_(sheet);
  if (totalRow) {
    sheet.insertRowsBefore(totalRow, 1);
    return totalRow;
  }
  return lastDataRow + 1;
}

function renumberTeachers_(sheet) {
  const lastRow = getLastTeacherRow_(sheet);
  if (lastRow < DATA_START_ROW) return;
  const count = lastRow - HEADER_ROWS;
  const values = Array.from({ length: count }, (_, index) => [index + 1]);
  sheet.getRange(DATA_START_ROW, 1, count, 1).setValues(values);
}

function updateTotalsRow_(sheet) {
  const lastTeacherRow = getLastTeacherRow_(sheet);
  if (lastTeacherRow < DATA_START_ROW) return;
  const totalRow = lastTeacherRow + 1;
  sheet.getRange(totalRow, 1, 1, VISIBLE_COLS).clearContent();
  sheet.getRange(totalRow, 2).setValue("TỔNG");
  for (let col = FIRST_MONTH_COL; col <= VISIBLE_COLS; col += 1) {
    const letter = columnLetter_(col);
    sheet.getRange(totalRow, col).setFormula(`=SUM(${letter}${DATA_START_ROW}:${letter}${lastTeacherRow})`);
  }
}

function styleDataRows_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < DATA_START_ROW) return;
  const range = sheet.getRange(DATA_START_ROW, 1, lastRow - HEADER_ROWS, VISIBLE_COLS);
  range
    .setFontFamily("Arial")
    .setFontSize(10)
    .setVerticalAlignment("middle")
    .setBorder(true, true, true, true, true, true, "#000000", SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(DATA_START_ROW, 1, lastRow - HEADER_ROWS, 1).setHorizontalAlignment("center");
  sheet.getRange(DATA_START_ROW, FIRST_MONTH_COL, lastRow - HEADER_ROWS, VISIBLE_COLS - FIRST_MONTH_COL + 1)
    .setHorizontalAlignment("center");
  const totalRow = getLastTeacherRow_(sheet) + 1;
  if (totalRow >= DATA_START_ROW && totalRow <= lastRow) {
    sheet.getRange(totalRow, 1, 1, VISIBLE_COLS).setFontWeight("bold");
  }
}

function teacherKey_(payload) {
  return payload.teacherCode || payload.teacherId || payload.teacherName || "";
}

function getLastTeacherRow_(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), HEADER_ROWS);
  if (lastRow < DATA_START_ROW) return HEADER_ROWS;
  const totalRow = getTotalRow_(sheet);
  const scanLastRow = totalRow ? totalRow - 1 : lastRow;
  if (scanLastRow < DATA_START_ROW) return HEADER_ROWS;
  const values = sheet.getRange(DATA_START_ROW, 2, scanLastRow - HEADER_ROWS, 1).getValues().flat();
  let last = HEADER_ROWS;
  values.forEach((value, index) => {
    if (value && !isTotalLabel_(value)) {
      last = DATA_START_ROW + index;
    }
  });
  return last;
}

function getTotalRow_(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), HEADER_ROWS);
  if (lastRow < DATA_START_ROW) return 0;
  const values = sheet.getRange(DATA_START_ROW, 2, lastRow - HEADER_ROWS, 1).getValues().flat();
  const index = values.findIndex((value) => isTotalLabel_(value));
  return index >= 0 ? DATA_START_ROW + index : 0;
}

function isTotalLabel_(value) {
  const text = String(value || "").trim().toUpperCase();
  return text === "TỔNG" || text === "TONG";
}

function columnLetter_(column) {
  let letter = "";
  while (column > 0) {
    const temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = Math.floor((column - temp - 1) / 26);
  }
  return letter;
}

function monthTitle_(month) {
  return "THÁNG " + Number(month.slice(5, 7));
}

function defaultSubject_(name) {
  if (name === "Nguyễn Thị Thanh Vân") return "PHÂN MÔN LỊCH SỬ";
  if (name === "Trần Thị Vân") return "GDCD";
  return "";
}

function teacherEmail_(name) {
  return TEACHER_EMAILS[String(name || "").trim()] || "";
}

function randomSecurityCode_() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function slugify_(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeKey_(value) {
  return String(value || "").trim().replace(/\.0$/, "");
}

function normalizeName_(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function maskEmail_(email) {
  const value = String(email || "").trim();
  if (!value.includes("@")) return "";
  const parts = value.split("@");
  const name = parts[0];
  const maskedName = name.length <= 2 ? name[0] + "*" : name.slice(0, 2) + "***";
  return maskedName + "@" + parts.slice(1).join("@");
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonp_(callback, value) {
  const safeCallback = String(callback || "").replace(/[^\w.$]/g, "");
  return ContentService
    .createTextOutput(`${safeCallback}(${JSON.stringify(value)});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
