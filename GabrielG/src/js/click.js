function handleyoggyClick() {
  const modal1 = document.getElementById('my_modal_1');
  if (modal1) {
    modal1.showModal();
  }
}

function handleysharrjClick() {
  const modal3 = document.getElementById('my_modal_3');
  if (modal3) {
    modal3.showModal();
  }
}

function handleNzothClick() {
  const modal5 = document.getElementById('my_modal_5');
  if (modal5) {
    modal5.showModal();
  }
}

function handlecthunClick() {
  const modal7 = document.getElementById('my_modal_7');
  if (modal7) {
    modal7.showModal();
  }
}

document.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener("click", function (e) {
      const url = this.href;
      if (url && url !== window.location.href) {
        e.preventDefault();
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = url;
        }, 400); 
      }
    });
  });


