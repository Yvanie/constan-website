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


  document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 4, // Show 4 slides per view
        spaceBetween: 20, // Space between slides
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
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