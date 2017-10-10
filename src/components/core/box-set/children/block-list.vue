<template>
	<ul class="ask-block-list" v-show="show">
		<li class="asl-block-li" v-for="(item,$i) in list" :key="$i">
			<div class="icon">
				<img src="~@/assets/icon_block_list.png" alt="图标">
			</div>
			<div class="text">
				物品编号:{{item.name}}
			</div>
		</li>
		<template v-if="list.length == 0">
			<div class="text">暂无数据</div>
		</template>
	</ul>
</template>

<style src="./block-list.scss" lang="scss"></style>
<script>
import { SetData } from '@/services'
	export default{
		name:'blockList',
		inject:['rootMain'],
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				list:[]
			}
		},
		created(){
			if(this.show){
				this.initBlockList();
			}
		},
		watch:{
			show(n,o){
				if(n){
					this.initBlockList();
				}
			}
		},
		methods:{
			initBlockList(){
				const setData = new SetData();
				this.rootMain.loadingShow();
				setData.getBlockList(this.$route.params.boxId).then(r=>{
					this.rootMain.loadingHide();
					this.list = r.data.data.list;
				})
			}
		}
	}
</script>