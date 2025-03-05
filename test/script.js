function handleDivDoubleClick() {
    console.log("Double-clic sur la div !");
}

function handleButtonDoubleClick(event) {

    console.log("Double-clic sur le bouton !");
}

window.onload = function() {
document.getElementById("file").addEventListener("change", function() {
    console.log("File changed !");
    //document.getElementById("uploadForm").submit();
});
};
//a faire : gérer le telechargement, gere la suppression, les couleurs (discord), la barre en haut de la liste ... 