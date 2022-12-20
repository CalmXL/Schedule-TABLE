<script setup>
  import './styles/duration-title.scss';

  const props = defineProps({
    title: String
  });
</script>

<template>
  <td class="duration-title">{{ title }}</td>
</template>

<style lang="scss" scoped>

</style>