import { jsPDF } from 'jspdf';
import { CertificateData } from '../data/certificate09Data';

interface Segment {
  text: string;
  bold: boolean;
}

/**
 * Converte uma string com marcações **negrito** em segmentos tipográficos
 * para renderização vetorial nativa no jsPDF (texto 100% selecionável e acessível).
 */
function parseRichSegments(raw: string): Segment[] {
  const parts = raw.split(/(\*\*.*?\*\*)/g);
  const segments: Segment[] = [];
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('**') && part.endsWith('**')) {
      segments.push({ text: part.slice(2, -2), bold: true });
    } else {
      segments.push({ text: part, bold: false });
    }
  }
  return segments;
}

interface WordToken {
  word: string;
  bold: boolean;
  width: number;
}

/**
 * Renderiza um parágrafo rico (com palavras em normal e negrito intercaladas)
 * como texto vetorial nativo selecionável no jsPDF, justificado dentro de maxWidthMm.
 */
function drawRichParagraph(
  pdf: jsPDF,
  rawText: string,
  xMm: number,
  startYMm: number,
  maxWidthMm: number,
  fontSizePt: number,
  lineHeightMm: number,
  fontName: 'helvetica' | 'times' = 'helvetica',
  align: 'justify' | 'center' | 'left' = 'justify'
): number {
  const segments = parseRichSegments(rawText);
  const tokens: WordToken[] = [];

  pdf.setFontSize(fontSizePt);

  for (const seg of segments) {
    const words = seg.text.split(/(\s+)/);
    for (const w of words) {
      if (!w || /^\s+$/.test(w)) continue;
      pdf.setFont(fontName, seg.bold ? 'bold' : 'normal');
      const wordWidth = pdf.getTextWidth(w);
      tokens.push({ word: w, bold: seg.bold, width: wordWidth });
    }
  }

  pdf.setFont(fontName, 'normal');
  const spaceWidth = pdf.getTextWidth(' ');

  const lines: WordToken[][] = [];
  let currentLine: WordToken[] = [];
  let currentWidth = 0;

  for (const token of tokens) {
    const additionalWidth = currentLine.length === 0 ? token.width : spaceWidth + token.width;
    if (currentWidth + additionalWidth <= maxWidthMm || currentLine.length === 0) {
      currentLine.push(token);
      currentWidth += additionalWidth;
    } else {
      lines.push(currentLine);
      currentLine = [token];
      currentWidth = token.width;
    }
  }
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  let cursorY = startYMm;

  lines.forEach((lineTokens, lineIndex) => {
    const isLastLine = lineIndex === lines.length - 1;
    const totalWordsWidth = lineTokens.reduce((acc, t) => acc + t.width, 0);
    const gapsCount = Math.max(0, lineTokens.length - 1);
    const naturalLineWidth = totalWordsWidth + gapsCount * spaceWidth;

    let cursorX = xMm;
    let dynamicSpace = spaceWidth;

    if (align === 'center') {
      cursorX = xMm + (maxWidthMm - naturalLineWidth) / 2;
    } else if (align === 'justify' && !isLastLine && gapsCount > 0) {
      const extraSpace = maxWidthMm - totalWordsWidth;
      dynamicSpace = extraSpace / gapsCount;
    }

    for (let i = 0; i < lineTokens.length; i++) {
      const tk = lineTokens[i];
      pdf.setFont(fontName, tk.bold ? 'bold' : 'normal');
      pdf.text(tk.word, cursorX, cursorY);
      cursorX += tk.width + dynamicSpace;
    }

    cursorY += lineHeightMm;
  });

  return cursorY;
}

/**
 * Converte uma string SVG em um PNG DataURL transparente de altíssima definição (Retina 4x)
 * para embutir logotipos, rubricas e selos no PDF vetorial.
 */
async function svgToPngDataUrl(svgString: string, widthPx: number, heightPx: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = widthPx;
      canvas.height = heightPx;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Canvas context unavailable'));
        return;
      }
      ctx.clearRect(0, 0, widthPx, heightPx);
      ctx.drawImage(img, 0, 0, widthPx, heightPx);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}

