"use strict";

class GalleryAlbums {
    queryLink = null;
    albumPageLink = null;
    albumList = null;

    constructor(selector) {
        this.albumList = document.getElementById(selector);
        this.queryLink = "https://jsonplaceholder.typicode.com/albums";
        this.albumPageLink = "pages/album.html?id=";
        this.getAlbums();
    }

    async getAlbums() {
        try {
            const albumsResponse = await fetch(this.queryLink);
            const albums = await albumsResponse.json();
            this.renderAlbums(albums);
        } catch (error) {
            console.error("Error fetching albums:", error);
        }
    }

    renderAlbums(albums) {
        albums.forEach((album) => {
            const albumItem = document.createElement("li");
            albumItem.classList.add(
                "list-group-item",
                "cursor-pointer",
                "btn",
                "btn-primary"
            );
            albumItem.textContent = album.title;
            this.eventHandler(albumItem, album);
            this.albumList.appendChild(albumItem);
        });
    }

    eventHandler(albumitem, album) {
        albumitem.addEventListener("click", () => {
            window.location.href = `pages/album.html?id=${album.id}`;
        });
    }
}

new GalleryAlbums("albumList"); 
