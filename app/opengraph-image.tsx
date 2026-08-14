import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Default site-wide Open Graph card. Renders for the expedition homepage and
// any route that does not define its own opengraph-image.
export const alt = 'Drive the Frontier — a Swovee expedition through Karen Pendergrass’s work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const LABEL = 'EXPEDITION KP–01 · SWOVEE ROVALIZER R–01';
const TAGLINE = 'DRIVE THE FRONTIER.';
const NAME = 'Karen Pendergrass';
const DOMAIN = 'karenpendergrass.com';

export default async function OpengraphImage() {
  const expeditionKeyArtFile = await readFile(
    join(process.cwd(), 'public/images/expedition-kp01-key-art.png')
  );
  const expeditionKeyArt = Uint8Array.from(expeditionKeyArtFile).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#30283d',
          padding: '72px 80px',
        }}
      >
        <img
          src={expeditionKeyArt as unknown as string}
          alt=""
          width="1200"
          height="630"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: 'linear-gradient(90deg, rgba(25,19,35,.94) 0%, rgba(31,23,42,.72) 42%, rgba(31,23,42,.08) 72%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div
            style={{
              width: '44px',
              height: '4px',
              backgroundColor: '#d5ff50',
              marginRight: '18px',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              letterSpacing: '0.18em',
              color: '#d5ff50',
            }}
          >
            {LABEL}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '82px',
            lineHeight: 0.88,
            color: '#ffffff',
            fontWeight: 800,
            letterSpacing: '-0.055em',
            maxWidth: '570px',
            position: 'relative',
            textShadow: '0 6px 32px rgba(0,0,0,.3)',
          }}
        >
          <div style={{ display: 'flex' }}>{TAGLINE}</div>
          <div style={{ display: 'flex', marginTop: '26px', fontSize: '22px', lineHeight: 1, letterSpacing: '0.2em', color: '#d5ff50' }}>
            SCAN · REASON · PRINT
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                fontSize: '30px',
                color: '#ffffff',
                letterSpacing: '0.06em',
                marginRight: '12px',
              }}
            >
              {NAME}
            </div>
            <div
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '9999px',
                backgroundColor: '#d5ff50',
              }}
            />
          </div>
          <div style={{ display: 'flex', fontSize: '22px', color: 'rgba(255,255,255,0.5)' }}>
            {DOMAIN}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
