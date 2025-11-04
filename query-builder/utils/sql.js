export function toSql(tree, fields){
  const fieldMap = new Map(fields.map(f=>[f.key,f]));
  const quote = (fieldKey, value) => {
    const type = fieldMap.get(fieldKey)?.type;
    if (Array.isArray(value)){
      return value.map(v => type==='number' ? String(v) : `'${String(v).replace(/'/g, "''")}'`).join(', ');
    }
    if (type === 'number') return String(value ?? '');
    if (type === 'boolean') return value ? 'TRUE' : 'FALSE';
    return `'${String(value ?? '').replace(/'/g, "''")}'`;
  };

  function buildAttribute(n){
    const op = n.operator || '=';
    if (op === 'IN') return `${n.field} IN (${quote(n.field, n.value || [])})`;
    if (op === 'BETWEEN'){ const [a='',b='']=Array.isArray(n.value)?n.value:['','']; return `${n.field} BETWEEN ${quote(n.field,a)} AND ${quote(n.field,b)}`; }
    if (op === 'CONTAINS'){ const s = String(n.value || ''); return `${n.field} LIKE '%${s.replace(/'/g, "''")}%'`; }
    return `${n.field} ${op} ${quote(n.field, n.value)}`;
  }

  function buildGroup(g, isRoot=false){
    const parts = (g.children || []).map(buildNode).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0]; // collapse single-child groups
    const joined = parts.join(` ${g.logical} `);
    return isRoot ? joined : `(${joined})`;
  }

  function buildNode(n){
    if (!n) return '';
    if (n.type === 'group') return buildGroup(n);
    if (n.type === 'attribute') return buildAttribute(n);
    return '';
  }

  return buildGroup(tree, true);
}
