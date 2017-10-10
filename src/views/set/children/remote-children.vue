<template>
	<set-tab-group v-show="show">
		<set-tab-title :list="list"></set-tab-title>
		<set-tab-body>
			<check-card :item="remote"></check-card>
		</set-tab-body>
	</set-tab-group>
</template>
<script>
import { setComponent } from '@core/box-set';
import childrenMixin from './mixin.js';
import { SetData } from '@/services';
import { askDialogToast } from '@/utils';
export default {
	name: 'remoteChildren',
	mixins: [childrenMixin],
	inject: ['rootMain'],
	components: setComponent,
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
			remote:{}
		}
	},
	watch: {
		show(n, o) {
			if (n) {
				this.getRemote();
			}
		}
	},
	mounted() {
		if (this.show) {
			this.getRemote();
		}
	},
	methods: {
		changeState(item){
			this.setRemote(item.checked);
		},
		getRemote(){
			this.rootMain.loadingShow();
			this.setData.getRemote(this.$route.params.boxId).then(r => {
				this.rootMain.loadingHide();
				this.remote = {
					name:'远程授权',
					checked: Boolean(r.data.data.authorize) 
				}
			})
		},
		setRemote(checked){
			this.rootMain.loadingShow();
			this.setData.setRemote(this.$route.params.boxId).then(r => {
				this.rootMain.loadingHide();
				if(r.data.code == 1000){
					this.remote.checked = checked;
					askDialogToast({msg:r.data.message? r.data.message:'设置成功',time:2000,class:'success'});
				}
			});
		}
	}
}

</script>
