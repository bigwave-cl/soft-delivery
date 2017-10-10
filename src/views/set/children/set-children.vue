<template>
	<set-tab-group v-show="show">
		<set-tab-title :list="list"></set-tab-title>
		<set-tab-body>
			<template v-for="(grade,$i) in grades">
				<grade-card :grade="grade" :key="$i"></grade-card>
			</template>
		</set-tab-body>
	</set-tab-group>
</template>
<script>
import { setComponent } from '@core/box-set';
import childrenMixin from './mixin.js';
import { SetData } from '@/services';
import { askDialogToast } from '@/utils';
export default {
	name: 'setChildren',
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
				name: '设置',
				index: 1
			}],
			setData: new SetData(),
			grades: []
		}
	},
	watch: {
		show(n, o) {
			if (n) {
				this.initBoxCard();
			}
		}
	},
	mounted() {
		if (this.show) this.initBoxCard();
	},
	methods: {
		changeState(grade, index) {
			let gIndex = this.grades.indexOf(grade);
			this.grades[gIndex].items = this.grades[gIndex].items.map((item, key) => {
				item.choose = false;
				if (key == index) {
					item.choose = !item.choose;
				}
				return item;
			})
			this.setDevice();
		},
		initBoxCard() {
			this.rootMain.loadingShow();
			this.setData.getDevice(this.$route.params.boxId).then(r => {
				this.rootMain.loadingHide();
				let _grades = [];
				Object.keys(r.data.data).forEach((item) => {
					let once = {
						key:item,
						title: this.buildTitle(item),
						items: this.buildChoose(r.data.data[item])
					}
					_grades.push(once);
				})
				this.grades = _grades;
			})
		},
		buildTitle(val) {
			let r = '';
			switch (val) {
				case 'set01':
					r = '位置报送间隔';
					break;
				case 'set02':
					r = '报警报送间隔';
					break;
				default:
					r = '未知';
					break;
			}
			return r;
		},
		buildChoose(val) {
			let item = [{
					name: '低',
					value: '03',
					choose: false
				},
				{
					name: '中',
					value: '02',
					choose: false
				},
				{
					name: '高',
					value: '01',
					choose: false
				}
			];
			item = item.map(index=>{
				if(index.value == val) index.choose = true;
				return index;
			})
			return item;
		},
		setDevice(){
			let _post = {
				"imei": this.$route.params.boxId
			};
			this.grades.map(index=>{
				_post[index.key] = this.builSetVal(index.items);
			})

			this.rootMain.loadingShow();
			this.setData.setDevice(_post).then(r => {
				this.rootMain.loadingHide();
				if(r.data.code == 1000){
					askDialogToast({msg:r.data.message? r.data.message:'设置成功',time:2000,class:'success'});
				}
			})
		},
		builSetVal(item){
			let r= item.filter(index=>index.choose);
			return r[0].value;
		}
	}
}

</script>
