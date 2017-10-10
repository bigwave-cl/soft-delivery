<template>
	<div class="box-container" :class="[$route.name]">
		<box-group v-if="$route.meta.box"></box-group>
		<router-view></router-view>
	</div>
</template>
<style src="./box.scss" lang="scss"></style>
<script>
import { Product } from '@/services';
import { askDialogAlert } from '@/utils';
import boxGroup from '@core/box/box-group.vue';
export default {
	name:'boxContainer',
	components:{
		'box-group':boxGroup
	},
	data() {
		return {
			mock: 1
		}
	},
	mounted() {
	}
}

</script>
