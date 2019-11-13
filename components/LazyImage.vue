<template>
  <div class="image-wrapper">
    <v-lazy-image ref="image" :src="src" :src-placeholder="placeholder" :alt="alt" @load="unblur" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        animation: false
      }
    },
    props: {
      src: {
        type: String,
        default: () => ''
      },
      placeholder: {
        type: String,
        default: () => ''
      },
      alt: {
        type: String,
        default: () => 'Missing alt'
      }
    },
    methods: {
      unblur() {
        this.$anime.timeline().add({
          targets: this.$refs.image.$el,
          duration: 2000,
          filter: 'blur(0px)',
          easing: 'cubicBezier(.5,0,.5,1)'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image-wrapper {
    @apply overflow-hidden;
  }

  .v-lazy-image {
    filter: blur(8px);
    transform: scale(1.1);
    /* transition: filter 1.5s ease-out; */
  }
  .v-lazy-image-loaded {
    /* filter: blur(0); */
  }
</style>