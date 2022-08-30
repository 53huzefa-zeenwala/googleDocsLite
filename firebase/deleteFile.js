import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../firebase'

const deleteFile = (filePath) => {
  const imageRef = ref(storage, filePath)
  return deleteObject(imageRef)
}

export default deleteFile