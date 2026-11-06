import test from 'node:test';
import assert from 'node:assert/strict';
import { createTimeline } from '../src/scripts/timeline.mjs';
const counts=[1,1,5,3,2,1];
const timeline=createTimeline(counts);

test('every direct card link lands in a stationary reading interval',()=>{
 timeline.anchors.forEach((anchors,stop)=>anchors.forEach((time,card)=>{
  const frame=timeline.sample(time);
  assert.equal(frame.kind,'hold');assert.equal(frame.stop,stop);assert.equal(frame.card,card);
 }));
});
test('cards turn within a stop; travel begins only after its last card',()=>{
 const flips=timeline.segments.filter(s=>s.kind==='flip');
 assert.equal(flips.length,counts.reduce((n,count)=>n+count-1,0));
 flips.forEach(s=>assert.ok(s.card<counts[s.stop]-1));
 const travel=timeline.segments.filter(s=>s.kind==='travel');
 assert.equal(travel.length,counts.length-1);
 travel.forEach(s=>assert.equal(s.card,counts[s.stop]-1));
});
test('forward and reverse scrolling have continuous, deterministic boundaries',()=>{
 let previousStop=0;
 for(let time=0;time<timeline.duration;time+=.013){
  const frame=timeline.sample(time);assert.ok(frame.stop>=previousStop);previousStop=frame.stop;
  assert.ok(frame.progress>=0&&frame.progress<=1);
 }
 for(let i=timeline.segments.length-1;i>0;i--){
  const segment=timeline.segments[i],previous=timeline.segments[i-1];
  assert.equal(previous.end,segment.start);
  assert.equal(timeline.sample(segment.start).kind,segment.kind);
  assert.equal(timeline.sample(segment.start-.00001).kind,previous.kind);
 }
});
test('scroll extremes clamp to the first and last cards',()=>{
 assert.equal(timeline.sample(-100).progress,0);
 const end=timeline.sample(timeline.duration+100);
 assert.equal(end.stop,counts.length-1);assert.equal(end.card,0);assert.equal(end.kind,'hold');assert.equal(end.progress,1);
});
