// 候選人票數
var vote = ['30','50','100','20']

// 繪製SVG
d3.select('.list ')
    .selectAll('li')
    .data(vote)
    .enter()
    .append('li')
    .text(function(d){
  return d;
})