<template>
  <div v-on="outerEvents" ref="containerRef" class="k-tooltip">
    <div v-on="events" ref="triggerRef" class="k-tooltip__trigger">
      <slot ></slot>
    </div>

    <Transition :name="transition">
      <div v-if="isOpen" ref="popperRef" class="k-tooltip__popper ">
        <slot name="content">{{content}}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>

</template>

<script setup lang="ts">
import {createPopper} from "@popperjs/core";
import type {Instance} from "@popperjs/core";
import type {TooltipProps,TooltipEmits,TooltipInstance} from "./type"
import {defineOptions, watch, ref, reactive, onUnmounted, computed} from "vue";
import useClickOutside from "@/utils/useClickOutside";
import {debounce} from "lodash-es";

const emits = defineEmits<TooltipEmits>()
const triggerRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()
const containerRef = ref<HTMLElement>()
const isOpen = ref(false)
let events:Record<string, any> = reactive({})
let outerEvents:Record<string, any> = reactive({})
const popperOptions = computed(()=>{
  //整合popper配置，因为placement存在于popperOptions中，优先级较低
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
    ...props.popperOptions
  }
})

defineOptions({
  name: "KTooltip"
})
let popperInstance : Instance | null = null
const props = withDefaults(defineProps<TooltipProps>(),{
  placement:'top',
  trigger:'hover',
  transition:'fade',
  openDelay:0,
  closeDelay:0
})

watch(isOpen,(newValue)=>{
  if(newValue){
    if(triggerRef.value && popperRef.value){
      popperInstance =  createPopper(triggerRef.value, popperRef.value, popperOptions.value);
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

watch(()=>props.manual,(newValue) => {
  //如果为手动模式，则清空事件
  if(newValue) {
    events = {}
    outerEvents = {}
  } else {
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

const openDebounce = () => {
  // 取消上次的close后再执行open,不取消的话触发多少次open就会有多少次close
  debounce(close,props.closeDelay).cancel()
  debounce(open,props.openDelay)()
}
const closeDebounce = () => {
  debounce(open,props.openDelay).cancel()
  debounce(close,props.closeDelay)()
}


const handleChangeVisible = ()=> {
  if(isOpen.value){
    closeDebounce()
  } else {
    openDebounce()
  }
}

useClickOutside(containerRef,()=>{
  //触发方式为点击并且isOpen为真时，点击外部关闭
  if(props.trigger === 'click' && isOpen.value && !props.manual){
    closeDebounce()
  }
})

const handleEvent = () => {
  if(props.trigger === 'hover'){
    events['mouseenter'] = openDebounce
    outerEvents['mouseleave'] = closeDebounce
  } else if(props.trigger === 'click') {
    events['click'] = handleChangeVisible
  }
}
//不为手动模式的话则调用handleEvent
if(!props.manual){
  handleEvent()
}

onUnmounted(()=> {
  popperInstance?.destroy()
})

//暴露手动控制方法
defineExpose<TooltipInstance>({
  show:openDebounce,
  hide:closeDebounce
})

</script>



<style scoped>

</style>
