<template>
	<div id="app" class="container" :class="{tab: $route.meta.nav}">
		<!-- no-nav -->
		<template v-if="!$route.meta.nav">
			<transition :name="transitionName">
				<router-view></router-view>
			</transition>
		</template>
		<template v-else>
			<header class="ask-header">
				<div class="logo">
					<router-link to="/">
						<img src="~@/assets/logo.png" alt="logo">
					</router-link>
				</div>
				<div class="personal">
					<drop-down :drop="drop" class="personal"></drop-down>
				</div>
			</header>
			<aside class="ask-aside">
				<side-bar :list="list"></side-bar>
			</aside>
			<section class="ask-section">
				<breadcrumbs :items="list" :additional="additional"></breadcrumbs>

				<!-- <transition :name="transitionName"> -->
					<router-view></router-view>
				<!-- </transition> -->
			</section>
		</template>
		<div class="loading-box" v-if="show">
			<transition name="loading-fade">
				<div class="loading-circle" :style="{'z-index': zIndex}">
				</div>
			</transition>
			<ask-overlay :show="show" :ask-z-index="zIndex-1"></ask-overlay>
		</div>
	</div>
</template>
<style src="./assets/font/iconfont.css" lang="css"></style>
<style src="./styles/base.scss" lang="scss"></style>
<style src="./styles/compatible.scss" lang="scss"></style>
<script>
import askOverlay from '@/components/ask/ask-overlay/ask.overlay.js';
import sideBarComponent from '@core/nav/side-bar.vue';
import breadcrumbs from '@core/nav/breadcrumbs.vue';
import dropDown from '@core/drop-down/drop-down.vue';
import navTab from '@core/nav-tab/nav-tab.vue';
import { sideBar,User } from '@/services';

const user = new User();
export default {
	name: 'app',
	components: {
		'side-bar': sideBarComponent,
		'drop-down': dropDown,
		breadcrumbs: breadcrumbs,
		'nav-tab':navTab
	},
	provide() {
		return {
			rootMain: this
		};
	},
	computed:{
		zIndex() {
			return 2017201720;
		}
	},
	data() {
		return {
			show:false,
			loadingIndex: 0,
			transitionName: 'slide',
			additional:[],
			list:[],
			drop: {
				title: '下拉菜单',
				list: [{
						name: '退出',
						icon: 'icon-tuichu',
						callback(){
							user.loginOut();
						}
					}
				]
			}
		}
	},
	created(){
		this.initSideBar();
	},
	methods:{
		loadingHide(){
			this.loadingIndex--;
			if(this.loadingIndex == 0){
				this.show = false;
			}
		},
		loadingShow(){
			this.loadingIndex++;
			this.show = true;
		},
		addBread(item){
			this.additional.push(item)
		},
		removeBread(item){
			this.additional.splice(this.additional.indexOf(item),1);
		},
		initSideBar(){
			if(!this.$route.meta.nav || this.list.length!=0) return;
			this.drop.title = user.user.user;
			const side = new sideBar();
			side.getMenus().then(r=>{
				let menus = r.data.data;
				menus.map((index,key)=>{
					let once = {
						'index': key+1,
						'name': index.name,
						'icon': 'icon-nav-home',
						'link': this.buildLink(index),
						'list':this.buildList(index,key+1)
					}
					this.list.push(once);
				})
			})
		},
		buildList(item,key){
			let child = [];
			if(!item.children || item.children == void 0 || item.children.length == 0) return child;
			child = item.children.map((index,k)=>{
				let once = {
						'index': key+'-'+(k+1),
						'name': index.name,
						'link': this.buildLink(index),
						'list': this.buildList(index,key+'-'+(k+1))
					}
				return once;
			})
			return child;
		},
		buildLink(item){
			return `/box/${item.id}`;;
		}
	},
	watch: {
		'$route' (to, from) {
			this.initSideBar();
			askOverlay.closeAll();
		}
	}
}

</script>
