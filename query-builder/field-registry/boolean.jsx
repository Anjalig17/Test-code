import React from 'react';
export default { render: ({ node, onUpdate }) => {
  const v = node.value === true ? 'true' : 'false';
  return (
    <select className="input" value={v} onChange={e=>onUpdate({ ...node, value: e.target.value === 'true' })}>
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  );
}};
