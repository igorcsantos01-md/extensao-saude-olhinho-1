import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { CERTIFICATE_09, CertificateData } from '../data/certificate09Data';
import { generateVectorCertificatePdf } from '../utils/generateVectorCertificatePdf';
import {
  Download,
  Printer,
  ShieldCheck,
  Loader2,
  Edit3,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface Certificate09DocumentProps {
  baseUrl: string;
  onAuthenticateClick?: (codigo: string) => void;
}

/* 1. Logotipo Higienizado: Editora Mente e Saúde (Fundo 100% Transparente) */
export const LogoEditoraMenteSaude: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="108" height="108" rx="18" fill="#E6F4EE" fillOpacity="0.65" stroke="#0F4C3A" strokeWidth="2.8" />
    <path id="curveEditora" d="M 18,56 A 42,42 0 1,1 102,56" fill="none" />
    <text fill="#0F4C3A" fontSize="7.3" fontWeight="700" letterSpacing="0.6" fontFamily="Plus Jakarta Sans, sans-serif">
      <textPath href="#curveEditora" startOffset="50%" textAnchor="middle">
        EDITORA MENTE E SAÚDE
      </textPath>
    </text>
    <path
      d="M44 82V74C37 70 34 62 34 53C34 39 45 29 59 29C72 29 82 38 83 50L88 58L82 61V69C82 74 78 77 73 77H66V82"
      stroke="#0F4C3A"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M47 49C47 42 53 37 60 37C67 37 73 42 73 49C73 55 68 60 60 60C52 60 47 55 47 49Z"
      fill="#1E8E68"
      fillOpacity="0.25"
      stroke="#0F4C3A"
      strokeWidth="2"
    />
    <path
      d="M59 35C63 31 69 31 72 35C69 39 63 39 59 35Z"
      fill="#10B981"
      stroke="#0F4C3A"
      strokeWidth="1.6"
    />
    <path
      d="M53 45C56 43 60 45 60 49M60 45C63 43 67 45 66 49M54 53C57 55 63 55 66 52"
      stroke="#0F4C3A"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M36 92C44 89 53 90 60 94C67 90 76 89 84 92V81C76 78 67 79 60 83C53 79 44 78 36 81V92Z"
      fill="#FFFFFF"
      stroke="#0F4C3A"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <line x1="60" y1="83" x2="60" y2="94" stroke="#0F4C3A" strokeWidth="2.2" />
  </svg>
);

/* 2. Logotipo Higienizado: Centro Profissionalizante Maria Dalva de Araújo */
export const LogoCentroMariaDalva: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="#162F54" stroke="#0D213F" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="46" stroke="#93C5FD" strokeWidth="1" strokeDasharray="2 2" />
    <path id="curveTopDalva" d="M 18,60 A 42,42 0 1,1 102,60" fill="none" />
    <path id="curveBottomDalva" d="M 104,64 A 44,44 0 0,1 16,64" fill="none" />
    <text fill="#F8FAFC" fontSize="6.5" fontWeight="700" letterSpacing="0.7" fontFamily="Plus Jakarta Sans, sans-serif">
      <textPath href="#curveTopDalva" startOffset="50%" textAnchor="middle">
        CENTRO PROFISSIONALIZANTE
      </textPath>
    </text>
    <text fill="#FDE68A" fontSize="6.5" fontWeight="700" letterSpacing="0.65" fontFamily="Plus Jakarta Sans, sans-serif">
      <textPath href="#curveBottomDalva" startOffset="50%" textAnchor="middle">
        MARIA DALVA DE ARAÚJO
      </textPath>
    </text>
    <path
      d="M60 33C48.95 33 40 41.95 40 53C40 60.4 44.1 66.8 50 70.2V77C50 79.2 51.8 81 54 81H66C68.2 81 70 79.2 70 77V70.2C75.9 66.8 80 60.4 80 53C80 41.95 71.05 33 60 33Z"
      fill="#38BDF8"
      fillOpacity="0.22"
      stroke="#FFFFFF"
      strokeWidth="2.4"
    />
    <path
      d="M60 33V81M41 53H53C53 50 56 50 56 53C56 56 53 56 53 53M60 53H79"
      stroke="#BAE6FD"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line x1="53" y1="85" x2="67" y2="85" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="56" y1="89" x2="64" y2="89" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="60" y1="24" x2="60" y2="28" stroke="#FDE68A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="36" y1="35" x2="39" y2="38" stroke="#FDE68A" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="84" y1="35" x2="81" y2="38" stroke="#FDE68A" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/* 3. Assinatura Vetorial Higienizada 1: Bárbara Lima dos Santos */
