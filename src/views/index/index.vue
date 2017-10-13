<template>
	<div class="esp-index">
		<!-- <ask-picker :value="mock" @picker="picker"></ask-picker> -->
	</div>
</template>
<script>
import moment from 'moment/moment.js';
import { Product } from '@/services';
import { askDialogAlert } from '@/utils';
export default {
	data() {
		return {
			mock: moment().format("YYYY-MM-DD HH:mm:ss")
		}
	},
	mounted() {
		// const qw = new Product();
		// qw.all().then((r) => {
		// 	console.log(r)
		// });
	},
	methods:{
		picker(time){
			this.mock = time;
		}
	}
}

</script>
