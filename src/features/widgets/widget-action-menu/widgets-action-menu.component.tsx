import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { IWidgetsActionMenu } from './widgets-action-menu.interface';

const WidgetsActionMenu = ({ widgets }: IWidgetsActionMenu) => {
  return (
    <div className="p-5">
      <p className="mb-3 text-sm">here's your widget</p>

      <div className="flex flex-col gap-2">
        {widgets.map((widget) => (
          <Link
            key={widget.id}
            to={'/$widgetId'}
            params={{ widgetId: widget.url }}
          >
            <Button
              type="button"
              variant={'outline'}
              className="w-full cursor-pointer rounded-none border border-black justify-start p-8"
            >
              {widget.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WidgetsActionMenu;
