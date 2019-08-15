<template>
	<div class="filter-tag">
		<div v-for="(filter, index) of filters" :key="index" class="filter-tag__item">
			<span>{{ filter.value }}</span>
			<div class="filter-tag__close icon--close" @click="filterRemove(index)"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		filters: {
			type: Array,
		},
	},
	data() {
		return {
			name: "FilterTag",
		};
	},
	methods: {
		filterRemove(index) {
			this.$emit("filterRemove", index);
		},
	},
};
</script>

<style lang="scss">

</style>
