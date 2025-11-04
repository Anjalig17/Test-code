import React from 'react';
import AttributeNode from './AttributeNode.jsx';
import OperatorPill from './shared/OperatorPill.jsx';

export default function GroupNode({ node, depth, fieldMap, typeOps, onUpdate }){
  const indent = depth * 20;
  const children = node.children || [];
  const hasParenthesisRail = children.length > 1;
  const railColor = node.logical === 'AND' ? 'var(--and)' : 'var(--or)';
  const railLeft = depth === 0 ? 8 : 28;

  const setChild = (i, updated) => {
    const next = { ...node, children: [...children] };
    next.children[i] = updated;
    onUpdate(next);
  };

  return (
    <div style={{ marginLeft: indent }}>
      <div className="qb-group-tail">
        {hasParenthesisRail && <div className="rail" style={{ left: railLeft, backgroundColor: railColor }} />}

        {children.map((child, i) => (
          <React.Fragment key={child.id || i}>
            {child.type === 'group' ? (
              <GroupNode node={child} depth={depth + 1} fieldMap={fieldMap} typeOps={typeOps} onUpdate={(u)=> setChild(i, u)} />
            ) : (
              <AttributeNode node={child} depth={depth + 1} parentLogical={node.logical} fieldMap={fieldMap} schemaOps={typeOps} onUpdate={(u)=> setChild(i, u)} />
            )}
            {i < children.length - 1 && <OperatorPill op={node.logical} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
