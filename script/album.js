"use strict";

class AlbumPhotos {
    queryLink = null;
    albumId = null;
    photosContainer = null;
    albumTitle = null;

    constructor (selector) {
        this.queryLink = "https://jsonplaceholder.typicode.com/photos?albumId=";
        this.albumId = new URLSearchParams(window.location.search).get("id");
        this.photosContainer = document.getElementById(selector);
        this.albumTitle = document.getElementById("albumTitle");

        this.getAlbumPhotos();
    }

    async getAlbumPhotos() {        
        this.albumTitle.innerHTML = `Album #${this.albumId} Photos`;
        
        try {
            const photosResponse = await fetch(this.queryLink + `${this.albumId}`);
            const photos = await photosResponse.json();
            this.renderPhotos (photos);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    renderPhotos = (photos) => {
        photos.forEach((photo) => {
            const photoContainer = document.createElement("div");
            photoContainer.classList.add("col-md-3", "mb-4");
            photosContainer.appendChild(photoContainer);

            const photoElement = document.createElement("img");
            photoElement.src = photo.url;
            photoElement.alt = photo.title;
            photoElement.classList.add("w-100", "h-auto", "rounded");
            photoContainer.appendChild(photoElement);
        });
    }

}

new AlbumPhotos("photosContainer");