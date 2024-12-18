<template>
  <div class="k-message"
       ref="messageRef"
       v-show="visible"
       :class="{
          [`k-message--${type}`]: type,
          'is-close': showClose,
       }"
       :style=cssStyle
       role="alert"
       @mouseenter="closeTimer"
       @mouseleave="startTimer"
  >
    <div class="k-message__content">
      <slot>
        <renderVNode :vNode="content" v-if="content"></renderVNode>
      </slot>
    </div>

    <div v-if="showClose" class="k-message__close">
      <Icon @click.stop = "visible = false" icon="xmark" />
    </div>

  </div>
</template>

<script setup lang="ts">
import type { MessageProps } from "./type"
import renderVNode from "@/utils/RenderVnode";
import {ref, watch, onMounted, computed,nextTick} from "vue"
import Icon from "@/components/Icon/icon.vue"
import {getLastBottomOffset} from "./methods"
import useEventListener from "@/utils/useEventListener"

let timer:any
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
  top:topOffset.value + 'px',
  zIndex:props.zIndex,
}))
const props = withDefaults(defineProps<MessageProps>(),{
  duration:5000,
  showClose:true,
  type:'info',
  offset:20
})
const visible = ref<boolean>(false)
function startTimer() {
  if(props.duration === 0) return
    timer = setTimeout(()=>{
      visible.value = false
    },props.duration)
}

function keyDown(e:Event){
  const event = e as KeyboardEvent
  if(event.code === 'Escape') {
    visible.value = false
  }
}

function closeTimer(){
  clearTimeout(timer)
}

useEventListener(document,'keydown',keyDown)

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
  nextOffset,
  visible //用于组件的关闭，所以要暴露出去
})

</script>

