$(document).ready(() => {
    const radioButtons = document.querySelectorAll("[type=radio]");
    for (let radioButton of radioButtons){
        const span = document.createElement("span");
        span.className = "box";
        radioButton.appendChild(span);
    }
});
document.querySelectorAll('.box').forEach(function(box){
    box.onclick = function (){
        document.querySelectorAll('.box').forEach(function(box){
            box.style.backgroundColor = "#fff9e0";
        });
        this.style.backgroundColor = "#6eff86";
    }
});