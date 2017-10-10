<template>
	<nav-transition>
		<ul class="ask-nav-list">
			<slot></slot>
		</ul>
	</nav-transition>
</template>
<script>
import { addClass, removeClass, hasClass } from '@/utils';
export default {
	name: 'nav-group',
	componentName:'navGroup',
	components: {
		'nav-transition': {
			functional: true,
			render(createElement, context) {
				const data = {
					props: {
						mode: 'out-in'
					},
					on: {
						beforeEnter(el) {
							el.style.opacity = 0.2;
						},

						enter(el) {
							el.style.opacity = 1;
							let groupHeight = el.clientHeight;
							el.style.height = 0;
							el.style.transitionDuration = `300ms`;
							window.getComputedStyle(el).getPropertyValue('opacity');
							el.style.height = groupHeight+'px';
						},

						afterEnter(el) {
							el.style.opacity = '';
							el.style.height = 'auto';
						},

						beforeLeave(el) {
						},

						leave(el) {
							let groupHeight = el.clientHeight;
							el.style.height = groupHeight+'px';
							el.style.transitionDuration = `300ms`;
							window.getComputedStyle(el).getPropertyValue('opacity');
							el.style.height = 0;
						},

						afterLeave(el) {
							el.style.height = 'auto';
						}
					}
				};
				return createElement('transition', data, context.children);
			}
		}
	}
}

</script>
