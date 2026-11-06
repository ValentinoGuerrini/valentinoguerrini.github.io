const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
/** A cyclic stack: the outgoing front card turns edge-on, then settles behind the last card. */
export function deckPose(index,top,count,progress){
 const depth=(index-top+count)%count;
 const p=Math.max(0,Math.min(1,progress));
 if(depth===0&&p>0){
  const returning=smooth((p-.5)*2),arc=Math.sin(Math.PI*p);
  return {x:74*arc,y:-22*arc+(count-1)*8*returning,scale:1-(count-1)*.022*returning,
   turn:180*p,tilt:-4*arc,z:p<.5?40:40-count+1,back:p>=.5};
 }
 const level=Math.max(0,depth-smooth(p));
 return {x:0,y:level*8,scale:1-level*.022,turn:0,tilt:0,z:(p>=.5?41:40)-depth,back:depth>0&&!(depth===1&&p>.08)};
}
