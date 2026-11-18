export interface ChapterMeta {
  id: number;
  shortTitle: string;
  royalTitle: string;
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 1, shortTitle: 'Invitation', royalTitle: 'The Royal Invitation' },
  { id: 2, shortTitle: 'Proclamation', royalTitle: 'The Royal Proclamation' },
  { id: 3, shortTitle: 'Mood Lifter', royalTitle: 'The Princess Mood Lifter' },
  { id: 4, shortTitle: 'Urdu Shayari', royalTitle: 'Eight Urdu Shayaris for Tashu' },
  { id: 5, shortTitle: 'Memories', royalTitle: 'The Royal Memory Gallery' },
  { id: 6, shortTitle: 'Treats', royalTitle: 'Princess Treasure Chest' },
  { id: 7, shortTitle: 'Shayari', royalTitle: 'Shayari Mehfil' },
  { id: 8, shortTitle: 'Dua & Promise', royalTitle: 'Dil Ki Dua & Forever Promise' },
  { id: 9, shortTitle: 'Royal Finale', royalTitle: 'The Grand Royal Finale' },
  { id: 10, shortTitle: 'Our Future', royalTitle: 'Our Future Together' },
  {
    id: 11,
    shortTitle: "Tashu's World",
    royalTitle: 'How Well Does Bilal Know His Princess?',
  },
];

export const CORE_MESSAGE =
  'Duniya mein bohat si princesses hongi, lekin mere liye meri duniya ki sab se khoobsurat princess sirf Ap hain, Tashu.';

export const INVITATION_COPY = {
  prelude: 'EK KHAS PAIGHAM SIRF EK KHAS SHAKHS KE LIYE...',
  salutationLines: [
    'MERI PRINCESS',
    'MERI BACHAW',
    'MERI HONE WALI زَوْجَة',
    'TASHU',
  ],
  body: 'Apko nihayat mohabbat aur izzat ke saath dawat di jati hai ek aisi duniya mein jahan sirf Apki muskurahat, Apki khushi aur Apki khoobsurati ka jashan manaya jayega.',
  cta: 'WEAR YOUR ROYAL CROWN 👑',
};

export const PROCLAMATION_COPY = {
  dateBadge: '18 November · National Princess Day',
  title: '18 NOVEMBER — THE DAY OF MY PRINCESS',
  mainDeclaration:
    'Aaj ka din sirf ek tareekh nahi, balkay meri duniya ki sab se khaas Princess ko celebrate karne ka din hai.',
  paragraphs: [
    'Meri Princess Tashu, kisi ko malika ya shehzadi banne ke liye sone ke mahal ya heeron ke taaj ki zaroorat nahi hoti. Apki apni masoomiyat, Apka naram lehja, aur Apki ek pyaari si muskurahat hi Apko har kisi se munfarid aur sab se khaas bana deti hai.',
    'Meri Bachaw, jab Ap hansti hain toh lagta hai poori kainaat mein sukoon utar aaya ho. Apki maujoodgi meri zindagi ki sab se khoobsurat rehmat hai — har roz, har lamha.',
  ],
  romanCouplet:
    'Na taaj ki zaroorat, na kisi mahal ki khwahish,\nApki muskurahat hi meri duniya ki sab se haseen numaish.',
  urduScriptLine1: 'نہ تاج کی ضرورت، نہ کسی محل کی خواہش',
  urduScriptLine2: 'آپ کی مسکراہٹ ہی میری دنیا کی سب سے حسین نمائش',
};

export interface UrduShayariCardData {
  id: string;
  number: string;
  label: string;
  urduLines: string[];
}

