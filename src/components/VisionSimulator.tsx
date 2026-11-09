import React, { useState } from 'react';
import { Eye, Glasses, Sun, AlertTriangle, CheckCircle2, Sliders } from 'lucide-react';

type VisionCondition = 'normal' | 'miopia' | 'astigmatismo' | 'ambliopia';
type RedReflexState = 'normal' | 'leucocoria' | 'assimetrico';

export const VisionSimulator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'classroom' | 'red-reflex'>('classroom');
  const [condition, setCondition] = useState<VisionCondition>('miopia');
  const [withGlasses, setWithGlasses] = useState<boolean>(false);
  const [distanceMeters, setDistanceMeters] = useState<number>(4);
  const [reflexState, setReflexState] = useState<RedReflexState>('normal');
  const [ophthalmoscopeAngle, setOphthalmoscopeAngle] = useState<number>(50);

  const conditionDetails: Record<
    VisionCondition,
    {
      titulo: string;
      grauExemplo: string;
      comportamentoEscolar: string;
      fisiopatologia: string;
      impactoAprendizado: string;
    }
  > = {
    normal: {
      titulo: 'Visão Infantil Emetrope (Acuidade 20/20)',
      grauExemplo: 'Plano (0,00 D) · Foco retiniano exato',
      comportamentoEscolar:
        'A criança copia da lousa na última carteira sem esforço acomodativo, mantém postura ergonômica e acompanha a leitura sem pular linhas.',
      fisiopatologia:
        'Os raios luminosos paralelos vindos do quadro escolar convergem exatamente sobre a mácula na retina, formando imagem nítida.',
      impactoAprendizado: 'Pleno desenvolvimento da alfabetização visual e coordenação olho-mão.',
    },
    miopia: {
      titulo: 'Miopia Escolar Não Corrigida',
      grauExemplo: '-2,25 DE · Foco anterior à retina',
      comportamentoEscolar:
        'Levanta-se frequentemente para ler a lousa, pede para sentar na 1ª fila, semicerra as pálpebras ("aperta os olhos") e aproxima muito o caderno.',
      fisiopatologia:
        'O globo ocular apresenta comprimento axial aumentado ou maior poder refrativo corneano, focando objetos distantes antes da retina.',
      impactoAprendizado:
        'Criança frequentemente confundida com "desatenta" ou dispersa por não enxergar o conteúdo escrito no quadro.',
    },
    astigmatismo: {
      titulo: 'Astigmatismo Infantil Sintomático',
      grauExemplo: '-1,75 DC × 180° · Múltiplos pontos focais',
      comportamentoEscolar:
        'Troca letras semelhantes no quadro (como F por P, H por N, ou 8 por 3), inclina a cabeça e relata dor de cabeça na testa ao final da aula.',
      fisiopatologia:
        'A curvatura corneana é tórica (assimétrica nos meridianos), gerando sombreamento direcional tanto para longe quanto para perto.',
      impactoAprendizado: 'Fadiga visual precoce (astenopia), lacrimejamento e aversão a leituras prolongadas.',
    },
    ambliopia: {
      titulo: 'Ambliopia Anisometrópica ("Olho Preguiçoso")',
      grauExemplo: 'OD: Plano / OE: +4,50 DE · Supressão cortical',
      comportamentoEscolar:
        'Como um dos olhos enxerga bem, a criança raramente reclama. Porém, apresenta perda de noção de profundidade (estereopsia) e tropeça ou erra bolas em jogos.',
      fisiopatologia:
        'O córtex visual cerebral suprime a imagem desfocada do olho com maior grau. Se não tratada até os 7 anos, a baixa visual torna-se permanente.',
      impactoAprendizado:
        'Risco de cegueira funcional unilateral evitável caso não realize triagem visual na idade pré-escolar.',
    },
  };

  const reflexDetails: Record<
    RedReflexState,
    {
      titulo: string;
      statusClinico: string;
      corSinal: string;
      achadoOftalmoscopico: string;
      condutaSUS: string;
    }
  > = {
    normal: {
      titulo: 'Reflexo Vermelho Fisiológico Simétrico (Normal)',
      statusClinico: 'TRIAGEM NEONATAL NORMAL · EIXO VISUAL LIVRE',
      corSinal: 'text-[#0F4C3A]',
      achadoOftalmoscopico:
        'Ambos os olhos refletem coloração avermelhada-alaranjada homogênea, brilhante e simétrica quando iluminados pelo oftalmoscópio direto a 30–50 cm.',
      condutaSUS:
        'Registrar resultado normal na Caderneta da Criança e manter acompanhamento periódico nas consultas de puericultura da Atenção Primária (UBS).',
    },
    leucocoria: {
      titulo: 'Leucocoria Unilateral (Reflexo Pupilar Branco — Alerta Máximo)',
      statusClinico: 'ALTERADO · ENCAMINHAMENTO OFTALMOLÓGICO URGENTE',
      corSinal: 'text-[#B45309]',
      achadoOftalmoscopico:
        'Presença de reflexo esbranquiçado ("olho de gato") ou ausência de reflexo vermelho no olho afetado, visível no Teste do Olhinho ou em fotos com flash.',
      condutaSUS:
        'Encaminhamento prioritário imediato ao Centro de Referência em Oftalmologia do SUS para afastar Catarata Congênita, Retinoblastoma ou Persistência do Vítreo Primário.',
    },
    assimetrico: {
      titulo: 'Reflexo de Brückner Assimétrico (Estrabismo / Anisometropia)',
      statusClinico: 'DUVIDOSO OU ASSIMÉTRICO · AVALIAÇÃO ESPECIALIZADA',
      corSinal: 'text-[#9A3412]',
      achadoOftalmoscopico:
        'Diferença nítida de brilho, cor ou posição do reflexo luminoso corneano (Hirschberg/Brückner) entre o olho direito e o olho esquerdo.',
      condutaSUS:
        'Referenciar ao serviço de Oftalmopediatria do SUS para refração sob cicloplegia e prevenção precoce da ambliopia.',
    },
  };

  /* Cálculo do filtro óptico para a Lousa Escolar */
  const getBlurAmount = () => {
    if (withGlasses || condition === 'normal') return 0;
    if (condition === 'miopia') {
      return Math.max(0.5, (distanceMeters - 1) * 1.45);
    }
    if (condition === 'astigmatismo') {
      return 1.8 + (distanceMeters - 1) * 0.45;
    }
    if (condition === 'ambliopia') {
      return 2.2;
    }
    return 0;
  };

  const currentCondition = conditionDetails[condition];
  const currentReflex = reflexDetails[reflexState];

  return (
    <div className="bg-white border border-[#E2DCCE] rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Cabeçalho e Seletor de Modo de Simulação */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#EBE5D8]">
        <div>
          <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A]">
            Laboratório Virtual de Educação em Saúde Ocular Pediátrica
          </p>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#18221F] mt-1">
            Simulador Interativo: Visão Escolar & Teste do Olhinho
          </h3>
          <p className="text-sm text-[#4B5552] mt-1">
            Experimente na prática como uma criança com dificuldade visual enxerga a sala de aula e como o Teste do
            Reflexo Vermelho identifica alterações precoces.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1.5 bg-[#F2EFE7] rounded-xl border border-[#E2DCCE] self-start">
          <button
            type="button"
            onClick={() => setActiveMode('classroom')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeMode === 'classroom'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'text-[#37413E] hover:text-[#0F4C3A]'
            }`}
          >
            1. Visão na Sala de Aula (Ametropias)
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('red-reflex')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeMode === 'red-reflex'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'text-[#37413E] hover:text-[#0F4C3A]'
            }`}
          >
            2. Simulador do Teste do Olhinho
          </button>
        </div>
      </div>

      {activeMode === 'classroom' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-stretch">
          {/* Palco Visual (Esquerda — 7 colunas): Lousa Escolar */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#14231E] rounded-xl p-5 sm:p-6 text-white border border-[#243B33]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="text-xs text-stone-300">
                <span>Visão Simulada da Criança</span>
                <span className="mx-2">·</span>
                <span className="font-mono-tabular text-amber-300">Distância da Lousa: {distanceMeters}m</span>
              </div>
              <button
                type="button"
                onClick={() => setWithGlasses(!withGlasses)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  withGlasses
                    ? 'bg-[#D97706] text-white'
                    : 'bg-white/10 text-stone-200 hover:bg-white/20'
                }`}
              >
                <Glasses className="w-4 h-4" />
                <span>{withGlasses ? 'Óculos Corretivos Ativados (20/20)' : 'Testar Correção com Óculos'}</span>
              </button>
            </div>

            {/* Quadro Escolar Verde */}
            <div className="my-4 bg-[#193B2D] border-[6px] border-[#8B5A2B] rounded-lg p-6 relative overflow-hidden min-h-[260px] flex flex-col justify-between">
              <div
                className="transition-all duration-200 select-none"
                style={{
                  filter: `blur(${getBlurAmount()}px)`,
                  textShadow:
                    !withGlasses && condition === 'astigmatismo'
                      ? '6px 2px 1px rgba(255,255,255,0.42), -4px -2px 1px rgba(253,230,138,0.35)'
                      : 'none',
                  opacity: !withGlasses && condition === 'ambliopia' ? 0.72 : 1,
                }}
              >
                <div className="flex items-center justify-between text-xs font-mono-tabular text-emerald-200/80 border-b border-white/15 pb-2">
                  <span>ESCOLA MUNICIPAL — 2º ANO DO ENSINO FUNDAMENTAL</span>
                  <span>DATA: 12/09/2025</span>
                </div>

                <div className="mt-5 space-y-3 text-center">
                  <p className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-white">
                    A SAÚDE DOS OLHOS NA INFÂNCIA
                  </p>
                  <p className="text-base sm:text-lg font-medium text-amber-200">
                    1. Copie as palavras do quadro: BOLA — CASA — ESCOLA — LIVRO
                  </p>
                  <div className="pt-2 flex justify-center gap-6 font-mono-tabular text-lg sm:text-xl font-bold text-white">
                    <span>4 + 5 = 9</span>
                    <span>·</span>
                    <span>8 - 3 = 5</span>
                    <span>·</span>
                    <span>6 + 2 = 8</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100/90 pt-1">
                    Se as letras parecerem borradas ou duplicadas, avise a professora ou seus pais!
                  </p>
                </div>
              </div>

              {/* Simulação de Assimetria na Ambliopia */}
              {!withGlasses && condition === 'ambliopia' && (
                <div className="mt-3 pt-2 border-t border-amber-400/30 flex items-center justify-between text-xs text-amber-200">
                  <span>Olho Direito: 20/20 (Nítido)</span>
                  <span>·</span>
                  <span>Olho Esquerdo Amblíope: 20/100 (Suprimido pelo cérebro)</span>
                </div>
              )}
            </div>

            {/* Controle Deslizante de Distância da Carteira Escolar */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
                <label htmlFor="distance-slider" className="font-medium flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Posição da Criança na Sala de Aula:</span>
                </label>
                <span className="font-mono-tabular font-semibold text-white">
                  {distanceMeters === 1
                    ? '1m (Em pé colada ao quadro)'
                    : distanceMeters === 2
                    ? '2m (Primeira carteira)'
                    : distanceMeters === 4
                    ? '4m (Meio da sala)'
                    : '6m (Última carteira)'}
                </span>
              </div>
              <input
                id="distance-slider"
                type="range"
                min={1}
                max={6}
                step={1}
                value={distanceMeters}
                onChange={(e) => setDistanceMeters(Number(e.target.value))}
                className="w-full accent-[#D97706] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono-tabular mt-1">
                <span>1m (Muito perto)</span>
                <span>2m (1ª fila)</span>
                <span>4m (Centro)</span>
                <span>6m (Fundo da sala)</span>
              </div>
            </div>
          </div>

          {/* Painel de Controle e Explicação Clínica (Direita — 5 colunas) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5552] mb-2.5">
                Selecione a Condição Visual para Comparar:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: 'normal', label: 'Visão Normal (20/20)' },
                    { id: 'miopia', label: 'Miopia Escolar' },
                    { id: 'astigmatismo', label: 'Astigmatismo' },
                    { id: 'ambliopia', label: 'Ambliopia Infantil' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCondition(item.id);
                      setWithGlasses(false);
                    }}
                    className={`px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                      condition === item.id
                        ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                        : 'bg-[#FAF8F3] text-[#18221F] border-[#E2DCCE] hover:border-[#0F4C3A]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-[#E2DCCE] rounded-xl p-5 space-y-3.5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono-tabular text-[#0F4C3A] font-semibold">
                  {currentCondition.grauExemplo}
                </p>
                <h4 className="text-lg font-display font-bold text-[#18221F] mt-0.5">
                  {currentCondition.titulo}
                </h4>

                <div className="mt-3 space-y-2.5 text-xs sm:text-sm text-[#2D3835] leading-relaxed">
                  <p>
                    <strong className="font-semibold text-[#18221F]">Sinal Observado por Pais e Professores: </strong>
                    {currentCondition.comportamentoEscolar}
                  </p>
                  <p>
                    <strong className="font-semibold text-[#18221F]">Mecanismo Óptico: </strong>
                    {currentCondition.fisiopatologia}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2DCCE] text-xs text-[#0F4C3A] font-medium">
                <strong>Impacto Pedagógico:</strong> {currentCondition.impactoAprendizado}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* MODO 2: SIMULADOR DO TESTE DO OLHINHO (REFLEXO VERMELHO) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-stretch">
          <div className="lg:col-span-7 bg-[#121924] rounded-xl p-6 text-white border border-slate-800 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <span className="text-xs text-stone-300">
                Simulação de Oftalmoscopia Direta em Ambiente de Penumbra (30–50 cm)
              </span>
              <span className="text-xs font-mono-tabular text-amber-300">
                Feixe Luminoso: {ophthalmoscopeAngle}%
              </span>
            </div>

            {/* Ilustração Interativa dos Olhos do Bebê no Teste do Olhinho */}
            <div className="my-6 py-6 px-4 bg-[#0B1017] rounded-xl border border-white/10 flex flex-col items-center">
              <svg viewBox="0 0 460 150" className="w-full max-w-[440px] h-auto">
                <defs>
                  {/* Gradiente Reflexo Vermelho Normal */}
                  <radialGradient id="redReflexNormal" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF9E44" />
                    <stop offset="55%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#7F1D1D" />
                  </radialGradient>
                  {/* Gradiente Leucocoria (Reflexo Branco) */}
                  <radialGradient id="whiteReflexLeukocoria" cx="45%" cy="45%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="65%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#94A3B8" />
                  </radialGradient>
                  {/* Gradiente Reflexo Assimétrico */}
                  <radialGradient id="dimAsymmetricReflex" cx="65%" cy="60%" r="50%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.55" />
                    <stop offset="70%" stopColor="#78350F" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#1F2937" />
                  </radialGradient>
                </defs>

                {/* Olho Direito (OD) */}
                <g transform="translate(115, 75)">
                  <path
                    d="M -70 0 Q 0 -48 70 0 Q 0 48 -70 0 Z"
                    fill="#F8FAFC"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />
                  <circle cx="0" cy="0" r="31" fill="#3B281E" />
                  {/* Pupila com Reflexo */}
                  <circle
                    cx="0"
                    cy="0"
                    r="17"
                    fill="url(#redReflexNormal)"
                  />
                  {/* Brilho Corneano (Hirschberg) */}
                  <circle
                    cx={-4 + (ophthalmoscopeAngle - 50) * 0.08}
                    cy="-5"
                    r="3.2"
                    fill="#FFFFFF"
                  />
                  <text x="0" y="54" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="Plus Jakarta Sans">
                    Olho Direito (OD) — Reflexo Vermelho Normal
                  </text>
                </g>

                {/* Olho Esquerdo (OE) */}
                <g transform="translate(345, 75)">
                  <path
                    d="M -70 0 Q 0 -48 70 0 Q 0 48 -70 0 Z"
                    fill="#F8FAFC"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx={reflexState === 'assimetrico' ? 7 : 0}
                    cy="0"
                    r="31"
                    fill="#3B281E"
                  />
                  <circle
                    cx={reflexState === 'assimetrico' ? 7 : 0}
                    cy="0"
                    r="17"
                    fill={
                      reflexState === 'normal'
                        ? 'url(#redReflexNormal)'
                        : reflexState === 'leucocoria'
                        ? 'url(#whiteReflexLeukocoria)'
                        : 'url(#dimAsymmetricReflex)'
                    }
                  />
                  <circle
                    cx={(reflexState === 'assimetrico' ? 5 : -4) + (ophthalmoscopeAngle - 50) * 0.08}
                    cy="-5"
                    r="3.2"
                    fill="#FFFFFF"
                  />
                  <text
                    x="0"
                    y="54"
                    textAnchor="middle"
                    fill={reflexState === 'normal' ? '#94A3B8' : '#FCD34D'}
                    fontSize="11"
                    fontWeight={reflexState === 'normal' ? '400' : '700'}
                    fontFamily="Plus Jakarta Sans"
                  >
                    {reflexState === 'normal'
                      ? 'Olho Esquerdo (OE) — Reflexo Simétrico'
                      : reflexState === 'leucocoria'
                      ? 'Olho Esquerdo (OE) — LEUCOCORIA (Reflexo Branco)'
                      : 'Olho Esquerdo (OE) — Reflexo Assimétrico / Desvio'}
                  </text>
                </g>
              </svg>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
                <label htmlFor="angle-slider" className="font-medium">
                  Incidência do Feixe do Oftalmoscópio Direto (Teste de Brückner):
                </label>
                <span className="font-mono-tabular text-amber-300">{ophthalmoscopeAngle}°</span>
              </div>
              <input
                id="angle-slider"
                type="range"
                min={10}
                max={90}
                value={ophthalmoscopeAngle}
                onChange={(e) => setOphthalmoscopeAngle(Number(e.target.value))}
                className="w-full accent-[#D97706] cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5552] mb-2.5">
                Selecione o Padrão do Reflexo Pupilar:
              </p>
              <div className="space-y-2">
                {(
                  [
                    {
                      id: 'normal',
                      label: '1. Reflexo Vermelho Fisiológico (Normal)',
                    },
                    {
                      id: 'leucocoria',
                      label: '2. Leucocoria (Reflexo Branco — Catarata / Retinoblastoma)',
                    },
                    {
                      id: 'assimetrico',
                      label: '3. Reflexo Assimétrico (Estrabismo / Anisometropia)',
                    },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setReflexState(item.id)}
                    className={`w-full px-4 py-2.5 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                      reflexState === item.id
                        ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                        : 'bg-[#FAF8F3] text-[#18221F] border-[#E2DCCE] hover:border-[#0F4C3A]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-[#E2DCCE] rounded-xl p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <p className={`text-xs font-mono-tabular font-bold ${currentReflex.corSinal}`}>
                  {currentReflex.statusClinico}
                </p>
                <h4 className="text-lg font-display font-bold text-[#18221F] mt-1">{currentReflex.titulo}</h4>
                <p className="text-xs sm:text-sm text-[#2D3835] mt-2.5 leading-relaxed">
                  <strong className="font-semibold text-[#18221F]">Achado Semiológico: </strong>
                  {currentReflex.achadoOftalmoscopico}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2DCCE] text-xs text-[#18221F] leading-relaxed">
                <strong className="text-[#0F4C3A]">Conduta Preconizada no SUS: </strong>
                {currentReflex.condutaSUS}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
