document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
});

document.getElementById("favBtn").addEventListener("click", function () {
 
  this.classList.toggle("added");
  
 
  if (this.classList.contains("added")) {
    this.textContent = "Favorilerden Çıkar";
  } else {
    this.textContent = "Favorilere Ekle";
  }
});
