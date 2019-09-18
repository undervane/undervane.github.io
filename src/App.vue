<template>
	<div class="relative overflow-x-hidden">
		<div class="chat" :class="{'pointer-events-none md:pointer-events-auto': !isChatOpen}">
			<Chatbox />
		</div>

		<Landing :class="{'isChatOpen': isChatOpen}" />
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import Landing from '@/pages/Landing.vue';
	import Chatbox from '@/components/Chatbox.vue';

	@Component({
		components: {
			Landing,
			Chatbox
		}
	})
	export default class App extends Vue {

		get isChatOpen() {
			return this.$store.state.chat.open;
		}

		created() {
			this.$store.dispatch('light/calculate');
		}
	}
</script>

<style lang="scss" scoped>
	.isChatOpen {
		transform: translateX(100vw);
		height: 100vh;
		@apply pointer-events-none;
	}

	.chat {
		position: fixed;
		width: 100vw;
		background: #2756f8;
		min-height: 100vh;
		height: 100%;
	}

	@screen md {
		.isChatOpen {
			transform: translateX(350px);
			height: inherit;
			@apply pointer-events-auto;
		}
		.chat {
			width: 350px;
		}
	}
</style>
