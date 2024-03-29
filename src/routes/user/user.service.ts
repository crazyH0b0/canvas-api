import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserSchema } from "./user.schema";

export async function createUser(input: CreateUserSchema){
  const {password, ...rest} = input
  
    // 调用 hashPassword 函数生成密码哈希和盐
  const {hash, salt} = hashPassword(password)
  const existingUser = await findUserByUsername(input.username)
  if (existingUser) {
    throw new Error('Username already exists')
  }

  const user = await prisma.user.create({
    data:{
      ...rest,
      salt, // 将盐添加到数据库中
      password: hash // 将密码哈希添加到数据库中

    }
  })
  return user
}

export async function findUserByUsername(username: string){
  return prisma.user.findUnique({
    where:{
      username
    }
  })
}