<template>
<section class="section">
	<h1 class="headline headline--main">Join us as a freelancer!</h1>
 	<div class="lance-section lance-section--join">
	<form class="form form-join" v-on:submit.prevent="LoginHandler">
		<header class="form__header"><span>Login</span></header>
		<p v-if="checkempty" class="p-validate">Input Email and Password</p>
		<p v-if="invalidc" class="p-validate">Invalid Email and Password</p>
		<div class="form__content">
			<div class="form__row">
					<div class="form__field form_fullwidth">
						<label>Email</label>
						<input type="text" v-model="user.email">
					</div>
			</div>
			<div class="form__row">
					<div class="form__field form_fullwidth">
						<label>Password</label>
						<input type="password" v-model="user.password">
					</div>
			</div>
		</div>
		<div class="form__button-wrapper button-wrapper">
			<button				
				class="form__button--submit button button--gradient">Submit</button>
		</div>
        <p class="letter-below-signform"> Not a member yet, <font color="#4EA7FC" @click="swapFormLogin">click here to join</font></p>

	</form>
	</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				checkempty: false,
				invalidc: false,
				name: "Login",
				user: {
					email:"",					
					password:""
				},				
			};
		},
		methods: {
			LoginHandler(){
                if((this.user.email == "") || (this.user.password == ""))
                {
                    this.checkempty = true;
				}
				else {
					this.checkempty = false;
					console.log(this.user.name);
					this.$http.post('http://167.71.250.25:8080/log_in', this.user)
					.then((res) => {
						console.log(res);
							localStorage.setItem('token', res.data['token']);
							this.invalidc = false;
							this.$router.push({
								path: '/'
							})
							//  let redirect = decodeURIComponent(this.$route.query.redirect || '/');
							//     this.$router.push({
							//         path: redirectd
							//     })

						//  this.$emit('LoginHandler');                 
						
			
					},()=>{
						this.invalidc = true;
					})
				}
            },
            swapFormLogin() {
				 this.$router.push({
                    path: '/join'
                })
            }
		}
	};
</script>

<style lang="scss">
	@import "../assets/scss/components/form/form";
</style>