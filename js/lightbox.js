function is_youtubelink(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
}

function is_imagelink(url) {
    var p = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
    return (url.match(p)) ? true : false;
}

class Gallery {
    constructor(doc, elements, current) {
        this.doc = doc;
        this.current = current;
        this.galleryElements = elements;
    }

    close() {
        this.current = -1;
        document.getElementById('lightbox').innerHTML = '';
        document.getElementById('lightbox').style.display = 'none';
    }

    prev() {
        const prevIndex = (this.current - 1 + this.galleryElements.length) % this.galleryElements.length;
        this.current = prevIndex;
        this.galleryElements[prevIndex].click();
    }

    next() {
        const nextIndex = (this.current + 1) % this.galleryElements.length;
        this.current = nextIndex;
        this.galleryElements[nextIndex].click();
    }
}

const getGal = () => {
    return new Gallery(
        this,
        document.querySelectorAll('a.gallery'),
        getCurrentKey());
}

function setGallery(el) {
    var elements = document.body.querySelectorAll(".gallery");
    elements.forEach(element => {
        element.classList.remove('gallery');
    });
    if (el.closest('ul, p')) {
        var link_elements = el.closest('ul, p').querySelectorAll("a[class*='lightbox-']");
        link_elements.forEach(link_element => {
            if (el.getAttribute('href') == link_element.getAttribute('href')) {
                link_element.classList.add('current');
            } else {
                link_element.classList.remove('current');
            }
        });
        if (link_elements.length > 1) {
            document.getElementById('lightbox').classList.add('gallery');
            link_elements.forEach(link_element => {
                link_element.classList.add('gallery');
            });
        }

        const gal = getGal();
        document.getElementById('prev').addEventListener("click", () => gal.prev())
        document.getElementById('next').addEventListener("click", () => gal.next());
    }
}

function getCurrentKey() {
    var currentkey = -1;
    var gallery_elements = document.querySelectorAll('a.gallery');
    Object.keys(gallery_elements).forEach(function (k) {
        if (gallery_elements[k].classList.contains('current')) currentkey = k;
    });
    return parseInt(currentkey);
}

document.addEventListener("DOMContentLoaded", function () {
    //create lightbox div in the footer
    var newdiv = document.createElement("div");
    newdiv.setAttribute('id', "lightbox");
    document.body.appendChild(newdiv);

    gal = new Gallery(
        this,
        document.querySelectorAll('a.gallery'),
        getCurrentKey());

    //add classes to links to be able to initiate lightboxes
    document.querySelectorAll('a').forEach(element => {
        var url = element.getAttribute('href');
        if (url) {
            if (is_youtubelink(url) && !element.classList.contains('no-lightbox')) {
                element.classList.add('lightbox-youtube');
                element.setAttribute('data-id', is_youtubelink(url));
            }
            if (is_imagelink(url) && !element.classList.contains('no-lightbox')) {
                element.classList.add('lightbox-image');
                var href = element.getAttribute('href');
                var filename = href.split('/').pop();
                var split = filename.split(".");
                var name = split[0];
                element.setAttribute('title', name);
            }
        }
    });

    document.addEventListener('keydown', function (event) {
        const gal = getGal();
        if (gal.current == -1) {
            return;
        }

        switch (event.key) {
            case 'ArrowLeft': gal.prev(); break;
            case 'ArrowRight': gal.next(); break;
            case 'Escape': gal.close(); break;
        }
    });

    //remove the clicked lightbox
    document.getElementById('lightbox').addEventListener("click", function (event) {
        if (event.target.id != 'next' && event.target.id != 'prev') {
            this.innerHTML = '';
            document.getElementById('lightbox').style.display = 'none';
        }
    });

    //add the youtube lightbox on click
    var elements = document.querySelectorAll('a.lightbox-youtube');
    elements.forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById('lightbox').innerHTML = `
            <a id="close"></a>
            <a id="next">&rsaquo;</a>
            <a id="prev">&lsaquo;</a>
            <div class="videoWrapperContainer">
                <div class="videoWrapper">
                    <iframe src="https://www.youtube.com/embed/${this.getAttribute('data-id')}?autoplay=1&showinfo=0&rel=0" />
                </div>
            </div>`;
            document.getElementById('lightbox').style.display = 'block';

            setGallery(this);
        });
    });

    //add the image lightbox on click
    var elements = document.querySelectorAll('a.lightbox-image');
    elements.forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById('lightbox').innerHTML = `
            <a id="close"></a>
            <a id="next">&rsaquo;</a>
            <a id="prev">&lsaquo;</a>
            <div class="img" 
                 style="background: url('${this.getAttribute('href')}') center center / contain no-repeat;"
                 title="${this.getAttribute('title')}">
                <img src="${this.getAttribute('href')}"
                     alt="${this.getAttribute('title')}"/>
            </div>
            <span>${this.getAttribute('title')}</span>`

            document.getElementById('lightbox').style.display = 'block';
            setGallery(this);
        });
    });

});