import { useRouter } from "next/router"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { MdArticle } from "react-icons/md"

function DocumentsRow({ id, fileName, date }) {
    const {push} = useRouter()
    return (
        <div className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer text-base" onClick={() => push(`/document/${id}`)}>
            <MdArticle className="text-2xl text-blue-500" />
            <p className="flex-grow pl-5 w-10 pr-10 truncate font-medium capitalize">{fileName}</p>
            <p className="pr-8 text-sm">{date?.toDate().toLocaleDateString()}</p>
            <button className="hover:bg-slate-200 rounded-md">
                <BiDotsVerticalRounded className="text-gray-700 text-2xl" />
            </button>
        </div>
    )
}

export default DocumentsRow