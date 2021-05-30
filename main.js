const newsEl = document.getElementById('renderedNews');
const API_KEY = 'dc6c6ddd56b343848f7117580b3e91e1';
const url = `http://newsapi.org/v2/everything?q=Apple&from=2021-05-20&sortBy=popularity&apiKey=${API_KEY}`;


$(document).ready(function() {
    $('#list').click(function(event){event.preventDefault();$('.item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('.item').removeClass('list-group-item');});
});


// const list = document.getElementById('list');
// const grid = document.getElementById('grid');
// const item = document.getElementsByClassName('item');

// list.addEventListener('click', function (e) {
//     e.preventDefault()
//     item.classList.add('list-group-item')
// })

// grid.addEventListener('click', function (e) {
//     e.preventDefault()
//     item.classList.remove('list-group-item')
// })


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

// Get Data
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    console.log(data)
    let articles = data.articles;

  return articles.map(function(article) {
    let allNewsEl = createNode('div');
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
                <h6>Author: ${article.author}</h6>
                <p  style="color: red;">Published on: ${date.substring(0, 10)}</p>
                <p class="card-text">${desc.substring(0, 100)}...</p>
                <a href="${article.url}" class="btn btn-info">Read More</a>
            </div>
        </div>
    `

    append(newsEl, allNewsEl)
  })
})
.catch(function(error) {
  console.log(error);
});  