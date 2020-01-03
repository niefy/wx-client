export default function datetimeFormat(time, fmt='yyyy-MM-dd HH:mm:ss') {//时间格式化
  var date = new Date(time);
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

export function getCurrentWeekMonday() {
  //一天的毫秒数
  const millisecond = 1000 * 60 * 60 * 24;
  //获取当前时间
  let currentDate = new Date();
  //获取本周一的一个时间
  let currentMonday = currentDate.getTime() - (currentDate.getDay() - 1) * millisecond;
  return new Date(currentMonday);
}

/**
 * 获取下一个工作日
 * @param time 开始时间
 */
export function getNextWeekDay(time) {
  let date = new Date(time);//开始时间
  let day=date.getDay();//星期几,0-6
  //一天的毫秒数
  const millisecond = 1000 * 60 * 60 * 24;
  let nextWeekDay;
  if(day<5){//周天、周一到周四都加一天
    nextWeekDay=date.getTime()+millisecond;
  }else if(day==5){//周五加三天
    nextWeekDay=date.getTime()+millisecond*3;
  }else{//周六加两天
    nextWeekDay=date.getTime()+millisecond*2;
  }
  return new Date(nextWeekDay);
}
