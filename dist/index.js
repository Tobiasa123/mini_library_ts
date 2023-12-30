//variables, html elements, interfaces etc
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const allBooks = document.querySelectorAll('.books');
const mainWrapper = document.querySelector('.mainWrapper');
const infoPage = document.querySelector('.infoPage');
const exitButton = document.querySelector('.exitButton');
const mainHeader = document.querySelector('.mainHeader');
const body = document.querySelector('body');
//funktion som tar book infon och applyar den till elementen på infosidan
//funktionen används i applydata i en eventlistener
function addBookDetails(book) {
    const infoBook = document.querySelector('.infoBook');
    const infoTitle = document.querySelector('.infoTitle');
    const author = document.querySelector('.author');
    const infoPara = document.querySelector('.infoPara');
    const infoAudience = document.querySelector('.infoAudience');
    const infoPublished = document.querySelector('.infoPublished');
    const infoPagesNum = document.querySelector('.infoPagesNum');
    const infoPublisher = document.querySelector('.infoPublisher');
    // Update info page elements with book details
    infoBook.innerHTML = `<h2>${book.title}</h2>`;
    infoTitle.textContent = book.title;
    author.textContent = `by ${book.author}`;
    infoPara.textContent = book.plot;
    infoAudience.textContent = `Audience: ${book.audience}`;
    infoPublished.textContent = `First published: ${book.year}`;
    infoPagesNum.textContent = `Pages: ${book.pages}`;
    infoPublisher.textContent = `Publisher: ${book.publisher}`;
}
//fetcha data async await
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        //säg att datan vi får tillbaka ska vara en array av books
        let data = yield response.json();
        //logga data
        console.log(data);
        data.forEach((element) => {
            console.log(element.title);
        });
        //här applyar jag datan från min andra funktion
        //input ska vara av typ Book, och vi säger att fen fetchade datan är book ovan
        applyData(data);
        return data;
    });
}
getData();
//apply data array på books från skapat interface
//jsut nu har book bara title som attribut
function applyData(myData) {
    myData.forEach((book, index) => {
        //allBooks är html element
        let currentBook = allBooks[index];
        //lägg till title som vi har i vårt interface, om jag vill lägga till något annat än just title måste jag ändra det i interface först
        //detta ät itteln som visas i mainwrappern
        currentBook.innerHTML = `<h2>${book.title}</h2>`;
        //lägg till book detaljerna till infosidan när en klickas
        currentBook.addEventListener('click', () => {
            addBookDetails(book);
            body.style.backgroundColor = "rgb(36, 35, 35)";
        });
    });
}
//lägg till klick event på alla books
function clickBook() {
    allBooks.forEach(element => {
        //kollar om det verkligen är ett html element
        if (element instanceof HTMLElement) {
            element.addEventListener('click', e => {
                element.style.opacity = "0.8";
                mainWrapper.classList.add('hidden');
                mainHeader.classList.add('hidden');
                infoPage.classList.toggle('hidden');
                exitButton.classList.toggle('hidden');
            });
        }
    });
}
clickBook();
function clickExitButton() {
    exitButton === null || exitButton === void 0 ? void 0 : exitButton.addEventListener('click', e => {
        body.style.backgroundColor = "lightblue";
        mainWrapper.classList.toggle('hidden');
        mainHeader.classList.toggle('hidden');
        infoPage.classList.toggle('hidden');
        exitButton.classList.toggle('hidden');
    });
}
clickExitButton();
export {};
