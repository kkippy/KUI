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
        'is-focus':isFocus,
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
            :type=" showPassword ? (passwordVisible ? 'text' : 'password') : type"
            class="k-input-inner"
            :disabled="disabled"
            v-model="innerValue"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
        >

        <!--suffix-->
        <div class="k-input_suffix" v-if="$slots.suffix || showClear || showPassword">
          <slot name="suffix"></slot>
          <Icon icon="circle-xmark" v-if="showClear"  class="k-input_clear" @click="handleClear" />
          <Icon :icon="passwordVisible ? 'eye' : 'eye-slash'" v-if="showPassword " class="k-input_password" @click="handlePassword" />
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
        @focus="handleFocus"
        @blur="handleBlur"

      >
      </textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import  type {InputProps,InputEmits} from "./type"
import {computed, ref, watch} from "vue"
import Icon from '../Icon/icon.vue'

defineOptions({
  name: 'KInput'
})

const props = withDefaults(defineProps<InputProps>(), {
  type:'text'
})

const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)



const showClear = computed(()=>
    // 使用两个感叹号将其转换为布尔值
  props.clearable && !!innerValue.value && !props.disabled && isFocus.value
)

const showPassword = computed(()=>
    // 使用两个感叹号将其转换为布尔值
  props.showPassword && !props.disabled && !!innerValue.value
)

// 外部的值更新时内部也要改变
watch(()=>props.modelValue,(newValue)=>{
  innerValue.value = newValue
})
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
}

const handleFocus = () => {
  isFocus.value = true
}

const handleBlur = () => {
  isFocus.value = false
}

const handleClear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
}

const handlePassword = () => {
      passwordVisible.value = !passwordVisible.value
}

</script>