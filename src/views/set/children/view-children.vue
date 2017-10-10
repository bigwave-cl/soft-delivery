<template>
	<div class="view-children-box" v-show="show">
		<div id="view_children"></div>
	</div>
</template>
<style src="./view-children.scss" lang="scss"></style>
<script>

import { amapLoad, askDialogConfirm, askDialogToast } from '@/utils';
import childrenMixin from './mixin.js';
import { SetData } from '@/services';
import { MAPKEY,MAPCENTER} from '@/config.js';

export default {
	name: 'remoteChildren',
	mixins: [childrenMixin],
	inject: ['rootMain'],
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			list: [{
				name: '远程授权',
				index: 1
			}],
			setData: new SetData(),
			remote:{},
			map:''
		}
	},
	watch: {
		show(n, o) {
			if (n) {
				this.initAmap();
			}
		}
	},
	mounted() {
		if (this.show) {
			this.initAmap();
		}
	},
	methods: {
		initAmap() {
			amapLoad(MAPKEY).then(AMap => {
				this.map = new AMap.Map('view_children', {
					center: MAPCENTER,
					zoom: 18
				})
				this.map.setFitView();
			}, error => {
				console.log(error);
			})
		}
	}
}

</script>
