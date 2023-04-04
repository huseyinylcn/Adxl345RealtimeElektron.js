const { ipcRenderer } = require("electron");

const data = [];
const margin = { top: 40, right: 20, bottom: 30, left: 50 }
const width = 900 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const svg = d3.select('#box').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('class', 'chart-container')
    .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('text')
    .attr('class','baslık')
    .text('Kanal 1 (X)')
    .attr('y',-10)
    .attr('font-size', '23px')
    .attr('fill', 'black');

   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 0)
   .attr('y1', 60)
   .attr('x2', width)
   .attr('y2', 60)

   
   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 0)
   .attr('y1', 130)
   .attr('x2', width)
   .attr('y2', 130)

   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 0)
   .attr('y1', 200)
   .attr('x2', width)
   .attr('y2', 200)

   
   // Dikey çizgi
   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 70)
   .attr('y1', 0)
   .attr('x2', 70)
   .attr('y2', height)
 
   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 140)
   .attr('y1', 0)
   .attr('x2', 140)
   .attr('y2', height)

   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 210)
   .attr('y1', 0)
   .attr('x2', 210)
   .attr('y2', height)

   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 280)
   .attr('y1', 0)
   .attr('x2', 280)
   .attr('y2', height)
  
   
   
   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 350)
   .attr('y1', 0)
   .attr('x2', 350)
   .attr('y2', height)
 
   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 420)
   .attr('y1', 0)
   .attr('x2', 420)
   .attr('y2', height)

   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 490)
   .attr('y1', 0)
   .attr('x2', 490)
   .attr('y2', height)
   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 560)
   .attr('y1', 0)
   .attr('x2', 560)
   .attr('y2', height)
   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 630)
   .attr('y1', 0)
   .attr('x2', 630)
   .attr('y2', height)
   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 700)
   .attr('y1', 0)
   .attr('x2', 700)
   .attr('y2', height)
   
   svg.append('line')
   .attr('class', 'izgara')
   .attr('x1', 770)
   .attr('y1', 0)
   .attr('x2', 770)
   .attr('y2', height)
   
   svg.append('rect')
.attr('class', 'rectt')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
const y = d3.scaleLinear()
.range([height, 0]);

const yAxis = d3.axisLeft(y)
    .tickSize(0)

svg.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);

   var yine =  svg.append('path')

   ipcRenderer.on('grafikx',(err,daaat)=>{

      // Rastgele bir veri üretin ve veri dizisine ekleyin.
      
      data.push(daaat);
  
      // Ölçekleri güncelleyin.
      y.domain([d3.min(data) - 70, d3.max(data) + 70]);
      svg.select('.y-axis').call(yAxis);
  
  const line = d3.line()
      .x((d, i) => (i * 1.1) + 0.4)
      .y(d => y(d))
      .curve(d3.curveCatmullRom)
  
  
  
     yine
      .datum(data)
      .attr('class', 'grafik')
  
      
      .attr('d', line);
  
      if(data.length >750){
          data.shift()
      }


})



