'use client';

import {useState, useRef, useEffect} from "react";
import {ChevronDown} from "lucide-react";
import LogoImg from '../public/assets/images/logo.webp'
import Image from "next/image";

export default function Home() {
    const wardRef = useRef<HTMLDivElement>(null);
    const areaRef = useRef<HTMLDivElement>(null);

    const [ward, setWard] = useState("");
    const [area, setArea] = useState("");
    const [wardOpen, setWardOpen] = useState(false);
    const [areaOpen, setAreaOpen] = useState(false);

    const wards = [
        "ওয়ার্ড নং-০১",
        "ওয়ার্ড নং-০২",
        "ওয়ার্ড নং-০৩",
        "ওয়ার্ড নং-০৪",
        "ওয়ার্ড নং-০৫",
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wardRef.current &&
                !wardRef.current.contains(event.target as Node)
            ) {
                setWardOpen(false);
            }

            if (
                areaRef.current &&
                !areaRef.current.contains(event.target as Node)
            ) {
                setAreaOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const areas = [
        "এলাকা-১",
        "এলাকা-২",
        "এলাকা-৩",
        "এলাকা-৪",
    ];
    return (
        <>
            <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center p-4">
                <div className="image_box w-full rounded-xl flex items-center justify-center p-4 custom-gradient">
                    <Image src={LogoImg} width={300} alt="LogoImg"/>
                </div>
                <div className="w-full bg-green-900 rounded-xl overflow-hidden mt-4 p-8">
                    {/* Title */}
                    <h1 className="text-center text-white text-2xl md:text-3xl font-bold mb-10">
                        আপনার ভোট কেন্দ্রের নাম জানতে আপনার তথ্য প্রদান করুন
                    </h1>

                    {/* Form */}
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-white mb-2 text-sm font-medium">
                                ভোটার নাম (এনআইডি-কার্ড অনুযায়ী)
                            </label>
                            <input
                                type="text"
                                placeholder="মোঃ/মোছাঃ বাদে নামের প্রথম দুই"
                                className="w-full bg-white rounded-lg px-4 py-2 text-[14px] outline-none border border-gray-300 focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-white mb-2 text-sm font-medium">
                                জন্ম তারিখ (তারিখ/মাস/বছর)
                            </label>
                            <input
                                type="text"
                                placeholder="উদাহরণ: ২৯/১২/১৯৮৭"
                                className="w-full bg-white rounded-lg px-4 py-2 text-[14px] outline-none border border-gray-300 focus:ring-2 focus:ring-green-400"
                            />
                        </div>

                        {/* Ward Custom Select */}
                        <div ref={wardRef} className="relative">
                            <label className="block text-white mb-2 text-sm font-medium">
                                ওয়ার্ড নির্বাচন করুন
                            </label>

                            <button
                                type="button"
                                onClick={() => {
                                    setWardOpen(!wardOpen);
                                    setAreaOpen(false);
                                }}
                                className="w-full bg-white rounded-lg px-4 py-2 text-[14px] flex items-center justify-between border border-gray-300"
                            >
              <span className={ward ? "text-gray-800" : "text-gray-400"}>
                {ward || "ওয়ার্ড নং-০১ (পৌরসভা)"}
              </span>
                                <ChevronDown className="w-5 h-5 text-gray-500"/>
                            </button>

                            {wardOpen && (
                                <ul className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border overflow-hidden custom_select">
                                    {wards.map((item, index) => (
                                        <li
                                            key={`${item}-${index}`}
                                            onClick={() => {
                                                setWard(item);
                                                setWardOpen(false);
                                            }}
                                            className="px-4 py-2 cursor-pointer hover:bg-green-100"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Area Custom Select */}
                        <div ref={areaRef} className="relative">
                            <label className="block text-white mb-2 text-sm font-medium">
                                এলাকা নির্বাচন করুন (ঐচ্ছিক)
                            </label>

                            <button
                                type="button"
                                onClick={() => {
                                    setAreaOpen(!areaOpen);
                                    setWardOpen(false);
                                }}
                                className="w-full bg-white rounded-lg px-4 py-2 text-[14px] flex items-center justify-between border border-gray-300"
                            >
                          <span className={area ? "text-gray-800" : "text-gray-400"}>
                            {area || "এলাকা নির্বাচন করুন (ঐচ্ছিক)"}
                          </span>
                                <ChevronDown className="w-5 h-5 text-gray-500"/>
                            </button>

                            {areaOpen && (
                                <ul className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border overflow-hidden custom_select">
                                    {areas.map((item, index) => (
                                        <li
                                            key={`${item}-${index}`}
                                            onClick={() => {
                                                setArea(item);
                                                setAreaOpen(false);
                                            }}
                                            className="px-4 py-2 cursor-pointer hover:bg-green-100"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <h4 className="text-[12px] text-gray-300 text-end mt-1">
                                (ওয়ার্ড নির্বাচনের পর এলাকা সিলেক্ট করুন)
                            </h4>
                        </div>
                    </form>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="reset"
                            className="bg-indigo-600 cursor-pointer text-[14px] hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
                        >
                            রিসেট
                        </button>

                        <button
                            type="submit"
                            className="bg-red-500 cursor-pointer text-[14px] hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium"
                        >
                            অনুসন্ধান
                        </button>
                    </div>

                    {/* Help Line */}
                    <p className="text-white text-sm mt-4">
                        হেল্প ডেস্ক: +৮৮০১৮০১১৩৬২৪
                    </p>
                </div>
            </div>
        </>
    );
}
