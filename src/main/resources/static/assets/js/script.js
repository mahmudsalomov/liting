/*=================================================================

Template name: Rimk Construction HTML Template
Version: 1.0.0
Author: Design Expert
Author url:
Developer: Najmul Huda Eimon

[Table of Content]

01: Background image
02: Menu
03: Preloader
04: Scroll to top button
05: Sticky menu
06: Venobox video play
07: Project image show
08: Project filtering
09: client slider
10: footer time slider
11: counterup
12: scroll animation

====================================================================*/

$(function(){
    "use strict";

    /*=====================================================================
        01: Background image
    ======================================================================*/
   let imageTarget = $('[data-img]');
   imageTarget.css('background', function(){
       return 'url('+this.getAttribute('data-img')+') no-repeat center'
   });
   imageTarget.css('backgroundSize', 'cover');

    /*=====================================================================
        02: Menu
    ======================================================================*/
    $('.header-menu a[href="#"]').on("click", function (e) {
        e.preventDefault();
    });

    $(".header-menu").menumaker({ title: '<i class="fas fa-bars"></i>', format: "multitoggle" });

    /*================================================================
      03: Preloader
    =================================================================*/
    $( document ).ready(function() {
        setTimeout(()=>{
            $('.preloader').fadeOut();
        }, 250)
    });

    /*=====================================================================
        04: Scroll to top button
    =======================================================================*/
    $('.top-btn').on('click',function(){
        $('html').animate({
            scrollTop: 0
        },1000);
    });


    $(window).on('scroll',function(){
        var $scroll = $(this).scrollTop();

        if($scroll > 300){
            $('.top-btn').addClass('show');
        }else{
            $('.top-btn').removeClass('show');
        }
    });

    /*=====================================================================
        05: Sticky menu
    ======================================================================*/
    function menuSticky (){
        var $scroll = $(window).scrollTop();
        if($scroll > 120){
            $('.menubar').addClass('sticky');
        }else{
            $('.menubar').removeClass('sticky');
        }
     }
     menuSticky ()
     $(window).on('scroll',function(){
        menuSticky ()

    });

   /*=====================================================================
        06: Venobox video play
    ======================================================================*/
    $('.venobox').venobox();

    /*======================================================================
        07: Project image show
    =======================================================================*/

    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
          enabled: true
        }
      });

      /*=====================================================================
        08: Project filtering
    ======================================================================*/
    let mixer =  document.querySelector('.filters');
    if(mixer){
        mixitup('.filters',{
            selectors: {
                control: '[data-mixitup-control]'
            }
        })
    }


        $('.project-menu li').click(function(event){
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();
    });

    /*=====================================================================
        09: client slider
    ======================================================================*/
    var clientSwiper = new Swiper('.client-slider', {
        observer: true,
        observeParents: true,
        loop: true,
        centeredSlides: false,
        spaceBetween: 30,
        autoPlay: 3000,
        breakpoints: {
            1920: {
            slidesPerView: 1,
            },
            992: {
            slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            320: {
                slidesPerView: 1,
            }
        },
        controller: {
            control: clientImgSwiper,
          },
        // navigation: {
        //     nextEl: ".client-button-next",
        //     prevEl: ".client-button-prev",

        //   },
    });
    var clientImgSwiper = new Swiper('.client-img-slider', {
        observer: true,
        observeParents: true,
        loop: true,
        centeredSlides: false,
        spaceBetween: 30,
        autoPlay: 3000,
        breakpoints: {
            1920: {
            slidesPerView: 1,
            },
            992: {
            slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            320: {
                slidesPerView: 1,
            }
        },
        controller: {
            control: clientSwiper,
          },
        navigation: {
            nextEl: ".client-button-next",
            prevEl: ".client-button-prev",

          },

    });

    /*=====================================================================
        10: footer time slider
    ======================================================================*/
    var swiper = new Swiper('.time-slider', {
        observer: true,
        observeParents: true,
        loop: true,
        centeredSlides: false,
        spaceBetween: 30,
        autoPlay: 3000,
        breakpoints: {
            1920: {
            slidesPerView: 1,
            },
            992: {
            slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            320: {
                slidesPerView: 1,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

    });

    /*=====================================================================
        11: counterup
    ======================================================================*/
    $('.counter').counterUp({
        delay: 10,
        time: 2000
    });

    /*=====================================================================
        12: scroll animation
    ======================================================================*/

    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true,
        scrollContainer: null
    });
    wow.init();



});



function mainPageBlogsSlider() {



    axios.get("/api/blog/all/type?type=BLOG")
        .then(function (response) {
            console.log(response.data)
            console.log(response.data.object)
            let data=response.data.object
            let out=""
            let temp=""
            let first=""
            let last=""
            data.forEach((blog,index)=>{
                temp="                        <div class=\"swiper-slide\">\n" +
                    "                            <!-- article -->\n" +
                    "                            <article class=\"post\">\n" +
                    "                                <div class=\"post-wrapper\">\n" +
                    "                                    <div class=\"blog-img animate-img\">\n" +
                    "                                        <a href=\"blog-single.html\">\n" +
                    "                                            <img src='/api/file/photo/"+blog.mainImage.hashId+"'" +
                "                                                 class=\"img-fluid full-width\" alt=\"blog\">\n" +
                "                                        </a>\n" +
                "                                    </div>\n" +
                "                                    <div class=\"post-date\">\n" +
                "                                        <a href=\"blog-single.html\">"+blog.createdAt+"</a>\n" +
                "                                    </div>\n" +
                "                                    <div class=\"blog-meta bg-custom-white padding-20\">\n" +
                "                                        <div class=\"cat-box\">\n" +
                "                                            <div class=\"cats\">\n" +
                "                                                <a href=\"#\">"+blog.category.name_oz+"</a>\n" +
                "                                            </div>\n" +
                "                                        </div>\n" +
                "                                        <h2 class=\"post-title\"><a href=\"blog-single.html\" class=\"text-theme\">"+blog.title_oz+"</a></h2>\n" +
                "                                        <p class=\"text-light-white no-margin\">"+blog.anons_oz+"</p>\n" +
                "                                    </div>\n" +
                "                                    <div class=\"blog-footer-meta bg-custom-white padding-20\">\n" +
                "                                        <div class=\"post-author\">\n" +
                "                                            <div class=\"author-img\">\n" +
                "                                                <a href=\"blog-single.html\">\n" +
                "                                                    <img src=\"/assets/images/homepage-1/admin-2-40x40.jpg\"\n" +
                // "                                                         th:src=\"@{assets/images/homepage-1/admin-2-40x40.jpg}\"\n" +
                "                                                         class=\"rounded-circle\" alt=\"#\">\n" +
                "                                                </a>\n" +
                "                                            </div>\n" +
                "                                            <span class=\"text-theme fs-14\">By <a href=\"blog-single.html\" class=\"text-theme fw-500\">Администратор</a></span>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"post-link\">\n" +
                "                                            <a href='/blog/"+blog.id+"' class=\"link-btn text-custom-blue fw-600 fs-14\">Читать далее</a>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "                            </article>\n" +
                "                            <!-- article -->\n" +
                "                        </div>\n"


                if (index==0){
                    first=temp
                }
                if (index==(data.length-1)){
                    last=temp
                }

                out+=temp;
            })

            if (out!=""){
                out=last+out+first;
                document.getElementById("swiper-blog-main-page").innerHTML=out
            }

        })
        .catch(function (error) {
            console.log(error)
        })





}

mainPageBlogsSlider()
