import React from 'react';
import AttributeNode from './AttributeNode.jsx';
import OperatorPill from './shared/OperatorPill.jsx';

const EDGE_COLOR = { AND: 'var(--and)', OR: 'var(--or)' };

/**
 * One group of children.
 * - Draw a vertical rail only if there are at least 2 children (true parentheses).
 * - Each child's left border color == connector that leads to that child.
 */
export default function GroupNode({ node, depth, fieldMap, typeOps, onPatch }){
  const indent = depth * 20;
  const children = node.children || [];
  const connectors = Array.isArray(node.connectors) ? node.connectors : [];

  const hasRail = children.length > 1;
  const railLeft = depth === 0 ? 8 : 28;

  return (
    <div style={{ marginLeft: indent }}>
      <div className="qb-group-tail">
        {hasRail && (
          <div
            className="rail"
            style={{
              left: railLeft,
              backgroundColor: EDGE_COLOR[connectors[1] || node.logical || 'AND']
            }}
          />
        )}

        {children.map((child, i) => {
          const edgeLogical = i === 0 ? (node.logical || 'AND') : (connectors[i] || node.logical || 'AND');
          const isGroup = Array.isArray(child.children) && child.children.length > 0;

          return (
            <React.Fragment key={child.id || i}>
              {isGroup ? (
                <GroupNode
                  node={child}
                  depth={depth + 1}
                  fieldMap={fieldMap}
                  typeOps={typeOps}
                  onPatch={onPatch}
                />
              ) : (
                <AttributeNode
                  node={child}
                  depth={depth + 1}
                  edgeLogical={edgeLogical}
                  fieldMap={fieldMap}
                  schemaOps={typeOps}
                  onPatch={onPatch}
                />
              )}
              {i < children.length - 1 && <OperatorPill op={edgeLogical} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
