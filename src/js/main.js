// получаем элементы из DOM
const canvas = document.getElementById('memeCanvas');
const imageInput = document.getElementById('imageInput');
const memeText = document.getElementById('memeText');
const saveImageBtn = document.getElementById('saveImageBtn');

const ctx = canvas.getContext('2d');
let img = new Image();

let currentText = '';
let textX = 50;
let textY = 50;

// функция для загрузки и отображение картинки
function addImage(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    img.src = e.target.result;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      drawText();
    };
  };
  reader.readAsDataURL(event.target.files[0]);
}

imageInput.addEventListener('change', addImage);

// функция для отображение текста на канвасе
function drawText() {
  ctx.fillStyle = 'white';
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(currentText, textX, textY);
}

// функция для обновления текста
memeText.addEventListener('keyup', function (event) {
  currentText = event.target.value;
  redrawCanvas();
});

// функция для перемещения текста при клике
canvas.addEventListener('click', function (event) {
  const rect = canvas.getBoundingClientRect();
  textX = event.clientX - rect.left;
  textY = event.clientY - rect.top;
  redrawCanvas();
});

// функция для очистки канваса
function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  drawText();
}

// функция для сохранения изображения с текстом
function saveImage() {
  const imageData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'custom-meme.png';
  link.href = imageData;
  link.click();
}

saveImageBtn.addEventListener('click', saveImage);
