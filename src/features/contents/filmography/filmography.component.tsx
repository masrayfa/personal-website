import React from 'react';
import { filmographys } from '../constants';

interface Props {
  title: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'gif';
}

const FilmographyComponent = (props: Props) => {
  const [hovered, setHovered] = React.useState(false);
  const [mediaLoaded, setMediaLoaded] = React.useState(false);
  const [mediaError, setMediaError] = React.useState(false);

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div>
        <h2 className="text-4xl">Filmography</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      {/* List of Contents */}
      <ul className="flex flex-col space-y-20">
        {filmographys.map((film) => (
          <li>
            <div className="w-full">
              <div className="relative w-full max-h-56 aspect-video bg-gray-100 border-2 border-black overflow-hidden group">
                {film.mediaUrl && !mediaError ? (
                  <div>{film.mediaUrl}</div>
                ) : (
                  <>
                    <div>Reviews Placeholder</div>
                  </>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="mt-4 space-y-2">
              <h3 className="text-xl font-bold">{film.title}</h3>

              {film.desc && (
                <p className="text-sm text-gray-600">{film.desc}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmographyComponent;
