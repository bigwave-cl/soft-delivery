import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import login from '@/views/login/login'
import box from '@/views/box/box'
import set from '@/views/set/set'

const APP_ROUTERS = [{
		path: '/',
		name: 'index',
		component: index,
		meta: { title: 'Ask-Me-Why',requiresAuth: true, nav:true }
	}, {
		path: '/login',
		name: 'login',
		component: login,
		meta: { title: '安全递送登录界面', requiresAuth: false, nav:false }
	},
	{
		path: '/box/:id',
		name: 'box',
		component: box,
		meta: { title: '安全递送个人',requiresAuth: true, nav:true,box: true },
		children: [{
			path: 'set/:boxId',
			component: set,
			name:'set',
			meta: { title: '安全递送设置界面', requiresAuth: true, nav:true ,box:false }
		}]
	}
];

Vue.use(Router)
export default new Router({
	// mode: 'history',
	routes: APP_ROUTERS
})
