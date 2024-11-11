<template>
  <div class="k-collapse">
    <slot>{{activeName}}</slot>

  </div>
</template>

<script setup lang="ts">
import { ref,provide,watch} from 'vue'
import type {NameType,CollapseEmits,CollapseProps} from './type'
import {CollapseContentKey}  from './type'

defineOptions({
  name: 'KCollapse'
})
const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmits>()
const activeName = ref<NameType[]>(props.modelValue)

//监听props传递到本地的ref的变化并及时更新activeName
watch(()=> props.modelValue,()=>{
  activeName.value = props.modelValue
})

if(props.accordion && activeName.value.length > 1){
  alert('accordion模式下，最多只能展开一个item')
}

const handleClickItem = (item:NameType)=>{
  if(props.accordion){
    // 如果展开的item和点击的item相同，则关闭(即清空数组)
    activeName.value = [activeName.value[0] === item ? '' : item]
  } else {
    const index = activeName.value.indexOf(item)//判断当前点击的item是否在展开的item中
    if(index > -1){ //如果存在则删除相应的一项
      activeName.value.splice(index,1)
    }else{
      activeName.value.push(item)
    }
  }

  emit('update:modelValue',activeName.value)
  emit('change',activeName.value)
}

//因为使用的是插槽，所以父子通信只能使用provide/inject
provide(CollapseContentKey,{
  activeName,
  handleClickItem
})

</script>

<style scoped>

</style>