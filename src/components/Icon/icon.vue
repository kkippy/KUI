<template>
  <i
      class="k-icon"
      :class="{[`k-icon--${type}`]:type}"
      :style="customStyle"
      v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filteredProps"></font-awesome-icon>
  </i>

</template>

<script setup lang="ts">
import type {IconProps} from './type'
import {omit} from "lodash-es";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed} from "vue";

const props = defineProps<IconProps>()
// 过滤掉type和color这两个自定义属性,结合计算属性得到实时的剩余属性
const filteredProps =computed(()=> omit(props,['type','color']))
// 自定义样式
const customStyle = computed(()=>{
  return props.color? {color:props.color} : {}
})
defineOptions({
  name: 'kIcon',
  inheritAttrs: false//阻止透传
})
</script>

<style scoped>

</style>
