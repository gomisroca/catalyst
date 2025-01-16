// Hook Imports
import { useMemo } from 'react';
// UI Imports
import { CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const MediaThumbnail = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex h-[80px] w-full items-center overflow-hidden rounded-md lg:h-[100px] lg:w-[130px] xl:w-[200px] 2xl:h-[125px] 2xl:w-[300px]">
    <img
      className="self-center rounded-md"
      src={src}
      alt={alt}
      loading="lazy"
      onError={(e) => (e.currentTarget.src = '/fallback.jpg')}
    />
  </div>
);

const PostCarousel = ({ media, selected }: { media: string[]; selected: number }) => {
  return (
    <Carousel opts={{ startIndex: selected }}>
      <CarouselContent className="-mt-1 flex rounded-md">
        {media.map((image) => (
          <CarouselItem className="flex rounded-md pt-1" key={image}>
            <img
              className="m-auto rounded-md"
              src={`${import.meta.env.VITE_IMG_ROOT + image}`}
              alt={`Carousel image`}
              loading="lazy"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="disabled:hidden" />
      <CarouselNext className="disabled:hidden" />
    </Carousel>
  );
};

export default function PostGallery({ post }: { post: Post }) {
  if (!post.media || post.media.length === 0) return null;

  return (
    <CardFooter className="grid grid-cols-2 gap-2 px-0 pb-4 pt-2 lg:grid-cols-5">
      {post.media.map((media) => {
        const selected = useMemo(() => post.media.findIndex((x) => x === media), [post.media, media]);
        return (
          <Dialog key={media}>
            <DialogTrigger>
              <MediaThumbnail src={`${import.meta.env.VITE_IMG_ROOT + media}`} alt="Media thumbnail" />
            </DialogTrigger>
            <DialogContent className="w-auto max-w-none rounded-md p-1">
              <PostCarousel media={post.media} selected={selected} />
            </DialogContent>
          </Dialog>
        );
      })}
    </CardFooter>
  );
}
