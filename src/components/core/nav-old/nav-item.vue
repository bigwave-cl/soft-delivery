<template>
	<li class="ask-nav-item" @click.stop="toggleSub($event)" :class="{sub: item.list.length > 0,active:currentUrl == item.link}">
		<template v-if="item.list.length == 0">
			<router-link :to="item.link">
				<ask-button>
					<span class="button-text">
						<i class="iconfont left" :class="[item.icon]" v-if="item.icon"></i>
						<span v-text="item.name"></span>
					</span>
				</ask-button>
			</router-link>
		</template>
		<template v-else>
			<ask-button>
				<span class="button-text">
					<i class="iconfont left" :class="[item.icon]" v-if="item.icon"></i>
					<span v-text="item.name"></span>
					<i class="iconfont icon-gengduo"></i>
				</span>
			</ask-button>
		</template>
		<slot name="children"></slot>
	</li>
</template>
<script>
export default {
	name: 'nav-item',
	props: {
		item: {},
		currentUrl:''
	},
	data(){
		return {
			oldItem:[]
		}
	},
	mounted() {
		if (this.item.list.length == 0 && this.currentUrl == this.item.link) this.pushState();
	},
	methods: {
		toggleSub() {
			this.$emit('itemClick');
			return;
			if (!this.$el.classList.contains('sub')) return;

			this.$el.classList.toggle('open');
			this.$el.classList.toggle('hide', !this.$el.classList.contains('open'));
		},
		pushState() {
			return;
			for (let cur = this.$el; cur; cur = cur.parentNode) {
				if (cur != this.$el && cur.nodeType === 1 && cur.tagName === 'LI' && cur.className.indexOf('ask-nav-item') != -1) {
					console.log(cur.children[1])
					cur.children[1].style.display = "block";
					cur.classList.add('active');
					this.oldItem.push(cur);
				}
			}
		}
	},
	watch:{
		currentUrl(){
			return;
			this.oldItem.map(index=>{
				if(index.classList.contains('open')) index.classList.remove('open');
				if(index.classList.contains('active')) index.classList.remove('active');
				index.classList.add('hide');
			})
			this.oldItem = [];
			if (this.item.list.length == 0 && this.currentUrl == this.item.link) this.pushState();
		}
	}
}

</script>
