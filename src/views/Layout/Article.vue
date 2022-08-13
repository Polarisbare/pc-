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
          <el-button icon="el-icon-plus" size="small" type="primary" round>
            添加面经
          </el-button>
        </div>
      </template>
          <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="stem" label="标题" width="300"> </el-table-column>

      <el-table-column prop="creator" label="作者"> </el-table-column>

      <el-table-column prop="likeCount" label="点赞"> </el-table-column>

      <el-table-column prop="views" label="浏览数"> </el-table-column>

      <el-table-column prop="createdAt" label="更新时间"> </el-table-column>

      <el-table-column prop="" label="操作">
        <!-- scope.$index, scope.row) -->
        <template slot-scope="scope">
          <div class="actions">
            <i class="el-icon-view"></i>
            <i class="el-icon-edit-outline"></i>
            <i class="el-icon-delete"></i>
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


  </div>
</template>

<script>
export default {
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
      current: 1,
      pageSize: 20,
      total:0
    };
  },
  created() {
    this.getlist()
    
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
      this.pageSize = val
      this.getlist()
      
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 当前页码   点击之后要请求数据
      this.current = val
      this.getlist()

    },
    async getlist(){
      let res = await this.$axios({
      url: "/admin/interview/query",
      params: {
        current: this.current,
        pageSize: this.pageSize,
      },
    });
    this.tableData = res.data.data.rows;
    // console.log(res.data.data)
    this.total = res.data.data.total
    }
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
