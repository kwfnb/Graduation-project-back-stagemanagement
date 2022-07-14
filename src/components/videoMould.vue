<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-24 02:58:52
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-25 05:04:29
-->
<template>
  <div class="videoM">
    <video width="320" height="240" controls>
      <source :src="url" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  props: ["url"],
};
</script>

<style lang="less" scoped>
.videoM {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
