/*
* @Author: askMeWhy
* @Date:   2017-09-28 17:56:12
* @Last Modified by:   smile
* @Last Modified time: 2017-09-29 14:42:43
*/
import setContainer from './set-container.vue';
import setOptionBar from './set-option-bar.vue';
import setTabGroup from './children/set-tab-group.vue';
import setTabBody from './children/set-tab-body.vue';
import setTabTitle from './children/set-tab-title.vue';
import gradeCard from './children/grade-card.vue';
import checkCard from './children/check-card.vue';
import boxCard from './children/box-card.vue';
import boxCardList from './children/box-card-list.vue';
import blockList from './children/block-list.vue';

export const setComponent = {
	'set-container':setContainer,
	'set-option-bar':setOptionBar,
	'set-tab-group':setTabGroup,
	'set-tab-body':setTabBody,
	'set-tab-title':setTabTitle,
	'grade-card':gradeCard,
	'check-card':checkCard,
	'box-card':boxCard,
	'box-card-list':boxCardList,
	'block-list':blockList
}