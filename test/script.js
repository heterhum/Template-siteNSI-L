
window.onload = function() {
const btn=document.getElementById('theone');
btn.style.top=0
btn.style.left=0
addEventListener("mousemove", (event) => {
    var btny = parseInt(btn.style.top)
    var btnx = parseInt(btn.style.left)
    if (0<btny+(btny-event.clientY) && btny+(btny-event.clientY)<500 && 0<btnx+(btnx-event.clientX) && btnx+(btnx-event.clientX)<500){
        btn.style.top=btny+(btny-event.clientY)+'px';
        btn.style.left=btnx+(btnx-event.clientX)+'px';
    }

    console.log(event.clientX,event.clientY);  
    console.log(parseInt(btn.style.top),parseInt(btn.style.left));
});


btn.addEventListener('click',()=>{

    btn.style.top='400px';
    btn.style.left='500px';
});
};  