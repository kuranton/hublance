<template>
	<form @submit.prevent class="form form-profile">
		<header class="form__header"><span>Profile</span></header>
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
						<label>Lastname</label>
						<input type="text">
					</div>
				</div>
			</div>
			<div class="form__row">
				<div class="form__row-item">
					<div class="form__field">
						<label>Title</label>
						<input type="text">
						<!-- <div class="form__select">
							<select>
								<option value="Hubspot CMS for Developers">Hubspot CMS for Developers</option>
								<option value="Contextual Marketing">Contextual Marketing</option>
								<option value="Growth-Driven Design Agency">Growth-Driven Design Agency</option>
								<option value="HubSpot Sales Software">HubSpot Sales Software</option>
							</select>
							<i></i>
						</div> -->
					</div>
				</div>
				<div class="form__row-item">
					<div class="form__field">
						<label>Country</label>
						<div class="form__select">
							<select>
								<option value="England">England</option>
								<option value="USA">USA</option>
								<option value="Poland">Poland</option>
								<option value="Germany">Germany</option>
							</select>
							<i></i>
						</div>
					</div>
				</div>
			</div>
			<div class="form__row form__row--small-margin-b">
				<div class="form__row-item">
					<div class="form__field">
						<label>Hourly Rate</label>
						<div class="form__select-set form__select-set--rate">
							<div class="form__select form__select--rate">
								<span>From</span>
								<select>
									<option disabled selected></option>
									<option value="30">$30</option>
									<option value="50">$50</option>
									<option value="75">$75</option>
									<option value="90">$90</option>
								</select>
								<i></i>
							</div>
							<div class="form__select form__select--rate">
								<span>To</span>
								<select>
									<option disabled selected></option>
									<option value="30">$30</option>
									<option value="50">$50</option>
									<option value="75">$75</option>
									<option value="90">$90</option>
								</select>
								<i></i>
							</div>
						</div>
					</div>
				</div>
				<div class="form__row-item">
					<div class="form__field">
						<label>Photo</label>
						<div class="form__photo-upload photo-upload">
							<div class="photo-upload__button">Upload</div>
							<div class="photo-upload__figure"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<header class="form__header form__header--m-b-7 form__header--certificate"><span>Hubspot certifications</span></header>
		<div class="form__content">
			<div class="form__row form__row--m-b-30">
				<div class="form__row-item">
					<div class="form__field form__field--t-center">
						<input type="text" value="You don't have a certification yet" disabled>
					</div>
				</div>
			</div>
			<div
				:class="isCertificateAdding ? 'adding' : ''"
				class="form__button-wrapper--certificate button-wrapper">
				<button
					@click="certificateAdd"
					class="form__button--submit button button--gradient">Add</button>
			</div>
		</div>
		<header
			v-if="isCertificateAdding"
			class="form__header form__header--m-b-7 form__header--certificate"><span>New certification</span></header>
		<div
			v-if="isCertificateAdding"
			class="form__content">
			<div class="form__row">
					<div class="form__field form_fullwidth">
						<label>Embed code</label>
						<textarea placeholder="Paste code here..."></textarea>
					</div>

			</div>

			<div class="button-wrapper form__button-wrapper--certificate-new">
				<button
					@click="certificateCancel"
					class="button button--empty form__button--profile">Close</button>
				<button
					@click="certificateSave"
					class="form__button--submit button button--gradient form__button--profile">Save</button>
			</div>
		</div>
		<footer class="form__footer">
			<p>Your profile will be posted 48 hours pending approval.</p>
			<div class="button-wrapper form__button-wrapper--profile">
				<button class="button button--empty form__button--profile">Cancel</button>
				<button class="form__button--submit button button--gradient form__button--profile">Save all</button>
			</div>
		</footer>
	</form>
</template>

<script>
	export default {
		data() {
			return {
				name: "Profile",
				isCertificateAdding: false
			};
		},
		methods: {
			certificateAdd(){
				this.isCertificateAdding = true;
			},
			certificateSave(){
				this.isCertificateAdding = false;
			},
			certificateCancel(){
				this.isCertificateAdding = false;
			}
		}
	};
</script>

<style lang="scss">
@import "../assets/scss/components/form/photo-upload";
</style>
