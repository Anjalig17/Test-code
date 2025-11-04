import React, { useEffect, useMemo, useState } from 'react';
import GroupNode from './GroupNode.jsx';
import { addMissingIds } from './utils/ids.js';

/** Normalize for rendering + SQL:
 *  1) ids on every node
 *  2) collapse groups with a single child
 */
function normalize(tree){
  const withIds = addMissingIds(tree);
  return collapseSingles(withIds);
}

function collapseSingles(n){
  if (!n) return null;
  if (n.type === 'group'){
    const next = { ...n, children: (n.children || []).map(collapseSingles).filter(Boolean) };
    if (next.children.length === 1) return next.children[0];
    return next;
  }
  return n;
}

export default function QueryBuilder({ fields, schema, value, onChange }){
  const [tree, setTree] = useState(normalize(value));

  useEffect(()=> setTree(normalize(value)), [value]);

  const fieldMap = useMemo(()=> {
    const m = new Map(); fields.forEach(f => m.set(f.key, f)); return m;
  }, [fields]);

  const update = (next) => {
    const normalized = normalize(next);
    setTree(normalized);
    onChange?.(normalized);
  };

  if (!tree || tree.type !== 'group') return null;

  return (
    <div>
      <GroupNode node={tree} depth={0} fieldMap={fieldMap} typeOps={schema.fieldTypes} onUpdate={update} />
      <div className="card">
        <h4>Query JSON</h4>
        <pre>{JSON.stringify(tree, null, 2)}</pre>
      </div>
    </div>
  );
}
