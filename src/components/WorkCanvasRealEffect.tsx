import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { VscLinkExternal } from 'react-icons/vsc';

interface WorkProjectCardProps {
  title: string;
  description?: string;
  techStack: string[];
  mediaUrl?: string; // URL untuk gambar, video, atau gif
  mediaType?: 'image' | 'video' | 'gif'; // Type media
  canvasColors?: [number, number, number][] | undefined | null; // Custom canvas colors
}

export function WorkProjectCard({
  title,
  description,
  techStack,
  mediaUrl,
  mediaType = 'image',
  canvasColors = [
    [236, 72, 153],
    [232, 121, 249],
  ],
}: WorkProjectCardProps) {
  const [hovered, setHovered] = React.useState(false);
  const [mediaLoaded, setMediaLoaded] = React.useState(false);
  const [mediaError, setMediaError] = React.useState(false);

  return (
    <div className="w-full">
      {/* Media Container */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full aspect-video bg-gray-100 border-2 border-black overflow-hidden group"
      >
        {/* Corner Icons */}
        <Icon className="absolute h-6 w-6 -top-3 -left-3 text-black z-30" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-black z-30" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 text-black z-30" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-black z-30" />

        {/* Media Content (Gambar/Video/GIF) */}
        {mediaUrl && !mediaError ? (
          <>
            {mediaType === 'video' ? (
              <video
                src={mediaUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setMediaLoaded(true)}
                onError={() => setMediaError(true)}
              />
            ) : (
              <img
                src={mediaUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onLoad={() => setMediaLoaded(true)}
                onError={() => setMediaError(true)}
              />
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
          </>
        ) : (
          // Fallback ke Canvas Effect jika tidak ada media atau error
          <>
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full w-full absolute inset-0"
                >
                  <CanvasRevealEffect
                    animationSpeed={3}
                    containerClassName="bg-black"
                    colors={canvasColors}
                    dotSize={2}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Placeholder Icon */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center transition-all duration-200 group-hover:-translate-y-4 group-hover:opacity-0">
                <ProjectIcon />
              </div>
              <h3 className="absolute text-xl font-bold opacity-0 group-hover:opacity-100 text-white transition-all duration-200 group-hover:-translate-y-2">
                {title}
              </h3>
            </div>
          </>
        )}
      </div>

      {/* Project Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
          <button className="text-sm hover:underline flex items-center gap-1">
            View
            <VscLinkExternal />
          </button>
        </div>

        {description && <p className="text-sm text-gray-600">{description}</p>}

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 border border-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Icon untuk corner decorations
const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

// Icon untuk placeholder project
const ProjectIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-gray-400 group-hover:text-white transition-colors"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};
