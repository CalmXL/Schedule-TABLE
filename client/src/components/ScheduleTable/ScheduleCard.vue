<script setup>
  import { computed, h, toRefs } from 'vue';
  import './styles/schedule-card.scss';

  import MyMessageBox from '../MyMessageBox';
  import { removeSchedule } from './scripts/service';

  import {
    weekdayToChinese,
    timestampToTime
  } from './scripts/utils';
import { setSchedule } from './scripts/hooks';

  const props = defineProps({
    data: Object
  })

  const weekDay = computed(() => weekdayToChinese(+props.data.weekDay));
  const beginTime = computed(() => timestampToTime(props.data.begin_time));

  const {
    course,
    teacher,
  } = toRefs(props.data);

  const removeCard = (id) => {
    // 打开 messageBox
    MyMessageBox({
      id: id,
      title: '删除课程',
      btnCancelText: '取消',
      btnConfirmText: '确定',
      insert: h ('p', '确定要删除此课程表安排吗'),
      async confirm (id) {
        const res = await removeSchedule(id);
        setSchedule({ ... res });
      },
      cancel () {
        console.log('Cancel');
      }
    })
  }

</script>

<template>
  <div class="schedule-card">
    <i 
      class="icon"
      @click.stop="removeCard(data.id)"
    >&times</i>
    <p>{{ beginTime }} - {{ weekDay }}</p>
    <p>『{{ course }}』</p>
    <p>{{ teacher }}</p>
  </div>
</template>

<style lang="scss" scoped>

</style>