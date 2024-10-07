<template>
  <div>
    <h3>{{user.name}} == {{user.age}}</h3>
    <h4 v-show="isShow">{{doubleAge}}岁</h4>
    <button type="button" @click="hiddenAge">{{!isShow ? '显示' : '隐藏'}}年龄</button>

  </div>

</template>

<script setup lang="ts">
import {computed, defineProps,PropType,defineEmits} from "vue";
import {ref} from "vue";
const isShow = ref(true)
interface person{
  name:string,
  age:number
}
interface emitType{
  (e:'changeUserInfo',hidden:boolean):void
}
const props = defineProps({
  user:{
    type:Object as PropType< person>,
    required:true
  },
})


const doubleAge = computed(()=>{
  return props.user.age*2
})

const emit = defineEmits<emitType>()
const hiddenAge = ()=>{
  isShow.value = !isShow.value
  emit('changeUserInfo',isShow.value)
}
</script>

<style scoped>

</style>