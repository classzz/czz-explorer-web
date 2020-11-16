<template>
  <div class="block-dh">
    <Header :heights="heightTitle" />
    <div class="mt2 pcContent block-dh-table">
      <blockTable :block-table="blockTable" :page="pagination.page" />
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
      <titles :headerTitles="$t('home.allBlock')" />
      <el-collapse v-model="index" v-loading="loading" accordion>
        <template v-for="(item, i) in blockTable">
          <el-collapse-item :name="i" :key="`${i}`">
            <template slot="title">
              <ul class="block-dh-ul block-dh-ul-title">
                <li class="czz-name">{{$t('home.blocks.blockHeight')}}</li>
                <li class="czz-value blue1">
                  <span @click.stop="toBlockDetails(item.height)">{{ item.height }}</span>
                </li>
              </ul>
            </template>
            <ul class="block-dh-ul">
              <li class="czz-name">{{$t('home.blocks.minner')}}</li>
              <li class="czz-value">
                {{ item.minerAddress? item.minerAddress: '--' }}
              </li>
            </ul>
            <ul class="block-dh-ul">
              <li class="czz-name">{{$t('home.blocks.size')}}</li>
              <li class="czz-value">
                {{ item.size }}
              </li>
            </ul>
            <ul class="block-dh-ul">
              <li class="czz-name">{{$t('home.blocks.reward')}}</li>
              <li class="czz-value">
                {{ item.reward }}
              </li>
            </ul>
            <ul class="block-dh-ul">
              <li class="czz-name">{{$t('home.blocks.state')}}</li>
              <li class="czz-value">
                {{(pagination.page> 1 || i>= 14) ? $t('home.blocks.confirmed') : `${i}/14`}}
              </li>
            </ul>
            <ul class="block-dh-ul">
              <li class="czz-name">{{$t('home.blocks.time')}}</li>
              <li class="czz-value">
                {{ item.time }}
              </li>
            </ul>
          </el-collapse-item>
        </template>
      </el-collapse>
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
import blockTable from "./../components/blockTable";
import titles from "./../components/titles";
import { blocks, latestHeight,difficulty } from "./../api/api";
export default {
  components: {
    Footer,
    Header,
    homeList,
    blockTable,
    titles,
  },
  data() {
    return {
      headersInfo: {},
      index: 0,
      heightTitle: "180px",
      loading: false,
      blockTable: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 20,
      },
    };
  },
  methods: {
    async difficulty() {
      let { items, criteria } = await difficulty();
      let headersInfo = items[0];
      headersInfo.difficulty = this.$toCurrencyString(headersInfo.difficulty);
      headersInfo.hashRate = this.$toCurrencyString(headersInfo.hashRate);
      this.headersInfo = headersInfo;
    },

    async blocks() {
      this.loading = true
      let { items: res, totalCount } = await blocks({
        page: this.pagination.page,
        limit: 20,
      });
      res.forEach((item) => (item.time = this.$format(item.createdTime)));
      this.blockTable = res;
      this.loading = false
      this.pagination.total = totalCount;
    },

    async latestHeight() {
      let res = await latestHeight();
      if (!this.headersInfo.height || res.height != this.headersInfo.height) {
        this.pagination.page = 1
        this.blocks();
      }
      this.clearHomeTime = setTimeout(() => {
        this.latestHeight();
      }, 5000);
    },
    handleCurrentChange(el) {
      this.pagination.page = el;
      this.blocks();
    },
    toBlockDetails(height) {
      if (!height) return;
      this.$router.push({ path: "/blockDetails", query: { height } });
    },
  },
  mounted() {
    this.difficulty()
    this.latestHeight();
    this.blocks();
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