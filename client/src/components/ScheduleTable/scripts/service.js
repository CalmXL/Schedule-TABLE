import {
  httpGet,
  httpPost
} from '../../../libs/http';
import { formDataSchedule } from './utils';

export async function getInitialData () {
  const {
    schedule,
    course,
    duration,
    teacher
  } = await httpGet('/initial_data');

  return Promise.resolve({
    schedule: formDataSchedule(schedule),
    course,
    duration,
    teacher
  });
}

export async function updateSchedule (data) {
  const res = await httpPost('/update_schedule', data);
  
  return Promise.resolve(res);
}

export async function removeSchedule (id) {
  const res = await httpPost('/remove_schedule', { id });

  return Promise.resolve(res);
}