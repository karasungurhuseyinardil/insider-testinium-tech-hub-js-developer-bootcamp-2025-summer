const kullanici = {
    ad: prompt("Adınız: "),
    yas: prompt("Yaşınız: "),
    meslek: prompt("Mesleğiniz: ")
};

console.log("Kullanıcı bilgileri: ", kullanici);

let sepet = [];

function urunEkle() {
    const urunAdi = prompt("Ürün adı:");
    const urunFiyati = parseFloat(prompt("Ürün fiyatı:"));

    if (!urunAdi || isNaN(urunFiyati)) {
        alert("Hatalı giriş");
        return;
    }

    sepet.push({ urunAdi, urunFiyati });
    console.log(`${urunAdi} sepete eklendi`);
}

function sepetiListele() {
    if (sepet.length === 0) {
        console.log("Sepet boş");
        return;
    }

    console.log("Sepetteki ürünler:");
    sepet.forEach((urun, sira) => {
        console.log(`${sira + 1}. ${urun.urunAdi} - ${urun.urunFiyati.toFixed(2)} TL`);
    });
}

function toplamHesapla() {
    const toplam = sepet.reduce((tutar, urun) => tutar + urun.urunFiyati, 0);
    console.log(`Toplam sepet tutarı: ${toplam.toFixed(2)} TL`);
}

function urunCikar() {
    sepetiListele();
    const silinecekUrun = prompt("Silmek istediğiniz ürünün adı: ");
    const indeks = sepet.findIndex(urun => urun.urunAdi.toLowerCase() === silinecekUrun.toLowerCase());

    if (indeks !== -1) {
        const cikarilan = sepet.splice(indeks, 1)[0];
        console.log(`${cikarilan.urunAdi} sepetten çıkarıldı.`);
    } else {
        console.log("Bu ürün sepette yok.");
    }
}

let eklemeDurumu = true;
while (eklemeDurumu) {
    urunEkle();
    const devamMi = prompt("Başka ürün eklemek ister misin? (evet/hayır)").toLowerCase();
    if (devamMi !== "evet") eklemeDurumu = false;
}

sepetiListele();
toplamHesapla();

const cikarilsinMi = prompt("Bir ürün çıkarmak ister misin? (evet/hayır)").toLowerCase();
if (cikarilsinMi === "evet") {
    urunCikar();
    sepetiListele();
    toplamHesapla();
}

console.log("Alışverişiniz tamamlandı. Teşekkürler!");
