<template>
	<ask-modal 
			:show="show" 
			:title="title" 
			:closeIcon="icon" 
			:shade="shade" 
			:shadeColor="shadeColor" 
			:shadeClick="shadeClick" 
			@onclose="iconClose"
			@initmodal="initAmap"
			:class="{'area':type == 'area' || type == 'query'}">
		<template v-if="type == 'time'">
			<div class="add-lock-modal-box">
				<div class="alm-group">
					<div class="alm-title">时间段名</div>
					<div class="alm-body">
						<input type="text" :value="time.name" placeholder="请输入时间段名称">
					</div>
				</div>
				<div class="alm-group">
					<div class="alm-title">起始时间</div>
					<div class="alm-body">
						<ask-picker :value="time.begin" @picker="beginPicker"></ask-picker>
					</div>
				</div>
				<div class="alm-group">
					<div class="alm-title">结束时间</div>
					<div class="alm-body">
						<ask-picker :value="time.end" @picker="endPicker"></ask-picker>
					</div>
				</div>
			</div>
			<ask-button slot="footer" class="ask-alert-btn" :text="btnText" @ask-click="sure"></ask-button>
		</template>
		<template v-if="type == 'area' || type == 'query'">
			<div id="lock_area_map"></div>
			<div class="button-group" slot="footer" v-if="type == 'query'">
				<ask-button class="ask-alert-btn" :text="'关闭'" @ask-click="close"></ask-button>
			</div>
			<div class="map-tip" slot="footer" v-if="type == 'area'">
				鼠标在地图上点击绘制多边形量测区域，双击或右键结束量测操作
			</div>
		</template>
	</ask-modal>
</template>
<style src="./lock-modal.scss" lang="scss"></style>
<script>
import moment from 'moment/moment.js';
import { amapLoad, askDialogConfirm, askDialogToast } from '@/utils';
import { MAPKEY,MAPCENTER} from '@/config.js';
export default {
	props: {
		shade: {
			type: Number,
			default: .4
		},
		shadeColor: {
			type: String,
			default: '#000'
		},
		shadeClick: {
			type: Boolean,
			default: true
		},
		show: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		icon: {
			type: Boolean,
			default: false
		},
		btnText: {
			type: String,
			default: '确定'
		},
		type: {
			type: String,
			default: 'time'
		}
	},
	data() {
		return {
			time: {
				name: '',
				begin: '',
				end: ''
			},
			area: {
				list: [],
				name: ''
			},
			query:[],
			map: ''
		}
	},
	mounted() {},
	methods: {
		sure() {
			this.$emit('onok');
		},
		close() {
			this.show = false;
		},
		iconClose() {
			this.$emit('onclose');
		},
		beginPicker(time){
			this.time.begin = time;
		},
		endPicker(time){
			this.time.end = time;
		},
		initAmap() {
			if(this.type == 'time') return;
			amapLoad(MAPKEY).then(AMap => {
				this.map = new AMap.Map('lock_area_map', {
					center: MAPCENTER,
					zoom: 18
				})
				if(this.type === 'area') this.addMapSet(AMap);
				if(this.type === 'query') this.queryMapSet(AMap);
				this.map.setFitView();
			}, error => {
				console.log(error);
			})
		},
		async addMapSet(AMap){
			this.map.plugin(["AMap.MouseTool"], () => {
				const mouseTool = new AMap.MouseTool(this.map);

				const polygonSet = {
					strokeColor: "#FF33FF", //线颜色
					strokeOpacity: 0.2, //线透明度
					strokeWeight: 3,    //线宽
					fillColor: "#1791fc", //填充色
					fillOpacity: 0.35//填充透明度
				};
				//鼠标工具插件添加draw事件监听
				AMap.event.addListener(mouseTool, "draw", (e) => {
					const eObject = e.obj; //obj属性就是鼠标事件完成所绘制的覆盖物对象。
					setTimeout(() => {
						askDialogConfirm({
							title: '围栏名称',
							msg: '<input type="text" id="lock_area_input" name="" value="" placeholder="请输入围栏名称">'
						}, (vm) => {
							const name = document.getElementById('lock_area_input');
							if (name.value == void 0 || name.value == '' || name.value == null) {
								askDialogToast({ msg: '请输入围栏名称', class: 'danger' })
								return;
							}
							eObject.getPath().map(index => {
								this.area.list.push([index.lng,index.lat]);
							})

							this.area.name = name.value.trim();
							this.$emit('onok');
							vm.close();
						}, () => {
							mouseTool.close(true);
							mouseTool.polygon(polygonSet);
						}, () => {
							mouseTool.close(true);
							mouseTool.polygon(polygonSet);
						});
					}, 0);
				});
				mouseTool.polygon(polygonSet); //调用鼠标工具的面积量测功能
			});
		},
		queryMapSet(AMap){
			const polygonArr = new Array();//多边形覆盖物节点坐标数组
			
			this.query.map(index=>{
				polygonArr.push(index);
			})
			const  polygon = new AMap.Polygon({
			    path: polygonArr,//设置多边形边界路径
			    strokeColor: "#FF33FF", //线颜色
			    strokeOpacity: 0.2, //线透明度
			    strokeWeight: 3,    //线宽
			    fillColor: "#1791fc", //填充色
			    fillOpacity: 0.35//填充透明度
			});
			polygon.setMap(this.map);
		}
	},
	watch: {
		map(n, o) {
			if (n !== '') {

			}
		}
	}
}

</script>
