<template>
  <div class="clear-footer">
    <div class="footer">
      <div class="wenzi body pcContent">
        <div>
          <img src="../assets/class_logo.svg" />
          <p class="classzz-language" @click="changeLanguage" style="display:none">
            <span :class="lan == 'zh' ? 'active borderl4' : 'borderl4'">中</span
            ><span :class="lan == 'en' ? 'active borderr4' : 'borderr4'"
              >英</span
            >
            <!-- <span v-if="lan == 'zh'" class="bann-zh-line"></span
          ><span v-if="lan == 'en'" class="bann-en-line"></span
          > -->
          </p>
        </div>
        <div>
          <p>Powered by ClassZZ Eco Team | Copyright©classzz.com 2020</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lan: this.$getLanguage(),
    };
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale == "zh"
        ? (this.$i18n.locale = "en")
        : (this.$i18n.locale = "zh");
      this.$setStorage("czzLan", this.$i18n.locale);
      this.lan = this.$i18n.locale;
    },
  },
};
</script>

<style scoped>
.clear-footer{
  height: 120px;
}
/* footer */
.footer {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  background-color: #409eff;
  color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 9999;;
}
.footer .wenzi {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: Center;
}
.footer .wenzi > div {
  width: 200px;
  height: 50px;
}
.footer .wenzi div:nth-child(2) {
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.footer .wenzi > div img {
  width: 126px;
  height: 50px;
}

.classzz-language {
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  display: none;
}
.classzz-language span {
  padding: 0 4px;
  text-align: center;
  background: #909399;
}
.classzz-language span.bann-zh-line {
  padding: 0;
  border: 10px solid transparent;
  border-left: 11px solid #e6a23c;
  border-bottom: 11px solid #e6a23c;
}
.classzz-language span.bann-en-line {
  padding: 0;
  border: 10px solid transparent;
  border-right: 11px solid #e6a23c;
  border-top: 11px solid #e6a23c;
}
.classzz-language span.active {
  background: #e6a23c;
}
.classzz-language .borderl4 {
  border-radius: 4px 0 0 4px;
}
.classzz-language .borderr4 {
  border-radius: 0 4px 4px 0;
}

@media screen and (max-width: 960px) {
  .footer .wenzi {
    display: block;
  }
  .footer .wenzi div {
    text-align: center;
    width: 100% !important;
    height: 44px !important;
  }
  .footer .wenzi div:first-child {
    padding-top: 10px;
    position: relative;
  }
  .classzz-language {
    display: block;
    position: absolute;
    right: 0;
    top: 40%;
    font-size: 16px;
  }
}
</style>