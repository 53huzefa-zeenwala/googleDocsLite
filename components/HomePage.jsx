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
import Modal from "./Modal";
import { FaFileUpload } from 'react-icons/fa'
import uploadDocToStorage from "../firebase/uploadDocToStorage";
import UploadDocRow from "./UploadDocRow";

const HomePage = () => {
    const { currentUser } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [showUploadFileModal, setShowUploadFileModal] = useState(false)
    const [fileName, setFileName] = useState("");
    const [uploadFileData, setUploadFileData] = useState()

    const closeShowModal = () => {
        setShowModal(false);
        setFileName("");
    };
    const closeUploadFileModal = () => {
        setShowUploadFileModal(false);
        setFileName("");
        setUploadFileData()
    };

    const { documents } = getDocuments(
        `documents/${currentUser?.uid}/${currentUser?.displayName}`
    );

    const { documents: uploadDoc } = getDocuments(
        `uploadDoc/${currentUser?.uid}/${currentUser?.displayName}`
    );

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

    const uploadFile = async () => {
        if (uploadFileData && fileName) {
            const finalFileName = uuidv4() + "." + fileName.split(" ").join(".");
            try {
                const url = await uploadDocToStorage(
                    uploadFileData,
                    `uploadDoc/${currentUser?.uid}/${finalFileName}`
                );
                const galleryDoc = {
                    fileName: fileName,
                    url: url,
                    uid: currentUser?.uid || "",
                    encryptFileName: finalFileName

                };
                await addDocument(
                    `uploadDoc/${currentUser?.uid}/${currentUser?.displayName}`,
                    galleryDoc,
                    finalFileName
                );

            } catch (error) {
                console.log(error)
            }
        }
        closeUploadFileModal()
    }
console.log(documents[0])
    if (!currentUser) return <Login />;

    return (
        <>
            <Header />
            <section className="bg-[#f8f9fa] pb-8 sm:px-10 px-6">
                <div className="mx-auto max-w-3xl ">
                    <div className="py-3 flex items-center justify-between">
                        <h2 className="text-gray-700 text-lg ">Start a new document</h2>
                        <button className="hover:bg-slate-200 rounded-md">
                            <BiDotsVerticalRounded className="text-gray-700 text-2xl" />
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <div className="">
                            <button
                                onClick={() => setShowModal(true)}
                                className="relative h-52 sm:w-40 w-36 border-2 border-white rounded-xl overflow-hidden hover:border-blue-400 transition-all shadow-md shadow-gray-200"
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
                        <div className="">
                            <button
                                onClick={() => setShowUploadFileModal(true)}
                                className="relative h-52 sm:w-40 w-36 border-2 border-white rounded-xl overflow-hidden hover:border-blue-400 transition-all shadow-md shadow-gray-200 bg-white flex justify-center items-center"
                            >
                                <FaFileUpload className="text-6xl text-blue-400" />
                            </button>
                            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
                                Upload File
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-5 md:px-0 bg-white">
                <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700 flex flex-col gap-1">
                    <div className="flex items-center justify-between pb-2 font-medium px-4">
                        <h2 className="font-bold flex-grow">My Document</h2>
                        <p className="mr-12">Date Created</p>
                        <FcFolder className="text-3xl" />
                    </div>
                    {documents.map((document) => (
                        <DocumentsRow
                            key={document.id}
                            id={document.id}
                            fileName={document.data.fileName}
                            date={document.data.timestamp}
                            currentUserUid={currentUser.uid}
                            currentUserName={currentUser.displayName}
                        />
                    ))}
                    <hr className="my-2" />
                    {uploadDoc.map((document) => (
                        <UploadDocRow
                            key={document.id}
                            id={document.id}
                            fileName={document.data.fileName}
                            date={document.data.timestamp}
                            currentUserUid={currentUser.uid}
                            currentUserName={currentUser.displayName}
                            finalFileName={document.data.encryptFileName}
                            url={document.data.url}
                        />
                    ))}
                </div>
            </section>

            {showModal && <Modal showModal={showModal} closeShowModal={closeShowModal} createDocument={createDocument} fileName={fileName} setFileName={setFileName} />}

            {showUploadFileModal && <Modal showModal={showUploadFileModal} closeShowModal={closeUploadFileModal} uploadFile={uploadFile} setUploadFileData={setUploadFileData} fileName={fileName} setFileName={setFileName} />}

        </>
    )
}

export default HomePage