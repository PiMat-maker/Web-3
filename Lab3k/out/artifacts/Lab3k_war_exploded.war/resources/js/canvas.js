let arrayPoint = [];
let currentNumberRows = document.getElementsByClassName("order-table-row").length;
let arrayRows = [];

window.onload = function () {
    //createGraphic(1)
    document.getElementById("f:r1").click();
    document.querySelector(".table_R .box").style.backgroundColor = "#6eff86";
};

function createGraphic(r) {
    console.log("Drawing graphic...");
    let canvas = document.getElementById("canvas"), context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    // rectangle
    context.beginPath();
    context.rect(150, 150, 130 * (r / 5), 130 * (r / 5));
    context.closePath();
    context.strokeStyle = "#2f9aff";
    context.fillStyle = "#2f9aff";
    context.fill();
    context.stroke();

    // sector
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 65 * (r / 5), Math.PI / 2, Math.PI, false);
    context.closePath();
    context.strokeStyle = "#2f9aff";
    context.fillStyle = "#2f9aff";
    context.fill();
    context.stroke();

    // triangle
    context.beginPath();
    context.moveTo(150, 150);
    context.lineTo(150 - (65 * (r / 5)), 150);
    context.lineTo(150, 150 - (65 * (r / 5)));
    context.lineTo(150, 150);
    context.closePath();
    context.strokeStyle = "#2f9aff";
    context.fillStyle = "#2f9aff";
    context.fill();
    context.stroke();

    // axes
    context.beginPath();
    context.font = "10px Verdana";
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.moveTo(150, 0);
    context.lineTo(150, 300);
    context.moveTo(150, 0);
    context.lineTo(145, 15);
    context.moveTo(150, 0);
    context.lineTo(155, 15);
    context.fillText("Y", 160, 10);
    context.moveTo(0, 150);
    context.lineTo(300, 150);
    context.moveTo(300, 150);
    context.lineTo(285, 145);
    context.moveTo(300, 150);
    context.lineTo(285, 155);
    context.fillText("X", 290, 130);

    // Y parts
    context.moveTo(145, 20);
    context.lineTo(155, 20);
    context.fillText(' 5', 160, 20);
    context.moveTo(145, 46);
    context.lineTo(155, 46);
    context.fillText(' 4', 160, 46);
    context.moveTo(145, 72);
    context.lineTo(155, 72);
    context.fillText(' 3', 160, 72);
    context.moveTo(145, 98);
    context.lineTo(155, 98);
    context.fillText(' 2', 160, 98);
    context.moveTo(145, 124);
    context.lineTo(155, 124);
    context.fillText(' 1', 160, 124);
    context.moveTo(145, 176);
    context.lineTo(155, 176);
    context.fillText('-1', 160, 176);
    context.moveTo(145, 202);
    context.lineTo(155, 202);
    context.fillText('-2', 160, 202);
    context.moveTo(145, 228);
    context.lineTo(155, 228);
    context.fillText('-3', 160, 228);
    context.moveTo(145, 254);
    context.lineTo(155, 254);
    context.fillText('-4', 160, 254);
    context.moveTo(145, 280);
    context.lineTo(155, 280);
    context.fillText('-5', 160, 280);

    // X parts
    context.moveTo(20, 145);
    context.lineTo(20, 155);
    context.fillText('-5', 13, 140);
    context.moveTo(46, 145);
    context.lineTo(46, 155);
    context.fillText('-4', 39, 140);
    context.moveTo(72, 145);
    context.lineTo(72, 155);
    context.fillText('-3', 65, 140);
    context.moveTo(98, 145);
    context.lineTo(98, 155);
    context.fillText('-2', 91, 140);
    context.moveTo(124, 145);
    context.lineTo(124, 155);
    context.fillText('-1', 117, 140);
    context.moveTo(176, 145);
    context.lineTo(176, 155);
    context.fillText(' 1', 169, 140);
    context.moveTo(202, 145);
    context.lineTo(202, 155);
    context.fillText(' 2', 195, 140);
    context.moveTo(228, 145);
    context.lineTo(228, 155);
    context.fillText(' 3', 221, 140);
    context.moveTo(254, 145);
    context.lineTo(254, 155);
    context.fillText(' 4', 247, 140);
    context.moveTo(280, 145);
    context.lineTo(280, 155);
    context.fillText(' 5', 273, 140);
    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();
    for (let elem of arrayPoint){
        drawPoint(...elem);
    }
}

