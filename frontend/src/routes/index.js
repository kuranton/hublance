
export default [{
			path: '/',
			name: 'List',
			component: () => import("../pages/List.vue"),
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/login',
			name: 'login',
			component(resolve) {
				require.ensure(['@/components/Login.vue'], () => {
					resolve(require('@/components/Login.vue'));
				});
			}
		},
		{
			path: '/join',
			name: 'Join',
			component(resolve) {
				require.ensure(['@/components/Signup.vue'], () => {
					resolve(require('@/components/Signup.vue'));
				});
			}
		},
	
];



