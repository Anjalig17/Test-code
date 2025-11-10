import React,{useState} from 'react';
export default function TagInput({values=[],onChange,placeholder='Add…'}){
  const [val,setVal]=useState('');
  const add=()=>{ const v=val.trim(); if(!v) return; onChange([...(values||[]), v]); setVal(''); };
  const remove=(x)=> onChange((values||[]).filter(v=>v!==x));
  return (<span className='tags'>
    {(values||[]).map(v=> <span key={v} className='tag'>{v}<b className='tag-remove' onClick={()=>remove(v)}>×</b></span>)}
    <input className='input' value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=> e.key==='Enter' && add()} placeholder={placeholder}/>
  </span>);
}
