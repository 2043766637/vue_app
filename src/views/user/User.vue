<template>
  <div style="">
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
    <!-- 表格数据 -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="编号" width="80px"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="username" label="会员号"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="updatetime" label="更新时间"></el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="prop"
        label="操作"
      >
        <template v-slot="scope">
          <el-button
            type="primary"
            @click="$router.push('/editUser?id=' + scope.row.id)"
            >编辑</el-button
          >
          <el-popconfirm style="margin-left:5px" title="确认删除？" @confirm="del(scope.row.id)">
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
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
  name: "User",
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
    del(id) {
      request.delete("/user/delete/" + id).then((res) => {
        if (res.code === "200") {
          this.$message.success("删除成功");
          this.load()
        } else {
          this.$message.error(res.msg);
        }
      });
    },
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
