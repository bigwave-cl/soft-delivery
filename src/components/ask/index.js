//按钮控件
import askButton from './ask-button/ask-button.vue';
import askRipple from './ask-ripple/ask-ripple.vue';

//模态框控件
import askModal from './ask-modal/ask-modal.vue';
import askOverlay from './ask-overlay/ask-overlay.vue';


//swiper模块
import askSwiper from './ask-swiper/ask-swiper.vue';
import askSlide from './ask-swiper/ask-slide.vue';

var components = {
	'ask-button': askButton,
	'ask-modal': askModal,
	'ask-ripple': askRipple,
	'ask-swiper':askSwiper,
	'ask-slide':askSlide,
	'ask-overlay':askOverlay
}

export default {
	install(Vue) {
		Object.keys(components).forEach((key) => Vue.component(key, components[key]));
	}
}
