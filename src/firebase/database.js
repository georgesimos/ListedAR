import { getDatabase, ref, set } from 'firebase/database';
import { app } from './config';

const database = getDatabase(app);

export const setUserInfo = (userId, data) => {
  const reference = ref(database, 'users/' + userId + '/info');
  set(reference, data);
};
