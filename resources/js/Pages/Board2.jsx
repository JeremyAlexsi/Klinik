import React, { useState, useEffect } from 'react';

export default function Board2({ auth }) {
  const ServiceCard = ({ title, schedule, doctors }) => (
    <div className="mb-4">
      <h2 className="text-3xl font-semibold mb-2 text-center text-yellow-500 font-montserrat" style={{ textShadow: '1px 1px 2px white' }}>{title}</h2>
      <div className="bg-[#E6F2FE] p-2 rounded-lg">
        <p className="text-sm">{schedule}</p>
        {doctors.map((doctor, index) => (
          <p key={index} className="text-sm font-montserrat">{doctor.name}, {doctor.code}</p>
        ))}
      </div>
    </div>
  );

  const QueueNumber = () => {
    const [currentQueueNumber, setCurrentQueueNumber] = useState('A-001');
    const [queueIndex, setQueueIndex] = useState(1);

    useEffect(() => {
      // Simulasi pengambilan data antrian dari backend
      const fetchQueueNumber = () => {
        const savedQueueIndex = localStorage.getItem('queueIndex');
        if (savedQueueIndex) {
          setQueueIndex(parseInt(savedQueueIndex, 10));
          setCurrentQueueNumber(`A-${String(savedQueueIndex).padStart(3, '0')}`);
        }
      };
      fetchQueueNumber();
    }, []);

    const incrementQueue = () => {
      const newQueueIndex = queueIndex + 1;
      setQueueIndex(newQueueIndex);
      setCurrentQueueNumber(`A-${String(newQueueIndex).padStart(3, '0')}`);
      localStorage.setItem('queueIndex', newQueueIndex);
    };

    return (
      <div className="mb-4">
        <h2 className="text-3xl font-semibold mb-2 text-center text-yellow-500 font-montserrat" style={{ textShadow: '1px 1px 2px white' }}>ANTRIAN</h2>
        <div className="text-center bg-[#E6F2FE] p-2 rounded-lg">
          <button
            onClick={incrementQueue}
            className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          >
            Ambil Nomor Antrian
          </button>
          <div className="text-lg font-bold">
            Nomor Antrian Saat Ini: {currentQueueNumber}
          </div>
        </div>
      </div>
    );
  };

  const USGSchedule = () => (
    <div className="mt-2">
      <h2 className="text-base font-semibold font-montserrat">USG:</h2>
      <p className="text-sm font-montserrat">Senin-Jumat, 08:00-16:00</p>
      <DoctorSchedule
        schedule={[
          { time: '08:00-10:00', doctors: ['Dr. Andika', 'Dr. Lina'] },
          { time: '10:00-12:00', doctors: ['Dr. Andika', 'Dr. Lina'] },
          { time: '12:00-14:00', doctors: ['Dr. Andika', 'Dr. Lina'] },
          { time: '14:00-16:00', doctors: ['Dr. Andika', 'Dr. Lina'] }
        ]}
      />
    </div>
  );

  const DoctorSchedule = ({ schedule }) => (
    <div className="mt-1">
      {schedule.map((slot, index) => (
        <div key={index} className="flex justify-between mt-1">
          <p className="text-sm font-montserrat">{slot.time}</p>
          {slot.doctors.map((doctor, index) => (
            <p key={index} className="text-sm font-montserrat">{doctor}</p>
          ))}
        </div>
      ))}
    </div>
  );

  const ImageSlider = () => {
    const images = [
      'layanan2.png',
      'layanan3.png',
      'layanan5.png',
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const intervalId = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1000); // Change image every second

      return () => clearTimeout(intervalId);
    }, [currentImageIndex]);

    const handlePreviousClick = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };

    const handleNextClick = () => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    };

    return (
      <div className="relative bg-[#E6F2FE] p-2 rounded-lg mt-2 mb-2 lg:mb-0 ">
        <div className="mt-2 relative">
          <img
            key={currentImageIndex} // Key added for image change detection
            src={images[currentImageIndex]}
            alt="Informasi Gambar"
            className="w-full h-96 object-cover rounded-lg"
            style={{ marginBottom: '1rem', marginTop: '1rem' }}
          />
          <button
            onClick={handlePreviousClick}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded"
          >
            {'<'}
          </button>
          <button
            onClick={handleNextClick}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded"
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative w-full p-2 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/lorongklinik.png)' }}>
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="relative">
        <header className="flex items-center justify-between bg-[#D8E4FA] p-4 rounded-lg backdrop-blur-md">
          <div className="flex items-center">
            <img src="/logoklinik.png" alt="Logo Klinik" className="h-12 w-auto mr-4 object-contain" />
          </div>
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold font-montserrat" style={{ color: '#0F4C81', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontSize: '36px' }}>KLINIK NARITA</h1>
            <p className="text-blue-900 font-bold font-montserrat">Jl Gabus Raya No.A-5 Rumbai Pekanbaru, Pekanbaru, Indonesia, Riau</p>
            <p className="text-blue-900 font-bold font-montserrat">Telp (0761) 51001</p>
          </div>
          <div className="text-right text-blue-900 font-bold font-montserrat">
            <p>{formattedDate}</p>
            <p>{formattedTime}</p>
          </div>
        </header>

        <div className="flex flex-wrap justify-between mt-5">
          <div className="flex-1 min-w-[200px] px-2 ">
            <ServiceCard
              title="POLI UMUM"
              schedule="Senin-Jumat, 08:00-16:00"
              doctors={[{ name: 'Dr. Andika', code: 'A-001' }, { name: 'Dr. Lina', code: 'A-001' }]}
            />
          </div>
          <div className="flex-1 min-w-[200px] px-2">
            <ServiceCard
              title="POLI GIGI"
              schedule="Senin-Jumat, 08:00-16:00"
              doctors={[{ name: 'Dr. Andika', code: 'A-001' }, { name: 'Dr. Lina', code: 'A-001' }]}
            />
          </div>
          <div className="flex-1 min-w-[200px] px-2">
            <ServiceCard
              title="USG"
              schedule="Senin-Jumat, 08:00-16:00"
              doctors={[{ name: 'Dr. Andika', code: 'A-001' }, { name: 'Dr. Lina', code: 'A-001' }]}
            />
            <USGSchedule />
          </div>
          <div className="flex-1 min-w-[200px] px-2">
            <ServiceCard
              title="KHITAN"
              schedule="Senin-Jumat, 08:00-16:00"
              doctors={[{ name: 'Dr. Andika', code: 'A-001' }, { name: 'Dr. Lina', code: 'A-001' }]}
            />
          </div>
          <div className="flex-1 min-w-[200px] px-2">
            <ServiceCard
              title="BERSALIN"
              schedule="Senin-Jumat, 08:00-16:00"
              doctors={[{ name: 'Dr. Andika', code: 'A-001' }, { name: 'Dr. Lina', code: 'A-001' }]}
            />
          </div>
          <div className="flex-1 min-w-[200px] px-2">
            <QueueNumber />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2 mt-2">
          <div className="w-full lg:w-1/2 px-2 mb-4">
            <div className="bg-[#E6F2FE] p-4 rounded-lg backdrop-blur-md mb-2">
              <p className="text-sm font-montserrat">
                Selamat datang di Klinik Narita! Kami menyediakan layanan kesehatan berkualitas tinggi untuk Anda dan keluarga. Dengan tim dokter yang berpengalaman dan fasilitas modern, kami siap melayani Anda dengan sepenuh hati.
              </p>
            </div>

            <div className="bg-[#E6F2FE] p-4 rounded-lg backdrop-blur-md mb-2">
              <p className="font-semibold font-montserrat text-red-600">
                Pengumuman Khusus !!! <br />
              </p>
              <p className="font-semibold font-montserrat text-blue-900">
                Jadwal Libur Dokter:<br />
              </p>
              <p className="text-sm font-montserrat">
                - Dr. Andi, Spesialis Penyakit Dalam, akan cuti pada tanggal 15-20 Juli 2024. <br />
                - Dr. Budi, Spesialis Anak, akan libur pada tanggal 22-25 Juli 2024.
              </p>
              <p className="font-semibold font-montserrat text-blue-900">
                Perubahan Jam Operasional:<br />
              </p>
              <p className="text-sm font-montserrat">
                Mulai tanggal 1 Agustus 2024, klinik akan buka dari pukul 07.00 - 21.00 WIB setiap hari Senin hingga Sabtu.
              </p>
            </div>

            <div className="bg-[#E6F2FE] p-4 rounded-lg backdrop-blur-md ">
              <p className="font-semibold font-montserrat text-blue-900">
                Aturan Klinik: <br />
              </p>
              <p className="text-sm font-montserrat">
                Gunakan masker selama berada di dalam klinik.
                Jaga jarak minimal 1 meter dengan pasien lain.
                Cuci tangan atau gunakan hand sanitizer sebelum masuk ke ruang konsultasi.
              </p>
            </div>
            <div className="flex flex-wrap justify-between mt-2">
              <div className="w-full lg:w-1/2 px-2 mb-2">
                <div className="bg-[#E6F2FE] p-4 rounded-lg backdrop-blur-md">
                  <h2 className="font-semibold font-montserrat text-blue-900">Jam Operasional</h2>
                  <p className="text-sm font-montserrat">SENIN-JUMAT: 07:00-18:00</p>
                  <p className="text-sm font-montserrat">SABTU: 07:00-13:00</p>
                  <p className="text-sm font-montserrat">MINGGU TUTUP</p>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-2 mb-2">
                <div className="bg-[#E6F2FE] p-4 rounded-lg backdrop-blur-md">
                  <h2 className="font-semibold font-montserrat text-blue-900">Kontak Darurat</h2>
                  <p className="text-sm font-montserrat">+62812-3456-896 (24 Jam)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-2">
            <ImageSlider />
          </div>
        </div>

        <footer className="text-center mt-2 p-2 rounded-lg backdrop-blur-md" style={{ backgroundColor: '#304972' }}>
          <p className="text-sm text-white font-montserrat">
            Temukan kenyamanan dan kepercayaan di Klinik Narita. Kunjungi kami hari ini dan mulailah perjalanan menuju kesehatan yang lebih baik!
          </p>
        </footer>
      </div>
    </div>
  );
}
