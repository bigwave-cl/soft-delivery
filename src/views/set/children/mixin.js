/*
 * @Author: askMeWhy
 * @Date:   2017-09-29 11:29:02
 * @Last Modified by:   smile
 * @Last Modified time: 2017-09-29 11:32:01
 */
export default {
	provide() {
		return {
			'rootChildren': this
		}
	},
	data() {
		return {
			defaultActive: 1
		}
	},
	methods: {
		changeContent(item) {
			this.defaultActive = item.index;
		}
	}
}
