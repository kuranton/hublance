<template>
	<div class="lance-list">
		<h1 class="headline headline--main">{{ pageHeadline }}</h1>
		<section class="lance lance-section">
			<div class="lance-filter">
				<span v-if="!filterSelected.length">Filters:</span>

				<filter-tag
					:filters="filterSelected"
					@filterRemove="filterRemove"
				></filter-tag>

				<div class="lance-filter__button" @click="filterChosenToggle"></div>
			</div>

			<div v-if="isFilterChosen" class="filter-chosen">
				<span v-if="!filterSelected.length">Filters:</span>
				<div class="filter-chosen__fake-filter">
					<filter-tag
						:filters="filterSelected"
					></filter-tag>
				</div>
				<div class="filter-chosen__area">
					<div
						v-if="isFilterTypeChosen"
						class="filter-category filter-chosen__item"
					>
						<div
							class="filter-category__item icon--caret-right-after"
							@click="chooseCertificate"
						>
							Certifications
						</div>
						<div
							@click="chooseCountry"
							class="filter-category__item icon--caret-right-after"
						>
							Country
						</div>
						<div
							@click="chooseRate"
							class="filter-category__item icon--caret-right-after"
						>
							Hourly Rate
						</div>
					</div>
					
					<div v-show="isCertificateChoose" class="filter filter-chosen__item">
						<div class="filter-search">
							<label class="icon--search"
							><input ref="searchCertInput" v-model="certInput" type="text" placeholder="Search"
							/></label>
						</div>
						<div v-bar>
							<div class="filter-list filter-list--countries">
								<div
									class="filter-list__item"
									v-for="(cert, index) of filteredCertificates"
									:key="index"
								>
									<div class="checkbox">
										<label>
											<input
												type="checkbox"
												v-model="certFilter"
												:value="cert.value"
											/>
											<span>{{ cert.value }}</span>
										</label>
									</div>
								</div>
								<div v-if="!filteredCertificates.length" class="filter-list__item filter-list__item--empty">Nothing found..</div>
							</div>
						</div>
						<div class="button-wrapper filter-chosen__button-wrapper">
							<div @click="certFilterCancel" class="button button--empty filter-chosen__button">
								Cancel
							</div>
							<div @click="certFilterSave" class="button button--gradient filter-chosen__button">
								Save
							</div>
						</div>
					</div>

					<div v-show="isCountryChoose" class="filter filter-chosen__item">
						<div class="filter-search">
							<label class="icon--search"
								><input ref="searchInput" v-model="countryInput" type="text" placeholder="Search"
							/></label>
						</div>
						<div v-bar>
							<div class="filter-list filter-list--countries">
								<div
									class="filter-list__item"
									v-for="(country, index) of filteredCountry"
									:key="index"
								>
									<div class="checkbox">
										<label>
											<input
												type="checkbox"
												name="country"
												v-model="countryFilter"
												:value="country"
											/>
											<span>{{ country }}</span>
										</label>
									</div>
								</div>
								<div v-if="!filteredCountry.length" class="filter-list__item filter-list__item--empty">Nothing found..</div>
							</div>
						</div>
						<div class="button-wrapper filter-chosen__button-wrapper">
							<div @click="countryFilterCancel" class="button button--empty filter-chosen__button">
								Cancel
							</div>
							<div @click="countryFilterSave" class="button button--gradient filter-chosen__button">
								Save
							</div>
						</div>
					</div>

					<div v-if="isRateChoose" class="filter filter-chosen__item">
						<div class="filter-list filter-list--rates">
							<div
								class="filter-list__item"
								v-for="(rate, index) in rates"
								:key="index"
							>
								<div class="radio">
									<label>
										<input
											v-model="rateFilter"
											@change="rateFilterHandler"
											:value="{lowRate: rate.lowRate, highRate: rate.highRate}"
											type="radio"
											name="rate"/>
										<span>{{ showRate(rate.lowRate, rate.highRate) }}</span>
									</label>
								</div>
							</div>
							<div class="input-range filter__input-range">
								<div class="input-range__item">
									<label>
										<span class="input-range__label"><span>From</span></span>
										<input v-model="rateLowInput" @keypress="isNumber($event)" type="text" />
									</label>
								</div>
								<div class="input-range__item">
									<label>
										<span class="input-range__label"><span>To</span></span>
										<input v-model="rateHighInput" @keypress="isNumber($event)" type="text" />
									</label>
								</div>
							</div>
						</div>
						<div class="button-wrapper filter-chosen__button-wrapper">
							<div @click="rateFilterCancel" class="button button--empty filter-chosen__button">
								Cancel
							</div>
							<div @click="rateFilterSave" class="button button--gradient filter-chosen__button">
								Save
							</div>
						</div>
					</div>
				</div>
			</div>

			<header class="lance-header lance-grid">
				<div class="lance-header__item lance-grid__item">Photo</div>
				<div class="lance-header__item lance-grid__item">Title</div>
				<div class="lance-header__item lance-grid__item">Name</div>
				<div class="lance-header__item lance-grid__item">Hourly rate</div>
				<div class="lance-header__item lance-grid__item">Country</div>
			</header>
			
			<div v-bar ref="list">
				<div class="list">
					<div v-if="isFreelancersLoading" class="list-loading icon--spinner2"></div>
					<div
						v-for="freelancer of filteredFreelancers"
						:key="freelancer.id"
						class="list-item"
					>
						<div class="list-item__info lance-grid">
							<figure class="list-item__figure lance-grid__item">
								<img :src="freelancer.avatar" alt=""/>
							</figure>
							<div class="list-item__title lance-grid__item">
								{{ freelancer.line }}
							</div>
							<div class="list-item__text lance-grid__item">
								{{ freelancer.name }}
							</div>
							<div class="list-item__text lance-grid__item">
								${{ freelancer.rate }}
							</div>
							<div class="list-item__text lance-grid__item">
								{{ freelancer.country }}
							</div>
							<div @click="expandInfo(freelancer.id)" class="list-item__opener"></div>
						</div>
						<div v-if="freelancer.expanded" class="list-item__details lance-grid">
							<div class="list-item__row row">
								<div class="list-item__text row__item">About:</div>
								<div class="list-item__about row__item">
									{{ freelancer.about }}
								</div>
							</div>
							<div class="list-item__row row">
								<div class="list-item__text row__item row__item--centered">
									Certifications (4/6):
								</div>
								<div class="row__item">
									<agile
										:dots="false"
										:slides-to-show="4"
										:slides-to-scroll="1"
										class="cert">
										<div
											class="cert-item"
											v-for="(cert, index) of freelancer.certificates"
											:key="index"
										>
											<img :src="cert.img" alt=""/>
										</div>
									</agile>
									<div class="cert-arrow"></div>
								</div>
							</div>
							<div class="list-item__row row">
								<div class="list-item__text row__item">Contact:</div>
								<div class="list-item__about row__item">
									<a href="mailto:email@gmail.com">email@gmail.com</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import filterTag from "../components/list/FilterTag";

