const lookBtn = document.querySelector('.transfer__btn');
const nameInput = document.getElementById('name__input');
const nationInput = document.getElementById('nation__input');
const ageInput = document.getElementById('age__input');
const positionInput = document.getElementById('position__input');
const imgInput = document.getElementById('img__input');
const uploadBtn = document.querySelector('.upload__btn');

const LookPlayer = () => {
    lookBtn.addEventListener('click', ()=>{
        window.open("https://www.transfermarkt.com/premier-league/marktwerte/wettbewerb/GB1","_blank");

    })
}
LookPlayer();

const db = firebase.firestore();
const storage = firebase.storage();

const Upload = () =>{
   
    uploadBtn.addEventListener('click',()=>{
        const playerName = nameBtn.value; 
        const playerNation = nationBtn.value;
        const playerAge = ageBtn.value;
        const playerPosition = positionBtn.value; 

        let file = imgBtn.files[0];
        let storageRef = storage.ref();
        let storagePath = storageRef.child('image/'+ file.name);
        let uploadWork = storagePath.put(file)

        uploadWork.on('state_changed',
          null,
          (error)=>{
            console.error('Error :', error);
          },
          ()=>{
          
            uploadWork.snapshot.ref.getDownloadURL().then((url)=>{
                console.log('upload path :', url);

                let saveInfo = {
                    'Name' : playerName,
                    'Nation' : playerNation,
                    'Age' : playerAge,
                    'position': playerPosition,
                    'image' : url
                };
                db.collection('Player').add(saveInfo)
                    .then((result)=>{
                        alert('업로드 완료');
                        window.location.href="playerList.html";
                    })
                    .catch((error)=>{
                        alert('업로드 실패');
                    });
            });
          }
        )
    });
}
Upload();