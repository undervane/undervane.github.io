<template>
  <div class="w-full">
    <client-only>
      <LazyImage
        v-if="width"
        :src="`https://res.cloudinary.com/mipigu/image/upload/q_auto,fl_progressive,${maxQuality ? 'w_auto' : 'w_' +(width +300)},f_auto,dpr_auto/v1570609958/` + url"
        :placeholder="'https://res.cloudinary.com/mipigu/image/upload/' + 'q_1:420,w_' + width + ',dpr_auto/v1570609958/' + url"
        :alt="alt"
      />
    </client-only>
    <p
      v-if="author"
      class="w-full text-center text-light-transition mt-2"
      :class="dark ? 'text-gray-300' : 'text-gray-800'"
    >{{ author }}</p>
  </div>
</template>

<script>
  import LazyImage from '@/components/LazyImage.vue'
  export default {
    components: {
      LazyImage
    },
    props: {
      url: {
        type: String,
        default: () => ''
      },
      alt: {
        type: String,
        default: () => 'Missing alt'
      },
      maxQuality: Boolean,
      author: String,
      dark: Boolean
    },
    data() {
      return {
        placeholderLoaded: false,
        imgLoaded: false,
        width: null
      }
    },
    mounted() {
      this.width = this.$el.offsetWidth
    }
  }
</script>