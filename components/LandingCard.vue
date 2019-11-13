<template>
  <div>
    <h1 class="title" :class="{'text-white': dark}">{{title}}</h1>
    <div class="xs-reverse">
      <p v-if="text" class="content">{{ text }}</p>
      <slot v-else></slot>
      <Button
        @click="$emit('buttonClick')"
        class="button"
        :color="dark ? 'transition-dark' : 'transition'"
      >{{buttonText}}</Button>
      <div class="links">
        <Icon
          v-for="(link, index) in links"
          class="icon"
          :key="index"
          :icon="link.icon"
          theme="secondary"
          :link="link.url"
          @click.native="link.callback && link.callback(link)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Button from '@/components/Button.vue'
  import Icon from '@/components/Icon.vue'
  export default {
    components: {
      Button,
      Icon
    },
    props: {
      dark: Boolean,
      title: String,
      text: String,
      buttonText: String,
      links: Array
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    transition: color 2s;
    @apply mb-2;

    @include breakpoint(xs) {
      @apply text-center mb-6;
    }
  }

  .content {
    color: $blue-light;
    word-spacing: 6px;

    @include breakpoint(xs) {
      @apply text-justify;
    }

    @apply text-lg leading-normal mb-6 pl-1;
  }

  .button {
    @apply text-lg mr-3;
    @include breakpoint(xs) {
      @apply w-full mb-6 mr-0;
    }
  }

  .links {
    display: flex;
    flex-grow: 1;
    justify-content: left;
    align-items: center;
    @apply text-xl;

    .icon {
      @apply mx-2 cursor-pointer;

      @include breakpoint(xs) {
        @apply mx-4;
      }
    }

    @include breakpoint(xs) {
      order: -1;
      justify-content: center;
      @apply text-3xl;
    }
  }

  .xs-reverse {
    display: flex;
    flex-wrap: wrap;

    @include breakpoint(xs) {
      flex-wrap: wrap-reverse;
    }
  }
</style>