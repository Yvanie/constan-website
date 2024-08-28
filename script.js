$(function(){
    $(".toggle").on("click", function(){
        if($(".menu").hasClass("active")){
            $(".menu").removeClass("active");
            $(this).find("a").html("<ion-icon name='menu-outline'></ion-icon>");
        } else{
            $(".menu").addClass("active");
            $(this).find("a").html("<ion-icon name='close-outline'></ion-icon>");
        }
    })
})

// catalog
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.category');
  
    // Function to handle filter button click
    function handleFilterClick(event) {
      const selectedCategory = event.target.getAttribute('data-category');
  
      // Remove 'active' class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
      });
  
      // Add 'active' class to the clicked button
      event.target.classList.add('active');
  
      // Filter categories based on selected category
      categories.forEach(category => {
        const categoryData = category.getAttribute('data-category');
  
        if (selectedCategory === 'all' || categoryData === selectedCategory) {
          category.style.display = 'block'; // Show category
        } else {
          category.style.display = 'none'; // Hide category
        }
      });
    }
  
    // Add click event listeners to filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', handleFilterClick);
    });
  
    // Initial active state based on URL hash or default 'all'
    const hash = window.location.hash.substring(1);
    const initialButton = document.querySelector(`.filter-btn[data-category="${hash}"]`);
    if (initialButton) {
      initialButton.click(); // Simulate a click to activate the initial button
    } else {
      // If no hash or invalid hash, activate the 'all' button
      const allButton = document.querySelector('.filter-btn[data-category="all"]');
      if (allButton) {
        allButton.click(); // Simulate a click on 'all' button
      }
    }
  });


  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 4, // Number of slides to show at once
    spaceBetween: 20, // Space between slides
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop: true, // Enable infinite loop mode
    autoplay: {
        delay: 3000, // Delay between slides (in milliseconds)
        disableOnInteraction: false, // Continue autoplay after user interactions
    },
    speed: 600, // Transition speed (in milliseconds)
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
        1440: {
            slidesPerView: 5, // Display 5 slides per view on larger screens
        },
    },
});

document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    let itemsToShow = 4; // Default number of items to show

    function updateItemsToShow() {
        if (window.innerWidth <= 576) {
            itemsToShow = 1;
        } else if (window.innerWidth <= 768) {
            itemsToShow = 2;
        } else if (window.innerWidth <= 992) {
            itemsToShow = 3;
        } else {
            itemsToShow = 4;
        }
    }

    updateItemsToShow(); // Initial call

    window.addEventListener('resize', () => {
        updateItemsToShow();
        updateCarousel(); // Adjust carousel position on resize
    });

    const itemWidth = 100 / itemsToShow; // Percentage width of each item
    const totalItems = items.length;
    let currentIndex = 0;

    // Duplicate items for infinite scroll
    const itemsClone = Array.from(items).map(item => item.cloneNode(true));
    itemsClone.forEach(item => carouselInner.appendChild(item));

    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    }

    function showNext() {
        if (currentIndex >= totalItems) {
            carouselInner.style.transition = 'none';
            carouselInner.style.transform = `translateX(0%)`;
            currentIndex = 0;
            carouselInner.offsetHeight; // Trigger a reflow
            carouselInner.style.transition = 'transform 0.5s ease-in-out';
        }
        currentIndex++;
        if (currentIndex >= totalItems + itemsToShow - 1) {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function showPrev() {
        if (currentIndex <= 0) {
            carouselInner.style.transition = 'none';
            carouselInner.style.transform = `translateX(-${(totalItems - itemsToShow) * itemWidth}%)`;
            currentIndex = totalItems;
            carouselInner.offsetHeight; // Trigger a reflow
            carouselInner.style.transition = 'transform 0.5s ease-in-out';
        }
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalItems - itemsToShow;
        }
        updateCarousel();
    }

    nextButton.addEventListener('click', showNext);
    prevButton.addEventListener('click', showPrev);

    setInterval(showNext, 5000);
});
document.addEventListener('DOMContentLoaded', function() {
    const scrollTopButton = document.getElementById('scroll-top');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) { // Show button when scrolled more than 200px
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    // Scroll to top when button is clicked
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

 // about page
 document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const slideCount = slides.length;
    const slidesToShow = 3; // Number of slides to show at once
    let index = 0;

    function showSlide() {
        const offset = -index * (100 / slidesToShow);
        slides.forEach(slide => {
            slide.style.transform = `translateX(${offset}%)`;
        });
    }

    function nextSlide() {
        index = (index + 1) % (slideCount - slidesToShow + 1);
        showSlide();
    }

    setInterval(nextSlide, 5000); // Change slide every 5 seconds
    showSlide(); // Initialize display
});

//article page
document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 8;
    let currentPage = 1;
    let currentCategory = 'all';

    const renderArticles = (category = 'all', page = 1) => {
        const articles = document.querySelectorAll('.article-item');
        articles.forEach(article => {
            article.style.display = (category === 'all' || article.getAttribute('data-category') === category) ? 'block' : 'none';
        });

        const filteredArticles = [...articles].filter(article => category === 'all' || article.getAttribute('data-category') === category);
        const paginatedArticles = filteredArticles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        articles.forEach(article => article.style.display = 'none'); // Hide all articles
        paginatedArticles.forEach(article => article.style.display = 'block'); // Show only paginated articles

        document.querySelector('.current-page').textContent = page;
        document.querySelector('.total-pages').textContent = Math.ceil(filteredArticles.length / itemsPerPage);
    };

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentCategory = button.getAttribute('data-category');
            currentPage = 1;
            renderArticles(currentCategory, currentPage);
        });
    });

    document.querySelector('.pagination-btn.next').addEventListener('click', () => {
        if (currentPage < document.querySelector('.total-pages').textContent) {
            currentPage++;
            renderArticles(currentCategory, currentPage);
        }
    });

    document.querySelector('.pagination-btn.prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderArticles(currentCategory, currentPage);
        }
    });

    // Add event listener for contact buttons
    document.querySelectorAll('.contact-btn').forEach(button => {
        button.addEventListener('click', () => {
            const articleName = button.getAttribute('data-article');
            const imageUrl = button.getAttribute('data-image');
            const message = `Hello, I am interested in the article "${articleName}". Please provide more details. Image: ${imageUrl}`;
            const phoneNumber = '+237694526505'; // Replace with your WhatsApp number
            const whatsappUrl = `https://wa.me/${+237694526505}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Initial render
    renderArticles();
});
 