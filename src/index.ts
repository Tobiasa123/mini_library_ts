
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
//även color vill vi lägga till
function addBookDetails(book: Book, color: string): void {
    const infoBook = document.querySelector('.infoBook') as HTMLElement;
    const infoTitle = document.querySelector('.infoTitle') as HTMLElement;
    //const author = document.querySelector('.author') as HTMLElement;
    const infoPara = document.querySelector('.infoPara') as HTMLElement;
    const infoAudience = document.querySelector('.infoAudience') as HTMLElement;
    const infoPublished = document.querySelector('.infoPublished') as HTMLElement;
    const infoPagesNum = document.querySelector('.infoPagesNum') as HTMLElement;
    const infoPublisher = document.querySelector('.infoPublisher') as HTMLElement;

    //ge info till små böckerna
    infoBook.innerHTML = 
    `<h1>${book.title}</h1>
    <p>${book.author}</p>`;

    //här får infobook färgen av valda boken från parametern i denna funktion
    infoBook.style.backgroundColor = color;

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
async function getData(): Promise<Book[]> {

    try {
        let response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books')

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
         //säg att datan vi får tillbaka ska vara en array av books
        let data: Book[] = await response.json()

        //logga data array
        console.log(data)

        //här applyar jag datan från min andra funktion
        //input ska vara av typ Book, och vi säger att den fetchade datan är book h'r ovan
        applyData(data);

        return data;

    } catch (error) {
        console.log(error)  
        throw error;  
    } 
}
getData()

function applyData(myData: Book[]): void{

    myData.forEach((book: Book, index: number) => {
        //allBooks är html element
        let currentBook = allBooks[index] as HTMLElement
        //lägg till title som vi har i vårt interface, om jag vill lägga till något annat än just title måste jag ändra det i interface först

        currentBook.innerHTML = 
        `<h2>${book.title}</h2>
        <p>${book.author}</p>`;

        //lägg till färg på de små böckerna
        switch (book.id) {
            case 1:
                currentBook.style.backgroundColor = book.color;
                break;
            case 2:
                currentBook.style.backgroundColor = book.color;
                break;
            case 3:
                currentBook.style.backgroundColor = book.color;
                break;
            case 4:
                currentBook.style.backgroundColor = book.color;
                break;
            case 5:
                currentBook.style.backgroundColor = book.color;
                break;
            case 6:
                currentBook.style.backgroundColor = book.color;
                break;
            case 7:
                currentBook.style.backgroundColor = book.color;
                break;
            case 8:
                currentBook.style.backgroundColor = book.color;
                break;
            default:
                console.log("outta bounds")
                break;
        }
        //lägg till book detaljerna till infosidan när en klickas
        currentBook.addEventListener('click', () => {

            addBookDetails(book, book.color);

            body.style.backgroundColor = "rgb(20, 20, 20)"
        });
        
    });
}

//lägg till klick event på alla books
function clickBook(): void{
    allBooks.forEach(element => {
        //kollar om det verkligen är ett html element
        if(element instanceof HTMLElement){
            element.addEventListener('click', () => {
                //element.style.opacity = "0.6"
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
    exitButton?.addEventListener('click', () => {
        body.style.backgroundColor = "#16284b"
        mainWrapper.classList.toggle('hidden')
        mainHeader.classList.toggle('hidden')
        infoPage.classList.toggle('hidden')
        exitButton.classList.toggle('hidden')
    })
}
clickExitButton()
