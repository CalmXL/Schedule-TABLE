const express = require('express');
const bodyParser = require('body-parser');
const {
  readFileSync,
  writeFileSync
} = require('fs');

const { resolve } = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');

  next();
});


const duration = readFile ('./data/duration.json');
const course = readFile('./data/course.json');
const teacher = readFile('./data/teacher.json');

function readFile (url) {
  return JSON.parse(readFileSync(resolve(__dirname, url), 'utf-8') || '[]');
}

function writeFile (url, data) {
  writeFileSync(resolve(__dirname, url), JSON.stringify(data));
}

app.get('/initial_data', (req, res) => {
  const schedule = readFile('./data/schedule.json');

  res.json({
    code: 0,
    msg: 'ok',
    data: {
      schedule,
      duration,
      course,
      teacher
    }
  });
});

app.post('/update_schedule', (req, res) => {
  const {
    begin_time,
    weekDay,
    course,
    teacher
  } = req.body.data;

  const schedule = readFile('./data/schedule.json');

  const item = schedule.find(item => item.begin_time == begin_time && item.weekDay == weekDay);

  let type = '';
  let result = null;
  
  if (item) {
    // 更新
    item.course = course;
    item.teacher = teacher;
    type = 'EDIT';
    result = item;
  } else {
    // 新增
    let lastIndex = schedule.length - 1 ;
    result = {
      id: ++ lastIndex,
      begin_time,
      weekDay,
      course,
      teacher
    }
    schedule.push(result); 
    type = 'ADD';
  }

  writeFile('./data/schedule.json', schedule);

  console.log(result);
  res.json({
    code: 0,
    msg: 'ok',
    data: {
      type,
      result
    }
  });
});

app.post('/remove_schedule', (req, res) => {
  const id = req.body.id;
  let result = null;
  const schedule = readFile('./data/schedule.json');


  result = schedule.find(item => item.id == id)
  const newSchedule = schedule.filter(item => item.id != id);

  writeFile('./data/schedule.json', newSchedule);

  res.json({
    code: 0,
    msg: 'ok',
    data: {
      type: 'REMOVE',
      result
    }
  })
})


// 监听
app.listen(3000, () => {
  console.log('ok');
})