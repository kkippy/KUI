<template>
  <div
      class="k-input"
      :class="{
        [`k-input-${size}`]:size,
        [`k-input-${type}`]:type,
        'is-disabled':disabled,
        'is-prefix':$slots.prefix,
        'is-suffix':$slots.suffix,
        'is-append':$slots.append,
        'is-prepend':$slots.prepend,
      }"
  >

    <template v-if="type!=='textarea'">
        <!--prepend-->
      <div class="k-input_prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>

        <!--input主体-->
      <div class="k-input_wrapper">
        <!--prefix-->
        <div class="k-input_prefix" v-if="$slots.prefix">
          <slot name="prefix"></slot>
        </div>

        <input
            :type="type"
            class="k-input-inner"
            :disabled="disabled"
            v-model="innerValue"
            @input="handleInput"
        >

        <!--suffix-->
        <div class="k-input_suffix" v-if="$slots.suffix">
          <slot name="suffix"></slot>
        </div>
      </div>

        <!--append-->
      <div class="k-input_append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>

        <!--textarea-->
    <template v-else>
      <textarea
        class="k-textarea_wrapper"
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"


      >
      </textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import  type {InputProps,InputEmits} from "./type"
import {ref,watch} from "vue"

defineOptions({
  name: 'KInput'
})

const props = withDefaults(defineProps<InputProps>(), {
  type:'text'
})

const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)
// 外部的值更新时内部也要改变
watch(()=>props.modelValue,(newValue)=>{
  innerValue.value = newValue
})
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
}
</script>