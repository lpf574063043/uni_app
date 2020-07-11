import Vue from 'vue'
import App from './App'
import user from './common/user.js'
import confog from './common/confog.js'
import request from "./common/request.js"
Vue.config.productionTip = false
Vue.prototype.user=user
Vue.prototype.confog=confog
Vue.prototype.$http=request
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
