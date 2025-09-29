/*=== Javascript function indexing hear===========

1.counterUp ----------(Its use for counting number)
2.stickyHeader -------(header class sticky)
3.wowActive ----------( Waw js plugins activation)
4.swiperJs -----------(All swiper in this website hear)
5.salActive ----------(Sal animation for card and all text)
6.textChanger --------(Text flip for banner section)
7.timeLine -----------(History Time line)
8.datePicker ---------(On click date calender)
9.timePicker ---------(On click time picker)
10.timeLineStory -----(History page time line)
11.vedioActivation----(Vedio activation)
12.searchOption ------(search open)
13.cartBarshow -------(Cart sode bar)
14.sideMenu ----------(Open side menu for desktop)
15.Back to top -------(back to top)
16.filterPrice -------(Price filtering)

==================================================*/


(function ($) {
  'use strict';
  let device_width = window.innerWidth;
  var rtsJs = {
    m: function (e) {
      rtsJs.d();
      rtsJs.methods();
    },
    d: function (e) {
      this._window = $(window),
        this._document = $(document),
        this._body = $('body'),
        this._html = $('html')
    },
    methods: function (e) {
      rtsJs.rtlToggle();
      rtsJs.preloader();
      rtsJs.smoothScroll();
      rtsJs.countDown();
      rtsJs.metismenu();
      rtsJs.galleryPopUp();
      rtsJs.cartNumberIncDec();
      rtsJs.sideMenu();
      rtsJs.searchOption();
      rtsJs.vedioActivation();
      rtsJs.portfoliobounceAnimation();
      rtsJs.commonAnimation();
      rtsJs.imageSlideGsap();
      rtsJs.swiperActivation();
      rtsJs.odoMeter();
      rtsJs.splitText();
      rtsJs.backToTopInit();
      rtsJs.stickyHeader();
      rtsJs.galleryPopUpmag();
      rtsJs.gsapAnimationImageScale();
      rtsJs.radialProgress();
      rtsJs.benefitsToggle();
    },
    rtlToggle: function () {

      $(document).ready(function () {
        // Retrieve the saved direction from localStorage
        const savedDir = localStorage.getItem("pageDirection") || "ltr"; // Default to "ltr"
        $("body").attr("dir", savedDir);

        // Update button visibility based on saved direction
        if (savedDir === "rtl") {
          $(".rtl").removeClass("show");
          $(".ltr").addClass("show");
        } else {
          $(".rtl").addClass("show");
          $(".ltr").removeClass("show");
        }

        // Toggle direction and save state on button click
        $(".rtl-ltr-switcher-btn").on("click", function () {
          const currentDir = $("body").attr("dir");
          const newDir = currentDir === "rtl" ? "ltr" : "rtl";

          // Update body direction
          $("body").attr("dir", newDir);

          // Toggle button visibility
          $(".rtl").toggleClass("show");
          $(".ltr").toggleClass("show");

          // Save the new direction in localStorage
          localStorage.setItem("pageDirection", newDir);
        });
      });

    },
    preloader: function () {
      window.addEventListener('load', function () {
        document.querySelector('body').classList.add("loaded")
      });
    },
    smoothScroll: function (e) {
      $(document).on('click', '.onepage a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 300);
      });
    },

    countDown: function () {

      let countDown = document.getElementsByClassName('countdown');
      if (countDown.length) {
        document.addEventListener("DOMContentLoaded", function () {
          // Get the countdown element and the end date from its attribute
          const countdownElement = document.getElementById("countdown");
          const endDate = countdownElement.getAttribute("data-end-date");
          const endTime = new Date(endDate).getTime();

          if (isNaN(endTime)) {
            document.querySelector(".timer-section").innerHTML = "Invalid end date!";
            return;
          }

          // Get references to the time unit elements
          const daysElement = document.getElementById("days");
          const hoursElement = document.getElementById("hours");
          const minutesElement = document.getElementById("minutes");
          const secondsElement = document.getElementById("seconds");

          // Update the countdown every second
          const countdownInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeDifference = endTime - currentTime;

            // Calculate days, hours, minutes, and seconds
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Update the timer elements
            if (timeDifference > 0) {
              daysElement.textContent = days;
              hoursElement.textContent = hours;
              minutesElement.textContent = minutes;
              secondsElement.textContent = seconds;
            } else {
              // Clear the interval and display "Time's up" when countdown ends
              clearInterval(countdownInterval);
              document.querySelector(".timer-section").innerHTML = "Time's up!";
            }
          }, 1000);
        });
      }
    },


    metismenu: function () {
      $('#mobile-menu-active').metisMenu();
    },

    galleryPopUp: function (e) {
      // Gallery image hover
      $(".img-wrapper").hover(
        function () {
          $(this).find(".img-overlay").animate({ opacity: 1 }, 600);
        }, function () {
          $(this).find(".img-overlay").animate({ opacity: 0 }, 600);
        }
      );

      // Lightbox
      var $overlay = $('<div id="overlay"></div>');
      var $image = $("<img>");
      var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
      var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
      var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');

      // Add overlay
      $overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
      $("#gallery").append($overlay);

      // Hide overlay on default
      $overlay.hide();

      // When an image is clicked
      $(".img-overlay").click(function (event) {
        // Prevents default behavior
        event.preventDefault();
        // Adds href attribute to variable
        var imageLocation = $(this).prev().attr("href");
        // Add the image src to $image
        $image.attr("src", imageLocation);
        // Fade in the overlay
        $overlay.fadeIn("slow");
      });

      // When the overlay is clicked
      $overlay.click(function () {
        // Fade out the overlay
        $(this).fadeOut("slow");
      });

      // When next button is clicked
      $nextButton.click(function (event) {
        // Hide the current image
        $("#overlay img").hide();
        // Overlay image location
        var $currentImgSrc = $("#overlay img").attr("src");
        // Image with matching location of the overlay image
        var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
        // Finds the next image
        var $nextImg = $($currentImg.closest(".image").next().find("img"));
        // All of the images in the gallery
        var $images = $("#image-gallery img");
        // If there is a next image
        if ($nextImg.length > 0) {
          // Fade in the next image
          $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
        } else {
          // Otherwise fade in the first image
          $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
        }
        // Prevents overlay from being hidden
        event.stopPropagation();
      });

      // When previous button is clicked
      $prevButton.click(function (event) {
        // Hide the current image
        $("#overlay img").hide();
        // Overlay image location
        var $currentImgSrc = $("#overlay img").attr("src");
        // Image with matching location of the overlay image
        var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
        // Finds the next image
        var $nextImg = $($currentImg.closest(".image").prev().find("img"));
        // Fade in the next image
        $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
        // Prevents overlay from being hidden
        event.stopPropagation();
      });

      // When the exit button is clicked
      $exitButton.click(function () {
        // Fade out the overlay
        $("#overlay").fadeOut("slow");
      });
    },
    cartNumberIncDec: function () {
      $(document).ready(function () {

        $(function () {
          $(".button").on("click", function () {
            var $button = $(this);
            var $parent = $button.parent();
            var oldValue = $parent.find('.input').val();

            if ($button.text() == "+") {
              var newVal = parseFloat(oldValue) + 1;
            } else {
              // Don't allow decrementing below zero
              if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
              } else {
                newVal = 1;
              }
            }
            $parent.find('a.add-to-cart').attr('data-quantity', newVal);
            $parent.find('.input').val(newVal);
          });
        });
      });
      /* magnificPopup img view */

    },

    sideMenu: function () {

      // collups menu side right
      $(document).on('click', '.menu-btn', function () {
        $("#side-bar").addClass("show");
        $("#anywhere-home").addClass("bgshow");
      });
      $(document).on('click', '.close-icon-menu', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on('click', '#anywhere-home', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on('click', '.onepage .mainmenu li a', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
    },
    searchOption: function () {
      $(document).on('click', '.search', function () {
        $(".search-input-area").addClass("show");
        $("#anywhere-home").addClass("bgshow");
      });
      $(document).on('click', '#close', function () {
        $(".search-input-area").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on('click', '#anywhere-home', function () {
        $(".search-input-area").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });

    },
    vedioActivation: function () {
      $(document).ready(function () {
        $('.popup-youtube, .popup-video').magnificPopup({
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      });
    },
    portfoliobounceAnimation: function () {
      if (device_width > 991) {
        gsap.set(".rts_jump_animation-wrapper .rts-jump__item", { opacity: 0, scale: 1.15, rotation: 0 })
        gsap.to(".rts_jump_animation-wrapper .rts-jump__item", {
          scrollTrigger: {
            trigger: ".rts_jump_animation-wrapper .rts-jump__item",
            start: "top 95%"
          },
          opacity: 1.3,
          scale: 1,
          duration: 1,
          ease: "bounce",
          stagger: 0.3,
          rotation: 0
        })
      }
      if (device_width > 991) {
        gsap.set(".rts-jump__item-2", { opacity: 0, scale: 1.15, rotation: 0 })
        gsap.to(".rts-jump__item-2", {
          scrollTrigger: {
            trigger: ".rts-jump__item-2",
            start: "top center+=200"
          },
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "bounce",
          stagger: 0.9,
          rotation: 0
        })
      }
    },
    commonAnimation: function () {
      gsap.registerPlugin(ScrollTrigger);

      document.querySelectorAll("[data-animation]").forEach((element) => {
        let animationType = element.getAttribute("data-animation");
        let delay = parseFloat(element.getAttribute("data-delay")) || 0; // Default 0s
        let duration = parseFloat(element.getAttribute("data-duration")) || 1; // Default 1s

        if (animationType === "fadeInUp") {
          gsap.fromTo(element,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0,
              duration: duration,
              ease: "power3.out",
              delay: delay,
              scrollTrigger: {
                trigger: element,
                start: "top 95%",
                once: false
              }
            }
          );
        }
        else if (animationType === "fadeInRight") {
          gsap.fromTo(element,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: duration, ease: "power3.out", delay: delay, scrollTrigger: { trigger: element, start: "top 95%", once: false } }
          );
        }
        else if (animationType === "fadeInLeft") {
          gsap.fromTo(element,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: duration, ease: "power3.out", delay: delay, scrollTrigger: { trigger: element, start: "top 95%", once: false } }
          );
        }
        else if (animationType === "fadeInDown") {
          gsap.fromTo(element,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: duration, ease: "power3.out", delay: delay, scrollTrigger: { trigger: element, start: "top 95%", once: false } }
          );
        }
        else if (animationType === "zoomIn") {
          gsap.fromTo(element,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: duration, ease: "power3.out", delay: delay, scrollTrigger: { trigger: element, start: "top 95%", once: false } }
          );
        }
        else if (animationType === "zoomOut") {
          gsap.fromTo(element,
            { opacity: 0, scale: 1.5 },
            {
              opacity: 1, scale: 1, duration: duration, ease: "power3.out", delay: delay, scrollTrigger:
              {
                trigger: element,
                start: "top 95%",
                once: false
              }
            }
          );
        }
      });
    },
    benefitsToggle: function () {
      // Toggle active/inactive on click for .benefits-n_item with keyboard support.
      try {
        var items = document.querySelectorAll('.benefits-n_item');
        if (!items || items.length === 0) return;

        // Ensure items are focusable for keyboard interaction
        items.forEach(function (it) {
          if (!it.hasAttribute('tabindex')) it.setAttribute('tabindex', '0');
        });

        function activateItem(target) {
          // Remove active from all
          items.forEach(function (el) {
            if (el === target) return;
            el.classList.remove('active');
            el.classList.add('inactive');
            var right = el.querySelector('.benefits-n_right');
            if (right) right.classList.remove('active');
          });

          // Activate target
          target.classList.remove('inactive');
          target.classList.add('active');
          var rightTarget = target.querySelector('.benefits-n_right');
          if (rightTarget) rightTarget.classList.add('active');
        }

        items.forEach(function (it) {
          it.addEventListener('click', function (e) {
            if (it.classList.contains('active')) return;
            activateItem(it);
          });

          it.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!it.classList.contains('active')) activateItem(it);
            }
          });
        });
      } catch (err) {
        // swallow errors to avoid breaking other scripts
        console.warn('benefitsToggle error', err);
      }
    },
    imageSlideGsap: function () {
      $(document).ready(function () {
        gsap.to(".images", {
          scrollTrigger: {
            // trigger: ".images",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
          },
          x: -250,
        })
      });
      $(document).ready(function () {
        gsap.to(".images-r", {
          scrollTrigger: {
            // trigger: ".images",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
          },
          x: 250,
        })
      });
      $(document).ready(function () {
        gsap.to(".images-2", {
          scrollTrigger: {
            // trigger: ".images",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
          },
          y: -290,
        })
      });
    },
    swiperActivation: function () {
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-pd-slider", {
          speed: 1600,
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          autoplay: false,
          keyboard: {
            enabled: true,
            onlyInViewport: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-service-1", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          centeredSlides: true,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            767: {
              slidesPerView: 2,
              centeredSlides: false,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-project-1", {
          slidesPerView: 2,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          pagination: {
            el: ".swiper-paginations",
            clickable: true,
          },
          breakpoints: {
            1500: {
              slidesPerView: 2,
            },
            1300: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 1,
            },
            767: {
              slidesPerView: 1,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-related-shop", {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 1500,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-project-five", {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          speed: 1000,
          // pagination: {
          //   el: ".swiper-pagination",
          //   clickable: true,
          // },
          pagination: {
            el: '.swiper-pagination-fraction',
            type: 'fraction',
            formatFractionCurrent: function (number) {
              return '0' + number;
            },
            formatFractionTotal: function (number) {
              return '0' + number;
            }
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiperh1_team", {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          centeredSlides: false,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1300: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,

            },
            767: {
              slidesPerView: 3,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".swiper-container-h1", {
          direction: "horizontal",
          effect: "slide",
          autoplay: false,
          parallax: true,
          speed: 1600,
          rtl: true,
          loop: true,
          loopFillGroupWithBlank: !0,
          keyboard: {
            enabled: true,
            onlyInViewport: true
          },
          scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: "true"
          }
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-case-studies-5", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          centeredSlides: false,
          speed: 1000,
          pagination: {
            el: '.swiper-pagination-fraction',
            type: 'fraction',
            formatFractionCurrent: function (number) {
              return '0' + number;
            },
            formatFractionTotal: function (number) {
              return '0' + number;
            }
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-brand-2", {
          slidesPerView: 5,
          spaceBetween: 54,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          centeredSlides: false,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 5,
            },
            1300: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,

            },
            767: {
              slidesPerView: 3,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 2,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-banner-two", {
          slidesPerView: 1,
          spaceBetween: 1,
          slidesPerGroup: 1,
          loop: true,
          effect: "fade",
          loopFillGroupWithBlank: true,
          centeredSlides: false,
          speed: 0,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 2500,
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-banner-four", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          // effect: "fade",
          loopFillGroupWithBlank: true,
          centeredSlides: false,
          speed: 1500,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 3000,
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-blog-one", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          centeredSlides: false,
          speed: 1000,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          // mousewheel: {
          //   enabled: true
          // },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // autoplay: {
          //   delay: 3000,
          // },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 3,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiperh2_clients", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          pagination: {
            el: ".swiper-pagination",
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimonials-5", {
          slidesPerView: 2,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination-fractions',
            type: 'fraction',
            formatFractionCurrent: function (number) {
              return '0' + number;
            },
            formatFractionTotal: function (number) {
              return '0' + number;
            }
          },
          navigation: {
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 2,
            },
            1300: {
              slidesPerView: 2,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimoanils-6", {
          slidesPerView: 2,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-nexts",
            prevEl: ".swiper-button-prevs",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 2,
            },
            1300: {
              slidesPerView: 2,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      }); $(document).ready(function () {
        var swiper = new Swiper(".seo-testimonials", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          speed: 700,
          loop: true,
          pagination: {
            el: '.swiper-pagination1',
            clickable: true,
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 2,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimoanils-7", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 1,
            },
            1300: {
              slidesPerView: 1,
            },
            1199: {
              slidesPerView: 1,

            },
            767: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-blog-10", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-brand-banner", {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1240: {
              slidesPerView: 4,
            },
            1199: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 3,
            },
            575: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 2,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimnials-hr", {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          autoplay: {
            delay: 3000,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 2,

            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-banner-seven", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + '0' + (index + 1) + "</span>";
            },
          },
          autoplay: {
            delay: 3000,
          },
          speed: 1000,
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimonisl-8", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          // pagination: {
          //   el: ".swiper-pagination",
          // },
          // autoplay: {
          //   delay: 3000,
          // },
          speed: 1000,
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-full-screen-wrapper", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          effect: "fade",
          loop: true,
          mousewheel: {
            enabled: true
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          // autoplay: {
          //   delay: 3000,
          // },
          speed: 1000,
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimonails-9", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // autoplay: {
          //   delay: 3000,
          // },
          speed: 1000,
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-testimonials-dmeo-2", {
          slidesPerView: 1,
          spaceBetween: 0,
          slidesPerGroup: 1,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination-fraction',
            type: 'fraction',
            formatFractionCurrent: function (number) {
              return '0' + number;
            },
            formatFractionTotal: function (number) {
              return '0' + number;
            }
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          // autoplay: {
          //   delay: 3000,
          // },
          speed: 1000,
        });
      });



    },
    odoMeter: function () {
      $(document).ready(function () {
        function isInViewport(element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
          );
        }

        function triggerOdometer(element) {
          const $element = $(element);
          if (!$element.hasClass('odometer-triggered')) {
            const countNumber = $element.attr('data-count');
            $element.html(countNumber);
            $element.addClass('odometer-triggered'); // Add a class to prevent re-triggering
          }
        }

        function handleOdometer() {
          $('.odometer').each(function () {
            if (isInViewport(this)) {
              triggerOdometer(this);
            }
          });
        }

        // Check on page load
        handleOdometer();

        // Check on scroll
        $(window).on('scroll', function () {
          handleOdometer();
        });
      });
    },
    splitText: function (e) {
      if ($('.rts-text-anime-style-1').length) {
        let animatedTextElements = document.querySelectorAll('.rts-text-anime-style-1');

        animatedTextElements.forEach((element) => {
          //Reset if needed
          if (element.animation) {
            element.animation.progress(1).kill();
            element.split.revert();
          }

          element.split = new SplitText(element, {
            type: "lines,words,chars",
            linesClass: "split-line",
          });
          gsap.set(element, { perspective: 400 });

          gsap.set(element.split.chars, {
            opacity: 0,
            x: "50",
          });

          element.animation = gsap.to(element.split.chars, {
            scrollTrigger: { trigger: element, start: "top 95%" },
            x: "0",
            y: "0",
            rotateX: "0",
            opacity: 1,
            duration: 1,
            ease: Back.easeOut,
            stagger: 0.02,
          });
        });
      }
    },
    backToTopInit: function () {
      $(document).ready(function () {
        "use strict";

        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
          } else {
            jQuery('.progress-wrap').removeClass('active-progress');
          }
        });
        jQuery('.progress-wrap').on('click', function (event) {
          event.preventDefault();
          jQuery('html, body').animate({ scrollTop: 0 }, duration);
          return false;
        })


      });
    },
    stickyHeader: function (e) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
          $('.header--sticky').addClass('sticky')
        } else {
          $('.header--sticky').removeClass('sticky')
        }
      })
    },
    galleryPopUpmag: function () {
      $('.gallery-image').magnificPopup({
        type: 'image',
        gallery: {
          enabled: true
        }
      });
    },

    gsapAnimationImageScale: function (e) {
      $(document).ready(function () {
        gsap.registerPlugin(ScrollTrigger);

        let revealContainers = document.querySelectorAll(".rts-reveal-one");

        revealContainers.forEach((container) => {
          let image = container.querySelector(".rts-reveal-image-one");
          let rts = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              toggleActions: "play none none none", // Play once when it enters the viewport
              start: "top 100%",
              end: "top 0%",
              once: true, // Ensures it only plays once
            }
          });

          rts.set(container, {
            autoAlpha: 1
          });
          rts.from(container, 1.5, {
            xPercent: 100,
            ease: Power2.out
          });
          rts.from(image, 1.5, {
            xPercent: -100,
            scale: 1.3,
            delay: -1.5,
            ease: Power2.out
          });
        });
      });

      $(document).ready(function () {

        let growActive = document.getElementsByClassName('grow');
        if (growActive.length) {
          const growTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".grow",
              scrub: 1,
              start: "top 90%",
              end: "+=1000",
              ease: "power1.out",
              y: -60
            }
          });
          growTl.to(".grow", {
            duration: 1,
            y: 60
          });
        }

      });

    },


    radialProgress: function () {
      function radial_animate() {
        $('svg.radial-progress').each(function (index, value) {

          $(this).find($('circle.bar--animated')).removeAttr('style');
          // Get element in Veiw port
          var elementTop = $(this).offset().top;
          var elementBottom = elementTop + $(this).outerHeight();
          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();

          if (elementBottom > viewportTop && elementTop < viewportBottom) {
            var percent = $(value).data('countervalue');
            var radius = $(this).find($('circle.bar--animated')).attr('r');
            var circumference = 2 * Math.PI * radius;
            var strokeDashOffset = circumference - ((percent * circumference) / 100);
            $(this).find($('circle.bar--animated')).animate({ 'stroke-dashoffset': strokeDashOffset }, 2800);
          }
        });
      }
      // To check If it is in Viewport 
      var $window = $(window);
      function check_if_in_view() {
        $('.countervalue').each(function () {
          if ($(this).hasClass('start')) {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();

            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
              $(this).removeClass('start');
              $('.countervalue').text();
              var myNumbers = $(this).text();
              if (myNumbers == Math.floor(myNumbers)) {
                $(this).animate({
                  Counter: $(this).text()
                }, {
                  duration: 2800,
                  easing: 'swing',
                  step: function (now) {
                    $(this).text(Math.ceil(now) + '%');
                  }
                });
              } else {
                $(this).animate({
                  Counter: $(this).text()
                }, {
                  duration: 2800,
                  easing: 'swing',
                  step: function (now) {
                    $(this).text(now.toFixed(2) + '$');
                  }
                });
              }

              radial_animate();
            }
          }
        });
      }

      $window.on('scroll', check_if_in_view);
      $window.on('load', check_if_in_view);

    },


  }

  rtsJs.m();
})(jQuery, window)

