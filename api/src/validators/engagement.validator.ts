import * as v from 'valibot';

export const createEngagementSchema = v.object({
  contentId: v.pipe(
    v.number('Content ID must be a number'),
    v.integer('Content ID must be an integer'),
    v.minValue(1, 'Content ID must be greater than 0')
  ),
});

export const updateEngagementSchema = v.object({
  likes: v.optional(
    v.pipe(
      v.number('Likes must be a number'),
      v.integer('Likes must be an integer'),
      v.minValue(0, 'Likes must be greater than or equal to 0')
    )
  ),
  claps: v.optional(
    v.pipe(
      v.number('Claps must be a number'),
      v.integer('Claps must be an integer'),
      v.minValue(0, 'Claps must be greater than or equal to 0')
    )
  ),
});

export const idParamSchema = v.object({
  id: v.pipe(
    v.string(),
    v.transform((val) => parseInt(val, 10)),
    v.number('ID must be a valid number'),
    v.integer('ID must be an integer'),
    v.minValue(1, 'ID must be greater than 0')
  ),
});

export const contentIdParamSchema = v.object({
  contentId: v.pipe(
    v.string(),
    v.transform((val) => parseInt(val, 10)),
    v.number('Content ID must be a valid number'),
    v.integer('Content ID must be an integer'),
    v.minValue(1, 'Content ID must be greater than 0')
  ),
});
