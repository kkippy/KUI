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
            v-bind="attrs"
            ref="inputRef"
            :disabled="disabled"
            :autocomplete="autocomplete"
            :form="form"
            :placeholder="placeholder"
            :readonly="readonly"
            :autofocus="autofocus"
            v-model="innerValue"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"

        >

        <!--suffix-->
        <div class="k-input_suffix" v-if="$slots.suffix || showClear || showPassword" @click="keepFocus">
          <slot name="suffix"></slot>
          <Icon icon="circle-xmark" v-if="showClear"  class="k-input_clear" @click="handleClear" @mousedown.prevent="NOOP" />
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
        v-bind="attrs"
        ref="inputRef"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :form="form"
        :placeholder="placeholder"
        :readonly="readonly"
        :autofocus="autofocus"
        v-model="innerValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
      </textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import  type {InputProps,InputEmits} from "./type"
import {computed, ref, useAttrs, watch,nextTick} from "vue"
import Icon from '../Icon/icon.vue'
import type {Ref} from "vue"

defineOptions({
  name: 'KInput',
  inheritAttrs:false
})

const props = withDefaults(defineProps<InputProps>(), {
  type:'text',
  autocomplete:'off'
})

const emits = defineEmits<InputEmits>()
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)

//创建实例将input的默认事件暴露出去
const inputRef = ref() as Ref<HTMLInputElement >

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
  emits('input', innerValue.value)
}

const handleChange = () => {
  emits('change', innerValue.value)
}

const keepFocus = async () => {
  //需要等待所有dom更新完之后再去聚焦
  await nextTick(()=>{
    inputRef.value.focus()
  })
}

const handleFocus = (e:FocusEvent) => {
  emits('focus', e)
  isFocus.value = true
}

const handleBlur = (e:FocusEvent) => {
  emits('blur', e)
  isFocus.value = false
}

const handleClear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  //触发clear事件后应该触发input和change事件
  emits('input','')
  emits('change','')
}

const handlePassword = () => {
  passwordVisible.value = !passwordVisible.value
}

const NOOP = ()=> {}

//暴露input实例
defineExpose({
  ref:inputRef
})
</script>
