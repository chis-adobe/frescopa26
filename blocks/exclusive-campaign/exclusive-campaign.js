const LABEL = 'Exclusive Campaign Benefit';

/**
 * Exclusive campaign promo callout: a dashed-border coupon panel. The label,
 * border and colours are fixed by the block; authors supply three lines:
 *   1. title (e.g. "Get an Extra 10% Off") -- a heading or plain paragraph
 *   2. description
 *   3. promo code (e.g. "CODE: COFFEEHOUSE10")
 * Lines may be authored in one cell or one per row.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const items = [...block.querySelectorAll(':scope > div > div')].flatMap((cell) => {
    if (cell.children.length) return [...cell.children];
    if (!cell.textContent.trim()) return [];
    const p = document.createElement('p');
    p.textContent = cell.textContent.trim();
    return [p];
  }).filter((el) => el.textContent.trim());

  const titleSrc = items.find((el) => /^H[1-6]$/.test(el.tagName)) || items[0];
  const rest = items.filter((el) => el !== titleSrc);
  const codeSrc = rest.length > 1 ? rest.at(-1) : null;
  const descSrc = rest.filter((el) => el !== codeSrc);

  const label = document.createElement('p');
  label.className = 'exclusive-campaign-label';
  label.textContent = LABEL;

  const title = document.createElement('h2');
  title.className = 'exclusive-campaign-title';
  if (titleSrc) title.append(...titleSrc.childNodes);

  const desc = document.createElement('p');
  desc.className = 'exclusive-campaign-desc';
  descSrc.forEach((el, i) => {
    if (i) desc.append(' ');
    desc.append(...el.childNodes);
  });

  const code = document.createElement('p');
  code.className = 'exclusive-campaign-code';
  const codeText = document.createElement('span');
  if (codeSrc) codeText.append(...codeSrc.childNodes);
  code.append(codeText);

  block.replaceChildren(...[label, title, desc, code]
    .filter((el) => el === label || el.textContent.trim()));
}
