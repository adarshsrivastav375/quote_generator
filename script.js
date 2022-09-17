const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const instagramBtn = document.getElementById('instagram');
const newQuoteBtn = document.getElementById('new-quote');
// const copyBtn = document.getElementById('copy-quote')

let apiQuotes = [];

//show new quote
function newQuote() {
 //pick a random quote from apiquotes array
 const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
 // check quote length to determine styling
    if(quote.text.length >50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent =quote.author;
    }
    


}
// get Quotes from API
async function getquotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    }catch (error) {
        // catch error
    }
}

// tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
// post on instagram
function quoteOnInsta(){
    const instagramUrl = `https://www.instagram.com/create/story?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(instagramUrl,'_blank');
}

// function copyText() {
      
//     /* Copy text into clipboard */
//     navigator.clipboard.writeText
//         (quoteText.textContent);
// }

// event listener
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);
instagramBtn.addEventListener('click', quoteOnInsta);
// copyBtn.addEventListener('click',copyText);

//onload
getquotes();