import { Button } from '@/components/ui/button';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

const Socials = () => {
  const { t } = useTranslation();

  const socials = [
    { icon: FaEnvelope, url: 'mailto:your@email.com' },
    { icon: FaLinkedin, url: 'https://linkedin.com' },
    { icon: FaXTwitter, url: 'https://twitter.com' },
    { icon: FaYoutube, url: 'https://youtube.com' },
    { icon: FaInstagram, url: 'https://instagram.com' },
    { icon: FaGithub, url: 'https://github.com' },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-center gap-3 mb-3">
        {socials.map((social, i) => (
          <Button
            key={i}
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-gray-100 rounded-none"
          >
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              <social.icon className="w-5 h-5" />
            </a>
          </Button>
        ))}
      </div>
      <p className="text-center text-xl ">{t('socials.title')}</p>
    </div>
  );
};

export default Socials;
