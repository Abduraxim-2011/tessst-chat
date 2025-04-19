let contacts = JSON.parse(localStorage.getItem("contacts")) || [
  { id: 1, firstName: "Ali", lastName: "Valiyev", image: "./img/fakeava.svg" },
  { id: 2, firstName: "Vali", lastName: "Khusanov", image: "./img/fakeava.svg" },
  { id: 3, firstName: "Halil", lastName: "Masharipov", image: "./img/fakeava.svg" },
  { id: 4, firstName: "Jalil", lastName: "Ashurov", image: "./img/fakeava.svg" },
  { id: 5, firstName: "Komil", lastName: "Joraboyev", image: "./img/fakeava.svg" },
  { id: 6, firstName: "Yobir", lastName: "Alsh", image: "./img/fakeava.svg" },
  { id: 7, firstName: "Eva", lastName: "Elfi", image: "./img/fakeava.svg" },
  { id: 8, firstName: "Davic", lastName: "Orto", image: "./img/fakeava.svg" },
  { id: 9, firstName: "Jova", lastName: "Orto", image: "./img/fakeava.svg" },
  { id: 10, firstName: "Swite", lastName: "Fox", image: "./img/fakeava.svg" },
  { id: 11, firstName: "Abu", lastName: "Jgar", image: "./img/fakeava.svg" },
  { id: 12, firstName: "Begi", lastName: "Kot", image: "./img/fakeava.svg" },
  { id: 13, firstName: "Nabi", lastName: "Svarshik", image: "./img/fakeava.svg" },
  { id: 14, firstName: "Shuxrat", lastName: "Uktamv", image: "./img/fakeava.svg" },
  { id: 15, firstName: "Aziz", lastName: "Lazizov", image: "./img/fakeava.svg" },
  { id: 16, firstName: "Olim", lastName: "Cola", image: "./img/fakeava.svg" },
  { id: 17, firstName: "Azamat", lastName: "Qochoqboyev", image: "./img/fakeava.svg" },
  { id: 18, firstName: "Davic", lastName: "Blmiman", image: "./img/fakeava.svg" },
  { id: 19, firstName: "Jova", lastName: "Pulatov", image: "./img/fakeava.svg" },
  { id: 20, firstName: "Abu", lastName: "Mansurov", image: "./img/fakeava.svg" }
];

const container = document.querySelector(".contacts-container");
const searchInput = document.querySelector(".input-search");

function render(contactList = contacts) {
  container.innerHTML = "";

  contactList.forEach(e => {
    container.innerHTML += `
      <div class="swiper myContactSwiper">
        <div class="swiper-wrapper swiper-flex">
          <div class="swiper-slide call-contact">
            <button class="call-btn" onclick="location.href='call.html'">
              <i class="fa-solid fa-phone"></i>
            </button>
            <button class="videoCall-btn" onclick="location.href='VideoCall.html'">
              <i class="fa-solid fa-video"></i>
            </button>
          </div>
          <div class="swiper-slide contact">
            <div class="flex-contact">
              <button class="contact-btn" onclick="location.href='chat.html'">
                <img src="${e.image}" alt="Contact.ava" class="contact-ava">
              </button>
              <button class="contact-btn" onclick="location.href='chat.html'">
                <div class="flex-contact">
                  <h1 class="contact-name" id="title">${e.firstName} ${e.lastName} <br><br></h1>
                  <p class="contact-online-time"><br> Oxirgi Marta 9:40da onlayn edi</p>
                </div>
              </button>
            </div>
          </div>
          <div class="swiper-slide delete-contact">
            <button class="contact-profile-btn"><i class="fa-solid fa-bars"></i></button>
            <button class="contact-mute-btn"><i class="fa-solid fa-bell-slash"></i></button>
            <button onclick="OpenDialog(${e.id})" id="openDialog"><i id="delete-contact-icon" class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
      <div id="overlay${e.id}" class="overlay">
        <div class="dialogBox">
          <h1>Bu chat butunlay oʻchirilsinmi?</h1>
          <p class="DialogSorov">Bu nafaqat oxirgi xabarlarni emas, <span><br>"${e.firstName} ${e.lastName}"<br></span> bilan barcha yozishmalaringiz o'chib ketadi!</p>
          <div class="buttons">
            <button onclick="closeDialog(${e.id})" class="cancel">Ortga</button>
            <button onclick="deleteContact(${e.id})" class="delete">O'chirilsin</button>
          </div>
        </div>
      </div>
    `;
  });

  reinitAllSwipers();
}

function OpenDialog(id) {
  const overlay = document.getElementById(`overlay${id}`);
  if (overlay) overlay.style.display = 'flex';
}

function closeDialog(id) {
  const overlay = document.getElementById(`overlay${id}`);
  if (overlay) overlay.style.display = 'none';
}

function deleteContact(id) {
  const index = contacts.findIndex(contact => contact.id == id);
  if (index !== -1) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    render();
  }
}

function reinitAllSwipers() {
  const swipers = document.querySelectorAll('.myContactSwiper');

  swipers.forEach(swiperEl => {
    const swiper = new Swiper(swiperEl, {
      initialSlide: 1,
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: -450,
      threshold: 200,
    });

    swiperEl.swiper = swiper;

    swiperEl.addEventListener("touchend", () => {
      clearTimeout(swiper.timer);
      swiper.timer = setTimeout(() => {
        swiper.slideTo(1);
      }, 15000);
    });
  });
}

function handleSearch() {
  const value = searchInput.value.toLowerCase().trim();
  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(value) ||
    contact.lastName.toLowerCase().includes(value)
  );
  render(filteredContacts);
}

searchInput.addEventListener("input", handleSearch);

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});

render();

