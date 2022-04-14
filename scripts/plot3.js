import { select, csv } from 'd3';
const w = 920, h = 450
const svg = select("svg#bar-chart");

const width = +svg.attr('width', w);
const height = +svg.attr('height', h);

const render = data => {
    const xScale = scaleLinear()
      .domain([0, max(data, d => d.duration_days)]);

    console.log(xScale.domain());

    svg.selectAll('rect').data(data)
      .enter().append('rect')
        .attr('width', 300)
        .attr('height', 300)
};

csv('datasets/plot3.csv').then(data => {
    data.forEach(d => {
        d.duration_days = +d.duration_days;
    });
    render(data);
});


