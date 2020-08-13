class Movie {
    constructor(mountPoint, dataObject, orderNumber) {
        this.mountPoint = mountPoint;
        this.dataObject = dataObject;
        this.orderNumber = orderNumber;
        this.currentMovie = this.dataObject[this.orderNumber]
    }
    init() {
        this.render();
    };
    render(mountPoint) {
        const generalMovieElement = document.createElement('div');
        generalMovieElement.classList.add('wrapper-grid__item');

        const imageContainerEl = document.createElement('div');
        imageContainerEl.classList.add('image-container');
        generalMovieElement.appendChild(imageContainerEl);

        const imageEl = document.createElement('img');
        imageEl.classList.add('image-container__image');
        imageEl.setAttribute('src', this.currentMovie.preview.high);
        imageEl.setAttribute('alt', "movie image");
        imageEl.setAttribute('title', this.currentMovie.description);
        imageContainerEl.appendChild(imageEl);

        const descriptionContainerEl = document.createElement('div');
        descriptionContainerEl.classList.add('description-container');
        generalMovieElement.appendChild(descriptionContainerEl);

        const nameGenresEl = document.createElement('div');
        nameGenresEl.classList.add('description-container__name-genres-container');
        descriptionContainerEl.appendChild(nameGenresEl);

        const movieNameEl = document.createElement('div');
        movieNameEl.classList.add('description-container__name');
        movieNameEl.innerHTML = this.currentMovie.title;
        movieNameEl.setAttribute('title', this.currentMovie.title);
        nameGenresEl.appendChild(movieNameEl);

        const movieGenreEl = document.createElement('div');
        movieGenreEl.classList.add('description-container__genres');
        movieGenreEl.innerHTML = this.currentMovie.genre;
        movieGenreEl.setAttribute('title', this.currentMovie.genre);
        nameGenresEl.appendChild(movieGenreEl);

        const ratingEl = document.createElement('p');
        ratingEl.classList.add('description-container__stars');
        ratingEl.innerHTML = this.currentMovie.rating;
        ratingEl.setAttribute('title', 'Rating of the movie');
        descriptionContainerEl.appendChild(ratingEl);

        mountPoint.appendChild(generalMovieElement);
    }
};

class MoviesCatalogue {
    constructor(mountPointName, dataObject) {
        this.mountPointName = mountPointName;
        this.dataObject = dataObject;
    }
    init() {
        this.render();
    };
    render() {
        const wrapperGrid = document.createElement('div');
        wrapperGrid.classList.add('wrapper-grid');
        const mountPoint = document.getElementById(this.mountPointName);
        mountPoint.appendChild(wrapperGrid);

        for (let j = 0; j < 8; j ++) {
            for (let i = 0; i < 3; i ++) {
                let newMovie = new Movie(mountPoint, this.dataObject, i);
                newMovie.render(wrapperGrid);
            }    
        }
    }
};

const init = () => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://my-json-server.typicode.com/ilyalytvynov/ads-box-server/movies"
  );
  let resp = {};
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) {
      resp = JSON.parse(xhr.response);
      const currentCatalogueOfMovies = new MoviesCatalogue("root", resp);
      currentCatalogueOfMovies.render();
    }
  };
};

init();