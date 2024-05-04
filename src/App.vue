<template>
  <div>
    <HelloWorld msg="Hello Cypress" />
    <Wizard />
    <Description />
  </div>
</template>

<script>
import Wizard from "@/components/Wizard.vue";
import Description from "@/components/Description.vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  components: {
    Wizard,
    Description,
    HelloWorld,
  },
};
</script>
