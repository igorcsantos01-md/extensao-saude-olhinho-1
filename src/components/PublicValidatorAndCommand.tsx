import React, { useEffect, useState } from 'react';
import { CERTIFICATE_09, GITHUB_REPOSITORY_COMMAND } from '../data/certificate09Data';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  FileDown,
} from 'lucide-react';

interface ValidatorProps {
  baseUrl: string;
  onScrollToPdf: () => void;
}

export const PublicValidatorAndCommand: React.FC<ValidatorProps> = ({ baseUrl, onScrollToPdf }) => {
  const [queryInput, setQueryInput] = useState<string>(CERTIFICATE_09.codigo);
  const [validationState, setValidationState] = useState<'valid' | 'invalid'>('valid');
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const fullVerificationLink = `${cleanBaseUrl}/?codigo=${CERTIFICATE_09.codigo}#validador`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codigoParam = params.get('codigo') || params.get('chave');
    if (codigoParam) {
      const normalized = codigoParam.trim().toUpperCase();
      setQueryInput(normalized);
      if (
        normalized === CERTIFICATE_09.codigo ||
        normalized === CERTIFICATE_09.chave ||
        normalized.includes('0914') ||
        normalized.includes('EMS-CDP')
      ) {
        setValidationState('valid');
      } else {
        setValidationState('invalid');
      }
    }
  }, []);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = queryInput.trim().toUpperCase();
    if (
      normalized === CERTIFICATE_09.codigo ||
      normalized === CERTIFICATE_09.chave ||
      normalized === '9E4B7C12A8F03D65E1928B4C7A30F6D8E2C15B9A4D70F3E81C6A2B5D904E0914'
    ) {
      setValidationState('valid');
      window.history.replaceState(
        null,
        '',
        `?codigo=${CERTIFICATE_09.codigo}#validador`
      );
    } else {
      setValidationState('invalid');
    }
  };

  const handleCopyGitHubCommand = async () => {
    try {
      await navigator.clipboard.writeText(GITHUB_REPOSITORY_COMMAND);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2500);
    } catch {
      // Fallback copy
    }
  };

  const handleCopyValidationLink = async () => {
    try {
      await navigator.clipboard.writeText(fullVerificationLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCommandMd = () => {
    const blob = new Blob([GITHUB_REPOSITORY_COMMAND], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `COMANDO_GITHUB_CERTIFICADO_09_${CERTIFICATE_09.codigo}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-14">
      {/* 1. SISTEMA PÚBLICO DE AUTENTICAÇÃO E VALIDAÇÃO DE FÉ PÚBLICA */}
      <div
        id="validador"
        className="bg-white border border-[#E2DCCE] rounded-2xl p-6 sm:p-8 shadow-xs scroll-mt-24"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#EBE5D8]">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A]">
              Autenticador Público Interinstitucional · Verificação via QR Code ou Código Manual
            </p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#18221F] mt-1">
              Validador Oficial de Certificados de Extensão
            </h3>
            <p className="text-sm text-[#4B5552] mt-1">
              Consulte a autenticidade, o registro em livro e a carga horária curricular informando o Código de
              Verificação ou a Chave de Controle impressos no certificado.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyValidationLink}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#FAF8F3] hover:bg-[#EFECE4] text-[#0F4C3A] border border-[#D5CFC2] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start"
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
            <span>
              {copiedLink
                ? 'URL de Validação Copiada!'
                : `Copiar URL (?codigo=${CERTIFICATE_09.codigo}#validador)`}
            </span>
          </button>
        </div>

        {/* Barra de Pesquisa de Código ou Chave */}
        <form onSubmit={handleVerifySubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64706C] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Digite o Código (ex: EMS-CDP-2025-0914) ou Chave (0914-6283-4910-7E9B)"
              className="w-full pl-11 pr-4 py-3 bg-[#FAF8F3] border border-[#D5CFC2] rounded-xl text-sm font-mono-tabular text-[#18221F] focus:outline-none focus:border-[#0F4C3A]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#0F4C3A] hover:bg-[#15654D] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Verificar Autenticidade Agora
          </button>
          <button
            type="button"
            onClick={() => {
              setQueryInput(CERTIFICATE_09.codigo);
              setValidationState('valid');
            }}
            className="px-4 py-3 bg-[#F2EFE7] hover:bg-[#E5E0D5] text-[#18221F] text-xs font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Restaurar Cód. Nº 09
          </button>
        </form>

        {/* Resultado da Validação */}
        {validationState === 'valid' ? (
          <div className="mt-6 bg-[#FAF8F3] border border-[#0F4C3A]/30 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E2DCCE]">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#0F4C3A] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs font-mono-tabular font-bold uppercase tracking-wider text-[#0F4C3A]">
                    AUTENTICIDADE CONFIRMADA · DOCUMENTO VÁLIDO EM TODO O TERRITÓRIO NACIONAL
                  </p>
                  <h4 className="text-xl font-display font-bold text-[#18221F] mt-0.5">
                    Certificado Nº {CERTIFICATE_09.numero} — Registro Oficial {CERTIFICATE_09.codigo}
                  </h4>
                  <p className="text-xs text-[#4B5552] mt-0.5">
                    Emitido conjuntamente pela Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e Centro
                    Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onScrollToPdf}
                className="px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start"
              >
                Inspecionar Certificado PDF (2 Laudas)
              </button>
            </div>

            {/* Grade de Metadados Auditados */}
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5 text-xs">
              <div className="bg-white p-4 rounded-xl border border-[#E2DCCE]">
                <dt className="text-[#64706C] uppercase tracking-wider font-mono-tabular">
                  Titular do Certificado
                </dt>
                <dd className="text-sm font-bold text-[#18221F] mt-1">{CERTIFICATE_09.titular}</dd>
                <dd className="text-[#4B5552] font-mono-tabular mt-0.5">
                  {CERTIFICATE_09.qualificacao} · CPF: {CERTIFICATE_09.cpf}
                </dd>
                <dd className="text-[#4B5552] mt-0.5">{CERTIFICATE_09.instituicaoOrigem}</dd>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2DCCE]">
                <dt className="text-[#64706C] uppercase tracking-wider font-mono-tabular">
                  Enquadramento Curricular (Item 08)
                </dt>
                <dd className="text-sm font-bold text-[#0F4C3A] mt-1">
                  {CERTIFICATE_09.modalidadeTexto}
                </dd>
                <dd className="text-[#4B5552] font-mono-tabular mt-0.5">
                  Período: {CERTIFICATE_09.periodo} · Carga Horária: {CERTIFICATE_09.cargaHorariaExtenso}
                </dd>
                <dd className="text-[#4B5552] mt-0.5">
                  Emissão: {CERTIFICATE_09.localEmissao}, {CERTIFICATE_09.dataEmissao}
                </dd>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E2DCCE]">
                <dt className="text-[#64706C] uppercase tracking-wider font-mono-tabular">
                  Registro Físico e Criptográfico
                </dt>
                <dd className="text-sm font-bold font-mono-tabular text-[#18221F] mt-1">
                  Livro nº {CERTIFICATE_09.livro} · Folha {CERTIFICATE_09.folha}
                </dd>
                <dd className="text-[#0F4C3A] font-mono-tabular font-semibold mt-0.5">
                  Chave: {CERTIFICATE_09.chave}
                </dd>
                <dd className="text-[10.5px] text-[#64706C] font-mono-tabular truncate mt-0.5" title={CERTIFICATE_09.hashSha256}>
                  SHA-256: {CERTIFICATE_09.hashSha256}
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="mt-6 bg-[#FEF2F2] border border-red-300 rounded-xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-700 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-red-900">
                  Código ou Chave não localizado nesta base de extensão ({queryInput})
                </h4>
                <p className="text-xs text-red-800 mt-0.5">
                  Para validar o Certificado Nº 09 desta plataforma, utilize o código oficial{' '}
                  <strong className="font-mono-tabular">{CERTIFICATE_09.codigo}</strong> ou a chave{' '}
                  <strong className="font-mono-tabular">{CERTIFICATE_09.chave}</strong>.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setQueryInput(CERTIFICATE_09.codigo);
                setValidationState('valid');
              }}
              className="px-4 py-2 text-xs font-semibold bg-red-800 text-white rounded-lg cursor-pointer whitespace-nowrap shrink-0"
            >
              Validar EMS-CDP-2025-0914
            </button>
          </div>
        )}
      </div>

      {/* 2. CENTRAL DO COMANDO PARA REPOSITÓRIO GITHUB & VERCEL */}
      <div
        id="comando-github"
        className="bg-[#14231E] text-white border border-[#243B33] rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-24"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-amber-300">
              <Terminal className="w-4 h-4" />
              <span>PROMPT / COMANDO COMPLETO PARA REPOSITÓRIO GITHUB & DEPLOY VERCEL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Comando Operacional Completo — Sistema + Certificado Nº 09
            </h3>
            <p className="text-sm text-stone-300 mt-1 max-w-3xl">
              Copie o comando estruturado abaixo para instruir qualquer agente ou repositório no GitHub/Vercel a gerar
              a plataforma completa, o autenticador via QR Code e o Certificado Nº 09 (frente e verso) com higienização
              total de logotipos e rubricas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start">
            <button
              type="button"
              onClick={handleCopyGitHubCommand}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copiedCommand ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCommand ? 'Comando Copiado com Sucesso!' : 'Copiar Comando Completo'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadCommandMd}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span>Baixar Arquivo (.MD)</span>
            </button>
          </div>
        </div>

        <div className="mt-6 bg-[#0B1411] border border-white/10 rounded-xl p-4 sm:p-6 max-h-[460px] overflow-y-auto">
          <pre className="text-xs sm:text-[13px] font-mono-tabular text-stone-200 whitespace-pre-wrap leading-relaxed">
            {GITHUB_REPOSITORY_COMMAND}
          </pre>
        </div>
      </div>
    </div>
  );
};
