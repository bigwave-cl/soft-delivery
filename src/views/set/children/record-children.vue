<template>
	<set-tab-group v-show="show">
		<set-tab-title :list="list"></set-tab-title>
		<set-tab-body>
			<template v-for="(item,$i) in list">
				<template v-if="item.index == 1">
					<box-card-list :key="$i" :show="show && defaultActive == item.index">
						<template v-for="(box,$j) in boxCards">
							<box-card :title="'设备日志'" :items="box.items"></box-card>
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
	name: 'recordChildren',
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
				name: '记录',
				index: 1
			}],
			boxCards: [],
			setData: new SetData(),
			hasMore: true
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
			this.setData.getRecord(this.$route.params.boxId).then(r => {
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
			if(this.show) this.initBoxCard();
		},
		buildCards(list) {
			let newList = [];
			list.map(index => {
				let once = {
					name: index.name,
					items: [{
							name: '时间',
							value: index.created_at
						},
						{
							name: '用户',
							value: index.username +'(' +this.buildType(index.type)+')'
						},
						{
							name: '操作',
							value: this.buildAct(index.act)
						}
					]
				};
				newList.push(once);
			})
			return newList;
		},
		buildType(tag) {
			let tagName = '';
			switch (tag) {
				case 1:
					tagName = 'APP蓝牙操作';
					break;
				case 2:
					tagName = 'APP蓝牙操作';
					break;
				case 3:
					tagName = 'APP远程操作';
					break;
				case 4:
					tagName = '本地操作';
					break;
				case 5:
					tagName = 'PC端远程操作';
					break;
				default:
					tagName = '未知';
					// statements_def
					break;
			}
			return tagName;
		},
		buildAct(tag) {
			let tagName = '';
			switch (tag) {
				case 0:
					tagName = '登录';
					break;
				case 1:
					tagName = '开箱';
					break;
				case 2:
					tagName = '开布防';
					break;
				case 3:
					tagName = '关布防';
					break;
				case 4:
					tagName = '更改布防灵敏度高';
					break;
				case 5:
					tagName = '更改布防灵敏度中';
					break;
				case 6:
					tagName = '更改布防灵敏度低';
					break;
				case 7:
					tagName = '开离位';
					break;
				case 8:
					tagName = '关离位';
					break;
				case 9:
					tagName = '更改报警范围高';
					break;
				case 10:
					tagName = '更改报警范围中';
					break;
				case 11:
					tagName = '更改报警范围低';
					break;
				case 12:
					tagName = '更改位置报送间隔高';
					break;
				case 13:
					tagName = '更改位置报送间隔中';
					break;
				case 14:
					tagName = '更改位置报送间隔低';
					break;
				case 15:
					tagName = '更改报警报送间隔高';
					break;
				case 16:
					tagName = '更改报警报送间隔中';
					break;
				case 17:
					tagName = '更改报警报送间隔低';
					break;
				case 18:
					tagName = '添加物品';
					break;
				case 19:
					tagName = '删除物品';
					break;
				case 20:
					tagName = '开启远程授权';
					break;
				case 21:
					tagName = '关闭远程授权';
					break;
				case 22:
					tagName = '添加区域锁定';
					break;
				case 23:
					tagName = '删除区域锁定';
					break;
				case 24:
					tagName = '添加时间锁定';
					break;
				case 25:
					tagName = '删除时间锁定';
					break;
				case 26:
					tagName = '开启手动锁定';
					break;
				case 27:
					tagName = '关闭手动锁定';
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
