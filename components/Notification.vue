<template>
  <div class="container">
    <transition name="notification">
      <div v-if="visible" class="notification" @click="onClick" :class="getColorByStatus">
        <Icon class="icon" :icon="getIconByStatus" />
        <p>{{notification.message}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
  import Icon from '@/components/Icon.vue'
  export default {
    components: {
      Icon
    },
    props: {
      notification: {
        type: Object,
        default: null
      },
      fadeCountdown: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        visible: false,
        fadeTimeout: null
      }
    },
    computed: {
      getColorByStatus() {
        switch (this.notification.status) {
          case 'info':
            return 'bg-blue-light'
          case 'error':
            return 'bg-red-light'
          case 'success':
            return 'bg-green-light'
          default:
            return 'bg-blue-light'
        }
      },
      getIconByStatus() {
        if (this.notification.icon) {
          return this.notification.icon
        }

        switch (this.notification.status) {
          case 'info':
            return 'info-circle'
          case 'error':
            return 'exclamation-circle'
          case 'success':
            return 'check'
          default:
            return 'info-circle'
        }
      }
    },
    watch: {
      notification() {
        if (this.notification) {
          this.resetTimeout()
        }
      }
    },
    methods: {
      onClick() {
        if (this.notification.callback) {
          this.notification.callback()
        }

        this.visible = false
      },
      resetTimeout() {
        this.visible = true

        if (this.fadeTimeout) {
          clearTimeout(this.fadeTimeout)
        }

        this.fadeTimeout = setTimeout(
          () => (this.visible = false),
          this.notification.duration || this.fadeCountdown
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    min-width: 100vw;
    @apply fixed bottom-0 left-0 z-50;
    @apply flex justify-center w-full;
  }

  .notification {
    bottom: 30px;
    left: 30px;
    @apply flex items-center rounded-t-lg py-3 px-4 text-white cursor-pointer;

    .icon {
      @apply pr-2 text-white;
    }
  }

  .notification-enter-active,
  .notification-leave-active {
    transition: transform 0.5s;
    transform: translateY(0);
  }
  .notification-enter,
  .notification-leave-to {
    transform: translateY(300px);
  }
</style>