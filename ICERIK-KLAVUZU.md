# Velvet & Cradle — İçerik Güncelleme Kılavuzu

Bu dosyayı bir metin editörü ile aç (Notepad, TextEdit, VS Code, hepsi çalışır).

---

## 📸 1. FOTOĞRAF EKLEME

HTML dosyalarında `img-placeholder` olan yerleri gerçek fotoğrafla değiştir.

### Şu an olan (placeholder):
```html
<div class="img-placeholder large">
  <span>Hero Image 1200 × 900px</span>
</div>
```

### Fotoğraf ekledikten sonra:
```html
<img src="images/nursery-hero.jpg" alt="Lüks bebek odası" class="hero-photo">
```

**Fotoğraf boyutları:**
| Alan | Boyut |
|------|-------|
| Hero | 1400 × 900px |
| Room foto | 1000 × 800px |
| Blog kapak | 600 × 400px |
| Ürün foto | 400 × 400px |

**Klasör yapısı:** Tüm fotoğrafları `images/` klasörüne koy.

---

## 🛍️ 2. AMAZON LİNKİ GÜNCELLEME

`editorial.html` dosyasında `YOUR-AMAZON-LINK-HERE` yazan yerleri bul ve kendi affiliate linkinle değiştir.

### Şu an:
```html
<a href="YOUR-AMAZON-LINK-HERE" target="_blank" rel="noopener sponsored" class="btn-primary small">View Product</a>
```

### Güncellenmiş:
```html
<a href="https://www.amazon.co.uk/dp/ÜRÜN-KODU?tag=SENİN-TAG-İD" target="_blank" rel="noopener sponsored" class="btn-primary small">View Product</a>
```

---

## ✏️ 3. YENİ BLOG YAZISI EKLEME

`index.html` dosyasında Editorial Notes bölümünü bul.

Her kart şu yapıda:
```html
<article class="editorial-card" onclick="window.location='editorial.html'">
  <div class="img-placeholder editorial warm">
    <span>Blog Image 600 × 400px</span>
  </div>
  <div class="card-meta">
    <span class="label tag">KATEGORİ ADI</span>
    <h3 class="card-title">BAŞLIK</h3>
    <p class="card-excerpt">KISA ÖZET (2-3 cümle)</p>
    <a href="yeni-makale.html" class="read-more label">Read More</a>
  </div>
</article>
```

**Yeni yazı eklemek için:**
1. Yukarıdaki kodu kopyala
2. `editorial.html` dosyasını kopyala → `yeni-makale.html` olarak kaydet
3. İçeriği düzenle
4. `onclick` ve `href` linklerini yeni dosya adıyla güncelle

---

## 🎨 4. RENK DEĞİŞTİRME

`style.css` dosyasının en üstündeki `:root` bölümünü bul:

```css
:root {
  --primary: #6c5b4d;        /* Ana renk — butonlar */
  --primary-dim: #5f5042;    /* Hover durumu */
  --primary-container: #f5decd; /* Açık vurgu */
  --surface: #faf9f6;        /* Sayfa arkaplanı */
  --surface-low: #f4f4f0;    /* Bölüm arkaplanı */
}
```

Sadece bu değerleri değiştir, rest otomatik güncellenir.

---

## 📝 5. METİN DEĞİŞTİRME

Sık güncellenen metinler ve yerleri:

| Metin | Dosya | Arama terimi |
|-------|-------|--------------|
| Site başlığı | `index.html` | `Velvet & Cradle` |
| Hero başlık | `index.html` | `Design Your Dream` |
| Hero açıklama | `index.html` | `Elevate your little one` |
| Quote | `index.html` | `Your home is the first gallery` |
| Footer tagline | her iki dosya | `Curated sanctuary` |

---

## 🌐 6. IONOS'A YÜKLEME

1. Ionos kontrol paneline gir
2. **Web Hosting** → **File Manager** (veya FTP)
3. `public_html` klasörüne gir
4. Şu dosyaları yükle:
   - `index.html`
   - `editorial.html`
   - `style.css`
   - `main.js`
   - `images/` klasörü (fotoğraflarınla birlikte)
5. Tarayıcıda `velvetandcradle.com` yaz — site çalışıyor olmalı!

**FTP tercih edersen:** FileZilla uygulamasını kur, Ionos FTP bilgilerini gir.

---

## 🔄 7. YENİ İÇERİK İŞ AKIŞI

Yeni bir "Shop the Look" yazısı eklemek için:
1. `editorial.html` dosyasını kopyala
2. Fotoğrafları `images/` klasörüne ekle
3. Ürün isimlerini, açıklamaları ve Amazon linklerini güncelle
4. `index.html` içindeki editorial-grid'e yeni kart ekle
5. Ionos'a yükle

**Toplam süre:** Fotoğraflar hazırsa ~20-30 dakika / yazı

---

*İçerik soruların için veya yeni bir sayfa eklemek istersen Claude'a sor — bu dosyayı paylaşarak başla.*
