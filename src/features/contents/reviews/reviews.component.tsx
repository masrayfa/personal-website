import React, { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import ReviewsMDsCollections from './md';
import { useFilterStore } from '@/stores/filter-store';
import { filterCollections } from '@/lib/utils/filter-collections';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-provider';
import { useTranslation } from 'react-i18next';

const ReviewsComponent = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { getActiveFilters } = useFilterStore();

  const activeFilters = getActiveFilters('reviews');

  // Get filtered collections if filters are active, otherwise use all collections
  const filteredCollections = filterCollections(
    ReviewsMDsCollections,
    'full',
    activeFilters
  );

  const reviews = filteredCollections.length > 0 ? filteredCollections : null;

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl">{t('reviews.title')}</h2>
          <p>{t('reviews.description')}</p>
        </div>
      </div>

      {/* List of Contents */}
      {activeFilters && reviews?.length! > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {reviews?.map((review) => (
            <div key={review.id}>
              <Link
                to={'/$widgetId/$contentId'}
                params={{ widgetId: 'reviews', contentId: String(review.id) }}
              >
                <div className="w-full">
                  <div
                    className={cn(
                      'relative w-full max-h-56 aspect-video bg-gray-100 border-2 overflow-hidden group flex justify-center items-center',
                      theme === 'dark' ? 'border-white' : 'border-black'
                    )}
                  >
                    {review.metadata.image_url && (
                      <img
                        src={review.metadata.image_url}
                        alt={review.metadata.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="mt-4 space-y-2">
                  <h3 className="text-xl font-bold">{review.metadata.title}</h3>

                  {review.metadata.desc && (
                    <p className="text-sm text-neutral-400">
                      {review.metadata.reviewType} • {review.metadata.desc}
                    </p>
                  )}

                  {review.metadata.genre && (
                    <div className="flex gap-2">
                      {review.metadata.genre.map((g) => (
                        <span
                          key={g}
                          className={cn(
                            'text-xs border px-2 py-1',
                            theme === 'dark'
                              ? 'bg-neutral-900 border-neutral-600 '
                              : 'bg-gray-100 border-gray-300 '
                          )}
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>{t('reviews.noReviewFound')}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsComponent;
