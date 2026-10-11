(() => {
"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const PROFILE_KEY = "mathlearn_profile_v3";
const PROGRESS_KEY = "mathlearn_progress_v3";

const topics = [
{
  id: 1,
  title: "Operasi Bilangan Bulat",
  grade: "10",
  category: "Bilangan",
  formula: "a + (−b) = a − b",
  desc: "Operasi penjumlahan, pengurangan, perkalian, dan pembagian bilangan bulat.",
  example: "−7 + 12",
  answer: "5",
  steps: [
    "Mulai dari −7.",
    "Tambahkan 12 berarti bergerak 12 langkah ke arah positif.",
    "Hasil akhirnya adalah 5."
  ],
  questions: [
    ["−8 + 13 = …", ["−21", "−5", "5", "21"], "5", "Hasilnya 5."],
    ["6 − 14 = …", ["8", "−8", "20", "−20"], "−8", "6 − 14 = −8."],
    ["(−4) × 5 = …", ["20", "−20", "−9", "9"], "−20", "Negatif dikali positif menghasilkan negatif."],
    ["(−36) ÷ (−6) = …", ["−6", "6", "−30", "30"], "6", "Negatif dibagi negatif menghasilkan positif."]
  ]
},
{
  id: 2,
  title: "Pecahan",
  grade: "10",
  category: "Bilangan",
  formula: "a/b + c/d = (ad + bc)/bd",
  desc: "Menyederhanakan dan menghitung pecahan.",
  example: "1/2 + 1/4",
  answer: "3/4",
  steps: [
    "Samakan penyebut menjadi 4.",
    "Ubah 1/2 menjadi 2/4.",
    "Jumlahkan: 2/4 + 1/4 = 3/4."
  ],
  questions: [
    ["1/2 + 1/4 = …", ["1/6", "2/6", "3/4", "1/4"], "3/4", "Ubah 1/2 menjadi 2/4, lalu jumlahkan."],
    ["3/5 − 1/5 = …", ["2/5", "2/0", "4/5", "3/10"], "2/5", "Kurangi pembilang: (3−1)/5 = 2/5."],
    ["2/3 × 3/4 = …", ["1/2", "5/7", "6/7", "2/4"], "1/2", "6/12 disederhanakan menjadi 1/2."]
  ]
},
{
  id: 3,
  title: "Persentase",
  grade: "10",
  category: "Bilangan",
  formula: "Persentase = (bagian / total) × 100%",
  desc: "Menghitung persen, diskon, dan bagian dari jumlah.",
  example: "20% dari 150",
  answer: "30",
  steps: [
    "Ubah 20% menjadi 20/100.",
    "Kalikan 20/100 × 150.",
    "Hasilnya 30."
  ],
  questions: [
    ["25% dari 200 adalah …", ["25", "40", "50", "75"], "50", "25/100 × 200 = 50."],
    ["10% dari 350 adalah …", ["3,5", "35", "45", "70"], "35", "10/100 × 350 = 35."],
    ["Diskon 25% dari Rp80.000 adalah …", ["Rp10.000", "Rp15.000", "Rp20.000", "Rp25.000"], "Rp20.000", "25% × Rp80.000 = Rp20.000."]
  ]
},
{
  id: 4,
  title: "Perbandingan dan Rasio",
  grade: "10",
  category: "Bilangan",
  formula: "a : b = a/b",
  desc: "Membandingkan dua besaran dan menyelesaikan perbandingan.",
  example: "Rasio 2 : 3 dengan total 25",
  answer: "10 dan 15",
  steps: [
    "Jumlah bagian = 2 + 3 = 5.",
    "Satu bagian = 25 ÷ 5 = 5.",
    "Bagian pertama 10 dan bagian kedua 15."
  ],
  questions: [
    ["Rasio 2 : 3 memiliki total 20. Bagian pertama …", ["5", "8", "10", "12"], "8", "Jumlah bagian 5, satu bagian 4, sehingga 2 × 4 = 8."],
    ["Rasio 4 : 8 disederhanakan menjadi …", ["1 : 2", "2 : 1", "1 : 4", "4 : 1"], "1 : 2", "Bagi kedua angka dengan 4."],
    ["3 buku seharga Rp18.000. Harga 5 buku …", ["Rp24.000", "Rp27.000", "Rp30.000", "Rp36.000"], "Rp30.000", "Harga satu buku Rp6.000."]
  ]
},
{
  id: 5,
  title: "FPB dan KPK",
  grade: "10",
  category: "Bilangan",
  formula: "FPB = faktor bersama terbesar; KPK = kelipatan bersama terkecil",
  desc: "Menentukan faktor dan kelipatan bersama.",
  example: "FPB dari 12 dan 18",
  answer: "6",
  steps: [
    "Faktor 12 antara lain 1, 2, 3, 4, 6, 12.",
    "Faktor 18 antara lain 1, 2, 3, 6, 9, 18.",
    "Faktor bersama terbesar adalah 6."
  ],
  questions: [
    ["FPB dari 12 dan 18 adalah …", ["2", "3", "6", "36"], "6", "Faktor bersama terbesar adalah 6."],
    ["KPK dari 4 dan 6 adalah …", ["10", "12", "18", "24"], "12", "Kelipatan bersama terkecil adalah 12."],
    ["FPB dari 15 dan 25 adalah …", ["3", "5", "10", "75"], "5", "Faktor bersama terbesar adalah 5."]
  ]
},
{
  id: 6,
  title: "Pangkat",
  grade: "10",
  category: "Aljabar",
  formula: "aᵐ × aⁿ = aᵐ⁺ⁿ",
  desc: "Aturan operasi perpangkatan.",
  example: "2³ × 2²",
  answer: "32",
  steps: [
    "Jika basis sama, pangkat dijumlahkan.",
    "2³ × 2² = 2⁵.",
    "2⁵ = 32."
  ],
  questions: [
    ["2³ × 2² = …", ["16", "24", "32", "64"], "32", "2⁵ = 32."],
    ["3² = …", ["6", "9", "12", "18"], "9", "3 × 3 = 9."],
    ["5⁰ = …", ["0", "1", "5", "10"], "1", "Bilangan bukan nol berpangkat nol adalah 1."]
  ]
},
{
  id: 7,
  title: "Bentuk Akar",
  grade: "10",
  category: "Aljabar",
  formula: "√(ab) = √a × √b",
  desc: "Menyederhanakan bentuk akar.",
  example: "√50",
  answer: "5√2",
  steps: [
    "Uraikan 50 menjadi 25 × 2.",
    "√50 = √25 × √2.",
    "Hasilnya 5√2."
  ],
  questions: [
    ["√49 = …", ["6", "7", "8", "9"], "7", "7 × 7 = 49."],
    ["√50 disederhanakan menjadi …", ["2√5", "5√2", "10√5", "25√2"], "5√2", "√(25 × 2) = 5√2."],
    ["√9 + √16 = …", ["5", "7", "12", "25"], "7", "3 + 4 = 7."]
  ]
},
{
  id: 8,
  title: "Aljabar Dasar",
  grade: "10",
  category: "Aljabar",
  formula: "ax + bx = (a + b)x",
  desc: "Menyederhanakan suku sejenis.",
  example: "3x + 5x − 2",
  answer: "8x − 2",
  steps: [
    "3x dan 5x adalah suku sejenis.",
    "Jumlahkan koefisien: 3 + 5 = 8.",
    "Hasilnya 8x − 2."
  ],
  questions: [
    ["3x + 5x = …", ["8", "8x", "15x", "2x"], "8x", "Jumlahkan koefisien 3 + 5."],
    ["7a − 2a = …", ["5", "5a", "9a", "14a"], "5a", "7a − 2a = 5a."],
    ["2(x + 3) = …", ["2x + 3", "2x + 6", "x + 6", "2x + 5"], "2x + 6", "Kalikan 2 ke setiap suku."]
  ]
},
{
  id: 9,
  title: "Persamaan Linear Satu Variabel",
  grade: "10",
  category: "Aljabar",
  formula: "ax + b = c → x = (c − b)/a",
  desc: "Menentukan nilai variabel dalam persamaan linear.",
  example: "2x + 6 = 14",
  answer: "x = 4",
  steps: [
    "Kurangi kedua ruas dengan 6: 2x = 8.",
    "Bagi kedua ruas dengan 2.",
    "Jadi x = 4."
  ],
  questions: [
    ["x + 7 = 12, x = …", ["3", "4", "5", "19"], "5", "12 − 7 = 5."],
    ["3x = 21, x = …", ["6", "7", "8", "18"], "7", "21 ÷ 3 = 7."],
    ["2x + 4 = 10, x = …", ["2", "3", "4", "7"], "3", "2x = 6, sehingga x = 3."]
  ]
},
{
  id: 10,
  title: "Sistem Persamaan Linear Dua Variabel",
  grade: "10",
  category: "Aljabar",
  formula: "ax + by = c dan px + qy = r",
  desc: "Menyelesaikan dua persamaan dengan eliminasi atau substitusi.",
  example: "x + y = 7; x − y = 1",
  answer: "x = 4, y = 3",
  steps: [
    "Jumlahkan persamaan: 2x = 8.",
    "Maka x = 4.",
    "Substitusikan ke x + y = 7, sehingga y = 3."
  ],
  questions: [
    ["x + y = 7 dan x − y = 1. Nilai x …", ["2", "3", "4", "7"], "4", "Jumlahkan persamaan sehingga 2x = 8."],
    ["Jika x = 2 dan y = 5, maka x + y = …", ["3", "7", "10", "25"], "7", "2 + 5 = 7."],
    ["2x = 18, maka x = …", ["8", "9", "16", "20"], "9", "18 ÷ 2 = 9."]
  ]
}
];

const defaultProgress = () => ({
  answers: 0,
  correct: 0,
  topics: {},
  history: []
});

let profile = null;
let progress = defaultProgress();
let currentQuiz = null;
let toastTimer = null;
  topics.push(
{
  id: 11, title: "Pertidaksamaan Linear", grade: "10",
  category: "Aljabar", formula: "Jika dibagi bilangan negatif, tanda pertidaksamaan berbalik.",
  desc: "Menyelesaikan pertidaksamaan linear.",
  example: "x + 3 > 8", answer: "x > 5",
  steps: ["Kurangi kedua ruas dengan 3.", "Diperoleh x > 5."],
  questions: [
    ["x + 4 > 9, maka …", ["x > 5","x < 5","x > 13","x < 13"], "x > 5", "Kurangi kedua ruas dengan 4."],
    ["2x ≤ 10, maka …", ["x ≤ 5","x ≥ 5","x ≤ 20","x ≥ 20"], "x ≤ 5", "Bagi kedua ruas dengan 2."],
    ["−2x > 6, maka …", ["x > −3","x < −3","x > 3","x < 3"], "x < −3", "Tanda berbalik saat dibagi −2."]
  ]
},
{
  id: 12, title: "Fungsi", grade: "10",
  category: "Fungsi", formula: "f(x) = aturan yang memetakan x ke suatu nilai",
  desc: "Menghitung nilai suatu fungsi.",
  example: "f(x) = 2x + 1; f(3)", answer: "7",
  steps: ["Ganti x dengan 3.", "f(3) = 2(3) + 1.", "Hasilnya 7."],
  questions: [
    ["f(x)=2x+1. Nilai f(3) …", ["5","6","7","8"], "7", "2(3)+1 = 7."],
    ["f(x)=x². Nilai f(−4) …", ["−16","−8","8","16"], "16", "(−4)² = 16."],
    ["f(x)=x−5. Nilai f(8) …", ["3","5","13","40"], "3", "8 − 5 = 3."]
  ]
},
{
  id: 13, title: "Persamaan Kuadrat", grade: "11",
  category: "Aljabar", formula: "x = (−b ± √(b² − 4ac)) / 2a",
  desc: "Menentukan akar persamaan kuadrat.",
  example: "x² − 5x + 6 = 0", answer: "x = 2 atau x = 3",
  steps: ["Faktorkan menjadi (x − 2)(x − 3) = 0.", "Maka x = 2 atau x = 3."],
  questions: [
    ["Akar x² − 5x + 6 = 0 adalah …", ["1 dan 6","2 dan 3","−2 dan −3","−1 dan −6"], "2 dan 3", "(x−2)(x−3)=0."],
    ["Diskriminan persamaan kuadrat adalah …", ["a²−4bc","b²−4ac","b²+4ac","2a"], "b²−4ac", "D = b² − 4ac."],
    ["x² = 25, nilai x adalah …", ["5 saja","−5 saja","±5","25"], "±5", "Akar kuadrat 25 adalah 5 dan −5."]
  ]
},
{
  id: 14, title: "Barisan Aritmetika", grade: "11",
  category: "Barisan", formula: "Uₙ = a + (n − 1)b",
  desc: "Menentukan suku ke-n barisan aritmetika.",
  example: "2, 5, 8, 11, … suku ke-5", answer: "14",
  steps: ["Suku pertama 2, beda 3.", "U₅ = 2 + (5−1)3.", "U₅ = 14."],
  questions: [
    ["2, 5, 8, 11, … suku ke-5 …", ["12","13","14","15"], "14", "U₅ = 2 + 4(3) = 14."],
    ["Beda 7, 11, 15, 19 adalah …", ["2","3","4","5"], "4", "Setiap suku bertambah 4."],
    ["U₁=4, beda=2. U₆ = …", ["12","14","16","18"], "14", "U₆ = 4 + 5(2) = 14."]
  ]
},
{
  id: 15, title: "Barisan Geometri", grade: "11",
  category: "Barisan", formula: "Uₙ = a × rⁿ⁻¹",
  desc: "Menentukan suku barisan dengan rasio tetap.",
  example: "3, 6, 12, 24, … suku ke-5", answer: "48",
  steps: ["Suku pertama 3 dan rasio 2.", "U₅ = 3 × 2⁴.", "U₅ = 48."],
  questions: [
    ["3, 6, 12, 24, … suku ke-5 …", ["36","42","48","54"], "48", "3 × 2⁴ = 48."],
    ["Rasio 5, 15, 45, … adalah …", ["2","3","5","10"], "3", "15 ÷ 5 = 3."],
    ["U₁=2, r=3. U₄ = …", ["18","27","54","81"], "54", "2 × 3³ = 54."]
  ]
},
{
  id: 16, title: "Trigonometri Dasar", grade: "10",
  category: "Geometri", formula: "sin = depan/miring; cos = samping/miring; tan = depan/samping",
  desc: "Perbandingan sisi segitiga siku-siku.",
  example: "sin 30°", answer: "1/2",
  steps: ["Sinus adalah sisi depan dibagi sisi miring.", "Nilai sin 30° = 1/2."],
  questions: [
    ["sin 30° = …", ["0","1/2","√2/2","1"], "1/2", "Nilai sudut istimewa sin 30° adalah 1/2."],
    ["cos 60° = …", ["0","1/2","√3/2","1"], "1/2", "cos 60° = 1/2."],
    ["tan 45° = …", ["0","1/2","1","√3"], "1", "tan 45° = 1."]
  ]
},
{
  id: 17, title: "Teorema Pythagoras", grade: "10",
  category: "Geometri", formula: "a² + b² = c²",
  desc: "Menghitung sisi segitiga siku-siku.",
  example: "Sisi siku-siku 3 dan 4", answer: "5",
  steps: ["c² = 3² + 4².", "c² = 9 + 16 = 25.", "c = 5."],
  questions: [
    ["Sisi siku-siku 3 dan 4, sisi miring …", ["5","6","7","8"], "5", "√(9+16) = 5."],
    ["Sisi miring 13 dan satu sisi 5. Sisi lainnya …", ["8","10","12","18"], "12", "√(169−25) = 12."],
    ["Sisi siku-siku 6 dan 8, sisi miring …", ["9","10","12","14"], "10", "√(36+64) = 10."]
  ]
},
{
  id: 18, title: "Bangun Datar", grade: "10",
  category: "Geometri", formula: "Persegi: L=s²; segitiga: L=½at",
  desc: "Menghitung keliling dan luas bangun datar.",
  example: "Luas persegi sisi 7 cm", answer: "49 cm²",
  steps: ["Luas persegi = sisi × sisi.", "L = 7 × 7 = 49 cm²."],
  questions: [
    ["Luas persegi sisi 6 cm …", ["12 cm²","24 cm²","36 cm²","48 cm²"], "36 cm²", "6² = 36."],
    ["Keliling persegi panjang p=8, l=3 …", ["11 cm","16 cm","22 cm","24 cm"], "22 cm", "2(8+3) = 22."],
    ["Luas segitiga alas 10 dan tinggi 6 …", ["16 cm²","30 cm²","60 cm²","80 cm²"], "30 cm²", "½ × 10 × 6 = 30."]
  ]
},
{
  id: 19, title: "Lingkaran", grade: "11",
  category: "Geometri", formula: "K = 2πr; L = πr²",
  desc: "Menghitung luas dan keliling lingkaran.",
  example: "Keliling r = 7 cm, π=22/7", answer: "44 cm",
  steps: ["K = 2πr.", "K = 2 × 22/7 × 7.", "K = 44 cm."],
  questions: [
    ["Diameter lingkaran dengan r=7 cm …", ["7 cm","14 cm","21 cm","44 cm"], "14 cm", "Diameter = 2r = 14 cm."],
    ["Luas lingkaran r=7 cm, π=22/7 …", ["44 cm²","88 cm²","154 cm²","308 cm²"], "154 cm²", "L = 22/7 × 49 = 154."],
    ["Keliling lingkaran d=14 cm …", ["22 cm","44 cm","88 cm","154 cm"], "44 cm", "K = πd = 44 cm."]
  ]
},
{
  id: 20, title: "Bangun Ruang", grade: "10",
  category: "Geometri", formula: "Kubus: V=s³; balok: V=p×l×t",
  desc: "Menghitung volume bangun ruang.",
  example: "Volume kubus sisi 4 cm", answer: "64 cm³",
  steps: ["Volume kubus = s³.", "V = 4 × 4 × 4 = 64 cm³."],
  questions: [
    ["Volume kubus sisi 3 cm …", ["9 cm³","18 cm³","27 cm³","36 cm³"], "27 cm³", "3³ = 27."],
    ["Volume balok 4×3×5 cm …", ["12 cm³","20 cm³","45 cm³","60 cm³"], "60 cm³", "4 × 3 × 5 = 60."],
    ["Volume tabung r=2, t=5, π=3,14 …", ["31,4","62,8","78,5","125,6"], "62,8", "3,14 × 2² × 5 = 62,8."]
  ]
},
{
  id: 21, title: "Statistika Dasar", grade: "10",
  category: "Statistika", formula: "Rata-rata = jumlah data / banyak data",
  desc: "Memahami mean, median, dan modus.",
  example: "Data 2, 4, 6", answer: "Mean = 4",
  steps: ["Jumlah data = 12.", "Banyak data = 3.", "Mean = 12 ÷ 3 = 4."],
  questions: [
    ["Mean dari 2, 4, 6 adalah …", ["3","4","5","6"], "4", "(2+4+6)/3 = 4."],
    ["Median dari 1, 3, 7 adalah …", ["1","3","5","7"], "3", "Nilai tengahnya 3."],
    ["Modus dari 2, 2, 3, 4 adalah …", ["2","3","4","Tidak ada"], "2", "Angka 2 paling sering muncul."]
  ]
},
{
  id: 22, title: "Peluang", grade: "10",
  category: "Peluang", formula: "P(A) = n(A) / n(S)",
  desc: "Menghitung peluang kejadian sederhana.",
  example: "Peluang muncul angka pada koin", answer: "1/2",
  steps: ["Ada dua hasil yang mungkin.", "Satu hasil adalah angka.", "Peluang = 1/2."],
  questions: [
    ["Peluang muncul angka pada koin seimbang …", ["0","1/4","1/2","1"], "1/2", "Satu hasil dari dua kemungkinan."],
    ["Peluang muncul angka 6 pada dadu …", ["1/2","1/3","1/6","1"], "1/6", "Satu hasil dari enam kemungkinan."],
    ["Peluang kejadian pasti adalah …", ["0","1/4","1/2","1"], "1", "Kejadian pasti bernilai 1."]
  ]
},
{
  id: 23, title: "Matriks", grade: "11",
  category: "Aljabar", formula: "(A+B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ",
  desc: "Mengenal ordo, penjumlahan, dan determinan matriks.",
  example: "[1, 2] + [3, 4]", answer: "[4, 6]",
  steps: ["Jumlahkan elemen yang bersesuaian.", "1+3=4 dan 2+4=6."],
  questions: [
    ["[1,2] + [3,4] = …", ["[2,2]","[4,6]","[3,8]","[4,8]"], "[4,6]", "Jumlahkan elemen bersesuaian."],
    ["Matriks dengan 2 baris dan 3 kolom berordo …", ["2×2","2×3","3×2","3×3"], "2×3", "Ordo adalah baris × kolom."],
    ["Determinan [[a,b],[c,d]] adalah …", ["ab−cd","ad−bc","ac−bd","a+d"], "ad−bc", "Rumus determinan 2×2 adalah ad − bc."]
  ]
},
{
  id: 24, title: "Vektor", grade: "11",
  category: "Geometri", formula: "|v| = √(x² + y²)",
  desc: "Menghitung panjang dan operasi vektor.",
  example: "Panjang vektor (3,4)", answer: "5",
  steps: ["Gunakan √(x²+y²).", "√(9+16) = √25.", "Hasilnya 5."],
  questions: [
    ["Panjang vektor (3,4) …", ["4","5","6","7"], "5", "√(9+16) = 5."],
    ["(2,3)+(1,4) = …", ["(1,1)","(2,7)","(3,7)","(3,12)"], "(3,7)", "Jumlahkan komponen masing-masing."],
    ["Panjang vektor (0,6) …", ["0","3","6","36"], "6", "√(0²+6²) = 6."]
  ]
},
{
  id: 25, title: "Limit Fungsi", grade: "12",
  category: "Kalkulus", formula: "limₓ→ₐ f(x)",
  desc: "Memahami nilai yang didekati fungsi.",
  example: "lim x→2 (x+3)", answer: "5",
  steps: ["Substitusikan x dengan 2.", "2 + 3 = 5."],
  questions: [
    ["lim x→2 (x+3) = …", ["2","3","5","6"], "5", "Substitusi x=2."],
    ["lim x→3 (2x) = …", ["3","5","6","9"], "6", "2 × 3 = 6."],
    ["lim x→1 (x²+2) = …", ["1","2","3","4"], "3", "1² + 2 = 3."]
  ]
},
{
  id: 26, title: "Turunan", grade: "12",
  category: "Kalkulus", formula: "Jika f(x)=xⁿ, f′(x)=nxⁿ⁻¹",
  desc: "Menentukan turunan fungsi pangkat.",
  example: "f(x)=x³", answer: "f′(x)=3x²",
  steps: ["Pangkat 3 menjadi koefisien.", "Kurangi pangkat menjadi 2.", "Hasilnya 3x²."],
  questions: [
    ["Turunan f(x)=x² adalah …", ["x","2x","2x²","x³"], "2x", "Turunan x² adalah 2x."],
    ["Turunan f(x)=x³ adalah …", ["x²","2x","3x²","3x³"], "3x²", "Turunan x³ adalah 3x²."],
    ["Turunan f(x)=5x adalah …", ["0","1","5","5x"], "5", "Turunan ax adalah a."]
  ]
},
{
  id: 27, title: "Integral Dasar", grade: "12",
  category: "Kalkulus", formula: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C",
  desc: "Mempelajari integral tak tentu sederhana.",
  example: "∫2x dx", answer: "x² + C",
  steps: ["Naikkan pangkat x dari 1 menjadi 2.", "Bagi koefisien dengan pangkat baru.", "Hasilnya x² + C."],
  questions: [
    ["∫2x dx = …", ["2x²+C","x²+C","2+C","x+C"], "x²+C", "Antiturunan 2x adalah x²+C."],
    ["∫1 dx = …", ["1+C","x+C","x²+C","0"], "x+C", "Antiturunan 1 adalah x+C."],
    ["∫3x² dx = …", ["3x³+C","x³+C","x²+C","6x+C"], "x³+C", "Naikkan pangkat menjadi 3 dan bagi 3 dengan 3."]
  ]
},
{
  id: 28, title: "Logaritma", grade: "11",
  category: "Aljabar", formula: "logₐ(b)=c ⇔ aᶜ=b",
  desc: "Menghubungkan logaritma dengan perpangkatan.",
  example: "log₂ 8", answer: "3",
  steps: ["Cari pangkat 2 agar hasilnya 8.", "Karena 2³ = 8, hasilnya 3."],
  questions: [
    ["log₂ 8 = …", ["2","3","4","8"], "3", "2³ = 8."],
    ["log₁₀ 100 = …", ["1","2","10","100"], "2", "10² = 100."],
    ["log₃ 1 = …", ["0","1","3","Tidak terdefinisi"], "0", "3⁰ = 1."]
  ]
},
{
  id: 29, title: "Transformasi Geometri", grade: "11",
  category: "Geometri", formula: "Translasi (x,y) → (x+a,y+b)",
  desc: "Translasi, refleksi, rotasi, dan dilatasi titik.",
  example: "Titik (2,3) ditranslasi (1,−2)", answer: "(3,1)",
  steps: ["Koordinat x menjadi 2+1=3.", "Koordinat y menjadi 3−2=1.", "Titik baru adalah (3,1)."],
  questions: [
    ["(2,3) ditranslasi (1,−2) menjadi …", ["(1,5)","(3,1)","(2,1)","(3,5)"], "(3,1)", "Tambahkan komponen koordinat."],
    ["Refleksi titik (3,2) terhadap sumbu-y …", ["(3,−2)","(−3,2)","(−3,−2)","(2,3)"], "(−3,2)", "Tanda koordinat x berubah."],
    ["Dilatasi faktor 2 pada titik (2,1) …", ["(2,2)","(4,2)","(4,1)","(1,2)"], "(4,2)", "Kalikan kedua koordinat dengan 2."]
  ]
},
{
  id: 30, title: "Kecepatan, Jarak, dan Waktu", grade: "10",
  category: "Aplikasi", formula: "v = s/t; s = v×t; t = s/v",
  desc: "Menghubungkan kecepatan, jarak, dan waktu.",
  example: "Jarak 120 km ditempuh 3 jam", answer: "40 km/jam",
  steps: ["Kecepatan = jarak ÷ waktu.", "120 ÷ 3 = 40.", "Kecepatan 40 km/jam."],
  questions: [
    ["Jarak 120 km ditempuh 3 jam. Kecepatan …", ["30 km/jam","40 km/jam","60 km/jam","360 km/jam"], "40 km/jam", "120 ÷ 3 = 40."],
    ["Kecepatan 60 km/jam selama 2 jam. Jarak …", ["30 km","60 km","120 km","180 km"], "120 km", "60 × 2 = 120 km."],
    ["Jarak 150 km, kecepatan 50 km/jam. Waktu …", ["2 jam","3 jam","4 jam","5 jam"], "3 jam", "150 ÷ 50 = 3 jam."]
  ]
}
);

const defaultProgress = () => ({
  answers: 0,
  correct: 0,
  topics: {},
  history: []
});

let profile = null;
let progress = defaultProgress();
let currentQuiz = null;
let toastTimer = null;

function loadData() {
  try {
    profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
  } catch {
    profile = null;
  }

  if (!profile || typeof profile.name !== "string" ||
      !["10", "11", "12"].includes(String(profile.studentClass))) {
    profile = null;
  }

  try {
    const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "null");
    progress = { ...defaultProgress(), ...(stored || {}) };
  } catch {
    progress = defaultProgress();
  }

  if (!progress.topics || typeof progress.topics !== "object") {
    progress.topics = {};
  }
  if (!Array.isArray(progress.history)) {
    progress.history = [];
  }
}

function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function showToast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2500);
}

