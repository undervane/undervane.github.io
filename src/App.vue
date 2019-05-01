<template>
	<Landing/>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import Landing from '@/pages/Landing.vue';

	@Component({
		components: {
			Landing
		}
	})
	export default class App extends Vue {
		created() {
			this.$store.dispatch('light/calculate');
		}
	}
</script>
