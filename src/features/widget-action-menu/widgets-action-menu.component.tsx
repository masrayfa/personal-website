import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { IWidgetsActionMenu } from './widgets-action-menu.interface';

const WidgetsActionMenu = ({ widgets }: IWidgetsActionMenu) => {
  return (
    <div className="p-10">
      <p className="mb-5">here's your widget</p>

      <ul className="grid grid-cols-3 gap-10">
        {widgets.map((widget) => (
          <li
            key={widget.id}
            className="flex flex-col items-center justify-center"
          >
            <Link to={widget.url}>
              <Button
                type="button"
                variant={'outline'}
                className="p-16 cursor-pointer rounded-none border border-black"
              ></Button>
              <p className="text-center">{widget.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetsActionMenu;