const SVG_LOGO_EDITORA = `<svg viewBox="0 0 120 120" width="480" height="480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="6" width="108" height="108" rx="18" fill="#E6F4EE" fill-opacity="0.85" stroke="#0F4C3A" stroke-width="3" />
  <path id="curveEd" d="M 18,56 A 42,42 0 1,1 102,56" fill="none" />
  <text fill="#0F4C3A" font-size="7.2" font-weight="bold" letter-spacing="0.5" font-family="Arial, sans-serif">
    <textPath href="#curveEd" startOffset="50%" text-anchor="middle">EDITORA MENTE E SAÚDE</textPath>
  </text>
  <path d="M44 82V74C37 70 34 62 34 53C34 39 45 29 59 29C72 29 82 38 83 50L88 58L82 61V69C82 74 78 77 73 77H66V82" stroke="#0F4C3A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M47 49C47 42 53 37 60 37C67 37 73 42 73 49C73 55 68 60 60 60C52 60 47 55 47 49Z" fill="#1E8E68" fill-opacity="0.3" stroke="#0F4C3A" stroke-width="2"/>
  <path d="M59 35C63 31 69 31 72 35C69 39 63 39 59 35Z" fill="#10B981" stroke="#0F4C3A" stroke-width="1.6"/>
  <path d="M53 45C56 43 60 45 60 49M60 45C63 43 67 45 66 49M54 53C57 55 63 55 66 52" stroke="#0F4C3A" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M36 92C44 89 53 90 60 94C67 90 76 89 84 92V81C76 78 67 79 60 83C53 79 44 78 36 81V92Z" fill="#FFFFFF" stroke="#0F4C3A" stroke-width="2.4" stroke-linejoin="round"/>
  <line x1="60" y1="83" x2="60" y2="94" stroke="#0F4C3A" stroke-width="2.2"/>
</svg>`;

const SVG_LOGO_MARIA_DALVA = `<svg viewBox="0 0 120 120" width="480" height="480" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="54" fill="#162F54" stroke="#0D213F" stroke-width="2.5" />
  <circle cx="60" cy="60" r="46" stroke="#93C5FD" stroke-width="1" stroke-dasharray="2 2" />
  <path id="cTop" d="M 18,60 A 42,42 0 1,1 102,60" fill="none" />
  <path id="cBot" d="M 104,64 A 44,44 0 0,1 16,64" fill="none" />
  <text fill="#F8FAFC" font-size="6.4" font-weight="bold" letter-spacing="0.6" font-family="Arial, sans-serif">
    <textPath href="#cTop" startOffset="50%" text-anchor="middle">CENTRO PROFISSIONALIZANTE</textPath>
  </text>
  <text fill="#FDE68A" font-size="6.4" font-weight="bold" letter-spacing="0.6" font-family="Arial, sans-serif">
    <textPath href="#cBot" startOffset="50%" text-anchor="middle">MARIA DALVA DE ARAÚJO</textPath>
  </text>
  <path d="M60 33C48.95 33 40 41.95 40 53C40 60.4 44.1 66.8 50 70.2V77C50 79.2 51.8 81 54 81H66C68.2 81 70 79.2 70 77V70.2C75.9 66.8 80 60.4 80 53C80 41.95 71.05 33 60 33Z" fill="#38BDF8" fill-opacity="0.25" stroke="#FFFFFF" stroke-width="2.4"/>
  <path d="M60 33V81M41 53H53C53 50 56 50 56 53C56 56 53 56 53 53M60 53H79" stroke="#BAE6FD" stroke-width="2" stroke-linecap="round"/>
  <line x1="53" y1="85" x2="67" y2="85" stroke="#FDE68A" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="56" y1="89" x2="64" y2="89" stroke="#FDE68A" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="60" y1="24" x2="60" y2="28" stroke="#FDE68A" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="36" y1="35" x2="39" y2="38" stroke="#FDE68A" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="84" y1="35" x2="81" y2="38" stroke="#FDE68A" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;

const SVG_SIG_BARBARA = `<svg viewBox="0 0 260 68" width="520" height="136" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M34 52C36 35 40 16 44 13C47 11 55 12 56 20C57 26 46 31 42 33C49 32 61 36 60 45C59 53 45 55 37 51C46 53 64 47 71 39C74 35 72 46 77 46C82 46 88 38 92 42C95 45 96 47 102 45C108 43 115 24 117 16C119 9 112 37 117 44C121 49 129 44 134 40C137 38 137 45 142 45C148 45 154 39 159 43C163 46 169 44 175 41C182 37 194 21 196 15C198 11 191 38 197 44C203 49 216 43 227 38" stroke="#141E30" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M78 27L83 22M140 28C141 27 142 27 143 28" stroke="#141E30" stroke-width="2.4" stroke-linecap="round"/>
</svg>`;

const SVG_SIG_JAMES = `<svg viewBox="0 0 260 68" width="520" height="136" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M32 20C44 13 54 12 53 24C52 36 41 53 33 56C26 59 24 51 33 47C45 42 68 44 86 43C101 42 114 39 124 35C132 32 141 18 145 13C148 9 149 29 151 41C139 36 134 34 159 33C167 33 173 39 180 39C187 39 194 31 200 36C205 40 214 38 221 25C225 18 219 37 226 41C231 44 240 41 247 39" stroke="#111827" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M46 60C88 53 158 49 236 46" stroke="#111827" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

