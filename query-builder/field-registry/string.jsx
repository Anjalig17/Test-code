import React from 'react';
import TagInput from '../inputs/TagInput.jsx';
export default { render: ({ node, onUpdate }) => {
  const op = node.operator;
  if (op === 'IN'){
    const arr = Array.isArray(node.value) ? node.value : [];
    return <TagInput values={arr} onChange={vals=>onUpdate({ ...node, value: vals })} placeholder="Add value…"/>;
  }
  if (op === 'CONTAINS'){
    return <input className="input" type="text" placeholder="contains…" value={node.value || ''} onChange={e=>onUpdate({ ...node, value: e.target.value })}/>;
  }
  return <input className="input" type="text" value={node.value || ''} onChange={e=>onUpdate({ ...node, value: e.target.value })}/>;
}};
