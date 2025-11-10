import React from 'react';

/**
 * Pills are the structural source of truth.
 * - Add/remove attributes & set AND/OR.
 * - If last attribute removed -> show placeholder pill to force a new attribute.
 * - Cards only patch attribute values/operators by id (no structural edits here).
 */
export default function Pills({ flat, fields, onChange }){
  const fieldKeys = fields.map(f => f.key);

  const setLogicalAt = (i, logical) => {
    onChange(flat.map((t,idx)=> idx===i ? { ...t, logical } : t));
  };

  const changeFieldAt = (i, field) => {
    onChange(flat.map((t,idx)=> idx===i ? { ...t, field } : t));
  };

  const changeOperatorAt = (i, operator) => {
    onChange(flat.map((t,idx)=> idx===i ? { ...t, operator } : t));
  };

  const removeAttributeAt = (i) => {
    const next = [...flat];

    // remove adjacent logical to avoid dangling
    if (next[i+1]?.type === 'logical') next.splice(i+1,1);
    else if (next[i-1]?.type === 'logical') next.splice(i-1,1);

    next.splice(i,1);

    // ensure at least one condition placeholder
    if (!next.some(t => t.type === 'attribute')){
      next.push({ type:'placeholder' });
    }
    onChange(next);
  };

  const addAttributeAfter = (i = flat.length - 1) => {
    const next = [...flat];
    let insertAt = Math.max(0, i + 1);
    if (next[insertAt-1]?.type === 'attribute'){
      next.splice(insertAt, 0, { type:'logical', logical:'AND' });
      insertAt++;
    }
    next.splice(insertAt, 0, {
      type: 'attribute',
      id: makeId(),
      field: fieldKeys[0] || 'status',
      operator: '=',
      value: ''
    });
    onChange(next);
  };

  const replacePlaceholder = (i, field) => {
    const next = [...flat];
    next[i] = {
      type: 'attribute',
      id: makeId(),
      field: field || fieldKeys[0] || 'status',
      operator: '=',
      value: ''
    };
    onChange(next);
  };

  return (
    <div className="pills-bar">
      {flat.map((t,i) => {
        if (t.type === 'open') return <span key={i} className="pill">({t.logical})</span>;
        if (t.type === 'close') return <span key={i} className="pill">)</span>;
        if (t.type === 'logical') return (
          <span key={i} className="pill pill-logic">
            <select className="input" value={t.logical} onChange={e=>setLogicalAt(i, e.target.value)}>
              <option>AND</option><option>OR</option>
            </select>
          </span>
        );
        if (t.type === 'attribute') return (
          <span key={t.id || i} className="pill">
            <select className="input" value={t.field} onChange={e=>changeFieldAt(i, e.target.value)}>
              {fieldKeys.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <select className="input" value={t.operator} onChange={e=>changeOperatorAt(i, e.target.value)}>
              <option>=</option><option>!=</option><option>&gt;</option><option>&gt;=</option>
              <option>&lt;</option><option>&lt;=</option><option>IN</option><option>BETWEEN</option>
              <option>CONTAINS</option><option>STARTS_WITH</option><option>ENDS_WITH</option>
            </select>
            <span className="x" title="Remove" onClick={()=>removeAttributeAt(i)}>×</span>
          </span>
        );
        if (t.type === 'placeholder') return (
          <span key={'ph'+i} className="pill placeholder-pill">
            <span>Add condition:</span>&nbsp;
            <select className="input" onChange={e=>replacePlaceholder(i, e.target.value)} defaultValue="">
              <option value="" disabled>Select field…</option>
              {fieldKeys.map(k=> <option key={k} value={k}>{k}</option>)}
            </select>
          </span>
        );
        return null;
      })}
      <button className="btn" onClick={()=>addAttributeAfter()}>+ Add Attribute</button>
    </div>
  );
}

function makeId(){
  try { return crypto.randomUUID(); }
  catch { return 'id_' + Math.random().toString(36).slice(2,10); }
}
