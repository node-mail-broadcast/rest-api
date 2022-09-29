import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface ITemplate extends Document {
  name: string;
  enabled: boolean;
  lastEdited: number;
  uuid: string;
  mail: {
    variables: string[];
    html: string;
    text: string;
    subject: string;
    language: string;
  };
}

const TemplateSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  enabled: {
    type: Schema.Types.Boolean,
    default: true,
  },
  lastEdited: {
    type: Schema.Types.Number,
    default: Math.floor(Date.now() / 1000),
  },
  uuid: {
    type: Schema.Types.String,
    default: true,
    unique: true,
  },
  mail: {
    variables: {
      type: Schema.Types.Array,
      required: true,
    },
    html: {
      type: Schema.Types.String,
      required: true,
    },
    text: {
      type: Schema.Types.String,
      required: true,
    },
    from: {
      type: Schema.Types.String,
      required: true,
    },
    subject: {
      type: Schema.Types.String,
      required: true,
    },
    language: {
      type: Schema.Types.String,
      required: true,
    },
  },
});

export const templates = mongoose.model<ITemplate>('templates', TemplateSchema);
