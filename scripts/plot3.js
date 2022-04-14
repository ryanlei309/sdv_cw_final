// Reference: https://www.youtube.com/watch?v=NlBt-7PuaLk&list=WL&index=11&t=15s
import { select, csv, scaleLinear, max, scaleBand} from 'd3';
const w = 920, h = 450
const svg = select("svg#bar-chart");

const width = +svg.attr('width', w);
const height = +svg.attr('height', h);

const render = data => {
    const xScale = scaleLinear()
      .domain([0, max(data, d => d.duration_days)])
      .range([0, width]);

    const yScale = scaleBand()
      .domain(data.map(d => d.clade))
      .range([0, height]);

    console.log(xScale.range());

    svg.selectAll('rect').data(data)
      .enter().append('rect')
        .attr('y', d => yScale(d.clade))
        .attr('width', d => xScale(d.duration_days))
        .attr('height', yScale.bandwidth())
};

csv('datasets/plot3.csv').then(data => {
    data.forEach(d => {
        d.duration_days = +d.duration_days;
    });
    render(data);
});


