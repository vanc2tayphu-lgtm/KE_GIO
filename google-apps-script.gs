const SHEET_NAME = "Tong hop ke gio";
const MONTHS = [
  "2025-09", "2025-10", "2025-11", "2025-12", "2026-01",
  "2026-02", "2026-03", "2026-04", "2026-05"
];

function doPost(e) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    if (payload.action !== "upsertMonthlySummary") {
      throw new Error("Unsupported action");
    }

    const sheet = getSummarySheet_();
    const headers = ensureHeaders_(sheet);
    const row = findOrCreateTeacherRow_(sheet, payload);
    const monthIndex = MONTHS.indexOf(payload.month);
    if (monthIndex === -1) throw new Error("Month is outside Sep-May school year");

    const startCol = 4 + monthIndex * 3;
    sheet.getRange(row, 1, 1, 3).setValues([[
      payload.teacherId || "",
      payload.teacherName || "",
      payload.subject || ""
    ]]);
    sheet.getRange(row, startCol, 1, 3).setValues([[
      Number(payload.actual || 0),
      Number(payload.surplus || 0),
      Number(payload.shortage || 0)
    ]]);
    sheet.getRange(row, headers.length).setValue(new Date());

    return json_({ ok: true, row });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  const sheet = getSummarySheet_();
  ensureHeaders_(sheet);
  return json_({ ok: true, sheetName: SHEET_NAME });
}

function getSummarySheet_() {
  const ss = SpreadsheetApp.getActive();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const headers = ["Ma giao vien", "Ho ten", "Mon"];
  MONTHS.forEach((month) => {
    const label = month.slice(5, 7) + "/" + month.slice(0, 4);
    headers.push(label + " tong day", label + " thua", label + " thieu");
  });
  headers.push("Cap nhat");

  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const needsHeader = headers.some((header, index) => current[index] !== header);
  if (needsHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setHorizontalAlignment("center");
    sheet.autoResizeColumns(1, headers.length);
  }
  return headers;
}

function findOrCreateTeacherRow_(sheet, payload) {
  const teacherId = payload.teacherId || payload.teacherName;
  const lastRow = Math.max(sheet.getLastRow(), 1);
  if (lastRow >= 2) {
    const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
    const index = ids.findIndex((id) => String(id) === String(teacherId));
    if (index >= 0) return index + 2;
  }
  const row = lastRow + 1;
  sheet.getRange(row, 1).setValue(teacherId);
  return row;
}

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
