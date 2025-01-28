const container = document.querySelector('.image-container');
const image = document.querySelector('.zoom-image');

container.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = container.getBoundingClientRect();
  const x = ((e.clientX - left) / width - 0.5) * 2; // Position X normalisée (-1 à 1)
  const y = ((e.clientY - top) / height - 0.5) * 2; // Position Y normalisée (-1 à 1)

  // Ajuste la transformation de l'image
  image.style.transform = `scale(1.2) translateX(${x * 10}px) translateY(${y * 10}px)`;
});

container.addEventListener('mouseleave', () => {
  // Réinitialise la transformation
  image.style.transform = 'scale(1)';
});