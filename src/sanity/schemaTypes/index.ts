import { type SchemaTypeDefinition } from "sanity";
import { teamMemberType } from "./teamMemberType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [teamMemberType],
};