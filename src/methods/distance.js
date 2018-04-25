'use strict';


// 获取两点之间的距离
function GetDistance(lat1, lng1, lat2, lng2) {
  let radLat1 = Rad(lat1);
  let radLat2 = Rad(lat2);
  let a = radLat1 - radLat2;
  let b = Rad(lng1) - Rad(lng2);
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里
  s=s.toFixed(2);
  return s;
}

// 经纬度转换成三角函数中度分表形式。
function Rad(d) {
  return d * Math.PI / 180.0;
}


module.exports = {
  GetDistance
};
