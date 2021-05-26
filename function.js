//Gnews Api token "a42bee96982e0b4f7dc8c40bfc12d2b9"
const GNEWS_ACCES_KEY = "a42bee96982e0b4f7dc8c40bfc12d2b9";

//search language and default search term
var searchKeyword = "google"; 

var newsAPI_Url = `https://gnews.io/api/v4/search?q=${searchKeyword}&token=${GNEWS_ACCES_KEY}`;



const Search = async() => {
    searchKeyword = document.getElementById("searchTerm").value;
    newsAPI_Url = `https://gnews.io/api/v4/search?q=${searchKeyword}&token=${GNEWS_ACCES_KEY}`;
    ViewNews();
}

//  get news
const GetNews = async () => {
    const news = await fetch(newsAPI_Url);
    
    if (!news.ok) {
        alert(news.status); //show alert when responce !ok
    }

    const jsonResponse = await news.json();
    return jsonResponse.articles;
};

// Render news
const ViewNews = async () => {
    let contentmsg = '';
    let news = null;

    try {
        news = await GetNews();
    } catch (ex) {
        alert("Error occured");
        
    }

    if (!news || Array.isArray(news) && !news.length) {
        alert("Sorry...No News Found ")
        
    } else {
        let newsTemplate = 
        `<article>
            <img src='{{URL_TO_IMAGE}}' alt='{{TITLE}}' class="news-image" >
            <h4 style="text-align: center;">{{SOURCE}}</h4>
            <p>{{DESCRIPTION}}</p>
            <div class="news-info">
            <a href="#news-modal-{{ID}}">{{TITLE}}</a>
            <a href="{{URL}}" target="_blank">Read more...</a>
        </article>`;
       

        for (var i = 0; i < news.length; i++) {
            const currentNews = news[i];
            let content = newsTemplate.replace(/{{ID}}/g, i)
                .replace(/{{URL_TO_IMAGE}}/g, currentNews.image)
                .replace(/{{TITLE}}/g, currentNews.title)
                .replace(/{{SOURCE}}/g, currentNews.source.name)
                .replace(/{{CONTENT}}/g, currentNews.content)
                .replace(/{{DESCRIPTION}}/g, currentNews.description)
                .replace(/{{URL}}/g, currentNews.url);
            contentmsg += content;
        };
    }
    document.getElementsByClassName('news-grid')[0].innerHTML = contentmsg;
};

ViewNews();//Load news automatically


