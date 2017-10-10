<template>
	<div class="ask-lock-manual" v-show="show">
		<check-card :item="manual"></check-card>
	</div>
</template>
<script>
import { setComponent } from '@core/box-set';
import { SetData } from '@/services';
import { askDialogToast } from '@/utils';
export default {
	name: 'luckManualComponent',
	components:setComponent,
	inject: ['rootMain','rootChildren'],
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			setData: new SetData(),
			manual: {}
		}
	},
	watch: {
		show(n, o) {
			if (n) {
				this.getManual();
			}
		},
		'rootChildren.manualChecked'(n,o){
			this.setManual(n);
		},
		'rootChildren.show' (n, o) {
			this.$nextTick(() => {
				if (n&& this.show) {
					this.getManual();
				}
			})
		}
	},
	mounted() {
		if (this.show) {
			this.getManual();
		}
	},
	methods: {
		getManual() {
			this.rootMain.loadingShow();
			this.setData.getManual(this.$route.params.boxId).then(r => {
				this.rootMain.loadingHide();
				this.manual = {
					name: '手动锁定',
					checked: Boolean(r.data.data.lock_man)
				}
			})
		},
		setManual(checked) {
			this.rootMain.loadingShow();
			this.setData.setManual(this.$route.params.boxId).then(r => {
				this.rootMain.loadingHide();
				if (r.data.code == 1000) {
					this.manual.checked = checked;
					askDialogToast({ msg: r.data.message ? r.data.message : '设置成功', time: 2000, class: 'success' });
				}
			});
		}
	}
}

</script>
