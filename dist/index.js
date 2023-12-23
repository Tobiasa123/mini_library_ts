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
//fetcha data async await
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
        let data = yield response.json();
        //logga data
        console.log(data);
        data.forEach((element) => {
            console.log(element.title);
        });
        //här applyar jag datan från min andra funktion
        applyData(data);
        return data;
    });
}
getData();
//apply data array på books från skapat interface
function applyData(myData) {
    myData.forEach((book, index) => {
        //allBooks är html element
        let currentBook = allBooks[index];
        //lägg till title som vi har i vårt interface, om jag vill lägga till något annat än just title måste jag ändra det i interface först
        currentBook.innerHTML = `<h2>${book.title}</h2>`;
    });
}
export {};
