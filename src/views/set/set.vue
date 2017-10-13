<template>
	<div class="ask-set-box">
		<set-option-bar :items="tabBar"></set-option-bar>
		<set-container>
			<view-children :show="defaultActive == '1'"></view-children>
			<box-children :show="defaultActive == '2'"></box-children>
			<record-children :show="defaultActive == '3'"></record-children>
			<set-children :show="defaultActive == '4'"></set-children>
			<lock-set-children :show="defaultActive == '5'"></lock-set-children>
			<remote-children :show="defaultActive == '6'"></remote-children>
		</set-container>
	</div>
</template>
<style src="./set.scss" lang="scss"></style>
<script>
import { setComponent } from '@core/box-set';
import { childrenComponent } from './children';
let component = Object.assign({}, setComponent, childrenComponent);
export default {
	name: 'set',
	inject: ['rootMain'],
	provide() {
		return {
			'rootSet': this
		}
	},
	components: component,
	data() {
		return {
			defaultActive: '1',
			tabBar: [{
					name: '位置查看',
					icon: 1,
					index: '1'
				},
				{
					name: '物品管理',
					icon: 2,
					index: '2'
				},
				{
					name: '记录',
					icon: 3,
					index: '3'
				},
				{
					name: '设置',
					icon: 4,
					index: '4'
				},
				{
					name: '锁定设置',
					icon: 5,
					index: '5'
				},
				{
					name: '远程授权',
					icon: 6,
					index: '6'
				}
			]
		}
	},
	created() {
		this.rootMain.addBread({
			name: this.$route.query.name,
			link: ''
		})
	},
	beforeDestroy() {
		this.rootMain.removeBread({
			name: this.$route.query.name,
			link: ''
		})
	},
	methods: {
		changeContent(item) {
			this.defaultActive = item.index;
		}
	}
}

</script>
