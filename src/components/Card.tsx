import { fetchData } from "@/_lib/fetchData";
import {
  blogDescription,
  blogTag,
  blogTitle,
  ResultNotFound,
  userProfileName,
} from "@/app/fonts";
import { Article } from "@/_lib/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icon from "/public/error.svg";
import defaultCover from "/public/default-cover.jpg";

async function Card({ query }: { query?: string }) {
  let articles: Article[] = [];

  console.log(query);

  if (query == undefined) {
    articles = await fetchData("https://dev.to/api/articles/latest");
  } else {
    articles = await fetchData(`https://dev.to/api/articles?tag=${query}`);
  }

  if (articles.length < 1) {
    return (
      <div className="h-[50dvh] flex justify-center max-sm:items-center">
        <div className="flex flex-col items-center">
          <Image src={Icon} height={1000} width={1000} alt="icon" unoptimized/>
          <h1
            className={`${ResultNotFound.className} max-sm:text-3xl text-5xl`}
          >
            Result Not Found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        {articles.map((article) => (
          <Link
            href={`/${article.id}`}
            className="group flex flex-col bg-[#1A1F26] rounded-xl overflow-hidden hover:bg-[#242935] transition-colors"
            key={article.id}
          >
            <div className="flex flex-col p-4">
              {/* Author info */}
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={article.user.profile_image_90}
                  width={24}
                  height={24}
                  unoptimized
                  alt={article.user.name}
                  className="rounded-full"
                />
                <span className={`${userProfileName.className} text-sm text-gray-300`}>
                  {article.user.name}
                </span>
              </div>

              {/* Title */}
              <h2 className={`${blogTitle.className} text-lg font-semibold mb-3 line-clamp-2 group-hover:text-blue-400`}>
                {article.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tag_list.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className={`${blogTag.className} px-2 py-0.5 text-xs rounded-md bg-[#242935] text-[#656C7D]`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Date and read time */}
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <span>{article.readable_publish_date}</span>
                <span>•</span>
                <span>{article.reading_time_minutes} min read</span>
              </div>
            </div>

            {/* Cover image */}
            <div className="relative h-40 w-full mt-auto">
              <Image
                src={article.cover_image || defaultCover}
                fill
                alt={article.title}
                unoptimized
                className="object-cover"
                onError={(e) => {
                  // Fallback images if the main image fails to load
                  const fallbackImages = [
                    'https://picsum.photos/600/400', // Random image
                    'https://source.unsplash.com/600x400/?programming', // Programming related
                    'https://source.unsplash.com/600x400/?technology', // Tech related
                  ];
                  
                  const img = e.target as HTMLImageElement;
                  if (!img.dataset.tried) {
                    img.dataset.tried = '1';
                    img.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                  }
                }}
              />
            </div>

            {/* Interaction buttons */}
            <div className="flex items-center gap-4 p-4 border-t border-[#2D3343]">
              <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                <span>👍</span>
                <span className="text-sm">{article.public_reactions_count}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                <span>💬</span>
                <span className="text-sm">{article.comments_count}</span>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Card;
