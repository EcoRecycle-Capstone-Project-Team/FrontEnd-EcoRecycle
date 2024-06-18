# EcoRecycle - Front End Repository

<p align="center">
  <img src="public/assets/MainLogo.png" alt="LogoHopePoints" width="200">
  <h3 align="center">EcoRecycle (https://ecorecycle.my.id)</h3>
</p>

## Teknologi Yang Digunakan
Aplikasi dibangun menggunakan beberapa teknologi, diantaranya adalah:
<p>
  <img src="https://skillicons.dev/icons?i=react,kubernetes,docker,c,vim" />
</p>

## Panduan Kloning Repository
Untuk mengkloning repository front-end EcoRecycle ke komputer Anda, ikuti langkah-langkah berikut:

1. **Pastikan Anda memiliki Git dan Node.js terinstal di komputer Anda.**  
   Jika belum, Anda dapat mengunduh dan menginstalnya dari tautan berikut:
   - [Download Git](https://git-scm.com/downloads)
   - [Download Node.js](https://nodejs.org/)

2. **Buka terminal atau command prompt.**

3. **Kloning repository dengan perintah berikut:**

   ```bash
   git clone https://github.com/EcoRecycle-Capstone-Project-Team/FrontEnd-EcoRecycle.git

4. Navigasi ke direktori proyek yang baru saja Anda kloning:

   ```bash
   cd FrontEnd-EcoRecycle

5. Instal semua dependensi yang diperlukan dengan perintah berikut:

   ```bash
   npm install
   
6. Buat file baru .env di root directory proyek dan tambahkan kode berikut:

   ```bash
   VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY

> [!NOTE]
> Untuk mendapatkan api key Google Maps Api, kamu dapat mengakses dan mendaftar melalui [Google Maps Platform](https://developers.google.com/maps)
7. Jalankan proyek secara lokal menggunakan Vite:

   ```bash
   npm run dev

Setelah menjalankan perintah ini, Anda akan melihat pesan yang menunjukkan bahwa server pengembangan telah dimulai dan memberikan URL lokal (biasanya http://localhost:5173) untuk melihat aplikasi di browser Anda.

## Struktur Direktori
```plaintext
FrontEnd-EcoRecycle/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── redux/
│   ├── style/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

