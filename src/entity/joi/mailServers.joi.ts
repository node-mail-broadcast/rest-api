import * as Joi from 'joi';

export const mailServerSchema = Joi.object({
  _id: Joi.string().alter({
    create: (schema) => schema.forbidden(),
    update: (schema) => schema.forbidden(),
  }),
  name: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  secure: Joi.boolean()
    .default(true)
    .alter({
      create: (schema) => schema.optional(),
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
  host: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  port: Joi.number().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  emailFrom: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  username: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  password: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  uuid: Joi.string().alter({
    create: (schema) => schema.forbidden(),
    update: (schema) => schema.forbidden(),
  }),
});