function drawPoint(x, y, hit) {
    console.log('Marking point ' + x + ', ' + y + ', ' + hit);
    let canvas = document.getElementById("canvas"), context = canvas.getContext("2d");
    context.beginPath();
    context.arc(Math.round(150 + ((x / 5) * 130)), Math.round(150 - ((y / 5) * 130)), 2, 0, Math.PI*2, false);

    context.strokeStyle = 'black';
    let color = 'red';
    if (hit === "true") {
        color = 'lime';
    }
    if (hit === "none"){
        color = 'grey';
    }
    context.fillStyle = color;
    context.fill();
    //context.stroke();
}

//onClick canvas
$(document).ready(
    document.querySelector("canvas").addEventListener("click", (ev) => {
        console.log("Click on canvas");
        let canvas = document.getElementById("canvas");
        let br = canvas.getBoundingClientRect();
        let left = br.left;
        let top = br.top;
        let x = ev.clientX - left;
        let y = ev.clientY - top;
        let xCalculated = ((x - 176) / 130 * 5).toFixed(5);
        let yCalculated = ((-y + 176) / 130 * 5).toFixed(5);
        console.log(`Click on ${xCalculated}, ${yCalculated}`);

        if (Math.abs(xCalculated) > 5 || Math.abs(yCalculated) > 5) {
            if (document.getElementById("error") == null) {
                error("The point isn't on the coordinate plane", 0);
            }
            return;
        }

        document.getElementById("plot:xCanvas").value = xCalculated;
        document.getElementById("plot:yCanvas").value = yCalculated;
        document.getElementById("plot:hiddenButton").click();
        //count number of columns in result
        arrayRows.push(Math.max(currentNumberRows, document.getElementsByClassName("order-table-row").length));
        currentNumberRows = Math.max(currentNumberRows + 1, document.getElementsByClassName("order-table-row").length + 1);
        console.log("ADD" + arrayRows.toString());
    })
);

document.addEventListener("DOMNodeInserted", () => {
    let row = document.getElementsByClassName("order-table-row").length - 1;
    const index = arrayRows.indexOf(row);
    console.log("THIS ROW " + row);
    if (index !== -1){
        console.log(arrayRows.indexOf(row) + " " + arrayRows.toString());
        arrayRows.splice(index, 1);
        const x = document.getElementsByClassName("order-table-row")[row].querySelectorAll("td")[0].innerText;
        const y = document.getElementsByClassName("order-table-row")[row].querySelectorAll("td")[1].innerText;
        const hit = document.getElementsByClassName("order-table-row")[row].querySelectorAll("td")[3].innerText;
        drawPoint(x, y, hit);
        arrayPoint.push([x, y, "none"]);
    }
});

function error(txt, value = 1){
    console.log('1');
    //main block with elements
    const parent = document.getElementById("form");
    //nodes to change
    const node1 = document.getElementById("checkbox_y");
    const node2 = document.querySelector('.R');
    const node3 = document.getElementById("x_text");

    document.querySelector(".form_button").setAttribute("disabled", true);

    //text
    const text = document.createTextNode("! " + txt + " !");
    const span = document.createElement("span");
    span.appendChild(text);
    span.style = "color: red";
    const p = document.createElement("p");
    p.appendChild(span);
    //pic error
    const img = document.createElement("img");
    img.src = "resources/pictures/злой_пингвинчик.gif";
    img.style.border = "6px dotted #CD5C5C";
    const container = document.createElement("p");
    container.appendChild(img);
    //new section
    const section = document.createElement("section");
    section.appendChild(p);
    section.appendChild(container);
    section.id = "error";
    section.padding = 1;

    disappear(node1);
    disappear(node2);
    disappear(node3);

    parent.appendChild(section);

    setTimeout(() =>{
        parent.removeChild(document.getElementById("error"));
        appear(node1);
        appear(node2);
        appear(node3);

        if (value === 0){
            document.querySelector(".form_button").removeAttribute("disabled");
        }
    }, 2000);
}

//function to hide an element
function disappear(element){
    element.classList.add("disappear");
}
//function to return an element
function appear(element){
    element.classList.remove("disappear");
}