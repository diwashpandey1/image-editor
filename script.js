const imageInput = document.getElementById('uploadedImage');
const displayImage = document.getElementById('displayImage');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const grayscale = document.getElementById('grayscale');
const sepia = document.getElementById('sepia');
const saturate = document.getElementById('saturate');
const hueRotate = document.getElementById('hue-rotate');
const invert = document.getElementById('invert');
const blur = document.getElementById('blur');
const opacity = document.getElementById('opacity');

function updateFilters() {
  displayImage.style.filter = `
    brightness(${brightness.value})
    contrast(${contrast.value})
    grayscale(${grayscale.value})
    sepia(${sepia.value})
    saturate(${saturate.value})
    hue-rotate(${hueRotate.value}deg)
    invert(${invert.value})
    blur(${blur.value}px)
    opacity(${opacity.value})
  `;
}

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      displayImage.src = e.target.result;
      displayImage.style.display = 'block';
      displayImage.onload = () => {
        canvas.width = displayImage.width;
        canvas.height = displayImage.height;
      };
    };
    reader.readAsDataURL(file);
  }
});

brightness.addEventListener('input', updateFilters);
contrast.addEventListener('input', updateFilters);
grayscale.addEventListener('input', updateFilters);
sepia.addEventListener('input', updateFilters);
saturate.addEventListener('input', updateFilters);
hueRotate.addEventListener('input', updateFilters);
invert.addEventListener('input', updateFilters);
blur.addEventListener('input', updateFilters);
opacity.addEventListener('input', updateFilters);

document.getElementById('downloadBtn').addEventListener('click', () => {
  ctx.filter = displayImage.style.filter;
  ctx.drawImage(displayImage, 0, 0, canvas.width, canvas.height);
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL();
  link.click();
});
