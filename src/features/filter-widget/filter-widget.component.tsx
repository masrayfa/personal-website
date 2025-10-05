import { Button } from '@/components/ui/button';

const FilterWidget = ({ tags }: IFilterWidget) => {
  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <Button
            key={i}
            type="button"
            variant="outline"
            className={`
              px-4 py-2 text-sm font-mono
              border rounded-none cursor-pointer
              hover:bg-gray-50
              ${i === 0 ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' : ''}
            `}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterWidget;
