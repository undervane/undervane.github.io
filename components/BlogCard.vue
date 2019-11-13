<template>
  <div
    class="blog-card w-full lg:max-w-1-3 md:max-w-1-2 rounded-lg overflow-hidden mb-5 sm:m-5 shadow-inner"
  >
    <nuxt-link :to="to" append>
      <div class="flex flex-col h-full">
        <BlogImage class="flex-1" v-if="image" :url="image.url" :alt="image.alt" format="jpg" />
        <h2 class="w-full text-center text-lg my-2 font-semibold text-white">{{ title }}</h2>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  import BlogImage from '@/components/BlogImage.vue'
  export default {
    components: {
      BlogImage
    },
    props: {
      to: {
        type: String,
        default: () => ''
      },
      title: String,
      image: Object
    }
  }
</script>

<style lang="scss">
  .blog-card {
    background-color: $blue-darker;
    transition: height 2s;

    .image-wrapper {
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>