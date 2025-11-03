import React, {useState} from 'react';
import QueryBuilder from './query-builder/QueryBuilder';
const fields=[
 {key:'status',type:'enum',options:['Active','Inactive','Pending']},
 {key:'age',type:'number'},
 {key:'name',type:'string'},
 {key:'is_active',type:'boolean'},
 {key:'joined_at',type:'date'},
 {key:'segment',type:'enum',options:['Gold','Platinum','Silver']}
];
const schema={fieldTypes:{
 number:['=','!=','>','>=','<','<=','BETWEEN','IN'],
 string:['=','!=','CONTAINS','IN'],
 boolean:['=','!='],
 enum:['=','!=','IN'],
 date:['=','!=','>','>=','<','<=','BETWEEN']
}};
const initial={
 type:'group',op:'OR',children:[
  {type:'attribute',field:'status',fieldType:'enum',op:'=',value:'Active'},
  {type:'group',op:'OR',children:[
    {type:'attribute',field:'age',fieldType:'number',op:'>',value:'25'},
    {type:'attribute',field:'age',fieldType:'number',op:'<',value:'40'}
  ]},
  {type:'attribute',field:'status',fieldType:'enum',op:'=',value:'Active'},
 ]
};
export default function App(){
 const[q,setQ]=useState(initial);
 return <div>
  <h3>SQL Visual Query Builder</h3>
  <QueryBuilder fields={fields} schema={schema} value={q} onChange={setQ}/>
 </div>
}
