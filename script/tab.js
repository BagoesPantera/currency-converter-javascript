// Change Tab
const convert = document.querySelector("#convert");
const convertcontent = document.querySelector(".convertcontent");
const historytab = document.querySelector("#history");
const historycontent = document.querySelector(".historycontent");

historytab.addEventListener('click', function () {
    historycontent.style.display = "block";
    convertcontent.style.display = "none";
    historytab.style.backgroundColor = "#F0F5FA";
    convert.style.backgroundColor = "#FFFFFF";
});

convert.addEventListener('click', function () {
    historycontent.style.display = "none";
    convertcontent.style.display = "block";
    convert.style.backgroundColor = "#F0F5FA";
    historytab.style.backgroundColor = "#FFFFFF";
});