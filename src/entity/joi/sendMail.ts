import * as Joi from 'joi';

export const sendMailSchema = Joi.object({
  address: Joi.object().alter({
    create: (schema) => schema.required(),
  }),
  template: Joi.string().alter({
    create: (schema) => schema.required(),
  }),
  data: Joi.object().alter({
    create: (schema) => schema.optional(),
  }),
});
