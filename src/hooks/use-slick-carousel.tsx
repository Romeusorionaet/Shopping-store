export function useSlickCarousel() {
  const carouselResponsive = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 3.5,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const carouselAutoPlay = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 6000,
    cssEase: 'linear',
  }

  return { carouselResponsive, carouselAutoPlay }
}
