import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const btnElm = document.querySelectorAll('button');

const changeMove = (event) => {
  if (currentPlayer === 'circle') {
    event.target.classList.add('board__field--circle', 'zoom');
    currentPlayer = 'cross';
    player.className = 'board__player--cross';
    response();
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

const response = () => {
  btnElm.forEach((button) => {
    button.disabled = true;
  });

  const gameArray = Array.from(btnElm).map((button) => {
    if (button.classList.contains('board__field--circle')) {
      return 'o';
    } else if (button.classList.contains('board__field--cross')) {
      return 'x';
    } else {
      return '_';
    }
  });

  fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      board: gameArray,
      player: 'x',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const { x, y } = data.position;
      const index = x + y * 10;
      btnElm.forEach((button) => {
        if (
          button.classList.contains('board__field--cross') ||
          button.classList.contains('board__field--circle')
        ) {
          button.disabled = true;
        } else {
          button.disabled = false;
        }
      });

      btnElm[index].click();
    });
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
