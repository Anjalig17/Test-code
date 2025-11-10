export function buildTreeFromFlat(tokens){
  const stack=[];
  const newGroup = (logical='AND') => ({ id: makeId(), logical, children:[], connectors:[] });

  let root = newGroup('AND');
  stack.push(root);
  let pending = null;

  for (const t of tokens){
    const top = stack[stack.length-1];

    if (t.type === 'open'){
      const g = newGroup(t.logical || top.logical || 'AND');
      if (top.children.length > 0){
        top.connectors[top.children.length] = pending || top.logical;
      }
      pending = null;
      top.children.push(g);
      stack.push(g);
      continue;
    }
    if (t.type === 'close'){
      stack.pop();
      pending = null;
      continue;
    }
    if (t.type === 'logical'){
      pending = t.logical;
      continue;
    }
    if (t.type === 'attribute'){
      const child = {
        id: t.id || makeId(),
        field: t.field,
        operator: t.operator || '=',
        value: t.value,
        children: []
      };
      if (top.children.length > 0){
        top.connectors[top.children.length] = pending || top.logical;
      }
      pending = null;
      top.children.push(child);
      continue;
    }
    if (t.type === 'placeholder'){
      // ignore; pills-only
      continue;
    }
  }
  return root;
}
function makeId(){ return 'id_'+Math.random().toString(36).slice(2,10); }
