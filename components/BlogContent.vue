<template>
  <div class="blog-content sm:mt-8" :class="{'text-white': dark}">
    <MarkdownContent
      class="text-content text-justify sm:text-left"
      :render-func="renderFunc"
      :static-render-fns="staticRenderFns"
      extra-component="blog/TwitterWrapper"
    />
  </div>
</template>

<script>
  import MarkdownContent from '@/components/MarkdownContent.vue'

  export default {
    components: {
      MarkdownContent
    },
    props: {
      renderFunc: String,
      staticRenderFns: String,
      extraComponent: Array,
      dark: Boolean
    }
  }
</script>

<style lang="scss">
  .blog-content {
    @apply flex justify-center text-lg px-8 leading-relaxed text-light-transition overflow-hidden pb-12;

    .text-content {
      @apply w-full max-w-2xl;

      & > p:first-child::first-letter {
        @apply px-1 mr-1 border-2 border-solid rounded-lg font-bold;
        font-family: 'IBM Plex Mono', monospace;
      }
    }

    p {
      @apply my-6;
    }

    h2 {
      @apply font-bold text-3xl text-left;
    }

    blockquote {
      @apply text-2xl text-center;
    }

    a {
      border-bottom: 0.5px solid;

      &:hover {
        @apply font-semibold;
      }
    }

    img {
      @apply w-full max-w-md;
    }
  }
</style>