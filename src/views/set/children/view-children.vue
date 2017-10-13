<template>
	<div class="view-children-box" v-show="show">
		<div id="view_children"></div>
		<div class="location-search">
			<ask-picker-range></ask-picker-range>
			<ask-button :text="'查询'" @ask-click="queryRealLine"></ask-button>
		</div>
		<div class="location-filter">
			<ask-button @ask-click="getRealLocation">
				<span class="button-text">
					<i class="iconfont icon-weizhi"></i>
				</span>
			</ask-button>
			<ask-button @ask-click="filterFirst">
				<span class="button-text">
					<i class="iconfont icon-youxuanluxian"></i>
				</span>
			</ask-button>
			<ask-button @ask-click="filterSafe">
				<span class="button-text">
					<i class="iconfont icon-anquan"></i>
				</span>
			</ask-button>
		</div>
	</div>
</template>
<style src="./view-children.scss" lang="scss"></style>
<script>
import { amapLoad, askDialogConfirm, askDialogToast } from '@/utils';
import childrenMixin from './mixin.js';
import { SetData } from '@/services';
import { MAPKEY, MAPCENTER } from '@/config.js';
const MARKER_ALL = 0,
	MARKER_FIRST = 1,
	MARKER_SAFE = 2;
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
			map: '',
			search: {
				begin: '2016-01-10 10:18:20',
				end: '2017-10-20 10:18:20'
			},
			line: [],
			renderLine: [],
			markers: [],
			polyline: ''
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
				this.getRealLocation();
			}, error => {
				console.log(error);
			})
		},
		setMapMarker(lng, lat) {
			if (this.map == null) return;
			this.removeMulch();
			let marker = new AMap.Marker({
				map: this.map,
				position: [lng, lat],
				offset: new AMap.Pixel(-12, -52),
				content: `<div class="location-marker">
							<i class="iconfont icon-xiangzi"></i>
						</div>`
			});
			this.markers.push(marker);
			this.map.setFitView();
		},
		async getRealLocation() {
			const setData = new SetData();
			this.rootMain.loadingShow();
			let realLocation = await setData.getRealLocation(this.$route.params.boxId);
			let data = realLocation.data.data;
			this.setMapMarker(data.lng, data.lat);

			this.rootMain.loadingHide();
		},
		queryRealLine() {
			this.removeMulch();
			const setData = new SetData();
			let option = {};
			option = {
				"start_time": this.search.begin,
				"end_time": this.search.end,
				"imei": this.$route.params.boxId
			}
			this.rootMain.loadingShow();
			setData.getAllLocation(option).then(r => {
				this.rootMain.loadingHide();
				if (r.data.data.length == 0) {
					askDialogToast({ msg: r.data.message ? r.data.message : '暂无数据', time: 2000, class: 'danger' });
					return;
				}
				this.line = [];
				r.data.data.map(index => {
					this.line.push(index);
					this.renderLine.push(index);
				})
				this.mapRenderLine(MARKER_ALL);
			});
		},
		mapRenderLine(type) {
			let markeColor = '';
			if (type === MARKER_ALL) markeColor = '';
			if (type === MARKER_FIRST) markeColor = 'first';
			if (type === MARKER_SAFE) markeColor = 'safe';
			let lineArr = [];
			this.renderLine.map(index => {
				let marker = new AMap.Marker({
					map: this.map,
					position: [index.lng, index.lat],
					offset: new AMap.Pixel(-15, -32),
					content: `<div class="location-query ${markeColor}">
								<i class="iconfont icon-dingwei"></i>
							  </div>`
				});
				let circle = new AMap.Circle({
					center: new AMap.LngLat(index.lng, index.lat), // 圆心位置
					radius: 500, //半径
					strokeColor: "#F33", //线颜色
					strokeOpacity: .8, //线透明度
					strokeWeight: 1, //线粗细度
					fillColor: "#ee2200", //填充颜色
					fillOpacity: .25 //填充透明度

				});
				let infoWindow = new AMap.InfoWindow({
					isCustom: true, //使用自定义窗体
					content: this.buildWindow(index),
					offset: new AMap.Pixel(0, -35)
				});
				AMap.event.addListener(marker, 'click', () => {
					infoWindow.open(this.map, marker.getPosition());
				});
				marker.on('mouseover', () => {
					circle.setMap(this.map);
				})
				marker.on('mouseout', () => {
					this.map.remove(circle)
				})
				lineArr.push([index.lng, index.lat]);
				this.markers.push(marker);
			})
			this.map.setFitView();
			this.polyline = new AMap.Polyline({
				path: lineArr, // 设置线覆盖物路径
				isOutline: true, //是否描边
				outlineColor: '#40D3D5', //设置描边颜色，当outlineColor为true时有效
				strokeColor: '#40D3D5', // 线颜色
				strokeOpacity: 1, // 线透明度
				strokeWeight: 8, // 线宽
				strokeStyle: 'solid', // 线样式
				strokeDasharray: [10, 5], // 补充线样式
				geodesic: false, // 绘制大地线
				lineJoin: 'round', //转角样式
				showDir: true //是否延路径显示白色方向箭头
			});
			this.polyline.setMap(this.map);
		},
		buildWindow(index) {
			let info = document.createElement("div");
			info.className = "location-info";
			let data = [{
				name: '时间',
				value: '2017-05-06 14:14'
			}, {
				name: '经纬度',
				value: index.lng+','+index.lat
			}, {
				name: '速度',
				value: index.speed+'km/s'
			}, {
				name: '状态',
				value: '正常'
			}, {
				name: '定位方式',
				value: '基站定位'
			}, {
				name: '误差范围',
				value: '500米'
			}]

			let bodys = document.createElement("ul");
			bodys.className = "info-list";
			data.map(once=>{
				let liEl = document.createElement("li");
				liEl.className = "info-li";
				let nameEl = document.createElement("div");
				nameEl.className = "name";
				nameEl.innerHTML = once.name+':';
				let valueEl = document.createElement("div");
				valueEl.className = "value";
				valueEl.innerHTML = once.value;
				liEl.appendChild(nameEl);
				liEl.appendChild(valueEl);
				bodys.appendChild(liEl);
			})
			info.appendChild(bodys);
			info.onclick = ()=>{
				this.map.clearInfoWindow();
			}
			return info;
		},
		removeMulch() {
			this.map.remove(this.markers);
			this.map.remove(this.polyline);
			this.map.clearInfoWindow();
			this.markers = [];
			this.polyline = '';
			this.renderLine = [];
		},
		filterFirst() {
			if (this.line.length == 0) return;
			this.removeMulch();
			this.renderLine = this.line.filter(index => index.place_status == 2);
			this.mapRenderLine(MARKER_FIRST);
		},
		filterSafe() {
			if (this.line.length == 0) return;
			this.removeMulch();
			this.renderLine = this.line.filter(index => index.dislocation_status == 2);
			this.mapRenderLine(MARKER_SAFE);
		}
	}
}

</script>
