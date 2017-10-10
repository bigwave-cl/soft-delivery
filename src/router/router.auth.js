import router from './index.js'
import { refreshTitle } from '@/utils';
import { User } from '@/services';

const user = new User();
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (to.meta.title) {
			refreshTitle(to.meta.title);
		} else {
			refreshTitle('Ask-Me-Why');
		}
		if (user.auth == 'none') {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			});
		}else{
			next()
		}
	}else{
		next();
	}
	
	/*to.matched.some(record => {
		next()
	});*/

})
