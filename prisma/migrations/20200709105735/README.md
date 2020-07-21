# Migration `20200709105735`

This migration has been generated by Andy Kay at 7/9/2020, 10:57:35 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "isAdmin" boolean  NOT NULL DEFAULT false;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200702132223..20200709105735
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -13,8 +13,9 @@
 model User {
   id          String        @id @default(uuid())
   name        String
   email       String        @unique
+  isAdmin     Boolean       @default(false)
   createdAt   DateTime      @default(now())
   ActivityLog ActivityLog[]
 }
```

