<template>
	<section class="section">
		<h1 class="headline headline--main">{{ pageHeadline }}</h1>
		<div class="lance-section lance-section--join">
			<app-signup
				@signupHandler="signupHandler"
				@swapForm="swapForm"
				v-if="isSignup"></app-signup>
			<app-login 
				@swapFormLogin="swapFormLogin"
				v-if="isLogin"></app-login>
			<app-profile v-if="isProfile"></app-profile>
		</div>
	</section>
</template>

<script>
	import AppSignup from "../components/Signup";
	import AppProfile from "../components/Profile";
	import AppLogin from "../components/Login";

	export default {
		components: {
			AppSignup,
			AppProfile,
			AppLogin
		},
		computed: {
			pageHeadline() {
				return this.isSignup ? this.signupHeadline : this.profileHeadline;
			},
		},
		data() {
			return {
				name: "Join page",
				signupHeadline: "Join us as a freelancer!",
				profileHeadline: "Join us as a freelancer!",
				isSignup: true,
				isProfile: false,
				isLogin: false

			};
		},
		methods: {
			signupHandler(){
				this.isSignup = false;
				this.isProfile = true;
			},
			LoginHandler(){
					this.isSignup = false;
					this.isProfile = true;
					this.isLogin = false;
				
			

			},
			swapForm() {
				this.isLogin = true;
				this.isSignup = false;
				this.isProfile = false;
			},
			swapFormLogin() {
				this.isLogin = false;
				this.isSignup = true;
				this.isProfile = false;
			}
		}
	};
</script>

<style lang="scss">
	@import "../assets/scss/components/form/form";
</style>
