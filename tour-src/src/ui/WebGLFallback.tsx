import { L } from '../i18n'

const BOOKING_URL = 'https://speakeasyottawa.com/host-your-event'

/**
 * Shown when the browser can't create a WebGL context. The page should still
 * sell the venue, so it presents the key facts and the booking CTA.
 */
export function WebGLFallback() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <h1 style={{ fontFamily: 'var(--deco)', color: 'var(--gold)', fontWeight: 400 }}>
          Speakeasy Tapas Lounge
        </h1>
        <p style={{ color: 'var(--cream-dim)', lineHeight: 1.6 }}>
          {L(
            'Your browser can\u2019t display the interactive 3D tour, but the room is real: a candlelit lounge in Ottawa\u2019s ByWard Market with a glowing bar, live-jazz stage and seating for 60 (or 100 standing) — yours for private events.',
            'Votre navigateur ne peut pas afficher la visite 3D interactive, mais la salle, elle, est bien réelle : un lounge aux chandelles dans le marché By d\u2019Ottawa, avec un bar lumineux, une scène de jazz et 60 places assises (ou 100 debout) — à vous pour vos événements privés.',
          )}
        </p>
        <p style={{ color: 'var(--cream-dim)' }}>
          {L('55 York St, Ottawa · +1 613-241-6221', '55, rue York, Ottawa · +1 613-241-6221')}
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-block',
            marginTop: 16,
            padding: '12px 28px',
            border: '1px solid var(--gold)',
            color: 'var(--gold-bright)',
            textDecoration: 'none',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontSize: 14,
          }}
        >
          {L('Book this venue', 'Réserver la salle')}
        </a>
      </div>
    </div>
  )
}
