<template>
  <div
      class="k-collapseItem"
      :class="{
        'is-disabled': disabled,
      }"
  >
<!--类名命名规范遵循BEM-->
    <div class="k-collapseItem__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="k-collapseItem__content"  :id="`item-content-${name}`" v-show="isActive">
      <slot></slot>
    </div>

  </div>
</template>

<script setup lang="ts">
import type {CollapseItemProps} from './type'
import {CollapseContentKey}  from './type'
import {inject,computed} from "vue";

defineOptions({
  name: 'KCollapseItem'
})
const props =defineProps<CollapseItemProps>()

const collapseContent = inject(CollapseContentKey)

//判断内容是否打开，包含props.name说明打开
const isActive = computed(() => collapseContent?.activeName.value.includes(props.name))

//判断disabled
const handleClick = ()=>{
  //若有禁用，则不触发事件
  if(props.disabled) {return}
  collapseContent?.handleClickItem(props.name)
}

</script>

<style scoped>
.k-collapseItem__header {
  font-size: 18px;
  color: red;
  border: 1px solid cornflowerblue;
  &:hover {
    cursor: pointer;
  }
}
</style>