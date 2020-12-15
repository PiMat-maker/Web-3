//function click() {
$(document).ready(
    document.querySelector("svg").addEventListener("click", (ev) => {
        //get svg element
        const target = document.querySelector("svg").getBoundingClientRect();
        const svg = $("svg");

        //get some css attributes for svg
        const padding_top = parseInt(svg.css("padding-top"));
        const border_width_top = parseInt(svg.css("border-top-width"));
        const padding_left = parseInt(svg.css("padding-left"));
        const border_width_left = parseInt(svg.css("border-left-width"));

        //count x and y of the point on svg
        const x = String(ev.clientX - target.left - padding_left - border_width_left);
        const y = String(ev.clientY - target.top - padding_top - border_width_top);

        //check if R is set
        const checkedR = document.querySelectorAll("input:checked[name=R]");
        if (checkedR.length === 0){
            if (document.getElementById("error") == null) {
                error("You haven't chosen any value for Radius", 0);
            }
            return;
        }

        let valX = (parseInt(x) - 150)/100;
        let valY = -(parseInt(y) - 150)/100;
        if (Math.abs(valY) > 1.4 || Math.abs(valX) > 1.4){
            if (document.getElementById("error") == null) {
                error("The point isn't on the coordinate plane", 0);
            }
            return;
        }

        //set point
        document.getElementById("target-dot").setAttribute("cx", x);
        document.getElementById("target-dot").setAttribute("cy", y);

        const form = makeForm(valX, valY, checkedR, 1);
        sendForm(form);
    }));
//}
$(document).ready(

    $("#button").click(function () {
        if (valid() && validate_y()) onclick();
    })
);

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
    img.src = "злой_пингвинчик.gif";
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

function validate_y() {
    //input field for y coordinate
    const val = document.getElementById("text_field").value;
    //checking
    if (isNaN(val) || document.getElementById("text_field").value.trim().length === 0) {
        error("y have to be a number");
        return false;
    }

    if (val.indexOf(".") !== -1) {
        if (val.slice(0, val.indexOf(".")) >= 3 || val.slice(0, val.indexOf(".")) <= -5) {
            error("y must be in the interval (-5; 3)");
            return false;
        }
    } else if (val <= -5 || val >= 3) {
        error("y must be in the interval (-5; 3)");
        return false;
    }

    document.querySelector(".form_button").removeAttribute("disabled");
    return true;
}
//function to hide an element
function disappear(element){
    element.classList.add("disappear");
}
//function to return an element
function appear(element){
    element.classList.remove("disappear");
}
//error message and button lock

//scroll to the table of results
document.querySelector('#button').addEventListener('click', () => {
    if(document.querySelector("#error")) return;
    setTimeout(() => window.scrollTo(0,document.body.scrollHeight), 1000);
});


function valid(){
    const x = document.querySelector('input:checked[name=x]');
    const allR = document.querySelectorAll('input:checked[name=R]');

    if (x === null){
        error("You haven't chosen any value for X", 0);
        return false;
    } else if (allR.length === 0){
        error("You haven't chosen any value for Radius", 0);
        return true;
    }
    return true;
}


function onclick(){
    const valX = document.querySelector("input:checked[name=x]").getAttribute("value");
    const valY = document.querySelector("#text_field").value;
    const checkedR = document.querySelectorAll("input:checked[name=R]");
    console.log("onclick");
    const form = makeForm(valX, valY, checkedR, 0);
    sendForm(form);
}

function makeForm(valX, valY, checkedR, degree) { //degree is allowed to multiply by R or not if it's the data from the form

    // it's necessary to multiply x and y by R
    const form = new FormData();
    for (let i = 0; i < checkedR.length; i++) {
        if (degree === 1) {
            form.append('x[' + i + ']', String((valX * Math.pow(checkedR[i].getAttribute("value"), degree)).toFixed(2)));
            form.append('y[' + i + ']', String((valY * Math.pow(checkedR[i].getAttribute("value"), degree)).toFixed(2)));
            form.append('R[' + i + ']', checkedR[i].getAttribute("value"));
        } else{
            form.append('x[' + i + ']', valX);
            form.append('y[' + i + ']', valY);
            form.append('R[' + i + ']', checkedR[i].getAttribute("value"));
        }
    }
    return form;
}

function sendForm(form) {
    $(document).ready(function () {
        $.ajax({
            method: "POST",
            url: "controllerServlet",
            processData: false,
            contentType: false,
            data: form,

            dataType: "json",
            success: function (res) {
                setResult(res);
                console.log("success");
            },
            statusCode: {
                200: function () {
                    console.log("Ok");
                }
            }
        });
    });
}

function setResult(res){
    const html = String("<table id = 'resultTable'>" +
        " <tr> " +
        "<th>Координата X</th> " +
        "<th>Координата Y</th> " +
        "<th>Радиус</th>" +
        " <th>Результат</th> " +
        "<th>Время работы скрипта</th>" +
        " <th>Текущее время</th> " +
        "</tr>");
    let data = "";
    for (let i = 0; i < res.length; i++){

        data += "<tr>";
        data += "<td>" + res[i]["x"] + "</td>";
        data += "<td>" + res[i]["y"] + "</td>";
        data += "<td>" + res[i]["R"] + "</td>";
        if (res[i]["result"] === true) {
            data += "<td> &#9989 </td>";
        } else{
            data += "<td> &#10060 </td>";
        }
        data += "<td>" + res[i]["workTime"] + "мс </td>";
        data += "<td>" + res[i]["currentTime"] + "</td>";
        data += "</tr>";
    }

    document.getElementById("result").innerHTML = html + data + "</table>";
    console.log(res.length);
}
