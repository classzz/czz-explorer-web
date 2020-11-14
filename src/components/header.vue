<template>
<div>
  <div class="banner" :style="{ height: heights }">
    <div class="banner-box pcContent">
      <div class="bann">
        <img src="../assets/class_logo.svg" alt="" @click="tohome"/>
        <div class="banner-title">
          <p class="bann-classzz-name">Classzz Mainnet</p>
          <p class="classzz-language" @click="changeLanguage" style="display:none">
            <span :class="lan == 'zh' ? 'active borderl4' : 'borderl4'">中</span
            ><span :class="lan == 'en' ? 'active borderr4' : 'borderr4'"
              >英</span
            >
          </p>
        </div>
      </div>
      <h2 v-if="h2Title">Classzz Explorer</h2>
      <div class="ban-input">
        <el-input placeholder="请输入内容" v-model="input">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="toChange"
          ></el-button>
        </el-input>
      </div>
    </div>
  </div>
   <div class="web-head">
      <div class="czz-nav-bar czz-hairline--bottom">
        <div class="czz-search" v-if="openInput">
          <div class="czz-search__content czz-search__content--round">
            <div class="czz-cell czz-cell--borderless czz-field">
              <div class="czz-field__left-icon">
                <i class="el-icon-search"></i>
              </div>
              <div
                class="czz-cell__value czz-cell__value--alone czz-field__value"
                style="width: 100%"
              >
                <div class="czz-field__body">
                  <input
                    type="search"
                    placeholder="请输入搜索关键词"
                    class="czz-field__control"
                    v-model="input"
                    @keyup.enter="toChange"
                  />
                </div>
              </div>
            </div>
          </div>
          <div role="button" tabindex="0" class="czz-search__action" @click="openInput = false">取消</div>
        </div>
        <div class="czz-nav-bar__content" v-if="!openInput">
          <div class="czz-nav-bar__left" @click="goBack" v-if="!home">
            <i class="el-icon-arrow-left blue1"></i
            ><span class="czz-nav-bar__text"></span>
          </div>
          <div class="czz-nav-bar__left" v-if="home">
            <div class="logo-img" @click="tohome"></div>
            </div>
          <div class="czz-nav-bar__title czz-ellipsis">
            Classzz Explorer
          </div>
          <div class="czz-nav-bar__right czz-icon-right">
            <i
              class="el-icon-search blue1"
              style="font-size: 18px"
              v-if="!openInput"
              @click="openInput = true"
            ></i>
            <i
              class="el-icon-s-home blue1"
              style="font-size: 18px"
              @click="tohome"
              v-if="!home"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    h2Title: {
      type: Boolean,
      default: false,
    },
    heights: {
      type: String,
      default: "300px",
    },
    home: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lan: this.$getLanguage(),
      input: "",
      openInput: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    changeLanguage() {
      this.$i18n.locale == "zh"
        ? (this.$i18n.locale = "en")
        : (this.$i18n.locale = "zh");
      this.$setStorage("czzLan", this.$i18n.locale);
      this.lan = this.$i18n.locale;
    },
    isHeight() {
      let wWidth = document.documentElement.clientWidth;
      if (wWidth < "960" && !this.h2Title) {
        this.heights = "100px";
      }
    },
    toChange() {
      let len = this.input.length;
      if (len === 0) {
        this.$router.push({ path: "/" });
      } else if (len <= 7) {
        this.$router.push({
          path: "/blockDetails",
          query: { height: this.input },
        });
      } else if (len === 64) {
        this.$router.push({
          path: "/transactionHash",
          query: { transHash: this.input },
        });
      } else if (len === 42) {
        this.$router.push({
          path: "/address",
          query: { address: this.input },
        });
      }
    },
    tohome() {
      this.$router.push({ path: "/" });
    }
  },
  mounted() {
    // this.isHeight()
  },
};
</script>

<style scoped>
.logo-img{
  height: 35px;
  width: 35px;
  background: url('./../assets/logo.jpg') no-repeat;
  background-size: contain;
}
.web-head{
    display: none;
  }
/* web端头部 */
.czz-nav-bar {
  z-index: 1;
  line-height: 22px;
  text-align: center;
  background-color: #fff;
  -webkit-user-select: none;
  user-select: none;
}
.czz-nav-bar__content {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 46px;
}
.czz-nav-bar__left,
.czz-nav-bar__right {
  position: absolute;
  top: 0;
  bottom: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 16px;
  font-size: 14px;
  cursor: pointer;
}
.czz-nav-bar__left {
  left: 0;
}
.czz-nav-bar__text {
  color: #1989fa;
}
.czz-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: #323233;
  font-weight: 500;
  font-size: 16px;
}
.czz-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.czz-nav-bar__right {
  right: 0;
}

.czz-icon-right i {
  margin: 0 5px;
}

/* 搜索框 */
.czz-search__action {
    padding: 0 8px;
    color: #323233;
    font-size: 14px;
    line-height: 34px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
}
.czz-search {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 12px;
    background-color: #fff;
}
.czz-search__content {
  display: flex;
  flex: 1;
  padding-left: 12px;
  background-color: #f7f8fa;
  border-radius: 2px;
}
.czz-search__content--round {
  border-radius: 999px;
}

.czz-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}

.czz-search .czz-cell {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 5px 8px 5px 0;
  background-color: transparent;
}

.czz-field__left-icon {
  margin-right: 4px;
}
.czz-cell__value--alone {
  color: #323233;
  text-align: left;
}
.czz-cell__value {
  position: relative;
  overflow: hidden;
  color: #969799;
  text-align: right;
  vertical-align: middle;
  word-wrap: break-word;
}
.czz-field__body {
  display: flex;
  align-items: center;
}
.czz-field__control {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: #323233;
  line-height: inherit;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
}

/* 顶部 */
.banner {
  display: block;
  width: 100%;
  height: 300px;
  background-color: #e6e9ee;
  /* background: url(../assets/home_logo.svg) no-repeat; */
  background: #409eff;
  background-size: cover;
}

.banner .banner-box {
  width: 80%;
  margin: 0 auto;
}
.banner .banner-box .bann {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.banner .banner-box .bann img {
  display: block;
  width: 126px;
  height: 38px;
  background: url(../assets/class_logo.svg) no-repeat;
  background-size: 100%;
}
.banner .banner-box h2 {
  font-size: 40px;
  color: #fff;
  text-align: center;
  margin-top: 30px;
  font-weight: 450;
}

.banner .banner-title {
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.bann-classzz-name {
  margin-right: 20px;
}
.classzz-language {
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  display: block;
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
.banner .ban-input {
  margin: 40px 0;
}
@media screen and (max-width: 960px) {
  .classzz-language {
    display: none;
  }
  .banner .banner-box .bann {
    height: 0px;
    overflow: hidden;
  }
  .banner {
    display: none;
  }
  .web-head{
    display: block;
  }
}
</style>
