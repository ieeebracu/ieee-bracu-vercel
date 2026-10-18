export interface ChapterSummary {
  abbr: string;
  slug: string;
  name: string;
  desc: string;
  image: string;
}

export type Member = { name: string; role: string; image: string };
export type Newsletter = { year: string; href: string };

export type ChapterData = {
  slug: string;
  abbr: string;
  name: string;
  fullName: string;
  desc: string[];
  image: string;
  logo: string;
  founded: string;
  focus: string;
  counselor: { name: string; title: string; image?: string };
  advisor: { name: string; title: string; image?: string };
  eb: Member[];
  inaugReport?: string;
  membersHref: string;
  newsletters: Newsletter[];
};

export const chaptersDetailData: ChapterData[] = [
  {
    slug: "pes",
    abbr: "PES",
    name: "Power & Energy Society",
    fullName: "IEEE Power & Energy Society BRAC University Student Branch Chapter",
    desc: [
      "The Power & Energy Society (PES) chapter focuses on the science and practice of electric power generation, transmission, distribution, and utilization. As one of the most active chapters in the branch, PES regularly organizes seminars, workshops, and industrial tours to bridge classroom theory with real-world power engineering.",
      "Members gain exposure to smart grid technologies, renewable energy integration, power electronics, and energy policy — preparing them for careers in one of the most critical sectors of modern infrastructure.",
    ],
    image: "/assets/chapters/pes-cover.jpg",
    logo: "/assets/branding/pes-logo.png",
    founded: "2018",
    focus: "Power Systems · Renewables · Smart Grids",
    counselor: { name: "A.K.M Abdul Malek Azad, Ph.D.", title: "Branch Counselor", image: "/assets/people/branch-counselor.jpg" },
    advisor: { name: "Shahidul Islam Khan, Ph.D.", title: "Chapter Advisor", image: "/assets/people/Advisors/Shahidul-Islam-Khan.jpeg" },
    eb: [
      {
        name: "Bushra Anjum Priyota",
        role: "Chair",
        image: "/assets/people/executive-body-2026/Bushra-Anjum-Priyota.png",
      },
      {
        name: "Maisha Mahjabin Nidhi",
        role: "Vice Chair",
        image: "/assets/people/executive-body-2026/Maisha-Mahjabin-Nidhi.png",
      },
      {
        name: "Shahriar Ahmed",
        role: "Secretary",
        image: "/assets/people/executive-body-2026/Shahriar-Ahmed.png",
      },
      {
        name: "S M Sadab Sabah",
        role: "Treasurer",
        image: "/assets/people/executive-body-2026/Sadab-Sabah.png",
      },
    ],
    inaugReport: "https://drive.google.com/file/d/1LYYKmUMjyZBSsreBjX_Dw6rAXOWfRm_C/view?usp=sharing",
    membersHref: "/members?tab=eb&body=PES",
    newsletters: [
      { year: "2022", href: "https://drive.google.com/file/d/1TVA2Jqrk_QW9wg9DKgGW4iG8sduSVUXB/view?usp=sharing" },
      { year: "2021", href: "https://drive.google.com/file/d/1MB17ieiLhyir25LZug2crnRXAKtRYPNc/view?usp=sharing" },
      { year: "2020", href: "https://drive.google.com/file/d/1ecl9tT7HnKUhKPTCTeU7XtRFSfQc8SI9/view?usp=sharing" },
      { year: "2019", href: "https://drive.google.com/file/d/1BFpSI455KKf3jB3ux4Pi8pKtrwtvH3Be/view?usp=sharing" },
    ],
  },
  {
    slug: "cs",
    abbr: "CS",
    name: "Computer Society",
    fullName: "IEEE Computer Society BRAC University Student Branch Chapter",
    desc: [
      "The Computer Society (CS) chapter is the go-to community for students passionate about software engineering, artificial intelligence, competitive programming, and computing research.",
      "From introductory workshops on app development to advanced sessions on blockchain and machine learning, the chapter provides a structured pathway for students to grow their technical skills.",
    ],
    image: "/assets/chapters/cs-cover.jpg",
    logo: "/assets/branding/cs-logo.png",
    founded: "2019",
    focus: "Software · AI/ML · Competitive Programming",
    counselor: { name: "A.K.M Abdul Malek Azad, Ph.D.", title: "Branch Counselor", image: "/assets/people/branch-counselor.jpg" },
    advisor: { name: "Annajiat Alim Rasel", title: "Chapter Advisor", image: "/assets/people/Advisors/Annajiat-Alim-Rasel.jpg" },
    eb: [
      {
        name: "Sakibul Ahsan Teham",
        role: "Chair",
        image: "/assets/people/executive-body-2026/Sakibul-Ahsan-Teham.png",
      },
      {
        name: "Khandoker Tanjim Rahman",
        role: "Vice Chair",
        image: "/assets/people/executive-body-2026/Khandokar-Tanjim-Rahman.png",
      },
      {
        name: "Md. Ezhar Hossain",
        role: "Secretary",
        image: "/assets/people/executive-body-2026/Ezhar-Hossain.png",
      },
      {
        name: "Sannidhya Roy Sadhya",
        role: "Treasurer",
        image: "/assets/people/executive-body-2026/Sannidhya-Roy-Sadhya.png",
      },
    ],
    inaugReport: "https://drive.google.com/file/d/1dX3wbqTroqLeBWlgMjq-pys7JDORuTs1/view?usp=sharing",
    membersHref: "/members?tab=eb&body=CS",
    newsletters: [
      { year: "2022", href: "https://drive.google.com/file/d/1AHOKGKOd5QsGgcAAMq_IQzM7UtjrL6RC/view?usp=sharing" },
      { year: "2021", href: "https://drive.google.com/file/d/1xUNa7KqcspiEbVII1jUnkIIblCRJOV30/view?usp=sharing" },
      { year: "2020", href: "https://drive.google.com/file/d/1Puy0mISuh4QLD7LuMc-kaSjE9c65bzSh/view?usp=sharing" },
      { year: "2019", href: "https://drive.google.com/file/d/1-bnz3hjt-XSpd5KPiF6T92iXNizUe26S/view?usp=sharing" },
    ],
  },
  {
    slug: "ras",
    abbr: "RAS",
    name: "Robotics & Automation Society",
    fullName: "IEEE Robotics & Automation Society BRAC University Student Branch Chapter",
    desc: [
      "The Robotics & Automation Society (RAS) chapter brings together students interested in autonomous systems, control engineering, mechatronics, and hands-on robotics.",
      "The chapter organizes workshops on embedded systems, sensor integration, and ROS, along with participation in national and international robotics competitions.",
    ],
    image: "/assets/chapters/ras-cover.png",
    logo: "/assets/branding/ras-logo.png",
    founded: "2020",
    focus: "Robotics · Control Systems · Mechatronics",
    counselor: { name: "A.K.M Abdul Malek Azad, Ph.D.", title: "Branch Counselor", image: "/assets/people/branch-counselor.jpg" },
    advisor: { name: "Md Khalilur Rahman, PhD", title: "Chapter Advisor", image: "/assets/people/Advisors/Khalilur-Rhaman.jpg" },
    eb: [
      {
        name: "Risana Rehma Chowdhury",
        role: "Chair",
        image: "/assets/people/executive-body-2026/Risana-Rehma-Chowdhury.png",
      },
      {
        name: "Saad Noman Adeeb",
        role: "Vice Chair",
        image: "/assets/people/executive-body-2026/Saad-Noman-Adeeb.png",
      },
      {
        name: "Anika Tabassum",
        role: "Secretary",
        image: "/assets/people/executive-body-2026/Anika-Tabassum.png",
      },
      {
        name: "Mohammed Naqibur Rahman",
        role: "Treasurer",
        image: "/assets/people/executive-body-2026/Mohammad-Naqibur-Rahman.png",
      },
    ],
    membersHref: "/members?tab=eb&body=RAS",
    newsletters: [
      { year: "2022", href: "https://drive.google.com/file/d/1d2zOD8czo3yNOc9Zyw1_Z7O41WHNt3-W/view?usp=sharing" },
      { year: "2021", href: "https://drive.google.com/file/d/1FHX8FRQ_uM3mkcwRwDm-cF6uivV0ME0i/view?usp=sharing" },
      { year: "2020", href: "https://drive.google.com/file/d/10XoUgMZ_H6AFOLdZ6BNmCvcPMt08XLG_/view?usp=sharing" },
    ],
  },
  {
    slug: "aess",
    abbr: "AESS",
    name: "Aerospace & Electronic Systems",
    fullName: "IEEE Aerospace & Electronic Systems Society BRAC University Student Branch Chapter",
    desc: [
      "The Aerospace & Electronic Systems Society (AESS) chapter focuses on the technologies behind flight, space, and defense electronics.",
      "The chapter organizes industry visits, observational cosmology workshops, and technical talks that expose members to career paths in aerospace, defense, and space technology.",
    ],
    image: "/assets/chapters/aess-cover.jpg",
    logo: "/assets/branding/aess-logo.png",
    founded: "2020",
    focus: "Satellites · Avionics · Radar Systems",
    counselor: { name: "A.K.M Abdul Malek Azad, Ph.D.", title: "Branch Counselor", image: "/assets/people/branch-counselor.jpg" },
    advisor: { name: "Atib Mohammad Oni", title: "Chapter Advisor", image: "/assets/people/Advisors/Atib-Mohammad-Oni.jpg" },
    eb: [
      {
        name: "Nusrat Jahan",
        role: "Chair",
        image: "/assets/people/executive-body-2026/Nusrat-Jahan.png",
      },
      {
        name: "Mashiat Lamisa Riddhi",
        role: "Vice Chair",
        image: "/assets/people/executive-body-2026/Mashiat-Lamisa-Riddhi.png",
      },
      {
        name: "Iftekhar Uddin Tuhin",
        role: "Secretary",
        image: "/assets/people/executive-body-2026/Iftekhar-Uddin-Tuhin.png",
      },
      {
        name: "Shahriar Alam Mugdho",
        role: "Treasurer",
        image: "/assets/people/executive-body-2026/Shahriar-Alam-Mughdho.png",
      },
    ],
    membersHref: "/members?tab=eb&body=AESS",
    newsletters: [
      { year: "2022", href: "https://drive.google.com/file/d/1_Ay2ZnoBLIH27gBjmOD_0l97fUCAx19w/view?usp=sharing" },
      { year: "2021", href: "https://drive.google.com/file/d/1ZdL9OB58fqOghuUTTnV8qwos9mHzGtKZ/view?usp=sharing" },
      { year: "2020", href: "https://drive.google.com/file/d/14jCjfYVp0mynN2cBzuxSqqB6Ti5Yaq9f/view?usp=sharing" },
    ],
  },
  {
    slug: "comsoc",
    abbr: "ComSoc",
    name: "Communications Society",
    fullName: "IEEE Communications Society BRAC University Student Branch Chapter",
    desc: [
      "The Communications Society (ComSoc) chapter covers the technologies that connect the world — from 5G networks and optical fiber to signal processing and information theory.",
      "Recent events have explored neural networks in communication, network security, and the future of mobile connectivity.",
    ],
    image: "/assets/chapters/comsoc-cover.jpg",
    logo: "/assets/branding/comsoc-logo.png",
    founded: "2022",
    focus: "Networks · Signal Processing · 5G",
    counselor: { name: "A.K.M Abdul Malek Azad, Ph.D.", title: "Branch Counselor", image: "/assets/people/branch-counselor.jpg" },
    advisor: { name: "Tasfin Mahmud", title: "Chapter Advisor", image: "/assets/people/Advisors/Tasfin-Mahmud.jpg" },
    eb: [
      {
        name: "Mehzabin Mahmud",
        role: "Chair",
        image: "/assets/people/executive-body-2026/Mehzabin-Mahmud.webp",
      },
      {
        name: "Ramisha Islam Rodela",
        role: "Vice Chair",
        image: "/assets/people/executive-body-2026/Ramisha-Islam-Rodela.webp",
      },
      {
        name: "Nusrat Sultana",
        role: "Secretary",
        image: "/assets/people/executive-body-2026/Nusrat-Sultana.webp",
      },
      {
        name: "Md. Riadul Hossain Khan",
        role: "Treasurer",
        image: "/assets/people/executive-body-2026/Riadul-Hossain-Khan.webp",
      },
    ],
    inaugReport: "https://ieeebracu.com/comsoc-inauguration-report.pdf",
    membersHref: "/members?tab=eb&body=ComSoc",
    newsletters: [
      { year: "2025", href: "https://drive.google.com/file/d/16ZhcjsXN7iP-QFc2iAJ3jJmbQKHmOAcJ/view?usp=sharing" },
    ],
  },
  {
    slug: "eds",
    abbr: "EDS",
    name: "Electron Devices Society",
    fullName: "IEEE Electron Devices Society BRAC University Student Branch Chapter",
    desc: [
      "The Electron Devices Society (EDS) chapter dives into the physics and engineering of semiconductor devices, nanoelectronics, photovoltaics, and MEMS.",
      "The chapter runs workshops on circuit simulation, power electronics applications, and biomedical devices.",
    ],
    image: "/assets/chapters/eds-cover.jpg",
    logo: "/assets/branding/eds-logo.png",
    founded: "2026",
    focus: "Semiconductors · Nanoelectronics · MEMS",
    counselor: { name: "A.K.M Abdul Malek Azad, Ph.D.", title: "Branch Counselor", image: "/assets/people/branch-counselor.jpg" },
    advisor: { name: "Dr. Twisha Titirsha, Ph.D.", title: "Chapter Advisor", image: "/assets/people/Advisors/Twisha-Titirsha.jpg" },
    eb: [
      {
        name: "Kazi Adibur Rahim",
        role: "Chair",
        image: "/assets/people/executive-body-2026/Kazi-Adibur-Rahim.webp",
      },
      {
        name: "Fariba Mir",
        role: "Vice Chair",
        image: "/assets/people/executive-body-2026/Fabiha-Mir.webp",
      },
      {
        name: "Oishi Moni",
        role: "Secretary",
        image: "/assets/people/executive-body-2026/Oishi-Moni.webp",
      },
      {
        name: "Shahriar Hossain",
        role: "Treasurer",
        image: "/assets/people/executive-body-2026/Shahriar-Hossain.webp",
      },
    ],
    inaugReport: "https://drive.google.com/file/d/1mwv8ovvOMbS6zyHwETLwEtaw9A6YWXxm/view?usp=sharing",
    membersHref: "/members?tab=eb&body=EDS",
    newsletters: [],
  },
];

export const technicalChapters: ChapterSummary[] = chaptersDetailData.map((c) => ({
  abbr: c.abbr,
  slug: c.slug,
  name: c.name,
  desc: c.desc[0],
  image: c.image,
}));

export function getChapterBySlug(slug: string): ChapterData | undefined {
  return chaptersDetailData.find((c) => c.slug === slug);
}
