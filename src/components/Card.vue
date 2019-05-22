<template>
	<div class="w-100">
		<h1 class="card-title text-center sm:text-left" v-bind:class="{ 'text-white': dark }">{{ title }}</h1>
		<p v-if="!el.is.small" class="ml-1 card-body">{{ body }}</p>
		<div class="mt-6 text-center sm:text-left">
			<button
				v-if="button"
				@click="el.is.small ? toggleShow() : button.callback()"
				class="base-btn focus:outline-none w-full sm:w-auto sm:mr-3 mb-3 sm:mb-0"
			>{{ button.name }}</button>
			<p v-if="show && el.is.small" class="card-body text-justify mt-2">{{ body }}</p>
			<div :v-if="social" class="w-full my-5 sm:inline">
				<a
					class="card-icon cursor-pointer text-blue-lighter hover:text-blue"
					v-for="icon in social"
					@click="icon.callback ? icon.callback() : null"
					:href="icon.url"
					target="_blank"
				>
					<v-icon class="align-middle mx-4 sm:mx-2" :scale="el.is.small ? 1.8 : 1.2" :name="icon.key"/>
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

	import { Component, Prop, Vue, Emit } from "vue-property-decorator";
	import { ResponsiveMixin, ResponsiveElement } from "vue-responsive-components";
	import { ButtonOptions } from '@/types/button-options.type';
	import { SocialOptions } from '@/types/social-options.type';

	@Component({ mixins: [ResponsiveMixin] })
	export default class Card extends Vue {

		@Prop() title!: string;
		@Prop() body!: string;
		@Prop() button!: ButtonOptions;
		@Prop() social!: SocialOptions[];

		show = false;
		el!: ResponsiveElement;

		get dark(): boolean {
			return this.$store.state.light.status;
		}

		private breakpoints = {
			small: (el: any) => window.innerWidth <= 576
		};

		toggleShow() {
			this.show = !this.show;
		}

	}
</script>

<style lang="scss" scoped>
	.base-btn {
		@apply bg-blue text-white text-lg py-3 px-6 rounded-full;

		box-shadow: 0 10px 25px rgba(0, 0, 0, 0);
		background: linear-gradient(90deg, #009cf5 10%, #3231f9 120%);

		&:hover {
			box-shadow: 0 5px 20px #4a90e2;
			transform: scale(1.05);
		}

		transition: box-shadow 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
			transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.card-title {
		@apply mb-5 font-bold;

		transition: color 2s;
	}

	.card-body {
		@apply text-lg leading-normal text-blue-light;
		word-spacing: 7px;
	}

	.card-icon {
		font-size: 18px;
		color: #c7d6dc;
		transition: color 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.inner-body {
		transition: opacity 2.5s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
</style>