<template>
	<ask-modal 
			:show="show" 
			:title="title" 
			:closeIcon="icon" 
			:shade="shade" 
			:shadeColor="shadeColor" 
			:shadeClick="shadeClick" 
			@onclose="iconClose"
			:class="'search'">
		<div class="search-body">
			<div class="search-input">
				<input type="text" id="search_input" placeholder="搜索内容" v-model="search" autofocus>
				<ask-button @ask-click="query">
					<span class="button-text">
						<i class="iconfont icon-sousuo"></i>
					</span>
				</ask-button>
			</div>
			<div class="search-result">
				<template v-if="boxItem.length == 0">
					<div class="null-text">{{tip}}</div>
				</template>
				<template v-else>
					<div class="ask-box-group">
						<box-list v-for="(item,$i) in boxItem" :key="$i" :item="item">
							<template v-for="(once,$j) in item.device_list">
								<box-item :key="$j" :once="once" :did="item.did" :name="item.nickname">
									{{once.name}}
								</box-item>
							</template>
						</box-list>
					</div>
				</template>
			</div>
		</div>
		<ask-button slot="footer" class="ask-alert-btn" :text="'关闭搜索'" @ask-click="close"></ask-button>
		<div class="loading-box" v-if="loadingshow">
			<transition name="loading-fade">
				<div class="loading-circle" :style="{'z-index': zIndex}">
				</div>
			</transition>
			<ask-overlay :show="loadingshow" :ask-z-index="zIndex-1"></ask-overlay>
		</div>
	</ask-modal>
</template>
<style src="./search.scss" lang="scss"></style>
<script>
import { askDialogConfirm, askDialogToast } from '@/utils';
let ticking = false;
import boxList from '@core/box/box-list.vue';
import boxItem from '@core/box/box-item.vue';
import { Box } from '@/services';
export default {
	name:'search',
	components:{
		'box-list': boxList,
		'box-item': boxItem
	},
	props: {
		shade: {
			type: Number,
			default: .4
		},
		shadeColor: {
			type: String,
			default: '#000'
		},
		shadeClick: {
			type: Boolean,
			default: true
		},
		show: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		icon: {
			type: Boolean,
			default: false
		},
		btnText: {
			type: String,
			default: '确定'
		},
		type: {
			type: String,
			default: 'time'
		}
	},
	data() {
		return {
			search:'',
			tip:'请输入关键字搜索',
			boxItem:[],
			box : '',
			loadingshow: false,
			loadingIndex: 0,
			zIndex:2017201720
		}
	},
	beforeDestroy() {
		this.removeScroll();
	},
	methods: {
		loadingHide(){
			this.loadingIndex--;
			if(this.loadingIndex == 0){
				this.loadingshow = false;
			}
		},
		loadingShow(){
			this.loadingIndex++;
			this.loadingshow = true;
		},
		query(){
			if(this.search == '') {
				askDialogToast({ msg: '请输入内容', time: 2000, class: 'danger' });
				return;
			}
			this.resetService();
		},
		resetService(){
			this.box = new Box();
			this.boxItem = [];
			this.removeScroll();
			this.initBoxCard();
		},
		initBoxCard(){
			this.loadingShow();
			this.box.queryBox(this.search).then(r=>{
				this.loadingHide();
				if (r.data.code != 1000) {
					askDialogToast({ msg: r.data.message ? r.data.message : '接口请求失败', time: 2000, class: 'danger' });
					return;
				}
				if(r.data.data.list.length == 0 ){
					if(this.boxItem.length == 0){
						this.tip = `没有搜索到"${this.search}"相关的内容`;
					}else{
						this.removeScroll();
						askDialogToast({ msg: r.data.message ? r.data.message : '没有更多了', time: 2000, class: 'danger' });
					}
					return;
				}

				r.data.data.list.map(index=>{
					this.boxItem.push(index);
				})
				this.addScroll();
			});
		},
		sure() {
			this.$emit('onok');
		},
		close() {
			this.show = false;
		},
		iconClose() {
			this.$emit('onclose');
		},
		addScroll() {
			let askEl = this.$el.querySelector('.search-result');
			askEl.addEventListener('scroll', this.scrollEvent.bind(this));
		},
		removeScroll() {
			let askEl = this.$el.querySelector('.search-result');

			if (askEl) {
				askEl.removeEventListener('scroll', this.scrollEvent.bind(this), false);
			}
		},
		scrollEvent() {
			console.log(2);
			let askEl = this.$el.querySelector('.search-result');
			let last_known_scroll_position = askEl.scrollTop;
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (last_known_scroll_position != 0 && askEl.scrollHeight - (askEl.clientHeight + last_known_scroll_position) <= 0) {

						this.initBoxCard();
					}
					ticking = false;
				});
			}
			ticking = true;
		}
	}
}

</script>
