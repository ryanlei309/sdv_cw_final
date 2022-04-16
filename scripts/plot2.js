// Reference: https://vizhub.com/curran/2546209d161e4294802c4ac0098bebc2?edit=files&file=index.js
// https://www.youtube.com/watch?v=0vKYFsTLtbA&t=901s
// https://www.youtube.com/watch?v=xFI-us1moj0
const {
    select,
    csv,
    scaleLinear,
    scaleOrdinal,
    extent,
    axisLeft,
    axisBottom,
    line,
    curveBasis,
    nest,
    schemeCategory10,
    group
  } = d3
  
import { colorLegend } from './colorLegend.js';

// Reference: https://vizhub.com/curran/2546209d161e4294802c4ac0098bebc2?edit=files&file=index.js

// const colorLegend = (selection, props) => {
//     const {
//         colorScale,
//         circleRadius,
//         spacing,
//         textOffset
//     } = props;

//     const groups = selection.selectAll('g')
//         .data(colorScale.domain());
//     const groupsEnter = groups
//         .enter().append('g')
//         .attr('class', 'tick');
//     groupsEnter
//         .merge(groups)
//         .attr('transform', (d, i) =>
//             `translate(0, ${i * spacing})`
//         );
//     groups.exit().remove();

//     groupsEnter.append('circle')
//         .merge(groups.select('circle'))
//         .attr('r', circleRadius)
//         .attr('fill', colorScale);

//     groupsEnter.append('text')
//         .merge(groups.select('text'))
//         .text(d => d)
//         .attr('dy', '0.32em')
//         .attr('x', textOffset)
// };

const width = 600, height = 450

const svg = d3.select("svg#line-chart")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)

const render = data => {
    const xValue = d => d.days;
    const xAxisLabel = 'Days';

    const yValue = d => d.accumulate_region;
    const yAxisLabel = 'Accumulated regions'

    const colorValue = d => d.clade;

    const margin = { top: 60, right: 220, bottom: 88, left: 105};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top -  margin.bottom;

    const xScale = scaleLinear()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
      .nice()
      .tick(5) // testing;

    const colorScale = scaleOrdinal(schemeCategory10);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(5); // 10

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', -65)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 80)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);

    const lineGenerator = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveBasis);

    const nested = nest()
      .key(d => d.clade)
      .entries(data);

    colorScale.domain(nested.map(d => d.key));

    g.selectAll('.line-path').data(nested)
     .enter().append('path')
      .attr('class', 'line-path')
      .attr('d', d => lineGenerator(d.values))
      .attr('stroke', d => colorScale(d.key));

    g.append('text')
      .attr('class', 'title')
      .attr('y', -10);

    svg.append('g')
      .attr('transform', `translate(790,121)`)
      .call(colorLegend, {
        colorScale,
        circleRadius: 13,
        spacing: 30,
        textOffset: 15
      });
};

csv('datasets/plot2.csv').then(data => {
    data.forEach(d => {
        d.accumulate_region = +d.accumulate_region;
        d.days = +d.days;
    });
    render(data);
});

