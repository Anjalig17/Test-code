
import React from "react";
import TagInput from "./TagInput";
export default function NumberInput({ node, onUpdate }){
  const { op, value = "" } = node;
  if (op === "BETWEEN"){
    const [a="",b=""] = Array.isArray(value) ? value : ["",""];
    return (
      <span>
        <input type="number" value={a} placeholder="Min" onChange={e=>onUpdate({...node, value:[e.target.value,b]})}/> 
        &nbsp;to&nbsp; 
        <input type="number" value={b} placeholder="Max" onChange={e=>onUpdate({...node, value:[a,e.target.value]})}/>
      </span>
    );
  }
  if (op === "IN"){
    const arr = Array.isArray(value) ? value : [];
    return <TagInput values={arr} onChange={(vals)=>onUpdate({...node, value: vals})} placeholder="Add number…" type="number" />;
  }
  return <input type="number" value={typeof value==='string'||typeof value==='number'? value: ''} onChange={e=>onUpdate({...node, value:e.target.value})}/>;
}
