const SHEET_NAME = "Tong hop ke gio 2026-2027";
const TEACHER_SHEET_NAME = "Danh sach giao vien";
const ADMIN_EMAIL = "phdungvt@gmail.com";
const MONTHS = [
  "2026-09", "2026-10", "2026-11", "2026-12", "2027-01",
  "2027-02", "2027-03", "2027-04", "2027-05"
];
const TEACHER_HEADERS = ["Ma GV", "Ho ten GV", "Mon", "Email", "Ma bao mat"];
const TEACHER_SEED_ROWS = [
  ["100001", "Trương Thanh Phương", "Kế toán", "TP105", "682314"],
  ["100002", "Nguyễn Thị Thu Thủy", "Thủ quỹ", "TP318", "491205"],
  ["100003", "Nguyễn Thái Thị Thu An", "Văn thư", "TP742", "835619"],
  ["100004", "Trịnh Thị Nhung", "Y tế", "TP529", "204781"],
  ["100005", "Huỳnh Thị Diễm Trinh", "Y tế", "TP681", "951340"],
  ["100006", "Dương Văn Nghiêm", "Bảo vệ", "TP407", "316892"],
  ["100007", "Dương Trí Hiếu", "Bảo vệ", "TP853", "742168"],
  ["100008", "Đinh Kim Lài", "CBQL", "TP214", "583920"],
  ["100009", "Lê Thị Xuân Mai", "Ngữ văn", "TP936", "129475"],
  ["100010", "Nguyễn Ánh Nguyệt", "Ngữ văn", "TP162", "674830"],
  ["100011", "Trương Thị Kim Liễu", "Ngữ văn", "TP870", "430591"],
  ["100012", "Trần Thị Thu Hồ", "Ngữ văn", "TP345", "891247"],
  ["100013", "Đào Thị Thùy Trang", "Ngữ văn", "TP619", "506718"],
  ["100014", "Dương Nhật Minh", "Ngữ văn", "TP784", "248309"],
  ["100015", "Đinh Thái Quyển", "Tư vấn tâm lý học sinh", "TP450", "913682"],
  ["100016", "Phạm Thị Hường", "Thư viện", "TP293", "375421"],
  ["100017", "Lâm Thị Thúy Quỳnh", "Thư viện", "TP827", "682054"],
  ["100018", "Võ Thanh Phong", "CBQL", "TP138", "754910"],
  ["100019", "Lâm Thị Giữ", "Lịch sử - Địa lý", "TP674", "319582"],
  ["100020", "Nguyễn Thị Diễm Thùy", "Lịch sử - GDCD", "TP503", "842607"],
  ["100021", "Lê Đức Thắng", "Lịch sử - Địa lý", "TP941", "196358"],
  ["100022", "Phạm Xuân Thưởng", "Lịch sử - Địa lý", "TP286", "620473"],
  ["100023", "Lê Hồng Hải", "Địa lý", "TP715", "487129"],
  ["100024", "Trần Thị Vân", "GDCD", "TP839", "935814"],
  ["100025", "Nguyễn Thị Thanh Vân", "Lịch sử", "TP362", "271406"],
  ["100026", "Võ Thị Kim Nga", "Lịch sử - Địa lý", "TP597", "504831"],
  ["100027", "Hồ Thị Phương Thảo", "TPT Đội", "TP420", "819675"],
  ["100028", "Lê Thị Mỹ Phụng", "Tiếng Anh", "TP651", "362948"],
  ["100029", "Hà Thị Hoàng Oanh", "Tiếng Anh", "TP198", "748201"],
  ["100030", "Tô Thị Thùy Dung", "Tiếng Anh", "TP834", "591376"],
  ["100031", "Lê Thị Thu Thảo", "Tiếng Anh", "TP476", "215890"],
  ["100032", "Trần Ngô Mộng Quyền", "Tiếng Anh", "TP902", "670415"],
  ["100033", "Hồ Minh Triều", "CBQL", "TP357", "983162"],
  ["100034", "Nguyễn Văn Ngoan", "Toán", "TP728", "412589"],
  ["100035", "Đinh Thị Oanh", "Toán", "TP185", "856023"],
  ["100036", "Hồ Ngọc Đệ", "Toán", "TP639", "309741"],
  ["100037", "Nguyễn Duy Hoài", "Toán", "TP491", "748135"],
  ["100038", "Võ Thị Kiều Tiên", "Toán", "TP820", "163950"],
  ["100039", "Bùi Thiện Nhân", "Toán", "TP264", "590284"],
  ["100040", "Võ Văn Thái", "Toán", "TP573", "827416"],
  ["100041", "Nguyễn Thị Quyên", "Tin học", "TP915", "436198"],
  ["100042", "Lê Văn Cường", "Tin học", "TP386", "679052"],
  ["100043", "Võ Văn Hà", "Vật lý", "TP749", "251843"],
  ["100044", "Trương Thiện Tánh", "Hóa học - KHTN", "TP130", "918274"],
  ["100045", "Nguyễn Thị Thu Hà", "Vật lý", "TP863", "384501"],
  ["100046", "Châu Thị Cẩm Hồng", "Hóa - KHTN", "TP417", "760935"],
  ["100047", "Nguyễn Thị Bích Tuyền", "Sinh học", "TP682", "529148"],
  ["100048", "Nguyễn Thị Phước Hoài", "Hóa học", "TP259", "173860"],
  ["100049", "Trương Thị Thủy Tiên", "Hóa học - KHTN", "TP904", "845219"],
  ["100050", "Đặng Thị Ngọc Yến", "Vật lý - KHTN", "TP531", "631790"],
  ["100051", "Võ Thị Út Thủy", "Công nghệ (KTCN)", "TP768", "408627"],
  ["100052", "Lê Thị Ngọc Giàu", "Công nghệ (KTNN)", "TP325", "952183"],
  ["100053", "Nguyễn Sỹ Tuấn", "Thiết bị", "TP846", "219754"],
  ["100054", "Diệp Văn Long", "Thiết bị", "TP172", "784306"],
  ["100055", "Lê Văn Cường", "Giáo dục thể chất", "TP690", "340918"],
  ["100056", "Trần Hưng Việt", "Giáo dục thể chất", "TP437", "895261"],
  ["100057", "Lê Văn Phúc", "Giáo dục thể chất", "TP981", "627145"],
  ["100058", "Dương Phương Hồng", "Giáo dục thể chất", "TP206", "158932"],
  ["100059", "Trần Huỳnh Diễm Thê", "Âm nhạc", "TP753", "493076"],
  ["100060", "Nguyễn Thị Tú Huyên", "Âm nhạc", "TP389", "816524"],
  ["100061", "Bùi Lê Phạm Thị Diễm Phương", "Mĩ thuật", "TP612", "270491"],
  ["100062", "Võ Văn Tuấn Nhỏ", "Mĩ thuật", "TP948", "534817"],
  ["Admin", "Phạm Anh Dũng", "Quản trị hệ thống", "TP999", "123456"]
];

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
  if (payload.action === "login") return loginTeacher_(payload);
  if (payload.action === "teachers") return teachersResponse_();
  if (payload.action === "resetCode") return resetSecurityCode_(payload);
  if (payload.action === "leaderSummary") return leaderSummary_(payload);
  if (payload.action === "upsertMonthlySummary") return upsertMonthlySummary_(payload);
  throw new Error("Unsupported action");
}

