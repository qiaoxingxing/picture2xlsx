<template>
  <div id="app">
    <p>1. 选择图片</p>
    <img alt="image" src="./assets/upload.jpg" id="img" @click="uploadImage" />
    <p>2.下载XLSX</p>
    <img alt="image" src="./assets/downloadxls.jpg" id="download" @click="downloadXlsx" />
    <p></p>
    <!-- <button @click="test">test</button> -->
    <input
      type="file"
      name="file"
      accept="image/*"
      id="file"
      @change="fileChange"
      style="display:none"
    />
    <div id="comment">
      <br />
      <br />
      <p>几点说明</p>

      <ul>
        <li>图片不会被上传到网络</li>
        <li>转换后的xlsx大小限制在200*200以下</li>
        <li>源码地址: <a href="https://gitee.com/qiaoxingxing/picture2xlsx">gitee</a> <a href="https://github.com/qiaoxingxing/picture2xlsx">github</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import xlsx from "./xlsx/download.js";

export default {
  name: "App",
  data() {
    return {
    };
  },
  methods: {
    test() {},
    downloadXlsx() {
      const loading = this.$loading({
        lock: true,
        text: "处理中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        try {
          var img = document.getElementById("img");
          var canvas = document.createElement("canvas");
          let scale = this.getScale(img.width, img.height);
          let width = img.width * scale;
          let height = img.height * scale;

          canvas.width = width;
          canvas.height = height;
          var context = canvas.getContext("2d");
          context.drawImage(img, 0, 0, width, height);
          var imageData = context.getImageData(0, 0, width, height);
          console.debug("imageData", imageData);
          xlsx.download(imageData);
          loading.close();
        } catch (e) {
          loading.close();
          console.debug("error", e);
          this.$message.error("出现错误");
        }
      }, 100);
    },
    //获取缩放的比例
    getScale(width, height) {
      const max_size = 200; //最大200px
      let max = Math.max(width, height);
      if (max > max_size) {
        return max_size / max;
      } else {
        return 1;
      }
    },
    uploadImage() {
      document.getElementById("file").click();
    },
    fileChange() {
      this.loadImage();
    },
    loadImage() {
      try {
        if (document.getElementById("file").files.length < 0) {
          return;
        }
        //获取上传的文件
        var file = document.getElementById("file").files[0];
        var type = file.type;
        type = type.substring(0, type.indexOf("/"));
        if (type != "image") {
          this.$message.error("请选择一个jpg|gif|png 格式图片");
          return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
          var result = e.target.result;
          document.getElementById("img").src = result;
        };
        reader.readAsDataURL(file);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 30px;
  max-width: 250px;
  max-height: 250px;
  margin-left: auto;
  margin-right: auto;
}
img {
  max-width: 200px;
  max-height: 200px;
}
#comment {
  color: gray;
  margin-left: auto;
  margin-right: auto;
}
</style>