export default {
	components: {
		filterTag,
	},
	computed: {
		
		filteredCountry() {
			return this.countries.filter(country => {
				return country.toLowerCase().includes(this.countryInput.toLowerCase());
			});
		},
		filteredCertificates(){
			return this.certificates.filter(cert => {
				return cert.value.toLowerCase().includes(this.certInput.toLowerCase());
			});
		},
		lowRate(){
			return this.rateFilter.lowRate ? this.rateFilter.lowRate : this.rateLowInput
		},
		highRate(){
			return this.rateFilter.highRate ? this.rateFilter.highRate : this.rateHighInput
		},
		filteredFreelancers(){
			return this.freelancers.filter( freelancer => {
				return (
					(this.countryFilterSelected.length ? this.compareCountryWithFilter(freelancer.country, this.countryFilterSelected) : true)
					&& parseInt(freelancer.rate) >= parseInt(this.rateLowSelected ? this.rateLowSelected : 0)
					&& parseInt(freelancer.rate) <= parseInt(this.rateHighSelected ? this.rateHighSelected : 1000)
					&& (this.certFilterSelected.length ? this.compareCertWithFilter(freelancer.certificates, this.certFilterSelected) : true)
				)
			});
		}
	},
	data() {
		return {
			isFreelancersLoading: true,
			isFilterChosen: false,
			isFilterTypeChosen: true,
			isCertificateChoose: false,
			isCountryChoose: false,
			isRateChoose: false,
			filterSelected: [],
			countryFilter: [],
			countryFilterSelected: [],
			countryInput: "",
			freelancers: [],
			pageHeadline: "Find the best HubSpot freelancer",
			countries: [
				"England",
				"USA",
				"Poland",
				"Germany",
				"China",
				"Spain",
				"Russia",
			],
			rates: [
				{
					highRate: 30,
				},
				{
					lowRate: 30,
					highRate: 50,
				},
				{
					lowRate: 50,
					highRate: 75,
				},
				{
					lowRate: 75,
					highRate: 100,
				},
				{
					lowRate: 100,
				},
			],
			rateLowInput: "",
			rateHighInput: "",
			rateFilter: {},
			rateLowSelected: "",
			rateHighSelected: "",
			ratePreviousFrom: "",
			certificates: [
				{
					value: "Hubspot CMS for Developers",
				},
				{
					value: "Contextual Marketing",
				},
				{
					value: "Growth-Driven Design Agency",
				},
				{
					value: "HubSpot Sales Software",
				},
				{
					value: "Content Marketing",
				},
				{
					value: "Growth-Driven Design",
				},
				{
					value: "Web Developer",
				},
				{
					value: "Designer",
				}
			],
			certInput: "",
			certFilter: [],
			certFilterSelected: []
		};
	},
	created(){

		// http://localhost:3000/freelancers
		// this.$http.get(`${variables['BASE_URL']}/get_freelancer`)
			this.$http.get('http://167.71.250.25:8080/get_freelancers')

			.then( res => {
					this.freelancers = res.data['freelancerList'];
												console.log(this.freelancers);
					for( var j = 0; j < this.freelancers.length; j++)
					{
						this.freelancers[j]['certificates'] = [];
					}

					this.$http.get('http://167.71.250.25:8080/get_freelancerCertificates')
					.then( certRes => {
						this.isFreelancersLoading = false;
						for(var i = 0; i < certRes.data['certificatesList'].length; i++)
						{
							var cData = certRes.data['certificatesList'];
							var freelancer_id = cData[i]['freelancer']-1;
							var obj = {
								img: cData[i]['img'],
								value: cData[i]['value']
							}
							 this.freelancers[freelancer_id]['certificates'].push(obj);
						}
													console.log(this.freelancers);

						setTimeout( () => {this.$vuebar.refreshScrollbar(this.$refs.list, {})},10);
					})
				setTimeout( () => {this.$vuebar.refreshScrollbar(this.$refs.list, {})},10);
			})
			.catch( err => {
				console.log(err);
			});
	},
	methods: {
		compareCertWithFilter(freelancerCerts, filterCerts) {

			let freelancerCertsValues = [];
			// take out all freelancer certificates into separated array
			for( let i = 0; i < freelancerCerts.length; i++){
				freelancerCertsValues.push(freelancerCerts[i].value);
			}
			// filter chosen certificates` filters by freelancer certs which is lack on freelancer
			// meaning if a freelancer don't have certificate chosen by filter remove this freelancer from the list
			let filtered = filterCerts.filter( cert => {
				return !freelancerCertsValues.includes(cert)
			});
			return filtered.length <= 0;
			
		},
		compareCountryWithFilter(freelancerCountry, filterCountry) {
			let freelancerCountryValues = [];
			// take out all freelancer country into separated array
			freelancerCountryValues.push(freelancerCountry);
		
			// filter chosen certificates` filters by freelancer certs which is lack on freelancer
			// meaning if a freelancer don't have certificate chosen by filter remove this freelancer from the list
			let index = !filterCountry.includes(freelancerCountry);
			return index == 0;
			
		},
		filterRemove(index){
			//remove chosen country filter
			if( this.filterSelected[index].type === 'country'){
				// get index of country filter in countryFilter array
				let countryFilterIndex = this.countryFilterSelected.findIndex( filter => {
					return filter === this.filterSelected[index].value
				});
				// remove filter from country filter array
				this.countryFilterSelected.splice(countryFilterIndex, 1);
			} else if ( this.filterSelected[index].type === 'rate'){
				// clear rate inputs "from - to"
				this.rateHighInput = "";
				this.rateLowInput = "";
				this.rateFilter = {};
				// clear current rate's filter value
				this.rateLowSelected = "";
				this.rateHighSelected = "";
			} else if ( this.filterSelected[index].type === 'cert'){
				// get index of cert filter in certFilter array
				let certFilterIndex = this.certFilterSelected.findIndex( filter => {
					return filter === this.filterSelected[index].value
				});
				// remove filter from cert filter array
				this.certFilterSelected.splice(certFilterIndex, 1);
			}
			this.filterSelected.splice(index, 1);
			// manually updating scrollbar status
			setTimeout( () => {this.$vuebar.refreshScrollbar(this.$refs.list, {})},10);
		},
		filterChosenToggle() {
			// toggle UI of chosen filter type
			this.isFilterChosen = !this.isFilterChosen;
			this.filtersReset();
		},
		showRate(lowRate, highRate) {
			if (lowRate && highRate) {
				return `${lowRate}$ - ${highRate}$`;
			} else if (!lowRate && highRate) {
				return `Below ${highRate}$`;
			} else if (lowRate && !highRate) {
				return `Above ${lowRate}$`;
			}
		},
		chooseCertificate() {
			this.isCertificateChoose = true;
			this.isFilterTypeChosen = false;
			this.$nextTick(function() {
				this.$refs.searchCertInput.focus();
			});
		},
		chooseCountry() {
			this.isCountryChoose = true;
			this.isFilterTypeChosen = false;
			this.$nextTick(function() {
				this.$refs.searchInput.focus();
			});
		},
		countryFilterCancel(){
			// clear country input value
			this.countryInput = "";
			// reset to previous value
			this.countryFilter = this.countryFilterSelected;
			// close filters choosing UI
			this.filtersReset();
			this.isFilterChosen = false;
			this.isFilterTypeChosen = false;
		},
		countryFilterSave(){

			// clear cert searc input value
			this.countryInput = "";
			// remove all current filters type "cert"
			this.filterSelected = this.filterSelected.filter( filter => {
				return filter.type !== "country"
			});
			// add chosen cert filter into common filters array
			for( let countryFilter of this.countryFilter){
				this.filterSelected.push({ type: "country", value: countryFilter})
			}
			// apply selected filter
			this.countryFilterSelected = this.countryFilter;
			// close filters choosing UI
			this.filtersReset();
			this.isFilterChosen = false;
			this.isFilterTypeChosen = false;

			// let filterOption = Object.assign({}, {type: 'country', value: this.countryFilter});
			// // clear country input value
			// this.countryInput = "";
			// // check if current filter already presist
			// let filterExistingIndex = this.filterSelected.findIndex( (filter) => {
			// 	return filter.type === "country";
			// });
			// if( filterExistingIndex !== -1){
			// 	this.filterSelected.splice(filterExistingIndex, 1);
			// }
			// // deliver chosen filter to tag component
			// this.filterSelected.push(filterOption);
			// // close filters choosing UI
			// this.filtersReset();
			// this.isFilterChosen = false;
			// this.isFilterTypeChosen = false;
			
			// this.countryFilterSelected = this.countryFilter;
		},
		rateFilterCancel(){
			// reset to previous value
			if( this.ratePreviousFrom === "radio" ){
				// get it from radio
				this.rateFilter.highRate = this.rateHighSelected;
				this.rateFilter.lowRate = this.rateLowSelected;
				// clear rate input value
				this.rateLowInput = "";
				this.rateHighInput = "";
			} else if (this.ratePreviousFrom === "text") {
				// get it from input fields
				this.rateFilter = {};
				this.rateHighInput = this.rateHighSelected;
				this.rateLowInput = this.rateLowSelected;
			} else {
				// clear all rates inputs
				this.rateFilter = {};
				this.rateLowInput = "";
				this.rateHighInput = "";
			}
			// close filters choosing UI
			this.filtersReset();
			this.isFilterChosen = false;
			this.isFilterTypeChosen = false;
		},
		rateFilterSave(){
			let filterOption = Object.assign({}, {type: 'rate', value: this.showRate(this.lowRate, this.highRate), lowRate: this.lowRate, highRate: this.highRate});
			let filterExistingIndex = this.filterSelected.findIndex( (filter) => {
				return filter.type === "rate";
			});
			if( filterExistingIndex !== -1){
				this.filterSelected.splice(filterExistingIndex, 1);
			}
			// deliver chosen filter to tag component
			this.filterSelected.push(filterOption);
			// close filters choosing UI
			this.filtersReset();
			this.isFilterChosen = false;
			this.isFilterTypeChosen = false;
			// save status of where user has input rate value ( radio || input)
			this.ratePreviousFrom = this.rateLowInput || this.rateHighInput ? "text" : "radio";
			this.rateLowSelected = this.lowRate;
			this.rateHighSelected = this.highRate;
		},
		rateFilterHandler(){
			this.rateLowInput = "";
			this.rateHighInput = "";
		},
		chooseRate() {
			this.isRateChoose = true;
			this.isFilterTypeChosen = false;
		},
		filtersReset() {
			this.isCertificateChoose = false;
			this.isCountryChoose = false;
			this.isRateChoose = false;
			this.isFilterTypeChosen = true;
		},
		expandInfo(id) {
			// get index of freelancer
			let freelancerIndex = this.freelancers.findIndex( freelancer => {
				return freelancer.id === id;
			});
			// toggle expanded
			this.freelancers[freelancerIndex].expanded = !this.freelancers[freelancerIndex].expanded;
		},
		isNumber: function(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
				evt.preventDefault();
			} else {
				this.rateFilter = {};
				return true;
			}
		},
		certFilterCancel(){
			// clear cert searc input value
			this.certInput = "";
			// reset filters to previous state
			this.certFilter = this.certFilterSelected;
			// close filters choosing UI
			this.filtersReset();
			this.isFilterChosen = false;
			this.isFilterTypeChosen = false;
		},
		certFilterSave(){
			// clear cert searc input value
			this.certInput = "";
			// remove all current filters type "cert"
			this.filterSelected = this.filterSelected.filter( filter => {
				return filter.type !== "cert"
			});
			// add chosen cert filter into common filters array
			for( let certFilter of this.certFilter){
				this.filterSelected.push({ type: "cert", value: certFilter})
			}
			// apply selected filter
			this.certFilterSelected = this.certFilter;
			// close filters choosing UI
			this.filtersReset();
			this.isFilterChosen = false;
			this.isFilterTypeChosen = false;
		}
	},
};
</script>

<style lang="scss"></style>
