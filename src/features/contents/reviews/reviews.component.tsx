import React from "react";
import { Link } from "@tanstack/react-router";
import ReviewsMDsCollections from "./md";
import { useFilterStore } from "@/stores/filter-store";

interface Props {
  title: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "gif";
}

const ReviewsComponent = () => {
  const widgetId = "reviews";
  const { getFilteredCollections } = useFilterStore();

  // Get filtered collections if filters are active, otherwise use all collections
  const filteredCollections = getFilteredCollections(widgetId);
  const reviews =
    filteredCollections.length > 0
      ? filteredCollections
      : ReviewsMDsCollections;

  const [hovered, setHovered] = React.useState(false);
  const [mediaLoaded, setMediaLoaded] = React.useState(false);
  const [mediaError, setMediaError] = React.useState(false);

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div>
        <h2 className="text-4xl">Reviews</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      {/* List of Contents */}
      <ul className="flex flex-col space-y-20">
        {reviews.map((review) => (
          <li>
            <Link
              to={"/$widgetId/$contentId"}
              params={{ widgetId: "reviews", contentId: String(review.id) }}
            >
              <div className="w-full">
                <div className="relative w-full max-h-56 aspect-video bg-gray-100 border-2 border-black overflow-hidden group flex justify-center items-center">
                  <div>Reviews Placeholder</div>
                </div>
              </div>

              {/* Project Info */}
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold">{review.metadata.title}</h3>

                {review.metadata.desc && (
                  <p className="text-sm text-gray-600">
                    {review.metadata.desc}
                  </p>
                )}

                {review.metadata.genre && (
                  <div className="flex gap-2">
                    {review.metadata.genre.map((g) => (
                      <span
                        key={g}
                        className="text-xs bg-gray-100 border border-gray-300 px-2 py-1"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsComponent;
