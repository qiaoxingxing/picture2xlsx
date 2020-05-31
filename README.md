[TOC]

# 说明
图片(位图)是一个个像素点, 把每一个像素填到excel的单元格, 就能在excel里组成一个图片. 
就像这样: 
![](index_files/35eeb029-3580-4fb0-ae07-d3b7e2ce98f9.png)

# 程序使用

打开dist/index.html: 
![](index_files/c38a7635-09fd-48a5-9916-5eb837ec1d26.jpg)

# 源码说明
## 使用的工具
- vue框架, vue-cli生成项目脚手架
- [sheetjs](https://github.com/SheetJS/sheetjs) js操作excel
- [protobi/js-xlsx](https://github.com/protobi/js-xlsx) sheetjs的fork, 可以设置单元格的样式

## 启动
```
cd picture2xlsx
npm install
npm run serve 
```
