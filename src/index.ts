
//variables, html elements, interfaces etc

import { Book } from "./interface"


const allBooks = document.querySelectorAll('.books')
const mainWrapper = document.querySelector('.mainWrapper')
const infoPage = document.querySelector('.infoPage')
const exitButton = document.querySelector('.exitButton')
const mainHeader = document.querySelector('.mainHeader')



//funktion som tar book infon och applyar den till elementen på infosidan
//funktionen används i applydata i en eventlistener
function addBookDetails(book: Book) {
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
async function getData(): Promise<any> {
    let response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books')
    let data = await response.json()

    //logga data
    console.log(data)
    data.forEach((element: any) => {
        console.log(element.title)
    });

    //här applyar jag datan från min andra funktion
    //input ska vara av typ Book
    applyData(data);

    return data;
}
getData()

//apply data array på books från skapat interface
//jsut nu har book bara title som attribut
function applyData(myData: Book[]){

    myData.forEach((book: Book, index: number) => {
        //allBooks är html element
        let currentBook = allBooks[index]
        //lägg till title som vi har i vårt interface, om jag vill lägga till något annat än just title måste jag ändra det i interface först
        //detta ät itteln som visas i mainwrappern
        currentBook.innerHTML = `<h2>${book.title}</h2>`

        //lägg till book detaljerna till infosidan när en klickas
        currentBook.addEventListener('click', () => {
            addBookDetails(book);
          });
        
    });
}

//lägg till klick event på alla books
function clickBook(){
    allBooks.forEach(element => {
        element.addEventListener('click', e => {
                element.style.backgroundColor = "red"
                mainWrapper.classList.add('hidden')
                mainHeader.classList.add('hidden')
                infoPage.classList.toggle('hidden')
                exitButton.classList.toggle('hidden')
        })
    }); 
}
clickBook()




function clickExitButton (){
    exitButton?.addEventListener('click', e => {
        mainWrapper.classList.toggle('hidden')
        mainHeader.classList.toggle('hidden')
        infoPage.classList.toggle('hidden')
        exitButton.classList.toggle('hidden')
    })
}
clickExitButton()
