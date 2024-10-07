<template>
  <button
      ref="_ref"
      class="k-button"
      :class="{
        'is-plain':plain,
        'is-circle':circle,
        'is-round':round,
        [`k-button--${type}`]:type,
        [`k-button--${size}`]:size,
        'is-disabled':disabled
      }"
      :disabled="disabled"
      :auto-focus="autoFocus"
      :type="nativeType"
  >
    <span>
      <slot></slot>
    </span>

  </button>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import './style.css'
export default defineComponent({
  name: "KButton",
})
</script>

<script setup lang="ts">
import {ref} from "vue";
import type {ButtonProps} from "./type"
 withDefaults(defineProps<ButtonProps>(),{
   nativeType: 'button'
 })

const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})
</script>

<style >

</style>