export const EIGHT_URDU_SHAYARIS: UrduShayariCardData[] = [
  {
    id: 'shayari-01',
    number: '01',
    label: 'SHAYARI 01',
    urduLines: [
      'آپ کی ذات کا احساس بھی کمال رکھتا ہے',
      'میرا دل آپ کے لیے بے مثال خیال رکھتا ہے',
    ],
  },
  {
    id: 'shayari-02',
    number: '02',
    label: 'SHAYARI 02',
    urduLines: [
      'آپ کی آنکھوں میں جو خواب نظر آتے ہیں',
      'وہی خواب میری زندگی کو حسین بناتے ہیں',
    ],
  },
  {
    id: 'shayari-03',
    number: '03',
    label: 'SHAYARI 03',
    urduLines: [
      'آپ کے تبسم سے روشن میری کائنات ہے',
      'آپ کی خوشی ہی میرے دل کی سب سے بڑی بات ہے',
    ],
  },
  {
    id: 'shayari-04',
    number: '04',
    label: 'SHAYARI 04',
    urduLines: [
      'حسن کی مثالیں بھی آپ کے آگے کم پڑ جائیں',
      'آپ کو دیکھ کر چاند ستارے بھی شرما جائیں',
    ],
  },
  {
    id: 'shayari-05',
    number: '05',
    label: 'SHAYARI 05',
    urduLines: [
      'آپ کے دل میں محبت کا جو احساس ہے',
      'میری ہر دعا میں اسی محبت کا انعکاس ہے',
    ],
  },
  {
    id: 'shayari-06',
    number: '06',
    label: 'SHAYARI 06',
    urduLines: [
      'آپ کی سادگی میں بھی اک خاص ادا ہے',
      'آپ جیسا کوئی نہیں، یہ دل کی صدا ہے',
    ],
  },
  {
    id: 'shayari-07',
    number: '07',
    label: 'SHAYARI 07',
    urduLines: [
      'میری ہر خوشی کا تعلق آپ سے ہے',
      'میرے دل کا ہر خوبصورت خواب آپ سے ہے',
    ],
  },
  {
    id: 'shayari-08',
    number: '08',
    label: 'SHAYARI 08',
    urduLines: [
      'نہ تاج چاہیے، نہ کسی محل کی آرزو ہے',
      'میری دنیا کی سب سے حسین شہزادی صرف آپ ہیں',
    ],
  },
];

export interface VoucherData {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  description: string;
  promiseNote: string;
  claimStamp?: string;
}

export const PRINCESS_VOUCHERS: VoucherData[] = [
  {
    id: 'care',
    code: 'ROYAL-01',
    title: 'UNLIMITED CARE & ATTENTION',
    description: 'Apki khushi aur sukoon ka khayal rakhna meri priority hai.',
    promiseNote: 'Valid Forever · Redeemable Every Single Day',
  },
  {
    id: 'talks',
    code: 'ROYAL-02',
    title: '24/7 AVAILABLE FOR AP ❤️',
    subtitle: 'SIRF APKE LIYE',
    description:
      'Jaan, main Apke liye 24/7 available hoon. Jab bhi Apko meri zaroorat ho, chahe din ho ya raat, Ap mujhe apne saath payengi. Apki har baat sunne, Apko samajhne aur Apka khayal rakhne ke liye main hamesha hazir hoon. Meri Princess, main sirf Apka hoon. ❤️',
    promiseNote: 'Valid Anytime · Bilal Always Listening',
    claimStamp: 'ALWAYS AVAILABLE — ONLY FOR TASHU ❤️',
  },
  {
    id: 'movie',
    code: 'ROYAL-03',
    title: 'VIRTUAL MOVIE & DRAMA DATE',
    description: 'Apki pasand ka drama, movie aur mera saath.',
    promiseNote: 'Your Choice Only · Popcorn & Cozy Vibes',
  },
  {
    id: 'always',
    code: 'ROYAL-04',
    title: 'ALWAYS BY YOUR SIDE',
    description:
      'Khushi ho ya mushkil waqt, main Apka saath dene ki poori koshish karunga.',
    promiseNote: 'Lifelong Commitment · With Respect & Love',
  },
];

export interface ShayariPiece {
  id: string;
  theme: string;
  title: string;
  romanCouplets: string[];
  urduCouplet: string;
  footnote: string;
}

