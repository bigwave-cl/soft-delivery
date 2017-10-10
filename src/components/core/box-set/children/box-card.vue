<template>
	<div class="ask-box-card">
		<div class="abc-title">
			{{title}}
			<slot name="del"></slot>
		</div>
		<div class="abc-body" @click="queryDetail" :class="{cur:type === 'icon'}">
			<template v-for="(item,$i) in items" v-if="type === 'text'">
				<div class="text">{{item.name}}:{{item.value}}</div>
			</template>
			<template v-for="(item,$i) in items" v-else-if="type === 'icon'">
				<div class="icon-box">
					<i class="iconfont" :class="[item.name]"></i>
					<div class="icon-text">{{item.value}}</div>
				</div>
			</template>
		</div>
	</div>
</template>
<style src="./box-card.scss" lang="scss"></style>
<script>
	export default{
		name:'boxCard',
		props:{
			title:{
				type:String,
				default:''
			},
			items:{
				type:Array,
				default:[]
			},
			type:{
				type: String,
				default:'text'
			}
		},
		methods:{
			queryDetail(){
				this.$emit('card-click');
			}
		}
	}
</script>