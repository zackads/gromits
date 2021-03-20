import { Schema, model } from 'mongoose';

const BuildingSchema = new Schema({
  properties: {
    Name: String,
    Location: String,
    Grade: String,
    Hyperlink: String,
    ListEntry: Number,
    Hyperlink: String,
  },
  geometry: {
    coordinates: [Number, Number],
  },
});

BuildingSchema.index({ geometry: '2dsphere' });

export const Building = model('Building', BuildingSchema, 'buildings');
