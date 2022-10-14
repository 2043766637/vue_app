<template>
  <div>
    <!-- 搜索框 -->
    <div style="margin-bottom: 10px">
      <el-input placeholder="请输入名称" style="width: 240px"></el-input>
      <el-input
        placeholder="请输入联系方式"
        style="width: 240px; margin-left: 10px"
      ></el-input>
      <el-button style="margin-left: 10px" type="primary">
        <i class="el-icon-search"></i>
        <span>搜索</span>
      </el-button>
    </div>
    <el-table :data="tableData" stripe style="width: calc(100vw - 210px)">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="margin-top:10px">
      <el-pagination background page-size="5" layout="prev, pager, next" :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      tableData: [
       { name: "王二", age: 20, phone: 13970259035 },
        { name: "张三", age: 21, phone: 13970259035 },
        { name: "里斯", age: 18, phone: 13970259035 },  { name: "王二", age: 20, phone: 13970259035 },
        { name: "张三", age: 21, phone: 13970259035 },
        { name: "里斯", age: 18, phone: 13970259035 },  { name: "王二", age: 20, phone: 13970259035 },
        { name: "张三", age: 21, phone: 13970259035 },
        { name: "里斯", age: 18, phone: 13970259035 },  { name: "王二", age: 20, phone: 13970259035 },
     
        { name: "里斯", age: 18, phone: 13970259035 },  { name: "王二", age: 20, phone: 13970259035 },
 
      ],
    };
  },
};
</script>
