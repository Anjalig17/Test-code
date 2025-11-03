
import React from "react";
export default function BooleanInput({ node, onUpdate }){
  const v = node.value===true ? "true" : "false";
  return (
    <select value={v} onChange={e=>onUpdate({...node, value: e.target.value==='true'})}>
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  );
}
