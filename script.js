document.addEventListener("DOMContentLoaded", () => {
  // --- DATA UNDANGAN (Ubah sesuai kebutuhan Anda) ---
  const weddingData = {
    pria: {
      namaLengkap: "Mohamad Ramadhan Fauzi",
      namaPanggilan: "Ramadhan",
      ortu: "Putra dari Bpk. Moh. Romli & Ibu Ati Mintarsih"
    },
    wanita: {
      namaLengkap: "Desi Nur Asipa",
      namaPanggilan: "Desi",
      ortu: "Putri dari Bpk. Dedi Setiadi & Ibu Mulyanah"
    },
    tanggalAcara: "2027-08-28T08:00:00", // Format ISO untuk hitung mundur
    coverDateText: "28 Agustus 2027",
    coverPlaceText: "Rumah Mempelai Perempuan",
    kutipan: `"Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepada-Nya, dan Dia menjadikan di antaramu rasa kasih dan sayang."`,
    sumberKutipan: "QS. Ar-Rum: 21",
    akad: {
      tanggal: "Sabtu, 28 Agustus 2027",
      waktu: "Pukul 08.00 WIB - Selesai",
      tempat: "Kediaman Mempelai Perempuan",
      alamat: "Kp. Salongok, Desa Cibadak, Kec. cibeber, Cianjur"
    },
    resepsi: {
      tanggal: "Sabtu, 28 Agustus 2027",
      waktu: "Pukul 11.00 WIB - Selesai",
      tempat: "Kediaman Mempelai Perempuan",
      alamat: "Kp. Salongok, Desa Cibadak, Kec. cibeber, Cianjur"
    },
    lokasiMap: {
      tempat: "Kediaman Mempelai Perempuan",
      alamat: "Kp. Salongok, Desa Cibadak, Kec. cibeber, Cianjur",
      dressCode: "Dress Code: Bebas (Rapi & Sopan)",
      linkMaps: "https://maps.google.com/maps?q=346V%2B8Q2,+Cibadak,+Kec.+Cibeber,+Kabupaten+Cianjur,+Jawa+Barat+43262,+Indonesia@-6.9392676,107.1443442&z=10"
    },
    whatsapp: {
      nomor: "6289605673133", // Ganti dengan nomor WhatsApp tujuan konfirmasi
      pesan: "Halo, saya mengonfirmasi akan hadir di acara pernikahan Ramadhan & Desi. Terima kasih."
    }
  };

  // --- Masukkan Data ke Elemen HTML ---
  document.getElementById("cover-pria").textContent = weddingData.pria.namaPanggilan;
  document.getElementById("cover-wanita").textContent = weddingData.wanita.namaPanggilan;
  document.getElementById("cover-date").textContent = weddingData.coverDateText;
  document.getElementById("cover-place").textContent = weddingData.coverPlaceText;

  document.getElementById("nama-pria").textContent = weddingData.pria.namaLengkap;
  document.getElementById("ortu-pria").textContent = weddingData.pria.ortu;
  document.getElementById("nama-wanita").textContent = weddingData.wanita.namaLengkap;
  document.getElementById("ortu-wanita").textContent = weddingData.wanita.ortu;

  document.getElementById("kutipan").textContent = weddingData.kutipan;
  document.getElementById("sumber-kutipan").textContent = weddingData.sumberKutipan;

  // Akad
  document.getElementById("tanggal-akad").textContent = weddingData.akad.tanggal;
  document.getElementById("waktu-akad").textContent = weddingData.akad.waktu;
  document.getElementById("tempat-akad").textContent = weddingData.akad.tempat;
  document.getElementById("alamat-akad").textContent = weddingData.akad.alamat;

  // Resepsi
  document.getElementById("tanggal-resepsi").textContent = weddingData.resepsi.tanggal;
  document.getElementById("waktu-resepsi").textContent = weddingData.resepsi.waktu;
  document.getElementById("tempat-resepsi").textContent = weddingData.resepsi.tempat;
  document.getElementById("alamat-resepsi").textContent = weddingData.resepsi.alamat;

  // Map & Lokasi
  document.getElementById("tempat-map").textContent = weddingData.lokasiMap.tempat;
  document.getElementById("alamat-map").textContent = weddingData.lokasiMap.alamat;
  document.getElementById("dress-code").textContent = weddingData.lokasiMap.dressCode;
  document.getElementById("maps-link").href = weddingData.lokasiMap.linkMaps;

  // RSVP WhatsApp Link
  const waUrl = `https://wa.me/${weddingData.whatsapp.nomor}?text=${encodeURIComponent(weddingData.whatsapp.pesan)}`;
  const waLink = document.getElementById("wa-link");
  if(waLink) {
    waLink.href = waUrl;
  }

  // Footer Names
  document.getElementById("footer-names").textContent = `${weddingData.pria.namaPanggilan} & ${weddingData.wanita.namaPanggilan}`;

  // --- Tombol Buka Undangan ---
  const openBtn = document.getElementById("open-btn");
  const cover = document.getElementById("cover");
  const invitation = document.getElementById("invitation");
  const rsvpSection = document.getElementById("rsvp-section");

  openBtn.addEventListener("click", () => {
    cover.classList.add("hidden");
    invitation.hidden = false;
    if(rsvpSection) rsvpSection.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Fitur Countdown (Hitung Mundur) ---
  const targetDate = new Date(weddingData.tanggalAcara).getTime();
  const dEl = document.getElementById("d");
  const hEl = document.getElementById("h");
  const mEl = document.getElementById("m");
  const sEl = document.getElementById("s");
  const countdownBox = document.getElementById("countdown");
  const endedBox = document.getElementById("ended");

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      if(countdownBox) countdownBox.hidden = true;
      if(endedBox) endedBox.hidden = false;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(dEl) dEl.textContent = days;
    if(hEl) hEl.textContent = hours;
    if(mEl) mEl.textContent = minutes;
    if(sEl) sEl.textContent = seconds;
  };

  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);
});