
// if (typeof require !== 'undefined') XLSX = require('xlsx');
// if (typeof require !== 'undefined') XLSXStyle = require('xlsx-style');

import XLSX from 'xlsx'
import XLSXStyle from 'xlsx-style'
import { saveAs } from 'file-saver'

export function download() {

    // var workbook = XLSX.readFile('test.xlsx');
    // var first_sheet_name = workbook.SheetNames[0];
    // var address_of_cell = 'A1';
    // /* Get worksheet */
    // var worksheet = workbook.Sheets[first_sheet_name];
    // // /* Find desired cell */
    // // var desired_cell = worksheet[address_of_cell];
    // /* Get the value */
    // // var desired_value = desired_cell.v;


    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet([]);

    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet_name");


    const colWidth = 20;
    var wscols = [
        { wpx: colWidth },
        { wpx: colWidth },
        { wpx: colWidth },
        { wpx: colWidth },
        { wpx: colWidth },
    ];
    worksheet['!cols'] = wscols;

    const rowHeight = 20;
    var wsrows = [
        { hpx: rowHeight },
        { hpx: rowHeight },
        { hpx: rowHeight },
        { hpx: rowHeight },
        { hpx: rowHeight },
    ];
    worksheet['!rows '] = wsrows;


    // desired_cell.s = {fill:{fgColor: {rgb:"FF0000"}}};
    // worksheet["A2"].s  = {fill:{bgColor: {rgb:"FF0000"}}};
    for (let index = 1; index < 10; index++) {
        let address = "A" + index;
        let cell = worksheet[address];
        if (!cell) {
            // 新增一行
            XLSX.utils.sheet_add_aoa(worksheet, [[" "]], { origin: address });
        }
        cell = worksheet[address];
        cell.v = "";
        // cell.w = " ";
        cell.s = { fill: { fgColor: { rgb: "FF0000" } } };
    }

    var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };

    var wbout = XLSXStyle.write(workbook, wopts);
    /* the saveAs call downloads a file on the local machine */
    saveAs(new Blob([s2ab(wbout)], { type: "" }), "out.xlsx")
    // XLSXStyle.writeFile(workbook, 'out.xlsx');
    console.debug("done")
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}


export default {
    download
}