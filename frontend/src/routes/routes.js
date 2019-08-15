export default [
	{
		path: "/",
		name: "List",
		component: () => import("../pages/List.vue"),
	},
	{
		path: "/about",
		name: "About",
		component: () => import("../pages/About.vue"),
	},
	{
		path: "/join",
		name: "Join",
		component: () => import("../pages/Join.vue"),
	},
	{
		path: "*",
		name: "404",
		component: () => import("../pages/404.vue"),
	},
];
