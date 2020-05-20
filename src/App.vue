<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>你好</div>
    <button @click="test"> test</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import xlsx from "./xlsx/download.js"
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    test(){
      console.debug("test");
      console.debug("test", typeof require !== 'undefined');
      xlsx.download()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
