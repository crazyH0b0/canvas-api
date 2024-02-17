import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const canvasInput = {
  id: z.number().optional(),
  title: z.string(),
  type: z.string(),
  content: z.string(),
};

const createOrSaveCanvasSchema = z.object({
  ...canvasInput,
});

const saveCanvasResponse = z.object({
  code: z.number(),
  data: z.object({
    id: z.number()
  }) 
})




const getCanvasDataResponseSchema =z.object({
  code: z.number(),
  data: z.object({
    canvas: z.object({
      ...canvasInput
    }) 
  })
}
)
export type CreateOrSaveCanvasInput = z.infer<typeof createOrSaveCanvasSchema>;

export const {schemas: canvasSchemas,$ref} = buildJsonSchemas({
  createOrSaveCanvasSchema,
  getCanvasDataResponseSchema,
  saveCanvasResponse
},{$id:'canvasSchemas'})