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