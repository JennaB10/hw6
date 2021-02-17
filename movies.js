

window.addEventListener('DOMContentLoaded', async function(event) {
let db = firebase.firestore()

  let response = await fetch (`https://api.themoviedb.org/3/movie/now_playing?api_key=d071155b9ef8b1a6d5c5c8e9fa7ad957&language=en-US`) 
  let json = await response.json()
  let movies = json.results 
  console.log(movies)

  for (let i=0; i<movies.length; i++) {
    let movieId = movies[i].id
    let posterUrl = movies[i].poster_path
      
    document.querySelector('.movies').insertAdjacentHTML('beforeend',` 
     <div class="w-1/5 p-4 movie-${movieId}">
      <img src="https://image.tmdb.org/t/p/w500/${posterUrl}" class="w-full">
      <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
     </div>
        `)

        let docRef = await db.collection('watchedMovie').doc(`${movieId}`).get()
        let movieClicked = docRef.data()
    
        if(movieClicked){
          let movieViewed = document.querySelector(`.movie-${movieId}`)
          movieViewed.classList.add('opacity-20')
      }
         let watchedButton = document.querySelector(`.movie-${movieId}`)
        console.log(watchedButton)
        watchedButton.addEventListener(`click`, async function(event){
        event.preventDefault()
        let movieViewed = document.querySelector(`.movie-${movieId}`)
        movieViewed.classList.add('opacity-20')
        await db.collection(`watched`).doc(`${movieId}`).set({})
      
      })
    }
  
 

  // Step 3: 
  // - Attach an event listener to each "watched button"
  // - Be sure to prevent the default behavior of the button
  // - When the "watched button" is clicked, changed the opacity
  //   of the entire "movie" by using .classList.add('opacity-20')
  // - When done, refresh the page... does the opacity stick?
  // - Bonus challenge: add code to "un-watch" the movie by
  //   using .classList.contains('opacity-20') to check if 
  //   the movie is watched. Use .classList.remove('opacity-20')
  //   to remove the class if the element already contains it.
  // ⬇️ ⬇️ ⬇️

  // ⬆️ ⬆️ ⬆️ 
  // End Step 3

  // Step 4: 
  // - Properly configure Firebase and Firebase Cloud Firestore
  // - Inside your "watched button" event listener, you wrote in
  //   step 3, after successfully setting opacity, persist data
  //   for movies watched to Firebase.
  // - The data could be stored in a variety of ways, but the 
  //   easiest approach would be to use the TMDB movie ID as the
  //   document ID in a "watched" Firestore collection.
  // - Hint: you can use .set({}) to create a document with
  //   no data – in this case, the document doesn't need any data;
  //   if a TMDB movie ID is in the "watched" collection, the 
  //   movie has been watched, otherwise it hasn't.
  // - Modify the code you wrote in Step 2 to conditionally
  //   make the movie opaque if it's already watched in the 
  //   database.
  // - Hint: you can use if (document) with no comparison
  //   operator to test for the existence of an object.
})


