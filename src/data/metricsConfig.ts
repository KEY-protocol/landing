export interface MetricData {
  id: string;
  imageSrc: string;
  imageSrcWebp: string;
  imageAlt: string;
}

export const METRICS_CONFIG: MetricData[] = [
  {
    id: 'investment',
    imageSrc: '/imgs/index/image_1.jpg',
    imageSrcWebp: '/imgs/index/image_1.webp',
    imageAlt: 'Agricultural field',
  },
  {
    id: 'savings',
    imageSrc: '/imgs/index/image_2.jpg',
    imageSrcWebp: '/imgs/index/image_2.webp',
    imageAlt: 'Forest landscape',
  },
  {
    id: 'organizations',
    imageSrc: '/imgs/index/image_3.jpg',
    imageSrcWebp: '/imgs/index/image_3.webp',
    imageAlt: 'Rural scene',
  },
  {
    id: 'identities',
    imageSrc: '/imgs/index/image_4.jpg',
    imageSrcWebp: '/imgs/index/image_4.webp',
    imageAlt: 'Person working in field',
  },
];
