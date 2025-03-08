const socket = io();

function FileRemove(file){
    socket.emit("filedel",document.cookie,file.closest("li").id)
}
socket.on("reussie",function(){
    window.location.reload()
    console.log("file deleted")
});

window.onload = function() {
    document.getElementById("file").addEventListener("change", function() {
        document.getElementById("uploadForm").submit();
    });
    document.getElementsByClassName("userbutton")[0].addEventListener("click", function() {
        document.cookie="usercookie=;";
        window.location.href = "/";

    

});
};
