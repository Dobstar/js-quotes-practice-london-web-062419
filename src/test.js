const deleteQuote = quoteId => {
    return fetch(`${quotesLikesUrl}/${quoteId}`, {
        method: "DELETE"
    }).then(resp => resp.json());
};


deletebtn.addEventListener('click', () => deleteQuote(quote.id, li));
