import {
  doc,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DocumentHeader from "../../components/DocumentHeader";
import Login from "../../components/Login";
import TextEditor from "../../components/TextEditor";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";

const document = () => {
  const [document, setDocument] = useState([]);
  const { query } = useRouter();
  const { currentUser } = useAuth();
  const { id } = query;

  useEffect(() => {
    if (currentUser && id) {
      const q = doc(
        db,
        `documents/${currentUser?.uid}/${currentUser?.displayName}`,
        id
      );
      try {
        const snapshot = async () => {
          const rowDocument = await getDoc(q);
          setDocument(rowDocument.data());
        };
        snapshot();
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, currentUser]);

  if (!currentUser) return <Login />;

  return (
    <div>
      <DocumentHeader fileName={document?.fileName} />
      <TextEditor collectionName={`documents/${currentUser?.uid}/${currentUser?.displayName}`} id={id} document={document} />
    </div>
  );
};

export default document;
