
import React, { useState } from "react";
export default function TagInput({ values, onChange, placeholder, type='text' }){
  const [val, setVal] = useState('');
  const add = () => { const v = val.trim(); if(!v) return; onChange([...(values||[]), v]); setVal(''); };
  const remove = (x) => onChange((values||[]).filter(v => v !== x));
  return (
    <span style={{display:'inline-flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
      {(values||[]).map(v=> <span key={v} style={{background:'#eef2ff',border:'1px solid #c7d2fe',borderRadius:8,padding:'2px 6px',fontSize:12}}>{v} <b style={{cursor:'pointer'}} onClick={()=>remove(v)}>×</b></span>)}
      <input type={type} value={val} placeholder={placeholder||'Add and press Enter'} onChange={e=>setVal(e.target.value)} onKeyDown={e=> e.key==='Enter' && add() }/>
    </span>
  );
}
