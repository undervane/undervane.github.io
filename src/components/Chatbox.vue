<template>
	<div class="h-screen relative">
		<div class="md:hidden absolute w-full flex justify-end z-10">
			<button @click="closeChat" class="m-2" style="color: #c47b1a">
				<v-icon scale="1.3" name="arrow-right" class="h-full" />
			</button>
		</div>
		<div class="h-screen flex flex-col justify-between">
			<div
				v-lockToBottom
				id="scroller"
				class="flex-grow overflow-x-hidden overflow-y-auto scrolling-touch w-full pt-8 px-2 pb-4 remove-scrollbar"
				style="overscroll-behavior-y: contain;"
			>
				<transition-group name="list" tag="p">
					<div
						v-for="(message, index) in messages"
						:key="`${index}-${message}`"
						class="block w-full flex"
						:class="message.fromUser ? 'justify-end text-right' : 'justify-left'"
					>
						<div
							v-if="!isEmoji(message.text, 3)"
							class="px-4 py-2 bg-chat m-2 block max-w-2/3 rounded-full"
						>
							<p class="p-1 text-gray-100">{{ message.text }}</p>
						</div>

						<p v-else class="p-1 mx-1 text-5xl">{{ message.text }}</p>
					</div>
				</transition-group>
			</div>
			<form class="w-full form-bg py-4" @submit.prevent="() => send()">
				<transition name="commands-fade">
					<div
						v-if="this.$socket.connected"
						class="flex pl-2 pb-4 scrolling-touch overflow-x-auto remove-scrollbar"
					>
						<a
							v-for="command in commands"
							class="command-item mx-2 px-2 py-1 rounded-full bg-white"
							@click.prevent="send(command.handler)"
						>{{ command.name }}</a>
						<div class="px-2"></div>
					</div>
				</transition>
				<div class="flex items-center bg-white mx-4 p-3 rounded-full">
					<span v-show="$socket.connected" class="dot bg-green"></span>
					<span v-show="$socket.disconnected" class="dot bg-red-light"></span>
					<input
						v-uppercaseInitial
						:disabled="inputDisabled"
						v-model="message"
						class="resize-none appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-4 leading-tight focus:outline-none text-xl"
						:placeholder="placeholder"
					/>
					<button
						@click.prevent="() => send()"
						class="flex-shrink-0 bg-blue hover:bg-indigo-500 hover:border-indigo-500 text-md text-white rounded-full"
						type="button"
					>
						<v-icon
							class="align-middle m-2 mx-3"
							:spin="connecting"
							:name="connecting ? 'cog' : hasDisconnected ? 'sync-alt' : 'paper-plane'"
						/>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import 'vue-awesome/icons/paper-plane';
	import 'vue-awesome/icons/cog';
	import 'vue-awesome/icons/sync-alt';
	import 'vue-awesome/icons/arrow-right';
	import { Socket } from 'vue-socket.io-extended';
	import { sleep } from '../utils';

	@Component({
		directives: {
			uppercaseInitial: {
				componentUpdated(el: any) {
					el.value = el.value.charAt(0).toUpperCase() + el.value.slice(1);
				}
			},
			lockToBottom: {
				componentUpdated(el: HTMLElement) {
					setTimeout(() => {
						const nearEnd = 300;
						const scrollIsNearEnd = (el.scrollHeight - nearEnd) < (el.clientHeight + el.scrollTop);

						if (scrollIsNearEnd) {
							el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
						}
					}, 100);
				}
			}
		}
	})
	export default class Navbar extends Vue {

		connecting = false;

		message = "";

		commands = [
			{
				id: 0,
				name: 'Contact',
				handler: '/contact'
			},
			{
				id: 1,
				name: 'Hello',
				handler: '/hello'
			},
			{
				id: 2,
				name: 'Close',
				handler: '/close'
			},
			{
				id: 3,
				name: 'Close',
				handler: '/close'
			},
			{
				id: 4,
				name: 'Close',
				handler: '/close'
			},
			{
				id: 5,
				name: 'Close',
				handler: '/close'
			},
			{
				id: 6,
				name: 'Close',
				handler: '/close'
			},
			{
				id: 7,
				name: 'Close',
				handler: '/close'
			},
			{
				id: 8,
				name: 'Close',
				handler: '/close'
			},
			{
				id: 9,
				name: 'Close',
				handler: '/close'
			},
			{
				id: 10,
				name: 'Close',
				handler: '/close'
			},
		];

		get messages() {
			return this.$store.state.chat.messages;
		}

		get hasDisconnected() {
			return this.$store.state.chat.hasDisconnected;
		}

		get placeholder() {
			return this.$store.state.chat.placeholder || 'Say something';
		}

		get inputDisabled() {
			return this.$store.state.chat.disabled;
		}

		@Socket('connect')
		async onConnect(obj) {

			await sleep(300);
			this.$store.dispatch('chat/addMessage', {
				text: 'Yay! Hello ' + (this.$socket.client.io.opts.query! as any).name,
				fromUser: false
			});

			this.connecting = false;
			this.$store.dispatch('chat/setPlaceholder', 'Write here...');
			this.$store.dispatch('chat/setDisabled', false);
		}

		@Socket('disconnect')
		onDisconnect(response) {
			this.$socket.client.disconnect();
			this.$store.dispatch('chat/disconnected');
		}

		@Socket('response')
		onResponse(response) {
			this.$store.dispatch('chat/addMessage', {
				text: response,
				fromUser: false
			});
		}

		@Socket('smartReply')
		onSmartReply(smartReply) {
			this.$store.dispatch('chat/addMessage', {
				text: smartReply,
				fromUser: false
			});
		}

		send(message = this.message) {

			if (this.hasDisconnected) {
				this.reconnect();
				return;
			}

			if (
				message === "" ||
				this.connecting ||
				this.inputDisabled
			) {
				return;
			}

			if (this.messages.length === 2) {

				if (this.isCommand(message)) {
					return;
				}

				this.$store.dispatch('chat/setDisabled', true);
				this.$store.dispatch('chat/setPlaceholder', 'Connecting...');
				this.$socket.client.io.opts.query = { name: message };
				this.$socket.client.connect();
				this.connecting = true;
			} else {
				this.$socket.client.emit(this.isCommand(message) ? 'command' : 'message', message);
			}

			this.$store.dispatch('chat/addMessage', { text: message, fromUser: true });
			this.message = "";
		}

		closeChat() {
			this.$store.dispatch('chat/closeChat');
		}

		isEmoji(value: string, max = 3): boolean {

			if (typeof value !== 'string') {
				return false;
			}

			const regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]){1,3}$/g;

			return !!value.match(regex);
		}

		private reconnect() {
			this.$store.dispatch('chat/reset');
		}

		private isCommand(value: string): boolean {
			if (typeof value !== 'string') {
				return false;
			}

			const regex = /^\/([^@\s]+)\s?(.*)$/i;

			return !!value.match(regex);
		}

	}
