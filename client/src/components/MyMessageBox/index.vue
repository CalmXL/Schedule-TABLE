<script setup>
  import { reactive } from 'vue';
  import MyButton from '../MyButton';
  import './index.scss';

    // title: '删除课程',
  //     btnCancelText: '取消',
  //     btnConfirmText: '确定',
  //     insert: h ('p', '确定要删除此课程表安排吗'),
  //     // insert: h(MyForm, {})
  //     confirm () {
  //       console.log('Confirm');
  //     },
  //     cancel () {
  //       console.log('Cancel');
  //     }
  const props = defineProps({
    id: Number,
    title: {
      type: String,
      default: 'MessageBox'
    },

    btnCancelText: {
      type: String,
      default: 'Cancel'
    },
    btnConfirmText: {
      type: String,
      default: 'Confirm'
    },
    insert: Object
  });

  const state = reactive({
    visible: false,
    type: 'CONFIRM',
    id: props.id
  })

  const handleCancelClick = () => {
    state.type = 'CANCEL';
    setVisible(false);
  }

  const handleConfirmClick = () => {
    state.type = 'CONFIRM';
    setVisible(false);
  }

  const setVisible = (isVisible) => {
    state.visible = isVisible;
  }

  defineExpose({
    state,
    setVisible
  })
</script>

<template>
  <transition name="messagebox-fade">
    <div class="message-box" v-if="state.visible">
      <div class="wrapper">
        <header class="box-hd">
          <h1>{{ title }}</h1>
        </header>
        <div class="box-board"> 
          <component :is="insert"></component>
          <div class="btn-group">
            <my-button type="default" @click="handleCancelClick">{{ btnCancelText }}</my-button>
            <my-button type="primary" @click="handleConfirmClick">{{ btnConfirmText }}</my-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
</style>