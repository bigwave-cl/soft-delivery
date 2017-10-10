<template>
	<set-tab-group v-show="show">
		<set-tab-title :list="list">
			<div slot="abnormal" class="abnormal-button">
				<ask-button @ask-click="addLockTime()" v-if="defaultActive == 1">
					<span class="button-text">
						<i class="iconfont icon-jia abnormal"></i>添加时间段
					</span>
				</ask-button>
			</div>
			<div slot="abnormal" class="abnormal-button" v-if="defaultActive == 2">
				<ask-button @ask-click="addLockArea()">
					<span class="button-text">
						<i class="iconfont icon-jia abnormal"></i>添加区域
					</span>
				</ask-button>
			</div>
		</set-tab-title>
		<set-tab-body>
			<template v-for="(item,$i) in list">
				<template v-if="item.index == 1">
					<lock-time-component :show="show && defaultActive == item.index" :key="$i"></lock-time-component>
				</template>
				<template v-else-if="item.index == 2">
					<lock-area-component :show="show && defaultActive == item.index" :key="$i"></lock-area-component>
				</template>
				<template v-else-if="item.index == 3">
					<lock-manual-component :show="show && defaultActive == item.index" :key="$i"></lock-manual-component>
				</template>
			</template>
		</set-tab-body>
	</set-tab-group>
</template>
<script>
import { setComponent } from '@core/box-set';
import { lockComponent } from './lock-set';
import { addLockModal } from './lock-set/lock-modal.js';
import childrenMixin from './mixin.js';
import { amapLoad,askDialogToast,askDialogModal } from '@/utils';
import { SetData } from '@/services';
import { MAPKEY,MAPCENTER} from '@/config.js';

let component = Object.assign({}, setComponent, lockComponent);
export default {
	name: 'lockSetChildren',
	mixins: [childrenMixin],
	inject: ['rootMain'],
	components: component,
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			list: [{
				name: '时间锁定',
				index: 1
			},{
				name: '区域锁定',
				index: 2
			},{
				name: '手动锁定',
				index: 3
			}],
			manualChecked : '',
			timeUpdate: false,
			areaUpdate:false,

		}
	},
	methods:{
		changeState(item){
			this.manualChecked = item.checked;
		},
		addLockTime(){
			addLockModal('time',(vm)=>{
				this.timeUpdate = false;
				const setData = new SetData();
				this.rootMain.loadingShow();
				setData.addLockTime({
				    "imei": this.$route.params.boxId, 
				    "name": vm.time.name,
				    "start_time": vm.time.begin, 
				    "end_time": vm.time.end
				}).then(r=>{
					this.rootMain.loadingHide();
					vm.close();
					this.timeUpdate = true;
					if(r.data.code == 1000){
						askDialogToast({msg:r.data.message? r.data.message:'设置成功',time:2000,class:'success'});
					}
				})
			});
		},
		addLockArea(){
			addLockModal('area',(vm)=>{
				this.areaUpdate = false;
				let option = {
					lnglats:[]
				};
				vm.area.list.map(index=>{
					option.lnglats.push(index);
				});
				option.lnglats = JSON.stringify(option.lnglats);
				option.lng = vm.area.list[0][0];
				option.lat = vm.area.list[0][1];
				option.name = vm.area.name;
				option.imei = this.$route.params.boxId;

				this.rootMain.loadingShow();
				this.buildAddress(vm.area.list[0]).then(r=>{
					option.address = r;
					const setData = new SetData();
					setData.addLockArea(option).then(r=>{
						this.rootMain.loadingHide();
						vm.close();
						this.areaUpdate = true;
						if(r.data.code == 1000){
							askDialogToast({msg:r.data.message? r.data.message:'添加成功',time:2000,class:'success'});
						}
					})
				});
			});
		},
		buildAddress(data){
			return new Promise((resolve, reject)=>{
				amapLoad(MAPKEY).then(AMap => {
					AMap.plugin(["AMap.Geocoder"], () => {
						const geocoder = new AMap.Geocoder({
				           radius: 1000,
				           extensions: "all"
				        });
				        geocoder.getAddress(data, function(status, result) {
		                    if (status === 'complete' && result.info === 'OK') {
		                    	resolve(result.regeocode.formattedAddress);
		                    }
		                }); 
					});
				}, error => {
					console.log(error);
				})
			})
		}
	}
}

</script>
