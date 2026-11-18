// Temporary placeholders using existing assets until new images are added
import surfingImg from '../assets/media__1782216943734.webp';
import supImg from '../assets/elegant_hero_bg.webp';
import singleKayakImg from '../assets/mankayak.webp';
import doubleKayakImg from '../assets/kidkayak.webp';

export const WHATSAPP_BASE_URL = 'https://wa.me/919791351801';

export const buildLessonWhatsAppUrl = (lessonTitle) => {
  const message = `Hello East Coast Surf and Paddle,\n\nI would like to know more about your ${lessonTitle} lessons and available slots.\n\nThank you.`;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
};

export const LESSONS = [
  {
    slug: 'surfing',
    title: 'Surfing',
    subtitle: 'Group & Private Wave Coaching',
    image: surfingImg,
    startingPrice: 'From Rs. 1600',
    duration: '90 mins',
    shortDescription:
      'Catch your first wave or level up your technique with certified instructors in Pondicherry.',
    heroDescription:
      'Detailed Surfing curriculum, wave conditions, gear checklist, and session schedule will be added here.',
    packages: [
      {
        id: 'surf-group',
        name: 'Group Surfing Lessons',
        price: 'Rs. 1600',
        duration: '90 mins',
        image: surfingImg,
        description: 'Learn to ride the waves in a fun group environment.',
      },
      {
        id: 'surf-private',
        name: 'Private Surfing Lessons',
        price: 'Rs. 2000',
        duration: '90 mins',
        image: surfingImg,
        description: 'Get personalized 1-on-1 coaching to master surfing faster.',
      },
    ],
  },
  {
    slug: 'sup',
    title: 'SUP',
    subtitle: 'Stand-Up Paddling Adventures',
    image: supImg,
    startingPrice: 'Rs. 1800',
    duration: '90 mins',
    shortDescription:
      'Glide across calm coastal waters and sunrise horizons on a stand-up paddle board.',
    heroDescription:
      'Detailed SUP session guide, best sunrise timings, balance tips, and route highlights will be added here.',
    packages: [
      {
        id: 'sup-standard',
        name: 'Stand-Up Paddling (SUP)',
        price: 'Rs. 1800',
        duration: '90 mins',
        image: supImg,
        description: 'Enjoy peaceful paddling while exploring the beauty of the sea.',
      },
    ],
  },
  {
    slug: 'kayaking',
    title: 'Kayaking',
    subtitle: 'Sea & Mangrove Kayaking',
    image: doubleKayakImg,
    startingPrice: 'From Rs. 1200',
    duration: '90 mins',
    shortDescription:
      'Explore scenic Pondicherry coastlines and tranquil mangrove trails solo or with a partner.',
    heroDescription:
      'Detailed Sea & Mangrove Kayaking trails, safety briefing, timings, and photo spots will be added here.',
    packages: [
      {
        id: 'kayak-sea-single',
        name: 'Single Seater Sea Kayaking',
        price: 'Rs. 1500',
        duration: '90 mins',
        image: singleKayakImg,
        description: 'Perfect for solo adventurers who love exploring the water.',
      },
      {
        id: 'kayak-sea-double',
        name: 'Double Seater Sea Kayaking',
        price: 'Rs. 2500',
        duration: '90 mins',
        image: doubleKayakImg,
        description: 'Share the adventure and enjoy memorable moments together.',
      },
      {
        id: 'kayak-mangrove-single',
        name: 'Mangrove Single Seater',
        price: 'Rs. 1200',
        duration: '90 mins',
        image: singleKayakImg,
        description: 'Explore the serene mangroves at your own pace.',
      },
      {
        id: 'kayak-mangrove-double',
        name: 'Mangrove Double Seater',
        price: 'Rs. 2500',
        duration: '90 mins',
        image: doubleKayakImg,
        description: 'Paddle through the beautiful mangroves with a partner.',
      },
    ],
  },
];

export const getLessonBySlug = (slug) =>
  LESSONS.find((lesson) => lesson.slug === slug) || null;
