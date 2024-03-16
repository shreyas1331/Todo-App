/*
  Warnings:

  - You are about to drop the `priority` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "priority" DROP CONSTRAINT "priority_todoId_fkey";

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "priority";
