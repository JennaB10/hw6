

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

        let docRef = await db.collection('watched').doc(`${movieId}`).get()
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
  
 })


