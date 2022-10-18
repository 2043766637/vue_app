<template>
  <div style="">
    <!-- =================搜索框=================== -->
    <div style="margin-bottom: 10px">
      <el-input
        placeholder="请输入用户名"
        style="width: 240px"
        v-model="params.username"
      ></el-input>
      <el-input
        placeholder="请输入联系方式"
        style="width: 240px; margin-left: 10px"
        v-model="params.phone"
      ></el-input>
      <el-input
        placeholder="请输入邮箱"
        style="width: 240px; margin-left: 10px"
        v-model="params.email"
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
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="createtime" label="创建时间"></el-table-column>
      <el-table-column prop="updatetime" label="更新时间"></el-table-column>
      <el-table-column label="状态" width="230px">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.status"
            @change="changeStatus(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch> </template
      ></el-table-column>
      <el-table-column label="操作" width="230px">
        <template v-slot="scope">
          <el-button
            type="primary"
            @click="$router.push('/editAdmin?id=' + scope.row.id)"
            >编辑</el-button
          >
          <el-popconfirm
            style="margin-left: 5px"
            title="确认删除？"
            @confirm="del(scope.row.id)"
          >
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>
          <el-button
            type="warning"
            @click="handleChangePass(scope.row)"
            style="margin-left: 5px"
            >修改密码</el-button
          >
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

    <!-- =================修改密码弹框============================ -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="100px" ref="formRef" :rules="rules">
        <el-form-item label="新密码" prop="newPass">
          <el-input
            v-model="form.newPass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePass">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ==================修改密码弹框end============================= -->
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "Admin",
  data() {
    return {
      admin: localStorage.getItem("admin")
        ? JSON.parse(localStorage.getItem("admin"))
        : {},
      tableData: [],
      dialogFormVisible: false,
      total: 0,
      form: {},
      params: {
        pageNum: 1,
        pageSize: 10,
        username: "",
        phone: "",
        email: "",
      },
      rules: {
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 10, trigger: "blur", message: "长度在3-10个字符" },
        ],
      },
    };
  },
  created() {
    this.load();
  },

  methods: {
    changeStatus(row) {
      if (this.admin.id === row.id && !row.status) {
        this.$notify.warning("不可以");
        row.status = true;
        return false;
      }
      request.put("/admin/update", row).then((res) => {
        if (res.code === "200") {
          this.$notify.success("操作成功");
          this.load();
        } else {
          this.$notify.error(res.msg);
        }
      });
    },
    // ===========修改密码====================
    savePass() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          request.put("/admin/password", this.form).then((res) => {
            if (res.code === "200") {
              this.$notify.success("修改成功");

              if (this.form.id === this.admin.id) {
                localStorage.removeItem("admin");
                this.$router.push("/login");
              } else {
                this.dialogFormVisible = false;
                this.load();
              }
            } else {
              this.$notify.error("修改失败");
            }
          });
        }
      });
    },
    // ==============点击修改按钮触发函数=======================
    handleChangePass(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogFormVisible = true;
    },
    // =================删除=====================
    del(id) {
      request.delete("/admin/delete/" + id).then((res) => {
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
      request.get("/admin/page", { params: this.params }).then((res) => {
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
