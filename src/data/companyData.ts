import { OfficeLocation } from '../types.ts';

export const officeLocations: OfficeLocation[] = [
  {
    city: { en: 'OFOQ Digital Team', ar: 'فريق أفق الرقمي' },
    country: { en: 'Contact us from anywhere', ar: 'تواصل معنا من أي مكان' },
    address: {
      en: 'We work remotely and coordinate with clients online. Contact us by phone or WhatsApp.',
      ar: 'نعمل عن بُعد ونتواصل مع العملاء عبر الإنترنت. يمكنك التواصل معنا هاتفيًا أو عبر واتساب.'
    },
    phone: '+201101774594',
    email: 'harammasr54@gmail.com',
    hours: { en: 'Contact hours may vary', ar: 'قد تختلف أوقات الرد' },
    isHQ: true
  }
];

// Add named team members only after OFOQ confirms their identities, roles, and biographies.
export const leadershipTeam: { name: string; role: { en: string; ar: string }; credentials: string; bio: { en: string; ar: string } }[] = [];
