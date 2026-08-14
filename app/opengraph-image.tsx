import { ImageResponse } from 'next/og';

// Default site-wide Open Graph card. Renders for the homepage and any route
// that does not define its own opengraph-image. Brand-matched to the dark/amber
// editorial theme. Node runtime (default) — no edge, kept simple/robust for satori.
export const alt =
  'Karen Pendergrass — Standards Developer & Microbiome Researcher';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const LABEL = 'STANDARDS · RESEARCH · FRAMEWORKS';
const TAGLINE = 'I build the frameworks that become the standard before there is a market.';
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
            fontSize: '66px',
            lineHeight: 1.14,
            color: '#ffffff',
            fontWeight: 500,
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
