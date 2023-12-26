
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    name: text('name'),

});

export const rooms = sqliteTable('roomMessages', {

    roomId: text('id'),
    userName: text('userName'),
    hidden: integer('hidden', { mode: 'boolean' })


}, (table) => {
    return {
        pk: primaryKey({ columns: [table.roomId, table.userName] }),

    };
});

