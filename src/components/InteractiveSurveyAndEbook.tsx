import React, { useState } from 'react';
import {
  SURVEY_QUESTIONS,
  EBOOK_CHAPTERS,
  EPIDEMIOLOGICAL_STATS,
} from '../data/certificate09Data';
import {
  ClipboardCheck,
  BookOpen,
  BarChart3,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
} from 'lucide-react';

export const InteractiveSurveyAndEbook: React.FC<{ onScrollToCert: () => void }> = ({
  onScrollToCert,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [participantCount, setParticipantCount] = useState(EPIDEMIOLOGICAL_STATS.totalParticipantes);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = SURVEY_QUESTIONS.length;

  const totalRiskScore = Object.entries(selectedAnswers).reduce((acc, [qId, optIdx]) => {
    const q = SURVEY_QUESTIONS.find((item) => item.id === Number(qId));
    if (!q) return acc;
    return acc + (q.opcoes[optIdx]?.pontosRisco ?? 0);
  }, 0);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitSurvey = () => {
    if (answeredCount < totalQuestions) return;
    if (!submitted) {
      setParticipantCount((c) => c + 1);
      setSubmitted(true);
    }
  };

  const handleResetSurvey = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const getRiskClassification = (score: number) => {
    if (score <= 2) {
      return {
        nivel: 'Baixo Risco Aparente · Manter Prevenção Anual',
        corTexto: 'text-[#0F4C3A]',
        recomendacao:
          'Os sinais relatados indicam bom desenvolvimento visual aparente. Mantenha o acompanhamento regular de puericultura na UBS, confira o registro do Teste do Olhinho na Caderneta da Criança e realize avaliação oftalmológica preventiva no ingresso escolar.',
      };
    }
    if (score <= 7) {
      return {
        nivel: 'Alerta Moderado · Sinais Sugestivos de Ametropia Escolar',
        corTexto: 'text-[#B45309]',
        recomendacao:
          'Foram identificados sinais comportamentais compatíveis com esforço visual (miopia, hipermetropia ou astigmatismo na infância). Recomenda-se agendar consulta oftalmológica com refração sob cicloplegia para proteger o aprendizado escolar.',
      };
    }
    return {
      nivel: 'Prioridade Clínica Elevada · Avaliação Oftalmológica Recomendada',
      corTexto: 'text-[#9A3412]',
      recomendacao:
        'A presença de múltiplos sinais visuais, ausência do Teste do Olhinho ou suspeita de estrabismo/leucocoria demanda avaliação oftalmológica prioritária na rede de referência do SUS para prevenir ambliopia e proteger a visão.',
    };
  };

  const currentChapter = EBOOK_CHAPTERS[activeChapterIdx];
  const riskInfo = getRiskClassification(totalRiskScore);

  return (
    <div className="space-y-14">
      {/* PARTE 1: ENQUETE DIGITAL INTERATIVA (INSTRUMENTO DE COLETA POPULACIONAL) */}
      <div className="bg-white border border-[#E2DCCE] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#EBE5D8]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#0F4C3A] font-mono-tabular">
              <span>INSTRUMENTO DE COLETA DE DADOS POPULACIONAIS</span>
              <span>·</span>
              <span>AMOSTRA CONSOLIDADA: {participantCount} PARTICIPANTES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#18221F] mt-1">
              Enquete Digital: Sinais de Dificuldades Visuais na Infância
            </h3>
            <p className="text-sm text-[#4B5552] mt-1 max-w-3xl">
              Questionário estruturado aplicado junto a pais, responsáveis e professores para rastreamento comunitário
              de sinais precoces de ametropias escolares, ambliopia e realização do Teste do Olhinho.
            </p>
          </div>

          <div className="text-left lg:text-right shrink-0">
            <p className="text-xs text-[#64706C]">Progresso de Preenchimento</p>
            <p className="text-lg font-mono-tabular font-bold text-[#0F4C3A]">
              {answeredCount} / {totalQuestions} questões respondidas
            </p>
          </div>
        </div>

        {/* Lista das 6 Questões Estruturadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
          {SURVEY_QUESTIONS.map((q) => {
            const chosenIdx = selectedAnswers[q.id];
            return (
              <div
                key={q.id}
                className="bg-[#FAF8F3] border border-[#E2DCCE] rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5A6561] mb-1.5">
                    <span className="font-mono-tabular font-semibold text-[#0F4C3A]">
                      Questão 0{q.id}
                    </span>
                    <span>{q.categoria}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#18221F] leading-snug">{q.pergunta}</h4>
                  <p className="text-xs text-[#5A6561] mt-1.5 leading-relaxed">{q.explicacaoClinica}</p>

                  <div className="mt-4 space-y-2">
                    {q.opcoes.map((opt, idx) => {
                      const isSelected = chosenIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, idx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] font-medium'
                              : 'bg-white text-[#26312E] border-[#DED8C8] hover:border-[#0F4C3A]'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono-tabular ${
                              isSelected ? 'border-amber-300 bg-amber-400 text-[#0F4C3A]' : 'border-stone-400'
                            }`}
                          >
                            {isSelected ? '✓' : ''}
                          </span>
                          <span>{opt.texto}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {chosenIdx !== undefined && (
                  <div className="mt-3 pt-2.5 border-t border-[#E2DCCE] text-xs text-[#0F4C3A]">
                    <strong>Orientação Educativa:</strong> {q.opcoes[chosenIdx].feedback}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Barra de Submissão e Resultado da Enquete */}
        <div className="mt-6 pt-6 border-t border-[#EBE5D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-[#4B5552]">
            <span>Enquete anônima de caráter estritamente educativo e epidemiológico</span>
            <span className="mx-2">·</span>
            <span>Editora Mente e Saúde & Centro Prof. Maria Dalva de Araújo</span>
          </div>

          <div className="flex items-center gap-3">
            {Object.keys(selectedAnswers).length > 0 && (
              <button
                type="button"
                onClick={handleResetSurvey}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#37413E] bg-[#F2EFE7] hover:bg-[#E5E0D4] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar Respostas</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleSubmitSurvey}
              disabled={answeredCount < totalQuestions}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#D97706] hover:bg-[#B45309] disabled:bg-stone-300 disabled:text-stone-500 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>
                {submitted
                  ? 'Devolutiva Educativa Gerada'
                  : answeredCount < totalQuestions
                  ? `Responda todas as ${totalQuestions} questões (${answeredCount}/${totalQuestions})`
                  : 'Concluir Enquete e Ver Devolutiva Visual'}
              </span>
            </button>
          </div>
        </div>

        {/* Painel de Resultado quando submetido */}
        {submitted && (
          <div className="mt-6 bg-[#F4F1EA] border border-[#D4AF37] rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DFD8C8]">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#64706C]">
                  RESULTADO DA TRIAGEM EDUCATIVA DIGITAL · ESCORE: {totalRiskScore} PONTOS
                </p>
                <h4 className={`text-xl font-display font-bold mt-1 ${riskInfo.corTexto}`}>
                  {riskInfo.nivel}
                </h4>
              </div>
              <button
                type="button"
                onClick={onScrollToCert}
                className="px-4 py-2 text-xs font-semibold bg-[#0F4C3A] text-white rounded-lg hover:bg-[#16634C] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start"
              >
                Ver Certificado Oficial Nº 09
              </button>
            </div>
            <p className="text-sm text-[#26312E] mt-3 leading-relaxed">{riskInfo.recomendacao}</p>
          </div>
        )}
      </div>

      {/* PARTE 2: PAINEL DE MÉTRICAS EPIDEMIOLÓGICAS DA COLETA POPULACIONAL */}
      <div className="bg-white border border-[#E2DCCE] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="pb-6 border-b border-[#EBE5D8] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A]">
              Resultados Consolidados da Pesquisa-Ação Comunitária (Setembro/2025)
            </p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#18221F] mt-1">
              Indicadores Epidemiológicos da Coleta Populacional (n = {participantCount})
            </h3>
          </div>
          <p className="text-xs text-[#5A6561] font-mono-tabular">
            Período da Coleta: {EPIDEMIOLOGICAL_STATS.periodoColeta} · Registro: EMS-CDP-2025-0914
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Distribuição de Respondentes */}
          <div className="lg:col-span-5 bg-[#FAF8F3] border border-[#E2DCCE] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-bold text-[#18221F]">
                Perfil Comunitário dos Participantes da Enquete
              </h4>
              <p className="text-xs text-[#5A6561] mt-1">
                Distribuição proporcional entre famílias e profissionais da comunidade escolar alcançados.
              </p>

              <div className="mt-5 space-y-4">
                {EPIDEMIOLOGICAL_STATS.distribuicaoRespondentes.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-medium text-[#18221F] mb-1">
                      <span>{item.grupo}</span>
                      <span className="font-mono-tabular font-bold text-[#0F4C3A]">
                        {item.quantidade} ({item.percentual}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-[#E6E0D2] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0F4C3A] rounded-full"
                        style={{ width: `${item.percentual}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2DCCE] text-xs text-[#4B5552]">
              100% dos respondentes receberam automaticamente o Mini E-book Ilustrado do Teste do Olhinho ao concluir o
              formulário digital.
            </div>
          </div>

          {/* Principais Achados Epidemiológicos */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EPIDEMIOLOGICAL_STATS.principaisAchados.map((achado, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F3] border border-[#E2DCCE] rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <p className="text-3xl font-display font-bold text-[#0F4C3A] font-mono-tabular">
                    {achado.percentual}%
                  </p>
                  <h5 className="text-sm font-bold text-[#18221F] mt-2 leading-snug">
                    {achado.indicador}
                  </h5>
                </div>
                <p className="text-xs text-[#5A6561] mt-3 pt-2.5 border-t border-[#E6E0D2] leading-relaxed">
                  {achado.detalhe}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTE 3: LEITOR INTERATIVO DO MINI E-BOOK DO TESTE DO OLHINHO */}
      <div id="mini-ebook" className="bg-white border border-[#E2DCCE] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#EBE5D8]">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#0F4C3A]">
              Produção Editorial Gratuita Distribuída à Comunidade · ISBN / Registro Extensão 2025
            </p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#18221F] mt-1">
              Mini E-book Ilustrado: O Teste do Olhinho e a Visão Escolar
            </h3>
            <p className="text-sm text-[#4B5552] mt-1">
              Material didático elaborado pelo Dr. Lucas Gonçalves Silveira em linguagem acessível para pais, gestantes
              e professores da rede de ensino.
            </p>
          </div>

          {/* Paginador de Capítulos */}
          <div className="flex items-center gap-2 self-start">
            {EBOOK_CHAPTERS.map((chap, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveChapterIdx(idx)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeChapterIdx === idx
                    ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                    : 'bg-[#FAF8F3] text-[#37413E] border-[#E2DCCE] hover:border-[#0F4C3A]'
                }`}
              >
                Cap. 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Corpo da Página Aberta do Mini E-book */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-stretch">
          {/* Coluna Editorial de Leitura (7 colunas) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#D97706] font-semibold">
                <span>{currentChapter.numero}</span>
                <span>·</span>
                <span>CADERNO DE SAÚDE OCULAR INFANTIL</span>
              </div>
              <h4 className="text-2xl font-display font-bold text-[#18221F] mt-1">
                {currentChapter.titulo}
              </h4>
              <p className="text-sm font-medium text-[#0F4C3A] mt-1">{currentChapter.subtitulo}</p>

              <div className="mt-4 p-4 bg-[#FAF8F3] border border-[#E2DCCE] rounded-xl text-sm font-medium text-[#18221F] leading-relaxed">
                {currentChapter.resumoDestaque}
              </div>

              <div className="mt-4 space-y-3.5 text-sm text-[#2D3835] leading-relaxed">
                {currentChapter.conteudo.map((paragrafo, pIdx) => (
                  <p key={pIdx}>{paragrafo}</p>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EBE5D8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveChapterIdx((prev) => Math.max(0, prev - 1))}
                disabled={activeChapterIdx === 0}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#E2DCCE] text-[#18221F] hover:bg-[#FAF8F3] disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Capítulo Anterior</span>
              </button>

              <span className="text-xs font-mono-tabular text-[#5A6561]">
                Página {activeChapterIdx + 1} de {EBOOK_CHAPTERS.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setActiveChapterIdx((prev) => Math.min(EBOOK_CHAPTERS.length - 1, prev + 1))
                }
                disabled={activeChapterIdx === EBOOK_CHAPTERS.length - 1}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#0F4C3A] text-white hover:bg-[#15654D] disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Próximo Capítulo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Coluna Ilustrada & Quadro de Orientação Prática (5 colunas) */}
          <div className="lg:col-span-5 bg-[#FAF8F3] border border-[#E2DCCE] rounded-xl p-6 flex flex-col justify-between space-y-5">
            <div>
              <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#5A6561]">
                Infográfico Didático · {currentChapter.numero}
              </p>

              {/* Ilustração Vetorial Contextual por Capítulo */}
              <div className="my-4 bg-white border border-[#E2DCCE] rounded-xl p-5 flex items-center justify-center min-h-[200px]">
                {currentChapter.tipoIlustracao === 'reflexo-vermelho' && (
                  <div className="text-center space-y-3 w-full">
                    <div className="flex items-center justify-around">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-amber-950 flex items-center justify-center border-4 border-stone-200">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-amber-400" />
                        </div>
                        <span className="text-xs font-bold text-[#0F4C3A] mt-2">Reflexo Vermelho Normal</span>
                        <span className="text-[11px] text-stone-500">Eixo óptico transparente</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-amber-950 flex items-center justify-center border-4 border-amber-400">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-white" />
                        </div>
                        <span className="text-xs font-bold text-[#B45309] mt-2">Leucocoria (Alerta)</span>
                        <span className="text-[11px] text-stone-500">Reflexo branco pupilar</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.tipoIlustracao === 'sinais-escola' && (
                  <div className="w-full space-y-2 text-xs text-[#18221F]">
                    <p className="font-bold text-[#0F4C3A] text-center pb-1 border-b border-stone-200">
                      Checklist Rápido para Sala de Aula
                    </p>
                    <p>1. Sentar muito perto da lousa ou segurar caderno a menos de 20 cm</p>
                    <p>2. Semicerrar ("apertar") os olhos para focar letras distantes</p>
                    <p>3. Dor de cabeça frontal ou cansaço visual no fim da aula</p>
                    <p>4. Coçar os olhos repetidamente (risco para ceratocone)</p>
                  </div>
                )}

                {currentChapter.tipoIlustracao === 'janela-ambliopia' && (
                  <div className="w-full space-y-3 text-center">
                    <p className="text-xs font-bold text-[#0F4C3A]">
                      Curva de Plasticidade Neurovisual Infantil (0 a 7 anos)
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <p className="font-bold text-[#0F4C3A]">0 a 3 anos</p>
                        <p className="text-stone-600 mt-0.5">Máxima resposta ao tratamento</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="font-bold text-[#B45309]">4 a 7 anos</p>
                        <p className="text-stone-600 mt-0.5">Janela crítica pré-escolar</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-stone-100 border border-stone-300">
                        <p className="font-bold text-stone-700">&gt; 8 anos</p>
                        <p className="text-stone-600 mt-0.5">Redução da plasticidade cortical</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentChapter.tipoIlustracao === 'fluxo-sus' && (
                  <div className="w-full space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E2DCCE]">
                      <strong className="text-[#0F4C3A]">Passo 1 · Maternidade:</strong> Teste do Olhinho gratuito
                      antes da alta hospitalar.
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E2DCCE]">
                      <strong className="text-[#0F4C3A]">Passo 2 · UBS & PSE:</strong> Puericultura, Caderneta da
                      Criança e Triagem Escolar.
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E2DCCE]">
                      <strong className="text-[#0F4C3A]">Passo 3 · Centro Especializado SUS:</strong> Exame dilatado e
                      tratamento oftalmológico.
                    </div>
                  </div>
                )}
              </div>

              {/* Destaque Prático */}
              <div className="bg-[#FFFBEB] border border-[#F59E0B] rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                  {currentChapter.dicaPraticaTitulo}
                </p>
                <p className="text-xs sm:text-sm text-[#18221F] mt-1.5 leading-relaxed">
                  {currentChapter.dicaPraticaTexto}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2DCCE] text-[11px] text-[#5A6561]">
              <strong>Fonte Científica:</strong> {currentChapter.referenciaOficial}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
