<template>
	<div class="box-card-list" v-show="show">
		<slot></slot>
	</div>
</template>
<style src="./box-card-list.scss" lang="scss"></style>
<script>
let ticking = false;
export default {
	name: "boxCardList",
	inject: ['rootChildren'],
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	created() {
		if (this.show) {
			this.rootChildren.initBoxCard();
		}
	},
	mounted() {
		if (this.show) {
			this.addScroll();
		}
	},
	beforeDestroy() {
		this.removeScroll();
	},
	watch: {
		show(n, o) {
			if (n) {
				if (this.rootChildren.hasMore) {
					this.addScroll();
				}
				this.rootChildren.initBoxCard();
			} else {
				this.rootChildren.resetService();
				this.removeScroll();
			}
		},
		'rootChildren.hasMore' (n, o) {
			if (!n) {
				this.removeScroll();
			}
		},
		'rootChildren.show' (n, o) {
			this.$nextTick(() => {
				if (n) {
					if (this.rootChildren.hasMore) {
						this.addScroll();
					}
				} else {
					this.removeScroll();
				}
			})
		}
	},
	methods: {
		addScroll() {
			let askEl = this.$el.parentNode;
			askEl.addEventListener('scroll', this.scrollEvent);
		},
		removeScroll() {
			let askEl = this.$el.parentNode;

			if (askEl) {
				askEl.removeEventListener('scroll', this.scrollEvent, false);
			}
		},
		scrollEvent() {
			let askEl = this.$el.parentNode;
			let last_known_scroll_position = askEl.scrollTop;
			if (!ticking) {
				window.requestAnimationFrame(() => {
					if (last_known_scroll_position != 0 && askEl.scrollHeight - (askEl.clientHeight + last_known_scroll_position) <= 0) {
						this.rootChildren.initBoxCard();
					}
					ticking = false;
				});
			}
			ticking = true;
		}
	}
}

</script>
