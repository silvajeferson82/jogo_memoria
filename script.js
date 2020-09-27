const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//Virar Carta
function flipCard(){
   if(lockBoard) return;
   if(this === firstCard) return;

   this.classList.add('flip');
   if(!hasFlippedCard){
      hasFlippedCard = true;
      firstCard = this;
      return;
   }

   secondCard = this;
   hasFlippedCard = false;
   checkForMatch();
}

//Valida se for igual
function checkForMatch(){
   if(firstCard.dataset.card === secondCard.dataset.card){
      disabledCards();
      return;
   }
   unflipCards();
}

//Desabilita as cartas
function disableCards(){
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click',flipCard);

   resetBoard();
}

//Desvira as cartas
function unflipCards(){
   lockBoard = true;

   setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
   },1500);
}

//Resetar Tabuleiro
function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
   cards.forEach((card) => {
      let ramdomPosition = Math.floor(Math.random() * 12);
      card.style.order = ramdomPosition;
   })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
   card.addEventListener('click', flipCard)
});