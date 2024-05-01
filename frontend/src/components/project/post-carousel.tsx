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
        <CarouselContent className="rounded-md -mt-1 h-[75vh] flex">
            {carousel.map(image =>
                <CarouselItem className="rounded-md flex pt-1">
                    <img className="rounded-md h-full m-auto" src={`${import.meta.env.VITE_BACKEND_ORIGIN}/${image}`} />

                </CarouselItem>
            )}
            </CarouselContent>
            <CarouselPrevious className="disabled:hidden" />
            <CarouselNext className="disabled:hidden" />
        </Carousel>
        </>
    )
}
