<template>
	<div class="ask-box-group">
		<box-list v-for="(item,$i) in boxItem" :key="$i" :item="item">
			<template v-for="(once,$j) in item.device_list">
				<box-item :key="$j" :once="once" :did="item.did" :name="item.nickname">
					{{once.name}}
				</box-item>
			</template>
		</box-list>
		<template v-if="boxItem.length == 0">
			<div class="null-text">暂无数据</div>
		</template>
	</div>
</template>
<style src="./box-group.scss" lang="scss"></style>
<script>
import boxList from './box-list.vue';
import boxItem from './box-item.vue';
import { Box } from '@/services';
import { askDialogToast } from '@/utils';

let ticking = false;

export default {
	name: "box-group",
	inject:['rootMain'],
	components: {
		'box-list': boxList,
		'box-item': boxItem
	},
	data(){
		return{
			boxItem:[],
			box: new Box()
		}
	},
	methods: {
		doSomething(el,scroll_pos){
			if(el.scrollHeight - (el.clientHeight + scroll_pos) <= 0){
				this.requestNewPage();
			}
		},
		addScroll(){
			let askEl = document.querySelector('.ask-section');
			askEl.addEventListener('scroll', this.scrollEvent);
		},
		removeScroll(){
			let askEl = document.querySelector('.ask-section');
			if(askEl) askEl.removeEventListener('scroll', this.scrollEvent, false);
		},
		scrollEvent(){
			let askEl = document.querySelector('.ask-section');
			let last_known_scroll_position = askEl.scrollTop;
			if (!ticking) {
				window.requestAnimationFrame(()=> {
					if(askEl.scrollHeight - (askEl.clientHeight + last_known_scroll_position) <= 0){
						this.requestNewPage();
					}
					ticking = false;
				});
			}
			ticking = true;
		},
		requestNewPage(){
			this.rootMain.loadingShow();
			this.box.getBox(this.$route.params.id).then(r=>{
				this.rootMain.loadingHide();
				if(r.data.data.list.length == 0 ){
					this.removeScroll();
					askDialogToast({msg:r.data.message? r.data.message:'没有更多了',time:2000,class:'danger'});
				}else{
					r.data.data.list.map(index=>{
						this.boxItem.push(index);
					})
					
				}
			})
		}
	},
	mounted() {
		this.requestNewPage();
		this.addScroll();
	},
	beforeDestroy() {
		this.removeScroll();
	},
	watch: {
		'$route' (to, from) {
			this.box = new Box();
			this.boxItem = [];
			this.requestNewPage();
			this.addScroll();
		}
	}
}

</script>
