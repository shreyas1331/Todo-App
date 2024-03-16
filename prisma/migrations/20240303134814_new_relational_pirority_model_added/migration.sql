-- CreateTable
CREATE TABLE "priority" (
    "id" SERIAL NOT NULL,
    "prty" INTEGER NOT NULL DEFAULT 0,
    "todoId" INTEGER NOT NULL,

    CONSTRAINT "priority_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "priority" ADD CONSTRAINT "priority_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
