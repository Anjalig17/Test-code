import React from 'react';
export default { render: ({ node, onUpdate }) => {
  const op = node.operator;
  if (op === 'BETWEEN'){
    const [a='',b='']=Array.isArray(node.value)?node.value:['',''];
    return <span className="range-input">
      <input className="input" type="date" value={a} onChange={e=>onUpdate({ value:[e.target.value,b] })} />
      <span className="range-separator">to</span>
      <input className="input" type="date" value={b} onChange={e=>onUpdate({ value:[a,e.target.value] })} />
    </span>;
  }
  return <input className="input" type="date" value={typeof node.value === 'string' ? node.value : ''} onChange={e=>onUpdate({ value: e.target.value })} />;
}};
