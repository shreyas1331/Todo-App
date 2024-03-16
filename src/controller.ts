import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function addtodo(data:string) {
    const todo = await prisma.todo.create({
        data: {
            title:data
        }
      })
      return todo;
}
async function gettodo() {
    const users = await prisma.todo.findMany({
        where: {
          completed:false 
        },
        orderBy:{
          priority:'desc'
        }
      })
      return users
}

async function getcomptodo() {
    const users = await prisma.todo.findMany({
        where: {
          completed:true 
        }
      })
      return users
}
async function updatetodo(id:number, title: string) {
  
    await prisma.todo.update({
        where: {
            id:id
        },
        data: {
            title: title 
        }
    });
}
async function checked(id:number) {
  let check = await prisma.todo.findUnique({
    where: {
      id: id
    },
  })

  await prisma.todo.update({
      where: {
          id:id
      },
      data: {
        completed:!check?.completed
      }
  });
}
async function deletetodo(id:number) {
        await prisma.todo.delete({
  where: {
    id: id
  },
})
}
async function inc(id:number) {
  await prisma.todo.update({
    where: {
        id:id
    },
    data: {
      priority:{
        increment: 1 
      }
    }
});
}

async function dec(id:number) {
  await prisma.todo.update({
    where: {
        id:id
    },
    data: {
      priority:{
        decrement: 1 
      }
    }
});
}

export {addtodo,gettodo,getcomptodo,updatetodo,checked,deletetodo,inc,dec};