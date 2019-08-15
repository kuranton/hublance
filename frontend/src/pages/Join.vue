<template>
	<section class="section">
		<h1 class="headline headline--main">{{ pageHeadline }}</h1>
		<div class="lance-section lance-section--join">
			<app-signup
				@signupHandler="signupHandler"
				v-if="isSignup"></app-signup>
			<app-profile v-if="isProfile"></app-profile>
		</div>
	</section>
</template>

<script>
	import AppSignup from "../components/Signup";
	import AppProfile from "../components/Profile";
	
	export default {
		components: {
			AppSignup,
			AppProfile
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
				isProfile: false
			};
		},
		methods: {
			signupHandler(){
				this.isSignup = false;
				this.isProfile = true;
			}
		}
	};
</script>

<style lang="scss">
	@import "../assets/scss/components/form/form";
</style>
