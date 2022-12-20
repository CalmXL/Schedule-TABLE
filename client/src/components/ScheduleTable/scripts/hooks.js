import { reactive } from "vue";

const data = reactive({
  schedule: [],
  duration: [],
  course: [],
  teacher: [],
  formData: []
});

export function useInitialData () {
  function setInitialData ({
    duration,
    schedule,
    course,
    teacher
  }) {
    data.duration = duration;
    data.course = course;
    data.schedule = schedule;
    data.teacher = teacher;
  }

  return [ data, setInitialData] 
}


export function setSchedule ({ type, result }) {
  const { course, teacher, begin_time, weekDay } = result;
  const mark = begin_time + '_' + weekDay;
  const target = data.schedule[mark];

  switch (type) {
    case 'EDIT':
      target.course = course;
      target.teacher = teacher;
      break;
    case 'ADD': 
      data.schedule[mark] = result;
      break;
    case 'REMOVE': 
      delete data.schedule[mark];
      break;
    default: 
      break; 
  }
}

export function useFormData () {
  

  function setFormData (item) {
    data.formData = item;
  }

  return [ setFormData ]
}

export function useCardData () {

  let cardData = reactive({
    id: 0,
    begin_time: 0,
    duration: null,
    course: null,
    teacher: null,
  });

  function setCardData ({
    id,
    begin_time,
    duration,
    course,
    teacher
  }) {
    cardData.id = id;
    cardData.begin_time = begin_time;
    cardData.duration = duration;
    cardData.course = course;
    cardData.teacher = teacher;
  }

  return [ cardData, setCardData ];
}