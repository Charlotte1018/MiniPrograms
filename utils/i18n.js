module.exports = function() {
  let i18n = {};
  let lang = '';

  let clearI18n = function() {
    i18n = {}
  }

  let initI18n = function (lang) {
    if(lang === 'zh') {
      i18n = rquire('../i18n/zh.js');
    }
    
    lang = language;
    
  }

  return {
    initI18n: initI18n,
    clearI18n: clearI18n,
    i18n: i18n,
    lang: lang
  }
}();