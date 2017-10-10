<template>
	<nav class="side-bar">
		<nav-list :list="list" :default-active="defalutActive">
			<template v-for="(item,$i) in list">
				<nav-item :item="item" :key="$i" :index="item.index"></nav-item>
			</template>
		</nav-list>
	</nav>
</template>
<style src="./side-bar.scss" lang="scss"></style>
<script>
import navList from './nav-list.vue';
import navItem from './nav-item.vue';
export default {
	name: 'side-bar',
	components: {
		'nav-list': navList,
		'nav-item': navItem
	},
	computed:{
		defalutActive(){
			return '';
		}
	},
	props:{
		list:{
			type:Array,
			default:[{
					name: '一级目录1',
					link: '',
					icon: 'icon-nav-home',
					list: [{
							name: '二级目录1',
							link: '/index',
							list: []
						},
						{
							name: '二级目录2',
							link: '/2',
							list: [{
									name: '三级目录1',
									link: '/1',
									list: []
								},
								{
									name: '三级目录2',
									link: '',
									list: [/*{
										name: '四级目录1',
										link: '',
										list: [{
											name: '五级目录2',
											link: '',

											list: [{
												name: '六级目录2',
												link: '',
												list: []
											}]
										}]
									}*/]
								}
							]
						}
					]
				},
				{
					name: '一级目录2',
					icon: 'icon-nav-home',
					link: '',
					list: [{
							name: '二级目录1',
							link: '/code',
							list: []
						},
						{
							name: '二级目录2',
							link: '',
							list: []
						}
					]
				}
			]
		}
	}
}

</script>
