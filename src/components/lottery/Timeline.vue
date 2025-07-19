<template>
    <!-- <div ref="timelineContainer" class="timeline-container" @wheel="onWheel"></div> -->
    <div></div>
  </template>
  
  <script lang="ts" setup>
  // import { onMounted, ref } from 'vue'
  // import * as PIXI from 'pixi.js'
  
  // const timelineContainer = ref()
  
  // // Constants
  // const SLOT_WIDTH = 100
  // const TRACK_HEIGHT = 60
  // const MAX_TRACKS = 3
  // const VISIBLE_SLOTS = 100
  
  // let scrollOffset = 0
  // let stage, renderer, ticker
  
  // // Mock events
  // const events = [
  //   { start: 5, end: 10, title: 'Alpha' },
  //   { start: 7, end: 9, title: 'Bravo' },
  //   { start: 12, end: 15, title: 'Charlie' },
  //   { start: 10, end: 20, title: 'Delta' },
  // ]
  
  // function getX(slotIndex) {
  //   return (slotIndex - scrollOffset) * SLOT_WIDTH
  // }
  
  // function drawTimeline() {
  //   stage.removeChildren()
  //   drawSlots()
  //   placeEvents()
  // }
  
  // function drawSlots() {
  //   const g = new PIXI.Graphics()
  //   const textStyle = new PIXI.TextStyle({ fill: '#999', fontSize: 14 })
  
  //   for (let i = scrollOffset; i < scrollOffset + VISIBLE_SLOTS; i++) {
  //     const x = getX(i)
  
  //     g.lineStyle(1, 0xcccccc)
  //     g.moveTo(x, 0)
  //     g.lineTo(x, TRACK_HEIGHT * MAX_TRACKS)
  
  //     const label = new PIXI.Text(`Day ${i}`, textStyle)
  //     label.x = x + 5
  //     label.y = 2
  //     stage.addChild(label)
  //   }
  
  //   stage.addChild(g)
  // }
  
  // function placeEvents() {
  //   const tracks = [[], [], []]
  
  //   for (const event of events) {
  //     for (let track = 0; track < MAX_TRACKS; track++) {
  //       const overlapping = tracks[track].some(
  //         e => !(event.end < e.start || event.start > e.end)
  //       )
  
  //       if (!overlapping) {
  //         tracks[track].push(event)
  //         drawEvent(event, track)
  //         break
  //       }
  //     }
  //   }
  // }
  
  // function drawEvent(event, trackIndex) {
  //   const x = getX(event.start)
  //   const width = (event.end - event.start + 1) * SLOT_WIDTH
  //   const y = trackIndex * TRACK_HEIGHT + 20
  
  //   const g = new Graphics()
  //   g.beginFill(0x3399ff)
  //   g.drawRoundedRect(x + 2, y, width - 4, 30, 6)
  //   g.endFill()
  
  //   const text = new Text(event.title, { fill: 'white', fontSize: 12 })
  //   text.x = x + 10
  //   text.y = y + 6
  
  //   stage.addChild(g)
  //   stage.addChild(text)
  // }
  
  // function onWheel(e) {
  //   scrollOffset += e.deltaY > 0 ? 1 : -1
  //   if (scrollOffset < 0) scrollOffset = 0
  //   drawTimeline()
  // }
  
  // onMounted(() => {
  //   const width = timelineContainer.value.clientWidth
  //   const height = TRACK_HEIGHT * MAX_TRACKS + 40
  
  //   renderer = new PIXI.Renderer({
  //     width,
  //     height,
  //     backgroundAlpha: 0,
  //     antialias: true,
  //   })
  
  //   stage = new PIXI.Container()
  //   ticker = new PIXI.Ticker()
  //   ticker.add(() => {
  //     renderer.render(stage)
  //   })
  //   ticker.start()
  
  //   timelineContainer.value.appendChild(renderer.view)
  
  //   drawTimeline()
  // })
  </script>
  
  <style scoped>
  .timeline-container {
    width: 100%;
    height: 220px;
    overflow: hidden;
    background: #f7f7f7;
    border: 1px solid #ddd;
    position: relative;
  }
  </style>
  