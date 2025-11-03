
import React from "react";
export default function MultiSelect({ options=[], selected=[], onChange }){
  const toggle=(o)=> selected.includes(o) ? onChange(selected.filter(x=>x!==o)) : onChange([...selected,o]);
  return <span style={{display:'inline-flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
    {options.map(o=> <label key={o} style={{display:'inline-flex',gap:6,alignItems:'center',fontSize:12}}>
      <input type="checkbox" checked={selected.includes(o)} onChange={()=>toggle(o)}/>{o}
    </label>)}
  </span>;
}
