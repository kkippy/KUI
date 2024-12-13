<template>
  <div class="k-message"
       :class="{
          [`k-message-${type}`]: type,
          'is-close': showClose,
       }"
       role="alert"
  >
    <div class="k-message__content">
      <slot>
        <renderVNode :vNode="content" v-if="content"></renderVNode>
      </slot>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { MessageProps } from "./type"
import renderVNode from "@/utils/RenderVnode";


const props = withDefaults(defineProps<MessageProps>(),{
  duration:5000,
  showClose:false,
  type:'info'
})
</script>

<style scoped>

</style>
