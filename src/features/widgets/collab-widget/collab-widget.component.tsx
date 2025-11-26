import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { PiCallBell } from 'react-icons/pi';

const CollabWidget = () => {
  return (
    <div className="p-5">
      <Link to="https://cal.com/sani.d.uong/30min" target="_blank">
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
      </Link>
    </div>
  );
};

export default CollabWidget;