/* Our Process interactive module */
(function () {
  function initProcess() {
    var section = document.querySelector('.our-process-section');
    if (!section) return;

    var steps = Array.from(section.querySelectorAll('.process-steps .step'));
    var activeIndex = 0;
    var svg = section.querySelector('.process-curve');
    var passivePath = svg.querySelector('.curve-path');
    var activePath = svg.querySelector('.curve-path-active');
    if (!activePath || !passivePath) return;
    // we'll rebuild the path from button centers so the line connects button centers precisely
    var pathLength = 0;
    activePath.style.transition = 'stroke-dasharray .6s cubic-bezier(.2,.9,.2,1)';

    var cumulativeLengthsByStep = [];
    function rebuildPathFromButtons() {
      var svgRect = svg.getBoundingClientRect();
      var viewW = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal.width : 1200;
      var viewH = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal.height : 160;
      var pts = [];
      // Build sequence: start at right-center of step0, then for each following step: left-center, right-center
      steps.forEach(function (s, idx) {
        var btn = s.querySelector('.step-btn');
        var r = btn.getBoundingClientRect();
        var leftX = (r.left - svgRect.left) / svgRect.width * viewW;
        var rightX = (r.left + r.width - svgRect.left) / svgRect.width * viewW;
        var cy = (r.top + r.height / 2 - svgRect.top) / svgRect.height * viewH;
        if (idx === 0) pts.push([rightX, cy]);
        else {
          pts.push([leftX, cy]);
          pts.push([rightX, cy]);
        }
      });
      if (pts.length < 2) return;
      var d = 'M ' + pts[0][0] + ' ' + pts[0][1];
      for (var i = 1; i < pts.length; i++) d += ' L ' + pts[i][0] + ' ' + pts[i][1];
      passivePath.setAttribute('d', d);
      activePath.setAttribute('d', d);

      // compute cumulative lengths along the polyline so we can map step -> length
      var segLens = [];
      var cum = [0];
      var total = 0;
      for (var j = 0; j < pts.length - 1; j++) {
        var dx = pts[j + 1][0] - pts[j][0];
        var dy = pts[j + 1][1] - pts[j][1];
        var l = Math.sqrt(dx * dx + dy * dy);
        segLens.push(l);
        total += l;
        cum.push(total);
      }
      pathLength = Math.round(total);
      activePath.style.strokeDasharray = '0 ' + pathLength;

      // map each step index to an offset along the path: step0 -> 0, step i -> cumulative length to the left-center point of step i
      cumulativeLengthsByStep = [];
      for (var sidx = 0; sidx < steps.length; sidx++) {
        if (sidx === 0) {
          cumulativeLengthsByStep.push(0);
        } else {
          // left-center of step sidx is at point index = (sidx * 2 - 1)
          var pIndex = sidx * 2 - 1;
          // sum lengths up to pIndex
          var lenTo = cum[pIndex] || 0;
          cumulativeLengthsByStep.push(Math.round(lenTo));
        }
      }
    }

    // initial build
    rebuildPathFromButtons();

    var content = [
      { img: 'assets/images/service/enterprise-systems.jpg', title: 'Discover', sub: 'Understand goals & constraints', desc: 'We begin with stakeholder interviews, user research, and technical assessment to form a shared understanding of the problem space and success metrics.' },
      { img: 'assets/images/service/code.png', title: 'Define', sub: 'Scope the work', desc: 'We define deliverables, prioritize features, and create a roadmap that balances risk and value.' },
      { img: 'assets/images/service/programming.png', title: 'Design', sub: 'Prototype & UX', desc: 'We create high-fidelity prototypes and design systems to align experience and engineering.' },
      { img: 'assets/images/service/design.png', title: 'Develop', sub: 'Engineering & Iteration', desc: 'Cross-functional teams deliver incremental builds with continuous feedback.' },
      { img: 'assets/images/service/devops.jpg', title: 'Integrate', sub: 'Systems & APIs', desc: 'Integrations, CI/CD pipelines, and secure connections are validated and hardened.' },
      { img: 'assets/images/service/qa.avif', title: 'Validate', sub: 'Testing & QA', desc: 'We perform performance, security, and usability tests to ensure production-readiness.' },
      { img: 'assets/images/service/enterprise-systems.jpg', title: 'Launch', sub: 'Go live & support', desc: 'We launch methodically with observability, rollback plans, and post-launch support.' }
    ];

    function updateContent(i) {
      var wrap = section.querySelector('.process-content');
      var img = wrap.querySelector('.process-image');
      var title = wrap.querySelector('.process-item-title');
      var sub = wrap.querySelector('.process-item-sub');
      var desc = wrap.querySelector('.process-item-desc');
      gsap.to([img, title, sub, desc], { y: 8, opacity: 0, duration: 0.28, stagger: 0.02, onComplete: function () {
        img.style.backgroundImage = 'url(' + content[i].img + ')';
        title.textContent = content[i].title;
        sub.textContent = content[i].sub;
        desc.textContent = content[i].desc;
        gsap.fromTo([img, title, sub, desc], { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.56, stagger: 0.04, ease: 'power3.out' });
      }});
    }

    function setActive(index) {
      if (index < 0) index = 0;
      if (index > steps.length - 1) index = steps.length - 1;
      activeIndex = index;
      steps.forEach(function (s, idx) {
        s.classList.remove('active');
        s.classList.remove('completed');
        if (idx < index) s.classList.add('completed');
        if (idx === index) s.classList.add('active');
      });

      // compute cumulative length from start (button 0 center) to the current step center
      // We'll approximate per-step position along the path by dividing the path into equal segments
      // determine exact dash length for this step (cumulative from step 0)
      var dashLength = cumulativeLengthsByStep[index] || 0;
      dashLength = Math.max(0, Math.min(pathLength, dashLength));
      // animate the strokeDasharray smoothly from current value to new value using GSAP
      var currentDash = (activePath.style.strokeDasharray || '0 ' + pathLength).split(' ')[0] * 1 || 0;
      gsap.to({ val: currentDash }, {
        val: dashLength,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: function () {
          var v = Math.round(this.targets()[0].val);
          activePath.style.strokeDasharray = v + ' ' + pathLength;
        }
      });

      // pulse the active button and ensure focus
      var activeBtn = steps[index].querySelector('.step-btn');
      gsap.fromTo(activeBtn, { scale: 1.06 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1,0.6)'});

      // update content for the selected step (each step content independent)
      updateContent(index);
    }

  // apply odd/even offsets: odd steps slightly higher
    steps.forEach(function (s, idx) {
      if (idx % 2 === 1) s.classList.add('odd');
      else s.classList.remove('odd');
      var btn = s.querySelector('.step-btn');
      // make each button reachable and interactive
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () { setActive(idx); btn.focus(); });
      btn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(idx); } });
    });

  // rebuild path on resize and re-run active state
  window.addEventListener('resize', function () { rebuildPathFromButtons(); setActive(activeIndex); });

  // set initial active after path built
  setTimeout(function () { setActive(0); }, 50);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initProcess); else initProcess();
})();

