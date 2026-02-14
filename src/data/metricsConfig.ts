export interface ImpactCardData {
  id: string;
  imageSrc: string;
  imageSrcWebp: string;
  imageAlt: string;
}

export const IMPACT_CARDS_CONFIG: ImpactCardData[] = [
  {
    id: 'refi',
    imageSrc: '/imgs/index/image_1.jpg',
    imageSrcWebp: '/imgs/index/image_1.webp',
    imageAlt: 'Rural infrastructure with solar panels',
  },
  {
    id: 'digitalAsset',
    imageSrc: '/imgs/index/image_2.jpg',
    imageSrcWebp: '/imgs/index/image_2.webp',
    imageAlt: 'Field workers verifying impact',
  },
  {
    id: 'identity',
    imageSrc: '/imgs/index/image_3.jpg',
    imageSrcWebp: '/imgs/index/image_3.webp',
    imageAlt: 'Community onboarding process',
  },
  {
    id: 'poi',
    imageSrc: '/imgs/index/image_4.jpg',
    imageSrcWebp: '/imgs/index/image_4.webp',
    imageAlt: 'Agricultural field work and impact generation',
  },
];
