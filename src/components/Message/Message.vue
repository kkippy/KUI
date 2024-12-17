<template>
  <div class="k-message"
       ref="messageRef"
       v-show="visible"
       :class="{
          [`k-message-${type}`]: type,
          'is-close': showClose,
       }"
       :style=cssStyle
       role="alert"
  >
    <div class="k-message__content">
      <slot>
        {{offset}}--{{topOffset}}--{{height}}--{{nextOffset}}
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
import {ref, watch, onMounted, computed,nextTick,getCurrentInstance} from "vue"
import Icon from "@/components/Icon/icon.vue"
import {getLastInstance,getLastBottomOffset} from "./methods"
const messageRef = ref<HTMLDivElement>()
//偏移的高度
const height = ref<number>(0)
//上一个实例最底下的坐标
const lastOffset = computed(()=>{
  return getLastBottomOffset(props.id)
})
//元素的top offset
const topOffset = computed(()=>{
  return lastOffset.value +  props.offset
})
//为下一个元素预留的offset
const nextOffset = computed(()=>{
  return height.value + topOffset.value
})

const cssStyle = computed(()=> ({
  top:topOffset.value + 'px'
}))
const props = withDefaults(defineProps<MessageProps>(),{
  duration:5000,
  showClose:false,
  type:'info',
  offset:20
})
const visible = ref<boolean>(false)
const prevInstance = getLastInstance()
console.log(prevInstance, '1')
const startTimer = () => {
  if(props.duration === 0) return
    setTimeout(()=>{
      visible.value = false
    },props.duration)
}

onMounted(async ()=>{
  visible.value = true
  startTimer()
  await nextTick()
  height.value = messageRef.value!.getBoundingClientRect().height
})

watch(visible,(newVal)=>{
  if(!newVal) {
    props.onDestroy()
  }
})

defineExpose({
  nextOffset
})

</script>

<style scoped>
.k-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid red;
}
</style>
