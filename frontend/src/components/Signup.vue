<template>
<section class="section">
	<h1 class="headline headline--main">Join us as a freelancer!</h1>
	<div class="lance-section lance-section--join">
	<form class="form form-join" v-on:submit.prevent="signupHandler">
		<header class="form__header"><span>Sign up</span></header>
		<p v-if="checkempty" class="p-validate">All fields are required</p>
		<p v-if="checkpwd" class="p-validate">Check Password</p>
		<p v-if="existUser" class="p-validate">User already exists</p>
		<div class="form__content">
			<div class="form__row">
				<div class="form__row-item">
					<div class="form__field">
						<label>Name</label>
						<input type="text" v-model="user.name">
					</div>
				</div>
				<div class="form__row-item">
					<div class="form__field">
						<label>E-mail</label>
						<input type="email" v-model="user.email">
					</div>
				</div>
			</div>
			<div class="form__row">
				<div class="form__row-item">
					<div class="form__field">
						<label>Password</label>
						<input type="password" v-model="user.password">
					</div>
				</div>
				<div class="form__row-item">
					<div class="form__field">
						<label>Confirm Password</label>
						<input type="password" v-model="user.cpwd">
					</div>
				</div>
			</div>
		</div>
		<div class="form__button-wrapper button-wrapper">
			<button
				class="form__button--submit button button--gradient">Submit</button>
		</div>
		<p class="letter-below-signform"> Already a member, <font color="#4EA7FC" @click="swapForm">click here to login</font></p>

	</form>
	</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				checkempty: false,
				checkpwd: false,
				existUser: false,
				name: "Signup",
				user: {
					name:"",
					email:"",
					password:"",
					cpwd:""
				}
			};
		},
		methods: {
			signupHandler(){
				// todo remove later, currently for the demo

				if((this.user.name == "") || (this.user.email == "") || (this.user.password == ""))
				{
					this.checkempty = true;
				}
				else if(this.user.password != this.user.cpwd)
				{
					this.checkempty = false;
					this.checkpwd = true;
				}
				else 
				{
					this.checkempty = false;
					this.checkpwd = false;
					// this.$emit('signupHandler');
					console.log(this.user.name);
					this.$http.post('http://167.71.250.25:8080/new_user', this.user)
					.then(res => {	
						 this.$router.push({
                    	 path: '/'
                	})				
					})
					.catch((error) => this.handle(error));
				}				
			},
			swapForm() {
				 this.$router.push({
                    path: '/login'
                })
			},
			handle(error) {			 
			
					this.existUser = true;
					
			}	
		}

	};
</script>

<style lang="scss">
	@import "../assets/scss/components/form/form";
</style>