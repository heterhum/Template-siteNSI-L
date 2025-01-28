window.addEventListener("DOMContentLoaded", (event) => {

    const container = document.getElementById("image-container");
    const image = document.getElementById('zoom-image');
    const body = document.getElementById('d');

    //body.style.bakcgroundcolor = "red";

    container.addEventListener('mousemove', (e) => {
      const x = e.clientX 
      const y = e.clientY 

      body.style.bakcgroundcolor = "red";
    });
//container.addEventListener('mouseleave', () => {
//
//  image.style.transform = 'scale(1)';
//});
});