<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 300 条记录</span>
          <el-button
            @click="show('新增')"
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
          >
            添加面经
          </el-button>
        </div>
      </template>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="stem" label="标题" width="300">
        </el-table-column>

        <el-table-column prop="creator" label="作者"> </el-table-column>

        <el-table-column prop="likeCount" label="点赞"> </el-table-column>

        <el-table-column prop="views" label="浏览数"> </el-table-column>

        <el-table-column prop="createdAt" label="更新时间"> </el-table-column>

        <el-table-column prop="" label="操作">
          <!-- scope.$index, scope.row) -->
          <template slot-scope="scope">
            <div class="actions">
              <i class="el-icon-view" @click="show('预览', scope.row.id)"></i>
              <i
                class="el-icon-edit-outline"
                @click="show('编辑', scope.row.id)"
              ></i>
              <i class="el-icon-delete" @click="del(scope.row.id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[20, 50, 70, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加抽屉 -->
    <el-drawer
      size="70%"
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <!--预览结构 -->
      <div v-if="title == '预览'" class="article-preview">
        <h5>{{ form.stem }}</h5>
        <div v-html="form.content"></div>
      </div>

      <!-- form表单 -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
        v-else
      >
        <el-form-item label="面经标题" prop="stem">
          <el-input v-model="form.stem"></el-input>
        </el-form-item>
        <el-form-item label="面经内容" prop="content">
          <!-- <el-input type="textarea" v-model="form.content"></el-input> -->
          <!-- 问题：第三方组件不配合校验 -->
          <!-- 解决：  
                    1.查看文档quillEditor是否有失去焦点的事件
                    2.需要调用文档的 -->
          <quillEditor v-model="form.content" @blur="blur"></quillEditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ wudi }}</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  name: "article-page",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      wudi: "立即新增",
      current: 1,
      pageSize: 20,
      total: 0,
      title: "",
      id: "",
      // 抽屉
      drawer: false,
      direction: "rtl",
      form: {
        stem: "",
        content: "",
      },
      rules: {
        stem: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        content: [
          { required: true, message: "请输入面经内容", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    // if(this.title == '新增'){

    // }
    // if(this.title == '编辑'){

    // }
    this.getlist();
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 每页多少条、
      this.pageSize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 当前页码   点击之后要请求数据
      this.current = val;
      this.getlist();
    },
    // 封装成函数
    async getlist() {
      let res = await this.$axios({
        url: "/admin/interview/query",
        params: {
          current: this.current,
          pageSize: this.pageSize,
        },
      });
      this.tableData = res.data.data.rows;
      // console.log(res.data.data)
      this.total = res.data.data.total;
    },
    // 抽屉关闭的时候执行函数
    handleClose() {
      if (this.title !== "预览") {
        // 关闭的时候清空表单内容
        this.$refs.form.resetFields("content");
      }

      // 把抽屉收回
      this.drawer = false;
      this.form.stem = ''
      this.form.content = ''
    },
    // 抽屉出现
    async show(str, id) {
      this.drawer = true;
      this.title = str;
      // 回显
      if (str == "编辑" || str == "预览") {
        this.wudi = "立即修改";
        // 需要拿到文章数据（前端scope.row   ajax接口拿）
        let res = await this.$axios({
          url: "/admin/interview/show",
          params: { id }, //参数是id    记住了点击编辑的时候一定要判断看看函数怎么写的去服务器请求数据编辑的是哪个传id参数就是id上面哟就直接写没有就写花括号
        });

        // 2.拿到数据回显
        // console.log(res)
        this.form.stem = res.data.data.stem;
        this.form.content = res.data.data.content;
        // 点击的时候记录id值  之后你修改完了才知道你修改的事哪个
        this.id = res.data.data.id;
      }
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 新增
          
          if (this.title == "新增") {
            let res = await this.$axios({
              url: "/admin/interview/create",
              method: "POST",
              data: this.form,
            });

            // 新增成功
            // console.log(res)
            this.$message({
              message: "恭喜你,新增成功",
              type: "success",
            });
          }
          // 编辑
          if (this.title == "编辑") {
            // 1.数据id点击编辑的时候记录下id值

            await this.$axios({
              url: "/admin/interview/update",
              method: "PUT",
              data: {
                ...this.form,
                id: this.id,
              },
            });

            this.$message({
              message: "恭喜你,修改成功",
              type: "success",
            });
          }

          // 关闭抽屉
          this.handleClose();
          // 重新加载列表
          this.getlist();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    blur() {
      this.$refs.form.validateField("content");
    },
    del(id) {
      //  获取id   scope.row.id
      this.$confirm("真的要删除吗")
        .then(async (_) => {
          await this.$axios({
            url: "/admin/interview/remove",
            method: "DELETE",
            data: { id },
          });
          // 成功
          this.$message({
            message: "恭喜你,删除成功",
            type: "success",
          });
          // 重新加载列表
          this.getlist();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
