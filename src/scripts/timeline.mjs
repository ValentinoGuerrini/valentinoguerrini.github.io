/** @typedef {{kind:'hold'|'flip'|'travel',start:number,end:number,stop:number,card:number}} Segment */
/** @param {number[]} counts */
export function createTimeline(counts) {
 /** @type {Segment[]} */
 const segments=[];
 /** @type {number[][]} */
 const anchors=[];
 let time=0;
 /** @param {Segment['kind']} kind @param {number} duration @param {number} stop @param {number} card */
 const add=(kind,duration,stop,card)=>{segments.push({kind,start:time,end:time+duration,stop,card});time+=duration;};
 counts.forEach((count,stop)=>{
  anchors[stop]=[];
  for(let card=0;card<count;card++){
   anchors[stop].push(time+.02);
   add('hold',card===0?.56:.48,stop,card);
   if(card<count-1)add('flip',.64,stop,card);
  }
  if(stop<counts.length-1)add('travel',.92,stop,count-1);
 });
 const duration=time;
 /** @param {number} t */
 function sample(t){
  const clamped=Math.max(0,Math.min(duration,t));
  const segment=segments.find(s=>clamped<s.end)||segments[segments.length-1];
  return {...segment,progress:Math.max(0,Math.min(1,(clamped-segment.start)/(segment.end-segment.start)))};
 }
 return {segments,anchors,duration,sample};
}
