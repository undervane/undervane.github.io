<script>
  export default {
    props: ["renderFunc", "staticRenderFns", "extraComponent"],
    computed: {
      extraComponentLoader () {
        if (!this.extraComponent) {
          return null
        }
        return () => import(`@/components/${this.extraComponent}.vue`)
      }
    },
    render: function (createElement) {
    return this.templateRender ? this.templateRender() : createElement("div", "Rendering");
  },

  created: function () {
    this.templateRender = new Function(this.renderFunc)();
    this.$options.staticRenderFns = new Function(this.staticRenderFns)();
  }
  }
</script>