document.addEventListener("DOMContentLoaded", function() {
    var fileURL = "./source-base/Assest/PAGES/views/pdf-split.hbs";
    var container = document.getElementById("render-body");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", fileURL, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            container.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});