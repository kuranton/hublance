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
		
		<router-link
			exact
			:to="{name: 'Join'}"
			class="nav__button">join</router-link>
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				name: "Navbar"
			}
		}
		
	}
</script>

<style lang="scss">
	@import "../assets/scss/blocks/header/nav";
	@import "../assets/scss/blocks/header/nav-list";
</style>
