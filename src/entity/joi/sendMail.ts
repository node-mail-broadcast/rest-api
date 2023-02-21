import * as Joi from 'joi';

export const sendMailSchema = Joi.object({
  sendTo: Joi.object().alter({
    create: (schema) => schema.required(),
  }),
  templateUUID: Joi.string().alter({
    create: (schema) => schema.required(),
  }),
  data: Joi.object().alter({
    create: (schema) => schema.optional(),
  }),
});
