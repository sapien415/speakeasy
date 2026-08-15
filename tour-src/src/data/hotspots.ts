import { L } from '../i18n'
import type { LayoutId } from './layouts'

export const BOOKING_URL = 'https://speakeasyottawa.com/host-your-event'

export const VENUE = {
  name: 'Speakeasy Tapas Lounge',
  address: L('55 York St, ByWard Market, Ottawa', '55, rue York, marché By, Ottawa'),
  phone: '+1 613-241-6221',
  phoneHref: 'tel:+16132416221',
  website: 'https://speakeasyottawa.com',
} as const

export interface HotspotSpec {
  id: 'bar' | 'stage' | 'dining' | 'host'
  title: string
  /** marker position in the 3D scene */
  position: readonly [number, number, number]
  paragraphs: string[]
  facts?: { label: string; value: string }[]
  /** offer a "view in this layout" switch on the card */
  linkLayout?: LayoutId
}

export const HOTSPOTS: HotspotSpec[] = [
  {
    id: 'host',
    title: L('Host Your Event', 'Célébrez chez nous'),
    position: [0, 1.75, 6.6],
    paragraphs: [
      L(
        'The whole room can be yours — exclusive use for your designated time, with a menu built around your vision.',
        'La salle entière peut être à vous — usage exclusif pour la durée réservée, avec un menu bâti autour de votre vision.',
      ),
      L(
        'Choose an intimate dinner, a cocktail reception with open bar, or a gallery-style artistic showcase.',
        'Choisissez un repas intime, une réception cocktail avec bar ouvert ou une vitrine artistique façon galerie.',
      ),
    ],
    facts: [
      { label: L('Seated', 'Assis'), value: L('60 guests', '60 personnes') },
      { label: L('Standing', 'Debout'), value: L('100 guests', '100 personnes') },
      { label: L('Packages', 'Formules'), value: L('Dining · Premium · Showcase', 'Repas · Premium · Vitrine') },
    ],
    linkLayout: 'cocktail',
  },
  {
    id: 'bar',
    title: L('The Bar', 'Le bar'),
    position: [-3.1, 1.55, 3],
    paragraphs: [
      L(
        'Expertly crafted cocktails, house wines and an impressive back bar under industrial pendants and exposed brick.',
        'Des cocktails montés avec soin, des vins de la maison et un arrière-bar impressionnant, sous des suspensions industrielles et la brique apparente.',
      ),
      L(
        'Premium event packages include a welcome cocktail and open bar service.',
        'Les formules premium comprennent un cocktail de bienvenue et le service de bar ouvert.',
      ),
    ],
    facts: [
      { label: L('Signature', 'Signature'), value: L('Craft cocktails & tapas pairings', 'Cocktails d’auteur et accords tapas') },
      { label: L('Open bar', 'Bar ouvert'), value: L('Available with Premium package', 'Offert avec la formule premium') },
    ],
    linkLayout: 'cocktail',
  },
  {
    id: 'stage',
    title: L('The Stage', 'La scène'),
    position: [0, 1.7, -7],
    paragraphs: [
      L(
        'Live jazz fills the room every Friday and Saturday night from this candlelit corner stage.',
        'Le jazz live remplit la salle chaque vendredi et samedi soir, depuis cette scène de coin éclairée aux chandelles.',
      ),
      L(
        'Book your own performers, host speeches, or run an artist showcase — sound and stage lighting are in place.',
        'Faites venir vos artistes, prenez la parole ou présentez une vitrine — la sonorisation et l’éclairage de scène sont en place.',
      ),
    ],
    facts: [
      { label: L('Live jazz', 'Jazz live'), value: L('Fridays & Saturdays', 'Vendredis et samedis') },
      { label: L('Great for', 'Parfait pour'), value: L('Live music · toasts · showcases', 'Musique live · discours · vitrines') },
    ],
    linkLayout: 'showcase',
  },
  {
    id: 'dining',
    title: L('The Dining Room', 'La salle à manger'),
    position: [1.7, 1.5, 0.4],
    paragraphs: [
      L(
        'Black-linen tables, candlelight and internationally inspired tapas — the room seats 60 for a full dinner service.',
        'Nappes noires, lumière des chandelles et tapas d’inspiration internationale — la salle accueille 60 convives pour un service complet.',
      ),
      L(
        'The banquette wall and moody lighting keep even big nights feeling intimate.',
        'Le mur de banquettes et l’éclairage feutré gardent un air intime, même les grands soirs.',
      ),
    ],
    facts: [
      { label: L('Seated dinner', 'Repas assis'), value: L('Up to 60', 'Jusqu’à 60') },
      { label: L('Menu', 'Menu'), value: L('Fully customizable', 'Entièrement personnalisable') },
    ],
    linkLayout: 'dinner',
  },
]
