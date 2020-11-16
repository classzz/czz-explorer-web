<template>
  <div class="mt2">
    <div class="pc-fee-table">
      <pcSecTitle
        :imgs="'2.jpg'"
        :czzName="$t('home.transactionInfo')"
      />
      <div class="czz-fee-table">
        <ul class="table-header bb" v-for="(item,i) in transactionsList"
        :key="i">
          <li>
            <div>ID {{ item.txid }}</div>
            <div></div>
            <div>
              {{$t('home.Transacitons.fees')}}: <span class="blue1">{{ item.transFees }}</span>
            </div>
          </li>
          <li>
            <div class="fee-sub-table">
              <div class="table-ul" v-for="(itm,j) in item.in" :key="j">
                <div class="id-price blue1 head" @click="toAddress(itm.val)">{{itm.val}}</div>
                <div class="fee-price" style="color:#e6a23c">{{itm.no}}</div>
              </div>
              <div v-if="item.in.length <=0 ">coinbase</div>
            </div>
            <div>--</div>
            <div class="fee-add-table">
              <div class="table-ul" v-for="(itm,j) in item.out" :key="j">
                <div class="id-price blue1 head" @click="toAddress(itm.val)">{{itm.val}}</div>
                <div class="fee-price blue1">{{itm.no}}</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="loading" v-if="loading"><i class="el-icon-loading blue1"></i></div>
      </div>
    </div>
    <div class="web-fee-table">
      <titles :headerTitles="$t('home.transactionInfo')" />
      <div
        v-for="(item, i) in transactionsList"
        :key="i"
        class="bb"
        style="margin-bottom: 10px; padding-bottom: 10px"
      >
        <webSecTitle
          :titleName="$t('home.Transacitons.time')"
          :titleVal="`${item.time}`"
          :isOmit="false"
        />
        <webSecTitle :titleName="'ID'" :titleVal="item.txid" :isOmit="false" />
        <webSecTitle
          :titleName="$t('home.Transacitons.send')"
          :arrCont="item.in"
          :titleVal="item.in.length <= 0 ? 'coinbase' : ''"
          :isOmit="false"
          @clicks="toAddress"
        />
        <webSecTitle
          :titleName="$t('home.Transacitons.accept')"
          :arrCont="item.out"
          :isOmit="false"
          @clicks="toAddress"
        />
      </div>
      <div class="loading" v-if="loading"><i class="el-icon-loading blue1"></i></div>
    </div>
  </div>
</template>

<script>
import pcSecTitle from "./pcSecTitle";
import titles from "./titles";
import webSecTitle from "./webSecTtitle";
import { transactions,wallet } from "./../api/api";
export default {
  props: ["height","hash","walletInfo","transactionsList"],
  components: {
    pcSecTitle,
    titles,
    webSecTitle,
  },
  data() {
    return {
      // transactionsList: [],
      loading: false
    };
  },
  methods: {
    async getTransaction() {
      this.loading = true
      let post = {}
      if(this.hash) {
        post = {transHash: this.hash}
      } 
      if(this.height) {
        post = {
        limit: 8,
        blockHeight: this.height,
      }
      }
      let { items: res } = await transactions(post);
      this.getList(res)
      this.loading = false
    },

    async wallet() {
      this.loading = true
      let {items:res} = await wallet({address: this.walletInfo})
      this.getList(res)
      console.log(res);
      this.loading = false
    },

    getList(arr) {
      arr.forEach((item,i) => {
        item.time = this.$format(item.createdTime);
        item.in = [];
        item.vin.forEach((itm,k) => {
          if (itm.value) {
            item.in.push({
              val: itm.address,
              no: `-${itm.value}`,
            });
          }
        });
        item.out = [];
        item.vout.forEach((it, j) => {
          if (it.value) {
            item.out.push({
              no: `+${it.value}`,
              val: `${it.scriptPubKey.addresses[0]}`,
            });
          }
        });
      });
      this.transactionsList = JSON.parse(JSON.stringify(arr));
      this.$forceUpdate()
    },

    toAddress(val) {
      this.$router.push({
        path: "/address",
        query: { address: val },
      });
    }
  },
  mounted() {},
};
</script>

<style scoped>
.loading{
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}
.pc-fee-table {
  display: block;
}
.web-fee-table {
  display: none;
}
.czz-fee-table {
  padding-top: 10px;
}
.table-header li {
  display: flex;
  align-items: center;
  padding: 10px 10px;
}
.table-header li>div {
  width: 45%;
}
.table-header li:first-child>div:nth-child(1) {
  width: 70%;
  font-size: 15px;
}
.table-header li>div:nth-child(2){
width: 10%;
text-align: center;
}
.table-header li:first-child>div:nth-child(2) {
  text-align: center;
  width: 10%;
}
.table-header li:first-child>div:last-child {
  text-align: right;
  widows: 20%;
}
.add-fee {
  color: #409eff;
}
.sub-fee {
  color: #f56c6c;
}
.table-ul{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 14px;
}
.fee-price{
  flex: 2;
  text-align: right;
}
.id-price {
  flex: 5;
  word-break: break-all;
}
@media screen and (max-width: 960px) {
  .pc-fee-table {
    display: none;
  }
  .web-fee-table {
    display: block;
  }
}
</style>