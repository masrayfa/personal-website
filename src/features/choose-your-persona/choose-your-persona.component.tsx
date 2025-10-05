import { Button } from '@/components/ui/button';

const ChooseYourPersona = () => {
  return (
    <div className="pt-24">
      <div className="border-y flex">
        <div className="p-10 max-w-sm border-r ">
          <p className="text-4xl">choose your persona</p>
        </div>

        <div className="flex flex-col items-stretch ">
          <Button
            variant={'ghost'}
            className="flex flex-1 pl-3 pr-16 cursor-pointer rounded-none border-b"
          >
            <h1 className="text-4xl self-end">mas rayfa</h1>
          </Button>

          <Button
            variant={'ghost'}
            className="flex flex-1 pl-3 pr-16 cursor-pointer rounded-none "
          >
            <h1 className="text-4xl self-end">sani uong</h1>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChooseYourPersona;
