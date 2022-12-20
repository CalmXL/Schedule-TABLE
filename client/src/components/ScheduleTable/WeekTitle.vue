<script setup>
  import weekDay from '../../config/week';
  import './styles/week-title.scss';


</script>

<template>
  <tr>
    <th></th>
    <th 
      v-for="item of weekDay"
      :key="item.id"
      class="week-title"
    >
      {{ item.weekday }}
    </th>
  </tr>
</template>

<style lang="scss" scoped>

</style>