<template>
	<div class="h-full flex content-between flex-wrap">
		<div class="w-full py-4 px-2">
			<div
				v-for="message in messages"
				class="block w-full"
				:class="message.fromUser ? 'flex-row-reverse' : 'self-start'"
			>
				<div class="px-4 py-2 bg-chat m-2 block w-2/3 rounded-full">
					<p class="p-1 text-gray-100">{{ message.text }}</p>
				</div>
			</div>
			<!-- <div class="flex justify-end block w-full">
				<div class="px-4 py-2 bg-chat m-2 block w-2/3 justify-end flex rounded-full">
					<p class="p-1 text-gray-100">Text 2</p>
				</div>
			</div>-->
		</div>
		<form class="block w-full" @submit.prevent="send">
			<div class="flex items-center bg-white p-3 m-4 rounded-full">
				<input
					v-model="message"
					class="resize-none appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-4 leading-tight focus:outline-none text-xl"
					placeholder="Say something"
				/>
				<button
					@click.prevent="send"
					class="flex-shrink-0 bg-blue hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 text-md border-4 text-white py-3 px-4 rounded-full"
					type="button"
				>
					<i class="far fa-paper-plane"></i>
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";

	@Component({})
	export default class Navbar extends Vue {

		message = "";

		messages = [
			{
				text: "Hey! Thanks for coming over here, what's your name?",
				fromUser: false
			}
		];

		send() {

			if (this.message === "") {
				return;
			}

			this.messages.push({ text: this.message, fromUser: true })
			this.message = "";
		}
	}
</script>

<style lang="scss" scoped>
	.bg-chat {
		background-color: azure;
	}
</style>