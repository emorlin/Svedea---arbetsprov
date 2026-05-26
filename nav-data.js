const navData = {
  mainLinks: [
    {
      id: 'forsakringar',
      label: 'Försäkringar',
      hasMegaMenu: true,
      seeAllLink: { label: 'Se alla försäkringar', href: '#' },
      categories: [
        {
          id: 'bil',
          label: 'Bil',
          icon: 'car',
          links: [
            { label: 'Bilförsäkring', href: '#' },
            { label: 'Bilförsäkring för företag', href: '#' }
          ]
        },
        {
          id: 'fordon',
          label: 'Fordon',
          icon: 'truck',
          links: [
            { label: 'Snöskoterförsäkring', href: '#' },
            { label: 'ATV-försäkring', href: '#' },
            { label: 'Släpvagnsförsäkring', href: '#' },
            { label: 'Husvagnsförsäkring', href: '#' }
          ]
        },
        {
          id: 'motorcykel',
          label: 'Motorcykel',
          icon: 'bike',
          links: [
            { label: 'Mc-försäkring', href: '#' },
            { label: 'Märkesförsäkringar', href: '#' }
          ]
        },
        {
          id: 'bat',
          label: 'Båt',
          icon: 'anchor',
          links: [
            { label: 'Båtförsäkring', href: '#' },
            { label: 'Märkesförsäkringar', href: '#' },
            { label: 'Vattenskoterförsäkring', href: '#' },
            { label: 'Sportfiskarna', href: '#' }
          ]
        },
        {
          id: 'djur',
          label: 'Djur',
          icon: 'paw-print',
          links: [
            { label: 'Hundförsäkring', href: '#' },
            { label: 'Jakthundsförsäkring', href: '#' },
            { label: 'Kattförsäkring', href: '#' },
            { label: 'Djurförsäkring', href: '#' }
          ]
        },
        {
          id: 'hem-hus',
          label: 'Hem & hus',
          icon: 'home',
          links: [
            { label: 'Hemförsäkring', href: '#' },
            { label: 'Villaförsäkring', href: '#' },
            { label: 'Bostadsrättsförsäkring', href: '#' },
            { label: 'Hyresrättsförsäkring', href: '#' },
            { label: 'Fritidshusförsäkring', href: '#' }
          ]
        },
        {
          id: 'foretag',
          label: 'Företag',
          icon: 'building-2',
          links: [
            { label: 'Företagsförsäkring', href: '#' },
            { label: 'Bilförsäkring för företag', href: '#' },
            { label: 'Släpvagnsförsäkring', href: '#' },
            { label: 'Drönarförsäkring', href: '#' }
          ]
        },
        {
          id: 'formedlare',
          label: 'För förmedlare',
          icon: 'users',
          links: [
            { label: 'Gruppförsäkringar', href: '#' },
            { label: 'Kommunolycksfall', href: '#' },
            { label: 'Försäkring via förmedlare', href: '#' }
          ]
        }
      ]
    },
    { id: 'tips-rad', label: 'Tips & råd', href: '#' },
    { id: 'om-oss', label: 'Om oss', href: '#' }
  ],
  utilityLinks: [
    { id: 'logga-in', label: 'Logga in', href: '#', icon: 'user' },
    { id: 'kontakt', label: 'Kontakt', href: '#', icon: 'phone' },
    { id: 'sok', label: 'Sök', href: '#', icon: 'search' }
  ],
  ctaButton: { label: 'Anmäl skada', href: '#' }
};
