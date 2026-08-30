const SHEET_NAME = "Tong hop ke gio";
const TEACHER_SHEET_NAME = "Danh sach giao vien";
const HEADER_ROWS = 2;
const DATA_START_ROW = 3;
const FIRST_MONTH_COL = 4;
const MONTHS = [
  "2026-09",
  "2026-10",
  "2026-11",
  "2026-12",
  "2027-01",
  "2027-02",
  "2027-03",
  "2027-04",
  "2027-05"
];
const TEACHER_HEADERS = ["Ma GV", "Ho ten GV", "Mon", "Ma dang nhap", "Ma bao mat", "Email"];
const ADMIN_EMAIL = "phdungvt@gmail.com";

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

const VISIBLE_COLS = 3 + MONTHS.length * 3;
const TEACHER_KEY_COL = VISIBLE_COLS + 1;
const UPDATED_AT_COL = VISIBLE_COLS + 2;

function setupAuthorization() {
  ensureTeacherDirectory_();
  getSummarySheet_();
  return "OK - Đã sẵn sàng";
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
  if (payload.action === "resetCode" || payload.action === "forgotPassword") return sendCurrentPassword_(payload);
  if (payload.action === "changePassword") return changePassword_(payload);
  if (payload.action === "leaderSummary") return leaderSummary_(payload);
  if (payload.action === "upsertMonthlySummary") return upsertMonthlySummary_(payload);
  throw new Error("Unsupported action: " + payload.action);
}

