<template>
  <div class="pcContent hashRate">
    <ul ref="uls">
      <li :style="{ width: widths }">
        <img src="./../assets/3.jpg" alt="" />
        <span class="title">Network Hash Rate</span>
        <span>{{objData.hashRate}} H/s</span>
      </li>
      <li :style="{ width: widths }">
        <img src="./../assets/7.jpg" alt="" />
        <span class="title">Block Difficulty</span>
        <span>{{objData.difficulty}}</span>
      </li>
      <li
        :style="{ width: widths }"
        class="to-blockdh"
        @click="toBlockDh"
        v-if="isShow"
      >
        <span class="title">Block Difficulty History</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    objData: {
      type: Object,
      default: {
        hashRate: '--',
        difficulty: '--'
      }
    }
  },
  data() {
    return {
      widths: "33.33%",
    };
  },
  methods: {
    toBlockDh() {
      this.$router.push({ path: "/blockDH" });
    },
    showHandle() {
      if (!this.isShow) {
        this.widths = "49%";
      } else {
        this.widths = "33.3%";
      }
    },
  },
  mounted() {
    this.showHandle();
  },
};
</script>

<style scoped>
/* list */
.hashRate {
  margin-top: 25px;
  height: 60px;
  background: #fff;
  border-left: 3px solid #409eff;
}
.hashRate ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  height: 60px;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.hashRate ul li {
  display: flex;
  align-items: center;
  margin-right: 60px;
  height: inherit;
  width: 33.3%;
}
.hashRate ul li img {
  width: 28px;
  height: 26px;
  display: inline-block;
}
.hashRate ul li span.title {
  color: #409eff;
  margin-right: 10px;
  margin-left: 2px;
  font-size: 14px;
  font-weight: 700;
}

.hashRate ul li.to-blockdh {
  cursor: pointer;
  margin-right: 10px;
}
.hashRate ul li:nth-child(3) {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}


@media screen and (max-width: 960px) {
  .hashRate {
    border: none;
    height: auto;
    margin: 15px 15px;
    width: inherit;
  }
  .hashRate ul {
    display: block;
    height: inherit;
    padding: 0;
  }
  .hashRate ul li {
    width: initial !important;
    height: 40px;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    margin-right: 0 !important;
  }
  .hashRate ul li img {
    display: none;
  }
  .hashRate ul li:nth-child(3) {
    text-align: right;
    display: flex;
    justify-content: space-between;
  }
}
</style>