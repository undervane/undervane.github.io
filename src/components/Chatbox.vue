<template>
	<div class="h-full flex content-between flex-wrap">
		<div class="w-full py-4 px-2">
			<div
				v-for="message in messages"
				class="block w-full"
				:class="message.fromUser ? 'flex-row-reverse' : 'self-start'"
			>
				<div v-if="!isEmoji(message.text, 3)" class="px-4 py-2 bg-chat m-2 block w-2/3 rounded-full">
					<p class="p-1 text-gray-100">{{ message.text }}</p>
				</div>

				<p v-else class="p-1 m-1 text-5xl">{{ message.text }}</p>
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

	@Component({
	})
	export default class Navbar extends Vue {

		message = "";

		messages = [
			{
				text: "Hey! Thanks for coming over here, what's your name?",
				fromUser: false
			},
			{
				text: '😊'
			}
		];

		send() {

			if (this.message === "") {
				return;
			}

			this.messages.push({ text: this.message, fromUser: true })
			this.message = "";
		}

		isEmoji(value: string, max = 3) {
			// eslint-disable-next-line
			const match = value.match(/^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]){1,3}$/g);
			return match;
		}
	}
</script>

<style lang="scss" scoped>
	.bg-chat {
		background-color: azure;
	}
</style>