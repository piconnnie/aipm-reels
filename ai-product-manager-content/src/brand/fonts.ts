import {continueRender, delayRender, staticFile} from 'remotion';

// Fonts are loaded from local files in public/fonts so renders never depend on
// a network font download. To switch to Space Grotesk / JetBrains Mono, drop
// the files into public/fonts and update the `file` entries below.
const faces: {family: string; file: string; weight: string}[] = [
  {family: 'AIPM Display', file: 'fonts/InterDisplay-Bold.otf', weight: '700'},
  {family: 'AIPM Display', file: 'fonts/InterDisplay-SemiBold.otf', weight: '600'},
  {family: 'AIPM Body', file: 'fonts/Inter-Regular.otf', weight: '400'},
  {family: 'AIPM Body', file: 'fonts/Inter-Medium.otf', weight: '500'},
  {family: 'AIPM Body', file: 'fonts/Inter-SemiBold.otf', weight: '600'},
  {family: 'AIPM Mono', file: 'fonts/DejaVuSansMono.ttf', weight: '400'},
  {family: 'AIPM Mono', file: 'fonts/DejaVuSansMono-Bold.ttf', weight: '700'},
];

let started = false;

export const loadBrandFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('Loading brand fonts');
  Promise.all(
    faces.map((f) => {
      const face = new FontFace(f.family, `url(${staticFile(f.file)})`, {weight: f.weight});
      return face.load().then((loaded) => {
        document.fonts.add(loaded);
      });
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      // Fail loudly: a silent fallback font would break the brand.
      console.error('Font loading failed', err);
      throw err;
    });
};
