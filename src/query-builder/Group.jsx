import React from 'react';
import Attr from './Attr';
const colors={AND:'#16a34a',OR:'#f59e0b'};

export default function Group({node,depth,fields,schema,onUpdate,showRail,parentColor}){
 const indent=depth*20;
 const kids=node.children||[];
 const multi=kids.length>1;
 const update=(i,u)=>{
  const arr=[...kids];
  if(u===null) arr.splice(i,1); else arr[i]=u;
  onUpdate({...node,children:arr});
 };
 return <div style={{marginLeft:indent,position:'relative'}}>
  {multi && showRail && <div className="rail" style={{backgroundColor:parentColor}}/>}
  {kids.map((c,i)=><React.Fragment key={i}>
    {c.type==='group'?
      <Group node={c} depth={depth+1} fields={fields} schema={schema}
        onUpdate={u=>update(i,u)}
        showRail={true} parentColor={colors[node.op]}/>:
      <Attr node={c} depth={depth+1} fields={fields} schema={schema}
        onUpdate={u=>update(i,u)} parentOp={node.op}/>}
    {i<kids.length-1 && <span className={"pill "+node.op.toLowerCase()}>{node.op}</span>}
  </React.Fragment>)}
 </div>;
}
