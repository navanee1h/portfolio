"use client"
import React from "react"
import useEmblaCarousel from "embla-carousel-react"

export function Carousel({ children }) {
  const [emblaRef] = useEmblaCarousel()
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">{children}</div>
    </div>
  )
}

export function CarouselItem({ children }) {
  return <div className="flex-[0_0_100%]">{children}</div>
}
