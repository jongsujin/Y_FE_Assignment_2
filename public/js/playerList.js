import {searchPlayer} from './component/SearchPlayer.js';
document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector('.add__btn');
const searchBtn = document.querySelector('.logo-search__search input');
const removeBtn = document.querySelector('.delete__btn');
const addPlayer = document.querySelector('.add__player__list');
const allSelectBtn = document.querySelector('.all__btn');

function moveToExternalPage(page) {
  window.location.href = page;
}


const removePlayer = () =>{
  const checkboxes = document.querySelectorAll('.checkbox__container input[type="checkbox"]');
  checkboxes.forEach((checkbox)=>{
      if(checkbox.checked){
          const playerId = checkbox.closest('tr').getAttribute('data-id');
          removePlayertoDB(playerId);
          checkbox.closest('tr').remove();
      }
  });
};

const removePlayertoDB= (playerId) =>{
  db.collection("Player").doc(playerId).delete()
    .then(()=>{
      alert("선수가 방출 되었습니다!");
    })
    .catch((error)=>{
      alert("에러 발생");
      console.error("Error : ", error);
    });
};

const selectAllPlayer = '전체 선택';
const deleteAllPlayer = '전체 해제';
const allSelectedPlayers = ()=>{
  const allCheckboxes = document.querySelectorAll('.checkbox__container input[type="checkbox"]');
  const isSelected = allCheckboxes[0].checked;
  allCheckboxes.forEach(checkbox => {
      checkbox.checked = !isSelected;
  });

  allSelectBtn.textContent = isSelected ? selectAllPlayer : deleteAllPlayer; // allSelectBtn.textContent = isSelected ? '전체 선택' : '전체 해제';
}
const createPlayer = (player)=>{
  const row = document.createElement("tr");
  row.classList.add("player__cell");
  row.setAttribute('data-id', player.id);
  row.innerHTML = `
           <td>
           <div class="player__info">
               <div class="checkbox__container">
                   <input type="checkbox">
               </div>
               <img  class="player__image" src="${player.image}" alt="${player.image}">
               <span class="player__name">${player.Name}</span>
           </div>
           </td>
           <td>${player.Nation}</td>
           <td>${player.Age}</td>
           <td>${player.position}</td>
  `;
    const playerImage = row.querySelector(".player__image");
    playerImage.addEventListener('click',(event)=>{
      event.stopPropagation();
      localStorage.setItem('selectedPlayer', JSON.stringify(player));
      moveToExternalPage('playerInfo.html')// window.location.href= "playerInfo.html";
  })
  addPlayer.appendChild(row);
};


function setup(){
  addBtn.addEventListener("click", ()=> moveToExternalPage('playerUpload.html'));
  removeBtn.addEventListener('click', removePlayer);
  searchBtn.addEventListener('keyup', ()=> searchPlayer(searchBtn));
  allSelectBtn.addEventListener('click', allSelectedPlayers);
}
setup();


const db = firebase.firestore();

db.collection("Player")
  .get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
        const playerId= doc.id;
        const playerData = doc.data();
        playerData.id = playerId;
        createPlayer(playerData);
    });
  })
  .catch((error)=>{
    console.log("Error : " , error);
  });
});


