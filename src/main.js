import './style.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { createIcons, Home, Heart, Calendar, MessageCircle } from 'lucide';

// 1. PASTE CONFIG FIREBASE KAMU DI SINI
const firebaseConfig = {
  apiKey: "AIzaSyAut_VIV_FD2V0qhnt8a1fLPpmYNzCOUY0",
  authDomain: "indahsyaiful.firebaseapp.com",
  databaseURL: "https://indahsyaiful-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "indahsyaiful",
  storageBucket: "indahsyaiful.firebasestorage.app",
  messagingSenderId: "29726222667",
  appId: "1:29726222667:web:5bd167afcd6a41d731a0ce",
  measurementId: "G-KFZG2ZVPE4"
};

// 2. Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const wishesCol = collection(db, "wishes");

// 3. Ambil elemen HTML
const wishForm = document.getElementById('wish-form');
const wishContainer = document.getElementById('wish-container');

// 4. Fungsi Kirim Ucapan
wishForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = wishForm.querySelector('button');
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  btn.disabled = true;
  btn.innerText = "Mengirim...";

  try {
    await addDoc(wishesCol, {
      name: name,
      message: message,
      timestamp: serverTimestamp()
    });
    wishForm.reset();
  } catch (err) {
    console.error("Gagal kirim ucapan: ", err);
    alert("Yah, gagal kirim. Coba lagi ya!");
  } finally {
    btn.disabled = false;
    btn.innerText = "Kirim Ucapan";
  }
});

// Inisialisasi AOS
AOS.init({
  once: true, // Animasi hanya berjalan sekali saat di-scroll
  duration: 800,
});

// Jalankan Lucide Icons
createIcons({
  icons: {
    Home,
    Heart,
    Calendar,
    MessageCircle
  }
});

// 5. Fungsi Tampil Ucapan (Real-time)
const q = query(wishesCol, orderBy("timestamp", "desc"));
onSnapshot(q, (snapshot) => {
  wishContainer.innerHTML = ''; // Kosongkan dulu sebelum isi baru

  snapshot.forEach((doc) => {
    const data = doc.data();
    // Format waktu sederhana
    const date = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString('id-ID') : 'Baru saja';

    const card = `
      <div class="bg-white p-4 rounded-xl border border-stone-100 shadow-sm transition-all hover:shadow-md">
        <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-dark-slate text-sm">${data.name}</h4>
            <span class="text-[10px] text-stone-400">${date}</span>
        </div>
        <p class="text-stone-600 text-sm leading-relaxed italic">"${data.message}"</p>
      </div>
    `;
    wishContainer.innerHTML += card;
  });
});