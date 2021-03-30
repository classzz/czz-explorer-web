<template>
  <div>
    <pcSecTitle
      :imgs="'5.jpg'"
      :czzName="$t('home.transactionChange')"
      :czzVal="hashId"
    />
    <div v-for="item in dhItems" :key="item.mid">
      <ul class="sec-content">
        <li>
          <div class="sec-name">mid</div>
          <div class="sec-val">
            {{ item.mid }}
          </div>
        </li>
        <li>
          <div class="sec-name">asset_type</div>
          <div class="sec-val">
            {{ item.asset_type }}
          </div>
        </li>
        <li>
          <div class="sec-name">convert_type</div>
          <div class="sec-val">
            {{ item.convert_type }}
          </div>
        </li>
        <li>
          <div class="sec-name">pub_key</div>
          <div class="sec-val">
            {{ item.pub_key }}
          </div>
        </li>
        <li>
          <div class="sec-name">ext_tx_hash</div>
          <div class="sec-val">
            {{ item.ext_tx_hash }}
          </div>
        </li>
        <li>
          <div class="sec-name">tx_hash</div>
          <div class="sec-val">
            {{ item.tx_hash }}
          </div>
        </li>
        <li>
          <div class="sec-name">confirm_ext_tx_hash</div>
          <div class="sec-val">
            {{ item.confirm_ext_tx_hash }}
          </div>
        </li>
        <li>
          <div class="sec-name">amount</div>
          <div class="sec-val">
            {{ item.amount }}
          </div>
        </li>
        <li>
          <div class="sec-name">fee_amount</div>
          <div class="sec-val">
            {{ item.fee_amount }}
          </div>
        </li>
        <li>
          <div class="sec-name">to_token</div>
          <div class="sec-val">
            {{ item.to_token }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pcSecTitle from "./pcSecTitle";
import titles from "./titles";
import webSecTitle from "./webSecTtitle";
export default {
  props: ["hashId", "dhItems"],
  components: {
    pcSecTitle,
    titles,
    webSecTitle,
  },
  data() {
    return {
      // transactionsList: [],
      loading: false,
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.sec-content li {
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px 10px;
}
.sec-content li:nth-child(2n) {
  background: #eee;
}
.sec-content li .sec-name {
  width: 200px;
}
</style>