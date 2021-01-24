const imageConatiner = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray =[];


// unsplash API
const count =10;
const apiKey = 'Ymbts5wXzA7JfvIeNkYk8OQt8AhiG_V4GPyWLMgjN6Q';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded() {
   
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
       // console.log('ready =', ready);
    }
}


//helper function to set attributes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for link & photos, add to dom
function displayPhotos() {
    imagesLoaded =0;
    totalImages = photosArray.length;
   // console.log('total images', totalImages);
    // run function  for each object in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        const item = document.createElement('a');
       
       setAttributes(item, {
           href : photo.links.html,
           target: '+blank,'
       })
        // create <img> for photo
        const img = document.createElement('img');
       
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

     //   evebt listiner check when each is finished loading
     img.addEventListener('load', imageLoaded);

        //put <img> inside <a>, then put inside imageContainer element
        item.appendChild(img);
        imageConatiner.appendChild(item); 
    });
}


//Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch error here
    }
}


//check to see if scrolling near bottom of page , load more photos
window.addEventListener('scroll', ()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        
    }
});

//on load
getPhotos();