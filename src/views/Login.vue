<template>
  <div class="login-page">
    <el-card>
      <template #header>面经运营后台</template>

      <!-- autocomplete: auto自动  complete完成  -->
      <el-form autocomplete="off" :model="form" ref="box" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="输入用户名" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="输入用户密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>

        <el-form class="tc">
          <el-button type="primary" @click="login">登 录</el-button>
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
    let fn = (rule, value, callback) => {
      let res = /^[a-zA-Z0-9]{5,11}$/;
      if (res.test(value) == false) {
        // console.log(res)
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }, //trigger   触发
          {
            min: 5,
            max: 11,
            message: "长度在 5 到 11 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入正确密码", trigger: "blur" },
          { validator: fn, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.box.validate(async (valid) => {
        if (valid) {
          //验证通过
          // 发送请求
          let res = await this.$axios({
            url: "/auth/login",
            method: "POST",
            data: this.form,
          });
          // 小项目推荐  本地化
          // localStorage.setItem('pc-token','Bearer '+res.data.data.token)
          // 使用vuex 把token存到数据中心封装方法
          // 同步
          this.$store.commit("user/set", "Bearer " + res.data.data.token);
          this.$router.push("/dashboard");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
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
