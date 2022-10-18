"use strict";

let menu;
let menyGrupp;
let filter = "";
let allergiFilter = "";
let sorteringStigande = false;

//hämtar data från JSON och sparar den i variablen 'menu'
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function getData() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);
        menu = response.menu;

        createButtons();
        createNewMenu();
    }
};
xhttp.open("GET", "main.json", true);
xhttp.send();

function createButtons() {
    //Skapar en knapp för kötträtter
    const btnKött = document.createElement("button");
    btnKött.setAttribute("id", "btnKött");
    btnKött.innerHTML = "Visa kötträtter";
    document.getElementsByClassName("mainCourses")[0].append(btnKött);

    btnKött.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "kött";
        createNewMenu();
    });

    //skapar testknapp - checkbox | radio
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    //checkbox.type = "radio";
    checkbox.setAttribute("id", "checkboxLaktos");
    // checkbox.setAttribute("name", "options");
    // checkbox.setAttribute("value", "laktos");

    const label = document.createElement("label");
    label.htmlFor = "checkboxLaktos";
    label.appendChild(document.createTextNode("laktos"));

    container.appendChild(checkbox);
    container.appendChild(label);

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            console.log("är ifylld");
        } else {
            console.log("ej ifylld");
        }
    });

    //Skapar en knapp för fisk rätter
    const btnFisk = document.createElement("button");
    btnFisk.setAttribute("id", "btnFisk");
    btnFisk.innerHTML = "Visa fiskrätter";
    document.getElementsByClassName("mainCourses")[0].append(btnFisk);

    btnFisk.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "fisk";
        createNewMenu();
    });

    //Skapar en knapp för vegetariska rätter
    const btnVego = document.createElement("button");
    btnVego.setAttribute("id", "btnVego");
    btnVego.innerHTML = "Visa vegorätter";
    document.getElementsByClassName("mainCourses")[0].append(btnVego);

    btnVego.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "vegetariskt";
        createNewMenu();
    });

    //Skapar en knapp för laktosfria rätter
    const btnLaktos = document.createElement("button");
    btnLaktos.setAttribute("id", "btnLaktos");
    btnLaktos.innerHTML = "Visa laktosfria rätter";
    document.getElementsByClassName("mainCourses")[0].append(btnLaktos);

    btnLaktos.addEventListener("click", function () {
        menyGrupp.remove();
        allergiFilter = "laktos";
        createNewMenu();
    });

    //Skapar en knapp för glutenfria rätter
    const btnGluten = document.createElement("button");
    btnGluten.setAttribute("id", "btnGluten");
    btnGluten.innerHTML = "Visa glutenfria rätter";
    document.getElementsByClassName("mainCourses")[0].append(btnGluten);

    btnGluten.addEventListener("click", function () {
        menyGrupp.remove();
        allergiFilter = "gluten";
        createNewMenu();
    });
    //Skapar en knapp för att filtrera efter pris
    const btnPris = document.createElement("button");
    btnPris.setAttribute("id", "btnPris");
    btnPris.innerHTML = "Sortera efter pris";
    document.getElementsByClassName("mainCourses")[0].append(btnPris);

    btnPris.addEventListener("click", function () {
        menyGrupp.remove();

        sorteringStigande = !sorteringStigande;

        if (sorteringStigande) {
            btnPris.innerHTML = "Sortera efter fallande pris";
        } else {
            btnPris.innerHTML = "Sortera efter stigande pris";
        }

        createNewMenu();
    });
    //Skapar en knapp för att ta bort filter
    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("id", "btnDelete");
    btnDelete.innerHTML = "Ta bort filter";
    document.getElementsByClassName("mainCourses")[0].append(btnDelete);

    btnDelete.addEventListener("click", function () {
        menyGrupp.remove();
        filter = "";
        allergiFilter = "";
        createNewMenu();
    });
}

function createNewMenu() {
    menyGrupp = document.createElement("div");
    menyGrupp.classList.add("meny-grupp");
    document.getElementById("container").append(menyGrupp);

    let visaMaträtter;

    if (filter === "") {
        visaMaträtter = menu;
    } else {
        visaMaträtter = menu.filter((maträtt) => maträtt.typ === filter);
    }

    //om man har skrivit något i allergiFilter utförs funktionen
    if (allergiFilter != "") {
        visaMaträtter = visaMaträtter.filter(function (maträtt) {
            let antalAllergierMaträtter = 0;

            maträtt.allergi.forEach((kontrollMaträtt) => {
                if (kontrollMaträtt === allergiFilter) {
                    antalAllergierMaträtter = antalAllergierMaträtter + 1;
                }
            });

            if (antalAllergierMaträtter > 0) {
                //tar bort maträtt
                return false;
            } else {
                return true;
            }
        });
    }

    //Sortera menyn efter fallande/stigande pris
    if (!sorteringStigande) {
        visaMaträtter.sort((a, b) => (a.pris < b.pris ? 1 : -1));
    } else {
        visaMaträtter.sort((a, b) => (a.pris > b.pris ? 1 : -1));
    }

    //listar alla maträtter
    visaMaträtter.forEach((menyData) => {
        const artiklar = document.createElement("div");
        artiklar.classList.add("artiklar");

        let artikelImg = document.createElement("img");
        artikelImg.classList.add("artikel-img");
        artikelImg.src = menyData.imgSrc;
        artikelImg.alt = menyData.alt;
        artiklar.append(artikelImg);

        let artikelText = document.createElement("div");
        artikelText.classList.add("artikel-text");
        artiklar.append(artikelText);

        //ändrade även i CSS till txt -> text
        let menyText = document.createElement("h3");
        menyText.classList.add("meny-text");
        artikelText.append(menyText);

        let artikelNamn = document.createElement("span");
        artikelNamn.classList.add("artikel-namn");
        artikelNamn.innerHTML = menyData.maträtt;
        let artikelPris = document.createElement("span");
        artikelPris.classList.add("artikel-pris");
        artikelPris.innerHTML = menyData.artikelPris;
        menyText.append(artikelNamn, artikelPris);

        let descriptionSwedish = document.createElement("p");
        descriptionSwedish.classList.add("description-swedish");
        descriptionSwedish.innerHTML = menyData.beskrivining;
        artikelText.append(descriptionSwedish);

        let descriptionTitle = document.createElement("span");
        descriptionTitle.classList.add("description-title");
        descriptionTitle.innerHTML = menyData.course;
        artikelText.append(descriptionTitle);

        let descriptionEnglish = document.createElement("p");
        descriptionEnglish.classList.add("description-english");
        descriptionEnglish.innerHTML = menyData.beskrivining;
        artikelText.append(descriptionEnglish);

        menyGrupp.append(artiklar);
    });
}
