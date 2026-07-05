const SHEET_NAME = "Tong hop ke gio";
const MONTHS = [
  "2025-09", "2025-10", "2025-11", "2025-12", "2026-01",
  "2026-02", "2026-03", "2026-04", "2026-05"
];

const HEADER_ROWS = 2;
const DATA_START_ROW = HEADER_ROWS + 1;
const FIRST_MONTH_COL = 4;
const VISIBLE_COLS = FIRST_MONTH_COL - 1 + MONTHS.length * 3;
const TEACHER_KEY_COL = VISIBLE_COLS + 1;
const UPDATED_AT_COL = VISIBLE_COLS + 2;

function doPost(e) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    if (payload.action !== "upsertMonthlySummary") {
      throw new Error("Unsupported action");
    }

    const sheet = getSummarySheet_();
    ensureSheetLayout_(sheet);
    const monthIndex = MONTHS.indexOf(payload.month);
    if (monthIndex === -1) throw new Error("Month is outside Sep-May school year");

    const row = findOrCreateTeacherRow_(sheet, payload);
    const monthCol = FIRST_MONTH_COL + monthIndex * 3;

    sheet.getRange(row, 2, 1, 2).setValues([[
      payload.teacherName || "",
      payload.subject || ""
    ]]);
    sheet.getRange(row, monthCol, 1, 3).setValues([[
      Number(payload.actual || 0),
      Number(payload.surplus || 0),
      Number(payload.shortage || 0)
    ]]);
    sheet.getRange(row, TEACHER_KEY_COL).setValue(teacherKey_(payload));
    sheet.getRange(row, UPDATED_AT_COL).setValue(new Date());
    renumberTeachers_(sheet);
    updateTotalsRow_(sheet);
    styleDataRows_(sheet);

    return json_({ ok: true, row });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  const sheet = getSummarySheet_();
  ensureSheetLayout_(sheet);
  return json_({ ok: true, sheetName: SHEET_NAME });
}

function getSummarySheet_() {
  const ss = SpreadsheetApp.getActive();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
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

    const names = sheet.getRange(DATA_START_ROW, 2, lastDataRow - HEADER_ROWS, 1).getValues().flat();
    const nameIndex = names.findIndex((value) => String(value) === String(payload.teacherName || ""));
    if (nameIndex >= 0) return DATA_START_ROW + nameIndex;
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
  return payload.teacherId || payload.teacherName || "";
}

function getLastTeacherRow_(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), HEADER_ROWS);
  if (lastRow < DATA_START_ROW) return HEADER_ROWS;
  const values = sheet.getRange(DATA_START_ROW, 2, lastRow - HEADER_ROWS, 1).getValues().flat();
  let last = HEADER_ROWS;
  values.forEach((value, index) => {
    if (value && String(value).trim().toUpperCase() !== "TỔNG") {
      last = DATA_START_ROW + index;
    }
  });
  return last;
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

function json_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
