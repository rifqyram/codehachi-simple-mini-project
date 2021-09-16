# Tugas Kelompok ( My Personal Page )

Melanjutkan aplikasi personal resume dan buku tamu, tambahkan 2 modul lagi sebagai tugas akhir kalian.

## Persyaratan

1. Aplikasi harus terdiri dari page Home, About, Blog, [1 Page Modul Pilihan], dan Contact
2. Modul pilihan berupa:
   - Modul Portofolio
   - Modul Seminar
   - Modul Donasi
3. Harus ada Login page di mana ada yang user bisa mengelola data Blog, Contact (buku tamu), dan juga data dari salah satu modul pilihan.
4. Semua member yang login harus dibuatkan akunnya masing-masing dan bisa login, sehingga dibutuhkan Modul Manajemen User.
5. Link/Button Login dibebaskan penempatannya di mana saja selama tidak muncul setelah login berhasil.
6. Harus ada page backoffice sendiri yang berbeda dengan tampilan page utama, page backoffice terdiri dari menu Home, User Management, Guest Book, Blog, Portofolio/Seminar/Donasi.

## Detil Modul

### Modul Blog

Gunakan model berikut untuk membuat modul blog.

```typescript
class Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  url: string;
}
```

Field `author` diisi otomatis oleh user yang login, jadi tidak ada di form field isian blog.
Field `url` itu digunakan untuk membuat url dinamis ke page detail blog, contohnya url: `/blogs/:id/:url` => `/blogs/12345/pengenalan-angular`.

### Modul Portofolio

Gunakan model berikut untuk membuat modul portofolio.

```typescript
class Portofolio {
  id: string;
  projectName: string;
  projectImage: string;
  projectDescription: string;
  projectYear: string;
}
```

Untuk field `projectImage` bisa menggunakan link saja ke image yang sesuai, jadi tidak perlu upload file, nilai tambah jika bisa mengkonversi file image ke `base64` string lalu disimpan sebagai `projectImage`.

### Modul Seminar

Gunakan model berikut untuk membuat modul seminar.

```typescript
class Workshop {
  id: string;
  name: string;
  venue: string;
  location: string;
  startDate: Date;
  endDate: Date;
  brochureImage: string;
}
```

Untuk field `brochureImage` bisa menggunakan link saja ke image yang sesuai, jadi tidak perlu upload file, nilai tambah jika bisa mengkonversi file image ke `base64` string lalu disimpan sebagai `brochureImage`.

Untuk field `location` dapat berupa link google map, atau hanya alamat lokasinya, jika berupa link google map, maka harus ditampilkan sebagai link yang bisa diklik untuk membuka google map. Sementara `venue` adalah tempat diadakannya seminar, misal namanya Menara Jakarta.

### Modul Donasi

Gunakan model berikut untuk membuat modul donasi.

```typescript
class Donation {
  id: string;
  name: string;
  amount: number;
  message?: string;
  donatedAt: Date;
}
```

Modul donasi tidak bisa diupdate/dihapus, hanya bisa list donatur yang menampilkan namanya, jumlah, message jika ada, dan tanggal donasi. Pada bagian bawah list/table harus ada jumlah total donasi.

Pada halaman depan ada tombol untuk melakukan donasi, yang akan membuka pop up form donasi.

### Modul User

Modul user ini digunakan untuk mempermudah tim member login. Gunakan model berikut untuk membuat modul user.

```typescript
class User {
  id: string;
  username: string;
  password: string;
}
```

Field `password` pada saat pembuatan user, sebelum dikirim ke backend, harus diencode ke `base64` terlebih dahulu.

Validasi user ketika login menggunakan kombinasi `username` dan `password`, .

Untuk proses validasi login, pencarian user dengan username dapat menggunakan fitur searching mockapi `/users?search=reza`, lalu jika ada data ditemukan maka pilih 1 data pertama saja dan cek password-nya apakah sesuai.