/* Portfolio / Case Studies module */
(function () {
  function initPortfolio() {
    var container = document.getElementById('portfolio-grid');
    if (!container) return;

    // sample data (more than 20 items) - each item has default and hover images plus tags
    var items = [];
    for (var i = 1; i <= 11; i++) {
      items.push({
        id: i,
        title: 'Case Study ' + i,
        img: 'assets/images/service/web-development.jpg',
        imgAlt: 'assets/images/about/' + ((i % 12) + 1) + '.webp',
        industry: ['fintech','healthcare','retail'][i % 3],
        technology: ['react','node','aws'][i % 3],
        service: ['web','mobile','design'][i % 3],
        tags: ['react','aws']
      });
    }

    var perPage = 9;
    var currentPage = 0;

    // populate filter selects
    function populateFilters() {
      var ind = document.getElementById('filter-industry');
      var tech = document.getElementById('filter-technology');
      var svc = document.getElementById('filter-service');
      var industries = new Set();
      var technologies = new Set();
      var services = new Set();
      items.forEach(function (it) { industries.add(it.industry); technologies.add(it.technology); services.add(it.service); });
      industries.forEach(function (v) { var o = document.createElement('option'); o.value = v; o.text = v.charAt(0).toUpperCase() + v.slice(1); ind.appendChild(o); });
      technologies.forEach(function (v) { var o = document.createElement('option'); o.value = v; o.text = v.toUpperCase(); tech.appendChild(o); });
      services.forEach(function (v) { var o = document.createElement('option'); o.value = v; o.text = v.charAt(0).toUpperCase() + v.slice(1); svc.appendChild(o); });
    }

    function renderPage(page, filtered) {
      container.innerHTML = '';
      var start = page * perPage;
      var paged = filtered.slice(start, start + perPage);
      paged.forEach(function (it) {
        var card = document.createElement('div'); card.className = 'portfolio-card'; card.setAttribute('data-id', it.id);
        var bg = document.createElement('div'); bg.className = 'bg'; bg.style.backgroundImage = 'url("' + it.img + '")';
        var alt = document.createElement('div'); alt.className = 'bg alt'; alt.style.backgroundImage = 'url("' + it.imgAlt + '")';
  var mask = document.createElement('div'); mask.className = 'mask';
  // center content wrapper: title, CTA button, badges (stacked vertically)
  var center = document.createElement('div'); center.className = 'center-content';
  var title = document.createElement('div'); title.className = 'title'; title.textContent = it.title; center.appendChild(title);
  var ctaWrap = document.createElement('div'); ctaWrap.className = 'cta';
  var btn = document.createElement('button'); btn.className = 'btn-view'; btn.setAttribute('type', 'button'); btn.innerHTML = 'View case study <span class="arrow">→</span>';
  ctaWrap.appendChild(btn);
  center.appendChild(ctaWrap);
  var badges = document.createElement('div'); badges.className = 'badges'; it.tags.forEach(function (t) { var b = document.createElement('div'); b.className = 'badge'; b.textContent = t; badges.appendChild(b); });
  center.appendChild(badges);
  mask.appendChild(center);
        card.appendChild(bg); card.appendChild(alt); card.appendChild(mask);
        container.appendChild(card);

        // hover animation for CTA (guarded) — CSS provides a fallback if GSAP not loaded
        if (window.gsap) {
          try {
            btn.addEventListener('mouseenter', function () { try { gsap.to(btn, { scale: 1.06, duration: 0.22, ease: 'power2.out', boxShadow: '0 12px 28px rgba(24,139,206,0.12)' }); } catch (e) {} });
            btn.addEventListener('mouseleave', function () { try { gsap.to(btn, { scale: 1, duration: 0.22, ease: 'power2.out', boxShadow: '0 0px 0px rgba(0,0,0,0)' }); } catch (e) {} });
          } catch (err) { /* swallow */ }
        }
        // click opens detail (placeholder)
        btn.addEventListener('click', function (e) { e.stopPropagation(); window.location.href = 'service-details.html?id=' + it.id; });
      });

      // simple fade-in animation
      gsap.fromTo(container.children, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: 'power3.out' });

      renderPagination(filtered.length);
    }

    function renderPagination(totalItems) {
      var pages = Math.ceil(totalItems / perPage);
      var pag = document.getElementById('portfolio-pagination'); if (!pag) return;
      pag.innerHTML = '';
      for (var p = 0; p < pages; p++) {
        var b = document.createElement('button'); b.className = 'page-btn' + (p === currentPage ? ' active' : ''); b.textContent = (p + 1);
        (function (pp) { b.addEventListener('click', function () { currentPage = pp; applyFilters(); }); })(p);
        pag.appendChild(b);
      }
    }

    function applyFilters() {
      var ind = document.getElementById('filter-industry').value;
      var tech = document.getElementById('filter-technology').value;
      var svc = document.getElementById('filter-service').value;
      var filtered = items.filter(function (it) {
        if (ind !== 'all' && it.industry !== ind) return false;
        if (tech !== 'all' && it.technology !== tech) return false;
        if (svc !== 'all' && it.service !== svc) return false;
        return true;
      });
      // reset page if out of range
      var pages = Math.max(1, Math.ceil(filtered.length / perPage));
      if (currentPage >= pages) currentPage = 0;
      renderPage(currentPage, filtered);
    }

    populateFilters();
    applyFilters();

    // hook filter controls
    document.getElementById('filter-industry').addEventListener('change', function () { currentPage = 0; applyFilters(); });
    document.getElementById('filter-technology').addEventListener('change', function () { currentPage = 0; applyFilters(); });
    document.getElementById('filter-service').addEventListener('change', function () { currentPage = 0; applyFilters(); });

    // search toggle (robust: GSAP animate, outside click to close, Escape to close, debounced filter)
    var searchWrap = document.getElementById('portfolio-search');
    var searchToggle = document.getElementById('portfolio-search-toggle');
    var searchInput = document.getElementById('portfolio-search-input');
    if (searchToggle && searchWrap && searchInput) {
      var searchBox = searchWrap.querySelector('.search-box');
      // open search with animation and focus
      function openSearch() {
        if (!searchWrap.classList.contains('expanded')) {
          searchWrap.classList.add('expanded');
          searchWrap.setAttribute('aria-expanded', 'true');
          if (searchBox) {
            searchBox.setAttribute('aria-hidden', 'false');
            // animate width + opacity for consistent cross-CSS behavior
            gsap.killTweensOf(searchBox);
            gsap.fromTo(searchBox, { width: 0, opacity: 0 }, { width: 220, opacity: 1, duration: 0.34, ease: 'power2.out' });
          }
          setTimeout(function () { try { searchInput.focus(); } catch (e) {} }, 260);
        }
      }
      // close search and clear
      function closeSearch() {
        if (searchWrap.classList.contains('expanded')) {
          if (searchBox) {
            gsap.killTweensOf(searchBox);
            gsap.to(searchBox, { width: 0, opacity: 0, duration: 0.28, ease: 'power2.in', onComplete: function () { searchBox.setAttribute('aria-hidden', 'true'); } });
          }
          searchWrap.classList.remove('expanded');
          searchWrap.setAttribute('aria-expanded', 'false');
          searchInput.value = '';
          applyFilters();
        }
      }

      searchToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        if (searchWrap.classList.contains('expanded')) closeSearch(); else openSearch();
      });

      // close when clicking outside
      document.addEventListener('click', function (e) { if (!searchWrap.contains(e.target)) closeSearch(); });
      // close on Escape
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(); });

      // hover micro-interaction for toggle icon
      searchToggle.addEventListener('mouseenter', function () { gsap.to(searchToggle, { scale: 1.06, duration: 0.18 }); });
      searchToggle.addEventListener('mouseleave', function () { gsap.to(searchToggle, { scale: 1, duration: 0.18 }); });

      // wire search input to filter by title and tags (debounced)
      var searchTimer = null;
      searchInput.addEventListener('input', function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          var q = searchInput.value.trim().toLowerCase();
          if (!q) { applyFilters(); return; }
          var filtered = items.filter(function (it) {
            var inTitle = it.title && it.title.toLowerCase().indexOf(q) !== -1;
            var inTags = it.tags && it.tags.join(' ').toLowerCase().indexOf(q) !== -1;
            return inTitle || inTags;
          });
          currentPage = 0; renderPage(currentPage, filtered);
        }, 220);
      });
    }

  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPortfolio); else initPortfolio();
})();







