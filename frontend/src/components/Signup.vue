<template>
	<form class="form form-join">
		<header class="form__header"><span>Sign up</span></header>
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
				@click="signupHandler"
				class="form__button--submit button button--gradient">Submit</button>
		</div>
	</form>
</template>

<script>
	export default {
		data() {
			return {
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
				 this.$emit('signupHandler');
				console.log(this.user.name);
				this.$http.post('http://localhost:8080/new_user', this.user)
				.then(function(data) {
					
				})


			}
		}
	};
</script>

<style lang="scss">

</style>
