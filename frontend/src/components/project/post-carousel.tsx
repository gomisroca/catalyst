import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function PostCarousel({ carousel, selected }: { carousel: string[], selected: number}){

    return(
        <>
        <Carousel
        opts={{
            startIndex: selected
        }}>
        <CarouselContent className="rounded-md -mt-1 flex">
            {carousel.map(image =>
                <CarouselItem className="rounded-md flex pt-1" key={image}>
                    <img className="rounded-md m-auto" src={`/images/${image}`} />
                </CarouselItem>
            )}
            </CarouselContent>
            <CarouselPrevious className="disabled:hidden" />
            <CarouselNext className="disabled:hidden" />
        </Carousel>
        </>
    )
}
