<template>
  <div class="relative">
    <div class="light-layer" :class="{'bg-dark': dark}" v-zIndex="zIndex - 1"></div>
    <svg class="ripple-layer" v-zIndex="zIndex">
      <circle
        class="ripple"
        :class="{'bg-dark': dark}"
        :cx="position.x"
        :cy="position.y"
        :r="ripple.radius"
      />
    </svg>
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      dark: Boolean,
      position: Object,
      zIndex: {
        type: Number,
        default: () => -1
      }
    },
    data() {
      return {
        ripple: { radius: 30 },
        animation: null
      }
    },
    watch: {
      dark() {
        this.animation ? this.animation.restart() : this.playAnimation()
      }
    },
    directives: {
      zIndex: {
        inserted: function(el, { value }) {
          el.style.zIndex = value
        }
      }
    },
    methods: {
      playAnimation() {
        const html = document.getElementsByTagName('html')[0]
        const rippleSize =
          html.clientWidth < html.clientHeight
            ? html.clientHeight * 2
            : html.clientWidth * 2

        this.animation = this.$anime.timeline().add({
          targets: this.ripple,
          duration: 2000,
          radius: rippleSize,
          easing: 'cubicBezier(.5,0,.5,1)'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .light-layer {
    transition: background-color 3s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    @apply absolute h-full w-full bg-light;
  }

  .ripple-layer {
    @apply absolute h-full w-full min-h-screen;
  }

  .ripple {
    @apply bg-light;
  }

  .bg-dark {
    background-color: $dark;
    fill: $dark;
  }

  .bg-light {
    background-color: $white;
    fill: $white;
  }
</style>