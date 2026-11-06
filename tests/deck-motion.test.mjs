import test from 'node:test';
import assert from 'node:assert/strict';
import {deckPose} from '../src/scripts/deck-motion.mjs';

test('the front card rejoins the back; every card remains in the stack',()=>{
 const count=5;
 for(let top=0;top<count-1;top++){
  const end=Array.from({length:count},(_,i)=>deckPose(i,top,count,1));
  const next=Array.from({length:count},(_,i)=>deckPose(i,top+1,count,0));
  const ordering=poses=>poses.map((p,i)=>({z:p.z,i})).sort((a,b)=>b.z-a.z).map(p=>p.i);
  assert.deepEqual(ordering(end),ordering(next));
  assert.equal(ordering(end).at(-1),top);
  end.forEach((pose,i)=>{assert.ok(Math.abs(pose.y-next[i].y)<1e-8);assert.ok(Math.abs(pose.scale-next[i].scale)<1e-8);});
 }
});
test('layer ordering stays unambiguous through forward and reverse turns',()=>{
 for(const p of [0,.1,.49,.5,.51,.9,1]){
  const poses=Array.from({length:5},(_,i)=>deckPose(i,2,5,p));
  assert.equal(new Set(poses.map(p=>p.z)).size,5);
  poses.forEach(pose=>assert.ok(Object.values(pose).every(v=>typeof v==='boolean'||Number.isFinite(v))));
 }
});
