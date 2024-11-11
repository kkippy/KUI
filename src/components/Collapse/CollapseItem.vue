<template>
  <div
      class="k-collapseItem"
      :class="{
        'is-disabled': disabled,
      }"
  >
    <div class="k-collapse-item__header"
         :class="{
            'is-active':isActive,
            'is-disabled':disabled,
         }"
         :id="`item-header-${name}`"
         @click="handleClick"
    >
      <slot name="title">{{title}}</slot>
      <Icon icon="angle-right" class="header-angle" />
    </div>

<!--类名命名规范遵循BEM-->
  <Transition
      name="slide"
      @before-enter="transitionEvents.beforeEnter"
      @enter="transitionEvents.enter"
      @after-enter="transitionEvents.afterEnter"
      @before-leave="transitionEvents.beforeLeave"
      @leave="transitionEvents.leave"
      @after-leave="transitionEvents.afterLeave"

  >
    <div class="k-collapse-item__wapper" v-show="isActive">
      <div class="k-collapse-item__content" :id="`item-content-${name}`" >
        <slot/>
      </div>
    </div>

  </Transition>

  </div>
</template>

<script setup lang="ts">
import type {CollapseItemProps} from './type'
import {CollapseContentKey}  from './type'
import {inject,computed} from "vue";
import Icon from "../Icon/icon.vue"

defineOptions({
  name: 'KCollapseItem'
})
const props =defineProps<CollapseItemProps>()

const collapseContent = inject(CollapseContentKey)

//判断内容是否打开，包含props.name说明打开
const isActive = computed(() => collapseContent?.activeName.value.includes(props.name))

//定义过度动画的事件，是一个对象，key为事件名，value为函数，函数不返回值，其中的el形参为元素类型
const transitionEvents:Record<string, (el: HTMLElement)=>void> = {
  beforeEnter (el){
    el.style.height = '0px' //初始高度设置为0
    el.style.overflow = 'hidden' //防止大盒子中的内容超出
  },
  enter (el){
    el.style.height = `${el.scrollHeight}px` //赋值为元素自身的高度
  },
  afterEnter (el){
    el.style.height = '' //动画结束后，高度设置为空使其2消失
    el.style.overflow = ''
  },
  beforeLeave(el){
    el.style.height = `${el.scrollHeight}px` //赋值为元素自身的高度
    el.style.overflow = 'hidden'
  },
  leave (el){
    el.style.height = '0px' //动画结束后，高度设置为0
  },
  afterLeave (el){
    el.style.height = '' //动画结束后，高度设置为空
    el.style.overflow = ''
  }
}

//判断disabled
const handleClick = ()=>{
  //若有禁用，则不触发事件
  if(props.disabled) {return}
  collapseContent?.handleClickItem(props.name)
}

</script>

<style scoped>
</style>
