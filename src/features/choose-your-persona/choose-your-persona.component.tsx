import { Button } from '@/components/ui/button';

const ChooseYourPersona = () => {
  return (
    <div className="pt-24">
      <div className="border-y flex">
        <div className="p-10 max-w-sm border-r border-black">
          <p className="text-4xl">Choose Your Persona</p>
        </div>

        <div className="flex flex-col items-stretch ">
          <Button
            variant={'ghost'}
            className="flex flex-1 pl-3 pr-16 cursor-pointer rounded-none border-b border-t border-black"
          >
            <p className="text-4xl self-end">Mas Rayfa</p>
          </Button>

          <Button
            variant={'ghost'}
            className="flex flex-1 pl-3 pr-16 cursor-pointer rounded-none border-b border-black"
          >
            <p className="text-4xl self-end">Sani Uong</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChooseYourPersona;
