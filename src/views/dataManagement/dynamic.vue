<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-23 20:27:37
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-14 22:56:56
-->
<template>
  <div class="dynamic">
    <div class="topFrom">
      <el-form :inline="true" label-width="60px" :model="fromTable">
        <el-form-item label="动态id"
          ><el-input v-model="fromTable.id"></el-input
        ></el-form-item>
        <el-form-item label="用户"
          ><el-input v-model="fromTable.userName"></el-input
        ></el-form-item>
        <el-form-item label="类型">
          <el-select v-model="fromTable.type" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="background: #76c99f; border: none"
            @click="query(1)"
            >查询</el-button
          >
          <el-button @click="query(0)">清空</el-button>
        </el-form-item>
      </el-form>
      <!-- <div>
        <el-button
          type="primary"
          style="background: #76c99f; border: none"
          @click="query(1)"
          >查询</el-button
        >
        <el-button @click="query(0)">清空</el-button>
      </div> -->
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" height="480">
        <el-table-column fixed type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="id" label="动态id" width="160">
        </el-table-column>
        <el-table-column label="用户" show-overflow-tooltip width="240">
          <template slot-scope="scope">
            <div class="column">
              <el-avatar :size="35" :src="scope.row.userPort"></el-avatar>
              {{ scope.row.userName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="120">
          <template slot-scope="scope">
            {{
              scope.row.type == 0
                ? "视频"
                : scope.row.type == 1
                ? "图片"
                : "纯文字"
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="动态内容"
          show-overflow-tooltip
          width="200"
        >
        </el-table-column>
        <el-table-column prop="giveNum" label="点赞数" width="120">
        </el-table-column>
        <el-table-column prop="comment" label="评论数" width="120">
        </el-table-column>
        <el-table-column label="附件" width="120">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.type != '2'"
              @click="
                handleClick(scope.row.file, scope.row.type, scope.row.content)
              "
              type="text"
              size="small"
              >预览</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <mediaDialog
        class="mediaDialog"
        :dialogVisible="dialogVisible"
        :mediaType="mediaType"
        :mediaUrl="mediaUrl"
        :mediaText="mediaText"
        @close="close"
      ></mediaDialog>
    </div>
    <div style="margin-top: 15px">
      <el-pagination
        class="pagination"
        background
        @current-change="currentChange"
        layout="total,prev, pager, next"
        :total="total"
        :page-size="10"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { selectDynamic } from "../../api/dynamic.js";
import mediaDialog from "../../components/mediaDialog.vue";
export default {
  components: {
    mediaDialog,
  },
  data() {
    return {
      current: "1",
      mediaType: "0",
      mediaUrl: "",
      mediaText: "",
      dialogVisible: false,
      total: 0,
      tableData: [],
      fromTable: {
        id: "",
        userName: "",
        type: "",
      },
      options: [
        {
          value: "0",
          label: "视频",
        },
        {
          value: "1",
          label: "图片",
        },
        {
          value: "2",
          label: "纯文字",
        },
      ],
    };
  },
  mounted() {
    this.selectDynamic({
      size: 10,
      current: 1,
    });
  },
  methods: {
    selectDynamic(from) {
      this.tableData = [];
      selectDynamic(from).then((res) => {
        let list = res.data.data;
        this.total = list[0].total;
        for (let i = 0; i < list.length; i++) {
          this.tableData.push({
            id: list[i].dynamicId,
            userName: list[i].userName,
            userPort: list[i].dynamicPort,
            type: list[i].dynamicType,
            content: list[i].dynamicContent,
            giveNum: list[i].dynamicDianzan,
            comment: list[i].dynamicComment,
            file: list[i].dynamicUrl,
          });
        }
      });
    },
    handleClick(url, type, content) {
      this.mediaType = type;
      this.mediaUrl = url;
      this.mediaText = content;
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    query(e) {
      if (e) {
        this.current = 1;
        this.selectDynamic({
          dynamicId: this.fromTable.id,
          userName: this.fromTable.userName,
          dynamicType: this.fromTable.type,
          current: this.current,
          size: 10,
        });
      } else {
        this.fromTable = {
          id: "",
          userName: "",
          type: "",
        };
      }
    },
    currentChange(c) {
      this.selectDynamic({
        size: 10,
        current: c,
      });
    },
  },
};
</script>

<style lang="less">
.dynamic {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.column {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}
.topFrom {
  margin-top: 20px;
}
.pagination {
  /* margin-bottom: 50px; */
}
.table {
  /* margin-top: 10px; */
}
</style>
