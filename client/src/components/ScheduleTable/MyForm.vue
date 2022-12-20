<script setup>
  import './styles/my-form.scss';
  import { computed, reactive } from 'vue';
  import {
    timestampToTime,
    weekdayToChinese
  } from './scripts/utils';

  import MySelector from '../MySelector';

  const emit = defineEmits(['formUpdate'])

  const {
    weekDay,
    beginTime,
    scheduleData,
    course,
    teacher
  } = defineProps({
    weekDay: Number,
    beginTime: Number,
    scheduleData: Object,
    course: Array,
    teacher: Array
  });

  const _weekDay = computed(() => weekdayToChinese(weekDay));
  const _beginTime = computed(() => timestampToTime(beginTime));
  const _course = scheduleData ? scheduleData.course : course[0].name;
  const _teacher = scheduleData ? scheduleData.teacher : teacher[0].name;

  const state = reactive({
    course: _course,
    teacher: _teacher
  });

  /**
   * formUpdate
   *  {
   *    beginTime,
   *    weekDay,
   *    course,
   *    teacher
   * }
   *  
   */
  const courseUpdate = (course) => {
    state.course = course;

    formEmit();
  }

  const teacherUpdate = (teacher) => {
    state.teacher = teacher;

    formEmit();
  }

  const formEmit = () => {
    emit('formUpdate', {
      begin_time: beginTime,
      weekDay: weekDay,
      course: state.course,
      teacher: state.teacher
    });
  }

</script>

<template>
  <div class="my-form"> 
    <h1>{{ _weekDay }} {{  _beginTime }}</h1>
    <div class="selector-group">
      <MySelector 
        :data="course"
        text-key="name"
        :default-value="_course"
        @update="courseUpdate"
      />
      <MySelector 
        :data="teacher"
        text-key="name"
        :default-value="_teacher"
        @update="teacherUpdate"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>