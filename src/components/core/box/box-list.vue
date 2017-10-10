<template>
	<div class="ask-box-list">
		<div class="header-bar">
			<div class="text">
				<i class="iconfont icon-ren blue"></i>
				<span v-text="item.nickname"></span>
			</div>
			<div class="text">
				<span>安全箱数量:</span>
				<span class="blue" v-text="item.device_num"></span>
			</div>
		</div>
		<div class="list-body">
			<ul class="list-ul">
				<slot></slot>
			</ul>
		</div>
	</div>
</template>
<style src="./box-list.scss" lang="scss"></style>

<script>
	export default{
		name:'box-list',
		props:{
			item:{
				type: Object,
				default:{}
			}
		}
	}
</script>