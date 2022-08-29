import Header from "./Header";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FcFolder } from "react-icons/fc";
import Image from "next/image";
import Login from "./Login";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import addDocument from "../firebase/addDocument";
import getDocuments from "../firebase/getDocuments";
import DocumentsRow from "./DocumentsRow";

const HomePage = () => {
    const { currentUser } = useAuth();
    // console.log(currentUser);
    const [showModal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState("");

    const closeShowModal = () => {
        setShowModal(false);
        setFileName("");
    };

    const createDocument = async () => {
        if (fileName.length <= 3) return;

        const finalFileName = uuidv4() + "." + fileName.split(" ").join(".");
        try {
            const galleryDoc = {
                fileName: fileName,
                uid: currentUser?.uid || "",
                encryptFileName: finalFileName
            };
            await addDocument(
                `documents/${currentUser?.uid}/${currentUser?.displayName}`,
                galleryDoc,
                finalFileName
            );
        } catch (error) {
            console.log(error);
        }
        closeShowModal();
    };

    const { documents } = getDocuments(
        `documents/${currentUser?.uid}/${currentUser?.displayName}`
    );
    
    if (!currentUser) return <Login />;

    const modal = (
        <div className="h-screen w-screen flex bg-[rgba(0,0,0,.4)] justify-center items-center absolute top-0">
            <div
                style={{ transition: "all 1s", opacity: showModal ? "1" : "0" }}
                id="popup-modal"
                tabIndex="-1"
                className=" overflow-y-auto overflow-x-hidden relative z-50 md:inset-0 h-modal"
            >
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <button
                            onClick={closeShowModal}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="popup-modal"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 pt-10 pb-6 text-center">
                            <input
                                type="text"
                                placeholder="File Name..."
                                className="w-full py-2 px-3 border-2 border-gray-400 rounded-md my-6 bg-gray-50 outline-none focus:border-blue-400 focus:bg-blue-50 hover:border-blue-300 focus:shadow-md hover:bg-blue-50"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && createDocument()}
                            />
                            <button
                                data-modal-toggle="popup-modal"
                                type="button"
                                onClick={createDocument}
                                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg inline-flex items-center px-4 py-2 text-center mr-6 text-lg"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={closeShowModal}
                                data-modal-toggle="popup-modal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 font-medium px-4 py-2 hover:text-gray-900 focus:z-10 text-lg"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Header />
            <section className="bg-[#f8f9fa] pb-8 px-10">
                <div className="mx-auto max-w-3xl ">
                    <div className="py-3 flex items-center justify-between">
                        <h2 className="text-gray-700 text-lg ">Start a new document</h2>
                        <button className="hover:bg-slate-200 rounded-md">
                            <BiDotsVerticalRounded className="text-gray-700 text-2xl" />
                        </button>
                    </div>
                    <div className="w-full">
                        <button
                            onClick={() => setShowModal(true)}
                            className="relative h-52 w-40 border-2 border-white rounded-xl overflow-hidden hover:border-blue-400 transition-all shadow-md shadow-gray-200"
                        >
                            <Image
                                src={"/addDocumentIcon.png"}
                                layout="fill"
                                quality={2}
                                priority={true}
                                className="cursor-pointer "
                            />
                        </button>
                        <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
                            Blank
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-5 md:px-0 bg-white">
                <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700 flex flex-col gap-1">
                    <div className="flex items-center justify-between pb-2 font-medium px-4">
                        <h2 className="font-bold flex-grow">My Document</h2>
                        <p className="mr-6">Date Created</p>
                        <FcFolder className="text-3xl" />
                    </div>
                    {documents.map((document) => (
                        <DocumentsRow
                            key={document.id}
                            id={document.id}
                            fileName={document.data.fileName}
                            date={document.data.timestamp}
                        />
                    ))}
                </div>
            </section>
            {showModal && modal}
        </>
    )
}

export default HomePage