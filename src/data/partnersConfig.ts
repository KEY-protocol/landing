export type PartnerIconKey = 'fund' | 'utn' | 'nerdconf' | 'latinhack';

export interface Partner {
  name: string;
  iconKey: PartnerIconKey;
  href: string;
}

export const PARTNERS: Partner[] = [
  {
    name: 'Fundación Gran Chaco',
    iconKey: 'fund',
    href: 'https://gran-chaco.org/es/home/',
  },
  {
    name: 'UTN - Universidad Tecnológica Nacional',
    iconKey: 'utn',
    href: 'https://www.utn.edu.ar',
  },
  {
    name: 'NerdConf',
    iconKey: 'nerdconf',
    href: 'https://nerdconf.com',
  },
  {
    name: 'LatinHack',
    iconKey: 'latinhack',
    href: 'https://latinhack.io/',
  },
];
