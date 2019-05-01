<template>
	<svg class="h-full w-full min-h-screen">
		<circle
			class="ripple"
			:class="{'fill-white': !status}"
			:cx="position.x"
			:cy="position.y"
			:r="ripple.radius"
		></circle>
	</svg>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from "vue-property-decorator";
	import anime from "animejs";

	@Component
	export default class Card extends Vue {

		ripple = { radius: 0 };

		get status() {
			return this.$store.state.light.status;
		}

		get position() {
			return this.$store.state.light.lastPosition;
		}

		private animation!: anime.AnimeInstance;

		@Watch("status")
		toggleStatus(): void {
			this.animation ? this.animation.restart() : this.playAnimation();
		}

		private playAnimation(): void {
			const html = document.getElementsByTagName("html")[0];
			const rippleSize = html.clientWidth < html.clientHeight
				? html.clientHeight * 2
				: html.clientWidth * 2;

			this.animation = anime({
				targets: this.ripple,
				duration: 2000,
				radius: rippleSize,
				easing: 'cubicBezier(.5,0,.5,1)'
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/global.scss";

	.ripple {
		fill: $dark;
		z-index: -1;
	}

	.fill-white {
		fill: white !important;
	}
</style>

