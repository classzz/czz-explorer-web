<template>
  <div class="block-dh">
    <Header :heights="heightTitle" />
    <div class="mt2 pcContent block-dh-table">
      <transactionChange :dhItems="dhList" />
      <div class="web-pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pagination.total"
          :page-size="pagination.limit"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <div class="webContern mt2">
      <transactionChange :dhItems="dhList" />
      <div class="web-pagination">
        <el-pagination
          background
          small
          layout="prev, pager, next"
          :total="pagination.total"
          :page-size="pagination.limit"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./../components/header";
import Footer from "./../components/footer";
import homeList from "./../components/homeList";
import transactionChange from "./../components/transactionChange";
import titles from "./../components/titles";
import { transactions_dhlist } from "../api/api";
export default {
  components: {
    Footer,
    Header,
    homeList,
    transactionChange,
    titles,
  },
  data() {
    return {
      headersInfo: {},
      index: 0,
      heightTitle: "180px",
      loading: false,
      transactionTable: [],
      dhList: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 20,
      },
    };
  },
  methods: {
    async getDhList() {
      let res = await transactions_dhlist({
        page: this.pagination.page,
        limit: 20,
      });
      this.pagination.total = res.totalPages;
      this.dhList = res.items;
    },
  },
  mounted() {
    this.getDhList();
  },
};
</script>


<style>
.block-dh .webContern {
  display: none;
}
.block-dh .block-dh-table {
  display: block;
}
.block-dh .el-collapse-item__header {
  height: initial;
  line-height: 1.5;
}
.block-dh .block-dh-ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  padding-right: 13px;
}
.block-dh .block-dh-ul-title {
  padding-right: 0;
  width: 690px;
}
.block-dh .block-dh-ul li {
  flex: 1;
}
.web-pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px auto 0;
}
@media screen and (max-width: 960px) {
  .block-dh .block-dh-table {
    display: none;
  }
  .block-dh .webContern {
    margin: 0 15px;
    display: block;
  }
}
</style>

<style scoped>
</style>