import { FastifyPluginAsync } from "fastify"
import { loginUserHandler, registerUserHandler } from "./user.controller";
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

  fastify.post("/login",{
    schema:{
      body: $ref('loginSchema'),
      response: {
        200: $ref('loginResponseSchema')
      }
    }
  },loginUserHandler)
}

export default user;
