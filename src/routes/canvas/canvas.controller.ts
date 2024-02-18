import { FastifyRequest, FastifyReply } from "fastify";
import { deleteCanvasById, getCanvasById, getCanvasListByUserId, saveCanvase } from "./canvas.service";

export async function handleSaveCanvas(request:FastifyRequest, reply:FastifyReply) {
  
const canvas = await saveCanvase({
  ...request.body as any,
  ownerId: (request.user as { id: number }).id
})

if(canvas){
  return reply.code(201).send({
    code: 20000,
    data:{ 
        id: canvas.id
    }
  })
}
return reply.code(404).send({
  code: 50000,
  data:{
    
  }
})
}

export async function handleGetCanvasData(request:FastifyRequest, reply:FastifyReply) {
 const  ownerId =  (request.user as { id: number }).id 
 const { canvasId } = request.params as { canvasId: number };
  const canvas = await getCanvasById(canvasId,ownerId)
  if(!canvas){
    return reply.code(404).send({
      code: 50001
    })
  }
    return reply.code(200).send({
      code: 20000,
      data:{ canvas}
    })
  
  }

  export async function handleGetCanvasList(request:FastifyRequest, reply:FastifyReply) {
    const  ownerId =  (request.user as { id: number }).id 
    const canvasListData = await getCanvasListByUserId(ownerId)
    return reply.code(200).send({
      code: 20000,
      data:{ canvasListData}
    })
  }

  export async function handleDeleteCanvasById(request:FastifyRequest, reply:FastifyReply) {
    const  ownerId =  (request.user as { id: number }).id 
    const { canvasId } = request.params as { canvasId: number };
    const deletedCanvas = await deleteCanvasById(canvasId, ownerId)
    return reply.code(201).send({
      code: 20000,
      data:{ canvasId:deletedCanvas.id}
    })
  }