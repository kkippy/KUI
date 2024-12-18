<template>
  <header>
    <Dropdown
        ref="tooltipRef"
        placement="right"
        trigger="click"
        @visible-change = "e => console.log(e)"
        @select-change = "e => console.log(e)"
        manual
        :menu-option="option">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </Dropdown>

  </header>

  <main>
    <Button ref="buttonRef" type="success" @click="open">打开tooltip</Button>
    <Button ref="buttonRef" type="warning" @click="close">关闭tooltip</Button>
    <Button ref="buttonRef" type="primary">Test Button</Button>
    <Button ref="buttonRef" type="warning" loading >loading</Button>
    <Button ref="buttonRef" type="primary" icon="arrow-up">Test Button</Button>
    <Collapse v-model="openValue" accordion>
      <CollapseItem  name="1">
        <template #title>
          哈哈哈哈
        </template>
        <div>第一个的内容</div>
      </CollapseItem>

      <CollapseItem  name="2">
        <template #title>
          第二个标题
        </template>
        <div>第二个的内容</div>
      </CollapseItem>

      <CollapseItem title="test2" name="2" disabled>
        <template #title>
          第二个
        </template>
      </CollapseItem>
    </Collapse>
    <Icon icon="poo" type="primary" />
  </main>
</template>

<script setup lang="ts">
import Button from "@/components/Button/Button.vue";
import Collapse from "@/components/Collapse/Collapse.vue"
import Icon from "@/components/Icon/icon.vue"
import CollapseItem from "@/components/Collapse/CollapseItem.vue"
import Tooltip from "./components/Tooltip/tooltip.vue"
import type {TooltipInstance} from "@/components/Tooltip/type";
import type {MenuOption} from "@/components/Dropdown/type";
import {ref,onMounted,h}  from  "vue"
import type {ButtonInterface} from "@/components/Button/type"
import type {Options} from "@popperjs/core";
import Dropdown from "@/components/Dropdown/Dropdown"
import {createMessages} from "@/components/Message/methods"

const buttonRef = ref<ButtonInterface | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const option:MenuOption[] = [
    {
      label: "选项1",
      key: "1",
    },
    {
      label: "选项2",
      key: "2",
      disabled:true
    },
    {
      label: "选项3",
      key: "3",
      divided:true
    },
    {
      label: h('h2','this is bold'),
      key: "4",
    },
    {
      label: "选项5",
      key: "5",
    },
    {
      label: "选项6",
      key: "6",
    }
]

const openValue = ref(['1'])

const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

onMounted(()=>{
  createMessages({content: 'hello world 111', duration:0, type:'success'})
  const instance1 = createMessages({content: 'hello world 222', duration:0,type:'error'})
  createMessages({content: 'hello world 333', duration:2000, type:'warning'})

  setTimeout(()=>{
    instance1.destroy()
  },5000)
})
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  border: 1px solid red;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
