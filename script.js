/* Cadastro de novidades do site */

const contactInput = document.getElementById('contactInput');
  const emailCheckbox = document.getElementById('emailUpdates');
  const smsCheckbox = document.getElementById('smsUpdates');

  emailCheckbox.addEventListener('change', function() {
    if (this.checked) {
      contactInput.placeholder = 'E-mail';
    } else {
      contactInput.placeholder = 'Selecione uma opção';
    }
  });

  smsCheckbox.addEventListener('change', function() {
    if (this.checked) {
      contactInput.placeholder = 'Número de telefone';
    } else {
      contactInput.placeholder = 'Selecione uma opção';
    }
  });

  /* swiper-slide */

// Adicione a classe 'active-color' ao primeiro slide inicialmente

var swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 4444,
  },
  on: {
    slideChange: function () {
      var activeSlide = this.slides[this.activeIndex];
      var slideNumber = (this.activeIndex % 6) + 1;

      // Remove todas as classes de cores
      activeSlide.classList.remove('color-1');
      activeSlide.classList.remove('color-2');
      activeSlide.classList.remove('color-3');
      activeSlide.classList.remove('color-4');
      activeSlide.classList.remove('color-5');
      activeSlide.classList.remove('color-6');

      // Adiciona a classe da cor correspondente
      activeSlide.classList.add('color-' + slideNumber);
    }
  }
});

const quantityInput = document.querySelector(".item-quantity");
const totalPrice = document.querySelector(".item-total-price");

quantityInput.addEventListener("change", () => {
  const quantity = quantityInput.value;
  const price = 99; // preço do item
  const total = price * quantity;
  totalPrice.textContent = `R$ ${total.toFixed(2)}`;
});

const addToCartButton = document.querySelector(".add-to-cart");
const carrinhoModal = document.querySelector("#carrinhoModal");
const carrinhoModalTitle = document.querySelector("#carrinhoModal .modal-title");
const carrinhoModalButton = document.querySelector("#carrinhoModal .ok-button");

addToCartButton.addEventListener("click", () => {
  const quantity = quantityInput.value;
  const message = `Adicionado ao carrinho: ${quantity}x Camisa Cinza em Algodão`;

  carrinhoModalTitle.textContent = message;
  carrinhoModalButton.setAttribute("data-target", "#carrinhoModal");
  carrinhoModalButton.click();
});

const buyButton = document.querySelector("#buyButton");

buyButton.addEventListener("click", () => {
  const quantity = quantityInput.value;
  const message = `Compra realizada: ${quantity}x Camisa Cinza em Algodão`;

  carrinhoModalTitle.textContent = message;
  carrinhoModalButton.setAttribute("data-target", "#carrinhoModal");
  carrinhoModalButton.click();
});

 
  
  