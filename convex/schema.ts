// convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
    leftMargin: v.optional(v.number()),        // ✅ new
    rightMargin: v.optional(v.number()),  
  })
    .index("by_owner_id", ["ownerId"]) 
    .index("by_organization_id", ["organizationId"])
    .searchIndex("search_title",{
      searchField: "title",
      filterFields: ["ownerId", "organizationId"],
    }),
});
