<template>
	<set-tab-group v-show="show">
		<set-tab-title :list="list"></set-tab-title>
		<set-tab-body>
			<template v-for="(item,$i) in list">
				<template v-if="item.index == 1">
					<block-list :key="$i" :show="show && defaultActive == item.index"></block-list>
				</template>
				<template v-else-if="item.index == 2">
					<box-card-list :key="$i" :show="show && defaultActive == item.index">
						<template v-for="(box,$j) in boxCards">
							<box-card :title="`物品编号:${box.name}`" :items="box.items"></box-card>
						</template>
						<template v-if="boxCards.length==0">
							<div class="null-text">暂无数据</div>
						</template>
					</box-card-list>
				</template>
			</template>
		</set-tab-body>
	</set-tab-group>
</template>
<script>
import { setComponent } from '@core/box-set';
import childrenMixin from './mixin.js';
import { SetData } from '@/services';
import { askDialogToast } from '@/utils';
export default {
	name: 'boxChildren',
	mixins: [childrenMixin],
	inject: ['rootMain'],
	components: setComponent,
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			list: [{
					name: '物品查看',
					index: 1
				},
				{
					name: '历史记录',
					index: 2
				}
			],
			boxCards: [],
			hasMore: true,
			setData: new SetData()
		}
	},
	watch: {
		show(n, o) {
			this.resetService();
		}
	},
	methods: {
		initBoxCard() {
			this.rootMain.loadingShow();
			this.setData.getGoodHistory(this.$route.params.boxId).then(r => {
				this.rootMain.loadingHide();
				if (r.data.data.list.length == 0) {
					this.hasMore = false;
					askDialogToast({ msg: r.data.message ? r.data.message : '没有更多了', time: 2000, class: 'danger' });
				} else {
					this.hasMore = true;
					let rCards = this.buildCards(r.data.data.list);
					rCards.map(index => {
						this.boxCards.push(index);
					})
				}
			})
		},
		resetService() {
			this.setData = new SetData();
			this.boxCards = [];
			if(this.show && this.defaultActive == 2) this.initBoxCard();
		},
		buildCards(list) {
			let newList = [];
			list.map(index => {
				let once = {
					name: index.name,
					items: [{
							name: '物品状态',
							value: this.getTag(index.flag)
						},
						{
							name: '时间',
							value: index.time
						}
					]
				};
				newList.push(once);
			})
			return newList;
		},
		getTag(tag) {
			let tagName = '';
			switch (tag) {
				case 'in':
					tagName = '进箱';
					break;
				case 'out':
					tagName = '出箱';
					break;
				case 'lost':
					tagName = '丢失';
					break;
				default:
					tagName = '未知';
					// statements_def
					break;
			}
			return tagName;
		}
	}
}

</script>
