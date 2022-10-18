<template>
  <div style="">
    <!-- =================搜索框=================== -->
    <div style="margin-bottom: 10px">
      <el-input
        placeholder="请输入分类名称"
        style="width: 240px"
        v-model="params.username"
      ></el-input>

      <el-button style="margin-left: 10px" type="primary" @click="load">
        <i class="el-icon-search"></i>
        <span>搜索</span> </el-button
      ><el-button style="margin-left: 10px" type="warning" @click="reset">
        <i class="el-icon-refresh"></i>
        <span>重置</span>
      </el-button>
    </div>
    <!-- =================搜索框end=================== -->

    <!-- ======================表格数据===================== -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="编号" width="80px"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createtime" label="创建时间"></el-table-column>
      <el-table-column prop="updatetime" label="更新时间"></el-table-column>

      <el-table-column label="操作" width="230px">
        <template v-slot="scope">
          <el-button
            type="primary"
            @click="$router.push('/editCategory?id=' + scope.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            style="margin-left: 5px"
            title="确认删除？"
            @confirm="del(scope.row.id)"
          >
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- ======================表格数据end===================== -->

    <!-- ===============分页==================== -->
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
    <!-- ================分页end================= -->
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "CategoryList",
  data() {
    return {
      category: localStorage.getItem("category")
        ? JSON.parse(localStorage.getItem("category"))
        : {},
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        name: "",
      },
    };
  },
  created() {
    this.load();
  },

  methods: {
    // =================删除=====================
    del(id) {
      request.delete("/category/delete/" + id).then((res) => {
        if (res.code === "200") {
          this.$message.success("删除成功");
          this.load();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        username: "",
        phone: "",
        email: "",
      };
      this.load();
    },
    load() {
      request.get("/category/page", { params: this.params }).then((res) => {
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
