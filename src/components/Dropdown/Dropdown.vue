<template>
  <div class="k-dropdown">
    <Tooltip
        :close-delay="0"
        :open-delay="0"
        :trigger="trigger"
        :transition="transition"
        :placement="placement"
        @visible-change="visibleChange"
        ref="tooltipRef"

    >
      <slot />
<!--      菜单内容-->
      <template #content>
        <ul class="k-dropdown__menu">
          <template v-for="item in menuOption" :key="item.key">
<!--            每一项的横线,separator为视觉分隔符-->
            <li
              v-if="item.divided"
              class="k-dropdown__divided"
              role="separator"
            />
            <li
              class="k-dropdown__item"
              :class="{'is-disabled':item.disabled,'is-divided':item.divided}"
              :id="`dropdown-item-${item.key}`"
              @click="handleClick(item)"
            >
              <renderVNode :vNode="item.label" />
            </li>
          </template>
        </ul>
      </template>

    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type {dropdownProps,DropdownEmits,DropdownInstance,MenuOption} from "./type"
import renderVNode from "@/components/Tooltip/RenderVnode";
import Tooltip from "@/components/Tooltip/tooltip.vue"
import type {TooltipInstance} from "@/components/Tooltip/type";
import {ref} from "vue";

defineOptions({
  name:'KDropdown'
})

const tooltipRef = ref<TooltipInstance | null>(null)
const props = withDefaults(defineProps<dropdownProps>(),{
  trigger:"hover",
  hideAfterClick:true,
})

const emit = defineEmits<DropdownEmits>()

const visibleChange = (e:boolean) => {
  emit("visible-change",e)
}
const handleClick = (e:MenuOption) => {
  if (e.disabled) return
  emit('select-change', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

defineExpose({
  hide:()=>{
    tooltipRef.value?.hide
  },
  show:()=>{
    tooltipRef.value?.show
  }
})

</script>

