import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate'
import router from './router'
import ASKComponents from './components/ask';
import './router/router.auth.js';

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(ASKComponents);

new Vue({
	el: '#app',
	router,
	render: (h) => h(App)
})
