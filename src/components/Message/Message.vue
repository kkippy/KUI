<template>
  <div class="k-message"
       v-show="visible"
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

    <div v-if="showClose" class="k-message__close">
      <Icon @click.stop = "visible = false" icon="xmark" ></Icon>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { MessageProps } from "./type"
import renderVNode from "@/utils/RenderVnode";
import {ref,watch,onMounted} from "vue"
const visible = ref<boolean>(false)
import Icon from "@/components/Icon/icon.vue"
const props = withDefaults(defineProps<MessageProps>(),{
  duration:5000,
  showClose:false,
  type:'info'
})

const startTimer = () => {
  if(props.duration === 0) return
    setTimeout(()=>{
      visible.value = false
    },props.duration)
}

onMounted(()=>{
  visible.value = true
  startTimer()
})

watch(visible,(newVal)=>{
  if(!newVal) {
    props.onDestroy()
  }
})

</script>

<style scoped>
.k-message {
  display: inline-block;
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
}
</style>
