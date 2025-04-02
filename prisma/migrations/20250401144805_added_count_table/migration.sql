-- CreateTable
CREATE TABLE "Count" (
    "type" TEXT NOT NULL,
    "total" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Count_type_key" ON "Count"("type");
