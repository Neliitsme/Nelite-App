/*
  Warnings:

  - Added the required column `timeJoined` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "timeJoined" BIGINT NOT NULL,
ADD COLUMN     "uuid" UUID NOT NULL;