</script>

<style lang="scss">
	.remove-scrollbar::-webkit-scrollbar {
		width: 0px; /* remove scrollbar space */
		height: 0px; /* remove scrollbar space */
		background: transparent; /* optional: just make scrollbar invisible */
	}
</style>

<style lang="scss" scoped>
	.bg-chat {
		background-color: azure;
	}

	.form-bg {
		background: #5959fe;
	}

	.dot {
		width: 11px;
		height: 8px;
		margin-left: 10px;
		margin-top: 2px;

		@apply rounded-full;
	}

	.list-enter-active,
	.list-leave-active {
		transition: all 0.8s;
	}
	.list-enter:not(.justify-end), .list-leave-to:not(.justify-end) /* .list-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateX(-30px);
	}
	.list-enter.justify-end, .list-leave-to.justify-end /* .list-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateX(30px);
	}

	#scroller * {
		/* don't allow the children of the scrollable element to be selected as an anchor node */
		overflow-anchor: none;
	}

	#anchor {
		/* allow the final child to be selected as an anchor node */
		overflow-anchor: auto;

		/* anchor nodes are required to have non-zero area */
		height: 1px;
	}

	.commands-fade-enter-active,
	.commands-fade-leave-active {
		transition: all 0.4s ease;
	}

	.commands-fade-enter,
	.commands-fade-leave-to {
		transform: translateX(-10px);
		opacity: 0;
	}
</style>