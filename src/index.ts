
//variables, html elements, interfaces etc

import { Book } from "./interface"


const allBooks: NodeListOf<Element> = document.querySelectorAll('.books')
const mainWrapper = document.querySelector('.mainWrapper') as HTMLElement
const infoPage = document.querySelector('.infoPage') as HTMLElement
const exitButton = document.querySelector('.exitButton') as HTMLButtonElement
const mainHeader = document.querySelector('.mainHeader') as HTMLElement
const body = document.querySelector('body') as HTMLElement



//funktion som tar book infon och applyar den till elementen på infosidan
//funktionen används i applydata i en eventlistener
function addBookDetails(book: Book) {
    const infoBook = document.querySelector('.infoBook') as HTMLElement;
    const infoTitle = document.querySelector('.infoTitle') as HTMLElement;
    //const author = document.querySelector('.author') as HTMLElement;
    const infoPara = document.querySelector('.infoPara') as HTMLElement;
    const infoAudience = document.querySelector('.infoAudience') as HTMLElement;
    const infoPublished = document.querySelector('.infoPublished') as HTMLElement;
    const infoPagesNum = document.querySelector('.infoPagesNum') as HTMLElement;
    const infoPublisher = document.querySelector('.infoPublisher') as HTMLElement;
  
    // Update info page elements with book details
    infoBook.innerHTML = 
    `<h1>${book.title}</h1>
    <p>${book.author}</p>`;

    infoBook.style.backgroundColor = "red"; //here i want the color of the

    infoTitle.innerHTML = 
    `<h1>${book.title}</h1>
    <p>By ${book.author}</p>`;

    infoPara.textContent = `${book.plot}`;
    infoAudience.textContent = `Audience: ${book.audience}`;
    infoPublished.textContent = `First published: ${book.year}`;
    infoPagesNum.textContent = `Pages: ${book.pages}`;
    infoPublisher.textContent = `Publisher: ${book.publisher}`;
}



//fetcha data async await
async function getData(): Promise<any> {
    let response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books')
    //säg att datan vi får tillbaka ska vara en array av books
    let data: Book[] = await response.json()

    //logga data
    console.log(data)
    data.forEach((element: any) => {
        console.log(element.title)
    });

    //här applyar jag datan från min andra funktion
    //input ska vara av typ Book, och vi säger att fen fetchade datan är book ovan
    
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

        currentBook.innerHTML = 
        `<h2>${book.title}</h2>
        <p>${book.author}</p>`
        

        //lägg till book detaljerna till infosidan när en klickas
        currentBook.addEventListener('click', () => {
            addBookDetails(book);
            body.style.backgroundColor = "rgb(36, 35, 35)"
          });
        
    });
}

//lägg till klick event på alla books
function clickBook(): void{
    allBooks.forEach(element => {
        //kollar om det verkligen är ett html element
        if(element instanceof HTMLElement){
            element.addEventListener('click', e => {
                element.style.opacity = "0.8"
                mainWrapper.classList.add('hidden')
                mainHeader.classList.add('hidden')
                infoPage.classList.toggle('hidden')
                exitButton.classList.toggle('hidden')
            })
        }
    }); 
}
clickBook()




function clickExitButton(): void{
    exitButton?.addEventListener('click', e => {
        body.style.backgroundColor = "inherit"
        mainWrapper.classList.toggle('hidden')
        mainHeader.classList.toggle('hidden')
        infoPage.classList.toggle('hidden')
        exitButton.classList.toggle('hidden')
    })
}
clickExitButton()
