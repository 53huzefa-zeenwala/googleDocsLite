import React from 'react'

export default function Modal({ showModal, closeShowModal, createDocument, deleteDocumentConfirm, setFileName, fileName, uploadFile, setUploadFileData }) {
    return (
        <div className="h-screen w-screen flex bg-[rgba(0,0,0,.4)] justify-center items-center fixed top-0 left-0 z-50">
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
                            {createDocument && <input
                                type="text"
                                placeholder="File Name..."
                                className="w-full py-2 px-3 border-2 border-gray-400 rounded-md my-6 bg-gray-50 outline-none focus:border-blue-400 focus:bg-blue-50 hover:border-blue-300 focus:shadow-md hover:bg-blue-50"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && createDocument()}
                            />}
                            {/* {createDocument && <input
                                type="checkbox"
                                placeholder="File Name..."
                                className="w-full py-2 px-3 border-2 border-gray-400 rounded-md my-6 bg-gray-50 outline-none focus:border-blue-400 focus:bg-blue-50 hover:border-blue-300 focus:shadow-md hover:bg-blue-50"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && createDocument()}
                            />} */}
                            {uploadFile && <input
                                type="text"
                                placeholder="File Name..."
                                className="w-full py-2 px-3 border-2 border-gray-400 rounded-md my-6 bg-gray-50 outline-none focus:border-blue-400 focus:bg-blue-50 hover:border-blue-300 focus:shadow-md hover:bg-blue-50"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && uploadFile()}
                            />}
                            {uploadFile && <input
                                type="file"
                                placeholder="Choose file"
                                className="w-full py-2 px-3 border-2 border-gray-400 rounded-md my-6 bg-gray-50 outline-none focus:border-blue-400 focus:bg-blue-50 hover:border-blue-300 focus:shadow-md hover:bg-blue-50"
                                onChange={(e) => setUploadFileData(e.target.files[0])}
                            />}
                            
                            {deleteDocumentConfirm && <h1 className='text-center pb-5 pt-1 text-xl font-semibold'>Are you sure you want to delete this document permanent?</h1>}

                            {createDocument && <button
                                data-modal-toggle="popup-modal"
                                type="button"
                                onClick={createDocument}
                                className='blueModal'
                            >
                                Create Doc
                            </button>}
                            {deleteDocumentConfirm && <button
                                data-modal-toggle="popup-modal"
                                type="button"
                                onClick={deleteDocumentConfirm}
                                className='redModal'
                            >
                                Delete Doc
                            </button>}


                            {uploadFile && <button
                                data-modal-toggle="popup-modal"
                                type="button"
                                onClick={uploadFile}
                                className="blueModal"
                            >
                                Upload Doc
                            </button>}
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
    )
}
