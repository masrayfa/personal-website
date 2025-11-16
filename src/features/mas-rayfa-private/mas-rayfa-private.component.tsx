import { useTranslation } from 'react-i18next';

const MasRayfaPrivate = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-2xl text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight">
            {t('masRayfaPrivate.title')}
          </h1>
          <p className="text-2xl text-muted-foreground">
            {t('masRayfaPrivate.subtitle')}
          </p>
        </div>

        <div className="space-y-4 text-lg">
          <p className="italic whitespace-pre-line">
            {t('masRayfaPrivate.quote')}
          </p>

          <p className="text-muted-foreground whitespace-pre-line">
            {t('masRayfaPrivate.message')}
          </p>
        </div>

        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            {t('masRayfaPrivate.accessDenied')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MasRayfaPrivate;
