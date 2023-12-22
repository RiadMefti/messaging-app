import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { db } from './SqLite';
debugger;
migrate(db, { migrationsFolder: './drizzle' });