function today() {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short"
  }).format(new Date());
}

function setProfileUI() {
  $("#sidebarName").textContent = profile.name;
  $("#sidebarClass").textContent = `Kelas ${profile.studentClass}`;
  $("#avatarInitial").textContent = (profile.name.trim()[0] || "M").toUpperCase();
  $("#todayLabel").textContent = today();
}

function getTopicProgress(id) {
  return progress.topics[id] || { answers: 0, correct: 0, done: false };
}

function accuracy() {
  return progress.answers ? Math.round(progress.correct / progress.answers * 100) : 0;
}

function setView(view) {
  const titles = {
    home: "Beranda",
    materials: "Materi",
    examples: "Contoh Soal",
    practice: "Latihan Soal",
    progress: "Nilai & Progres"
  };

  $("#currentSection").textContent = titles[view] || "Beranda";
  $$(".nav-item").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.view === view)
  );
  $("#sidebar").classList.remove("open");

  if (view === "home") renderHome();
  else if (view === "materials") renderMaterials();
  else if (view === "examples") renderExamples();
  else if (view === "practice") renderPractice();
  else if (view === "progress") renderProgress();
}
  function renderHome() {
  const done = Object.values(progress.topics).filter(t => t.done).length;

  $("#pageContent").innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <span class="hero-tag">HALO, ${esc(profile.name.toUpperCase())} ✦</span>
        <h1>Setiap soal adalah kesempatan untuk paham.</h1>
        <p>Belajar matematika sesuai ritmemu. Pahami materi, lihat contoh, lalu uji kemampuanmu.</p>
      </div>
      <div class="hero-stats"><strong>${done}/30</strong><span>materi dipelajari</span></div>
    </section>
    <div class="section-heading"><div><h2>Ringkasan belajar</h2><p>Progres tersimpan di perangkat ini.</p></div></div>
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-top">Total materi</div><div class="stat-value">30</div></div>
      <div class="stat-card"><div class="stat-top">Soal dijawab</div><div class="stat-value">${progress.answers}</div></div>
      <div class="stat-card"><div class="stat-top">Jawaban benar</div><div class="stat-value">${progress.correct}</div></div>
      <div class="stat-card"><div class="stat-top">Akurasi</div><div class="stat-value">${accuracy()}%</div></div>
    </div>
    <div class="section-heading"><div><h2>Mulai belajar</h2><p>Pilih salah satu menu berikut.</p></div></div>
    <div class="quick-grid">
      <button class="quick-card" data-view="materials"><span class="quick-symbol">▤</span><div><strong>Materi</strong><small>30 materi dan rumus matematika.</small></div></button>
      <button class="quick-card" data-view="examples"><span class="quick-symbol">ƒ</span><div><strong>Contoh Soal</strong><small>Contoh beserta langkah pengerjaan.</small></div></button>
      <button class="quick-card" data-view="practice"><span class="quick-symbol">✎</span><div><strong>Latihan Soal</strong><small>Kerjakan soal dan lihat pembahasan.</small></div></button>
      <button class="quick-card" data-view="progress"><span class="quick-symbol">▥</span><div><strong>Nilai & Progres</strong><small>Lihat hasil latihanmu.</small></div></button>
    </div>`;
}

function topicCard(t) {
  const p = getTopicProgress(t.id);
  return `<article class="topic-card">
    <div class="topic-card-top"><span class="topic-number">MATERI ${t.id}</span>${p.done ? '<span class="done-pill">✓ Dipelajari</span>' : ""}</div>
    <h3>${esc(t.title)}</h3><p>${esc(t.desc)}</p>
    <div class="topic-card-top"><span class="topic-number">KELAS ${t.grade} · ${esc(t.category)}</span>
    <button class="small-button" data-open-topic="${t.id}">Pelajari →</button></div>
  </article>`;
}

function renderMaterials() {
  $("#pageContent").innerHTML = `
    <div class="section-heading"><div><h2>Jelajahi Materi</h2><p>30 materi dengan rumus dan contoh pengerjaan.</p></div></div>
    <div class="toolbar">
      <input id="materialSearch" class="search-input" placeholder="Cari materi...">
      <select id="topicFilter" class="filter-select">
        <option value="all">Semua kelas</option><option value="10">Kelas 10</option>
        <option value="11">Kelas 11</option><option value="12">Kelas 12</option>
      </select>
    </div>
    <div id="materialsGrid" class="topic-grid">${topics.map(topicCard).join("")}</div>
    <div id="noMaterials" class="empty-state hidden">Materi tidak ditemukan.</div>`;

  $("#materialSearch").addEventListener("input", filterMaterials);
  $("#topicFilter").addEventListener("change", filterMaterials);
}

function filterMaterials() {
  const q = $("#materialSearch").value.toLowerCase().trim();
  const grade = $("#topicFilter").value;
  const list = topics.filter(t =>
    (grade === "all" || t.grade === grade) &&
    `${t.title} ${t.desc} ${t.category}`.toLowerCase().includes(q)
  );
  $("#materialsGrid").innerHTML = list.map(topicCard).join("");
  $("#noMaterials").classList.toggle("hidden", list.length > 0);
}

function openTopic(id) {
  const t = topics.find(x => x.id === Number(id));
  if (!t) return;

  $("#modalContent").innerHTML = `
    <span class="eyebrow" style="color:#7659c4">MATERI ${t.id} · KELAS ${t.grade}</span>
    <h2 id="modalTitle">${esc(t.title)}</h2>
    <p class="topic-sub">${esc(t.desc)}</p>
    <div class="formula-box">${esc(t.formula)}</div>
    <p class="explanation">${esc(t.desc)}</p>
    <div class="example-box"><h4>Contoh soal</h4>
      <p><strong>${esc(t.example)}</strong></p>
      <p>Jawaban: <strong>${esc(t.answer)}</strong></p>
      <ol class="step-list">${t.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    </div>
    <div class="quiz-actions">
      <button class="secondary-button" data-close-modal>Tutup</button>
      <button class="primary-button" data-start-topic="${t.id}">Latihan materi ini →</button>
    </div>`;

  $("#modal").classList.remove("hidden");
  progress.topics[t.id] = { ...getTopicProgress(t.id), done: true };
  saveProgress();
}

function renderExamples() {
  $("#pageContent").innerHTML = `
    <div class="section-heading"><div><h2>Contoh Soal</h2><p>Pelajari contoh dan langkah pengerjaannya.</p></div></div>
    <div class="toolbar">
      <input id="exampleSearch" class="search-input" placeholder="Cari contoh soal...">
      <select id="exampleFilter" class="filter-select">
        <option value="all">Semua kelas</option><option value="10">Kelas 10</option>
        <option value="11">Kelas 11</option><option value="12">Kelas 12</option>
      </select>
    </div>
    <div id="examplesGrid" class="topic-grid">${topics.map(exampleCard).join("")}</div>
    <div id="noExamples" class="empty-state hidden">Contoh soal tidak ditemukan.</div>`;

  $("#exampleSearch").addEventListener("input", filterExamples);
  $("#exampleFilter").addEventListener("change", filterExamples);
}

function exampleCard(t) {
  return `<article class="topic-card">
    <div class="topic-card-top"><span class="topic-number">KELAS ${t.grade}</span><span class="topic-number">${esc(t.category)}</span></div>
    <h3>${esc(t.title)}</h3><p><strong>Soal:</strong> ${esc(t.example)}<br><strong>Jawaban:</strong> ${esc(t.answer)}</p>
    <button class="small-button" data-open-topic="${t.id}">Lihat pembahasan →</button>
  </article>`;
}

function filterExamples() {
  const q = $("#exampleSearch").value.toLowerCase().trim();
  const grade = $("#exampleFilter").value;
  const list = topics.filter(t =>
    (grade === "all" || t.grade === grade) &&
    `${t.title} ${t.example} ${t.desc}`.toLowerCase().includes(q)
  );
  $("#examplesGrid").innerHTML = list.map(exampleCard).join("");
  $("#noExamples").classList.toggle("hidden", list.length > 0);
}

function renderPractice(selectedId) {
  const chosen = selectedId || topics[0].id;
  $("#pageContent").innerHTML = `
    <div class="section-heading"><div><h2>Latihan Soal</h2><p>Pilih topik, jawab soal, dan periksa hasilmu.</p></div></div>
    <div class="practice-layout">
      <aside class="practice-side">
        <h3>Pilih materi</h3><p>Setiap sesi terdiri dari lima soal pilihan ganda.</p>
        <select id="practiceTopic" class="filter-select">
          ${topics.map(t => `<option value="${t.id}" ${t.id === Number(chosen) ? "selected" : ""}>${esc(t.title)}</option>`).join("")}
        </select>
        <p>Baca soal dengan teliti. Setelah menjawab, tekan periksa untuk melihat pembahasan.</p>
      </aside>
      <section id="quizArea" class="quiz-panel"></section>
    </div>`;

  $("#practiceTopic").addEventListener("change", e => startQuiz(Number(e.target.value)));
  startQuiz(Number(chosen));
}

function startQuiz(id) {
  const topic = topics.find(t => t.id === id) || topics[0];
  const questions = [...topic.questions];

  while (questions.length < 5) {
    questions.push(topic.questions[questions.length % topic.questions.length]);
  }

  currentQuiz = {
    topic, questions: questions.slice(0, 5), index: 0,
    selected: null, checked: false, correct: 0, finished: false
  };
  renderQuestion();
}

function renderQuestion() {
  const qz = currentQuiz;
  const area = $("#quizArea");
  if (!qz || !area) return;

  if (qz.finished) {
    const score = Math.round(qz.correct / qz.questions.length * 100);
    area.innerHTML = `<div class="result-center">
      <h3>Latihan selesai!</h3><div class="result-score">${score}%</div>
      <p>Jawaban benar: <strong>${qz.correct} dari ${qz.questions.length}</strong>.</p>
      <button id="retryQuiz" class="primary-button">Coba lagi</button>
      <button id="backMaterials" class="secondary-button">Pilih materi lain</button>
    </div>`;
    $("#retryQuiz").addEventListener("click", () => startQuiz(qz.topic.id));
    $("#backMaterials").addEventListener("click", () => setView("materials"));
    return;
  }

  const q = qz.questions[qz.index];
  area.innerHTML = `
    <div class="quiz-meta"><span>${esc(qz.topic.title)}</span><span>Soal ${qz.index + 1} dari ${qz.questions.length}</span></div>
    <div class="progress-track"><div class="progress-fill" style="width:${qz.index / qz.questions.length * 100}%"></div></div>
    <h3>Pertanyaan ${qz.index + 1}</h3><div class="question-text">${esc(q[0])}</div>
    <div class="answer-options">
      ${q[1].map((opt, i) => `<button class="answer-option ${qz.selected === i ? "selected" : ""}" data-answer="${i}" ${qz.checked ? "disabled" : ""}>${String.fromCharCode(65 + i)}. ${esc(opt)}</button>`).join("")}
    </div>
    ${qz.checked ? `<div class="feedback ${q[1][qz.selected] === q[2] ? "good" : "bad"}"><strong>${q[1][qz.selected] === q[2] ? "Benar!" : "Belum tepat."}</strong><br>Jawaban: ${esc(q[2])}. ${esc(q[3])}</div>` : ""}
    <div class="quiz-actions">
      <button id="quitQuiz" class="secondary-button">Keluar latihan</button>
      <button id="quizAction" class="primary-button" ${!qz.checked && qz.selected === null ? "disabled" : ""}>${qz.checked ? (qz.index === qz.questions.length - 1 ? "Lihat hasil" : "Soal berikutnya →") : "Periksa jawaban"}</button>
    </div>`;

  $$(".answer-option", area).forEach(btn => btn.addEventListener("click", () => {
    if (qz.checked) return;
    qz.selected = Number(btn.dataset.answer);
    renderQuestion();
  }));

  $("#quitQuiz").addEventListener("click", () => setView("home"));

  $("#quizAction").addEventListener("click", () => {
    if (!qz.checked) {
      qz.checked = true;
      const isCorrect = q[1][qz.selected] === q[2];
      if (isCorrect) qz.correct++;

      progress.answers++;
      if (isCorrect) progress.correct++;

      const old = getTopicProgress(qz.topic.id);
      progress.topics[qz.topic.id] = {
        ...old,
        answers: old.answers + 1,
        correct: old.correct + (isCorrect ? 1 : 0),
        done: true
      };
      saveProgress();
      renderQuestion();
    } else if (qz.index < qz.questions.length - 1) {
      qz.index++;
      qz.selected = null;
      qz.checked = false;
      renderQuestion();
    } else {
      qz.finished = true;
      progress.history.unshift({
        topic: qz.topic.title,
        score: Math.round(qz.correct / qz.questions.length * 100),
        correct: qz.correct,
        total: qz.questions.length,
        date: new Date().toISOString()
      });
      progress.history = progress.history.slice(0, 30);
      saveProgress();
      renderQuestion();
    }
  });
}

function renderProgress() {
  const done = Object.values(progress.topics).filter(t => t.done).length;

  $("#pageContent").innerHTML = `
    <div class="section-heading"><div><h2>Nilai & Progres</h2><p>Periksa perkembangan belajarmu.</p></div>
    <button id="resetProgress" class="danger-button">Reset progres</button></div>
    <div class="progress-summary">
      <div class="stat-card"><div class="stat-top">Soal dijawab</div><div class="progress-big">${progress.answers}</div></div>
      <div class="stat-card"><div class="stat-top">Jawaban benar</div><div class="progress-big">${progress.correct}</div></div>
      <div class="stat-card"><div class="stat-top">Akurasi</div><div class="progress-big">${accuracy()}%</div><div class="stat-caption">${done} materi dipelajari</div></div>
    </div>
    <section class="panel"><h3 class="panel-title">Riwayat latihan</h3>
      ${progress.history.length ? progress.history.map(h => `<div class="progress-row">
        <div><strong>${esc(h.topic)}</strong><small>${new Date(h.date).toLocaleDateString("id-ID")} · ${h.correct}/${h.total} benar</small></div>
        <div class="accuracy-bar"><span style="width:${h.score}%"></span></div><div class="score-text">${h.score}%</div>
      </div>`).join("") : '<div class="empty-state">Belum ada riwayat latihan. Kerjakan latihan untuk melihat nilai di sini.</div>'}
    </section>
    <section class="panel"><h3 class="panel-title">Progres setiap materi</h3>
      ${topics.map(t => {
        const p = getTopicProgress(t.id);
        return `<div class="progress-row"><div><strong>${esc(t.title)}</strong><small>${p.answers || 0} soal dijawab · ${p.correct || 0} benar</small></div><div class="accuracy-bar"><span style="width:${p.answers ? Math.round(p.correct / p.answers * 100) : 0}%"></span></div><div class="score-text">${p.done ? "Dipelajari" : "Belum dibuka"}</div></div>`;
      }).join("")}
    </section>`;

  $("#resetProgress").addEventListener("click", () => {
    if (confirm("Hapus semua nilai dan progres?")) {
      progress = defaultProgress();
      saveProgress();
      renderProgress();
      showToast("Progres berhasil direset.");
    }
  });
}

function bindGlobalEvents() {
  $("#loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#studentName").value.trim();
    const selected = $('input[name="studentClass"]:checked');

    if (!name) {
      showToast("Masukkan nama terlebih dahulu.");
      return;
    }
    if (!selected) {
      showToast("Pilih kelas 10, 11, atau 12.");
      return;
    }

    profile = { name, studentClass: selected.value };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    $("#loginScreen").classList.add("hidden");
    $("#app").classList.remove("hidden");
    setProfileUI();
    setView("home");
  });

  document.addEventListener("click", e => {
    const view = e.target.closest("[data-view]");
    if (view) {
      e.preventDefault();
      setView(view.dataset.view);
      return;
    }

    const topic = e.target.closest("[data-open-topic]");
    if (topic) {
      openTopic(topic.dataset.openTopic);
      return;
    }

    const start = e.target.closest("[data-start-topic]");
    if (start) {
      const id = Number(start.dataset.startTopic);
      $("#modal").classList.add("hidden");
      setView("practice");
      renderPractice(id);
      return;
    }

    if (e.target.closest("[data-close-modal]")) {
      $("#modal").classList.add("hidden");
    }
  });

  $("#menuToggle").addEventListener("click", () => {
    $("#sidebar").classList.toggle("open");
  });

  $("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("mathlearn_dark", document.body.classList.contains("dark") ? "1" : "0");
  });

  $("#changeProfile").addEventListener("click", () => {
    if (confirm("Kembali ke halaman masuk? Progres tetap tersimpan.")) {
      profile = null;
      localStorage.removeItem(PROFILE_KEY);
      $("#app").classList.add("hidden");
      $("#loginScreen").classList.remove("hidden");
      $("#studentName").value = "";
      $$('input[name="studentClass"]').forEach(input => input.checked = false);
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") $("#modal").classList.add("hidden");
  });
}

function init() {
  loadData();
  bindGlobalEvents();

  if (localStorage.getItem("mathlearn_dark") === "1") {
    document.body.classList.add("dark");
  }

  if (profile) {
    $("#loginScreen").classList.add("hidden");
    $("#app").classList.remove("hidden");
    setProfileUI();
    setView("home");
  } else {
    $("#loginScreen").classList.remove("hidden");
    $("#app").classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", init);

})();