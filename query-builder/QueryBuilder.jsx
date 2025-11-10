import React, { useMemo } from 'react';
import GroupNode from './GroupNode.jsx';

/** Visual renderer for the nested tree. Structural edits happen in Pills. */
export default function QueryBuilder({ fields, schema, tree, onPatchAttribute }){
  const fieldMap = useMemo(()=> {
    const m = new Map();
    fields.forEach(f => m.set(f.key, f));
    return m;
  }, [fields]);

  if (!tree) return null;

  return (
    <div>
      <GroupNode
        node={tree}
        depth={0}
        fieldMap={fieldMap}
        typeOps={schema.fieldTypes}
        onPatch={onPatchAttribute}
      />
    </div>
  );
}
