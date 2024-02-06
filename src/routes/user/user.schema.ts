import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createUserCoreSchema = {
  email: z.string({
    required_error: '邮箱不能为空',
    invalid_type_error: '邮箱必须为字符串'
  }).email(),
  name: z.string(),

}

 const createUserSchema = z.object({
  ...createUserCoreSchema,
  password: z.string(
    {
      required_error: '密码不能为空',
      invalid_type_error: '密码必须为字符串'
    }
  )
})
const createUserResponseSchema = z.object({
  id: z.number(),
  ...createUserCoreSchema

})

const loginSchema = z.object({
  email: z.string({
    required_error: '邮箱不能为空',
    invalid_type_error: '邮箱必须为字符串'
  }).email(),
  password: z.string(
    {
      required_error: '密码不能为空',
      invalid_type_error: '密码必须为字符串'
    }
  )
})

const loginResponseSchema = z.object({
  accessToken: z.string()
})

export type LoginUserSchema = z.infer<typeof loginSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export const {schemas: userSchemas,$ref} = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema
})