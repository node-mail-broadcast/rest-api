import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IMailServer extends Document {
  host: string;
  port: number;
  emailFrom: string;
  username: string;
  password: string;
  name: string;
  secure: boolean;
  enabled: boolean;
  lastEdited: number;
  uuid: string;
}

const MailSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  host: Schema.Types.String,
  port: Schema.Types.Number,
  username: Schema.Types.String,
  emailFrom: Schema.Types.String,
  password: Schema.Types.String,
  name: Schema.Types.String,
  secure: {
    type: Schema.Types.Boolean,
    default: true,
  },
  enabled: {
    type: Schema.Types.Boolean,
    default: true,
  },
  lastEdited: Schema.Types.Number,
  uuid: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
});

export const mailServerModel = mongoose.model<IMailServer>(
  'mailservers',
  MailSchema
);
