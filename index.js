


//THE BELOW CODE FETCHES FROM THE ORIGINAL API -- I MOVED THIS TO A JSON SERVER SO I COULD POST:)
// function fetchEntries() {
//     fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data.data)
//         sliderNameChange(data);
//       })
//       .catch(error => console.error('Error fetching entries:', error));
//   }

function fetchEntries() {
      fetch('http://localhost:3000/hyrule/')
        .then(response => response.json())
        .then(data => {

          data.forEach((obj, index) => {
            const tile = document.getElementById("tile")
            const img = document.createElement("img")
            img.setAttribute('src', obj.image);
            img.setAttribute('class', "image")
            tile.appendChild(img);
            });
          console.log(data)
          sliderSet(data);
          
        })
        .catch(error => console.error('Error fetching entries:', error));
    }

  //Variables for listeners
const slideText = document.getElementById('slideText')
const slideCategory = document.getElementById('slideCategory');
const slideDescription= document.getElementById('slideDescription');
const prevButton = document.querySelector('.arrow#prevButton');
const nextButton = document.querySelector('.arrow#nextButton');
const fsButton = document.getElementById('fsButton');
const form = document.querySelector('form');

function updateSlide(slide, slideText,slideDescription, slideCategory) {
  slideText.textContent = slide.name;
  slideDescription.textContent = slide.description;
  slideCategory.textContent = `Category: ${slide.category}`;
  document.querySelector('.wrapper').style.backgroundImage = `url(${slide.image})`;
  
}

function sliderSet(entries) {
  const slides = entries;
  let currentSlideIndex = 0; // Track the current slide index
  updateSlide(slides[currentSlideIndex], slideText, slideDescription, slideCategory);//set inital slider

  prevButton.addEventListener('click', () => { //set event listener for previous button click
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    console.log(currentSlideIndex)
    updateSlide(slides[currentSlideIndex], slideText, slideDescription, slideCategory);
  }) 
  
  nextButton.addEventListener('click',() => { //set event listener for next button click
    currentSlideIndex = (currentSlideIndex + 1 + slides.length) % slides.length;
    console.log(currentSlideIndex)
    updateSlide(slides[currentSlideIndex], slideText, slideDescription, slideCategory);
  })

  

}

  function addEntry(entry) {
    fetch('http://localhost:3000/hyrule/',{
      method:"POST",
       headers: {
        "Content-Type": "application/json",
    },
  
    body: JSON.stringify(entry),
     
  
    })
  .then(res => res.json())
  .then(
  fetchEntries());
  }
  function goFullScreen(){
    fsButton.addEventListener('click', function(){
      let wrapper = document.querySelector('.wrapper');
      let backgroundImageStyle =wrapper.style.backgroundSize
      
      if (backgroundImageStyle === "cover"){
        wrapper.style.backgroundSize = 'contain';
    } else {
        wrapper.style.backgroundSize = "cover";
    }
    })
  }

  const addSubmitListener = () => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      let entryName = form.querySelector('input[name="name"]');
      
      let entryImage = form.querySelector('input[name="logo"]');
      let entryCategory= form.querySelector('input[name="category"]');
      let entryComments = form.querySelector('input[name="description"]');

       let entry = {
        name:entryName.value,
        image:entryImage.value,
        category:entryCategory.value,
        comments:entryComments.value,
       }
  
       addEntry(entry)
    });
  };

  const main =() =>{
    addSubmitListener()
    fetchEntries() 
    goFullScreen()
  }

  main()