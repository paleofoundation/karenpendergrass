import { ImageResponse } from 'next/og';

// Default site-wide Open Graph card. Renders for the expedition homepage and
// any route that does not define its own opengraph-image.
export const alt = 'Drive the Frontier — a Swovee expedition through Karen Pendergrass’s work';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const LABEL = 'EXPEDITION KP–01 · SWOVEE ROVALIZER R–01';
const TAGLINE = 'DRIVE THE FRONTIER.';
const NAME = 'Karen Pendergrass';
const DOMAIN = 'karenpendergrass.com';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#06110e',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
            fontSize: '108px',
            lineHeight: 0.9,
            color: '#ffffff',
            fontWeight: 800,
            letterSpacing: '-0.055em',
            maxWidth: '1000px',
          }}
        >
          {TAGLINE}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
