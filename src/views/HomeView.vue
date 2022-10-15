<template>
  <div>
    <!-- 搜索框 -->
    <div style="margin-bottom: 10px">
      <el-input
        placeholder="请输入名称"
        style="width: 240px"
        v-model="params.name"
      ></el-input>
      <el-input
        placeholder="请输入联系方式"
        style="width: 240px; margin-left: 10px"
        v-model="params.phone"
      ></el-input>
      <el-button style="margin-left: 10px" type="primary" @click="load">
        <i class="el-icon-search"></i>
        <span>搜索</span> </el-button
      ><el-button style="margin-left: 10px" type="warning" @click="reset">
        <i class="el-icon-refresh"></i>
        <span>重置</span>
      </el-button>
    </div>
    <el-table :data="tableData" stripe style="width: calc(100vw - 210px)">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="margin-top: 10px">
      <el-pagination
        background
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "HomeView",
  data() {
    return {
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        name: "",
        phone: "",
      },
    };
  },
  created() {
    this.load();
  },
  methods: {
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        name: "",
        phone: "",
      };
      this.load();
    },
    load() {
      // fetch("http://localhost:9090/user/list")
      //   .then((res) => res.json())
      //   .then((res) => {
      //     console.log(res);
      //     this.tableData = res;
      //   });
      request.get("/user/page", { params: this.params }).then((res) => {
        if (res.code === "200") {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },

    handleCurrentChange(pageNum) {
      this.params.pageNum = pageNum;
      this.load();
    },
  },
};
</script>
