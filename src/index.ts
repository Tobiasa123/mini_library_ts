
//variables, html elements, interfaces etc

import { Book } from "./interface"


const allBooks = document.querySelectorAll('.books')



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
    applyData(data);

    return data;
}
getData()

//apply data array på books från skapat interface
function applyData(myData: Book[]){

    myData.forEach((book: Book, index: number) => {
        //allBooks är html element
        let currentBook = allBooks[index]
        //lägg till title som vi har i vårt interface, om jag vill lägga till något annat än just title måste jag ändra det i interface först
        currentBook.innerHTML = `<h2>${book.title}</h2>`
    });

}