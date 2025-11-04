import React from 'react';
import MultiSelect from '../inputs/MultiSelect.jsx';
export default { render: ({ node, onUpdate, field }) => {
  const op = node.operator;
  const opts = field?.options || [];
  if (op === 'IN'){
    const arr = Array.isArray(node.value) ? node.value : [];
    return <MultiSelect options={opts} selected={arr} onChange={vals=>onUpdate({ ...node, value: vals })}/>;
  }
  return (
    <select className="input" value={typeof node.value === 'string' ? node.value : ''} onChange={e=>onUpdate({ ...node, value: e.target.value })}>
      <option value="">Select…</option>
      {opts.map(o=> <option key={o} value={o}>{o}</option>)}
    </select>
  );
}};
