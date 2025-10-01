import { deleteUser } from './usersSlice';

export const deleteUserAction = (dispatch, userId) => {
  dispatch(deleteUser(userId));
};
