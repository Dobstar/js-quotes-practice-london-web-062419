// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 

//first need to get the URLS
const mainURL = "http://localhost:3000/quotes?_embed=likes";

const fetchingAllData = () => {
    fetch(mainURL)
    .then(resp => resp.json())
    .then(quotesArray => renderQuotes(quotesArray))
};

const renderQuotes = (quotes) => {
    quotes.forEach(quote => {
        renderAQuote(quote)
    });
};

//need to query select where the new elements that will be created go to 
const quoteList = document.querySelector("#quote-list");

const renderAQuote = (quote) => {
const li = document.createElement("li");
li.className = 'quote-card';

const blockquote = document.createElement('blockquote');
blockquote.className = 'blockquote';

const p = document.createElement('p');
p.className = "mb-0";
p.innerText = quote.quote;

const footer = document.createElement('footer');
footer.className = "blockquote-footer";
footer.innerText = quote.author;

const br = document.createElement('br');

const span = document.createElement('span');
span.innerText = quote.likes.length

const likeBtn = document.createElement('button');
likeBtn.className = "btn-success";
likeBtn.innerText = "Likes: "
likeBtn.append(span)

const deleteBtn = document.createElement('button');
deleteBtn.className = 'btn-danger';
deleteBtn.id = quote.id
deleteBtn.innerText = "Delete";

li.append(blockquote, p, footer, br, likeBtn, deleteBtn);
quoteList.append(li);

// deleteBtn.addEventListener("click", () => {
//     event.target.parentElement.remove();
//     deleteQuote(event.target.className); 
// });

    likeBtn.addEventListener("click", e => {
        id = parseInt(e.target.id.split('-')[1]);
        updateLikes(id)
        e.target.firstElementChild.innerText = 
        parseInt(e.target.firstElementChild.innerText) + 1;
    });
};
//now to select the form and get the information e.g input.
const newQuoteForm = document.querySelector('#new-quote-form');

const updateURL = "http://localhost:3000/quotes";
const newQuote = document.querySelector("#new-quote");
const newAuthor = document.querySelector("#author");

//inside the post request we want to updatet the form submission with the user's input. 
//so using the newQuote and newAuthor and value.

const addQuote = () => {
    fetch(updateURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            quote: newQuote.value,
            author: newAuthor.value,
            likes: []
        })
    })
    .then(resp => resp.json())
    .then(newObj => renderAQuote(newObj));
};

newQuoteForm.addEventListener('submit', event => {
    event.preventDefault();
    addQuote();
});

// const deleteQuote = (id) => {
//     fetch(mainURL + `/${id}`,{
//         method: "DELETE"
//     });
// };

const likesURL = "http://localhost:3000/likes";

const updateLikes = (qID) => {
    fetch(likesURL, {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            quoteId: qID
        })
    })
}


document.addEventListener("DOMContentLoaded", () => {
    fetchingAllData();
})