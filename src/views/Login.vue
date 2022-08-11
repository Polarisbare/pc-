<template>
  <div class="login-page">
    <el-card>
      <template #header>面经运营后台</template>

      <!-- autocomplete: auto自动  complete完成  -->
      <el-form autocomplete="off" :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="输入用户名" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            type="password"
            placeholder="输入用户密码"
            v-model="password"
          ></el-input>
        </el-form-item>

        <el-form class="tc">
          <el-button type="primary">登 录</el-button>
          <el-button>重 置</el-button>
        </el-form>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login-page",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },//trigger   触发
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header {
      height: 80px;
      background: rgba(114, 124, 245, 1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
