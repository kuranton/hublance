import Vue from "vue";
import Router from "vue-router";

import routes from './routes/index.js'

Vue.use(Router);

console.log("routes", routes);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "current",
  routes: routes,
});

router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token')
	if(to.meta.requireAuth) {
		if(token) {
			next()
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		}
	} else {
		next()
	}
})

export default router
