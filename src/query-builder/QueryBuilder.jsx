import React from 'react';
import Group from './Group';
export default function QB({fields,schema,value,onChange}){
 return <Group node={value} depth={0} fields={fields} schema={schema} onUpdate={onChange} showRail={false}/>
}