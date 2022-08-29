import {
    doc,
    getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import Login from "./Login";
import TextEditor from "./TextEditor";
import DocumentHeader from './DocumentHeader'

function DocumentPage() {
    const [document, setDocument] = useState([]);
    const { query, replace } = useRouter();
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
                    if (rowDocument?.data()?.uid !== currentUser.uid) {
                        replace('/')
                    }
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
    )
}

export default DocumentPage