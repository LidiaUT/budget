// svoi sobstvennij custom plugin dlja Vue.js
// sna4ala sozdali papku utils, a zatem v nej fail pod imenem message.plugin.js

export default { // iz faila budem exportirovat kakoi-to objekt
  install (app, options) { // metod vizivajet vue.js, 4tobi primenit naw sozdavajemij plugin
    app.config.globalProperties.$message = function (text) { // v Vue2 Vue.prototype, v Vue3 app [beretsja iz main.js -> mount #app].config.globalProperties
      window.M.toast({ html: text }) // M.toast iz materializecss
    }
    app.config.globalProperties.$error = function (text) {
      window.M.toast({ html: `[Sul on viga]: ${text}` })
    }
  }
}
