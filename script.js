const search=document.getElementById("search");
const searchBtn=document.getElementById("search-btn");
const list=document.querySelectorAll("strong");
const para=document.querySelectorAll(".titleSearch span");
const buttons=document.querySelectorAll(".author button");
const lyric=document.querySelector(".lyric");
var file=[]

searchBtn.addEventListener('click',function(){
  
  const search = document.getElementById("search").value
  document.querySelector(".titleSearch").style.display="block"
  fetch(`https://api.lyrics.ovh/suggest/${search}`)
  .then(res=>res.json())
  .then(data=>{ 
    for(let i=0;i<10;i++){
      title=data.data[i].title
      artist=data.data[i].artist.name
      file.push(title)
      file.push(artist)
      list[i].innerHTML=`${title}` 
      para[i].innerHTML=`${artist}`
    }
    lyrics(data)
  })
  
})

function lyrics(pack){

buttons.forEach((v,i)=>{
  let artist=pack.data[i].artist.name
  let title=pack.data[i].title
  v.addEventListener('click',function(){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res=>res.json())
    .then(data=>{   
      lyric.innerHTML=data.lyrics
      lyric.style.display="block"
    })
  })
})

}

