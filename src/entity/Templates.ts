import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface EmailAddress {
  name: string;
  address: string;
}

export interface ITemplate extends Document {
  //mongoose string
  readonly _id?: string;
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
    smtpServerTags: string[];
    from: EmailAddress;
    default_addresses: {
      to: EmailAddress[];
      cc: EmailAddress[];
      bcc: EmailAddress[];
    };
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
      name: {
        type: Schema.Types.String,
        required: true,
      },
      address: {
        type: Schema.Types.String,
        required: true,
      },
    },
    subject: {
      type: Schema.Types.String,
      required: true,
    },
    language: {
      type: Schema.Types.String,
      required: true,
    },
    smtpServerTags: {
      type: Schema.Types.Array,
      required: true,
    },
    default_addresses: {
      to: {
        type: Schema.Types.Array,
      },
      cc: {
        type: Schema.Types.Array,
      },
      bcc: {
        type: Schema.Types.Array,
      },
    },
  },
});

export const templates = mongoose.model<ITemplate>('templates', TemplateSchema);
