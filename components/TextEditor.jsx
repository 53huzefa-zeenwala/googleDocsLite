import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { doc, updateDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { db } from "../firebase";

const Editor = dynamic(() => import('react-draft-wysiwyg').then((module) => module.Editor), {
    ssr: false
})

const TextEditor = ({ collectionName, id, document }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        updateDoc(doc(db, collectionName, id), {
            editorState: convertToRaw(editorState.getCurrentContent())
        })
    }
    useEffect(() => {
        if (document?.editorState) {
            setEditorState(EditorState.createWithContent(
                convertFromRaw(document?.editorState)
            ))
        }
    }, [document])

    return (
        <div className="bg-[#f8f9fa] pb-40 min-h-screen">
            <Editor
                editorState={editorState}
                toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
                wrapperClassName="wrapperClassName"
                editorClassName="mt-3 bg-white shadow-lg max-w-5xl md:mx-auto mx-1 p-8 border"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    blockType: {
                        inDropdown: true,
                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                    },
                }}
            />
        </div>
    )
}

export default TextEditor