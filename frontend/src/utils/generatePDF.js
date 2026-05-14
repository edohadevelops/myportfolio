import jsPDF from 'jspdf';

const DARK      = [15, 15, 26];
const GOLD      = [212, 175, 55];
const WHITE     = [255, 255, 255];
const OFF_WHITE = [248, 247, 244];
const LIGHT_BG  = [245, 244, 240];
const BORDER    = [230, 225, 215];
const TEXT_DARK = [30, 30, 50];
const TEXT_MID  = [100, 95, 110];
const TEXT_LIGHT= [160, 155, 165];
const GREEN     = [22, 163, 74];

const W  = 210;
const H  = 297;
const ML = 18;
const MR = 18;
const CW = W - ML - MR;
const HEADER_H   = 58;
const CONTENT_TOP= HEADER_H + 10;
const BOTTOM_SAFE= H - 22;
const FOOTER_H   = 16;

const fmt = (amount, currency) => `${currency.symbol}${amount.toLocaleString()}`;

const generateQuoteRef = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `EDH-${y}${m}${day}-${rand}`;
};

const drawFooter = (doc, y) => {
  doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.rect(0, H - 3, W, 3, 'F');

  doc.setDrawColor(BORDER[0], BORDER[1], BORDER[2]);
  doc.setLineWidth(0.3);
  doc.line(ML, H - FOOTER_H, W - MR, H - FOOTER_H);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(TEXT_LIGHT[0], TEXT_LIGHT[1], TEXT_LIGHT[2]);
  doc.text(
    'EdohaDeveloped   edohadevelops@gmail.com',
    W / 2, H - FOOTER_H + 5,
    { align: 'center' }
  );
};

