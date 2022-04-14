import { select, csv } from "d3";

const svg = select("svg#bar-chart");

const width = +svg.attr('width');
const height = +svg.attr('height');

csv('plot3.csv').then(data => {
    console.log(data);
});



    //現在這個 promise就是不知道什麼時候執行，架構就是你先把promise裡面的東西建構好
    // 把data 傳到variable以後，