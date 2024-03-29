import * as Joi from 'joi';
import { ITemplate } from '../Templates';

export const templateSchema = Joi.object<ITemplate>({
  _id: Joi.string().alter({
    create: (schema) => schema.forbidden(),
    update: (schema) => schema.forbidden(),
  }),
  name: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  enabled: Joi.boolean()
    .default(true)
    .alter({
      create: (schema) => schema.optional(),
      update: (schema) => schema.optional(),
    }),
  lastEdited: Joi.string().alter({
    create: (schema) => schema.forbidden(),
    update: (schema) => schema.forbidden(),
  }),
  uuid: Joi.string().alter({
    create: (schema) => schema.forbidden(),
    update: (schema) => schema.forbidden(),
  }),
  mail: {
    variables: Joi.array()
      .default([])
      .alter({
        create: (schema) => schema.optional(),
        update: (schema) => schema.optional(),
      }),
    html: Joi.string().alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
    text: Joi.string().alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
    from: Joi.object().alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
    subject: Joi.string().alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
    language: Joi.string().alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
    smtpServerTags: Joi.array()
      .default([])
      .alter({
        create: (schema) => schema.optional(),
        update: (schema) => schema.optional(),
      }),
    default_addresses: Joi.object().alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  },
});
