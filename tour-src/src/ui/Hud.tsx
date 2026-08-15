import { BOOKING_URL } from '../data/hotspots'
import { L } from '../i18n'
import { LAYOUTS, LAYOUT_IDS } from '../data/layouts'
import { useVenueStore } from '../state/store'

/** Persistent heads-up UI: brand, hotspot toggle, layout switch, book CTA. */
export function Hud() {
  const layoutId = useVenueStore((s) => s.layoutId)
  const setLayout = useVenueStore((s) => s.setLayout)
  const hotspotsVisible = useVenueStore((s) => s.hotspotsVisible)
  const setHotspotsVisible = useVenueStore((s) => s.setHotspotsVisible)

  return (
    <>
      <div className="hud-top">
        <div className="hud-brand">Speakeasy</div>
        <div className="hud-actions">
          <button
            className={`hud-btn${hotspotsVisible ? ' on' : ''}`}
            title={L('Toggle info markers', 'Afficher ou masquer les repères')}
            aria-label={L('Toggle info markers', 'Afficher ou masquer les repères')}
            onClick={() => setHotspotsVisible(!hotspotsVisible)}
          >
            ⓘ
          </button>
        </div>
      </div>

      <div className="hud-bottom">
        <div className="layout-switch" role="group" aria-label={L('Event layout', 'Configuration de la salle')}>
          {LAYOUT_IDS.map((id) => (
            <button
              key={id}
              className={`layout-btn${layoutId === id ? ' active' : ''}`}
              onClick={() => setLayout(id)}
            >
              <span className="lb-name">{LAYOUTS[id].label}</span>
              <span className="lb-cap">{LAYOUTS[id].capacity}</span>
            </button>
          ))}
        </div>
        <a className="cta" href={BOOKING_URL} target="_blank" rel="noopener">
          {L('Book this venue ↗', 'Réserver la salle ↗')}
        </a>
      </div>
    </>
  )
}
