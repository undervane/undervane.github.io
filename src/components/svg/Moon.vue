<template>
	<g
		class="moon highlight-disable"
		:style="`transform: rotate(${ !dark ? '0deg' : '360deg' })`"
		:class="{ 'opacity-0': !dark }"
	>
		<path
			opacity="1"
			d="M21.08,18.2A8.36,8.36,0,0,1,25.15,11a8.37,8.37,0,1,0,0,14.35A8.36,8.36,0,0,1,21.08,18.2Z"
			fill="#ffc312"
		></path>
		<path
			id="moon"
			fill="url(#Degradado_sin_nombre_14)"
			d="M21.08 18.2a8.36 8.36 0 0 1 4.07-7.2 8.37 8.37 0 1 0 0 14.35 8.36 8.36 0 0 1-4.07-7.15z"
		/>
	</g>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator";

	@Component
	export default class Card extends Vue {

		@Prop()
		dark!: boolean;

	}
</script>

<style lang="scss" scoped>
	.moon {
		@apply select-none cursor-pointer;

		transform-origin: 20.63px 17.61px;
		transition-delay: 50ms;
		transition: transform 1s cubic-bezier(0.64, -0.5, 0.26, 1.29);
	}
</style>
