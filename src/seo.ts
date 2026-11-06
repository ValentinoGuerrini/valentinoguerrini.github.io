import { siteConfig } from './config';
import { links } from './links';

export const seo = {
  url: 'https://valentinoguerrini.github.io/',
  title: 'Valentino Guerrini | Hardware Acceleration & FPGA Research',
  description: 'Valentino Guerrini is a computer engineer in Zürich working on hardware accelerators at Huawei. FPGA, computer architecture, cryptography and HPC research.',
  image: 'https://valentinoguerrini.github.io/assets/journey-banner.webp',
  imageAlt: 'Illustrated journey from the hills of Piacenza through Milan and Chicago to Zürich.',
};

const personId = `${seo.url}#person`;
const websiteId = `${seo.url}#website`;
const profileId = `${seo.url}#profile`;

// Describe the same person and work shown in the cards. This is metadata only;
// every introduction and project link remains in the server-rendered HTML.
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: seo.url,
      name: siteConfig.name,
      inLanguage: 'en',
      publisher: { '@id': personId },
    },
    {
      '@type': 'ProfilePage',
      '@id': profileId,
      url: seo.url,
      name: seo.title,
      description: seo.description,
      inLanguage: 'en',
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': personId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: siteConfig.name,
      givenName: 'Valentino',
      familyName: 'Guerrini',
      url: seo.url,
      mainEntityOfPage: { '@id': profileId },
      jobTitle: siteConfig.title,
      description: seo.description,
      worksFor: {
        '@type': 'Organization',
        name: 'Huawei',
        department: { '@type': 'Organization', name: 'Huawei Research Center Zürich' },
      },
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Politecnico di Milano' },
        { '@type': 'CollegeOrUniversity', name: 'University of Illinois Chicago' },
        { '@type': 'EducationalOrganization', name: 'Alta Scuola Politecnica' },
      ],
      knowsAbout: [
        'Computer architecture',
        'Hardware acceleration',
        'FPGA design',
        'Reconfigurable computing',
        'Fully homomorphic encryption',
        'High-performance computing',
      ],
      sameAs: [siteConfig.social.linkedin, siteConfig.social.github, links.scholar],
    },
  ],
};