export const SHAYARI_COLLECTION: ShayariPiece[] = [
  {
    id: 'aankhein',
    theme: 'Apki Aankhein',
    title: 'Nigaahon Ka Sukoon',
    romanCouplets: [
      'Apki aankhon mein jo dekha hai woh khwab nahi lagta,\nApke siwa ab koi bhi khaas nahi lagta.',
      'Chashmay ke peeche se jab Ap muskurati hain Tashu,\nPhir chand bhi mujhe itna haseen nahi lagta.',
    ],
    urduCouplet: 'آپ کی آنکھوں میں جو دیکھا ہے وہ خواب نہیں لگتا\nآپ کے سوا اب کوئی بھی خاص نہیں لگتا',
    footnote: 'Meri Princess ki aankhon ke naam',
  },
  {
    id: 'muskurahat',
    theme: 'Apki Muskurahat',
    title: 'Har Shaam Ki Roshni',
    romanCouplets: [
      'Apki hansi se roshan meri har shaam rahe,\nMeri har dua mein Apka hi naam rahe.',
      'Ghamon ki dhoop kabhi chhoo na sake Apko,\nMeri Bachaw ke labon par bas muskaan rahe.',
    ],
    urduCouplet: 'آپ کی ہنسی سے روشن میری ہر شام رہے\nمیری ہر دعا میں آپ کا ہی نام رہے',
    footnote: 'Sirf Apki muskurahat ke liye',
  },
  {
    id: 'khoobsurati',
    theme: 'Apki Khoobsurati',
    title: 'Haseen Tareen Princess',
    romanCouplets: [
      'Saadgi mein bhi Apka husn bemisaal lagta hai,\nHar rang Apke pehanne se kamaal lagta hai.',
      'Duniya dhoondhti hai phoolon mein khoobsurati,\nMujhe toh Apka har andaaz lajawaab lagta hai.',
    ],
    urduCouplet: 'سادگی میں بھی آپ کا حسن بے مثال لگتا ہے\nمجھے تو آپ کا ہر انداز لاجواب لگتا ہے',
    footnote: 'Meri duniya ki sab se khoobsurat shehzadi',
  },
  {
    id: 'dil',
    theme: 'Mere Dil Mein Apki Jagah',
    title: 'Hamesha Sirf Ap',
    romanCouplets: [
      'Lafzon mein kaise bayaan karun ke Ap kya hain mere liye,\nAp woh dua hain jo maangi hai maine har sajde ke liye.',
      'Meri Jaan, meri izzat, meri hone wali زَوْجَة hain Ap,\nYeh dil sirf dhadakta hai Apke saath jeene ke liye.',
    ],
    urduCouplet: 'یہ دل صرف آپ کے نام کی دعا کرتا ہے\nآپ کے ساتھ ہی ہر خوبصورت کل کی تمنا کرتا ہے',
    footnote: 'Bilal ke dil ki gehraai se',
  },
];

export const FOREVER_LETTER = {
  title: 'MERI SAB SE KHOOBSURAT DUA — AP',
  salutation: 'Meri Pyaari Princess, Meri Bachaw Tashu,',
  paragraphs: [
    'Aaj National Princess Day ke is khaas mauqe par main bas itna kehna chahta hoon ke Ap meri zindagi ki sab se khoobsurat aur qeemti naimat hain. Duniya mein bohat si princesses hongi, lekin mere liye meri duniya ki sab se khoobsurat princess sirf Ap hain, Tashu.',
    'Apki khushi, Apka sukoon aur Apke khwab mere liye bohat ahmiyat rakhte hain. Main hamesha chahta hoon ke Ap khud ko mehfooz, izzatdaar aur sab se zyada special mehsoos karein — kyunki Ap waqai har khushi ke laiq hain.',
    'Jaan, meri dua hai ke Apki zindagi hamesha khushiyon, sukoon aur kamyabi se bhari rahe. Allah Apko har buri nazar aur har pareshani se mehfooz rakhe.',
    'Main Apke har ehsaas, Apki pasand aur Apke har khwab ki dil se izzat karta hoon. Meri niyat paak hai, aur mera har irada Apke saath ek izzat aur mohabbat bhari zindagi guzarne ka hai.',
  ],
  nikahPromise:
    'Insha Allah hamara Nikah bohat jald hoga, aur Ap hamesha ke liye meri زَوْجَة ban kar meri zindagi ka hissa rahengi. Main dua karta hoon ke Allah hamare rishte ko izzat, mohabbat, barkat aur sukoon ata farmaye. Ameen.',
  signatureLead: 'With All My Love,',
  signatureName: 'Apka Bilal ❤️',
};

export const SECRET_LETTER_TEASER = {
  heading: 'EK KHAT SIRF MERI PRINCESS KE NAAM ❤️',
  subheading:
    'Is khat mein woh baatein hain jo shayad main har baar lafzon mein bayan nahi kar pata.',
  recipient: 'TO MY DEAREST TASHU',
  sender: 'WITH LOVE, BILAL',
  unlockCta: 'UNLOCK YOUR SECRET LETTER 🔐',
  passwordHeading: 'YEH CHHOTA SA RAAZ SIRF APKE LIYE HAI',
  passwordPlaceholder: 'Enter Your Secret Password',
  unlockSubmitCta: 'UNLOCK MY LETTER',
  goBackCta: 'GO BACK',
  returnCta: 'Return to Royal World',
  readAgainCta: 'READ MY LETTER AGAIN ❤️',
};

