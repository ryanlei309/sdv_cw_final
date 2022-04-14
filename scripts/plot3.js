// Reference: https://www.youtube.com/watch?v=NlBt-7PuaLk&list=WL&index=11&t=15s
// import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom, format} from 'd3';
const w = 920, h = 450
const xAxisLabelText = 'Days';


const svg = d3.select("svg#bar-chart");

const width = +svg.attr('width', w);
const height = +svg.attr('height', h);

const render = data => {
    const xValue = d => d.duration_days;
    const yValue = d => d.clade;
    const margin = { top: 20, right: 40, bottom: 20, left: 100};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    const yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisBottom(xScale))
      .attr('transform', `translate(0, ${innerHeight})`);

    g.selectAll('rect').data(data)
      .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth());
};

d3.csv('datasets/plot3.csv').then(data => {
    data.forEach(d => {
        d.duration_days = +d.duration_days;
    });
    render(data);
});


