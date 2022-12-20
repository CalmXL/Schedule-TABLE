# 课程表 

1. 课程 => 点击单元格 => 新增课程 / 编辑课程 => 课程/老师 

2. 数据
  - 周数据
    {
      title: 周一
      id: 1
    }
  - 时间段
    {
      title: '08:00 - 08:50',
      "begin_time": timeStamp
    }

    time_Stamp_id: 唯一标识 => 周 + 时间段 确定坐标
  - 课程数据
    {
      id: 1,
      name: '语文'
    }
  - 老师数据
    {
      id: 1,
      name: '李老师'
    }
  - 计划数据
    {
      id,
      begin_time,
      course,
      teacher,
      weekday
    }

    策略模式：

    {
      "begin_time-weekday": {
        id,
        begin_time,
        course,
        teacher,
        weekday
      }
    }