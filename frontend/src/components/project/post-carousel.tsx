import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function PostCarousel({ carousel, selected }: { carousel: string[]; selected: number }) {
  return (
    <>
      <Carousel
        opts={{
          startIndex: selected,
        }}
      >
        <CarouselContent className="-mt-1 flex rounded-md">
          {carousel.map((image) => (
            <CarouselItem className="flex rounded-md pt-1" key={image}>
              <img className="m-auto rounded-md" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/images/${image}`} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="disabled:hidden" />
        <CarouselNext className="disabled:hidden" />
      </Carousel>
    </>
  );
}
