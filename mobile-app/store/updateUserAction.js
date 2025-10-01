import { updateUser } from './usersSlice';

export const updateUserAction = (dispatch, user) => {
  dispatch(updateUser(user));
};
