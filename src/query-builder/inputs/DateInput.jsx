
import React from "react";
export default function DateInput({ node, onUpdate }){
  const { op, value = "" } = node;
  if (op === "BETWEEN"){
    const [a="",b=""] = Array.isArray(value) ? value : ["",""];
    return (
      <span>
        <input type="date" value={a} onChange={e=>onUpdate({...node, value:[e.target.value,b]})}/>
        &nbsp;to&nbsp;
        <input type="date" value={b} onChange={e=>onUpdate({...node, value:[a,e.target.value]})}/>
      </span>
    );
  }
  return <input type="date" value={typeof value==='string'? value: ''} onChange={e=>onUpdate({...node, value:e.target.value})}/>;
}
