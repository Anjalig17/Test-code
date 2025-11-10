export function flattenQueryTree(tree){
  const flat=[];
  const open=(l)=>flat.push({type:'open',logical:l});
  const close=()=>flat.push({type:'close'});
  const logical=(l)=>flat.push({type:'logical',logical:l});
  const attr=(n)=>flat.push({type:'attribute',id:n.id,field:n.field,operator:n.operator,value:n.value});
  function group(g){
    const l=g.logical||'AND'; open(l);
    const kids=g.children||[]; const conns=Array.isArray(g.connectors)?g.connectors:[];
    kids.forEach((child,i)=>{ visit(child); if(i<kids.length-1){ logical(conns[i+1]||l); } });
    close();
  }
  function visit(n){
    if(Array.isArray(n.children)&&n.children.length>0) return group(n);
    if(n.field) return attr(n);
  }
  visit(tree); return flat;
}