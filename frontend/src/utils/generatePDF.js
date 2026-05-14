import jsPDF from 'jspdf';

const DARK = [15, 15, 26];       // #0f0f1a
const GOLD = [212, 175, 55];     // #D4AF37
const WHITE = [255, 255, 255];
const LIGHT_GRAY = [245, 244, 240];
const MID_GRAY = [180, 175, 165];
const TEXT_DARK = [30, 30, 50];
const TEXT_MID = [100, 95, 110];
const BORDER = [230, 225, 215];

const fmt = (amount, currency) => {
  if (currency.code === 'NGN') return `${currency.symbol}${amount.toLocaleString()}`;
  return `${currency.symbol}${amount.toLocaleString()}`;
};

const generateQuoteRef = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `EDH-${y}${m}${d}-${rand}`;
};

export const generatePDF = ({
  clientDetails,
  projectType,
  selectedFeatures,
  selectedAddons,
  timeline,
  startDate,
  projectBrief,
  totals,
  currency,
}) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210;
  const H = 297;
  const pad = 20;
  const quoteRef = generateQuoteRef();
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // ── BACKGROUND ──
  doc.setFillColor(...DARK);
  doc.rect(0, 0, W, H, 'F');

  // ── TOP ACCENT BAR ──
  doc.setFillColor(...GOLD);
  doc.rect(0, 0, W, 3, 'F');

  // ── WHITE CARD ──
  const cardX = pad;
  const cardY = 18;
  const cardW = W - pad * 2;

  // Card shadow effect (slightly offset dark rect)
  doc.setFillColor(10, 10, 20);
  doc.roundedRect(cardX + 2, cardY + 2, cardW, H - 36, 6, 6, 'F');

  // Main white card
  doc.setFillColor(...WHITE);
  doc.roundedRect(cardX, cardY, cardW, H - 36, 6, 6, 'F');

  let y = cardY + 14;

  // ── HEADER ──
  // "PROJECT QUOTE" large title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...DARK);
  doc.text('PROJECT QUOTE', W / 2, y, { align: 'center' });
  y += 8;

  // Gold underline
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.8);
  doc.line(pad + 20, y, W - pad - 20, y);
  y += 7;

  // Pill subtitle — EdohaDeveloped
  const pillW = 70;
  const pillH = 8;
  const pillX = W / 2 - pillW / 2;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.roundedRect(pillX, y, pillW, pillH, 4, 4, 'S');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...TEXT_DARK);
  doc.text('EdohaDeveloped — Web Development Services', W / 2, y + 5.5, { align: 'center' });
  y += 16;

  // ── META ROW (ref, date, client) ──
  doc.setFillColor(...LIGHT_GRAY);
  doc.roundedRect(cardX + 8, y, cardW - 16, 20, 3, 3, 'F');

  const metaY = y + 7;
  const col1 = cardX + 16;
  const col2 = W / 2 - 10;
  const col3 = W / 2 + 25;

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...MID_GRAY);
  doc.text('QUOTE REFERENCE', col1, metaY - 2);
  doc.text('DATE ISSUED', col2, metaY - 2);
  doc.text('PREPARED FOR', col3, metaY - 2);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK);
  doc.text(quoteRef, col1, metaY + 4);
  doc.text(today, col2, metaY + 4);
  doc.text(clientDetails.name, col3, metaY + 4);

  if (clientDetails.company) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...TEXT_MID);
    doc.text(clientDetails.company, col3, metaY + 9);
  }

  y += 28;

  // ── SECTION: PROJECT BRIEF ──
  if (projectBrief) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...GOLD[0], ...GOLD.slice(1));
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text('PROJECT BRIEF', cardX + 8, y);

    // Dashed line
    y += 3;
    doc.setDrawColor(...BORDER);
    doc.setLineDashPattern([2, 2], 0);
    doc.setLineWidth(0.4);
    doc.line(cardX + 8, y, cardX + cardW - 8, y);
    doc.setLineDashPattern([], 0);
    y += 5;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...TEXT_MID);
    const briefLines = doc.splitTextToSize(projectBrief, cardW - 20);
    doc.text(briefLines, cardX + 8, y);
    y += briefLines.length * 5 + 6;
  }

  // ── SECTION: PROJECT TYPE ──
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('PROJECT TYPE', cardX + 8, y);

  y += 3;
  doc.setDrawColor(...BORDER);
  doc.setLineDashPattern([2, 2], 0);
  doc.setLineWidth(0.4);
  doc.line(cardX + 8, y, cardX + cardW - 8, y);
  doc.setLineDashPattern([], 0);
  y += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...TEXT_DARK);
  doc.text(projectType.name, cardX + 8, y);
  doc.setFont('helvetica', 'bold');
  doc.text(fmt(totals.base, currency), cardX + cardW - 8, y, { align: 'right' });

  y += 4;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...TEXT_MID);
  doc.text('Base price — includes: ' + projectType.includes.join(', '), cardX + 8, y);
  y += 10;

  // ── SECTION: FEATURES ──
  if (selectedFeatures.length > 0) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text('SELECTED FEATURES', cardX + 8, y);

    y += 3;
    doc.setDrawColor(...BORDER);
    doc.setLineDashPattern([2, 2], 0);
    doc.setLineWidth(0.4);
    doc.line(cardX + 8, y, cardX + cardW - 8, y);
    doc.setLineDashPattern([], 0);
    y += 5;

    selectedFeatures.forEach((f, i) => {
      if (i % 2 === 0) {
        doc.setFillColor(250, 249, 246);
        doc.rect(cardX + 6, y - 3, cardW - 12, 8, 'F');
      }
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXT_DARK);
      doc.text(`• ${f.name}`, cardX + 10, y + 2);
      doc.setFont('helvetica', 'bold');
      doc.text(fmt(Math.round(f.price * currency.rate), currency), cardX + cardW - 8, y + 2, { align: 'right' });
      y += 8;
    });

    // Discount line
    if (totals.discount > 0) {
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(22, 163, 74); // green
      doc.text(`✓ 10% loyalty discount (5+ features selected)`, cardX + 10, y + 2);
      doc.setFont('helvetica', 'bold');
      doc.text(`-${fmt(totals.discount, currency)}`, cardX + cardW - 8, y + 2, { align: 'right' });
      y += 8;
    }
    y += 3;
  }

  // ── SECTION: ADD-ONS ──
  if (selectedAddons.length > 0) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text('ADD-ONS', cardX + 8, y);

    y += 3;
    doc.setDrawColor(...BORDER);
    doc.setLineDashPattern([2, 2], 0);
    doc.setLineWidth(0.4);
    doc.line(cardX + 8, y, cardX + cardW - 8, y);
    doc.setLineDashPattern([], 0);
    y += 5;

    selectedAddons.forEach((a, i) => {
      if (i % 2 === 0) {
        doc.setFillColor(250, 249, 246);
        doc.rect(cardX + 6, y - 3, cardW - 12, 8, 'F');
      }
      const label = a.isPercentage ? `${a.name} (+${a.percentage}%)` : a.name;
      const price = a.isPercentage ? fmt(totals.rushAmount, currency) : fmt(Math.round(a.price * currency.rate), currency);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXT_DARK);
      doc.text(`• ${label}`, cardX + 10, y + 2);
      doc.setFont('helvetica', 'bold');
      doc.text(price, cardX + cardW - 8, y + 2, { align: 'right' });
      y += 8;
    });
    y += 3;
  }

  // ── SECTION: TIMELINE ──
  if (timeline || startDate) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text('TIMELINE', cardX + 8, y);

    y += 3;
    doc.setDrawColor(...BORDER);
    doc.setLineDashPattern([2, 2], 0);
    doc.setLineWidth(0.4);
    doc.line(cardX + 8, y, cardX + cardW - 8, y);
    doc.setLineDashPattern([], 0);
    y += 5;

    if (startDate) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXT_DARK);
      doc.text(`Preferred Start Date:  ${startDate}`, cardX + 10, y + 2);
      y += 7;
    }
    if (timeline && timeline !== 'none') {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXT_DARK);
      doc.text(`Estimated Duration:  ${timeline}`, cardX + 10, y + 2);
      y += 7;
    }
    y += 3;
  }

  // ── TOTAL BOX ──
  doc.setFillColor(DARK[0], DARK[1], DARK[2]);
  doc.roundedRect(cardX + 8, y, cardW - 16, 18, 4, 4, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...GOLD);
  doc.text('TOTAL ESTIMATE', cardX + 16, y + 7);
  doc.setFontSize(16);
  doc.text(fmt(totals.total, currency), cardX + cardW - 16, y + 11, { align: 'right' });
  if (currency.code === 'NGN') {
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 200);
    doc.text(`(approx. $${Math.round(totals.total / currency.rate).toLocaleString()} USD)`, cardX + cardW - 16, y + 16, { align: 'right' });
  }
  y += 25;

  // ── TERMS ──
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('TERMS & CONDITIONS', cardX + 8, y);
  y += 4;

  const terms = [
    '• A 50% deposit is required before work begins. The remaining 50% is due upon project completion.',
    '• This quote includes 2 rounds of revisions. Additional revisions are available at $20 per round.',
    '• Final pricing may vary slightly based on project complexity discussed during onboarding.',
    '• This quote is valid for 30 days from the date of issue.',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...TEXT_MID);
  terms.forEach(t => {
    doc.text(t, cardX + 8, y);
    y += 4.5;
  });
  y += 4;

  // ── FOOTER ──
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.line(cardX + 8, y, cardX + cardW - 8, y);
  y += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK);
  doc.text('EdohaDeveloped', W / 2, y, { align: 'center' });
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...TEXT_MID);
  doc.setFontSize(7.5);
  doc.text('aee9552s@MissouriState.edu  •  +1 (417) 227-8921  •  edohathedev.netlify.app', W / 2, y, { align: 'center' });
  y += 4;
  doc.text('Questions? Reply to this quote or book a call — details above.', W / 2, y, { align: 'center' });

  // ── BOTTOM GOLD BAR ──
  doc.setFillColor(...GOLD);
  doc.rect(0, H - 3, W, 3, 'F');

  doc.save(`EdohaDeveloped_Quote_${quoteRef}.pdf`);
  return quoteRef;
};
