let bannerInterval, timerIncrement = 700, timer = 0, bannerPosition = 0,
resultsBtnEnabled = false, isPaused = false, timeouts = [];

const playBtn = document.querySelector('.btn.play');
const pauseBtn = document.querySelector('.btn.pause');
const resetBtn = document.querySelector('.btn.reset');
const resultsBtn = document.querySelector('.btn.result-toggle');
const allBtns = [ playBtn, pauseBtn, resetBtn, resultsBtn ];
const gameContent = document.querySelector('.game-content');
const result = document.querySelector('.result');
const bannerContent = document.querySelector('.banner-content');
const arr = [...Array(100)].map((_, i) => i + 1);

const fizzBuzz = arr.map((nr, i) => {
  if (nr % 15 === 0) {
    return { item: `<strong class="red">FizzBuzz</strong>`, nr };
  }
  if (nr % 5 === 0) {
    return { item: `<strong class="green">Buzz</strong>`, nr };
  }
  if (nr % 3 === 0) {
    return { item: `<strong class="blue">Fizz</strong>`, nr };
  }
  return { item: nr  };
});

const startBannerInterval = () => {
  bannerInterval = setInterval(() => {
    if (bannerContent.getBoundingClientRect().width > 800) {
      if (!resultsBtnEnabled) {
        resultsBtn.classList.remove('hidden');
        resultsBtnEnabled = true;
      }
      bannerPosition--;
      bannerContent.style.left = `${bannerPosition}px`;
    }
  }, 10);
}

const resetTimeouts = () => {
  timeouts.forEach(timeOut => clearTimeout(timeOut));
  timeouts = [];
  timer = 0;
};

const resetGame = () => {
  toggleShowButtons();
  bannerContent.innerHTML = '';
  result.innerHTML = '';
  resultsBtn.innerText = 'Show all results';
  resultsBtn.setAttribute('data-toggle', 'off');
  gameContent.innerHTML = '';
  bannerPosition = 0;
  bannerContent.style.left = '';
  resetTimeouts();
}

const togglePauseGame = () => {
  isPaused = pauseBtn.getAttribute('data-is-paused') === 'true';
  if (isPaused) {
    const currentIndex = gameContent.getAttribute('data-index');
    setGameTimeouts(fizzBuzz.slice(currentIndex, fizzBuzz.length));
    startBannerInterval();
    pauseBtn.innerHTML = pauseBtn.innerHTML.replace('far', 'fas').replace('Resume', 'Pause');
  } else {
    resetTimeouts();
    clearInterval(bannerInterval);
    pauseBtn.innerHTML = pauseBtn.innerHTML.replace('fas', 'far').replace('Pause', 'Resume');
  }
  pauseBtn.setAttribute('data-is-paused', !isPaused);
}

const setGameTimeouts = (gameArr) => {
  gameArr.forEach(({ item, nr }) => {
    timeouts.push(
      setTimeout(() => {
        gameContent.innerHTML = isNaN(item) ? `${item} <small>(${nr})</small>` : item;
        gameContent.setAttribute('data-index', nr || item);
        result.innerHTML += `<span>${item}</span>`;
        bannerContent.innerHTML += `<span>${item}</span>`;
        const index = nr || item;
        fizzBuzz.length === index+1 && setTimeout(() => clearInterval(bannerInterval), 10000);
      }, timer)
    );
    timer += timerIncrement;
  });
}

const startGame = () => {
  toggleShowButtons();
  setGameTimeouts(fizzBuzz);
  startBannerInterval();
}

const toggleResults = () => {
  const showResults = resultsBtn.getAttribute('data-toggle') === 'on';
  resultsBtn.innerText = showResults ? 'Show all results' : 'Hide all results';
  resultsBtn.setAttribute('data-toggle', showResults ? 'off' : 'on');
  showResults ? result.classList.add('hidden') : result.classList.remove('hidden');
}

const toggleShowButtons = () => {
  allBtns.forEach(btn =>
    btn.className.includes('hidden') ? btn.classList.remove('hidden') : btn.classList.add('hidden'));
}

playBtn.onclick = startGame;
pauseBtn.onclick = togglePauseGame;
resetBtn.onclick = resetGame;
resultsBtn.onclick = toggleResults;
