<template>
	<main class="landing">
		<Ripple class="ripple min-w-screen min-h-screen"/>
		<Iceberg class="iceberg"/>
		<Card class="card" :title="data.title" :body="data.body" :button="button" :social="social"/>
	</main>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import StaticData from "@/assets/data";
	import Card from "@/components/Card.vue";
	import Iceberg from "@/components/svg/Iceberg.vue";
	import Ripple from "@/components/Ripple.vue";
	import { message } from 'ant-design-vue';

	@Component({
		components: {
			Card,
			Iceberg,
			Ripple
		}
	})
	export default class Landing extends Vue {

		data = StaticData;

		button = {
			name: 'About me',
			callback: callbackFunction
		};

		social = [
			{
				key: 'brands/twitter',
				callback: callbackFunction,
				url: 'https://twitter.com/undervane'
			},
			{
				key: 'brands/linkedin',
				callback: callbackFunction,
				url: 'https://www.linkedin.com/in/undervane/'
			},
			{
				key: 'brands/github',
				callback: callbackFunction,
				url: 'https://github.com/undervane'
			},
			{
				key: 'envelope',
				callback: callbackFunction,
			},
		];

	}

	const callbackFunction = () => {
		message.success('Email copied to clipboard');
	};
</script>

<style lang="scss" scoped>
	.landing {
		justify-content: space-evenly;
		align-items: center;
		align-content: center;
		overflow: hidden;

		@apply relative justify-around flex min-h-screen flex-wrap items-center flex-row-reverse w-full max-w-full;
	}

	.card {
		z-index: 1;
		max-width: 29em;
		@apply h-full w-full px-6 select-none my-5;
	}

	.iceberg {
		z-index: 1;

		@apply h-full w-full max-w-md px-5 py-5;

		@media only screen and (min-width: 1216px) {
			transform: scale(1.2) translateX(30px) translateY(30px);
		}
	}

	.ripple {
		@apply absolute pin-l pin-t w-full h-full;
	}
</style>

<style>
	.ant-message {
		top: unset !important;
		bottom: 16px !important;
	}
</style>


