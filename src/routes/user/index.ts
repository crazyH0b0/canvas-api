import { FastifyPluginAsync } from "fastify"
import { registerUserHandler } from "./user.controller";
import { $ref } from "./user.schema";

const user: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', {
    schema:{
      body: $ref('createUserSchema'),
      response: {
        201:$ref('createUserResponseSchema')
      }
    }
  },registerUserHandler)
}

export default user;
