<template>
	<div class="section-bar">
		<div class="page-title">
			<h2 v-text="breadcrumb[1] ? breadcrumb[1].name:breadcrumb[0].name">一级单位C</h2>
			<div class="search-box" @click="search">
				<i class="iconfont icon-sousuo"></i>
				<input type="text" placeholder="搜索人员姓名" name="">
			</div>
		</div>
		<div class="breadcrumbs">
			<ul class="bc-items">
				<template v-for="(item,$i) in breadcrumb">
					<li class="bc-item" :key="$i">
						<template v-if="item.link == ''">
							<span v-text="item.name"></span>
						</template>
						<template v-else>
							<router-link :to="item.link" v-text="item.name"></router-link>
						</template>
						<span class="interval" v-if="breadcrumb.length !== ($i+1)">/</span>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>
<style src="./breadcrumbs.scss" lang="scss"></style>
<script>
import {searchModal} from './search.js';
export default {
	name: 'breadcrumbs',
	props: {
		items: {
			type: Array,
			default: []
		},
		additional:{
			type: Array,
			default: []
		}
	},
	data() {
		return {
			activeIndex: '',
			breadcrumb: [{
					name: '首页',
					link: '/'
				}
			]
		}
	},
	mounted() {
		this.initBreadcrumb();
	},
	updated() {
		// this.$nextTick(() => {
		// 	console.log(123);
		// 	this.initBreadcrumb();
		// })
	},
	methods: {
		search(){
			searchModal();
		},
		buildBreadcrumb(name,link){
			this.breadcrumb.push({
				name:name,
				link:link
			})
		},
		findLink(list) {
			list.map(index => {
				if (index.link && this.$route.fullPath.indexOf(index.link) == 0) {
					this.activeIndex = ''+index.index;
				}
				if (index.list.length > 0) {
					this.findLink(index.list);
				}
			})
		},
		buildData(index,indexPath,items){
			items.map((item,key)=>{
				if(key == (indexPath[index] - 1)){
					this.buildBreadcrumb(item.name,item.link);
					if(index < indexPath.length){
						this.buildData(index+1,indexPath,item.list);
					}
				}
			})
		},
		initBreadcrumb() {
			if(this.items.length == 0) return;
			this.activeIndex = '';
			this.findLink(this.items);
			let indexPath = this.activeIndex.split('-');
			
			indexPath = indexPath.map(index=> parseInt(index, 10));

			this.buildData(0,indexPath,this.items);
			this.additional.map(index=>{
				this.breadcrumb.push(index);
			})
		}
	},
	watch: {
		'$route' (to, from) {
			this.breadcrumb = [{
					name: '首页',
					link: '/'
				}
			];
			this.initBreadcrumb();
		},
		'items': {
			handler(o,n){
				this.initBreadcrumb();
			},
			deep:true
		},
		'additional':{
			handler(o,n){
				this.breadcrumb = [{
						name: '首页',
						link: '/'
					}
				];
				this.initBreadcrumb();
			},
			deep:true
		}
	}
}

</script>
