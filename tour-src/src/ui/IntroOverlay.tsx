import { useState } from 'react'
import { controlsApi } from '../controls/PlayerControls'
import { L } from '../i18n'
import { VENUE } from '../data/hotspots'
import { useVenueStore } from '../state/store'

/** Branded entry screen. Enter starts the walk and grabs pointer lock. */
export function IntroOverlay() {
  const setPhase = useVenueStore((s) => s.setPhase)
  const controlMode = useVenueStore((s) => s.controlMode)
  const [leaving, setLeaving] = useState(false)
  const touch = controlMode === 'touch'

  const enter = () => {
    setLeaving(true)
    controlsApi.lock()
    setTimeout(() => setPhase('exploring'), 450)
  }

  return (
    <div className={`intro${leaving ? ' leaving' : ''}`}>
      <div className="intro-card">
        <p className="intro-eyebrow">{L('ByWard Market · Ottawa', 'Marché By · Ottawa')}</p>
        <h1 className="intro-title">
          Speakeasy <span className="amp">·</span> Tapas Lounge
        </h1>
        <p className="intro-sub">
          {L(
            'Step inside and walk the room — the glowing bar, the candlelit tables and the live-jazz stage. Picture your private event in the space before you book it.',
            'Entrez et parcourez la salle — le bar lumineux, les tables aux chandelles et la scène de jazz. Imaginez-y votre événement privé avant de réserver.',
          )}
        </p>
        <p className="intro-cap">
          {L(
            'Seats 60 · Stands 100 · Fully customizable',
            '60 places assises · 100 debout · Entièrement personnalisable',
          )}
        </p>
        <button className="btn-primary" onClick={enter}>
          {L('Enter the Lounge', 'Entrer dans le lounge')}
        </button>
        <p className="intro-hints">
          {touch ? (
            <>
              <b>{L('Left thumb', 'Pouce gauche')}</b> {L('to walk', 'pour marcher')} ·{' '}
              <b>{L('drag right', 'glissez à droite')}</b> {L('to look', 'pour regarder')}
            </>
          ) : (
            <>
              <b>W A S D</b> {L('to walk', 'pour marcher')} · <b>{L('mouse', 'souris')}</b>{' '}
              {L('to look', 'pour regarder')} · <b>Shift</b> {L('to hurry', 'pour presser le pas')}
            </>
          )}
        </p>
        <p className="intro-hints" style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
          {VENUE.address}
        </p>
      </div>
    </div>
  )
}