export interface FutureMilestone {
  id: 'nikkah' | 'umrah' | 'makkah' | 'karbala';
  number: string;
  label: string;
  heading: string;
  caption: string;
  message: string;
  locationBadge: string;
}

export const FUTURE_JOURNEY_COPY = {
  chapterBadge: 'CHAPTER 10 · OUR FOREVER JOURNEY',
  title: 'OUR FUTURE TOGETHER',
  subtitle: 'MERI SAB SE KHOOBSURAT KHWAHISHEIN, SIRF APKE SAATH',
  intro:
    'Meri Princess Tashu, zindagi mein log bohat se khwab dekhte hain... lekin mere har khwab, har dua aur har aane wale kal mein sirf ek hi chehra hai — aur woh Ap hain, Meri Jaan.',
  milestones: [
    {
      id: 'nikkah',
      number: '01',
      label: 'MILESTONE 01 — OUR NIKKAH 💍',
      heading: 'THE DAY OUR FOREVER BEGINS',
      caption: 'ONE PROMISE, TWO HEARTS, ONE BEAUTIFUL FUTURE.',
      locationBadge: 'Insha Allah · Our Sacred Beginning',
      message:
        'Woh din jab Allah ki rehmat aur buzurgon ki duaon ke saaye mein hum ek paak rishte mein bandh jayenge. Jab Ap sirf mere khwabon ki nahi, meri zindagi ki hamesha ki زَوْجَة ban jayengi. Us din ke liye har namaz aur har dua mein sirf shukar aur mohabbat hai, Meri Princess.',
    },
    {
      id: 'umrah',
      number: '02',
      label: 'MILESTONE 02 — OUR FIRST UMRAH 🕋',
      heading: 'OUR FIRST UMRAH TOGETHER',
      caption: 'A BEAUTIFUL JOURNEY OF FAITH AND GRATITUDE.',
      locationBadge: 'Haram Sharif · Peace & Gratitude',
      message:
        'Nikah ke baad mera sab se paak aur khoobsurat khwab yeh hai ke main Apka haath thaam kar Khana Kaaba ke samne khada hoon — aur hum dono Allah ka shukar ada karein ke Usne humein ek doosre ka hamsafar banaya. Imaan, sukoon aur barkat se bhara hamara pehla safar, sirf Apke saath.',
    },
    {
      id: 'makkah',
      number: '03',
      label: 'MILESTONE 03 — OUR FIRST TRIP TO MAKKAH ❤️',
      heading: 'OUR FIRST DREAM TRIP TO MAKKAH',
      caption: 'MY FAVOURITE DESTINATION WOULD BE ANYWHERE WITH AP.',
      locationBadge: 'Makkah Al-Mukarramah · Pure Serenity',
      message:
        'Duniya bhar ki saari khoobsurat jagahon se barh kar mere dil ki tamanna hai ke hamara pehla safar Makkah ki paak fizaon mein ho. Subah ki azaan, raat ka sukoon, aur har qadam par Apka saath — kyunki mere liye jannat jaisa sukoon wahan hai jahan Ap mere paas hon, Tashu.',
    },
    {
      id: 'karbala',
      number: '04',
      label: 'MILESTONE 04 — OUR DREAM JOURNEY TO KARBALA',
      heading: 'OUR DREAM ZIYARAT TO KARBALA',
      caption: 'A JOURNEY OF LOVE, FAITH AND REMEMBRANCE.',
      locationBadge: 'Karbala Al-Muqaddasa · Sacred Devotion',
      message:
        'Dil ki ek gehri aur roohani khwahish yeh bhi hai ke hum dono mil kar Karbala ki paak sarzameen par hazri dein — ishq, wafa aur sabr ki is azim misaal ke samne Apke saath khade ho kar hamare rishte aur aane wali zindagi ki khair o barkat ki dua maangein.',
    },
  ] as FutureMilestone[],
  closingPrayer: [
    'MERI PRINCESS,',
    'YE SIRF KHWAHISHEIN NAHI,',
    'YE MERI HAR ROZ KI DUAIN HAIN.',
    'ALLAH HAMARE RISHTE KO HAMESHA PAKEEZAH RAKHE,',
    'HUMEIN EK DOOSRE KA SAHARA BANAYE,',
    'AUR HAMARE HAR KHWAB KO HAQEEQAT BANAYE.',
    'AMEEN YA RABBAL AALAMEEN. ❤️',
  ],
  closingSignatureLine1: 'IN EVERY DREAM, I SEE AP BESIDE ME.',
  closingSignatureLine2: 'ALWAYS YOURS, BILAL ❤️',
};

