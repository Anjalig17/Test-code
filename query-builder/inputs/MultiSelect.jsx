import React from 'react';
export default function MultiSelect({options=[],selected=[],onChange}){
  const toggle=(o)=> selected.includes(o) ? onChange(selected.filter(x=>x!==o)) : onChange([...selected,o]);
  return <div className='multiselect'>
    {options.map(o=> <label key={o} className='multiselect-item'>
      <input type='checkbox' checked={selected.includes(o)} onChange={()=>toggle(o)}/><span>{o}</span>
    </label>)}
  </div>;
}
