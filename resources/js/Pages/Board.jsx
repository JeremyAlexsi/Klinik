import React, { useState, useEffect, memo } from "react";
import {
    DOKTER_STATUS_CLASS_MAP,
    DOKTER_STATUS_TEXT_MAP,
} from "@/constants.jsx";

export default function Board({ auth, dokters }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const ServiceCard = ({ doctors }) => (
        <div className="bg-sky-100 p-6 rounded-3xl mt-2 shadow-md">
            {doctors.map((doctor, index) => (
                <div key={index} className="flex justify-between items-center">
                    <h2
                        className="text-2xl font-semibold text-blue-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        {doctor.name}
                    </h2>
                    <div
                        className="text-md rounded-3xl text-white p-2"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                    <span
                        className={
                            "px-2 py-1 rounded text-white " +
                            DOKTER_STATUS_CLASS_MAP[doctor.kehadiran]
                        }
                    >
                        {DOKTER_STATUS_TEXT_MAP[doctor.kehadiran]}
                    </span>
                    </div>
                </div>
            ))}
        </div>
    );

    const QueueNumber = ({ number }) => (
        <div className="text-center bg-sky-100 p-5 rounded-lg mt-2 shadow-md text-blue-900">
            <h2
                className="text-4xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
            >
                Promosi dan Penawaran Khusus Diskon Pemeriksaan Kesehatan:
            </h2>
            <p
                className="text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
            >
                Dapatkan diskon 20% untuk paket pemeriksaan kesehatan lengkap
                selama bulan Juli 2024. Promosi ini berlaku untuk semua pasien,
                baik baru maupun lama
            </p>
        </div>
    );

    return (
        <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url('papan/klinik2.jpg')` }}
        >
            <div className="w-full p-2 flex flex-col min-h-screen">
                <header className="text-center bg-sky-100 p-2 rounded-lg shadow-md">
                    <img
                        src="papan/logo2.png"
                        alt=""
                        className="mx-auto h-24 w-24 object-center"
                    />

                    <h1
                        className="text-5xl text-blue-900 font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        KLINIK NARITA
                    </h1>
                    <p
                        className="text-md"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        Jl Gabus Raya No.A-5 Rumbai Pekanbaru, Pekanbaru,
                        Indonesia, Riau
                    </p>
                    <p
                        className="text-md"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        Telp (0761) 51001
                    </p>
                    <div className="flex justify-between mt-1 text-md">
                        <p style={{ fontFamily: "Montserrat, sans-serif" }}>
                            {formatDate(currentTime)}
                        </p>
                        <p style={{ fontFamily: "Montserrat, sans-serif" }}>
                            {formatTime(currentTime)}
                        </p>
                    </div>
                </header>
                <div className="flex mt-2">
                    <div className="w-full lg:w-1/2 px-2">
                        {dokters.data.map((dokter) => (
                            <ServiceCard doctors={[{ name: dokter.nama, kehadiran: dokter.kehadiran }]} />
                        ))}
                    </div>
                    <div className="w-full lg:w-1/2 px-2 py-2 bg-sky-100 p-4 mt-2 rounded-lg shadow-md text-blue-900">
                        <h2
                            className="text-5xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                            Prosedur Pendaftaran
                        </h2>
                        <h2
                            className="text-5xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                            Pendaftaran di Tempat:
                        </h2>
                        <p
                            className="text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                            1. Datang ke meja resepsionis klinik.
                        </p>
                        <p
                            className="text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                            2. Ambil nomor antrian dan tunggu giliran Anda
                            dipanggil.
                        </p>
                        <p
                            className="text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                            3. Isi formulir pendaftaran dengan bantuan petugas.
                        </p>
                        <p
                            className="text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                            4. Serahkan formulir dan tunggu panggilan dari
                            dokter atau perawat.
                        </p>
                    </div>
                </div>
                <div className="w-full px-2 py-2 bg-sky-100 p-4 mt-2 rounded-lg shadow-md text-blue-900">
                    <h2
                        className="text-3xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        Aturan Klinik:
                    </h2>
                    <p
                        className="text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        1. Gunakan masker selama berada di dalam klinik.
                    </p>
                    <p
                        className="text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        2. Jaga jarak minimal 1 meter dengan pasien lain.
                    </p>
                    <p
                        className="text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        3. Cuci tangan atau gunakan hand sanitizer sebelum masuk
                        ke ruang konsultasi
                    </p>
                </div>
                <QueueNumber number="A-001" />
                <footer className="text-center mt-2 p-4 bg-blue-900 rounded-lg sticky bottom-0 bg-blue-900 marquee">
                    <p
                        className="text-3xl font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] marquee-content"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                        Temukan kenyamanan dan kepercayaan di Klinik Narita.
                        Kunjungi kami hari ini dan mulailah perjalanan menuju
                        kesehatan yang lebih baik!
                    </p>
                </footer>
            </div>
        </div>
    );
}
