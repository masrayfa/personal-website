import { Button } from '@/components/ui/button';
import { MdOutlineDarkMode } from 'react-icons/md';

const GlobalWidget = () => {
  return (
    <div className="p-5 flex items-center justify-center gap-3">
      <Button
        type="button"
        variant={'outline'}
        className="px-4 py-2 cursor-pointer rounded-none border-2 border-black hover:bg-gray-50"
      >
        <p className="text-sm font-mono">EN</p>
      </Button>
      <Button
        type="button"
        variant={'outline'}
        className="px-4 py-2 cursor-pointer rounded-none border-2 border-black hover:bg-gray-50"
      >
        <MdOutlineDarkMode className="text-lg" />
      </Button>
    </div>
  );
};

export default GlobalWidget;
