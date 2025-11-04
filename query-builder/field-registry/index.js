import NumberField from './number.jsx';
import StringField from './string.jsx';
import BooleanField from './boolean.jsx';
import EnumField from './enum.jsx';
import DateField from './date.jsx';

const registryByType = { number:NumberField, string:StringField, boolean:BooleanField, enum:EnumField, date:DateField };

export function getRendererAndOps(field, schemaOps){
  const type = field.type || 'string';
  const module = registryByType[type] || StringField;
  const operators = field.operators || schemaOps[type] || ['='];
  return { Renderer: module.render, operators };
}
