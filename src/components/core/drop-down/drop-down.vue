<template>
	<div class="ask-drop-down">
		<ask-button @ask-click="toggleSub($event)" class="no">
			<span class="button-text">
				<span v-text="drop.title"></span>
				<i class="iconfont icon-arrRight-fill"></i>
			</span>
		</ask-button>
		<drop-list :list="drop.list" v-show="show"></drop-list>
		<div class="ask-drop-overlay" v-show="show" @click="hideSub()"></div>
	</div>
</template>
<style src="./drop-down.scss" lang="scss"></style>
<script>
import dropList from './drop-list.vue';
export default {
	name: 'drop-down',
	components: {
		'drop-list': dropList
	},
	props: {
		drop: {
			type: Object,
			default: {}
		}
	},
	data(){
		return{
			show:false
		}
	},
	methods:{
		toggleSub(){
			this.show = !this.show;
		},
		hideSub(){
			this.show = false;
		}
	}
}

</script>
