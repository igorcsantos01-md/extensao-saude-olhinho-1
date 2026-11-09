/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CERTIFICATE_09 } from './data/certificate09Data';
import {
  Certificate09Document,
  LogoEditoraMenteSaude,
  LogoCentroMariaDalva,
  SeloOficialFePublica,
} from './components/Certificate09Document';
import { VisionSimulator } from './components/VisionSimulator';
import { InteractiveSurveyAndEbook } from './components/InteractiveSurveyAndEbook';
import { PublicValidatorAndCommand } from './components/PublicValidatorAndCommand';
import {
  ShieldCheck,
  FileText,
  BookOpen,
  ClipboardCheck,
  Terminal,
  ArrowDown,
  CheckCircle2,
  Eye,
} from 'lucide-react';

export default function App() {
  const [baseUrl, setBaseUrl] = useState<string>('https://extensao-saude-visual-infancia.vercel.app');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      setBaseUrl(window.location.origin);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('codigo') || window.location.hash === '#validador') {
      setTimeout(() => {
        const el = document.getElementById('validador');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#18221F] flex flex-col">
      {/* TOP BAR CONTRACT: 1 Row, 3 Zones separated by gap-8 */}
      <header className="no-print sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E2DCCE]">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#topo"
            className="text-lg font-display font-bold tracking-tight text-[#0F4C3A] whitespace-nowrap shrink-0"
          >
            Extensão Saúde Visual Infantil
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#37413E]">
            <a
              href="#acao-educativa"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Ação Educativa
            </a>
            <a
              href="#simulador"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Simulador Visual
            </a>
            <a
              href="#enquete-ebook"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Enquete & E-book
            </a>
            <a
              href="#certificado-pdf"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Certificado Nº 09
            </a>
            <a
              href="#comando-github"
              className="hover:text-[#0F4C3A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Comando GitHub
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('validador')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#15654D] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Validar Certificado
            </button>
          </div>
        </div>
      </header>

      <main id="topo" className="flex-1">
        {/* HERO SECTION */}
        <section className="no-print pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#E2DCCE]">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Coluna Esquerda (7 colunas): Narrativa Institucional & Contexto da Ação Nº 09 */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#0F4C3A]">
                    <span>PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO EM SAÚDE</span>
                    <span>·</span>
                    <span>ITEM 08 — CERTIFICADO Nº 09</span>
                    <span>·</span>
                    <span>SETEMBRO / 2025</span>
                  </div>

                  <h1
                    className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-[#18221F] leading-[1.15]"
                    style={{ textWrap: 'balance' }}
                  >
                    Ação Educativa e Coleta de Dados Populacionais com Pais e Escolares: Enquete Digital sobre
                    Dificuldades Visuais na Infância e Mini E-book do Teste do Olhinho
                  </h1>

                  <p className="text-base sm:text-lg text-[#37413E] leading-relaxed max-w-2xl">
                    Plataforma oficial de educação comunitária em saúde ocular pediátrica, levantamento epidemiológico
                    escolar e verificação de autenticidade documental promovida pela{' '}
                    <strong className="font-semibold text-[#18221F]">Editora Mente e Saúde</strong> em parceria com o{' '}
                    <strong className="font-semibold text-[#18221F]">
                      Centro Profissionalizante Maria Dalva de Araújo
                    </strong>
                    .
                  </p>
                </div>

                {/* Ações Principais */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection('certificado-pdf')}
                    className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#D97706] hover:bg-[#B45309] rounded-xl transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Visualizar e Baixar Certificado Nº 09 (PDF A4)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('enquete-ebook')}
                    className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#0F4C3A] bg-white hover:bg-[#F2EFE7] border border-[#D5CFC2] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Acessar Enquete Digital & Mini E-book</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('comando-github')}
                    className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[#18221F] bg-[#F2EFE7] hover:bg-[#E5E0D4] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Terminal className="w-4 h-4 text-[#0F4C3A]" />
                    <span>Copiar Comando GitHub</span>
                  </button>
                </div>

                {/* Credenciais Institucionais no Rodapé do Hero */}
                <div className="pt-4 border-t border-[#E2DCCE] flex flex-wrap items-center gap-6 text-xs text-[#4B5552]">
                  <div className="flex items-center gap-2.5">
                    <LogoEditoraMenteSaude className="w-9 h-9 shrink-0" />
                    <div>
                      <p className="font-bold text-[#18221F]">Editora Mente e Saúde</p>
                      <p className="font-mono-tabular text-[11px]">CNPJ: 51.372.335/0001-71</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <LogoCentroMariaDalva className="w-9 h-9 shrink-0" />
                    <div>
                      <p className="font-bold text-[#18221F]">Centro Prof. Maria Dalva de Araújo</p>
                      <p className="font-mono-tabular text-[11px]">CNPJ: 51.269.112/0001-83</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita (5 colunas): Dossiê Executivo de Fé Pública do Certificado Nº 09 */}
              <div className="lg:col-span-5 bg-white border border-[#DED8C8] rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#EBE5D8]">
                    <div>
                      <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#0F4C3A] font-bold">
                        REGISTRO OFICIAL DE EXTENSÃO · FÉ PÚBLICA
                      </p>
                      <h2 className="text-xl font-display font-bold text-[#18221F] mt-0.5">
                        Certificado Nº {CERTIFICATE_09.numero} · {CERTIFICATE_09.codigo}
                      </h2>
                    </div>
                    <SeloOficialFePublica codigo={CERTIFICATE_09.codigo} className="w-16 h-16 shrink-0" />
                  </div>

                  <dl className="mt-4 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between py-1.5 border-b border-[#F2EFE7]">
                      <dt className="text-[#5A6561]">Médico Extensionista Titular:</dt>
                      <dd className="font-bold text-[#18221F] text-right">{CERTIFICATE_09.titular}</dd>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#F2EFE7]">
                      <dt className="text-[#5A6561]">Qualificação & Origem:</dt>
                      <dd className="font-medium text-[#18221F] text-right font-mono-tabular">
                        Médico · CPF {CERTIFICATE_09.cpf} · UNIFAN
                      </dd>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#F2EFE7]">
                      <dt className="text-[#5A6561]">Enquadramento no Edital:</dt>
                      <dd className="font-semibold text-[#0F4C3A] text-right">
                        Item 08 — Coleta de Dados & Campanha Educativa
                      </dd>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#F2EFE7]">
                      <dt className="text-[#5A6561]">Período e Carga Horária:</dt>
                      <dd className="font-mono-tabular font-bold text-[#18221F] text-right">
                        {CERTIFICATE_09.periodo} · {CERTIFICATE_09.cargaHorariaExtenso}
                      </dd>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#F2EFE7]">
                      <dt className="text-[#5A6561]">Livro e Folha de Registro:</dt>
                      <dd className="font-mono-tabular font-semibold text-[#18221F] text-right">
                        Livro nº {CERTIFICATE_09.livro} · Folha {CERTIFICATE_09.folha}
                      </dd>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <dt className="text-[#5A6561]">Chave de Controle Público:</dt>
                      <dd className="font-mono-tabular font-bold text-[#D97706] text-right">
                        {CERTIFICATE_09.chave}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EBE5D8] flex items-center justify-between gap-3">
                  <span className="text-xs font-mono-tabular text-[#0F4C3A] font-medium">
                    Status: Documento Autêntico e Verificado
                  </span>
                  <button
                    type="button"
                    onClick={() => scrollToSection('certificado-pdf')}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#0F4C3A] hover:underline cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Ir para o PDF A4</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Faixa Operacional de Métricas e Escopo abaixo do Hero Split */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#F2EFE7] border border-[#E2DCCE] rounded-2xl p-5">
              <div className="p-2">
                <p className="text-xs text-[#5A6561] uppercase tracking-wider font-mono-tabular">
                  Coleta Populacional (Item 08)
                </p>
                <p className="text-2xl font-display font-bold text-[#0F4C3A] font-mono-tabular mt-1">
                  418 Famílias e Educadores
                </p>
                <p className="text-xs text-[#4B5552] mt-1">
                  Participantes da enquete digital sobre sinais visuais na infância em setembro/2025.
                </p>
              </div>

              <div className="p-2 border-t sm:border-t-0 sm:border-l border-[#DED8C8] sm:pl-5">
                <p className="text-xs text-[#5A6561] uppercase tracking-wider font-mono-tabular">
                  Produção Editorial Gratuita
                </p>
                <p className="text-2xl font-display font-bold text-[#18221F] mt-1">
                  Mini E-book Ilustrado
                </p>
                <p className="text-xs text-[#4B5552] mt-1">
                  Guia prático do Teste do Olhinho (Reflexo Vermelho) e prevenção da ambliopia escolar.
                </p>
              </div>

              <div className="p-2 border-t lg:border-t-0 lg:border-l border-[#DED8C8] lg:pl-5">
                <p className="text-xs text-[#5A6561] uppercase tracking-wider font-mono-tabular">
                  Combate à Desinformação
                </p>
                <p className="text-2xl font-display font-bold text-[#18221F] mt-1">
                  Letramento Ocular
                </p>
                <p className="text-xs text-[#4B5552] mt-1">
                  Desmistificação de boatos sobre óculos na infância e alerta fotográfico da leucocoria.
                </p>
              </div>

              <div className="p-2 border-t lg:border-t-0 lg:border-l border-[#DED8C8] lg:pl-5">
                <p className="text-xs text-[#5A6561] uppercase tracking-wider font-mono-tabular">
                  Articulação com Rede Pública
                </p>
                <p className="text-2xl font-display font-bold text-[#D97706] mt-1">
                  SUS · PSE · Caderneta
                </p>
                <p className="text-xs text-[#4B5552] mt-1">
                  Direcionamento às UBS, Programa Saúde na Escola e Centros de Referência do SUS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 1: EXPLICAÇÃO DETALHADA DA AÇÃO EDUCATIVA E METODOLOGIA */}
        <section id="acao-educativa" className="no-print py-14 sm:py-16 border-b border-[#E2DCCE] scroll-mt-20">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A]">
                Fundamentação Científica, Pedagógica e Institucional
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#18221F] mt-1">
                Sobre a Ação Educativa e Coleta de Dados Populacionais com Pais e Escolares
              </h2>
              <p className="text-base text-[#37413E] mt-3 leading-relaxed">
                A infância compreende o período mais sensível de maturação do córtex visual humano. A ação extensionista
                conduzida pelo médico <strong className="font-semibold text-[#18221F]">Dr. Lucas Gonçalves Silveira</strong>{' '}
                uniu a expertise editorial da <strong className="font-semibold text-[#18221F]">Editora Mente e Saúde</strong>{' '}
                e a capilaridade pedagógica do{' '}
                <strong className="font-semibold text-[#18221F]">
                  Centro Profissionalizante Maria Dalva de Araújo
                </strong>{' '}
                em quatro frentes complementares:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {CERTIFICATE_09.eixosVerso.map((eixo, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#E2DCCE] rounded-2xl p-6 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tabular text-[#0F4C3A] pb-3 border-b border-[#F2EFE7]">
                      <span>0{index + 1}. EIXO METODOLÓGICO</span>
                      <span className="font-bold">{eixo.cargaHoraria}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-[#18221F] mt-4 leading-snug">
                      {eixo.eixo}
                    </h3>
                    <p className="text-xs font-medium text-[#D97706] mt-1">{eixo.subtitulo}</p>
                    <p className="text-xs sm:text-sm text-[#37413E] mt-3 leading-relaxed">
                      {eixo.descricao}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#F2EFE7] text-[11px] font-mono-tabular text-[#5A6561]">
                    Conformidade CNAE Editorial & Educacional · Item 08
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: SIMULADOR VISUAL INTERATIVO (SALA DE AULA & TESTE DO OLHINHO) */}
        <section id="simulador" className="no-print py-14 sm:py-16 border-b border-[#E2DCCE] scroll-mt-20">
          <div className="max-w-[1360px] mx-auto px-6">
            <VisionSimulator />
          </div>
        </section>

        {/* SEÇÃO 3: ENQUETE DIGITAL INTERATIVA + DADOS EPIDEMIOLÓGICOS + MINI E-BOOK */}
        <section id="enquete-ebook" className="no-print py-14 sm:py-16 border-b border-[#E2DCCE] scroll-mt-20">
          <div className="max-w-[1360px] mx-auto px-6">
            <InteractiveSurveyAndEbook onScrollToCert={() => scrollToSection('certificado-pdf')} />
          </div>
        </section>

        {/* SEÇÃO 4: CERTIFICADO OFICIAL Nº 09 VISÍVEL NO ESTILO PDF A4 (FRENTE E VERSO) */}
        <section id="certificado-pdf" className="py-14 sm:py-16 border-b border-[#E2DCCE] scroll-mt-20">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="no-print mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A]">
                  Visualizador Oficial Integrado · Padrão A4 Paisagem (Frente e Verso)
                </p>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#18221F] mt-1">
                  Certificado de Atividade de Extensão Nº 09 (Estilo PDF Oficial)
                </h2>
                <p className="text-sm sm:text-base text-[#37413E] mt-1 max-w-3xl">
                  Documento completo em 2 laudas (Frente e Memorial Descritivo no Verso) com logotipos higienizados em
                  fundo transparente, rubricas vetoriais limpas, CNPJs auditados, selo de fé pública e QR Code dinâmico
                  verificável.
                </p>
              </div>
              <div className="text-xs font-mono-tabular text-[#5A6561]">
                Código: <strong className="text-[#0F4C3A]">{CERTIFICATE_09.codigo}</strong> · Chave:{' '}
                <strong className="text-[#18221F]">{CERTIFICATE_09.chave}</strong>
              </div>
            </div>

            <Certificate09Document baseUrl={baseUrl} />
          </div>
        </section>

        {/* SEÇÃO 5: VALIDADOR OFICIAL & COMANDO PARA REPOSITÓRIO GITHUB */}
        <section className="no-print py-14 sm:py-16">
          <div className="max-w-[1360px] mx-auto px-6">
            <PublicValidatorAndCommand
              baseUrl={baseUrl}
              onScrollToPdf={() => scrollToSection('certificado-pdf')}
            />
          </div>
        </section>
      </main>

      {/* RODAPÉ INSTITUCIONAL */}
      <footer className="no-print bg-[#101C18] text-stone-300 border-t border-[#1F352E] py-10">
        <div className="max-w-[1360px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <p className="text-sm font-display font-bold text-white">
              Programa Interinstitucional de Extensão, Comunicação Científica e Educação em Saúde
            </p>
            <p className="text-xs text-stone-400">
              Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) · Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
              51.269.112/0001-83)
            </p>
          </div>

          <div className="text-xs font-mono-tabular text-stone-400 md:text-right space-y-1">
            <p>Certificado Nº 09 · Livro 01/2025, Folha 64 · Cód. {CERTIFICATE_09.codigo}</p>
            <p>Chave de Controle: {CERTIFICATE_09.chave} · Fé Pública Válida em Todo o Território Nacional</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
