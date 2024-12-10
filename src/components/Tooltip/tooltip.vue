<template>
  <div class="k-tooltip">
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
const emits = defineEmits<TooltipEmits>()
const triggerRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()
const isOpen = ref(false)
let events:Record<string, any> = reactive({})
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

const open = () =>{
  isOpen.value = true
  emits('visible-change',true)
}

const close = () => {
  isOpen.value = false
  emits('visible-change',false)
}

const handleEvent = () => {
  if(props.trigger === 'hover'){
    events['mouseenter'] = open
    events['mouseleave'] = close
  } else if(props.trigger === 'click') {
    events['click'] = handleChangeVisible
  }
}
handleEvent()


const handleChangeVisible = ()=> {
  isOpen.value = !isOpen.value
  emits('visible-change',isOpen.value)
}
</script>



<style scoped>

</style>
