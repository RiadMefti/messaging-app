import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const users = sqliteTable('users', {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    tempSocketId: text('tempSocketId').notNull(),
});