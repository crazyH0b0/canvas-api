import { FastifyInstance, FastifyPluginAsync } from "fastify"
import { handleGetCanvasData, handleSaveCanvas } from "./canvas.controller";
import { $ref } from "./canvas.schema";


const canvas: FastifyPluginAsync = async (fastify: FastifyInstance, opts): Promise<void> => {
  
  fastify.post('/save',{
    schema:{
      body: $ref('createOrSaveCanvasSchema'),
      response: {
        201: $ref('saveCanvasResponse')
      }
      
    },
    onRequest:[fastify.authenticate]
  }, handleSaveCanvas)
  
  fastify.get('/:canvasId',{
    preHandler:[fastify.authenticate],
    schema:{
      response:{
        200: $ref('getCanvasDataResponseSchema')
      },
      params:{
        type: 'object',
        properties: { 
          canvasId: { type: 'number'}
         }
      }
    }
  },handleGetCanvasData)
}

export default canvas;