export interface TashuDreamCar {
  id: 'civic' | 'land-cruiser' | 'bmw';
  name: string;
  tagline: string;
  caption: string;
}

export interface TashuHabit {
  id: string;
  title: string;
  reaction: string;
}

export interface TashuSong {
  id: string;
  number: string;
  title: string;
  /**
   * Bilal: To play legally obtained audio files, place the .mp3/.m4a file inside
   * /public/audio/ and set audioSrc (e.g. '/audio/aey-zindagi.mp3').
   * Or set officialUrl to an official streaming link.
   */
  audioSrc?: string;
  officialUrl?: string;
}

export interface PersonalFavouriteRevealItem {
  id:
    | 'colour'
    | 'food'
    | 'drink'
    | 'place'
    | 'countries'
    | 'cars'
    | 'songs'
    | 'habits';
  number: string;
  category: string;
  answer: string;
  romanCaption: string;
}

export const TASHU_PERSONAL_WORLD = {
  chapterBadge: "CHAPTER 11 · TASHU'S PERSONAL WORLD",
  title: 'HOW WELL DOES BILAL KNOW HIS PRINCESS?',
  subtitle: 'HER FAVOURITES, HER DREAMS & HER LITTLE WORLD ❤️',
  profile: {
    birthday: '11 March 2004',
    favouriteColours: ['Black', 'Navy Blue'],
    favouriteFood: 'Spaghetti',
    favouriteDrink: 'Mango Shake',
    favouritePlace: 'Islamabad, Pakistan',
    dreamCountries: ['South Korea', 'Turkey'],
  },
  dreamCars: [
    {
      id: 'civic',
      name: 'Honda Civic',
      tagline: 'Sleek Elegance · Obsidian Grace',
      caption: 'Jab Meri Princess chalaingi, toh har raasta aur haseen lagega.',
    },
    {
      id: 'land-cruiser',
      name: 'Toyota Land Cruiser',
      tagline: 'Royal Presence · Unstoppable Comfort',
      caption: 'Apki shaan aur sukoon ke liye ek behtareen royal safar.',
    },
    {
      id: 'bmw',
      name: 'BMW',
      tagline: 'Midnight Navy Luxury · Pure Class',
      caption: 'Apki favourite navy blue aur black class ke bilkul mutabiq.',
    },
  ] as TashuDreamCar[],
  habits: {
    heading: 'THE LITTLE THINGS BILAL LOVES ABOUT TASHU',
    items: [
      {
        id: 'listening',
        title: 'Apka Bilal ki baatein ghour se sunna.',
        reaction: 'Jab Ap itni tawajjo se sunti hain, toh dil khush ho jata hai.',
      },
      {
        id: 'smile',
        title: 'Apki pyari si muskurahat.',
        reaction: 'Yeh ek muskurahat mera poora din roshan kar deti hai.',
      },
      {
        id: 'understanding',
        title: 'Bilal ki baaton ko samajhna.',
        reaction: 'Apka bina kahe dil ki baat samajh lena sab se khaas hai.',
      },
      {
        id: 'scolding',
        title: 'Apka Bilal ko pyaar se daantna.',
        reaction: 'Apki us pyaari si daant mein bhi sirf mohabbat aur fikr hoti hai.',
      },
    ] as TashuHabit[],
    quote:
      'Jaan, Apki ye choti choti aadatein mere liye bohat khaas hain. Kabhi Apka meri baat ghour se sunna, kabhi Apka muskurana aur kabhi mujhe daantna — yehi toh woh choti choti baatein hain jo Apko meri nazron mein itna khaas banati hain.',
  },
  songs: [
    {
      id: 'song-1',
      number: '01',
      title: 'Aey Zindagi',
      audioSrc:
        '/assets/aistudio/Aey_Zindagi_Ye_Bataa_KoshalWorld.Com__82a68f43.mp3',
    },
    {
      id: 'song-2',
      number: '02',
      title: 'Main Agar Samne',
      audioSrc:
        '/assets/aistudio/Main_Agar_Saamne_Raaz_128_Kbps_04198f93.mp3',
    },
    {
      id: 'song-3',
      number: '03',
      title: 'Dhoondne Ko Zamane',
      audioSrc:
        '/assets/aistudio/Main_Dhoondne_Ko_Zamaane_Mein_Heartless_128_Kbps_9e065ea9.mp3',
    },
    {
      id: 'song-4',
      number: '04',
      title: 'Kam Zarf',
      audioSrc: '/assets/aistudio/Kamzarf-OST-SnapYT.App_02348e26.mp3',
    },
    {
      id: 'song-5',
      number: '05',
      title: 'Mehroo Mehroo',
      audioSrc:
        '/assets/aistudio/Ost_Super_Nani_Darshan_Rathod_Shreya_Ghoshal_-_Maheroo_Maheroo_DownloadMing.SE__mp3.pm__477eb222.mp3',
    },
    {
      id: 'song-6',
      number: '06',
      title: 'Tum Bin 2',
      audioSrc:
        '/assets/aistudio/Tum_Bin_2_-_Ishq_Mubarak__mp3.pm__9158cb01.mp3',
    },
    {
      id: 'song-7',
      number: '07',
      title: 'Kuch Kuch Hota Hai',
      audioSrc:
        '/assets/aistudio/Kuch_Kuch_Hota_Hai__Sad__KoshalWorld.Com__4575b0ee.mp3',
    },
  ] as TashuSong[],
  reveals: [
    {
      id: 'colour',
      number: '01',
      category: 'Favourite Colour',
      answer: 'Black & Navy Blue',
      romanCaption:
        'Kaala aur Navy Blue — bilkul Apki tarah classy, gehra aur lajawaab.',
    },
    {
      id: 'food',
      number: '02',
      category: 'Favourite Food',
      answer: 'Spaghetti',
      romanCaption:
        'Jab bhi Apki pasand ki Spaghetti ho, har bite mein Apki muskurahat yaad aati hai.',
    },
    {
      id: 'drink',
      number: '03',
      category: 'Favourite Drink',
      answer: 'Mango Shake',
      romanCaption:
        'Thanda aur meetha Mango Shake — meri Princess ke liye meri pasandeeda treat.',
    },
    {
      id: 'place',
      number: '04',
      category: 'Favourite Place',
      answer: 'Islamabad, Pakistan',
      romanCaption:
        'Islamabad ki haseen shaamein aur Apki khamosh khushiyan mere dil ke kareeb hain.',
    },
    {
      id: 'countries',
      number: '05',
      category: 'Dream Countries',
      answer: 'South Korea & Turkey',
      romanCaption:
        'Insha Allah South Korea aur Turkey ki galiyan bhi ek din Apke saath dekhni hain.',
    },
    {
      id: 'cars',
      number: '06',
      category: 'Dream Cars',
      answer: 'Honda Civic · Toyota Land Cruiser · BMW',
      romanCaption:
        'Har safar aur har manzil tabhi haseen hai jab steering aur saath dono khaas hon.',
    },
    {
      id: 'songs',
      number: '07',
      category: 'Favourite Songs',
      answer: '7 Timeless Melodies',
      romanCaption:
        'Aey Zindagi se Kuch Kuch Hota Hai tak — har sur mein Apki yaad basi hai.',
    },
    {
      id: 'habits',
      number: '08',
      category: 'Her Adorable Habits',
      answer: 'Sunna · Muskurana · Samajhna · Pyaar Se Daantna',
      romanCaption:
        'Apki yehi masoom aadatein Apko meri duniya ki sab se pyari Princess banati hain.',
    },
  ] as PersonalFavouriteRevealItem[],
  specialMessageParagraphs: [
    'TASHU, APKI PASAND KI HAR CHOTI BAAT MERE LIYE KHAAS HAI. APKO KYA PASAND HAI, APKO KYA KHUSH KARTA HAI, APKE CHEHRE PAR MUSKURAHAT KIS BAAT SE AATI HAI — MAIN IN SAB BAATON KO YAAD RAKHNA CHAHTA HOON.',
    'KYUNKE AP SIRF MERI PRINCESS NAHI, MERI DUNIYA KA BOHAT KHOOBSURAT HISSA HAIN.',
  ],
  specialMessageSignature: 'WITH LOVE, APKA BILAL ❤️',
};


