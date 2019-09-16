<template>
	<section class="landing" :class="{'dark': darkMode}">
		<Ripple class="ripple min-w-screen min-h-screen" />
		<Iceberg class="iceberg" />
		<Card class="card" :title="data.title" :body="data.body" :button="button" :social="social" />
	</section>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from "vue-property-decorator";
	import StaticData from "@/assets/data";
	import Card from "@/components/Card.vue";
	import Iceberg from "@/components/svg/Iceberg.vue";
	import Ripple from "@/components/Ripple.vue";

	import message from 'ant-design-vue/lib/message';
	import 'ant-design-vue/lib/message/style/css';

	import 'vue-awesome/icons/brands/twitter';
	import 'vue-awesome/icons/brands/linkedin';
	import 'vue-awesome/icons/brands/github';
	import 'vue-awesome/icons/envelope';

	@Component({
		components: {
			Card,
			Iceberg,
			Ripple,
		}
	})
	export default class Landing extends Vue {

		data = StaticData;
		darkMode = false;

		activeButtonMessage = false;
		activeEmailMessage = false;

		button = {
			name: this.isChatOpen ? 'Close' : 'Say hello 👋',
			callback: this.toggleChat
		};

		get status() {
			return this.$store.state.light.status;
		}

		get isChatOpen() {
			return this.$store.state.chat.open;
		}

		social = [
			{
				key: 'brands/twitter',
				url: 'https://twitter.com/undervane'
			},
			{
				key: 'brands/linkedin',
				url: 'https://www.linkedin.com/in/undervane/'
			},
			{
				key: 'brands/github',
				url: 'https://github.com/undervane'
			},
			{
				key: 'envelope',
				callback: this.copyEmail,
			},
		];

		@Watch("status")
		toggleStatus(): void {
			this.darkMode = !this.darkMode;
		}

		@Watch("isChatOpen")
		onChatToggle(): void {
			this.button = {
				name: this.isChatOpen ? 'Hide chat' : 'Say hello 👋',
				callback: this.toggleChat
			};

		}

		copyEmail() {

			if (this.activeEmailMessage) { return; }

			const clipboard = navigator.clipboard;

			if (clipboard) {
				clipboard.writeText('sergio@mipigu.com');
				message.success('Email has been copied to your clipboard',
					5, () => this.activeEmailMessage = false);
			} else {
				message.warning(
					`Could not copy email to your clipboard,
				 	 so here you have it: sergio@mipigu.com`,
					20, () => this.activeEmailMessage = false);
			}

			this.activeEmailMessage = true;
		}

		toggleChat() {
			this.$store.dispatch('chat/toggleChat');
		}

		showMessage() {

			if (this.activeButtonMessage) { return; }

			message.warn(`Still thinking about what this big blue
			 button can do, any recomendations? 😜`,
				8, () => this.activeButtonMessage = false);

			this.activeButtonMessage = true;
		}
	}
</script>

<style lang="scss" scoped>
	.landing {
		justify-content: space-evenly;
		align-items: center;
		align-content: center;
		overflow: hidden;
		background-color: white;
		transition: background-color 3s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);

		@apply relative justify-around flex min-h-screen flex-wrap items-center flex-row-reverse w-full max-w-full;
	}

	.card {
		z-index: 1;
		max-width: 33em;
		@apply h-full w-full px-6 select-none mb-3;
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


