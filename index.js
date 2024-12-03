
async function getNews(category) {
  let apiKey = `79049847d1d645cca19b1ee65897375d`
  let countryCode = `us`
  let url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=${apiKey}`
  const response = await fetch(url)
  const data = await response.json()
  return data.articles
}

function displayArticles(articles) {
  console.log(articles)
  const articleWrapper = document.querySelector(".articles-wrapper")
  articleWrapper.innerHTML = ``
  for (let i = 0; i < articles.length;i++){
    if(articles[i].urlToImage != null) {
      articleWrapper.innerHTML += `
      <div class="article">
        <img src="${articles[i].urlToImage}" alt="">
        <h4>${articles[i].title}</h4>
        <h6>${articles[i].publishedAt}</h6>
        <p>${articles[i].description}</p>
        <a href="${articles[i].url}" target="_blank" class="btn">Read More</a>
      </div>
      `
    }
  }

}

window.addEventListener("DOMContentLoaded", async () => {
  console.log("everything is running from here")
  const newsData = await getNews("general")
  console.log(newsData)

  displayArticles(newsData)
  const category = document.querySelector("#category")
  category.addEventListener("change", async () => {
    const articlistic = await getNews(category.value)
    displayArticles(articlistic)
  })
})