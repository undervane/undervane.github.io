<template>
	<div class="relative overflow-x-hidden">
		<div class="chat">
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
	}

	.chat {
		position: fixed;
		width: 100vw;
		background: linear-gradient(90deg, #009cf5 -30%, #3231f9 100%);
		min-height: 100vh;
		height: 100%;
	}

	@screen md {
		.isChatOpen {
			transform: translateX(350px);
		}
		.chat {
			width: 350px;
		}
	}
</style>
