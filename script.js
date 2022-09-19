const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const instagramBtn = document.getElementById('instagram');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const copyBtn = document.getElementById('copy-quote')
let newqote  = "";
let author= "";


let apiQuotes = [];

// show loading
function loading() {
    loader.hidden =false;
    quoteContainer.hidden = true;
}

//  hide loading
function complete() {
    if (!loader.hidden) { 
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


//show new quote
function newQuote() {
    loading();
 //pick a random quote from apiquotes array
 const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if author field is blank and replace with 'unknown'
  if(!quote.author) {
    authorText.textContent = 'Unknown';
} else {
    authorText.textContent =quote.author;
}   
 // check quote length to determine styling
    if(quote.text.length >50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote hide loader
    quoteText.textContent = quote.text;
    newqote = quote.text;
    author = quote.author;
  
    complete();

}
// get Quotes from API
async function getquotes() {
    loading();
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

function copyText() {
    let str = newqote + " " + "\n" +author  
    /* Copy text into clipboard */
    navigator.clipboard.writeText
        (str);
        alert("text copied");
    }


// event listener
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click', tweetQuote);
instagramBtn.addEventListener('click', quoteOnInsta);
copyBtn.addEventListener('click',copyText);

//onload
getquotes();  
