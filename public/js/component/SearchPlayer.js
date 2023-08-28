export function searchPlayer(SearchBtn){
    
        const filterPlayer = SearchBtn.value.toLowerCase();
        const filterRow = document.querySelectorAll('.player__cell');
      
        filterRow.forEach((cell)=>{
          let cellText = cell.textContent.toLowerCase();
          if(cellText.includes(filterPlayer)){
            cell.style.display='';
          }else{
            cell.style.display = 'none';
          }
        });
      } 
