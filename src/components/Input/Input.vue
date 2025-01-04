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
      >
      </textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import  type {InputProps,InputEmits} from "./type"

defineOptions({
  name: 'KInput'
})

const props = withDefaults(defineProps<InputProps>(), {
  type:'text'
})

const emit = defineEmits<InputEmits>()
</script>