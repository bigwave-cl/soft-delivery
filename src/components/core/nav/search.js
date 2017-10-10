/*
* @Author: askMeWhy
* @Date:   2017-10-09 09:52:15
* @Last Modified by:   smile
* @Last Modified time: 2017-10-10 15:46:46
*/
import Vue from 'vue'
import router from '@/router';
import ComponentTemplate from './search.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const searchModal = (onClose) => {
	let vm = new VueComponent({router}).$mount();
	vm.title = '搜索页面';
	vm.$on('onclose', () => {
		vm.show = false;
		if (onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}