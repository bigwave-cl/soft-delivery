<template>
	<div class="ask-lock-time abnormal-parent" v-show="show">
		<div class="box-card-list">
			<template v-for="(box,$j) in boxCards">
				<box-card :title="`物品编号:${box.name}`" :items="box.items">
					<div slot="del" class="box-del">
						<ask-button @ask-click="delLockTime(box)">
							<span class="button-text">
								<i class="iconfont icon-shanchu"></i>
							</span>
						</ask-button>
					</div>
				</box-card>
			</template>
			<template v-if="boxCards.length == 0">
				<div class="null-text">暂无数据</div>
			</template>
		</div>
	</div>
</template>
<script>
import { SetData } from '@/services';
import { setComponent } from '@core/box-set';
import { askDialogToast,askDialogConfirm } from '@/utils';
let ticking = false;
export default {
	name: 'luckTimeComponent',
	inject: ['rootChildren','rootMain'],
	components: setComponent,
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			boxCards: [],
			hasMore: true,
			setData: new SetData()
		}
	},
	created() {
		if (this.show) {
			this.initBoxCard();
		}
	},
	mounted() {
		if (this.show) {
			this.addScroll();
		}
	},
	beforeDestroy() {
		this.removeScroll();
	},
	watch: {
		show(n, o) {
			this.resetService();
		},
		'rootChildren.timeUpdate'(n,o){
			if(n){
				this.resetService();
			}
		}
	},
	methods: {
		initBoxCard(){
			this.rootMain.loadingShow();
			this.setData.getLockTime(this.$route.params.boxId).then(r => {
				this.rootMain.loadingHide();
				if (r.data.data.list.length == 0) {
					this.removeScroll();
					if(this.boxCards.length != 0){
						askDialogToast({ msg: r.data.message ? r.data.message : '没有更多了', time: 2000, class: 'danger' });
					}
				} else {
					let rCards = this.buildCards(r.data.data.list);
					rCards.map(index => {
						this.boxCards.push(index);
					})
				}
			})
		},
		buildCards(list) {
			let newList = [];
			list.map(index => {
				let once = {
					name: index.name,
					id: index.id,
					items: [{
							name: '时间段名称',
							value: index.name
						},
						{
							name: '起始时间',
							value: index.start_time
						},
						{
							name: '结束时间',
							value: index.end_time
						}
					]
				};
				newList.push(once);
			})
			return newList;
		},
		delLockTime(box){
			askDialogConfirm({
				title: '删除时间段',
				msg: `确定删除名称为"${box.name}"的时间段？`
			}, (vm) => {
				this.rootMain.loadingShow();
				this.setData.delLockTime(box.id).then(r=>{
					this.rootMain.loadingHide();
					this.resetService();
					vm.close();
					if(r.data.code == 1000){
						askDialogToast({msg:r.data.message? r.data.message:'删除成功',time:2000,class:'success'});
					}
				})
			});
		},
		resetService() {
			this.setData = new SetData();
			this.boxCards = [];
			if(this.show) {
				this.addScroll();
				this.initBoxCard();
			}
		},
		addScroll() {
			let askEl = this.$el.parentNode;
			askEl.addEventListener('scroll', this.scrollEvent);
		},
		removeScroll() {
			let askEl = this.$el.parentNode;

			if (askEl) {
				askEl.removeEventListener('scroll', this.scrollEvent, false);
			}
		},
		scrollEvent() {
			let askEl = this.$el.parentNode;
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
