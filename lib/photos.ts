export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

/**
 * Curated captions mapped by exact filename.
 * Any additional photos placed into /public/images/ (e.g. pic1.jpg, pic2.jpg)
 * are automatically discovered at render time and paired with romantic captions.
 */
export const PHOTO_CAPTIONS_BY_FILENAME: Record<
  string,
  { caption: string; tag: string }
> = {
  'HERHRR_00def715.jpeg': {
    caption: 'Apki aankhon mein ek alag hi duniya nazar aati hai.',
    tag: 'Royal Gaze',
  },
  'KODHD_9c4e4930.jpeg': {
    caption: 'Har tasveer mein Apka ek naya khoobsurat andaaz.',
    tag: 'Timeless Grace',
  },
  'MSLKFHF_73b3047b.jpeg': {
    caption: 'Surkh rang mein meri Princess bilkul malika lagti hain.',
    tag: 'Crimson Elegance',
  },
  'SJJ_90af793e.jpeg': {
    caption: 'Apki woh pyari si masoom ada jo seedha dil par asar karti hai.',
    tag: 'Cute Innocence',
  },
  'WhatsApp_Image_2026-11-14_at_1.10.23_AM_42dffaea.jpeg': {
    caption: 'Haathon par mehndi aur chehre par noor — MashaAllah.',
    tag: 'Mehndi Glow',
  },
  'WhatsApp_Image_2026-11-14_at_1.10.23_FFF_dab77c93.jpeg': {
    caption: 'Kaale rang ke libaas mein Apki khoobsurati aur nikhar aati hai.',
    tag: 'Velvet Charm',
  },
  'WhatsApp_Image_2026-11-14_at_1.10.24_AM_91e603b1.jpeg': {
    caption: 'Meri Bachaw ka yeh cute teddy andaaz sab se pyara hai.',
    tag: 'Cozy Princess',
  },
  'CUTIE_-_Copy_21d8aec7.jpeg': {
    caption: 'Apki saadgi aur masoomiyat meri sab se favourite feeling hai.',
    tag: 'Pure Sweetness',
  },
  'CUTIE_21d8aec7.jpeg': {
    caption: 'Apki saadgi aur masoomiyat meri sab se favourite feeling hai.',
    tag: 'Pure Sweetness',
  },
  'WhatsApp_Image_2026-11-14_at_1.10.26_AM_115ca1de.jpeg': {
    caption: 'Chashma, phool aur Ap — ek mukammal shayari lagti hain.',
    tag: 'Soft Daylight',
  },
  'WhatsApp_Image_2026-11-14_at_1.10.27_AM_5f762459.jpeg': {
    caption: 'Mehndi wale haathon ki haya mein bhi ek alag hi shaan hai.',
    tag: 'Royal Poise',
  },
  'WhatsApp_Image_2026-11-17_at_11.58.23_PM_19ad906a.jpeg': {
    caption: 'Meri Princess har andaaz mein bemisaal lagti hain.',
    tag: 'Radiant Smile',
  },
  'WOW_a4b902ce.jpeg': {
    caption: 'Yeh lamhe aur Apki yeh adaa mere liye bohat khaas hain.',
    tag: 'Evening Rose',
  },
  'F_-_Copy_8d4d8359.jpeg': {
    caption: 'Neelay rang mein chamakti hui meri zindagi ki sab se haseen tasveer.',
    tag: 'Sapphire Grace',
  },
  'FFF_-_Copy_17603fe0.jpeg': {
    caption: 'Har angle se Apki masoomiyat dil ko sukoon deti hai.',
    tag: 'Midnight Pearl',
  },
  'DNDJD_6cb20485.jpeg': {
    caption: 'Phoolon jaise rangon mein khilti hui Apki muskurahat.',
    tag: 'Floral Serenity',
  },
  'FVFVVVVV_-_Copy_efe06bca.jpeg': {
    caption: 'Apka yeh ba-waqar hijab aur pyaari si nazar — MashaAllah.',
    tag: 'Sacred Beauty',
  },
  'HEID_75f878ea.jpeg': {
    caption: 'Bina kisi takalluf ke bhi Ap duniya ki sab se khoobsurat princess hain.',
    tag: 'Natural Beauty',
  },
};

export const FALLBACK_GALLERY_PHOTOS: GalleryPhoto[] = Object.entries(
  PHOTO_CAPTIONS_BY_FILENAME
).map(([filename, meta], index) => ({
  id: `photo-${index + 1}`,
  src: `/assets/aistudio/${filename}`,
  alt: `Tashu — ${meta.tag}`,
  caption: meta.caption,
  tag: meta.tag,
}));
