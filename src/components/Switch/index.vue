<template>
  <div
      class="k-switch"
      :class="{
        [`k-switch-${size}`]:size,
        'is-disabled':disabled,
        'is-checked':checked,
      }"
  >
    <input class="k-switch__input"
           type="checkbox"
           role="switch"
           :name="name"
           :disabled="disabled"
    />
    <div class="k-switch__core">
      <div class="k-switch__core-action"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type {switchProps,switchEmits} from './type'
import {computed, ref} from "vue";
defineOptions({
  name:'kSwitch',
  inheritAttrs:false
})

const props = withDefaults(defineProps<switchProps>(), {

})
const emit = defineEmits<switchEmits>()

const innerValue = ref(props.modelValue)
const checked = computed(() => {
  return innerValue.value
})










</script>



<style scoped>

</style>