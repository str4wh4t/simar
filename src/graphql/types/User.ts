import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('username');
    t.string('email');
  }
});
