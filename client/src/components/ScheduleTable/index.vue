 <script setup>
  import WeekTitle from './WeekTitle';
  import DurationTitle from './DurationTitle';
  import ScheduleCard from './ScheduleCard.vue';
  import MyForm from './MyForm';
  import './styles/index.scss';
  import { 
    h,
    onMounted, 
    toRefs,
  } from 'vue';

  import { getInitialData, updateSchedule } from './scripts/service';
  import { useInitialData, useFormData, setSchedule } from './scripts/hooks';
  import { checkHasData } from './scripts/utils';
  import MyMessageBox from '../MyMessageBox';

  const [ data, setInitialData ] = useInitialData();
  const [ setFormData ] = useFormData();

  onMounted(async () => {
    const {
      duration,
      schedule,
      course,
      teacher
    } = await getInitialData();


    setInitialData({
      duration,
      schedule,
      course,
      teacher
    });
  });

  const {
    duration,
    schedule,
    course,
    teacher,
    formData
  } = toRefs(data);

  /**
   * 
   * @param {begin_time： 时间段} beginTime 
   * @param {weekDay：周几} weekDay 
   * 
   * 通过 传入参数确定 单元格位置
   * 
   */
  const handlerTdClick = (beginTime, weekDay) => {

    // 从 schedule 中获取 beginTime_weekday 数据
    // 如果存在数据 则是修改数据， 否则新增数据
    const scheduleData = data.schedule[`${beginTime}_${weekDay}`];

    // 动态渲染组件
    MyMessageBox({
      title: checkHasData(scheduleData),
      btnCancelText: '取消',
      btnConfirmText: '提交',
      insert: h(MyForm, {
        scheduleData,
        weekDay,
        beginTime,
        course: data.course,
        teacher: data.teacher,
        onFormUpdate (info) {
          setFormData(info);
        },
      }),
      async confirm () {
        if (Object.keys(data.formData).length === 0) {
          setFormData({
            begin_time: beginTime,
            weekDay: weekDay,
            course: data.course[0].name,
            teacher: data.teacher[0].name
          });
        } 

        const res = await updateSchedule({
          data: data.formData
        });

        setSchedule({ ...res });
        setFormData({});
      },
      cancel () {}
    })
  }
 </script>
 
 <template>
  <div class="schedule-table">
    <table border="1" cellpadding="0">
      <WeekTitle />
      <tr 
        v-for="item of duration"
        :key="item.begin_time"
      >
        <DurationTitle :title="item.title"/>
        <td 
          v-for="n in 7" 
          :key="n"
          @click="handlerTdClick(item.begin_time, n)"
        >
          <ScheduleCard 
            v-if="schedule[item.begin_time + '_' + n]"
            :data="schedule[item.begin_time + '_' + n]"
          />
        </td>
      </tr>
    </table>
  </div>
 </template>
 
 <style lang="scss" scoped>
 
 </style>