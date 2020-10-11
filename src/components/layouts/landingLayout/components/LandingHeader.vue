<template lang="pug">
nav.flex.items-center.justify-center.flex-wrap.py-4.pl-8.pr-12.xh-16.bg-white.shadow
  .flex.items-center.flex-shrink-0.text-white.mr-6
    router-link(:to='{ name: "landing" }')
      img(src='@/assets/logo.png' style='height: 30px;')

  .block.ml-auto(class='lg:hidden')
    button.hamburger(type='button' @click='toggleHeader'
      :class='["focus:outline-none", { "hamburger--collapse is-active": isShowHeader }]'
      style='--hamburger-layer-color: #2D2F3D; --hamburger-layer-width: 30px; --hamburger-layer-height: 3px;')
      span.hamburger-box
        span.hamburger-inner

  .block.w-full(
    class='lg:ml-auto lg:flex lg:items-center lg:w-auto',
    v-show='isShowHeader'
  )
    .text-sm(class='lg:flex-grow')
      a.font-semibold.block.mt-4.text-charade.mr-4(
        href='#responsive-header',
        class='lg:inline-block lg:mt-0 hover:underline'
      )
        | Markets
      a.font-semibold.block.mt-4.text-charade.mr-4(
        href='#responsive-header',
        class='lg:inline-block lg:mt-0 hover:underline'
      )
        | Sign in
    div
      a.bg-blue-600.text-white.font-bold.py-2.px-4.rounded.mt-4.inline-block(
        class='hover:bg-blue-700 lg:mt-0'
      )
        | Sign up
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useToggle from '@/compositions/useToggle';
import useResponsive from '@/compositions/useResponsive';
import { watch } from 'vue';

export default defineComponent({
  name: 'LandingHeader',
  setup() {
    const { isOn: isShowHeader, toggle: toggleHeader } = useToggle(true);
    const { isMDScreen, isLGScreen } = useResponsive();
    watch(isMDScreen, val => {
      if (val) {
        isShowHeader.value = false;
      }
    });

    watch(isLGScreen, val => {
      if (val) {
        isShowHeader.value = true;
      }
    });

    return {
      isShowHeader,
      toggleHeader,
    };
  },
});
</script>
