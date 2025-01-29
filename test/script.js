document.addEventListener("DOMContentLoaded", function () {

    let container = document.getElementById("image-container");
    let image = document.getElementById('zoom-image');
    let body = document.getElementById('d');

    container.addEventListener('mousemove', (e) => {
      const x = e.clientX 
      const y = e.clientY 
      //body.style.backgroundColor = "red"; 
      //for (let i =0; i < 180; i++){
      //  image.style.transform = `rotateY(${i}deg), rotateZ(${i}deg)`;
      //} 
      
    });
//container.addEventListener('mouseleave', () => {
//
//  image.style.transform = 'scale(1)';
//});
});


//document.addEventListener('DOMContentLoaded', function () {
//let = buttonRoll = document.getElementById("myButton")
//buttonRoll.addEventListener("click", function(){
//    buttonRoll.style.backgroundColor = "red";
//});
//});