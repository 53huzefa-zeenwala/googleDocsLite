import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const deleteDocument = (collectionName, documentId) => {
return deleteDoc(doc(db, collectionName, documentId))
}

export default deleteDocument