const drawPageHeader = (doc) => {
  doc.setFillColor(DARK[0], DARK[1], DARK[2]);
  doc.rect(0, 0, W, HEADER_H, 'F');

  doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.rect(0, HEADER_H - 3, W, 3, 'F');

  // A.E. logo circle
  const logoR = 13;
  const logoX = ML + logoR;
  const logoY = HEADER_H / 2;
  doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.circle(logoX, logoY, logoR, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DARK[0], DARK[1], DARK[2]);
  doc.text('A.E.', logoX, logoY + 3, { align: 'center' });

  // Title
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.text('Website Plan', logoX + logoR + 10, logoY - 4);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('EdohaDeveloped', logoX + logoR + 10, logoY + 6);
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
  returnBase64 = false,
}) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const quoteRef = generateQuoteRef();
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  let page = 1;

  const addPage = () => {
    drawFooter(doc, 0);
    doc.addPage();
    page++;
    doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
    doc.rect(0, 0, W, H, 'F');
    return 14;
  };

  const checkBreak = (y, needed = 12) => {
    if (y + needed > BOTTOM_SAFE - FOOTER_H) return addPage();
    return y;
  };

  // ── PAGE 1 SETUP ──
  doc.setFillColor(WHITE[0], WHITE[1], WHITE[2]);
  doc.rect(0, 0, W, H, 'F');

  drawPageHeader(doc);

  let y = CONTENT_TOP;

  // ── QUOTE META ROW ──
  doc.setFillColor(LIGHT_BG[0], LIGHT_BG[1], LIGHT_BG[2]);
  doc.roundedRect(ML, y, CW, 20, 3, 3, 'F');

  const col1 = ML + 8;
  const col2 = W / 2 - 10;
  const col3 = col2 + 50;
  const metaY = y + 7;

  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(TEXT_LIGHT[0], TEXT_LIGHT[1], TEXT_LIGHT[2]);
  doc.text('QUOTE REF', col1, metaY);
  doc.text('DATE', col2, metaY);
  doc.text('PREPARED FOR', col3, metaY);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
  doc.text(quoteRef, col1, metaY + 5);
  doc.text(today, col2, metaY + 5);
  doc.text(clientDetails.name, col3, metaY + 5);

  if (clientDetails.company) {
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
    doc.text(clientDetails.company, col3, metaY + 10);
  }

  y += 27;

  // Helper: draw a section heading
  const sectionHeading = (label) => {
    y = checkBreak(y, 14);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(label.toUpperCase(), ML, y);
    y += 4;
    doc.setDrawColor(BORDER[0], BORDER[1], BORDER[2]);
    doc.setLineWidth(0.3);
    doc.line(ML, y, W - MR, y);
    y += 5;
  };

  // Helper: wrapped text block
  const wrappedText = (text, x, maxW, size = 9, color = TEXT_DARK, style = 'normal') => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxW);
    lines.forEach(line => {
      y = checkBreak(y, size * 0.4);
      doc.text(line, x, y);
      y += size * 0.45;
    });
  };

  // Helper: line item row
  const lineItem = (label, price, highlight = false) => {
    y = checkBreak(y, 9);
    if (highlight) {
      doc.setFillColor(OFF_WHITE[0], OFF_WHITE[1], OFF_WHITE[2]);
      doc.rect(ML, y - 3.5, CW, 8, 'F');
    }
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
    const labelLines = doc.splitTextToSize(`  ${label}`, CW - 30);
    doc.text(labelLines[0], ML, y + 1);
    doc.setFont('helvetica', 'bold');
    doc.text(price, W - MR, y + 1, { align: 'right' });
    y += 8;
  };

  // ── PROJECT BRIEF ──
  if (projectBrief) {
    sectionHeading('Project Brief');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
    const briefLines = doc.splitTextToSize(projectBrief, CW);
    briefLines.forEach(line => {
      y = checkBreak(y, 6);
      doc.text(line, ML, y);
      y += 5;
    });
    y += 4;
  }

  // ── PROJECT TYPE ──
  sectionHeading('Project Type');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
  doc.text(projectType.name, ML, y);
  doc.setFont('helvetica', 'bold');
  doc.text(fmt(totals.base, currency), W - MR, y, { align: 'right' });
  y += 5;

  const baseDesc = `Base package includes: ${projectType.includes.join(', ')}.`;
  const baseLines = doc.splitTextToSize(baseDesc, CW);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
  baseLines.forEach(line => {
    y = checkBreak(y, 5);
    doc.text(line, ML, y);
    y += 4.5;
  });
  y += 6;

  // ── FEATURES ──
  if (selectedFeatures.length > 0) {
    sectionHeading('Selected Features');
    selectedFeatures.forEach((f, i) => {
      lineItem(f.name, fmt(Math.round(f.price * currency.rate), currency), i % 2 === 0);
    });

    if (totals.discount > 0) {
      y = checkBreak(y, 9);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(GREEN[0], GREEN[1], GREEN[2]);
      doc.text('  10% loyalty discount (5 or more features selected)', ML, y + 1);
      doc.setFont('helvetica', 'bold');
      doc.text(`-${fmt(totals.discount, currency)}`, W - MR, y + 1, { align: 'right' });
      y += 8;
    }
    y += 4;
  }

  // ── TIMELINE SURCHARGE ──
  if (totals.timelineSurcharge > 0 && timeline) {
    sectionHeading('Timeline');
    lineItem(timeline, fmt(totals.timelineSurcharge, currency), false);
    y += 4;
  }

  // ── EXTRAS ──
  if (selectedAddons.length > 0) {
    sectionHeading('Extras');
    selectedAddons.forEach((a, i) => {
      const price = a.isPercentage
        ? fmt(totals.rushAmount, currency)
        : fmt(Math.round(a.price * currency.rate), currency);
      lineItem(a.name, price, i % 2 === 0);
    });
    y += 4;
  }

  // ── TIMELINE ──
  if (timeline || startDate) {
    sectionHeading('Timeline');
    if (startDate) {
      y = checkBreak(y, 7);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
      doc.text(`Preferred start date:  ${startDate}`, ML, y);
      y += 6;
    }
    if (timeline && timeline !== 'none') {
      y = checkBreak(y, 7);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
      doc.text(`Estimated duration:  ${timeline}`, ML, y);
      y += 6;
    }
    y += 4;
  }

  // ── TOTAL BOX ──
  y = checkBreak(y, 22);
  doc.setFillColor(DARK[0], DARK[1], DARK[2]);
  doc.roundedRect(ML, y, CW, 18, 4, 4, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('Total Estimate', ML + 8, y + 7);
  doc.setFontSize(16);
  doc.text(fmt(totals.total, currency), W - MR - 8, y + 11, { align: 'right' });
  if (currency.code === 'NGN') {
    doc.setFontSize(7.5);
    doc.setTextColor(180, 180, 195);
    doc.text(`approx. $${Math.round(totals.total / currency.rate).toLocaleString()} USD`, W - MR - 8, y + 16, { align: 'right' });
  }
  y += 26;

  // ── TERMS ──
  y = checkBreak(y, 14);
  sectionHeading('Terms');

  const terms = [
    'A 50% deposit is required before work begins. The remaining balance is due on completion.',
    'This quote includes 2 rounds of revisions. Additional rounds are available at $20 each.',
    'Final pricing may vary slightly based on details discussed during onboarding.',
    'This quote is valid for 30 days from the date above.',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
  terms.forEach(t => {
    y = checkBreak(y, 6);
    doc.setFontSize(8);
    const tLines = doc.splitTextToSize(`  ${t}`, CW);
    tLines.forEach(line => {
      y = checkBreak(y, 5);
      doc.text(line, ML, y);
      y += 4.5;
    });
  });

  drawFooter(doc, y);

  if (returnBase64) {
    const dataUri = doc.output('datauristring');
    const base64 = dataUri.replace(/^data:application\/pdf;base64,/, '');
    return { quoteRef, base64 };
  }

  doc.save(`EdohaDeveloped_Plan_${quoteRef}.pdf`);
  return quoteRef;
};
