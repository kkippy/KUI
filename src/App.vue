

<template>
  <header>
    <Tooltip ref="tooltipRef" placement="right" trigger="click"  :open-delay="1000" :close-delay="1000">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      <template #content>
        <h2>hello world</h2>
      </template>
    </Tooltip>

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
import {ref,onMounted}  from  "vue"
import type {ButtonInterface} from "@/components/Button/type"
import type {Options} from "@popperjs/core";

const buttonRef = ref<ButtonInterface | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const options:Partial<Options> = {
  placement:'bottom',
  strategy:'fixed'
}

const openValue = ref(['1'])

const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

onMounted(()=>{

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
