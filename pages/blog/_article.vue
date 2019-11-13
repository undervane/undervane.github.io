<template>
  <div>
    <client-only>
      <BlogNavigation
        class="p-8 sm:p-20 pb-5 sm:pb-20"
        center
        text="The DOTS Pattern"
        back="/blog"
        :dark="dark"
      />
    </client-only>

    <BlogImage
      maxQuality
      url="Rose%20of%20many%20colours"
      alt="Roses of many colors"
      author="Photo by Patrick Fore on Unsplash"
      :dark="dark"
    />
    <BlogContent
      :dark="dark"
      :renderFunc="renderFunc"
      :staticRenderFns="staticRenderFns"
      :extraComponent="extraComponent"
    />
  </div>
</template>

<script>
  import BlogNavigation from '@/components/BlogNavigation.vue'
  import BlogImage from '@/components/BlogImage.vue'
  import BlogContent from '@/components/BlogContent.vue'

  export default {
    components: {
      BlogNavigation,
      BlogImage,
      BlogContent
    },
    computed: {
      dark() {
        return this.$store.state.light.dark
      }
    },
    async asyncData({ app, params, redirect }) {
      try {
        const fileContent = await import(`@/blog/${params.article}.md`)
        const attr = fileContent.attributes

        return {
          name: params.slug,
          title: attr.title,
          trans: attr.trans,
          year: attr.year,
          id: attr.id,
          owner: attr.owner,
          colors: attr.colors,
          role: attr.role,
          cardAlt: attr.cardAlt,
          noMainImage: attr.noMainImage,
          description: attr.description,
          related: attr.related,
          extraComponent: attr.extraComponent,
          renderFunc: fileContent.vue.render,
          staticRenderFns: fileContent.vue.staticRenderFns,
          image: {
            main: attr.image && attr.image.main,
            og: attr.image && attr.image.og
          }
        }
      } catch (e) {
        redirect('/blog')
      }
    },
    head() {
      return {
        title: `${this.title} | Blog`
      }
    }
  }
</script>