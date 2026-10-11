import { Schema, model } from "mongoose";
import { z } from "zod";

export interface IItem {
  type: "lost" | "found";
  category: string;
  itemName: string;
  colour: string;
  brand: string;
  location: string;
  dateFound: Date;
  notes: string;
  status: "open" | "matched" | "returned";
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateItemInput:
 *       type: object
 *       required:
 *         - type
 *         - category
 *         - itemName
 *         - colour
 *         - brand
 *         - location
 *         - dateFound
 *         - notes
 *         - status
 *       properties:
 *         type:
 *           type: string
 *           example: lost
 *         category:
 *           type: string
 *           example: electronics
 *         itemName:
 *           type: string
 *           example: MacBook Pro
 *         colour:
 *           type: string
 *           example: Silver
 *         brand:
 *           type: string
 *           example: Apple
 *         location:
 *           type: string
 *           example: Room B2307
 *         dateFound:
 *           type: string
 *           example: 2026-01-01
 *         notes:
 *           type: string
 *           example: A MacBook Pro was found in Room B2307 on top of desk.
 */
export const itemSchemaZod = z.object({
  type: z.enum(["lost", "found"]),
  category: z.string().min(1),
  itemName: z.string().min(1),
  colour: z.string().min(1),
  brand: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  dateFound: z.date(),
  notes: z.string().min(1).optional(),
  status: z.enum(["open", "matched", "returned"]),
});

const itemSchema = new Schema<IItem>(
  {
    type: { type: String, required: true },
    category: { type: String, required: true },
    itemName: { type: String, required: true },
    colour: { type: String, required: true },
    brand: { type: String, required: false },
    location: { type: String, required: false },
    dateFound: { type: Date, required: true },
    notes: { type: String, required: false },
    status: {
      type: String,
      enum: ["open", "matched", "returned"],
      required: true,
    },
  },
  { timestamps: true },
);

export const updateItemSchemaZod = z.object({
  type: z.enum(["lost", "found"]).optional(),
  category: z.string().min(1).optional(),
  itemName: z.string().min(1).optional(),
  colour: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  dateFound: z.date().optional(),
  notes: z.string().min(1).optional(),
  status: z.enum(["open", "matched", "returned"]).optional(),
});

export const ItemModel = model<IItem>("Item", itemSchema);
