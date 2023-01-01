import Joi from "joi";
export const inputSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(6).required(),
});
