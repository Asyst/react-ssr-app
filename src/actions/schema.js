import { normalize, schema } from 'normalizr';

export const userSchema = new schema.Entity('users');

export const userListSchema = new schema.Array(userSchema);
