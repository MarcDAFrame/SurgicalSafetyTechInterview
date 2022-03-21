import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useD3 } from './hooks'
import * as d3 from 'd3';


const levelColors = [
  '#226578',
  '#315f63',
  '#704261',
  'purple',
  'yellow'
]

const data = [
  { 'start_time': 0, 'end_time': 50, 'level': 0 },
  { 'start_time': 20, 'end_time': 60, 'level': 1 },
  { 'start_time': 30, 'end_time': 35, 'level': 2 },
  { 'start_time': 55, 'end_time': 100, 'level': 0 },
  { 'start_time': 56, 'end_time': 80, 'level': 2 },
  { 'start_time': 60, 'end_time': 101, 'level': 1 },
  { 'start_time': 80, 'end_time': 100, 'level': 2 }
]


const startTimes = data.map((d) => d['start_time'])
const endTimes = data.map((d) => d['end_time'])
const levels = data.map((d) => d['level'])

const minX = Math.min(...startTimes)
const maxX = Math.max(...endTimes)
const maxY = Math.max(...levels)
const xScale = d3.scaleLinear().domain([minX, maxX]).range([0, 100]);


function App() {
  const ref = useD3((svg) => {

    // Render: levels
    svg.selectAll('svg')
    .append('g')

    .data(levels)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', (d)=>{
      return d * 100 / (maxY + 1)
    })
    .attr('width', 100)
    .attr('height', 80 / (maxY + 1))
    .attr('fill', '#2c323d')



    // Render: individual timeline elements
    svg
      .selectAll('svg')
      .append('g')
      .data(data)
      .enter()
      .append('rect')

      .attr('x', (d) => {
        console.log(d, xScale(d.start_time))
        return xScale(d.start_time)
      })
      .attr('y', (d) => {
        return ((d.level * 100) / (maxY + 1)) + 3
      })
      .attr('width', (d) => {
        return xScale(d.end_time - d.start_time - 1)
      })
      .attr('height', 60 / (maxY + 1))
      .attr('fill', (d) => {
        return levelColors[d.level]
      })
      .attr('rx', '2px')

  })
  return (
    <div className="App">
      <svg
        ref={ref}
        style={{
          height: 250,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
          backgroundColor: "#181923"
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <g />
      </svg>
    </div>
  )
}

export default App