function getSvgSelo(codigo: string): string {
  return `<svg viewBox="0 0 130 130" width="400" height="400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="65" cy="65" r="58" fill="#FEF9E7" stroke="#C59B27" stroke-width="2.6" />
    <circle cx="65" cy="65" r="51" stroke="#D4AF37" stroke-width="1.3" stroke-dasharray="3 2" />
    <text x="65" y="34" text-anchor="middle" fill="#B48608" font-size="9" font-weight="bold" font-family="Arial, sans-serif">★ ★ ★</text>
    <text x="65" y="53" text-anchor="middle" fill="#785604" font-size="10" font-weight="bold" font-family="Arial, sans-serif">SELO OFICIAL</text>
    <text x="65" y="68" text-anchor="middle" fill="#785604" font-size="10.5" font-weight="bold" font-family="Arial, sans-serif">FÉ PÚBLICA</text>
    <line x1="30" y1="75" x2="100" y2="75" stroke="#D4AF37" stroke-width="1.2" />
    <text x="65" y="87" text-anchor="middle" fill="#926C08" font-size="7.2" font-weight="bold" font-family="Courier, monospace">${codigo}</text>
    <text x="65" y="104" text-anchor="middle" fill="#B48608" font-size="8" font-family="Arial, sans-serif">★ ★ ★</text>
  </svg>`;
}

/**
 * Gera o arquivo PDF Oficial de 2 Laudas (A4 Paisagem: 297mm x 210mm)
 * de forma 100% VETORIAL e ACESSÍVEL (texto nativo selecionável/editável)
 * e com HIPERLINKS CLICÁVEIS ativos (URI Action) direcionando para a autenticação.
 */
