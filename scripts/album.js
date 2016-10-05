
//Example Album
var albumPicasso = {
   title: 'The Colors',
   artist: 'Pablo Picasso',
   label: 'Cubism',
   year: '1881',
   albumArtUrl: 'assets/images/album_covers/01.png',
   songs: [
       { title: 'Blue', duration: '4:26' },
       { title: 'Green', duration: '3:14' },
       { title: 'Red', duration: '5:01' },
       { title: 'Pink', duration: '3:21' },
       { title: 'Magenta', duration: '2:15' }

   ]

};

//Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
       { title: 'Hello, Operator?', duration: '1:01' },
       { title: 'Ring, ring, ring', duration: '5:01' },
       { title: 'Fits in your pocket', duration: '3:21' },
       { title: 'Can you hear me now?', duration: '3:14' },
       { title: 'Wrong phone number', duration: '2:15' }

    ]

};

var createSongRow = function(songNumber, songName, songLength){
    var template = 
       '<tr class="album-view-song-item">'
       +  '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
       +  '  <td class="song-item-title">' + songName + '</td>'
       +  '  <td class="song-item-duration">' + songLength + '</td>'
       +  '</tr>'
       ;


       return template;
};

    //Store state of playing songs
    var currentlyPlayingSong = null;

    //Album button templates
    var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>'; 
    var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';


    var setCurrentAlbum = function(album){
    //#1
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
   
   //#2
   albumTitle.firstChild.nodeValue = album.title;
   albumArtist.firstChild.nodeValue = album.artist;
   albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
   albumImage.setAttribute('src', album.albumArtUrl);
   //#3
   albumSongList.innerHTML = '';
    
   //#4
   for (var i = 0; i < album.songs.length; i++ ){
      albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);      
   }

};

//Change the song number to the pause button
var findParentByClassName = function(element, targetClass){

  if (element) {

    var currentParent = element.parentElement;
    while (currentParent.className != targetClass && currentParent.className !== null){
         
         currentParent = currentParent.parentElement;
         
    }
    return currentParent;
  }  else if (currentParent !== element.parentElement){
    
    console.log("No parent found");

  } else if (currentParent.className == null){
    
    console.log("No parent found with that class name");

  }
};


var getSongItem = function(element) {

  switch(element.className){
     case 'album-song-button':
     case 'ion-play':
     case 'ion-pause':
          return findParentByClassName(element, 'song-item-number');
          break;
     case 'album-view-song-item':
          return element.querySelector('.song-item-number');
          break;
     case 'song-item-title':
     case 'song-item-duration':
          return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
          break;
     case 'song-item-number':
          return element;
          break;
     default:
        return;

  }


};

    var clickHandler = function(targetElement) {
    
    var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null){

      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');

    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')){
      
      songItem.innerHTML = playButtonTemplate;
      currentlyPlayingSong = null;

    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')){
          var currentlyPlayingSongElement = document.querySelector('[data-song-number="'+ currentlyPlayingSong + '"]');
          currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
          songItem.innerHTML = pauseButtonTemplate;
          currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }

  };
  
window.onload = function(){

  setCurrentAlbum(albumPicasso);

  var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
  var songRows = document.getElementsByClassName('album-view-song-item');
  
  

  songListContainer.addEventListener('mouseover', function(event){
     if (event.target.parentElement.className === 'album-view-song-item'){
         //Change the content from the number to the play button's HTML
         event.target.parentElement.querySelector('.song-item-number').innerHTML = pauseButtonTemplate;
         
         var songItem = getSongItem(event.target);

          if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong){
               songItem.innerHTML = playButtonTemplate;  
          }
          
      }
  });

  //Add event listeners to each row to signal when a user's mouse leaves the target
  for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event){

      //Revert the content back to the number 
      //Selects first child element, which is the song-item-number element
      var songItem = getSongItem(event.target);
      
      var songItemNumber = songItem.getAttribute('data-song-number');
      

      if (songItemNumber !== currentlyPlayingSong){
            songItem.innerHTML = songItemNumber;
      }
    
    });

   songRows[i].addEventListener('click', function(event){
        //Event handler call
        clickHandler(event.target);

   });

  }

}
           
