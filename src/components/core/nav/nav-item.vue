<template>
	<li class="ask-nav-item" :index="index" @click.stop="toggleSub()" :class="{sub: item.list.length > 0,active:active}">
		<template v-if="item.link">
			<router-link :to="item.link">
				<ask-button>
					<span class="button-text">
						<i class="iconfont left" :class="[item.icon]" v-if="item.icon"></i>
						<span v-text="item.name"></span>
						<i class="iconfont icon-gengduo" v-if="item.list.length > 0"></i>
					</span>
				</ask-button>
			</router-link>

			<nav-group class="sub-bar"  v-show="opened">
				<template v-for="(sub,$i) in item.list">
					<nav-item :item="sub"  :key="$i" :index="sub.index"></nav-item>
				</template>
			</nav-group>
		</template>
		<template v-else>
			<ask-button>
				<span class="button-text">
					<i class="iconfont left" :class="[item.icon]" v-if="item.icon"></i>
					<span v-text="item.name"></span>
				</span>
			</ask-button>
			<nav-group class="sub-bar"  v-show="opened">
				<template v-for="(sub,$i) in item.list">
					<nav-item :item="sub"  :key="$i" :index="sub.index"></nav-item>
				</template>
			</nav-group>
		</template>
	</li>
</template>
<script>
import navGroup from './nav-group.vue';
export default {
	name: 'nav-item',
	componentName:'navItem',
	inject: ['rootMenu'],
	components: {
		'nav-group': navGroup
	},
	props: {
		index:'',
		item: {}
	},
	computed:{
		opened(){
			return this.rootMenu.openMenus.indexOf(this.index) > -1;
		},
		active(){
			return this.item.link && this.$route.fullPath.indexOf(this.item.link) == 0 ;
		},
		indexPath() {
		  let path = [this.index];
		  let parent = this.$parent.$parent;
		  while (parent.$options.componentName == 'navItem') {
		    if (parent.index) {
		      	path.unshift(parent.index);
		    }
		    parent = parent.$parent.$parent;
		  }
		  return path;
		}
	},
	created(){
		this.rootMenu.addItem(this);
	},
    beforeDestroy() {
        this.rootMenu.removeItem(this);
    },
	methods: {
		toggleSub() {
			this.rootMenu.handleItemClick(this);
		}
	}
}

</script>
