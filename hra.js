import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const btnElm = document.querySelectorAll('button');

const changeMove = (event) => {
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle', 'zoom');
    currentPlayer = 'cross';
    player.className = 'board__player--cross';
  } else if (currentPlayer === 'cross') {
    event.target.classList.add('board__field--cross', 'zoom');
    currentPlayer = 'circle';
    player.className = 'board__player--circle';
  }
  event.target.disabled = true;
  herniPole();
};

const signs = document.querySelectorAll('.grid-container button');

const herniPole = () => {
  const gameArray = Array.from(signs).map((sign) => {
    if (sign.classList.contains('board__field--circle')) {
      return 'o';
    } else if (sign.classList.contains('board__field--cross')) {
      return 'x';
    }
    return '_';
  });

  const vitez = findWinner(gameArray);

  if (vitez === 'x') {
    setTimeout(() => {
      alert('Vyhrál hráč s křížky');
      location.reload();
    }, 200);
  } else if (vitez === 'o') {
    setTimeout(() => {
      alert('Vyhrál hráč s kolečky');
      location.reload();
    }, 200);
  } else if (vitez === 'tie') {
    setTimeout(() => {
      alert('Hra skončila remízou');
      location.reload();
    }, 200);
  }
};

btnElm.forEach((button) => {
  button.addEventListener('click', changeMove);
});

const restart = document.querySelector('.buttons-hra-restart');
restart.addEventListener('click', (event) => {
  if (!confirm('Opravdu chces zacit znovu?')) {
    event.preventDefault();
  }
});
