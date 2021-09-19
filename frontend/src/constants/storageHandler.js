import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const downloadImage = async (path) => {
  const url = await getDownloadURL(ref(storage, path));
  return url;
};
