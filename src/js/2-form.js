const formElement = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт для зберігання даних форми
let formData = { email: '', message: '' };

// При завантаженні сторінки перевіряємо локальне сховище
window.addEventListener('load', () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      formData = JSON.parse(savedData);
      // Заповняємо поля форми збереженими даними
      formElement.email.value = formData.email;
      formElement.message.value = formData.message;
    } catch (error) {
      console.error('Error parsing saved data:', error);
    }
  }
});

// Використовуємо делегування для відстеження змін у формі
formElement.addEventListener('input', (event) => {
  const { name, value } = event.target;
  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// Обробляємо відправлення форми
formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  // Перевіряємо чи обидва поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Виводимо об'єкт у консоль
  console.log(formData);

  // Очищаємо локальне сховище
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо об'єкт formData
  formData = { email: '', message: '' };

  // Очищаємо поля форми
  formElement.reset();
});
