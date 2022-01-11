const EndPoint = 'https://api.github.com/users/';

const SearchUser = document.querySelector('.search-profile__input')
const content = document.querySelector('.search-profile__content')
const parent = document.querySelector('.search-profile')
const parentContainer = document.querySelector('.container')


let arrName = []
let urlRepo = []


console.log(parentContainer)

async function getRespons(url) {

  const respons = await fetch(url)

  if (!respons.ok) {

   return content.insertAdjacentHTML('afterbegin', 
    `
      <div class="search-profile__no-profile">
            <span class="search-profile__title">Нет профиля с таким именем пользователя</span>
      </div>
    `)
    // return new Error(`Ошибка по адресу ${url}, ошибка ${respons}`)
  } 



  return await respons.json()
}


SearchUser.addEventListener('keyup', (event) => {

  let JsonData = ''

  if(event.keyCode === 13) {
      let data = SearchUser.value.trim()

      if (data !== "") {
        // (EndPoint + data + '/repos?sort=created')

            getRespons(EndPoint + data)
              .then((user) => {

                JsonData = user

                    return getObjectData(JsonData)

              })
            SearchUser.value = ''

            if(document.querySelector('.search-profile__wrapper')) {
              document.querySelector('.search-profile__wrapper').remove()
            }

            if(document.querySelector('.search-profile__no-profile')) {
              document.querySelector('.search-profile__no-profile').remove()
            }


      }

  } 


})



function getObjectData(user) {

  let UserRepo = user
  getRespons(UserRepo.repos_url + '?sort=created')
            .then((n) => {
              // arrName = n
               return InsertReposData(n, user)
            })

}



function InsertReposData(repos, user) { 
  console.log(user) 
  let arr = [] 
  repos.forEach((rep, ind, a) => { 

    if(ind <= 4) {
      arrName.push(a[ind].name) 
      urlRepo.push(a[ind].html_url)
    }
  
  }) 


  content.insertAdjacentHTML('afterbegin', `
        <div class="search-profile__wrapper">
        <div class="search-profile__border-img">
          <img class="search-profile__img" src="${user.avatar_url}" alt="">
        </div>
        <div class="search-profile__info">
          <span class="search-profile__name">${user.name}</span>
          <span class="search-profile__current-company">Company: ${user.company}</span>
          <p class="search-profile__bio">${user.bio}</p>
          <div class="search-profile__data-info">
            <div class="search-profile__followers">${user.followers} <span>Followers</span></div>
            <div class="search-profile__following">${user.following} <span>Following</span></div>
            <div class="search-profile__repos">${user.public_repos} <span>Repos</span></div>
          </div>
          <ul class="search-profile__skils">
            <li class="search-profile__skil">
              <a class="search-profile__link" href="${urlRepo[0]}">${arrName[0]}</a>
            </li>
            <li class="search-profile__skil">
                <a class="search-profile__link" href="${urlRepo[0]}">${arrName[1]}</a>
            </li>
            <li class="search-profile__skil">
                <a class="search-profile__link" href="${urlRepo[0]}">${arrName[2]}</a>
            </li>
            <li class="search-profile__skil">
                <a class="search-profile__link" href="${urlRepo[0]}">${arrName[3]}</a>
            </li>
          </ul>
        </div>
        </div>
  `)

} 


