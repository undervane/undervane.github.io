<template>
    <main class="container mx-auto">
        <div class="p-3">
            <div class="justify-star block">
                <div class="p-4 bg-indigo-400 m-2 block w-2/3 rounded-full">
                    <p class="p-1 text-gray-100">Text 1</p>
                </div>
            </div>
            <div class="flex justify-end block">
                <div class="p-4 bg-indigo-500 m-2 block w-2/3 justify-end flex rounded-full">
                    <p class="p-1 text-gray-100">Text 2</p>
                </div>
            </div>
            <form class="block">
                <div class="flex items-center bg-gray-200 p-3 m-2 rounded-full">
                    <textarea class=" resize-none appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Say something"></textarea>
                    <button class="flex-shrink-0 bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 text-md border-4 text-white py-3 px-4 rounded-full" type="button">
                        <i class="far fa-paper-plane"></i>
                </button>
                </div>
            </form>
        </div>
    </main>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
    
    @Component
	export default class Navbar extends Vue {

	}
</script>

<style lang="scss" scoped>
	
</style>