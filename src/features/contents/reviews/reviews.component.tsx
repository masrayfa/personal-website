import React from 'react';
import { reviews } from '../constants';

interface Props {
  title: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'gif';
}

const ReviewsComponent = (props: Props) => {
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
            <div className="w-full">
              <div className="relative w-full max-h-56 aspect-video bg-gray-100 border-2 border-black overflow-hidden group">
                {review.mediaUrl && !mediaError ? (
                  <div>{review.mediaUrl}</div>
                ) : (
                  <>
                    <div>Reviews Placeholder</div>
                  </>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold">{review.title}</h3>

              {review.desc && (
                <p className="text-sm text-gray-600">{review.desc}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsComponent;
