
<template>
	<g id="Sun" class="select-none highlight-disable" :class="{ 'opacity-0': dark }">
		<circle
			id="second_thunder"
			cx="20.63"
			cy="17.61"
			r="17.61"
			class="cls-13"
			data-name="second thunder"
			opacity=".1"
		></circle>
		<circle
			id="first_thunder"
			cx="20.63"
			cy="17.61"
			r="13.3"
			class="cls-13"
			data-name="first thunder"
			opacity=".2"
		></circle>
		<circle id="sun-core" cx="20.85" cy="18.04" r="8.37" class="cls-13" data-name="sun"></circle>
		<circle
			@click="toggleStatus"
			id="layer_translucent"
			cx="20.85"
			cy="18.04"
			class="cursor-pointer"
			r="8.37"
			fill="url(#Degradado_sin_nombre_14)"
			data-name="layer translucent"
		></circle>
	</g>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";

	@Component
	export default class Sun extends Vue {

		@Prop()
		dark!: boolean;

		get isChatOpen() {
			return this.$store.state.chat.open;
		}

		toggleStatus(event) {
			if (!this.isChatOpen) { this.$store.dispatch("light/toggle", event); }
		}
	}
</script>

