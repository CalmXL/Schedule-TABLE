<script setup>

import './index.scss';
import { reactive, toRefs } from 'vue';

// @update="courseUpdate"
  const {
    data,
    textKey,
    defaultValue
  } = defineProps({
    data: Array,
    textKey: String,
    defaultValue: String,
  });

  const state = reactive({
    selectedValue: defaultValue || data[0][textKey],
    visible: false
  });



  const emit = defineEmits(['update']);
  const {
    selectedValue,
    visible
  } = toRefs(state);

  const setVisible = (isVisible) => {
    state.visible = isVisible;
  }

  const showOptionsList = () => {
    setVisible(!state.visible);
  }

  const selectValue = (item) => {
    state.selectedValue = item[textKey];
    setVisible(false);

    emit('update', state.selectedValue);
  }
</script>

<template>
  <div class="my-selector">
    <div 
      class="selected-value"
      @click="showOptionsList"  
    >{{ selectedValue }}</div>
    <div 
      class="option-list"
      v-if="visible"  
    >
      <a href="javascript:;"
        v-for="item of data"
        :key="item.id"
        @click="selectValue(item)"
        class="list-item"
      >
        {{ item[textKey] }}
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>