function changePassword_(payload) {
  const cleanLogin = String(payload.email || payload.loginCode || payload.teacherCode || "").trim().toLowerCase();
  const currentPassword = String(payload.currentPassword || payload.oldPassword || payload.securityCode || "").trim();
  const newPassword = String(payload.newPassword || "").trim();

  if (!cleanLogin) throw new Error("Vui lòng cung cấp mã giáo viên.");
  if (!currentPassword) throw new Error("Vui lòng nhập mật khẩu hiện tại.");
  if (!/^\d{6}$/.test(newPassword)) throw new Error("Mật khẩu mới phải gồm đúng 6 chữ số.");
  if (currentPassword === newPassword) throw new Error("Mật khẩu mới không được trùng với mật khẩu cũ.");

  const sheet = ensureTeacherDirectory_();
  const teachers = teacherRecords_();
  const teacher = teachers.find((item) => {
    const code = String(item.teacherCode || "").trim().toLowerCase();
    const login = String(item.email || "").trim().toLowerCase();
    return login === cleanLogin || code === cleanLogin || slugify_(item.name) === slugify_(cleanLogin);
  });

  if (!teacher) throw new Error("Không tìm thấy tài khoản giáo viên.");
  if (String(teacher.securityCode) !== currentPassword) {
    throw new Error("Mật khẩu hiện tại không chính xác.");
  }

  sheet.getRange(teacher.row, 5).setValue(newPassword);

  return {
    ok: true,
    message: "Đổi mật khẩu thành công!"
  };
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
      MONTHS.forEach((month, monthIndex) => {
        const colIndex = FIRST_MONTH_COL - 1 + monthIndex * 3;
        monthly[month] = {
          actual: numberValue_(row[colIndex]),
          surplus: numberValue_(row[colIndex + 1]),
          shortage: numberValue_(row[colIndex + 2])
        };
      });
      return {
        id: slugify_(String(row[TEACHER_KEY_COL - 1] || row[1])) || `teacher-${index + 1}`,
        name: String(row[1] || "").trim(),
        subject: String(row[2] || "").trim(),
        teacherCode: String(row[TEACHER_KEY_COL - 1] || "").trim(),
        monthly
      };
    });

  return { ok: true, teachers };
}

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
  return sheet.getRange(2, 1, lastRow - 1, Math.max(TEACHER_HEADERS.length, 6)).getValues()
    .filter((row) => row[0] && row[1])
    .map((row, index) => ({
      row: index + 2,
      teacherCode: String(row[0]).trim(),
      name: String(row[1]).trim(),
      subject: String(row[2] || "").trim(),
      loginCode: String(row[3] || "").trim(),
      email: String(row[3] || "").trim(),
      securityCode: String(row[4] || "").trim(),
      personalEmail: String(row[5] || (row[3] && String(row[3]).includes("@") ? row[3] : "")).trim()
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

function sendCurrentPassword_(payload) {
  const teacherCode = normalizeKey_(payload.teacherCode || payload.teacherId || "");
  const cleanLogin = String(payload.email || payload.loginCode || "").trim().toLowerCase();

  if (!teacherCode && !cleanLogin) {
    throw new Error("Vui lòng nhập mã giáo viên.");
  }

  const teachers = teacherRecords_();
  const teacher = teachers.find((item) => {
    const code = String(item.teacherCode || "").trim().toLowerCase();
    const login = String(item.loginCode || item.email || "").trim().toLowerCase();
    const name = String(item.name || "").trim().toLowerCase();
    return (teacherCode && normalizeKey_(item.teacherCode) === teacherCode) ||
      (cleanLogin && (login === cleanLogin || code === cleanLogin || name === cleanLogin || slugify_(item.name) === slugify_(cleanLogin)));
  });

  if (!teacher) {
    throw new Error("Không tìm thấy mã giáo viên '" + (cleanLogin || teacherCode) + "'. Hoặc liên hệ Admin trường.");
  }

  // LẤY MẬT KHẨU HIỆN CÓ TRÊN SHEET
  const currentPassword = String(teacher.securityCode || "").trim();
  if (!currentPassword) {
    throw new Error("Tài khoản chưa có mật khẩu trên hệ thống. Hoặc liên hệ Admin trường.");
  }

  // LẤY EMAIL CHÍNH CHỦ CỦA GIÁO VIÊN TRÊN SHEET
  const targetEmail = String(teacher.personalEmail || "").trim();
  if (!targetEmail || !targetEmail.includes("@")) {
    throw new Error("Tài khoản chưa được liên kết Email trên hệ thống. Hoặc liên hệ Admin trường.");
  }

  // GỬI EMAIL CHỨA MẬT KHẨU HIỆN CÓ VỀ ĐÚNG EMAIL ĐĂNG KÝ
  try {
    const subject = "[THCS Tây Phú] Mật khẩu đăng nhập Kê Giờ của Thầy/Cô " + teacher.name;
    const body = "Xin chào Thầy/Cô " + teacher.name + ",\n\n" +
      "Mật khẩu đăng nhập ứng dụng Kê Giờ THCS Tây Phú của Thầy/Cô là: " + currentPassword + "\n\n" +
      "Mã giáo viên: " + (teacher.loginCode || teacher.teacherCode) + "\n\n" +
      "Vui lòng truy cập https://ke-gio.vercel.app để đăng nhập.\n\n" +
      "Trân trọng,\nTrường THCS Tây Phú";

    const htmlBody = '<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 500px; margin: 0 auto; border: 1.5px solid #8b5cf6; border-radius: 12px; padding: 24px; background: #ffffff;">' +
      '<div style="text-align: center; margin-bottom: 20px;">' +
      '<span style="background: #f5f3ff; color: #6d28d9; font-weight: 800; font-size: 12px; padding: 4px 12px; border-radius: 999px; border: 1px solid #ddd6fe;">TRƯỜNG THCS TÂY PHÚ</span>' +
      '<h2 style="color: #3b0764; margin: 10px 0 4px; font-size: 20px;">MẬT KHẨU ĐĂNG NHẬP KÊ GIỜ</h2>' +
      '</div>' +
      '<p>Kính gửi Thầy/Cô: <strong style="color: #1e1b4b; font-size: 16px;">' + teacher.name + '</strong>,</p>' +
      '<p>Hệ thống gửi lại mật khẩu đăng nhập ứng dụng Kê Giờ của Thầy/Cô theo yêu cầu:</p>' +
      '<div style="background: #f5f3ff; border: 2px dashed #7c3aed; padding: 18px; text-align: center; border-radius: 10px; margin: 20px 0;">' +
      '<p style="margin: 0 0 6px; font-size: 13px; color: #6b7280;">Mã giáo viên: <strong>' + (teacher.loginCode || teacher.teacherCode) + '</strong></p>' +
      '<p style="margin: 0; font-size: 13px; color: #6b7280;">Mật khẩu hiện tại của Thầy/Cô là:</p>' +
      '<div style="margin: 8px 0 0; color: #b91c1c; font-size: 34px; font-weight: 800; letter-spacing: 6px;">' + currentPassword + '</div>' +
      '</div>' +
      '<p style="font-size: 13px; color: #4b5563;">Đăng nhập ngay tại: <a href="https://ke-gio.vercel.app" style="color: #6d28d9; font-weight: 700; text-decoration: none;">ke-gio.vercel.app</a></p>' +
      '<hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />' +
      '<p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">Email này được gửi tự động từ Hệ thống Kê Giờ THCS Tây Phú.</p>' +
      '</div>';

    MailApp.sendEmail({
      to: targetEmail,
      subject: subject,
      body: body,
      htmlBody: htmlBody
    });

    return {
      ok: true,
      email: targetEmail,
      message: "Bạn hãy vào mail của bạn : [" + targetEmail + "] để lấy mật khẩu. Hoặc liên hệ admin trường"
    };
  } catch (err) {
    throw new Error("Lỗi khi gửi email: " + err.message + ". Hoặc liên hệ admin trường");
  }
}

function ensureSheetLayout_(sheet) {
  sheet.getRange(1, 1, HEADER_ROWS, UPDATED_AT_COL).breakApart();
  sheet.getRange(1, 1, HEADER_ROWS, UPDATED_AT_COL).clearContent();

  sheet.getRange("A1:A2").merge().setValue("Số tt");
  sheet.getRange("B1:B2").merge().setValue("Họ tên GV");
  sheet.getRange("C1:C2").merge().setValue("Môn");

  MONTHS.forEach((month, index) => {
    const startCol = FIRST_MONTH_COL + index * 3;
    sheet.getRange(1, startCol, 1, 3).merge().setValue(monthTitle_(month));
    sheet.getRange(2, startCol).setValue("Tổng");
    sheet.getRange(2, startCol + 1).setValue("Thừa");
    sheet.getRange(2, startCol + 2).setValue("Thiếu");
  });

  sheet.getRange(1, TEACHER_KEY_COL, 2, 1).merge().setValue("Teacher key");
  sheet.getRange(1, UPDATED_AT_COL, 2, 1).merge().setValue("Cập nhật");

  const headerRange = sheet.getRange(1, 1, HEADER_ROWS, VISIBLE_COLS);
  headerRange
    .setFontFamily("Arial")
    .setFontSize(10)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(true)
    .setBackground("#f2f2f2")
    .setBorder(true, true, true, true, true, true, "#000000", SpreadsheetApp.BorderStyle.SOLID);

  sheet.setColumnWidth(1, 45);
  sheet.setColumnWidth(2, 220);
  sheet.setColumnWidth(3, 160);
  for (let c = FIRST_MONTH_COL; c <= VISIBLE_COLS; c++) {
    sheet.setColumnWidth(c, 55);
  }
  sheet.setColumnWidth(TEACHER_KEY_COL, 120);
  sheet.setColumnWidth(UPDATED_AT_COL, 160);
  sheet.hideColumns(TEACHER_KEY_COL, 2);
  sheet.setFrozenRows(HEADER_ROWS);
  sheet.setFrozenColumns(3);
}

function findOrCreateTeacherRow_(sheet, payload) {
  const lastTeacherRow = getLastTeacherRow_(sheet);
  if (lastTeacherRow >= DATA_START_ROW) {
    const numRows = lastTeacherRow - HEADER_ROWS;
    const names = sheet.getRange(DATA_START_ROW, 2, numRows, 1).getValues().flat();
    const subjects = sheet.getRange(DATA_START_ROW, 3, numRows, 1).getValues().flat();
    const keys = sheet.getRange(DATA_START_ROW, TEACHER_KEY_COL, numRows, 1).getValues().flat();

    const targetKey = normalizeKey_(payload.teacherCode || payload.teacherId || "");
    const targetName = normalizeName_(payload.teacherName || "");
    const targetSubject = normalizeName_(payload.subject || "");

    for (let i = 0; i < names.length; i++) {
      const rowKey = normalizeKey_(keys[i]);
      const rowName = normalizeName_(names[i]);
      const rowSubject = normalizeName_(subjects[i]);

      if (targetKey && rowKey && targetKey === rowKey) {
        return DATA_START_ROW + i;
      }
      if (targetName && rowName && targetName === rowName) {
        if (!targetSubject || !rowSubject || targetSubject === rowSubject) {
          return DATA_START_ROW + i;
        }
      }
    }
  }

  const totalRow = getTotalRow_(sheet);
  let insertAt = totalRow ? totalRow : lastTeacherRow + 1;
  if (totalRow) {
    sheet.insertRowBefore(totalRow);
  }

  sheet.getRange(insertAt, 1, 1, UPDATED_AT_COL).clearContent();
  return insertAt;
}

function renumberTeachers_(sheet) {
  const lastTeacherRow = getLastTeacherRow_(sheet);
  if (lastTeacherRow < DATA_START_ROW) return;
  const count = lastTeacherRow - HEADER_ROWS;
  const numbers = [];
  for (let i = 1; i <= count; i++) {
    numbers.push([i]);
  }
  sheet.getRange(DATA_START_ROW, 1, count, 1).setValues(numbers);
}

function updateTotalsRow_(sheet) {
  const lastTeacherRow = getLastTeacherRow_(sheet);
  let totalRow = getTotalRow_(sheet);

  if (lastTeacherRow < DATA_START_ROW) {
    if (totalRow) sheet.deleteRow(totalRow);
    return;
  }

  const targetRow = lastTeacherRow + 1;
  if (!totalRow) {
    sheet.insertRowAfter(lastTeacherRow);
    totalRow = targetRow;
  } else if (totalRow !== targetRow) {
    sheet.deleteRow(totalRow);
    sheet.insertRowAfter(lastTeacherRow);
    totalRow = targetRow;
  }

  sheet.getRange(totalRow, 1).clearContent();
  sheet.getRange(totalRow, 2).setValue("TỔNG");
  sheet.getRange(totalRow, 3).clearContent();

  for (let col = FIRST_MONTH_COL; col <= VISIBLE_COLS; col++) {
    const letter = columnLetter_(col);
    sheet.getRange(totalRow, col).setFormula(`=SUM(${letter}${DATA_START_ROW}:${letter}${lastTeacherRow})`);
  }

  sheet.getRange(totalRow, TEACHER_KEY_COL, 1, 2).clearContent();
  const totalRange = sheet.getRange(totalRow, 1, 1, VISIBLE_COLS);
  totalRange
    .setFontFamily("Arial")
    .setFontSize(10)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setBackground("#f2f2f2")
    .setBorder(true, true, true, true, true, true, "#000000", SpreadsheetApp.BorderStyle.SOLID);
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

function randomSecurityCode_() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function numberValue_(val) {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function slugify_(value) {
  return String(value || "")
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
