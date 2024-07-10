-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "List" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "date" TEXT,
    "subjectListId" INTEGER NOT NULL,
    CONSTRAINT "List_subjectListId_fkey" FOREIGN KEY ("subjectListId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Method" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Method_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
