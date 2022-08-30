import { useRouter } from "next/router"
import { useState } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { MdArticle } from "react-icons/md"
import deleteDocument from "../firebase/deleteDocument"
import Modal from "./Modal"

function DocumentsRow({ id, fileName, date, currentUserUid, currentUserName }) {
    const { push } = useRouter()
    const [showOption, setShowOption] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)




    const deleteDocumentConfirm = async () => {
       if (showDeleteConfirmation) {
        try {
            await deleteDocument(`documents/${currentUserUid}/${currentUserName}`, id)
        } catch (error) {
            console.log(error)
        }
       }
       setShowDeleteConfirmation(false)
    }
    return (
        <>
            <div className="relative flex w-full gap-3">
                <div className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 w-[88%] sm:w-11/12 md:w-[93%] cursor-pointer text-base" onClick={() => push(`/document/${id}`)}>
                    <MdArticle className="text-2xl text-blue-500" />
                    <p className="flex-grow pl-5 w-10 pr-10 truncate font-medium capitalize">{fileName}</p>
                    <p className="pr-8 text-sm">{date?.toDate().toLocaleDateString()}</p>
                </div>
                <button className="hover:bg-slate-200 rounded-md" onClick={() => setShowOption(!showOption)}>
                    <BiDotsVerticalRounded className="text-gray-700 text-2xl" />
                </button>
                <div className="absolute right-0 top-10 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow  " style={{ display: showOption ? 'inline' : 'none' }} onMouseLeave={() => setShowOption(false)}>
                    <ul className="py-1 text-sm text-gray-700 px-1" aria-labelledby="dropdownDividerButton">
                        <li><button onClick={() => setShowDeleteConfirmation(true)} className="block w-full text-left font-medium py-2 px-4 hover:bg-gray-100 rounded-md">Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
            {showDeleteConfirmation && <Modal showModal={showDeleteConfirmation} closeShowModal={() => setShowDeleteConfirmation(false)} deleteDocumentConfirm={deleteDocumentConfirm} />}
        </>
    )
}

export default DocumentsRow