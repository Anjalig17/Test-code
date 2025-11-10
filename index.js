import NumberField from './number.jsx';
import StringField from './string.jsx';
import BooleanField from './boolean.jsx';
import EnumField from './enum.jsx';
import DateField from './date.jsx';

const byType = { number:NumberField, string:StringField, boolean:BooleanField, enum:EnumField, date:DateField };

export function getRendererAndOps(field, schemaOps){
  const type = field.type || 'string';
  const mod  = byType[type] || StringField;
  const operators = field.operators || schemaOps[type] || ['='];
  return { Renderer: mod.render, operators };
}
