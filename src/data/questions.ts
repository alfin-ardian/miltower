import type { Question } from "../types/game";

export const QUESTIONS: Question[] = [
  {
    id: "ml-01",
    number: 7,
    category: "media-literacy",
    difficulty: "medium",
    question:
      "Kamu melihat sebuah foto viral dengan caption bahwa kejadian tersebut baru saja terjadi. Apa yang akan kamu lakukan sebelum membagikannya? Jelaskan minimal dua langkah dan alasannya.",
    minimumWords: 40,
    referenceTopics: [
      "sumber",
      "tanggal",
      "konteks",
      "verifikasi",
      "cek fakta",
    ],
  },
  {
    id: "ml-02",
    number: 12,
    category: "media-literacy",
    difficulty: "easy",
    question:
      "Kamu melihat video viral dengan caption yang provokatif. Bagaimana kamu menentukan apakah video tersebut layak dipercaya?",
    minimumWords: 35,
    referenceTopics: ["sumber", "konteks", "edit", "verifikasi", "emosi"],
  },
  {
    id: "ml-03",
    number: 18,
    category: "media-literacy",
    difficulty: "hard",
    question:
      "Sebuah akun membagikan cuplikan wawancara politisi yang terpotong, lalu menambahkan teks yang seolah-olah jadi kesimpulan wawancara. Bagaimana kamu menilai apakah cuplikan itu jujur atau menyesatkan?",
    minimumWords: 50,
    referenceTopics: [
      "konteks",
      "potongan",
      "sumber asli",
      "bingkai",
      "verifikasi",
    ],
  },
  {
    id: "ml-04",
    number: 21,
    category: "media-literacy",
    difficulty: "medium",
    question:
      "Headline sebuah berita terdengar bombastis, tapi kamu belum membaca isinya. Apa risikonya jika kamu langsung membagikan judul itu, dan bagaimana cara membacanya dengan lebih bijak?",
    minimumWords: 40,
    referenceTopics: [
      "baca sampai tuntas",
      "clickbait",
      "judul",
      "isi",
      "konteks",
    ],
  },
  {
    id: "ml-05",
    number: 25,
    category: "media-literacy",
    difficulty: "easy",
    question:
      "Seorang influencer merekomendasikan produk seolah-olah ulasan jujur. Apa tanda yang kamu cari untuk membedakan opini tulus dan promosi terselubung?",
    minimumWords: 35,
    referenceTopics: ["endorsement", "kepentingan", "transparansi", "bukti"],
  },
  {
    id: "ml-06",
    number: 31,
    category: "media-literacy",
    difficulty: "hard",
    question:
      "Beredar video selebriti yang seolah mengaku bersalah, tapi beberapa teman bilang itu deepfake. Bagaimana kamu memeriksa keaslian wajah, suara, dan klaim di video itu tanpa langsung menyebarkannya?",
    minimumWords: 50,
    referenceTopics: [
      "deepfake",
      "sumber",
      "metadata",
      "perbandingan",
      "cek fakta",
    ],
  },
  {
    id: "il-01",
    number: 8,
    category: "information-literacy",
    difficulty: "medium",
    question:
      "Kamu menemukan dua artikel dengan informasi yang berbeda tentang sebuah peristiwa. Apa yang akan kamu lakukan untuk menentukan informasi yang lebih dapat dipercaya?",
    minimumWords: 40,
    referenceTopics: [
      "sumber",
      "bandingkan",
      "bukti",
      "tanggal",
      "kredibilitas",
    ],
  },
  {
    id: "il-02",
    number: 14,
    category: "information-literacy",
    difficulty: "easy",
    question:
      "Di grup keluarga beredar pesan berantai yang mengklaim ada bahaya kesehatan mendesak, tanpa tautan sumber. Apa langkahmu sebelum meneruskannya ke grup lain?",
    minimumWords: 35,
    referenceTopics: ["sumber", "cek fakta", "pesan berantai", "otoritas"],
  },
  {
    id: "il-03",
    number: 19,
    category: "information-literacy",
    difficulty: "hard",
    question:
      "Sebuah infografis menampilkan angka yang dramatis, tapi tidak menyebut metode, sampel, atau lembaga yang menghitungnya. Bagaimana kamu menilai apakah datanya layak dipakai untuk argumen?",
    minimumWords: 50,
    referenceTopics: [
      "data",
      "metodologi",
      "sumber",
      "visualisasi",
      "konteks",
    ],
  },
  {
    id: "il-04",
    number: 22,
    category: "information-literacy",
    difficulty: "medium",
    question:
      "Untuk tugas kuliah, kamu menemukan penjelasan di Wikipedia dan satu artikel jurnal. Bagaimana kamu memakai keduanya secara bertanggung jawab, bukan menyalin mentah-mentah?",
    minimumWords: 40,
    referenceTopics: [
      "sumber primer",
      "sitasi",
      "kredibilitas",
      "verifikasi",
      "konteks",
    ],
  },
  {
    id: "il-05",
    number: 28,
    category: "information-literacy",
    difficulty: "easy",
    question:
      "Seseorang di komentar media sosial menulis “katanya sudah dibuktikan ilmiah” tanpa menyebut studi apa. Pertanyaan apa yang kamu ajukan sebelum mempercayai klaim itu?",
    minimumWords: 35,
    referenceTopics: ["bukti", "sumber", "klaim", "ahli", "cek"],
  },
  {
    id: "il-06",
    number: 33,
    category: "information-literacy",
    difficulty: "hard",
    question:
      "Dua portal berita menulis kronologi yang bertentangan soal siapa yang memulai insiden. Bagaimana kamu menyusun garis waktu sendiri dari bukti yang tersedia, dan kapan kamu memilih untuk menunda kesimpulan?",
    minimumWords: 50,
    referenceTopics: [
      "kronologi",
      "bukti",
      "sumber",
      "bias",
      "menunda kesimpulan",
    ],
  },
  {
    id: "dl-01",
    number: 9,
    category: "digital-literacy",
    difficulty: "easy",
    question:
      "Seorang teman meminta password akunmu karena ingin membantu login. Apakah kamu sebaiknya memberikannya? Jelaskan alasanmu.",
    minimumWords: 35,
    referenceTopics: [
      "password",
      "privasi",
      "keamanan",
      "akun",
      "tidak membagikan",
    ],
  },
  {
    id: "dl-02",
    number: 15,
    category: "digital-literacy",
    difficulty: "medium",
    question:
      "Kamu mendapat DM berisi tautan undian hadiah dengan batas waktu “hari ini saja”. Bagaimana kamu memutuskan apakah tautan itu aman, dan apa yang kamu lakukan pada akun jika sempat terlanjur diklik?",
    minimumWords: 40,
    referenceTopics: [
      "phishing",
      "tautan",
      "domain",
      "keamanan",
      "lapor",
    ],
  },
  {
    id: "dl-03",
    number: 20,
    category: "digital-literacy",
    difficulty: "medium",
    question:
      "Kamu sedang di kafe dan perlu cek saldo lewat Wi-Fi publik. Apa risikonya, dan bagaimana cara yang lebih aman untuk urusan finansial di luar rumah?",
    minimumWords: 40,
    referenceTopics: [
      "wifi publik",
      "https",
      "vpn",
      "data pribadi",
      "keamanan",
    ],
  },
  {
    id: "dl-04",
    number: 24,
    category: "digital-literacy",
    difficulty: "easy",
    question:
      "Temanmu mengunggah foto bersama dengan lokasi real-time setiap hari. Menurutmu, apa dampaknya bagi privasi, dan bagaimana kamu akan membicarakannya tanpa menggurui?",
    minimumWords: 35,
    referenceTopics: [
      "lokasi",
      "privasi",
      "oversharing",
      "keamanan",
      "persetujuan",
    ],
  },
  {
    id: "dl-05",
    number: 29,
    category: "digital-literacy",
    difficulty: "hard",
    question:
      "Cuplikan chat pribadimu tersebar di story orang lain. Apa langkah digital dan sosial yang kamu ambil, dan bagaimana kamu mencegah hal serupa terjadi lagi?",
    minimumWords: 50,
    referenceTopics: [
      "persetujuan",
      "screenshot",
      "lapor",
      "privasi",
      "bukti",
    ],
  },
  {
    id: "dl-06",
    number: 34,
    category: "digital-literacy",
    difficulty: "hard",
    question:
      "Aplikasi baru meminta izin kamera, mikrofon, kontak, dan lokasi padahal fungsinya hanya pengingat tugas. Bagaimana kamu menilai izin tersebut, dan apa yang kamu lakukan sebelum menekan “izinkan”?",
    minimumWords: 50,
    referenceTopics: [
      "izin aplikasi",
      "privasi",
      "data",
      "keamanan",
      "minimal izin",
    ],
  },
];
