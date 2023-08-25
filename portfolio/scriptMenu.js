document.getElementById("openCertMenu").addEventListener("click", function () {
  var certMenu = document.getElementById("certificationMenu");
  if (certMenu.style.display === "block") {
    certMenu.style.display = "none";
  } else {
    certMenu.style.display = "block";
  }
});

// Fechar o menu de certificações quando o usuário clicar fora dele
window.addEventListener("click", function (event) {
  var certMenu = document.getElementById("certificationMenu");
  if (
    event.target !== certMenu &&
    event.target !== document.getElementById("openCertMenu")
  ) {
    certMenu.style.display = "none";
  }
});
