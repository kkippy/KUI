<template>
  <div v-on="outerEvents" ref="containerRef" class="k-tooltip">
    <div v-on="events" ref="triggerRef" class="k-tooltip__trigger">
      <slot ></slot>
    </div>

    <div v-if="isOpen" ref="popperRef" class="k-tooltip__popper ">
      <slot name="content">{{content}}</slot>
    </div>

  </div>

</template>

<script setup lang="ts">
import {createPopper} from "@popperjs/core";
import type {Instance} from "@popperjs/core";
import type {TooltipProps,TooltipEmits} from "./type"
import {defineOptions, watch, ref, reactive} from "vue";
import useClickOutside from "@/utils/useClickOutside";

const emits = defineEmits<TooltipEmits>()
const triggerRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()
const containerRef = ref<HTMLElement>()
const isOpen = ref(false)
let events:Record<string, any> = reactive({})
let outerEvents:Record<string, any> = reactive({})
defineOptions({
  name: "KTooltip"
})
let popperInstance : Instance | null = null
const props = withDefaults(defineProps<TooltipProps>(),{
  placement:'top',
  trigger:'hover'
})

watch(isOpen,(newValue)=>{
  if(newValue){
    if(triggerRef.value && popperRef.value){
      popperInstance =  createPopper(triggerRef.value, popperRef.value, {
        placement: props.placement,
      });
    } else {
      popperInstance?.destroy()
    }
  }
},{
  flush:'post' // 等待所有dom渲染完毕再监听
})

watch(()=> props.trigger,(oldValue,newValue)=>{
  if(newValue !== oldValue){
    //清空事件
    events = {}
    outerEvents = {}
    handleEvent()
  }
})

const open = () =>{
  isOpen.value = true
  emits('visible-change',true)
}

const close = () => {
  isOpen.value = false
  emits('visible-change',false)
}

const handleChangeVisible = ()=> {
  isOpen.value = !isOpen.value
  emits('visible-change',isOpen.value)
}

useClickOutside(containerRef,()=>{
  //触发方式为点击并且isOpen为真时，点击外部关闭
  if(props.trigger === 'click' && isOpen){
    close()
  }
})

const handleEvent = () => {
  if(props.trigger === 'hover'){
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
  } else if(props.trigger === 'click') {
    events['click'] = handleChangeVisible
  }
}
handleEvent()


</script>



<style scoped>

</style>
