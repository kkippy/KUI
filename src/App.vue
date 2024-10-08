

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <Button ref="buttonRef" type="success">Test Button</Button>
    <Button ref="buttonRef" type="warning">Test Button</Button>
    <Button ref="buttonRef" type="primary">Test Button</Button>
    <Button ref="buttonRef" plain>Test Button</Button>
    <Button ref="buttonRef" size="large">Test Button</Button>
  </main>
</template>

<script setup lang="ts">
import Button from "@/button/Button.vue";
import {ref,onMounted}  from  "vue"
import type {ButtonInterface} from  "@/button/type"
const buttonRef = ref<ButtonInterface | null>(null)

onMounted(()=>{
  if(buttonRef.value){
    console.log('buttonRef',buttonRef.value.ref)
  }
})
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
