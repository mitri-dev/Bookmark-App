// Elements
const form = document.querySelector('form');
const name = document.querySelector('.name');
const urlInput = document.querySelector('.url');
const output = document.querySelector('.output');
const list = document.querySelector('ul');
let answer = false;
let siteName;

// Local Storage
let sites = [];
if (localStorage.getItem('sites') === null) {
  sites = [];
} else {
  sites = JSON.parse(localStorage.getItem('sites'));
  sites.forEach(site => {
    output.innerHTML += `
    <li>
      <div class="bg">
        <h2>${site.name}</h2>
        <div class="buttons">
          <button><a href="${site.url}" target="_blank">✔</a></button>
          <button class="delete">X</button>
        </div>
      </div>
    </li>
    `;
  });
}

// Listeners
form.addEventListener('submit', addSite);
list.addEventListener('click', deleteSite);

// Functions
function addSite(e) {
  e.preventDefault();
  if (name.value === '' || urlInput.value === '') {
    return;
  }
  let url = urlInput.value.includes('https://') ? urlInput.value : `https://${urlInput.value}`;
  url = url.includes('.com') ? url : `${url}.com`;
  urlInput.value = url;
  output.innerHTML += `
  <li>
  <div class="bg">
    <h2>${name.value}</h2>
    <div class="buttons">
      <button><a href="${url}" target="_blank">✔</a></button>
      <button class="delete">X</button>
    </div>
  </div>
</li>
  `;
  sites.push({ name: name.value, url });
  localStorage.setItem('sites', JSON.stringify(sites));
  setTimeout(() => {
    name.value = '';
    urlInput.value = '';
  }, 500);
}

function deleteSite(e) {
  console.log(answer);
  if (answer === true || e.target.className === 'delete') {
    if (answer === false) {
      siteName = e.target.parentElement.parentElement.querySelector('h2');
      setAnswer();
    } else {
      sites.forEach((site, i) => {
        if (site.name.includes(siteName.innerHTML)) {
          sites.splice(i, 1);
          localStorage.setItem('sites', JSON.stringify(sites));
          answer = false;
          siteName.parentElement.parentElement.remove();
          return null;
        }
      });
    }
  }
}

function setAnswer() {
  const answerBox = document.createElement('div');
  answerBox.className = 'answerBg';
  answerBox.innerHTML = `
  <div class="answerBox">
    <h2>Are you sure?</h2>
      <div>
        <button class="yes">✔</button>
        <button class="no">X</button>
      </div>
  </div>
  `;
  document.querySelector('body').appendChild(answerBox);
  answerBox.querySelector('.yes').addEventListener('click', () => {
    answer = true;
    deleteSite();
    answerBox.remove();
  });
  answerBox.querySelector('.no').addEventListener('click', () => {
    answer = false;
    answerBox.remove();
  });
}

// Theme change
const moon = document.querySelector('.change-theme');
moon.addEventListener('click', () => {
  if (moon.innerHTML === '🌑') {
    document.querySelector('#style').setAttribute('href', 'style2.css');
    moon.innerHTML = '🌞';
  } else if (moon.innerHTML === '🌞') {
    document.querySelector('#style').setAttribute('href', 'style.css');
    moon.innerHTML = '🌑';
  }
});
