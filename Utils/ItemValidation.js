const Ajv = require("ajv");
const ajv = new Ajv();

let ItemSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string", minLength: 2 },
    price: { type: "integer" },
    desc: { type: "string" },
  },
  required: ["name", "price", "desc"],
  additionalProperties: false,
};

module.exports = ajv.compile(ItemSchema);
