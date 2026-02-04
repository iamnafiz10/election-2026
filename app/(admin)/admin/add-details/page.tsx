import React from 'react';
import Link from "next/link";

function Page() {
    return (
        <>
            <section
                id="add-section"
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4"
            >
                <div className="mt-2 flex justify-end">
                    <Link href='/admin' className="px-6 text-[14px] py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-blue-600">
                        Back
                    </Link>
                </div>
                <br/>
                <div className="bg-white rounded-lg shadow-xl w-80 md:w-96 relative text-[14px] max-h-[90vh] overflow-auto p-6">
                    <div className="flex flex-col items-center gap-4">
                        {/* File input */}
                        <label className="w-full">
                            <input type="file" className="hidden" id="file-upload" />
                            <div className="cursor-pointer px-4 py-6 border border-dashed border-gray-400 rounded-lg text-center text-gray-500 hover:bg-gray-50">
                                Click or Drag file here
                            </div>
                        </label>

                        {/* Submit button */}
                        <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
                            Upload
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Page;
