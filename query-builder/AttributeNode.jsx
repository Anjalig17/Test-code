import React, { useMemo } from 'react';
import { getRendererAndOps } from './field-registry/index.js';

const EDGE_COLOR = { AND: 'var(--and)', OR: 'var(--or)' };

/** Attribute card. */
export default function AttributeNode({ node, depth, edgeLogical, fieldMap, schemaOps, onPatch }){
  const indent = depth * 20;
  const field = fieldMap.get(node.field) || { type: node.fieldType || 'string' };
  const { Renderer, operators } = useMemo(() => getRendererAndOps(field, schemaOps), [field, schemaOps]);

  const showOperatorDropdown = (operators || []).length > 1;

  const onFieldChange = (e) => {
    const key = e.target.value;
    const meta = fieldMap.get(key) || { type: 'string' };
    const allowed = meta.operators || schemaOps[meta.type] || ['='];
    const firstOp = allowed[0] || '=';
    onPatch(node.id, { field: key, operator: firstOp, value: defaultValueFor(firstOp, meta.type) });
  };

  const onOperatorChange = (e) => {
    const op = e.target.value;
    onPatch(node.id, { operator: op, value: defaultValueFor(op, node.fieldType || field.type) });
  };

  const resetValue = () => {
    onPatch(node.id, { value: defaultValueFor(node.operator, node.fieldType || field.type) });
  };

  return (
    <div className="qb-attr card" style={{ marginLeft: indent, borderLeftColor: EDGE_COLOR[edgeLogical] }}>
      <div className="qb-attr-row">
        <select className="input" value={node.field} onChange={onFieldChange}>
          {[...fieldMap.values()].map(f => <option key={f.key} value={f.key}>{f.key}</option>)}
        </select>

        {showOperatorDropdown && (
          <select className="input" value={node.operator} onChange={onOperatorChange}>
            {operators.map(op => <option key={op}>{op}</option>)}
          </select>
        )}

        <Renderer node={node} onUpdate={(partial)=> onPatch(node.id, partial)} field={field} />
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
