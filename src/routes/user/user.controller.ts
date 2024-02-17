import { CreateUserSchema, LoginUserSchema } from './user.schema';
import    {  FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByUsername } from "./user.service";
import { verifyPassword } from '../../utils/hash';

export async function registerUserHandler(request:FastifyRequest<{
  Body: CreateUserSchema
}>, reply:FastifyReply) {
  const body = request.body
  try {
    const user = await createUser(body)
    return reply.code(201).send({
      code: 20000,
      data:{
        ...user
      }
    })
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
    const user= await findUserByUsername(body.username)
    if(!user){
      return reply.code(401).send('账号或者密码错误')

    }
    const correctPwd = verifyPassword({
      candidatePassword:body.password,
      salt:user.salt,
      hash:user.password
    })
    if(correctPwd){
      const {password, salt, ...rest} = user
      const  accessToken = request.server.jwt.sign(rest,{

      })
      // reply.setCookie('token',accessToken,)
      return  {
        code: 20000,
        data:{
          accessToken
        }
      }
    }
    return reply.code(401).send('账号或者密码错误')
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error)
    
    
  }
  
}