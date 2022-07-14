<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-25 04:39:11
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-14 23:20:00
-->
<template>
  <el-dialog
    title="预览"
    :visible.sync="dialogVisible"
    width="50%"
    center
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="5px"
  >
    <!--     <div class="topText">
      <div>媒体文件名：</div>
      <div>文件格式：</div>
    </div> -->
    <span>附带文字：{{ mediaText }}</span>
    <div class="content" v-if="mediaType == 0">
      <video ref="vueRef" width="640" height="480" controls autoplay>
        <source ref="source" :src="mediaUrl" type="video/mp4" />
      </video>
    </div>
    <div class="content" v-if="mediaType == 1">
      <img :src="mediaUrl" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close()">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import videoMould from "./videoMould.vue";
export default {
  name: "mediaDialog",
  props: {
    dialogVisible: {
      default: () => false,
    },
    mediaUrl: {
      default: () => "",
    },
    mediaType: {
      default: () => "0",
    },
    mediaText: {
      default: () => "",
    },
  },
  watch: {
    mediaUrl(newValue, oldValue) {
      console.log(newValue, oldValue);
      if (this.$refs.vueRef) {
        this.$refs.vueRef.src = newValue;
        this.$refs.vueRef.play();
      }
    },
  },
  components: {
    videoMould,
  },
  methods: {
    close() {
      if (this.mediaType == 0) {
        this.$refs.vueRef.pause();
      }

      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
.topText {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 50px;
}
.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
