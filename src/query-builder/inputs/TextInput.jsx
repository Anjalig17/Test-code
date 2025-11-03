
import React from "react";
import TagInput from "./TagInput";
export default function TextInput({ node, onUpdate }){
  const { op, value = "" } = node;
  if (op === "IN"){
    const arr = Array.isArray(value) ? value : [];
    return <TagInput values={arr} onChange={(vals)=>onUpdate({...node, value: vals})} placeholder="Add value…"/>;
  }
  return <input type="text" value={typeof value==='string'? value: ''} onChange={e=>onUpdate({...node, value:e.target.value})}/>;
}