function leaderSummary_(payload) {
  validateAdmin_(payload);
  const sheet = getSummarySheet_();
  ensureSheetLayout_(sheet);
  updateTotalsRow_(sheet);
  styleDataRows_(sheet);

  const lastTeacherRow = getLastTeacherRow_(sheet);
  if (lastTeacherRow < DATA_START_ROW) {
    return { ok: true, teachers: [] };
  }

  const values = sheet.getRange(DATA_START_ROW, 1, lastTeacherRow - HEADER_ROWS, VISIBLE_COLS).getValues();
  const teachers = values
    .filter((row) => row[1] && !isTotalLabel_(row[1]))
    .map((row, index) => {
      const monthly = {};
function validateAdmin_(payload) {
  const cleanLogin = String(payload.email || payload.loginCode || payload.teacherCode || "").trim().toLowerCase();
  const securityCode = String(payload.securityCode || "").trim();
  const isAdminLogin = cleanLogin === ADMIN_EMAIL.toLowerCase() || cleanLogin === "tp999" || cleanLogin === "admin";
  if (!isAdminLogin) throw new Error("Chỉ admin mới được xuất tổng hợp lãnh đạo.");
  const admin = teacherRecords_().find((item) => {
    const code = String(item.teacherCode || "").trim().toLowerCase();
    const login = String(item.email || "").trim().toLowerCase();
    return login === cleanLogin || code === cleanLogin || login === "tp999" || login === ADMIN_EMAIL.toLowerCase() || code === "admin";
  });
  if (!admin) throw new Error("Không tìm thấy tài khoản admin trong danh sách giáo viên.");
  if (String(admin.securityCode) !== securityCode) throw new Error("Sai mật khẩu admin.");
  return admin;
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
  const existingCodes = lastRow >= 2
    ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat().map((c) => String(c).trim())
    : [];
  const rows = [];
  TEACHER_SEED_ROWS.forEach((seed) => {
    if (!existingCodes.includes(seed[0])) {
      rows.push(seed);
    }
  });
  if (rows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, TEACHER_HEADERS.length).setValues(rows);
  }

  sheet.setColumnWidth(1, 95);
  sheet.setColumnWidth(2, 240);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(4, 150);
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
    email: teacher.email
  }));
  return { ok: true, teachers };
}

