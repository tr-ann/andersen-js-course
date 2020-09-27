import { User, UserSchema } from '..';

export function beforeCreate() {
  const schema = UserSchema;
  schema.pre<User>('save', function(next) {
    const user = this;
    user.login = user.login.split(' ').join('-');
    next();
  });
  return schema;
}
