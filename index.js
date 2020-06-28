let timer = 0;
let bannerPosition = 0;
let timerIncrement = 700;
let resultsBtnEnabled = false;
const timeouts = [];

const playBtn = document.querySelector('.btn.play');
const resultsBtn = document.querySelector('.btn.result-toggle');
const gameContent = document.querySelector('.game-content');
const result = document.querySelector('.result');
const bannerContent = document.querySelector('.banner-content');
const arr = [...Array(100)].map((_, i) => i + 1);
const fizzBuzz = arr.map(nr => {
  if (nr % 15 === 0) {
    return '<strong class="red">FizzBuzz</strong>';
  }
  if (nr % 5 === 0) {
    return '<strong class="green">Buzz</strong>';
  }
  if (nr % 3 === 0) {
    return '<strong class="blue">Fizz</strong>'
  }
  return nr;
});

const bannerInterval = setInterval(() => {
  if (bannerContent.getBoundingClientRect().width > 800) {
    if (!resultsBtnEnabled) {
      resultsBtn.classList.remove('hidden');
      resultsBtnEnabled = true;
    }
    bannerPosition--;
    bannerContent.style.left = `${bannerPosition}px`;
  }
}, 10);

const resetGame = () => {
  bannerContent.innerHTML = '';
  result.innerHTML = '';
  result.classList.add('hidden')
  resultsBtn.classList.add('hidden');
  resultsBtn.innerText = 'Show all results';
  resultsBtn.setAttribute('data-toggle', 'off');
  playBtn.innerText = 'Play';
  playBtn.onclick = startGame;
  gameContent.innerHTML = '';
  timer = 0;
  bannerPosition = 0;
  bannerContent.style.left = '';
  timeouts.forEach(timeOut => clearTimeout(timeOut));
}

const startGame = () => {
  playBtn.onclick = resetGame;
  playBtn.innerText = 'Reset';
  fizzBuzz.forEach((item, i) => {
    timeouts.push(
      setTimeout(() => {
        gameContent.innerHTML = isNaN(item) ? `${item} <small>(${i+1})</small>` : item;
        result.innerHTML += `<span>${item}</span>`;
        bannerContent.innerHTML += `<span>${item}</span>`;
        fizzBuzz.length === i+1 && setTimeout(() => clearInterval(bannerInterval), 10000);
      }, timer)
    );
    timer += timerIncrement;
  });
}

const toggleResults = () => {
  const showResults = resultsBtn.getAttribute('data-toggle') === 'on';
  resultsBtn.innerText = showResults ? 'Show all results' : 'Hide all results';
  resultsBtn.setAttribute('data-toggle', showResults ? 'off' : 'on');
  showResults ? result.classList.add('hidden') : result.classList.remove('hidden');
}

playBtn.onclick = startGame;
resultsBtn.onclick = toggleResults;
