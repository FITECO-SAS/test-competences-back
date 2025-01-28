import { BodyValidator, PathValidator } from "@myfiteco/validator";
import { Context } from "../models/Context";

const update = [
  PathValidator.number('id').required(),
  BodyValidator.string('firstname').required(),
  BodyValidator.string('lastname').required(),
]

export type UserUpdateContext = Context<{
  params: {
    id: number;
  },
  body: {
    firstname: string;
    lastname: string;
  }
}>

export const userValidation = {
  update,
};