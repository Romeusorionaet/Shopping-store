import { useSlickCarousel } from '@/hooks/use-slick-carousel'
import Slider from 'react-slick'

export function SkeletonCarousel() {
  const { carouselResponsive } = useSlickCarousel()

  return (
    <Slider {...carouselResponsive}>
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <div
            key={index}
            className="group relative z-20 ml-3 h-72 animate-pulse rounded-md bg-zinc-100 md:h-[26rem]"
          />
        )
      })}
    </Slider>
  )
}
