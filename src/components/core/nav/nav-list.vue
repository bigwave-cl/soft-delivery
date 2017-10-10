<template>
	<ul class="ask-nav-list">
		<slot></slot>
	</ul>
</template>
<style src="./nav-list.scss" lang="scss"></style>
<script>
import navItem from './nav-item.vue';
export default {
	name: 'nav-list',
	componentName: 'navList',
	components: {
		'nav-item': navItem
	},
	provide() {
		return {
			rootMenu: this
		};
	},
	props: {
		defaultActive: '',
		list: {
			type: Array,
			default: []
		}
	},
	computed: {
		currentUrl() {
			return this.$route.fullPath;
		}
	},
	data() {
		return {
			openMenus: [],
			activeIndex: this.defaultActive,
			activeMenus:[],
			items: {}
		}
	},
	watch: {
		defaultActive(value) {
			const item = this.items[value];
			if (item) {
				this.activeIndex = item.index;
			} else {
				this.activeIndex = '';
			}
		}
	},
	mounted() {
		this.initOpenMenu();
	},
	updated(){
		this.$nextTick(()=>{
			this.initOpenMenu();
		})
	},
	methods: {
		findLink(list){
			list.map(index=>{
				if(index.link && this.$route.fullPath.indexOf(index.link) == 0) {
					this.activeIndex = index.index;
				}
				if(index.list.length > 0) {
					this.findLink(index.list);
				}
			})
		},
		initOpenMenu(){
			this.findLink(this.list);
			const index = this.activeIndex;

			const activeItem = this.items[index];
			if (!activeItem) return;

			let indexPath = activeItem.indexPath;
			// 展开该菜单项的路径上所有子菜单
			indexPath.forEach(index => {
				let submenu = this.items[index];
				submenu && this.openMenu(index, submenu.indexPath);
			});
		},
		addItem(item) {
			this.$set(this.items, item.index, item);
		},
		removeItem(item) {
			delete this.items[item.index];
		},
		openMenu(index, indexPath) {
			let openMenus = this.openMenus;

			if (openMenus.indexOf(index) !== -1) return;

			// 将不在该菜单路径下的其余菜单收起
			this.openMenus = openMenus.filter(index => {
				return indexPath.indexOf(index) !== -1;
			});
			this.openMenus.push(index);
		},
		closeMenu(index) {
			this.openMenus.splice(this.openMenus.indexOf(index), 1);
		},
		handleItemClick(subvue) {
			const { index, indexPath,item } = subvue;
			let isOpened = this.openMenus.indexOf(index) !== -1;
			if (isOpened) {
				if(item.list.length == 0) return;
				this.closeMenu(index);
				this.$emit('close', index, indexPath);
			} else {
				this.openMenu(index, indexPath);
				this.$emit('open', index, indexPath);
			}
		}
	}
}

</script>
