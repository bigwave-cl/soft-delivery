<template>
	<li class="ask-box-item">
		<ask-button @ask-click="jumpSet">
			<span class="button-text">
				<img src="~@/assets/icon_box.png" alt="箱子图标">
				<div class="text">
					<slot></slot>
				</div>
			</span>
		</ask-button>
	</li>
</template>
<script>
import { getRouterId } from '@/utils';
export default {
	name: 'box-item',
	props: {
		once: {
			type: Object,
			default: {}
		},
		did: {
			type: [String, Number],
			default: ''
		},
		name: {
			type: String,
			default: '设置'
		}
	},
	methods: {
		jumpSet() {
			if (this.$router) {
				this.$router.push({ path: `/box/${this.did}/set/${this.once.imei}`, query: { name: this.name,state: getRouterId()} });
			}
		}
	}
}

</script>
