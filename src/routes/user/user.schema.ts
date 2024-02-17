import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const createUserCoreSchema = {
  username: z.string({
    required_error: '账号不能为空',
    invalid_type_error: '账号必须为字符串'
  }),

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
  code: z.number(),
  data:z.object(
    createUserCoreSchema
  )
 

})

const loginSchema = z.object({
  username: z.string({
    required_error: '账号不能为空',
    invalid_type_error: '账号必须为字符串'
  }).min(1),
  password: z.string(
    {
      required_error: '密码不能为空',
      invalid_type_error: '密码必须为字符串'
    }
  )
})

const loginResponseSchema = z.object({
  code: z.number(),
  data:z.object({
    accessToken: z.string()
  })
})

export type LoginUserSchema = z.infer<typeof loginSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export const {schemas: userSchemas,$ref} = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema
})