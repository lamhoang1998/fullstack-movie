import { User } from 'src/common/types/users.types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
