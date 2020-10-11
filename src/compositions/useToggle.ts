import { ref } from 'vue';

export default function useToggle(initialValue: boolean) {
  const isOn = ref(initialValue);
  const toggle = () => {
    isOn.value = !isOn.value;
  };

  const off = () => {
    isOn.value = false;
  };

  const on = () => {
    isOn.value = true;
  };

  return {
    isOn,
    toggle,
    off,
    on,
  };
}