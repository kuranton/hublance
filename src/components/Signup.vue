<template>
	<form class="form form-join">
		<header class="form__header"><span>Sign up</span></header>
		<div class="form__content">
			<div class="form__row">
				<div class="form__row-item">
					<div class="form__field">
						<label>Name</label>
						<input type="text">
					</div>
				</div>
				<div class="form__row-item">
					<div class="form__field">
						<label>E-mail</label>
						<input type="email">
					</div>
				</div>
			</div>
			<div class="form__row">
				<div class="form__row-item">
					<div class="form__field">
						<label>Password</label>
						<input type="password">
					</div>
				</div>
				<div class="form__row-item">
					<div class="form__field">
						<label>Confirm Password</label>
						<input type="password">
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
			};
		},
		methods: {
			signupHandler(){
				// todo remove later, currently for the demo
				this.$emit('signupHandler');
			}
		}
	};
</script>

<style lang="scss">

</style>
