
/***
* 获取当前浏览器的语言
*/
export const getLanguage = function () {
    let lan = getStorage('czzLan');
    let lang = navigator.language || navigator.userLanguage;
    if (lan) {
        return lan
    }
    lang = lang.substr(0, 2);
    if (['zh', 'en'].indexOf(lang) != '-1') {
        setStorage('czzLan', lang)
    } else {
        setStorage('czzLan', 'zh')
    }
    return lang
}

/**
 * 数据存储
 */
const setStorage = function (key, val) {
    localStorage.setItem(key, val)
}
const getStorage = function (key) {
    return localStorage.getItem(key) || ''
}

/**
 * 数字3个字符加,
 */

const toCurrencyString = function (num) {
    num = num + '';
    if (!num) return `--`
    let arr = num.split(".")
    let str = arr[0].replace(/\d(?=(?:\d{3})+\b)/g, '$&,')
    if (arr.length == 1) return str;
    return `${str}.${arr[1]}`
}

/**
 * 转换时间戳 为标准格式数据
 */

const format = function _date(date) {
    var time = new Date(date);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

function add0(m) { return m < 10 ? '0' + m : m }

/**
 * 回到顶部
 */

const backtop = function () {
    var timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
            clearInterval(timer);
        }
    }, 30)
}


export default {
    install(Vue, options) {
        Vue.prototype.$getLanguage = getLanguage
        Vue.prototype.$setStorage = setStorage
        Vue.prototype.$getStorage = getStorage
        Vue.prototype.$toCurrencyString = toCurrencyString
        Vue.prototype.$format = format
        Vue.prototype.$backtop = backtop
    }
}