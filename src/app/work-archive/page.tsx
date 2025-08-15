"use client";

import PreloadImage from "@/components/PreloadImage";
import PageTitle from "@/components/work-archive/PageTitle";
import { workCategoriesData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

const Page = () => {
  const workCategoryContainerRef = useRef<HTMLDivElement>(null);
  const hoverTls = useRef<Map<number, gsap.core.Timeline>>(new Map());

  const { contextSafe } = useGSAP(() => {}, {
    scope: workCategoryContainerRef,
  });

  const handleItemHover = contextSafe((i: number) => {
    if (!hoverTls.current.has(i)) {
      hoverTls.current.set(
        i,
        gsap
          .timeline()
          .to(`.work-category-${i}`, {
            yPercent: -100,
            duration: 0.3,
          })
          .to(
            `.category-img-${i}`,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 0.3,
            },
            "<",
          ),
      );
    } else {
      hoverTls.current.get(i)?.play();
    }
  });

  const handleItemLeave = contextSafe((i: number) => {
    hoverTls.current.get(i)?.reverse();
  });

  return (
    <div
      ref={workCategoryContainerRef}
      className="relative flex min-h-screen flex-col"
    >
      <PageTitle />
      <div className="flex w-full flex-col self-end bg-[#fff6db] p-6 pt-30">
        {workCategoriesData.map((item, i) => (
          <div
            key={item.label}
            className={`relative h-[100px] cursor-pointer overflow-y-hidden border bg-white text-2xl font-bold text-black uppercase shadow-[-10px_10px_0px_0px_#6D28D9] md:text-5xl`}
            onMouseEnter={() => handleItemHover(i)}
            onMouseLeave={() => handleItemLeave(i)}
          >
            <Link
              href={`work-archive/${item.label.split(" ").join("-").toLowerCase()}`}
              className={`work-category-${i} block h-full w-full`}
            >
              <div
                className={`work-category-top-${i} flex h-full w-full items-center justify-between p-4`}
              >
                <p>{item.label}</p>
                <FaExternalLinkAlt className="mr-6 text-2xl" />
              </div>
              <div
                className={`work-category-bottom-${i} flex h-full w-full items-center justify-between bg-blue-400 p-4 text-white`}
              >
                <p>{item.label}</p>
                <FaExternalLinkAlt className="mr-6 text-2xl" />
              </div>
            </Link>
            <div
              className={`category-img-${i} fixed right-4 bottom-4 z-[99] h-[200px] w-[150px] border bg-white/80 lg:h-[250px] lg:w-[200px] xl:h-[450px] xl:w-[450px]`}
              style={{
                clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
              }}
            >
              <PreloadImage
                src={item.coverImg}
                alt="category image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="h-screen bg-transparent"></div>
    </div>
  );
};

export default Page;
