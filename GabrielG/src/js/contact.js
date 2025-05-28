  document.addEventListener("DOMContentLoaded", function () {
    const quizCompleted = localStorage.getItem("quizCompleted");
    const modal = document.getElementById("quizModal");

    if (!quizCompleted) {
      modal.classList.remove("hidden");

      const form = document.querySelector("form");
      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
        });
      }

      document.getElementById("closeModalBtn").addEventListener("click", () => {
        window.location.href = "quiz.html";
      });
    }
  });
