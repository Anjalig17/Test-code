export function addMissingIds(node){
  if (!node) return null;
  function assignId(n){
    const withId = n.id ? n : { ...n, id: makeId() };
    if (withId.type === 'group'){
      return { ...withId, children: (withId.children || []).map(assignId) };
    }
    return withId;
  }
  return assignId(node);
}
function makeId(){ return 'id_' + Math.random().toString(36).slice(2,10) + Date.now().toString(36); }
