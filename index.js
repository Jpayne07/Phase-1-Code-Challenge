//fetch for DB
function fetchEntries() {
    fetch('http://localhost:3000/entries/')
      .then(response => response.json())
      .then(data => {
        sliderNameChange(data);
      })
      .catch(error => console.error('Error fetching entries:', error));
  }

  //Variables for listeners
const slideText = document.getElementById('slideText');
const prevButton = document.querySelector('.arrow#prevButton');
const nextButton = document.querySelector('.arrow#nextButton');
const playButton = document.getElementById('play-button');
const form = document.querySelector('form');


//code for slider change
function sliderNameChange(entries) {
    const slides = entries;
    let currentSlideIndex = 0; // Track the current slide index
    slideText.textContent = slides[currentSlideIndex].name;
     // Initialize the slide text
    document.querySelector('.wrapper').style.backgroundImage = `url(${slides[currentSlideIndex].boxArt})`; // Set the initial background image
  
    prevButton.addEventListener('click', function() {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      slideText.textContent = slides[currentSlideIndex].name;
      document.querySelector('.wrapper').style.backgroundImage = `url(${slides[currentSlideIndex].boxArt})`;
    });
  
    nextButton.addEventListener('click', function() {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      slideText.textContent = slides[currentSlideIndex].name;
      document.querySelector('.wrapper').style.backgroundImage = `url(${slides[currentSlideIndex].boxArt})`;
    });
  }

//code for new submission
  function addEntry(entry) {
    fetch('http://localhost:3000/entries/',{
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

  //code for grabbing elements from new submission
  const addSubmitListener = () => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      let entryName = form.querySelector('input[name="name"]');
      
      let entryImage = form.querySelector('input[name="logo"]');
      let entryRating = form.querySelector('input[name="rating"]');
      let entryComments = form.querySelector('input[name="comments"]');

       let entry = {
        name:entryName.value,
        boxArt:entryImage.value,
        rating:entryRating.value,
        comments:entryComments.value,
       }
  
       addEntry(entry)
    });
  };

  const main =() =>{
    addSubmitListener()
    fetchEntries() 
  }

  main()