import { CreateOrSaveCanvasInput } from "./canvas.schema";
import prisma from "../../utils/prisma";


export async function deleteCanvasById(canvasId: number,ownerId: number) {
  const canvasToDelete = await prisma.canvas.delete({
    where:{
      id: canvasId,
      ownerId
    }
  })
  return canvasToDelete
}

export async function getCanvasListByUserId(ownerId: number) {
  const canvasList = await prisma.canvas.findMany({
    where: {
      ownerId
    }
  })
  return canvasList
}

export async function getCanvasById(canvasId: number, ownerId: number) {
  
  const canvas = await prisma.canvas.findUnique({
    where:{
      id: canvasId,
      ownerId: ownerId
    }
  })
  return canvas
}

export async function saveCanvase(
  data: CreateOrSaveCanvasInput & { ownerId: number }
) {
  console.log(data, "canvasDAtaaaaaaa");

  let canvas = null
  // 创建并保存
  if(!data.id){
    canvas =  await prisma.canvas.create({
     data:{
      title:data.title,
      type: data.type as any,
      content: data.content,
      ownerId: data.ownerId
     }
    })
  }else{
    
      // 保存
    canvas = await prisma.canvas.update({
      where:{
        id:data.id,
        ownerId: data.ownerId
      },
      data:{
        content:data.content,
        title: data.title,
        type: data.type as any
      }
    })
  }



  return canvas
  

}
