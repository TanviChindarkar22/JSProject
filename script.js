const quoteContainer=document.getElementById("quote-container");
const quoteText=document.getElementById("quote");
const authorText=document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader=document.getElementById('loader')

let apiQuotes=[];

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function removeLoadingSpinner(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

//Show new quote
function newQuote(){
    showLoadingSpinner();
    try{
        const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // const quote=localQuotes[Math.floor(Math.random() * localQuotes.length)];
    //check if author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent='Unknown';
    }
    else{
        authorText.textContent= quote.author;
    }
    //check quote length to determine styling
    if(quote.text.length>100){
        quoteText.classList.add("long-quote")
    }
    else{
        quoteText.classList.remove("long-quote")
    }
    //Set Quote, hide loader
    quoteText.textContent=quote.text;
    removeLoadingSpinner();
    }
    catch(error){
        removeLoadingSpinner()
        alert("Something went wrong! Please try again.")
    }
    
}

// Get quotes from api
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try{
        const response=await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuote();        

    }catch(error){
        return
    }
}

// Tweet Quote
function tweetQuote(){
    const twittweUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent};`
    window.open(twittweUrl,'_blank')
}

// Event Listners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote)


// on load
getQuotes();