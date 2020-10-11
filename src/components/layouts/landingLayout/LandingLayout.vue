<template lang="pug">
LandingHeader
router-view
LandingFooter
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import LandingHeader from './components/LandingHeader.vue';
import LandingFooter from './components/LandingFooter.vue';

@Options({
  components: {
    LandingHeader,
    LandingFooter,
  },
})
export default class LandingLayout extends Vue {
}
</script>