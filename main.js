const newsEl = document.getElementById('renderedNews');
const API_KEY = 'dc6c6ddd56b343848f7117580b3e91e1';
const url = `http://newsapi.org/v2/everything?q=Apple&from=2021-05-20&sortBy=popularity&apiKey=${API_KEY}`;

const toggleBtn = document.getElementById('toggle');
const searchEl = document.getElementById('search');

getNews()

async function getNews() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  let articles = data.articles;
  displayNews(articles)
}

const displayNews = (articles) => {
  newsEl.innerHTML = '';
  return articles.forEach(article => {
    const allNewsEl = document.createElement('div');
    allNewsEl.classList.add('item')
    allNewsEl.classList.add('col-xs-4')
    allNewsEl.classList.add('col-lg-4')
    allNewsEl.classList.add('mb-3')

    let date = article.publishedAt;
    let desc = article.description;
    
    allNewsEl.innerHTML = `
        <div class="card" style="background-color: #f3f3f3; cursor: pointer;">
            <img src=${article.urlToImage} class="card-img-top img-card" style="height: 12rem;" alt="image">
            <div class="card-body">
                <h5 class="card-title"><small>Source: </small>${article.source.name}</h5>
                <h6 class="authName">Author: ${article.author}</h6>
                <p  style="color: red;">Published on: ${date.substring(0, 10)}</p>
                <p class="card-text">${desc.substring(0, 100)}...</p>
                <a href="${article.url}" class="btn btn-info">Read More</a>
            </div>
        </div>
    `
    newsEl.appendChild(allNewsEl)
  })
}

$(document).ready(function() {
  $('#list').click(function(event){event.preventDefault();$('.item').addClass('list-group-item');});
  $('#grid').click(function(event){event.preventDefault();$('.item').removeClass('list-group-item');});
});

toggleBtn.addEventListener('click', ()=> {
  document.body.classList.toggle('dark')
})
searchEl.addEventListener('input', (e)=> {
  const {value} = e.target;
  const authName = document.querySelectorAll('.authName');

  authName.forEach(author => {
    if(author.innerText.toLowerCase().includes(value.toLowerCase())){
      author.parentElement.parentElement.parentElement.style.display = 'block';
    } else {
      author.parentElement.parentElement.parentElement.style.display = 'none';
    }
  })
})