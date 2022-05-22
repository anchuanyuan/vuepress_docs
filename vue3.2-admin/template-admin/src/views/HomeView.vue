<script setup lang="ts">
const boxwidth = '100px'
</script>

<template>
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  <el-button>中文</el-button>
  <div class="box"></div>
</template>
<style>
.box {
  width: v-bind(boxwidth);
  height: 100px;
  background-color: red;
}
</style>
