import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { updateUserProfile } from './auth';
import { app } from './config';

const storage = getStorage(app);

export const uploadProfilePhoto = async (file, currentUser, setLoading) => {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);

  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateUserProfile(currentUser, { photoURL });

  setLoading(false);
};

export const uploadPlacePhoto = async (file, fileName) => {
  const fileRef = ref(storage, 'images/' + fileName);

  const metadata = {
    contentType: 'image/jpeg',
  };

  const snapshot = await uploadBytes(fileRef, file, metadata);
  console.log({ snapshot });
  return getDownloadURL(fileRef);
};
