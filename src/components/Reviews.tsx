"use client";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;

    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

interface ReviewsInter {
  reviews: string[];
  className?: string;
  reviewClassname?: (reviewIndex: number) => string;
  msPerPixel?: number;
}

function ReviewColumns({
  reviews,
  className,
  reviewClassname,
  msPerPixel = 0,
}: ReviewsInter) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnsHeight, setColumnsHeight] = useState(0);
  const duration = `${columnsHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;
    const resizeObserver = new window.ResizeObserver(() => {
      setColumnsHeight(columnRef.current?.offsetHeight ?? 0);
    });
    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review />
      ))}
    </div>
  );
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
  return (
    <div className={cn("animate-fade-in rounded-[2.25rem]")} {...props}></div>
  );
}

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);
  const columns1 = columns[0];
  const columns2 = columns[1];
  const columns3 = splitArray(columns[0], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 "
    >
      {isInView ? (
        <>
          <ReviewColumns />
        </>
      ) : null}
    </div>
  );
}

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <Image
        src="/what-people-are-buying.png"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
        width={50}
        height={50}
        alt="people"
      />

      <ReviewGrid />
    </MaxWidthWrapper>
  );
};

export default Reviews;
