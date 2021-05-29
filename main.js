const newsEl = document.getElementById('renderedNews');
const API_KEY = 'dc6c6ddd56b343848f7117580b3e91e1';
const url = `http://newsapi.org/v2/everything?q=Apple&from=2021-05-20&sortBy=popularity&apiKey=${API_KEY}`;


$(document).ready(function() {
    $('#list').click(function(event){event.preventDefault();$('.item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('.item').removeClass('list-group-item');$('#renderedNews .item').addClass('grid-group-item');});
});

// const list = document.getElementById('list')
// const grid = document.getElementById('grid')
// const item = document.getElementsByClassName('item')

// list.addEventListener('click', function (e) {
//     e.preventDefault()
//     // item.classList.add('list-group-item')
//     console.log(e)
// })

// grid.addEventListener('click', function (e) {
//     e.preventDefault()
//     item.className += 'list-group-item' && item.addClass('grid-group-item')
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
    //   newsEl.classList.add('row view-group')
    let allNewsEl = createNode('div');
    allNewsEl.classList.add('item')
    allNewsEl.classList.add('col-lg-4')
    allNewsEl.classList.add('col-xs-4')
    allNewsEl.classList.add('mb-3')

    date = article.publishedAt
    console.log(date)

    // date.array.forEach(element => {
    //     console.log('hi')
    // });
    

    allNewsEl.innerHTML = `
    <div class="thumbnail card" style="background-color: #f3f3f3;">
        <div class="img-event">
            <img class="group list-group-image img-fluid" src=${article.urlToImage} alt="image" />
        </div>
        <div class="caption card-body">
            <h4 class="group card-title inner list-group-item-heading">
            ${article.title}</h4>
            <p class="lead">Author: ${article.author}</p>
            <p class="group inner list-group-item-text">${article.description}</p>
            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <p class="lead">
                        Source: ${article.source.name}</p>
                        
                </div>
                <div class="col-xs-12 col-md-6">
                    <a class="btn btn-primary" href="${article.url}">Read More</a>
                </div>
            </div>
        </div>
    </div>
    `


    append(newsEl, allNewsEl)
  })
})
.catch(function(error) {
  console.log(error);
});  