export const SignatureBarbara: React.FC<{ className?: string }> = ({ className = 'w-52 h-14' }) => (
  <svg viewBox="0 0 260 68" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M34 52C36 35 40 16 44 13C47 11 55 12 56 20C57 26 46 31 42 33C49 32 61 36 60 45C59 53 45 55 37 51C46 53 64 47 71 39C74 35 72 46 77 46C82 46 88 38 92 42C95 45 96 47 102 45C108 43 115 24 117 16C119 9 112 37 117 44C121 49 129 44 134 40C137 38 137 45 142 45C148 45 154 39 159 43C163 46 169 44 175 41C182 37 194 21 196 15C198 11 191 38 197 44C203 49 216 43 227 38"
      stroke="#141E30"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M78 27L83 22M140 28C141 27 142 27 143 28"
      stroke="#141E30"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/* 4. Assinatura Vetorial Higienizada 2: James Araújo de Santana */
export const SignatureJames: React.FC<{ className?: string }> = ({ className = 'w-52 h-14' }) => (
  <svg viewBox="0 0 260 68" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 20C44 13 54 12 53 24C52 36 41 53 33 56C26 59 24 51 33 47C45 42 68 44 86 43C101 42 114 39 124 35C132 32 141 18 145 13C148 9 149 29 151 41C139 36 134 34 159 33C167 33 173 39 180 39C187 39 194 31 200 36C205 40 214 38 221 25C225 18 219 37 226 41C231 44 240 41 247 39"
      stroke="#111827"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M46 60C88 53 158 49 236 46"
      stroke="#111827"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/* 5. Selo Oficial de Fé Pública Dourado */
export const SeloOficialFePublica: React.FC<{ codigo: string; className?: string }> = ({
  codigo,
  className = 'w-28 h-28',
}) => (
  <svg viewBox="0 0 130 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="65" cy="65" r="58" fill="#FEF9E7" stroke="#C59B27" strokeWidth="2.5" />
    <circle cx="65" cy="65" r="51" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3 2" />
    <text x="65" y="34" textAnchor="middle" fill="#B48608" fontSize="9" fontWeight="700">
      ★ ★ ★
    </text>
    <text
      x="65"
      y="53"
      textAnchor="middle"
      fill="#785604"
      fontSize="10"
      fontWeight="800"
      letterSpacing="0.8"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      SELO OFICIAL
    </text>
    <text
      x="65"
      y="68"
      textAnchor="middle"
      fill="#785604"
      fontSize="10.5"
      fontWeight="800"
      letterSpacing="0.6"
      fontFamily="Plus Jakarta Sans, sans-serif"
    >
      FÉ PÚBLICA
    </text>
    <line x1="30" y1="75" x2="100" y2="75" stroke="#D4AF37" strokeWidth="1" />
    <text
      x="65"
      y="87"
      textAnchor="middle"
      fill="#926C08"
      fontSize="7.2"
      fontWeight="700"
      fontFamily="IBM Plex Mono, monospace"
    >
      {codigo}
    </text>
    <text x="65" y="104" textAnchor="middle" fill="#B48608" fontSize="8">
      ★ ★ ★
    </text>
  </svg>
);

export const Certificate09Document: React.FC<Certificate09DocumentProps> = ({
  baseUrl,
  onAuthenticateClick,
}) => {
  const [certData, setCertData] = useState<CertificateData>(CERTIFICATE_09);
  const [customUrl, setCustomUrl] = useState<string>(baseUrl);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [selectedView, setSelectedView] = useState<'both' | 'front' | 'back'>('both');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [scale, setScale] = useState(1);

  const containerWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (baseUrl) {
      setCustomUrl(baseUrl);
    }
  }, [baseUrl]);

  const cleanBaseUrl = customUrl.replace(/\/$/, '');
  const verificationFullUrl = `${cleanBaseUrl}/?codigo=${certData.codigo}#validador`;

  useEffect(() => {
    QRCode.toDataURL(verificationFullUrl, {
      width: 360,
      margin: 1,
      color: {
        dark: '#111827',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR Code generation error:', err));
  }, [verificationFullUrl]);

  useEffect(() => {
    const updateScale = () => {
      if (!containerWrapperRef.current) return;
      const availableWidth = containerWrapperRef.current.clientWidth - 32;
      const targetWidth = 1122.5;
      if (availableWidth < targetWidth) {
        setScale(Math.max(0.28, availableWidth / targetWidth));
      } else {
        setScale(1);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleDownloadVectorPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      await generateVectorCertificatePdf(certData, cleanBaseUrl, qrDataUrl);
    } catch (error) {
      console.error('Erro ao gerar PDF vetorial, acionando impressão nativa:', error);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleVerificationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    window.history.replaceState(null, '', `?codigo=${certData.codigo}#validador`);
    if (onAuthenticateClick) {
      onAuthenticateClick(certData.codigo);
    } else {
      const el = document.getElementById('validador');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetDefault = () => {
    setCertData(CERTIFICATE_09);
    setCustomUrl(baseUrl);
  };

  /* Componente Interno da Lauda 1 (Frente) com Texto Selecionável e Links Clicáveis */
  const renderFrontPage = () => (
    <div
      className="cert-page-a4 cert-print-page shadow-xl rounded-sm mx-auto"
      style={{ backgroundColor: '#FAF9F6' }}
    >
      {/* Moldura Dupla Institucional (#0F4C3A externa e #1B365D interna) */}
      <div className="absolute inset-[14px] border-[2.5px] border-[#0F4C3A] pointer-events-none" />
      <div className="absolute inset-[20px] border-[1px] border-[#1B365D] pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-between px-[44px] py-[30px]">
        {/* CABEÇALHO SUPERIOR */}
        <div>
          <div className="grid grid-cols-12 items-center pb-3 border-b border-[#D5CFC2]">
            <div className="col-span-4 flex items-center gap-3">
              <LogoEditoraMenteSaude className="w-[62px] h-[62px] shrink-0" />
              <div className="leading-tight">
                <p className="text-[14px] font-extrabold tracking-tight text-[#0F4C3A]">
                  EDITORA MENTE E SAÚDE
                </p>
                <p className="text-[10.5px] font-bold text-[#334155] font-mono-tabular mt-0.5">
                  CNPJ: 51.372.335/0001-71
                </p>
                <p className="text-[10.5px] font-medium text-[#15654D] mt-0.5">
                  Conselho Editorial e Extensão Científica
                </p>
              </div>
            </div>

            <div className="col-span-4 text-center px-1">
              <p className="text-[10.5px] font-extrabold tracking-wider text-[#1E293B] uppercase leading-snug">
                PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO,
                <br />
                COMUNICAÇÃO CIENTÍFICA E EDUCAÇÃO EM SAÚDE
              </p>
              <p className="text-[10px] font-bold text-[#334155] font-mono-tabular mt-1.5">
                Certificado Nº {certData.numero} · Livro de Extensão nº {certData.livro} · Cód.{' '}
                {certData.codigo}
              </p>
            </div>

            <div className="col-span-4 flex items-center justify-end gap-3 text-right">
              <div className="leading-tight">
                <p className="text-[13.5px] font-extrabold tracking-tight text-[#162F54]">
                  CENTRO PROFISSIONALIZANTE
                </p>
                <p className="text-[13.5px] font-extrabold tracking-tight text-[#162F54]">
                  MARIA DALVA DE ARAÚJO
                </p>
                <p className="text-[10.5px] font-bold text-[#334155] font-mono-tabular mt-0.5">
                  CNPJ: 51.269.112/0001-83
                </p>
              </div>
              <LogoCentroMariaDalva className="w-[62px] h-[62px] shrink-0" />
            </div>
          </div>

          {/* TÍTULO DO CERTIFICADO */}
          <div className="text-center mt-4">
            <h1 className="font-cert-serif text-[34px] font-extrabold tracking-[0.04em] text-[#0F4C3A] uppercase leading-none">
              CERTIFICADO DE ATIVIDADE DE EXTENSÃO
            </h1>
            <p className="text-[13.8px] text-[#262626] mt-3 max-w-[920px] mx-auto leading-relaxed">
              A <strong className="font-bold text-[#111827]">Editora Mente e Saúde</strong> (CNPJ: 51.372.335/0001-71),
              em parceria institucional com o{' '}
              <strong className="font-bold text-[#111827]">
                Centro Profissionalizante Maria Dalva de Araújo
              </strong>{' '}
              (CNPJ: 51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica que
            </p>
          </div>

          {/* CAIXA DE DESTAQUE DO MÉDICO TITULAR */}
          <div className="my-3.5 bg-[#F3EFE6] border border-[#D6CEBE] py-3 px-6 text-center max-w-[960px] mx-auto">
            <h2 className="font-cert-serif text-[29px] font-extrabold tracking-[0.03em] text-[#14284B] uppercase leading-tight">
              {certData.titular}
            </h2>
            <p className="text-[13.5px] font-bold text-[#1E293B] mt-1">
              {certData.qualificacao} | CPF: {certData.cpf} | {certData.instituicaoOrigem}
            </p>
          </div>

          {/* CORPO DO TEXTO COM PALAVRAS-CHAVE DO EDITAL EM NEGRITO */}
          <div className="max-w-[960px] mx-auto space-y-3 text-justify text-[13.8px] leading-[1.58] text-[#1F2937]">
            <p>
              participou de forma efetiva da <strong className="font-bold text-[#111827]">Atividade de Extensão</strong>{' '}
              intitulada{' '}
              <strong className="font-bold text-[#111827]">
                “{certData.titulo}”
              </strong>
              , desenvolvida na modalidade de{' '}
              <strong className="font-bold text-[#111827]">{certData.modalidadeTexto}</strong>, realizada no
              período de <strong className="font-bold text-[#111827]">{certData.periodo}</strong>, contabilizando
              carga horária total de{' '}
              <strong className="font-bold text-[#111827]">{certData.cargaHorariaExtenso}</strong>.
            </p>
            <p>
              No âmbito desta ação extensionista, o profissional atuou na estruturação e aplicação de enquete digital
              interativa para pais, responsáveis e professores identificarem sinais precoces de ametropias na infância (
              <strong className="font-bold text-[#111827]">coleta de dados populacionais</strong>), elaboração e{' '}
              <strong className="font-bold text-[#111827]">
                distribuição comunitária gratuita de materiais educativos (folhetos e mini e-book ilustrado sobre o
                Teste do Olhinho)
              </strong>
              ,{' '}
              <strong className="font-bold text-[#111827]">
                comunicação científica para combate à desinformação (fake news)
              </strong>{' '}
              em saúde ocular pediátrica, e{' '}
              <strong className="font-bold text-[#111827]">
                divulgação dos canais oficiais de triagem neonatal, vacinação na Caderneta da Criança e referência em
                Oftalmologia do SUS
              </strong>
              .
            </p>
          </div>

          {/* DATA E LOCAL */}
          <div className="text-center mt-4">
            <p className="font-cert-serif italic font-bold text-[19px] text-[#111827]">
              {certData.localEmissao}, {certData.dataEmissao}.
            </p>
          </div>
        </div>

        {/* RODAPÉ: ASSINATURAS + SELO + QR CODE CLICÁVEL + CAIXA MANUAL CLICÁVEL */}
        <div>
          <div className="grid grid-cols-12 items-end gap-2 pt-1">
            {/* Assinatura Esquerda: Bárbara Lima dos Santos */}
            <div className="col-span-4 text-center flex flex-col items-center">
              <SignatureBarbara className="w-[190px] h-[48px] -mb-1" />
              <div className="w-full max-w-[290px] border-t border-[#334155] pt-1.5">
                <p className="text-[11.5px] font-extrabold text-[#111827] uppercase tracking-wide">
                  BÁRBARA LIMA DOS SANTOS
                </p>
                <p className="text-[10px] text-[#334155] font-medium">
                  Editora-Chefe e Coordenadora de Extensão Editorial
                </p>
                <p className="text-[9.5px] font-bold text-[#1E293B] font-mono-tabular mt-0.5">
                  Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                </p>
              </div>
            </div>

            {/* Centro: Selo Oficial + QR Code Clicável + Caixa Manual Clicável */}
            <div className="col-span-4 flex items-center justify-center gap-2.5">
              <SeloOficialFePublica codigo={certData.codigo} className="w-[92px] h-[92px] shrink-0" />

              <a
                href={verificationFullUrl}
                onClick={handleVerificationClick}
                title="Clique para autenticar este certificado no Validador Oficial"
                className="bg-white p-1.5 border border-[#CBD5E1] hover:border-[#0F4C3A] transition-colors shrink-0 block cursor-pointer"
              >
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR Code de Autenticação Oficial"
                    className="w-[82px] h-[82px] block"
                  />
                ) : (
                  <div className="w-[82px] h-[82px] bg-stone-100 flex items-center justify-center text-[9px]">
                    QR CODE
                  </div>
                )}
              </a>

              <div className="border border-[#CBD5E1] bg-[#FFFFFF] px-2.5 py-2 text-left leading-snug max-w-[178px]">
                <p className="text-[8.5px] font-extrabold text-[#0F4C3A] uppercase tracking-wider">
                  AUTENTICAÇÃO PÚBLICA MANUAL
                </p>
                <p className="text-[8.5px] font-bold text-[#1E293B] font-mono-tabular mt-1">
                  Cód.: {certData.codigo}
                </p>
                <p className="text-[8.5px] font-bold text-[#1E293B] font-mono-tabular">
                  Chave: {certData.chave}
                </p>
                <p className="text-[8px] font-semibold text-[#475569] mt-1">
                  Endereço p/ Verificação Online:
                </p>
                <a
                  href={verificationFullUrl}
                  onClick={handleVerificationClick}
                  title="Clique para abrir o autenticador deste certificado"
                  className="text-[7.5px] font-mono-tabular font-bold text-[#0F4C3A] underline hover:text-[#D97706] break-all leading-tight block cursor-pointer"
                >
                  {cleanBaseUrl}/
                </a>
              </div>
            </div>

            {/* Assinatura Direita: James Araújo de Santana */}
            <div className="col-span-4 text-center flex flex-col items-center">
              <SignatureJames className="w-[190px] h-[48px] -mb-1" />
              <div className="w-full max-w-[295px] border-t border-[#334155] pt-1.5">
                <p className="text-[11.5px] font-extrabold text-[#111827] uppercase tracking-wide">
                  JAMES ARAÚJO DE SANTANA
                </p>
                <p className="text-[10px] text-[#334155] font-medium">
                  Coordenador de Extensão e Projetos Educativos
                </p>
                <p className="text-[9.5px] font-bold text-[#1E293B] font-mono-tabular mt-0.5">
                  Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                </p>
              </div>
            </div>
          </div>

          {/* Linha Final Clicável de Verificação */}
          <div className="border-t border-[#D5CFC2] mt-2.5 pt-1.5 text-center">
            <p className="text-[9.5px] font-bold text-[#334155] font-mono-tabular">
              Verifique via QR Code ou acesse{' '}
              <a
                href={verificationFullUrl}
                onClick={handleVerificationClick}
                className="text-[#0F4C3A] underline hover:text-[#D97706] cursor-pointer"
              >
                {verificationFullUrl}
              </a>{' '}
              informando o Código {certData.codigo} ou Chave {certData.chave}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  /* Componente Interno da Lauda 2 (Verso — Memorial Descritivo) com Links Clicáveis */
  const renderBackPage = () => (
    <div
      className="cert-page-a4 cert-print-page shadow-xl rounded-sm mx-auto"
      style={{ backgroundColor: '#FAF9F6' }}
    >
      {/* Moldura Dupla Institucional */}
      <div className="absolute inset-[14px] border-[2.5px] border-[#0F4C3A] pointer-events-none" />
      <div className="absolute inset-[20px] border-[1px] border-[#1B365D] pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-between px-[44px] py-[26px]">
        <div>
          {/* CABEÇALHO DO VERSO */}
          <div className="flex items-center gap-4 pb-2.5 border-b border-[#D5CFC2]">
            <div className="flex items-center gap-2 shrink-0">
              <LogoEditoraMenteSaude className="w-[46px] h-[46px]" />
              <LogoCentroMariaDalva className="w-[46px] h-[46px]" />
            </div>
            <div>
              <h2 className="font-cert-serif text-[21px] font-extrabold text-[#0F4C3A] uppercase tracking-wide leading-tight">
                MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO
              </h2>
              <p className="text-[11.5px] font-medium text-[#475569] mt-0.5">
                Verso Oficial do Certificado Nº {certData.numero} · Fé Pública Interinstitucional e Validação
                Curricular
              </p>
            </div>
          </div>

          {/* QUADROS 1 E 2 */}
          <div className="grid grid-cols-12 gap-4 mt-3">
            <div className="col-span-6 bg-[#F4F1EA] border border-[#D6CEBE] p-3">
              <p className="text-[10.5px] font-extrabold text-[#0F4C3A] uppercase tracking-wider mb-1.5">
                1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA
              </p>
              <div className="space-y-1 text-[11.5px] text-[#1E293B]">
                <p>
                  <span className="text-[#475569]">Titular Certificado:</span>{' '}
                  <strong className="font-bold text-[#111827]">{certData.titular}</strong>
                </p>
                <p>
                  <span className="text-[#475569]">CPF Registrado:</span>{' '}
                  <strong className="font-bold font-mono-tabular text-[#111827]">{certData.cpf}</strong>
                </p>
                <p>
                  <span className="text-[#475569]">Qualificação Profissional:</span>{' '}
                  <strong className="font-bold text-[#111827]">{certData.qualificacao}</strong>
                </p>
                <p>
                  <span className="text-[#475569]">Instituição de Origem:</span>{' '}
                  <strong className="font-bold text-[#111827]">{certData.instituicaoOrigem}</strong>
                </p>
              </div>
            </div>

            <div className="col-span-6 bg-[#F4F1EA] border border-[#D6CEBE] p-3 flex flex-col justify-between">
              <div>
                <p className="text-[10.5px] font-extrabold text-[#0F4C3A] uppercase tracking-wider mb-1.5">
                  2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                </p>
                <p className="text-[12.5px] font-bold text-[#111827] leading-snug">
                  {certData.enquadramentoCurricular}
                </p>
              </div>
              <div className="border-t border-[#DDD6C7] pt-2 mt-2">
                <p className="text-[11.5px] font-bold font-mono-tabular text-[#1E293B]">
                  Período: {certData.periodo} &nbsp;|&nbsp; Total: {certData.cargaHorariaNumero}h
                </p>
              </div>
            </div>
          </div>

          {/* QUADRO 3: MATRIZ DE ATIVIDADES PRÁTICAS */}
          <div className="mt-3 border border-[#D6CEBE] bg-white">
            <div className="bg-[#EFECE4] px-3.5 py-1.5 border-b border-[#D6CEBE]">
              <p className="text-[10.5px] font-extrabold text-[#0F4C3A] uppercase tracking-wider">
                3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA ({certData.cargaHorariaNumero} HORAS)
              </p>
            </div>
            <div className="divide-y divide-[#E5E0D5]">
              {certData.eixosVerso.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 items-center px-3.5 py-2 gap-3">
                  <div className="col-span-4">
                    <p className="text-[11px] font-bold text-[#111827] leading-snug">{item.eixo}</p>
                    <p className="text-[9.5px] text-[#64748B] mt-0.5">{item.subtitulo}</p>
                  </div>
                  <div className="col-span-7">
                    <p className="text-[10.8px] text-[#334155] leading-snug">{item.descricao}</p>
                  </div>
                  <div className="col-span-1 text-right">
                    <span className="text-[11px] font-bold font-mono-tabular text-[#0F4C3A] whitespace-nowrap">
                      {item.cargaHoraria}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUADRO 4: REGISTRO OFICIAL DE FÉ PÚBLICA COM LINKS CLICÁVEIS */}
          <div className="mt-3 bg-[#FCF9EE] border border-[#D4AF37] p-3 grid grid-cols-12 items-center gap-3">
            <div className="col-span-10 space-y-1">
              <p className="text-[10.5px] font-extrabold text-[#855B06] uppercase tracking-wider">
                4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE
              </p>
              <p className="text-[11px] text-[#1E293B] leading-snug">
                Certificado registrado sob o{' '}
                <strong className="font-bold">
                  nº {certData.numero} no Livro de Extensão nº {certData.livro}, Folha{' '}
                  {certData.folha}
                </strong>
                , expedido pela <strong className="font-bold">Editora Mente e Saúde</strong> (CNPJ:
                51.372.335/0001-71) e{' '}
                <strong className="font-bold">Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ:
                51.269.112/0001-83).
              </p>
              <p className="text-[10.5px] font-bold font-mono-tabular text-[#111827] pt-0.5">
                CÓDIGO DE AUTENTICIDADE: {certData.codigo} &nbsp;|&nbsp; CHAVE DE CONTROLE / DÍGITO:{' '}
                {certData.chave}
              </p>
              <p className="text-[10px] font-bold font-mono-tabular text-[#0F4C3A]">
                ENDEREÇO PARA VERIFICAÇÃO MANUAL (CLIQUE PARA AUTENTICAR):{' '}
                <a
                  href={verificationFullUrl}
                  onClick={handleVerificationClick}
                  className="underline hover:text-[#D97706] cursor-pointer"
                >
                  {verificationFullUrl}
                </a>
              </p>
              <p className="text-[9.5px] font-mono-tabular text-[#475569]">
                HASH SHA-256: {certData.hashSha256}
              </p>
            </div>
            <div className="col-span-2 flex justify-end">
              <a
                href={verificationFullUrl}
                onClick={handleVerificationClick}
                title="Clique para autenticar via QR Code"
                className="bg-white p-1.5 border border-[#D4AF37] hover:border-[#0F4C3A] transition-colors block cursor-pointer"
              >
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="QR Code Registro Verso"
                    className="w-[86px] h-[86px] block"
                  />
                ) : (
                  <div className="w-[86px] h-[86px] bg-stone-100" />
                )}
              </a>
            </div>
          </div>
        </div>

        {/* RODAPÉ DO VERSO */}
        <div className="grid grid-cols-12 items-end pt-1">
          <div className="col-span-4 text-center flex flex-col items-center">
            <SignatureBarbara className="w-[170px] h-[42px] -mb-1" />
            <div className="w-full max-w-[270px] border-t border-[#334155] pt-1">
              <p className="text-[10.5px] font-extrabold text-[#111827] uppercase">BÁRBARA LIMA DOS SANTOS</p>
              <p className="text-[9px] font-bold font-mono-tabular text-[#334155]">
                Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
              </p>
            </div>
          </div>

          <div className="col-span-4 text-center pb-0.5">
            <p className="font-cert-serif italic font-bold text-[15.5px] text-[#111827]">
              {certData.localEmissao}, {certData.dataEmissao}.
            </p>
            <p className="text-[9.5px] text-[#475569] mt-0.5">
              Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional
            </p>
            <p className="text-[9px] font-mono-tabular text-[#64748B] mt-0.5">
              Registro: {certData.codigo} · Chave: {certData.chave}
            </p>
          </div>

          <div className="col-span-4 text-center flex flex-col items-center">
            <SignatureJames className="w-[170px] h-[42px] -mb-1" />
            <div className="w-full max-w-[270px] border-t border-[#334155] pt-1">
              <p className="text-[10.5px] font-extrabold text-[#111827] uppercase">JAMES ARAÚJO DE SANTANA</p>
              <p className="text-[9px] font-bold font-mono-tabular text-[#334155]">
                Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Barra de Controle Estilo Leitor PDF Vetorial Acessível */}
      <div className="no-print bg-[#142822] text-white rounded-t-xl p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#25463C]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0F4C3A] border border-emerald-500/30 flex items-center justify-center text-amber-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-mono-tabular text-emerald-300">
              Certificado_Extensao_{certData.numero}_{certData.codigo}_Lucas_Goncalves_Silveira.pdf
            </p>
            <p className="text-xs text-stone-300 mt-0.5">
              PDF 100% Vetorial Acessível/Editável · Links de Autenticação Clicáveis Ativos · 2 Laudas A4
            </p>
          </div>
        </div>

        {/* Controles de Visualização, Edição e Download Vetorial */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-[#0C1A16] p-1 rounded-lg border border-[#25463C]">
            <button
              type="button"
              onClick={() => setSelectedView('both')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedView === 'both'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              2 Laudas (Frente + Verso)
            </button>
            <button
              type="button"
              onClick={() => setSelectedView('front')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedView === 'front'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Página 1 (Frente)
            </button>
            <button
              type="button"
              onClick={() => setSelectedView('back')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedView === 'back'
                  ? 'bg-[#0F4C3A] text-white'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Página 2 (Verso)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
              isEditing
                ? 'bg-amber-400 text-[#0F4C3A] border-amber-300'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Fechar Editor de Campos' : 'Editar Texto / URL'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadVectorPdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando PDF Vetorial...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Baixar PDF Acessível/Editável (Com Links)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir A4</span>
          </button>
        </div>
      </div>

      {/* Painel de Edição Estruturada com Trava de Formatação */}
      {isEditing && (
        <div className="no-print bg-[#FAF8F3] border-x border-b border-[#D5CFC2] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E2DCCE]">
            <div>
              <h4 className="text-base font-display font-bold text-[#0F4C3A]">
                Editor Estruturado do Certificado Nº 09 (Sem Perda de Formatação A4)
              </h4>
              <p className="text-xs text-[#4B5552] mt-0.5">
                Qualquer ajuste feito abaixo atualiza em tempo real a visualização A4, o QR Code dinâmico e o arquivo
                PDF Vetorial exportado com links clicáveis.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetDefault}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-[#F2EFE7] hover:bg-[#E2DCCE] text-[#18221F] rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Dados Oficiais Nº 09</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
            <div>
              <label className="block font-semibold text-[#18221F] mb-1">Nome do Médico Titular:</label>
              <input
                type="text"
                value={certData.titular}
                onChange={(e) => setCertData({ ...certData, titular: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D5CFC2] rounded-lg font-medium text-[#18221F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#18221F] mb-1">CPF Registrado:</label>
              <input
                type="text"
                value={certData.cpf}
                onChange={(e) => setCertData({ ...certData, cpf: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D5CFC2] rounded-lg font-mono-tabular text-[#18221F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#18221F] mb-1">Instituição de Origem:</label>
              <input
                type="text"
                value={certData.instituicaoOrigem}
                onChange={(e) => setCertData({ ...certData, instituicaoOrigem: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D5CFC2] rounded-lg text-[#18221F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#18221F] mb-1">Período de Realização:</label>
              <input
                type="text"
                value={certData.periodo}
                onChange={(e) => setCertData({ ...certData, periodo: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D5CFC2] rounded-lg text-[#18221F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#18221F] mb-1">Data de Emissão:</label>
              <input
                type="text"
                value={certData.dataEmissao}
                onChange={(e) => setCertData({ ...certData, dataEmissao: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D5CFC2] rounded-lg text-[#18221F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#18221F] mb-1">
                URL Base p/ Links Clicáveis e QR Code:
              </label>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#0F4C3A] rounded-lg font-mono-tabular text-[#0F4C3A]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-[#18221F] mb-1">Título Oficial da Atividade:</label>
              <input
                type="text"
                value={certData.titulo}
                onChange={(e) => setCertData({ ...certData, titulo: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D5CFC2] rounded-lg text-[#18221F]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#18221F] mb-1">Código & Chave de Verificação:</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={certData.codigo}
                  onChange={(e) => setCertData({ ...certData, codigo: e.target.value })}
                  className="w-full px-2.5 py-2 bg-white border border-[#D5CFC2] rounded-lg font-mono-tabular text-[#18221F]"
                />
                <input
                  type="text"
                  value={certData.chave}
                  onChange={(e) => setCertData({ ...certData, chave: e.target.value })}
                  className="w-full px-2.5 py-2 bg-white border border-[#D5CFC2] rounded-lg font-mono-tabular text-[#18221F]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Faixa Informativa de Acessibilidade e Links Ativos */}
      <div className="no-print bg-[#1B332B] px-6 py-2.5 text-xs text-stone-200 flex flex-wrap items-center justify-between gap-2 border-x border-stone-800">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Texto Selecionável & Links Clicáveis Ativos:</strong> Clique na URL ou no QR Code abaixo (ou dentro
            do PDF baixado) para abrir diretamente a autenticação{' '}
            <code className="text-amber-300 font-mono-tabular">?codigo={certData.codigo}#validador</code>.
          </span>
        </div>
        <a
          href={verificationFullUrl}
          onClick={handleVerificationClick}
          className="flex items-center gap-1 text-amber-300 hover:underline font-mono-tabular font-semibold shrink-0 cursor-pointer"
        >
          <span>Testar Link de Autenticação</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Viewport do Documento Estilo PDF */}
      <div
        ref={containerWrapperRef}
        className="no-print bg-[#232927] p-4 sm:p-8 rounded-b-xl border border-t-0 border-stone-800 overflow-hidden flex flex-col items-center gap-8"
      >
        {/* Lauda 1: Frente */}
        <div
          className={selectedView === 'back' ? 'hidden' : 'block'}
          style={{
            width: `${1122.5 * scale}px`,
            height: `${793.7 * scale}px`,
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: '1122.5px',
              height: '793.7px',
            }}
          >
            {renderFrontPage()}
          </div>
        </div>

        {/* Lauda 2: Verso */}
        <div
          className={selectedView === 'front' ? 'hidden' : 'block'}
          style={{
            width: `${1122.5 * scale}px`,
            height: `${793.7 * scale}px`,
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: '1122.5px',
              height: '793.7px',
            }}
          >
            {renderBackPage()}
          </div>
        </div>
      </div>

      {/* Container Exclusivo para Impressão Nativa Vetorial (@media print) */}
      <div className="hidden print-only-container">
        {renderFrontPage()}
        {renderBackPage()}
      </div>
    </div>
  );
};
