/*
 * @Author: your name
 * @Date: 2021-08-31 18:00:58
 * @LastEditTime: 2021-09-06 12:05:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \呼吸之友\miniprogram\utils\getCurrentTime.js
 */
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
   }
    
   function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
   }
   function formatTimeTwo(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
    for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
   }
    
   const getWeekByDate = dates => {
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    let date = new Date(dates);
    date.setDate(date.getDate());
    let day = date.getDay();
    return show_day[day];
   }
    
   module.exports = {
    formatTime: formatTime,
    formatTimeTwo: formatTimeTwo,
    getWeekByDate: getWeekByDate
   }