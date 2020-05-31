

import XLSX from 'xlsx'
import XLSXStyle from 'xlsx-style'
import { saveAs } from 'file-saver'


/**
 * 
 * @param {number} x 坐标, 从0开始
 * @param {number} y 坐标, 从0开始
 * @param {*} width 
 */
const getColorIndicesForCoord = (x, y, width) => {
    const red = y * (width * 4) + x * 4;
    return [red, red + 1, red + 2, red + 3];
};

/**
 * 
 * @param {number} x 坐标, 从0开始
 * @param {number} y 坐标, 从0开始
 * @param {*} width 
 */
const getRgba = function (x, y, imagedata) {
    let indices = getColorIndicesForCoord(x, y, imagedata.width);
    let data = imagedata.data;
    return [data[indices[0]], data[indices[1]], data[indices[2]], data[indices[3]]]
};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = function (r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function download(imageData) {
    let imgWidth = imageData.width;
    let imgHeight = imageData.height;

    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet([]);

    /* Add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet_name");

    // 设置单元格宽度和高度
    const colWidth = 20;
    var wscols = [{ wpx: colWidth }];
    for (let i = 0; i < imgWidth; i++) {
        wscols.push(wscols[0]);
    }
    worksheet['!cols'] = wscols;

    const rowHeight = colWidth;
    var wsrows = [
        { hpx: rowHeight },
    ];
    for (let i = 0; i < imgHeight; i++) {
        wsrows.push(wsrows[0]);
    }
    worksheet['!rows '] = wsrows;

    // 填充数据
    let rowValues = new Array(imgWidth).fill("")
    let table = new Array(imgHeight).fill(rowValues);
    XLSX.utils.sheet_add_aoa(worksheet, table, { origin: "A1" });

    //设置单元格的背景颜色
    for (let rowIndex = 0; rowIndex < imgHeight; rowIndex++) {
        let y = rowIndex;
        for (let colIndex = 0; colIndex < imgWidth; colIndex++) {
            let x = colIndex;
            var cellref = XLSX.utils.encode_cell({ c: colIndex, r: rowIndex });
            let cell = worksheet[cellref];
            let rgbArray = getRgba(x, y, imageData)
            let rgb = rgbToHex(...rgbArray);
            cell.s = { fill: { fgColor: { rgb: rgb } } };
            // console.debug(`x,y = ${x},${y} `, cell);
        }
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