function loginTeacher_(payload) {
  const cleanLogin = String(payload.email || payload.loginCode || payload.teacherCode || "").trim().toLowerCase();
  const securityCode = String(payload.securityCode || "").trim();
  if (!cleanLogin) throw new Error("Vui lòng nhập mã giáo viên đăng nhập.");
  if (!/^\d{6}$/.test(securityCode)) throw new Error("Vui lòng nhập mật khẩu 6 chữ số.");

  const teachers = teacherRecords_();
  const teacher = teachers.find((item) => {
    const code = String(item.teacherCode || "").trim().toLowerCase();
    const login = String(item.email || "").trim().toLowerCase();
    const name = String(item.name || "").trim().toLowerCase();
    return login === cleanLogin || code === cleanLogin || name === cleanLogin || slugify_(item.name) === slugify_(cleanLogin);
  });

  if (!teacher) throw new Error("Không tìm thấy mã giáo viên trong danh sách.");
  if (String(teacher.securityCode) !== securityCode) {
    throw new Error("Sai mật khẩu. Vui lòng kiểm tra lại mã bảo mật 6 số được cấp.");
  }

  return {
    ok: true,
    teacher: {
      id: slugify_(teacher.teacherCode + "-" + teacher.name),
      teacherCode: teacher.teacherCode,
      name: teacher.name,
      subject: teacher.subject,
      email: teacher.email
    }
  };
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

function resetSecurityCode_(payload) {
  const teacherCode = normalizeKey_(payload.teacherCode || payload.teacherId || "");
  const cleanLogin = String(payload.email || payload.loginCode || "").trim().toLowerCase();
  if (!teacherCode && !cleanLogin) throw new Error("Thiếu mã giáo viên để đổi mã.");
  const teachers = teacherRecords_();
  const teacher = teachers.find((item) => {
    const code = String(item.teacherCode || "").trim().toLowerCase();
    const login = String(item.email || "").trim().toLowerCase();
    return (teacherCode && normalizeKey_(item.teacherCode) === teacherCode) ||
      (cleanLogin && (login === cleanLogin || code === cleanLogin));
  });
  if (!teacher) throw new Error("Không tìm thấy giáo viên trong danh sách.");
  const newCode = randomSecurityCode_();
  getTeacherSheet_().getRange(teacher.row, 5).setValue(newCode);
  if (teacher.email && teacher.email.includes("@")) {
    MailApp.sendEmail({
      to: teacher.email,
      cc: ADMIN_EMAIL,
      subject: "Mật khẩu kê giờ THCS Tây Phú",
      body: `Kính gửi ${teacher.name},\n\nMật khẩu kê giờ mới của thầy/cô là: ${newCode}\n\nVui lòng không chia sẻ mật khẩu này cho người khác.\n\nTHCS Tây Phú`
    });
  }
  return { ok: true, email: teacher.email, newCode };
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
