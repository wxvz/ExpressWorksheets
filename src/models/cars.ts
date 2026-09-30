import { Schema, model } from 'mongoose';
import { z } from 'zod';

export interface ICar {
  make: string;
  model: string;
  year: number;
}

export const carSchemaZod = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(150).optional(),
});

export const updateCarSchemaZod = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(150).optional(),
});

const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, min: 1950 },
  },
  { timestamps: true }
);

export const CarModel = model<ICar>('Car', carSchema);
