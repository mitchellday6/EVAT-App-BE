import mongoose, { Document, Schema } from 'mongoose';

export interface ICharger extends Document {
  cost: string;
  charging_points: number;
  pay_at_location: string;
  membership_required: string;
  access_key_required: string;
  is_operational: string;
  latitude: number | string;
  longitude: number | string;
  operator: string;
  connection_type: string;
  current_type: string;
  charging_points_flag: number;
}

const chargerSchema = new Schema<ICharger>(
  {
    cost: { type: String },
    charging_points: { type: Number },
    pay_at_location: { type: String },
    membership_required: { type: String },
    access_key_required: { type: String },
    is_operational: { type: String },
    latitude: { type: Schema.Types.Mixed },
    longitude: { type: Schema.Types.Mixed },
    operator: { type: String },
    connection_type: { type: String },
    current_type: { type: String },
    charging_points_flag: { type: Number }
  },
  {
    collection: 'charging_stations' // ✅ ensure it's querying the correct collection
  }
);

// ✅ Prevent OverwriteModelError
const Charger =
  mongoose.models.Charger || mongoose.model<ICharger>('Charger', chargerSchema);

export default Charger;
