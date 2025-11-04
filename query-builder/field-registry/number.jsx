import React from 'react';
import TagInput from '../inputs/TagInput.jsx';
export default { render: ({ node, onUpdate }) => {
  const op = node.operator;
  if (op === 'BETWEEN'){
    const [a='',b='']=Array.isArray(node.value)?node.value:['',''];
    return <span className="range-input">
      <input className="input" type="number" placeholder="Min" value={a} onChange={e=>onUpdate({ ...node, value:[e.target.value,b] })}/>
      <span className="range-separator">to</span>
      <input className="input" type="number" placeholder="Max" value={b} onChange={e=>onUpdate({ ...node, value:[a,e.target.value] })}/>
    </span>;
  }
  if (op === 'IN'){
    const arr = Array.isArray(node.value) ? node.value : [];
    return <TagInput values={arr} onChange={vals=>onUpdate({ ...node, value: vals })} placeholder="Add number…"/>;
  }
  return <input className="input" type="number" value={node.value ?? ''} onChange={e=>onUpdate({ ...node, value: e.target.value })}/>;
}};
