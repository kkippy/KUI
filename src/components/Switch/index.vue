<template>
  <div
      class="k-switch"
      :class="{
        [`k-switch-${size}`]:size,
        'is-disabled':disabled,
        'is-checked':checked,
      }"
      @click="handleCheck"
  >
    <input class="k-switch__input"
           type="checkbox"
           role="switch"
           :name="name"
           :disabled="disabled"
           ref="inputRef"
           @keydown.enter="handleCheck"
    />
    <div class="k-switch__core">
      <div class="k-switch__core-inner">
        <span v-if="activeText || inactiveText" class="k-switch__core-inner-text">
          {{checked ? activeText : inactiveText}}
        </span>
      </div>
      <div class="k-switch__core-action"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type {switchProps,switchEmits} from './type'
import {computed, onMounted, ref, watch} from "vue";
defineOptions({
  name:'kSwitch',
  inheritAttrs:false
})

const props = withDefaults(defineProps<switchProps>(), {
  activeValue:true,
  inactiveValue:false,
})
const emit = defineEmits<switchEmits>()

const innerValue = ref(props.modelValue)

const checked = computed(() => {
  return innerValue.value === props.activeValue
})

const inputRef = ref<HTMLInputElement>()

const handleCheck = () => {
  if(props.disabled)  return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emit('update:modelValue',newValue)
  emit('change',newValue)
}

onMounted(()=> {
  inputRef.value!.checked = checked.value
  inputRef.value?.focus()
})

watch(checked,(val)=> {
  inputRef.value!.checked = val
})

watch(()=>props.modelValue,(newValue)=>{
  innerValue.value = newValue
})



</script>



<style scoped>

</style>
