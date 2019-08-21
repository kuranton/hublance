<template>
	<nav class="nav">
		
		<ul class="nav-list">
			<li class="nav-list__item">
				<router-link
					exact
					:to="{name: 'About'}"
				  class="nav-list__link">about</router-link>
			</li>
		</ul>
		
		<p
			@click="logout"
			class="nav__button">{{login_name}}</p>
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				name: "Navbar",
				login_name: ""
			}
		},
		computed: {
			getFullPath () {
			return this.$route.path
				}
		},
		watch: {
			getFullPath () {
				this.getData()
			}
		},	
		created(){
			if(localStorage.getItem("token"))
			{
				this.login_name = "log out";
			}
			else{
				this.login_name = "join";
			}
		},
		methods: {
			logout() {
				if(localStorage.getItem("token"))
				{
					localStorage.removeItem("token");
					this.$router.push({
                    	path: '/login'
					})					
				}					
				else
					this.$router.push({
                    	path: '/join'
                	})
			},
			getData () {
				if(localStorage.getItem("token"))
				{
					this.login_name = "log out";
				}
				else{
					this.login_name = "join";
				}
			}
		}

		
	}
</script>

<style lang="scss">
	@import "../assets/scss/blocks/header/nav";
	@import "../assets/scss/blocks/header/nav-list";
</style>
