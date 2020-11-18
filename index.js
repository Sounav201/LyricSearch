const form=document.getElementById('form');
const search=document.getElementById('Search');
const result=document.getElementById('result');

const api_url='https://api.lyrics.ovh';

//Adding event listener for the form

form.addEventListener('submit', e =>{
    e.preventDefault();
     searchval=search.value.trim();
    
    //check if search value is empty or not
    
    if(!searchval)
        alert('There is nothing to be searched ');
    else{
        searchSong(searchval)
    
    }
});

//Search the song
async function searchSong(searchval){
    //alert(searchval)
    const SearchResult=await fetch(`${api_url}/suggest/${searchval}`)
    //console.log(SearchResult)
    const data=await SearchResult.json();
    //console.log(data);
    DisplayResults(data)
}


function DisplayResults(data){
    result.innerHTML = `<ul class="song-list">
    ${data.data
        .map(song =>  `<li>
                                <div>
                                 <strong>
                                     ${song.artist.name}
                                  </strong> -${song.title}
                                </div>
                                <span data-artist="${song.artist.name}" data-songtitle="${song.title}">
                                    Get Lyrics
                                </span>
                              </li>`).join('')}

                        </ul>`;

}


//Add event listener to get lyrics
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songtitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songtitle)
    }
})

// Get lyrics for song
async function getLyrics(artist, songtitle) {
    const res = await fetch(`${api_url}/v1/${artist}/${songtitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songtitle}</h2>
    <p>${lyrics}</p>`;
  
  }