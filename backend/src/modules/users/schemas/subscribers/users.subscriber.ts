import { User, UserSchema } from '..';

export function beforeCreate() {
  const schema = UserSchema;
  schema.pre<User>('save', function(next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.login = user.login.split(' ').join('-');
    next();
  });
  return schema;
}
