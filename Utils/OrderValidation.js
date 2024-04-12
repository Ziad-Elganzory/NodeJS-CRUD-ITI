const Ajv = require("ajv");
const ajv = new Ajv();

let OrderSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    totalprice: { type: "integer" },
    items: {
      type: "array",
      items: { type: "integer" },
    },
  },
  required: ["id", "totalprice", "items"],
  additionalProperties: false,
};

module.exports = ajv.compile(OrderSchema);
