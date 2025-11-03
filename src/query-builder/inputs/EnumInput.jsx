
import React from "react";
import MultiSelect from "./MultiSelect";
export default function EnumInput({ node, field, onUpdate }){
  const { op, value = "" } = node;
  const opts = field?.options || [];
  if (op === "IN"){
    const arr = Array.isArray(value) ? value : [];
    return <MultiSelect options={opts} selected={arr} onChange={(vals)=>onUpdate({...node, value: vals})}/>;
  }
  return (
    <select value={typeof value==='string'? value: ''} onChange={e=>onUpdate({...node, value:e.target.value})}>
      <option value="">Select…</option>
      {opts.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  );
}
