<template>
	<nav class="side-bar">
		<nav-list :list="list"></nav-list>
	</nav>
</template>
<style src="./side-bar.scss" lang="scss"></style>
<script>
import navList from './nav-list.vue';
export default {
	name: 'side-bar',
	components: {
		'nav-list': navList
	},
	data() {
		return {
			list: [{
					name: '一级目录1',
					link: '',
					icon: 'icon-nav-home',
					show: false,
					list: [{
							name: '二级目录1',
							link: '/index',
							show: false,
							list: []
						},
						{
							name: '二级目录2',
							link: '/2',
							show: true,
							list: [{
									name: '三级目录1',
									link: '/1',
									show: false,
									list: []
								},
								{
									name: '三级目录2',
									link: '',
									show: false,
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
					show: false,
					list: [{
							name: '二级目录1',
							link: '/code',
							show: false,
							list: []
						},
						{
							name: '二级目录2',
							link: '',
							show: false,
							list: []
						}
					]
				}
			]
		}
	}
}

</script>
