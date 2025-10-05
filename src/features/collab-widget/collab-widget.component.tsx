import { Button } from '@/components/ui/button';
import { PiCallBell } from 'react-icons/pi';

const CollabWidget = () => {
  return (
    <div className="p-5">
      <Button
        type="button"
        variant="outline"
        className="w-full py-3 text-sm font-mono border rounded-none hover:bg-gray-50 cursor-pointer"
      >
        <span className="mr-2">
          <PiCallBell />
        </span>
        let's collab
      </Button>
    </div>
  );
};

export default CollabWidget;
