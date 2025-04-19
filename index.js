document.getElementById("camera-input").addEventListener("change", function (e) {
    var file = e.target.files[0]; 
    if (file) {
        var reader = new FileReader();

        reader.onload = function (event) {
            document.getElementById("profile-img").src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});
document.getElementById("camera-input").addEventListener("change", function (e) {
    var file = e.target.files[0]; 
    if (file) {
        var reader = new FileReader();

        reader.onload = function (event) {
            localStorage.setItem("profileImage", event.target.result);
            document.getElementById("profile-img").src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});

window.onload = function () {
    var savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        document.getElementById("profile-img").src = savedImage;
    }
};






function setActive(btn) {
    const chatsBtn = document.querySelector('#Chats')
const contactsBtn = document.querySelector('#Contacts')
const browserBtn = document.querySelector('#Browser')
    if (btn === 'chat') {
        chatsBtn.classList.add('active')
        contactsBtn.classList.remove('active')
        browserBtn.classList.remove('active')
        window.location.href = "index.html"
    } else if (btn === 'contact') {
        chatsBtn.classList.remove('active')
        contactsBtn.classList.add('active')
        browserBtn.classList.remove('active')
        window.location.href = "contacts.html"
    } else if (btn === 'browser') {
        chatsBtn.classList.remove('active')
        contactsBtn.classList.remove('active')
        browserBtn.classList.add('active')
        window.location.href = "browser.html"
    }
}
window.addEventListener('load', function() {
    setTimeout(function() {
      const loading = document.getElementById('loading');
      const content = document.getElementById('content');
      loading.style.display = 'none';
      content.style.display = 'block';
    }, 1000);
  });
  const modeBtn = document.getElementById('modeToggleBtn');
  const modeIcon = document.getElementById('modeIcon');
  
  function setMode(mode) {
    if (mode === 'dark') {
      document.body.classList.add('dark');
      modeIcon.classList.remove('fa-moon');
      modeIcon.classList.add('fa-sun');
    } else {
      document.body.classList.remove('dark');
      modeIcon.classList.remove('fa-sun');
      modeIcon.classList.add('fa-moon');
    }
    localStorage.setItem('mode', mode);
  }
  
  modeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setMode(isDark ? 'light' : 'dark');
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('mode') || 'light';
    setMode(savedMode);
  });
  
    
  