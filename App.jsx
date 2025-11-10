import React, { useMemo, useState } from "react";
import QueryBuilder from "./query-builder";
import Pills from "./query-builder/Pills.jsx";
import { buildTreeFromFlat } from "./query-builder/utils/buildTreeFromFlat.js";

/** Catalog of fields (generic types). */
const fields = [
  { key: "status", type: "enum", options: ["Active", "Inactive", "Pending"] },
  { key: "age", type: "number" },
  { key: "client_name", type: "string" },
  { key: "is_active", type: "boolean" },
  { key: "joined_at", type: "date" }
];

/** Per-type operator lists used by cards. */
const schema = {
  fieldTypes: {
    string: ["=", "!=", "CONTAINS", "IN", "STARTS_WITH", "ENDS_WITH"],
    number: ["=", "!=", ">", ">=", "<", "<=", "BETWEEN", "IN"],
    boolean: ["="],
    enum: ["=", "IN"],
    date: ["=", "!=", ">", ">=", "<", "<=", "BETWEEN"]
  }
};

/** Initial tokens: status = Active AND (age > 25 OR age < 40) */
const initialFlat = [
  { type:"attribute", id:"tok_status", field:"status", operator:"=", value:"Active" },
  { type:"logical", logical:"AND" },
  { type:"open", logical:"OR" },
  { type:"attribute", id:"tok_age_gt", field:"age", operator:">", value:"25" },
  { type:"logical", logical:"OR" },
  { type:"attribute", id:"tok_age_lt", field:"age", operator:"<", value:"40" },
  { type:"close" }
];

export default function App(){
  // Pill-driven structure
  const [flat, setFlat] = useState(initialFlat);

  // Derived nested tree for cards
  const nested = useMemo(() => buildTreeFromFlat(flat), [flat]);

  // Cards patch values/operators by id
  const handlePatchAttribute = (id, partial) => {
    setFlat(tokens => tokens.map(t => (t.type==='attribute' && t.id===id) ? { ...t, ...partial } : t));
  };

  return (
    <div className="page">
      <div className="panel">
        <h2>Pills (structure)</h2>
        <Pills flat={flat} fields={fields} onChange={setFlat} />
      </div>

      <div className="panel">
        <h2>Cards (values & operators)</h2>
        <QueryBuilder fields={fields} schema={schema} tree={nested} onPatchAttribute={handlePatchAttribute} />
        <div className="hint">
          • Pills add/remove conditions and AND/OR. When empty, a placeholder pill appears.<br/>
          • Cards change operator/value only. Reset (×) clears value but keeps the card.
        </div>
      </div>
    </div>
  );
}
