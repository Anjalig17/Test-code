import React, { useMemo } from 'react';
import { getRendererAndOps } from './field-registry/index.js';

const BORDER_COLORS = { AND: 'var(--and)', OR: 'var(--or)' };

export default function AttributeNode({ node, depth, parentLogical, fieldMap, schemaOps, onUpdate }){
  const indent = depth * 20;
  const field = fieldMap.get(node.field) || { type: node.fieldType || 'string' };
  console.log("field", field, schemaOps);

  const { Renderer, operators } = useMemo(() => getRendererAndOps(field, schemaOps), [field, schemaOps]);
  const showOperatorDropdown = (operators || []).length > 1;

  const onFieldChange = (e) => {
    const key = e.target.value;
    const meta = fieldMap.get(key) || { type: 'string' };
    const allowed = meta.operators || schemaOps[meta.type] || ['='];
    const firstOp = allowed[0] || '=';
    onUpdate({ ...node, field:key, fieldType: meta.type, operator:firstOp, value: defaultValueFor(firstOp, meta.type) });
  };

  const onOperatorChange = (e) => {
    const op = e.target.value;
    onUpdate({ ...node, operator: op, value: defaultValueFor(op, node.fieldType || field.type) });
  };

  const resetValue = () => {
    onUpdate({ ...node, value: defaultValueFor(node.operator, node.fieldType || field.type) });
  };

  return (
    <div className="qb-attr card" style={{ marginLeft: indent, borderLeftColor: BORDER_COLORS[parentLogical] }}>
      <div className="qb-attr-row">
        <select className="input" value={node.field} onChange={onFieldChange}>
          {[...fieldMap.values()].map(f => <option key={f.key} value={f.key}>{f.key}</option>)}
        </select>

        {showOperatorDropdown && (
          <select className="input" value={node.operator} onChange={onOperatorChange}>
            {operators.map(op => <option key={op}>{op}</option>)}
          </select>
        )}

        <Renderer node={node} onUpdate={onUpdate} field={field} />

        <button className="qb-close" title="Reset value" onClick={resetValue}>×</button>
      </div>
    </div>
  );
}

function defaultValueFor(operator, type){
  if (operator === 'BETWEEN') return ['',''];
  if (operator === 'IN') return [];
  if (type === 'boolean') return false;
  return '';
}
