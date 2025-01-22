<template>
  <div
   class="k-select"
   :class="{
    'is-disabled':disabled
   }"
   @click="toggleDropdown"
  >
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltipRef"
    >
      <Input
          v-model="status.inputValue"
          :disabled="disabled"
          :placeholder="placeholder"
      />

      <template #content>
        <ul class="k-select__menu">
          <template v-for="(item,index) in options" :key="index">
            <li class="k-select__menu-item"
                :class="{
                  'is-disabled':item.disabled,
                  'is-selected':item.value === status.selectedOption?.value
                }"
                :id="`select-item-${item.value}`"
                @click.stop="itemSelect(item)"
            >
              {{item.label}}
            </li>
          </template>
        </ul>
      </template>

    </Tooltip>

  </div>
</template>

<script setup lang="ts">
import {ref,reactive} from "vue"
import type {Ref} from "vue"
import type {SelectProps, SelectOption,SelectEmits, SelectStatus} from "./type"
import type {TooltipInstance} from "@/components/Tooltip/type";
import Input from "@/components/Input/Input.vue"
import Tooltip from "@/components/Tooltip/tooltip.vue"

const findOption = (value:string) => {
  const option = props.options.find(item => item.value === value)
  return option ? option : null
}

defineOptions({
    name:"KSelect"
})
const props = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
//记录选择了哪一个选项
const status = reactive<SelectStatus>({
  inputValue:initialOption ? initialOption.label :'',
  selectedOption:initialOption
})
const tooltipRef = ref() as Ref<TooltipInstance>
const isDropdownShow = ref(false)


const controlDropdown = (show:boolean) => {
  if(show){
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
  }
  isDropdownShow.value = show
  emits('visible-change',show)
}


const toggleDropdown = () => {
  if(props.disabled) return
  if(isDropdownShow.value) {
    //如果当前是展示状态，则点击后隐藏
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}

const itemSelect = (e:SelectOption) => {
  if(e.disabled)  return

  status.inputValue = e.label
  status.selectedOption = e
  emits('update:modelValue',e.value as string)
  emits('change',e.value  as string)
  controlDropdown(false)
  console.log(1)

}



</script>

<style scoped>


</style>
