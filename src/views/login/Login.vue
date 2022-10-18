<template>
  <div style="position: relative">
    <el-card class="cover" v-if="loginAdmin.id">
      <div slot="header"></div>
      <div>
        <slide-verify
          :l="42"
          :r="10"
          :w="310"
          :h="155"
          :accuracy="10"
          slider-text="向右滑动"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
        ></slide-verify>
        <div>{{ msg }}</div>
      </div>
    </el-card>

    <div
      style="
        width: 500px;
        height: 400px;
        background-color: white;
        border-radius: 10px;
        margin: 150px auto;
        padding: 50px;
      "
    >
      <div
        style="
          margin: 30px;
          text-align: center;
          font-size: 30px;
          font-weight: bold;
          color: dodgerblue;
        "
      >
        登 录
      </div>
      <el-form ref="loginForm" :model="admin" :rules="rules">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号"
            size="medium"
            prefix-icon="el-icon-user"
            v-model="admin.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            placeholder="请输入密码"
            size="medium"
            prefix-icon="el-icon-lock"
            v-model="admin.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            size="medium"
            type="primary"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "Login",
  data() {
    return {
      admin: {},
      loginAdmin: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, trigger: "blur", message: "长度在3-10个字符" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, trigger: "blur", message: "长度在3-10个字符" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          request.post("/admin/login", this.admin).then((res) => {
            if (res.code === "200") {
              this.loginAdmin = res.data;
            } else {
              this.$notify.error(res.msg);
            }
          });
        }
      });
    },

    onSuccess() {
      this.$notify.success("登录成功");
      localStorage.setItem("admin", JSON.stringify(this.loginAdmin));
      this.$router.push("/");
    },
    onFail() {},
    onRefresh() {},
  },
};
</script>


<style >
.cover {
  width: fit-content;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>