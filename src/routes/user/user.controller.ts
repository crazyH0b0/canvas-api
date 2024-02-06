import { CreateUserSchema, LoginUserSchema } from './user.schema';
import   fastify, {  FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail } from "./user.service";
import { verifyPassword } from '../../utils/hash';

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

export async function loginUserHandler(request:FastifyRequest<{
  Body: LoginUserSchema
}>, reply:FastifyReply) {
  const body = request.body

  try {
    const user= await findUserByEmail(body.email)
    if(!user){
      return reply.code(401).send('邮箱或者密码错误')

    }
    const correctPwd = verifyPassword({
      candidatePassword:body.password,
      salt:user.salt,
      hash:user.password
    })
    if(correctPwd){
      const {password, salt, ...rest} = user
      return {
        accessToken:  request.server.jwt.sign(rest)
      }
    }
    return reply.code(401).send('邮箱或者密码错误')
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error)
    
    
  }
  
}