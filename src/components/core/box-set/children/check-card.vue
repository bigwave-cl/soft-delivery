<template>
	<div class="ask-check-card">
		<div class="acc-title">{{item.name}}:</div>
		<div class="acc-box">
			<div class="check-box">
				<input type="checkbox" class="acc-check" :id="`acc_input_${checkId}`" v-model="item.checked">
				<label :for="`acc_input_${checkId}`" @click="changeState()"></label>
			</div>
		</div>
	</div>
</template>
<style src="./check-card.scss" lang="scss"></style>
<script>
import { getInputId } from '@/utils';
	export default{
		name:'checkCard',
		inject:['rootChildren'],
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		computed:{
			checkId(){
				return getInputId();
			}
		},
		methods:{
			changeState(){
				let timer = setTimeout(() => {
					this.rootChildren.changeState(this.item);
					clearTimeout(timer);
				},0);
			}
		}
	}
</script>