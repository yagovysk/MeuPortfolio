// Abrir modal ao clicar no botão
document
  .getElementById("openModalButton")
  .addEventListener("click", function () {
    document.getElementById("myModal").style.display = "block";
  });

// Fechar modal ao clicar no botão de fechar
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "none";
});
// Fechar modal ao clicar fora da caixa de diálogo
window.addEventListener("click", function (event) {
  var modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
