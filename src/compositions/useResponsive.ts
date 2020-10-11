import enquire from 'enquire.js';
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';

const MOBILE_SCREEN = 'screen and (max-width: 640px)';
const TABLET_SCREEN = 'screen and (min-width: 641px) and (max-width: 991px)';
const SMALL_MONITOR_SCREEN =
  'screen and (min-width: 992px) and (max-width: 1200px)';
const LARGE_MONITOR_SCREEN = 'screen and (min-width: 1201px)';
const SM_SCREEN = 'screen and (min-width: 641px) and (max-width: 767px)';
const MD_SCREEN = 'screen and (min-width: 768px) and (max-width: 1023px)';
const LG_SCREEN = 'screen and (min-width: 1024px) and (max-width: 1279px)';
const XL_SCREEN = 'screen and (min-width: 1280px)';

export default function useResponsive() {
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isSmallMonitor = ref(false);
  const isLargeMonitor = ref(false);
  const isComputer = computed(() => {
    return isSmallMonitor.value || isLargeMonitor.value;
  });
  const isSMScreen = ref(false);
  const isMDScreen = ref(false);
  const isLGScreen = ref(false);
  const isXLScreen = ref(false);
  const smScreenHandler = {
    match: () => {
      isSMScreen.value = true;
    },
    unmatch: () => {
      isSMScreen.value = false;
    },
  };
  const mdScreenHandler = {
    match: () => {
      isMDScreen.value = true;
    },
    unmatch: () => {
      isMDScreen.value = false;
    },
  };
  const lgScreenHandler = {
    match: () => {
      isLGScreen.value = true;
    },
    unmatch: () => {
      isLGScreen.value = false;
    },
  };
  const xlScreenHandler = {
    match: () => {
      isXLScreen.value = true;
    },
    unmatch: () => {
      isXLScreen.value = false;
    },
  };

  const mobileScreenHandler = {
    match: () => {
      isMobile.value = true;
    },
    unmatch: () => {
      isMobile.value = false;
    },
  };

  const tabletScreenHandler = {
    match: () => {
      isTablet.value = true;
    },
    unmatch: () => {
      isTablet.value = false;
    },
  };

  const smallMonitorScreenHandler = {
    match: () => {
      isSmallMonitor.value = true;
    },
    unmatch: () => {
      isSmallMonitor.value = false;
    },
  };

  const largeMonitorScreenHandler = {
    match: () => {
      isLargeMonitor.value = true;
    },
    unmatch: () => {
      isLargeMonitor.value = false;
    },
  };

  onMounted(() => {
    enquire
      .register(MOBILE_SCREEN, mobileScreenHandler)
      .register(TABLET_SCREEN, tabletScreenHandler)
      .register(SMALL_MONITOR_SCREEN, smallMonitorScreenHandler)
      .register(LARGE_MONITOR_SCREEN, largeMonitorScreenHandler)
      .register(SM_SCREEN, smScreenHandler)
      .register(MD_SCREEN, mdScreenHandler)
      .register(LG_SCREEN, lgScreenHandler)
      .register(XL_SCREEN, xlScreenHandler);
  });

  onBeforeUnmount(() => {
    enquire.unregister(MOBILE_SCREEN, mobileScreenHandler);
    enquire.unregister(TABLET_SCREEN, tabletScreenHandler);
    enquire.unregister(SMALL_MONITOR_SCREEN, smallMonitorScreenHandler);
    enquire.unregister(LARGE_MONITOR_SCREEN, largeMonitorScreenHandler);
    enquire.unregister(SM_SCREEN, smScreenHandler);
    enquire.unregister(MD_SCREEN, mdScreenHandler);
    enquire.unregister(LG_SCREEN, lgScreenHandler);
    enquire.unregister(XL_SCREEN, xlScreenHandler);
  });

  return {
    isMobile,
    isTablet,
    isSmallMonitor,
    isLargeMonitor,
    isComputer,
    isSMScreen,
    isMDScreen,
    isLGScreen,
    isXLScreen,
  };
}
