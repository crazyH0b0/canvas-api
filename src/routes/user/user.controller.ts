import { CreateUserSchema } from './user.schema';
import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.service";

export async function registerUserHandler(request:FastifyRequest<{
  Body: CreateUserSchema
}>, reply:FastifyReply) {
  const body = request.body
  try {
    const user = await createUser(body)
    
    return reply.code(201).send(user)
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error)
    
    
  }
  
}