import React from 'react';
import NumberInput from "./inputs/NumberInput.jsx";
import TextInput from "./inputs/TextInput.jsx";
import BooleanInput from "./inputs/BooleanInput.jsx";
import EnumInput from "./inputs/EnumInput.jsx";
const colors={AND:'#16a34a',OR:'#f59e0b'};

export default function Attr({node,depth,fields,schema,onUpdate,parentOp}){
  const indent=depth*20;
  const field=fields.find(f=>f.key===node.field)||fields[0];
  const type=field.type;
  const ops=field.operators||schema.fieldTypes[type]||["="];
  const op=node.op||ops[0];
  const val=node.value;

  const onField=(e)=>{
    const f=fields.find(x=>x.key===e.target.value);
    const o=(f.operators||schema.fieldTypes[f.type]||["="])[0];
    let v = (o==='BETWEEN')?['','']:(o==='IN')?[]:(f.type==='boolean'?false:'');
    onUpdate({type:'attribute',field:f.key,fieldType:f.type,op:o,value:v});
  };

  const onOp=(e)=>{
    const o=e.target.value;
    let v = (o==='BETWEEN')?['','']:(o==='IN')?[]:(type==='boolean'?false:'');
    onUpdate({...node, op:o, value:v});
  };

  const input = type==='number' ? <NumberInput node={{...node, op}} onUpdate={onUpdate}/> :
                type==='string' ? <TextInput node={{...node, op}} onUpdate={onUpdate}/> :
                type==='boolean'? <BooleanInput node={{...node, op}} onUpdate={onUpdate}/> :
                type==='enum'   ? <EnumInput node={{...node, op}} field={field} onUpdate={onUpdate}/> :
                type==='date'   ? <NumberInput node={{...node, op}} onUpdate={onUpdate}/> : null;

  return (
    <div className="qb-attr card" style={{marginLeft:indent,borderLeftColor:colors[parentOp]}}>
      <select value={field.key} onChange={onField}>{fields.map(f=><option key={f.key} value={f.key}>{f.key}</option>)}</select>
      <select value={op} onChange={onOp}>{ops.map(o=><option key={o}>{o}</option>)}</select>
      {type==='date' ? (
        // Reuse NumberInput structure for BETWEEN but render as date: handled by DateInput ideally
        // Simple single-date input for non-BETWEEN; BETWEEN uses min/max
        <span>
          {op==='BETWEEN' ? (
            <span>
              <input type="date" value={Array.isArray(val)?(val[0]||''):''} onChange={e=>onUpdate({...node, value:[e.target.value, Array.isArray(val)?(val[1]||''):'']})}/>
              &nbsp;to&nbsp;
              <input type="date" value={Array.isArray(val)?(val[1]||''):''} onChange={e=>onUpdate({...node, value:[Array.isArray(val)?(val[0]||''):'', e.target.value]})}/>
            </span>
          ) : (
            <input type="date" value={typeof val==='string'?val:''} onChange={e=>onUpdate({...node, value:e.target.value})}/>
          )}
        </span>
      ) : input}
    </div>
  );
}
