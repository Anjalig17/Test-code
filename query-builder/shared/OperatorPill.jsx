import React from 'react';
export default function OperatorPill({ op }){
  if (!op) return null;
  return <span className={'op-pill '+(op==='AND'?'and':'or')}>{op}</span>;
}
