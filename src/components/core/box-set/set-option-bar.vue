<template>
	<div class="ask-option-bar">
		<ask-swiper :options="options">
			<template v-for="(item,$i) in items">
				<ask-slide :key="$i" class="swiper-slide-set">
					<div class="bar-box">
						<ask-button @ask-click="changeContent(item)">
							<span class="button-text">
								<template v-if="item.icon == 1">
									<img :src="imgOpt.icon_1" alt="图标">
								</template>
								<template v-else-if="item.icon == 2">
									<img :src="imgOpt.icon_2" alt="图标">
								</template>
								<template v-else-if="item.icon == 3">
									<img :src="imgOpt.icon_3" alt="图标">
								</template>
								<template v-else-if="item.icon == 4">
									<img :src="imgOpt.icon_4" alt="图标">
								</template>
								<template v-else-if="item.icon == 5">
									<img :src="imgOpt.icon_5" alt="图标">
								</template>
								<template v-else-if="item.icon == 6">
									<img :src="imgOpt.icon_6" alt="图标">
								</template>
								<span>{{item.name}}</span>
							</span>
						</ask-button>
					</div>
				</ask-slide>
			</template>
			
		</ask-swiper>
	</div>
</template>
<style src="./set-option-bar.scss" lang="scss"></style>
<script>
import icon_1 from '@/assets/icon/icon_location_hover.png';
import icon_2 from '@/assets/icon/icon_supervise.png';
import icon_3 from '@/assets/icon/icon_record.png';
import icon_4 from '@/assets/icon/icon_setting.png';
import icon_5 from '@/assets/icon/icon_lock.png';
import icon_6 from '@/assets/icon/icon_impower.png';
	export default{
		name:"setOptionBar",
		inject:['rootSet'],
		provide(){
			return {
				swiperMain: this
			}
		},
		props:{
			items:{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				swiper: null,
				options:{
					slidesPerView:'auto',
					spaceBetween: 20,
					freeMode: true
				},
				imgOpt:{
					"icon_1":icon_1,
					"icon_2":icon_2,
					"icon_3":icon_3,
					"icon_4":icon_4,
					"icon_5":icon_5,
					"icon_6":icon_6
				}
			}
		},
		methods:{
			changeContent(item){
				this.rootSet.changeContent(item);
			},
			initSwiper(s){
				this.swiper = s;
			},
			slideTo(n){
				if(this.swiper){
					this.swiper.slideTo( parseInt(n, 10) - 1, 500, false);
				}
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.slideTo(this.rootSet.defaultActive);
			})
		},
		watch:{
			'rootSet.defaultActive'(n,s){
				this.slideTo(n);
			}
		}
	}
</script>