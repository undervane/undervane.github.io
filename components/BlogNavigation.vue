<template>
  <div class="flex items-center justify-between">
    <div class="flex text-sm md:text-lg items-center flex-grow">
      <Icon
        :to="back"
        icon="arrow-left"
        class="text-2xl md:text-4xl transition"
        :class="{'text-white':dark, 'text-black': !dark, 'sm:mr-5': !center}"
      />
      <h1
        class="flex-grow text-center pl-2 transition"
        :class="{'text-white':dark, 'text-black': !dark, 'sm:text-left': !center}"
      >{{text}}</h1>
    </div>
    <div class="light-toggle">
      <Moon class="absolute" :dark="dark" />
      <Sun class="absolute" :dark="dark" @click="triggerLight" :disabled="false" />
    </div>
  </div>
</template>

<script>
  import Icon from '@/components/Icon'
  import Sun from '@/components/svg/Sun'
  import Moon from '@/components/svg/Moon'

  export default {
    components: {
      Icon,
      Sun,
      Moon
    },
    props: {
      dark: Boolean,
      text: {
        type: String,
        default: () => 'Title'
      },
      back: {
        type: String,
        default: () => '/'
      },
      center: Boolean
    },
    methods: {
      triggerLight(event) {
        this.$store.dispatch('light/trigger', event)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .transition {
    transition: 2s all;
  }

  .light-toggle {
    height: 35px;
    width: 40px;

    @apply relative;
  }
</style>