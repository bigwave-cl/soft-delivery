/*
* @Author: askMeWhy
* @Date:   2017-10-09 09:52:15
* @Last Modified by:   smile
* @Last Modified time: 2017-10-10 17:08:57
*/
import Vue from 'vue'
import ComponentTemplate from './lock-modal.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const addLockModal = (type,onOk, onClose) => {
	let vm = new VueComponent().$mount();
	vm.type = type;
	if(type == 'time'){
		vm.title = '添加时间段';
	}
	if(type == 'area'){
		vm.title = '添加区域';
	}
	vm.$on('onok', () => {
		if (onOk) onOk(vm);
	});
	vm.$on('onclose', () => {
		vm.show = false;
		if (onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}

export const queryLockArea = (item, onClose)=>{
	let vm = new VueComponent().$mount();
	vm.type = 'query';
	vm.query = item.list;
	vm.title = `围栏名称：${item.name || '未知' }`;
	
	vm.$on('onclose', () => {
		vm.show = false;
		if (onClose) onClose(vm);
	});
	document.body.appendChild(vm.$el);
	vm.show = true;
}