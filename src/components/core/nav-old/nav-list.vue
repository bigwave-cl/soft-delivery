<template>
	<transition name="side-bar-slide-down">
		<ul class="ask-nav-list">
			<template v-for="(item,$i) in list">
				<nav-item :item="item" :key="$i" :currentUrl="currentUrl" @itemClick="toggleSub(item)">
					<template v-if="item.list.length > 0">
						<nav-list :list="item.list" slot="children" class="sub-bar" v-show="item.show"></nav-list>
					</template>
				</nav-item>
			</template>
		</ul>
	</transition>
</template>
<style src="./nav-list.scss" lang="scss"></style>
<script>
	import navItem from './nav-item.vue';
	export default{
		name:'nav-list',
		components:{
			'nav-item':navItem
		},
		props:{
			list:{
				type:Array,
				default:[]
			}
		},
		computed:{
			currentUrl(){
				return this.$route.fullPath;
			}
		},
		data(){
			return {
			}
		},
		created(){
		},
		mounted(){
			// for (let cur = this.$el; cur; cur = cur.parentNode) {
				/*if (cur != this.$el && cur.nodeType === 1 && cur.tagName === 'LI' && cur.className.indexOf('ask-nav-item') != -1) {
					console.log(cur.children[1])
					cur.children[1].style.display = "block";
					cur.classList.add('active');
				}*/
			// }
		},
		methods:{
			toggleSub(item){
				this.list.map(index=>{
					if(index==item) item.show = !item.show;
					else index.show = false;
				})
			}
		}
	}
</script>