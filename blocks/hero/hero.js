/**
 * loads and decorates the hero block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  // Full-bleed hero is often reused as an image-less dark CTA band.
  // Flag the no-image variant so CSS can drop the media layer + scrim.
  if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }

  // Optional promo strip: a text-only row authored after the content row
  // (the row holding the heading). Pull it out of the row flow into an
  // <aside> (so the content row stays the block's last <div>) and overlay it
  // along the bottom edge of the hero. Paragraphs are unwrapped so the hero's
  // paragraph/eyebrow styles don't apply to the strip.
  const rows = [...block.children];
  const contentIndex = rows.findIndex((row) => row.querySelector('h1, h2, h3, h4, h5, h6'));
  const stripRow = contentIndex > -1 && rows.length > contentIndex + 1 ? rows.at(-1) : null;
  if (stripRow && !stripRow.querySelector('picture, h1, h2, h3, h4, h5, h6')
    && stripRow.textContent.trim()) {
    const strip = document.createElement('aside');
    strip.className = 'hero-strip';
    stripRow.querySelectorAll('p').forEach((p, i) => {
      if (i) strip.append(' ');
      strip.append(...p.childNodes);
    });
    if (!strip.textContent.trim()) strip.textContent = stripRow.textContent.trim();
    stripRow.remove();
    block.append(strip);
    block.classList.add('has-strip');
  }

  // Tag the first paragraph as the eyebrow. querySelector returns the first
  // <p> in document order at any depth, so this survives DOM restructuring
  // (unlike a positional p:first-child selector).
  block.querySelector('p')?.classList.add('eyebrow');
}
