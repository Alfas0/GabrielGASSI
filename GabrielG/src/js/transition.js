document.querySelectorAll('.transition-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.remove('opacity-100');
    document.body.classList.add('opacity-0');
    setTimeout(() => {
      window.location.href = this.href;
    }, 500); 
  });
});
window.addEventListener('pageshow', () => {
  document.body.classList.add('opacity-100');
});
