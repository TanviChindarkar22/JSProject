const imageContainer=document.getElementById('image-container')
const loader=document.getElementById('loader')

let ready=false;
let imagesLoaded=0;
let totalImages=0; 
let photosArray=[];
let initialLoad=true;

// unsplash API
const count=5;
const apikey='pyxQkMb6hE57Cyi1_IJm9yHrnXhV1GCMgzgt8wWJkxg'
const apiUrl=`https://api.unsplash.com/photos/random/?
client_id=${apikey}&count=${count}`

//helper function to set attributes on DOM elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded==totalImages){
        ready=true;
        loader.hidden=true;        
    }
}


// create elements for links & photos, add to DOM
function displayPhotos(){
    //run function for each object in photosArray
    imagesLoaded=0;
    totalImages=photosArray.length;

    photosArray.forEach((photo)=>{
        // create <a> to link to unsplash
        const a= document.createElement('a');
        setAttributes(a, {
            href: photo.links.html,
            target:'_blank'
        })

        //create <img> for photo
        const img=document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt:photo.alt_description,
            titiel:photo.alt_description
        })
        //event listner , check when each is finished loading
        img.addEventListener('load', imageLoaded())

        // put <img> inside <a>, theb put both inside image container element
        a.appendChild(img)
        imageContainer.appendChild(a);
    });
} 



// get photos
async function getPhotos(){
    try{
        const response= await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos();
    }
    catch(error){

    }
}
// check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
    }
})


//on load
getPhotos()