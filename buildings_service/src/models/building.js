import { Schema, model } from 'mongoose';

const buildingSchema = Schema({
  name: String,
});

export const Building = model('Building', buildingSchema);
