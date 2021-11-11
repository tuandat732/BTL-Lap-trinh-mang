import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    lastToken: { type: String },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
);

export interface Admin extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
  lastToken: string;
  createdAt: Date;
  updatedAt: Date;
}
