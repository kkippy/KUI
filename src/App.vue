

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <Button ref="buttonRef" type="success">Test Button</Button>
    <Button ref="buttonRef" type="warning">Test Button</Button>
    <Button ref="buttonRef" type="primary">Test Button</Button>
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
      {{openValue}}
    </Collapse>
  </main>
</template>

<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import Collapse from "@/components/collapse/Collapse.vue"
import CollapseItem from "@/components/collapse/CollapseItem.vue"
import {ref,onMounted}  from  "vue"
import type {ButtonInterface} from "@/components/button/type"
const buttonRef = ref<ButtonInterface | null>(null)

const openValue = ref(['1'])
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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