export async function generateVectorCertificatePdf(
  cert: CertificateData,
  baseUrl: string,
  qrDataUrl: string
): Promise<void> {
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const verificationFullUrl = `${cleanBaseUrl}/?codigo=${cert.codigo}#validador`;

  const [logoEditoraPng, logoDalvaPng, sigBarbaraPng, sigJamesPng, seloPng] = await Promise.all([
    svgToPngDataUrl(SVG_LOGO_EDITORA, 360, 360),
    svgToPngDataUrl(SVG_LOGO_MARIA_DALVA, 360, 360),
    svgToPngDataUrl(SVG_SIG_BARBARA, 520, 136),
    svgToPngDataUrl(SVG_SIG_JAMES, 520, 136),
    svgToPngDataUrl(getSvgSelo(cert.codigo), 360, 360),
  ]);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  pdf.setProperties({
    title: `Certificado de Extensão Nº ${cert.numero} - ${cert.codigo} - ${cert.titular}`,
    subject: cert.titulo,
    author: 'Editora Mente e Saúde & Centro Profissionalizante Maria Dalva de Araújo',
    keywords: `Certificado, Extensão, ${cert.codigo}, ${cert.chave}, FUBOG, Saúde Visual Infantil, Teste do Olhinho`,
    creator: 'Sistema Interinstitucional de Autenticação e Fé Pública',
  });

  /* =========================================================================
   * LAUDA 1 — FRENTE DO CERTIFICADO (297mm x 210mm)
   * ========================================================================= */
  // Fundo Creme Acadêmico (#FAF9F6)
  pdf.setFillColor(250, 249, 246);
  pdf.rect(0, 0, 297, 210, 'F');

  // Moldura Dupla Institucional (#0F4C3A externa e #1B365D interna)
  pdf.setDrawColor(15, 76, 58);
  pdf.setLineWidth(0.75);
  pdf.rect(4, 4, 289, 202);

  pdf.setDrawColor(27, 54, 93);
  pdf.setLineWidth(0.3);
  pdf.rect(5.6, 5.6, 285.8, 198.8);

  // CABEÇALHO SUPERIOR (Esquerda: Editora Mente e Saúde)
  pdf.addImage(logoEditoraPng, 'PNG', 12, 10, 16.5, 16.5);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10.2);
  pdf.setTextColor(15, 76, 58);
  pdf.text('EDITORA MENTE E SAÚDE', 31, 15.2);

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(51, 65, 85);
  pdf.text('CNPJ: 51.372.335/0001-71', 31, 19.5);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(21, 101, 77);
  pdf.text('Conselho Editorial e Extensão Científica', 31, 23.6);

  // CABEÇALHO SUPERIOR (Centro: Programa Interinstitucional)
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.2);
  pdf.setTextColor(30, 41, 59);
  pdf.text('PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO,', 148.5, 14, { align: 'center' });
  pdf.text('COMUNICAÇÃO CIENTÍFICA E EDUCAÇÃO EM SAÚDE', 148.5, 18, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.8);
  pdf.setTextColor(51, 65, 85);
  pdf.text(
    `Certificado Nº ${cert.numero} · Livro de Extensão nº ${cert.livro} · Cód. ${cert.codigo}`,
    148.5,
    23.2,
    { align: 'center' }
  );

  // CABEÇALHO SUPERIOR (Direita: Centro Profissionalizante Maria Dalva de Araújo)
  pdf.addImage(logoDalvaPng, 'PNG', 268.5, 10, 16.5, 16.5);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.8);
  pdf.setTextColor(22, 47, 84);
  pdf.text('CENTRO PROFISSIONALIZANTE', 266, 15, { align: 'right' });
  pdf.text('MARIA DALVA DE ARAÚJO', 266, 19.2, { align: 'right' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(51, 65, 85);
  pdf.text('CNPJ: 51.269.112/0001-83', 266, 23.5, { align: 'right' });

  // Linha divisória do cabeçalho
  pdf.setDrawColor(213, 207, 194);
  pdf.setLineWidth(0.3);
  pdf.line(12, 29, 285, 29);

  // TÍTULO PRINCIPAL
  pdf.setFont('times', 'bold');
  pdf.setFontSize(24.5);
  pdf.setTextColor(15, 76, 58);
  pdf.text('CERTIFICADO DE ATIVIDADE DE EXTENSÃO', 148.5, 41, { align: 'center' });

  // Frase introdutória institucional
  pdf.setTextColor(31, 41, 55);
  drawRichParagraph(
    pdf,
    'A **Editora Mente e Saúde** (CNPJ: 51.372.335/0001-71), em parceria institucional com o **Centro Profissionalizante Maria Dalva de Araújo** (CNPJ: 51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica que',
    24,
    49,
    249,
    10.4,
    5,
    'helvetica',
    'center'
  );

  // CAIXA DE DESTAQUE DO TITULAR
  pdf.setFillColor(243, 239, 230);
  pdf.setDrawColor(214, 206, 190);
  pdf.setLineWidth(0.35);
  pdf.rect(22, 58, 253, 22, 'FD');

  pdf.setFont('times', 'bold');
  pdf.setFontSize(21.5);
  pdf.setTextColor(20, 40, 75);
  pdf.text(cert.titular.toUpperCase(), 148.5, 68.2, { align: 'center' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10.2);
  pdf.setTextColor(30, 41, 59);
  pdf.text(`${cert.qualificacao} | CPF: ${cert.cpf} | ${cert.instituicaoOrigem}`, 148.5, 75.5, {
    align: 'center',
  });

  // CORPO DO CERTIFICADO (2 Parágrafos Justificados com Palavras-Chave em Negrito)
  pdf.setTextColor(31, 41, 55);
  const p1Text = `participou de forma efetiva da **Atividade de Extensão** intitulada **“${cert.titulo}”**, desenvolvida na modalidade de **${cert.modalidadeTexto}**, realizada no período de **${cert.periodo}**, contabilizando carga horária total de **${cert.cargaHorariaExtenso}**.`;

  let nextY = drawRichParagraph(pdf, p1Text, 22, 88.5, 253, 10.3, 5.2, 'helvetica', 'justify');

  const p2Text = `No âmbito desta ação extensionista, o profissional atuou na estruturação e aplicação de enquete digital interativa para pais, responsáveis e professores identificarem sinais precoces de ametropias na infância (**coleta de dados populacionais**), elaboração e **distribuição comunitária gratuita de materiais educativos (folhetos e mini e-book ilustrado sobre o Teste do Olhinho)**, **comunicação científica para combate à desinformação (fake news)** em saúde ocular pediátrica, e **divulgação dos canais oficiais de triagem neonatal, vacinação na Caderneta da Criança e referência em Oftalmologia do SUS**.`;

  nextY = drawRichParagraph(pdf, p2Text, 22, nextY + 3.2, 253, 10.3, 5.2, 'helvetica', 'justify');

  // DATA E LOCAL DE EMISSÃO
  pdf.setFont('times', 'bolditalic');
  pdf.setFontSize(14.5);
  pdf.setTextColor(17, 24, 39);
  pdf.text(`${cert.localEmissao}, ${cert.dataEmissao}.`, 148.5, 139, { align: 'center' });

  // RODAPÉ DA FRENTE: ASSINATURAS, SELO, QR CODE CLICÁVEL E CAIXA MANUAL CLICÁVEL
  // 1. Assinatura Esquerda: Bárbara Lima dos Santos
  pdf.addImage(sigBarbaraPng, 'PNG', 26, 154, 52, 13.5);
  pdf.setDrawColor(51, 65, 85);
  pdf.setLineWidth(0.35);
  pdf.line(16, 169, 88, 169);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.8);
  pdf.setTextColor(17, 24, 39);
  pdf.text('BÁRBARA LIMA DOS SANTOS', 52, 173.8, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.6);
  pdf.setTextColor(51, 65, 85);
  pdf.text('Editora-Chefe e Coordenadora de Extensão Editorial', 52, 177.8, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.2);
  pdf.setTextColor(30, 41, 59);
  pdf.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 52, 181.8, { align: 'center' });

  // 2. Centro: Selo Oficial + QR Code (com Link Clicável) + Caixa de Autenticação Manual (com Link Clicável)
  pdf.addImage(seloPng, 'PNG', 96, 155, 25, 25);

  // Moldura e QR Code Central
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(203, 213, 225);
  pdf.setLineWidth(0.3);
  pdf.rect(124, 155.5, 24, 24, 'FD');
  if (qrDataUrl) {
    pdf.addImage(qrDataUrl, 'PNG', 125.2, 156.7, 21.6, 21.6);
  }
  // Link clicável sobre o QR Code da Frente
  pdf.link(124, 155.5, 24, 24, { url: verificationFullUrl });

  // Caixa de Autenticação Pública Manual
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(203, 213, 225);
  pdf.rect(151, 155.5, 52, 24, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6.5);
  pdf.setTextColor(15, 76, 58);
  pdf.text('AUTENTICAÇÃO PÚBLICA MANUAL', 153, 159.8);

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.6);
  pdf.setTextColor(30, 41, 59);
  pdf.text(`Cód.: ${cert.codigo}`, 153, 164);
  pdf.text(`Chave: ${cert.chave}`, 153, 167.6);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6);
  pdf.setTextColor(71, 85, 105);
  pdf.text('Endereço p/ Verificação Online (Clique):', 153, 171.5);

  // URL Clicável dentro da Caixa Manual
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6);
  pdf.setTextColor(15, 76, 58);
  const shortDisplayUrl = `${cleanBaseUrl}/`;
  const wrappedUrlLines = pdf.splitTextToSize(shortDisplayUrl, 48);
  pdf.text(wrappedUrlLines.slice(0, 2), 153, 175);
  pdf.link(151, 155.5, 52, 24, { url: verificationFullUrl });

  // 3. Assinatura Direita: James Araújo de Santana
  pdf.addImage(sigJamesPng, 'PNG', 219, 154, 52, 13.5);
  pdf.setDrawColor(51, 65, 85);
  pdf.setLineWidth(0.35);
  pdf.line(209, 169, 281, 169);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.8);
  pdf.setTextColor(17, 24, 39);
  pdf.text('JAMES ARAÚJO DE SANTANA', 245, 173.8, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.6);
  pdf.setTextColor(51, 65, 85);
  pdf.text('Coordenador de Extensão e Projetos Educativos', 245, 177.8, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(6.9);
  pdf.setTextColor(30, 41, 59);
  pdf.text('Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)', 245, 181.8, {
    align: 'center',
  });

  // Linha Final Clicável de Verificação no Rodapé da Frente
  pdf.setDrawColor(213, 207, 194);
  pdf.setLineWidth(0.3);
  pdf.line(12, 191, 285, 191);

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.4);
  pdf.setTextColor(15, 76, 58);
  const footerLineText = `Verifique via QR Code ou clique aqui: ${verificationFullUrl} (Código ${cert.codigo} | Chave ${cert.chave})`;
  pdf.text(footerLineText, 148.5, 196.2, { align: 'center' });
  pdf.link(20, 192, 257, 7, { url: verificationFullUrl });

  /* =========================================================================
   * LAUDA 2 — VERSO: MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO (297mm x 210mm)
   * ========================================================================= */
  pdf.addPage('a4', 'landscape');

  // Fundo Creme Acadêmico (#FAF9F6)
  pdf.setFillColor(250, 249, 246);
  pdf.rect(0, 0, 297, 210, 'F');

  // Moldura Dupla Institucional
  pdf.setDrawColor(15, 76, 58);
  pdf.setLineWidth(0.75);
  pdf.rect(4, 4, 289, 202);

  pdf.setDrawColor(27, 54, 93);
  pdf.setLineWidth(0.3);
  pdf.rect(5.6, 5.6, 285.8, 198.8);

  // CABEÇALHO DO VERSO
  pdf.addImage(logoEditoraPng, 'PNG', 12, 9.5, 12.5, 12.5);
  pdf.addImage(logoDalvaPng, 'PNG', 26, 9.5, 12.5, 12.5);

  pdf.setFont('times', 'bold');
  pdf.setFontSize(15.5);
  pdf.setTextColor(15, 76, 58);
  pdf.text('MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO', 42, 15);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.8);
  pdf.setTextColor(71, 85, 105);
  pdf.text(
    `Verso Oficial do Certificado Nº ${cert.numero} · Fé Pública Interinstitucional e Validação Curricular`,
    42,
    20.2
  );

  pdf.setDrawColor(213, 207, 194);
  pdf.setLineWidth(0.3);
  pdf.line(12, 24.5, 285, 24.5);

  // QUADROS 1 E 2 (Identificação e Enquadramento)
  // Quadro 1 (Esquerda)
  pdf.setFillColor(244, 241, 234);
  pdf.setDrawColor(214, 206, 190);
  pdf.setLineWidth(0.3);
  pdf.rect(12, 27.5, 134, 30, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(15, 76, 58);
  pdf.text('1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA', 15.5, 32.8);

  pdf.setFontSize(8.6);
  pdf.setTextColor(30, 41, 59);
  drawRichParagraph(pdf, `Titular Certificado: **${cert.titular}**`, 15.5, 38, 127, 8.6, 4.5, 'helvetica', 'left');
  drawRichParagraph(pdf, `CPF Registrado: **${cert.cpf}**`, 15.5, 42.8, 127, 8.6, 4.5, 'helvetica', 'left');
  drawRichParagraph(
    pdf,
    `Qualificação Profissional: **${cert.qualificacao}**`,
    15.5,
    47.6,
    127,
    8.6,
    4.5,
    'helvetica',
    'left'
  );
  drawRichParagraph(
    pdf,
    `Instituição de Origem: **${cert.instituicaoOrigem}**`,
    15.5,
    52.4,
    127,
    8.6,
    4.5,
    'helvetica',
    'left'
  );

  // Quadro 2 (Direita)
  pdf.setFillColor(244, 241, 234);
  pdf.setDrawColor(214, 206, 190);
  pdf.rect(151, 27.5, 134, 30, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(15, 76, 58);
  pdf.text('2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO', 154.5, 32.8);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.2);
  pdf.setTextColor(17, 24, 39);
  const enqLines = pdf.splitTextToSize(cert.enquadramentoCurricular, 126);
  pdf.text(enqLines, 154.5, 38.5);

  pdf.setDrawColor(221, 214, 199);
  pdf.line(154.5, 48.5, 281.5, 48.5);

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(8.8);
  pdf.setTextColor(30, 41, 59);
  pdf.text(`Período: ${cert.periodo}  |  Total: ${cert.cargaHorariaNumero}h`, 154.5, 53.5);

  // QUADRO 3: MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(214, 206, 190);
  pdf.rect(12, 60.5, 273, 70, 'FD');

  // Cabeçalho da Tabela
  pdf.setFillColor(239, 236, 228);
  pdf.rect(12, 60.5, 273, 7.5, 'FD');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(15, 76, 58);
  pdf.text(
    `3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (${cert.cargaHorariaNumero} HORAS)`,
    15.5,
    65.5
  );

  let rowY = 68;
  const rowHeight = 15.6;

  cert.eixosVerso.forEach((item, idx) => {
    if (idx > 0) {
      pdf.setDrawColor(229, 224, 213);
      pdf.line(12, rowY, 285, rowY);
    }

    // Coluna 1: Nome do Eixo e Subtítulo
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.2);
    pdf.setTextColor(17, 24, 39);
    const eixoLines = pdf.splitTextToSize(item.eixo, 82);
    pdf.text(eixoLines, 15.5, rowY + 4.8);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.1);
    pdf.setTextColor(100, 116, 139);
    const subLines = pdf.splitTextToSize(item.subtitulo, 82);
    pdf.text(subLines, 15.5, rowY + 11.5);

    // Coluna 2: Descrição Metodológica
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(51, 65, 85);
    const descLines = pdf.splitTextToSize(item.descricao, 156);
    pdf.text(descLines.slice(0, 3), 101, rowY + 4.8);

    // Coluna 3: Carga Horária
    pdf.setFont('courier', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(15, 76, 58);
    pdf.text(item.cargaHoraria, 281.5, rowY + 8.5, { align: 'right' });

    rowY += rowHeight;
  });

  // QUADRO 4: REGISTRO OFICIAL DE FÉ PÚBLICA E VERIFICAÇÃO CLICÁVEL
  pdf.setFillColor(252, 249, 238);
  pdf.setDrawColor(212, 175, 55);
  pdf.setLineWidth(0.4);
  pdf.rect(12, 133.5, 273, 33.5, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(133, 91, 6);
  pdf.text(
    '4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE',
    15.5,
    138.8
  );

  pdf.setTextColor(30, 41, 59);
  drawRichParagraph(
    pdf,
    `Certificado registrado sob o **nº ${cert.numero} no Livro de Extensão nº ${cert.livro}, Folha ${cert.folha}**, expedido pela **Editora Mente e Saúde** (CNPJ: 51.372.335/0001-71) e **Centro Profissionalizante Maria Dalva de Araújo** (CNPJ: 51.269.112/0001-83).`,
    15.5,
    144,
    235,
    8.2,
    4.2,
    'helvetica',
    'left'
  );

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(17, 24, 39);
  pdf.text(
    `CÓDIGO DE AUTENTICIDADE: ${cert.codigo}   |   CHAVE DE CONTROLE / DÍGITO: ${cert.chave}`,
    15.5,
    153.2
  );

  // Link Clicável Manual no Verso
  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7.6);
  pdf.setTextColor(15, 76, 58);
  pdf.text(
    `ENDEREÇO PARA VERIFICAÇÃO MANUAL (CLIQUE AQUI): ${verificationFullUrl}`,
    15.5,
    158.2
  );
  pdf.link(15, 155, 235, 5, { url: verificationFullUrl });

  pdf.setFont('courier', 'normal');
  pdf.setFontSize(7.2);
  pdf.setTextColor(71, 85, 105);
  pdf.text(`HASH SHA-256: ${cert.hashSha256}`, 15.5, 163);

  // QR Code no Verso com Link Clicável
  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(212, 175, 55);
  pdf.rect(254.5, 136.2, 27, 27, 'FD');
  if (qrDataUrl) {
    pdf.addImage(qrDataUrl, 'PNG', 255.8, 137.5, 24.4, 24.4);
  }
  pdf.link(254.5, 136.2, 27, 27, { url: verificationFullUrl });

  // RODAPÉ DO VERSO (Assinaturas e Fé Pública)
  pdf.addImage(sigBarbaraPng, 'PNG', 28, 170, 46, 12);
  pdf.setDrawColor(51, 65, 85);
  pdf.setLineWidth(0.35);
  pdf.line(16, 183, 86, 183);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.2);
  pdf.setTextColor(17, 24, 39);
  pdf.text('BÁRBARA LIMA DOS SANTOS', 51, 187.5, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7);
  pdf.setTextColor(51, 65, 85);
  pdf.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 51, 191.5, { align: 'center' });

  // Centro do Rodapé do Verso
  pdf.setFont('times', 'bolditalic');
  pdf.setFontSize(12);
  pdf.setTextColor(17, 24, 39);
  pdf.text(`${cert.localEmissao}, ${cert.dataEmissao}.`, 148.5, 181.5, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(71, 85, 105);
  pdf.text(
    'Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional',
    148.5,
    186.5,
    { align: 'center' }
  );

  pdf.setFont('courier', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(100, 116, 139);
  pdf.text(`Registro: ${cert.codigo} · Chave: ${cert.chave}`, 148.5, 191, { align: 'center' });
  pdf.link(95, 188, 107, 5, { url: verificationFullUrl });

  // Assinatura Direita do Verso
  pdf.addImage(sigJamesPng, 'PNG', 223, 170, 46, 12);
  pdf.setDrawColor(51, 65, 85);
  pdf.setLineWidth(0.35);
  pdf.line(211, 183, 281, 183);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.2);
  pdf.setTextColor(17, 24, 39);
  pdf.text('JAMES ARAÚJO DE SANTANA', 246, 187.5, { align: 'center' });

  pdf.setFont('courier', 'bold');
  pdf.setFontSize(7);
  pdf.setTextColor(51, 65, 85);
  pdf.text('Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)', 246, 191.5, {
    align: 'center',
  });

  // Salva o PDF Vetorial Acessível e com Links Clicáveis
  const safeName = cert.titular
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
  pdf.save(`Certificado_Extensao_${cert.numero}_${cert.codigo}_${safeName}.pdf`);
}
