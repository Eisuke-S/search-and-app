document.addEventListener('DOMContentLoaded', () => {
  const svgColorInput = document.getElementById('svg-color');
  const svgHoverColorInput = document.getElementById('svg-hover-color');
  const backgroundColorInput = document.getElementById('background-color');
  const backgroundImageInput = document.getElementById('background-image');
  const backgroundBlurInput = document.getElementById('background-blur');
  const darkModeCheckbox = document.getElementById('dark-mode');

  svgColorInput.addEventListener('input', (event) => {
    document.documentElement.style.setProperty('--svg-color', event.target.value);
  });

  svgHoverColorInput.addEventListener('input', (event) => {
    document.documentElement.style.setProperty('--svg-hover-color', event.target.value);
  });

  backgroundColorInput.addEventListener('input', (event) => {
    document.body.style.backgroundColor = event.target.value;
  });

  backgroundImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.body.style.backgroundImage = `url(${e.target.result})`;
      };
      reader.readAsDataURL(file);
    }
  });

  backgroundBlurInput.addEventListener('input', (event) => {
    document.body.style.backdropFilter = `blur(${event.target.value}px)`;
  });

  darkModeCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
});
