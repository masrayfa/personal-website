import { Button } from '@/components/ui/button';
import { usePersonaStore } from '@/stores/persona-store';

const ChooseYourPersona = () => {
  const { selectedPersona, setPersona } = usePersonaStore();

  return (
    <div className="pt-24">
      <div className="border-y">
        <div className="p-5 border-b">
          <p className="text-xl font-bold">choose your persona</p>
        </div>

        <div className="flex flex-col">
          <Button
            variant={'ghost'}
            className={`p-4 cursor-pointer rounded-none border-b ${
              selectedPersona === 'mas-rayfa' ? 'bg-accent' : ''
            }`}
            onClick={() => setPersona('mas-rayfa')}
          >
            <span className="text-lg">mas rayfa</span>
          </Button>

          <Button
            variant={'ghost'}
            className={`p-4 cursor-pointer rounded-none ${
              selectedPersona === 'sani-uong' ? 'bg-accent' : ''
            }`}
            onClick={() => setPersona('sani-uong')}
          >
            <span className="text-lg">sani uong</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChooseYourPersona;
