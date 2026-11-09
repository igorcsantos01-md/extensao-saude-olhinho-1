export interface EixoMetodologico {
  eixo: string;
  subtitulo: string;
  descricao: string;
  cargaHoraria: string;
}

export interface CertificateData {
  numero: string;
  livro: string;
  folha: string;
  codigo: string;
  chave: string;
  hashSha256: string;
  titular: string;
  cpf: string;
  qualificacao: string;
  instituicaoOrigem: string;
  titulo: string;
  enquadramentoCurricular: string;
  modalidadeTexto: string;
  periodo: string;
  dataEmissao: string;
  localEmissao: string;
  cargaHorariaNumero: string;
  cargaHorariaExtenso: string;
  paragrafoEscopoFrente: string;
  eixosVerso: EixoMetodologico[];
}

export const CERTIFICATE_09: CertificateData = {
  numero: '09',
  livro: '01/2025',
  folha: '64',
  codigo: 'EMS-CDP-2025-0914',
  chave: '0914-6283-4910-7E9B',
  hashSha256: '9e4b7c12a8f03d65e1928b4c7a30f6d8e2c15b9a4d70f3e81c6a2b5d904e0914',
  titular: 'LUCAS GONÇALVES SILVEIRA',
  cpf: '702.794.941-57',
  qualificacao: 'Médico',
  instituicaoOrigem: 'Centro Universitário Alfredo Nasser (UNIFAN)',
  titulo:
    'Ação Educativa e Coleta de Dados Populacionais com Pais e Escolares: Enquete Digital sobre Dificuldades Visuais na Infância e Mini E-book do Teste do Olhinho',
  enquadramentoCurricular:
    'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias',
  modalidadeTexto: 'Coleta de Dados Populacionais, Campanha Educativa e Atividade Comunitária',
  periodo: '11 a 13 de setembro de 2025',
  dataEmissao: '19 de setembro de 2025',
  localEmissao: 'Goiânia - GO',
  cargaHorariaNumero: '12',
  cargaHorariaExtenso: '12 (doze) horas',
  paragrafoEscopoFrente:
    'No âmbito desta ação extensionista, o profissional atuou na aplicação de questionário digital estruturado para pais, responsáveis e professores identificarem sinais precoces de ametropias e ambliopia na infância (coleta de dados populacionais), acompanhada da elaboração e distribuição comunitária gratuita do mini e-book ilustrado sobre o Teste do Olhinho (Teste do Reflexo Vermelho), comunicação em saúde para combate à desinformação (fake news) e divulgação dos canais oficiais de triagem neonatal e saúde ocular do SUS.',
  eixosVerso: [
    {
      eixo: 'Eixo I — Curadoria Científica e Produção Editorial Pediátrica',
      subtitulo: 'Editoração Científica em Oftalmopediatria e Triagem Neonatal',
      descricao:
        'Revisão de literatura oftalmológica e elaboração didática do Mini E-book Ilustrado "Teste do Olhinho e Visão Escolar: Guia Prático para Pais e Educadores", fundamentado nas diretrizes da Sociedade Brasileira de Oftalmologia Pediátrica (SBOP), CBO e Ministério da Saúde.',
      cargaHoraria: '03h 00min',
    },
    {
      eixo: 'Eixo II — Coleta de Dados Populacionais com Pais e Escolares',
      subtitulo: 'Inquérito Epidemiológico Comunitário sobre Sinais Visuais na Infância',
      descricao:
        'Estruturação e aplicação de Enquete Digital Interativa junto a pais, responsáveis e professores para coleta de dados populacionais sobre queixas visuais escolares (aproximação da lousa/caderno, cefaleia vespertina, franzimento palpebral e suspeita de estrabismo).',
      cargaHoraria: '03h 30min',
    },
    {
      eixo: 'Eixo III — Educação em Saúde Ocular e Combate a Fake News',
      subtitulo: 'Letramento Comunitário sobre Ambliopia, Leucocoria e Telas na Infância',
      descricao:
        'Campanha educativa virtual de conscientização sobre a janela crítica do desenvolvimento visual infantil (prevenção da ambliopia), identificação precoce da leucocoria no reflexo pupilar e desmistificação de boatos sobre o uso de óculos na infância.',
      cargaHoraria: '03h 00min',
    },
    {
      eixo: 'Eixo IV — Ação Comunitária e Divulgação dos Canais Oficiais do SUS',
      subtitulo: 'Cidadania em Saúde Infantil, Triagem Neonatal e Caderneta da Criança',
      descricao:
        'Entrega automatizada do guia ilustrado aos participantes da enquete e orientação comunitária sobre o direito ao Teste do Reflexo Vermelho na maternidade, Programa Saúde na Escola (PSE), atualização vacinal na Caderneta da Criança e referência oftalmológica no SUS.',
      cargaHoraria: '02h 30min',
    },
  ],
};

export interface SurveyQuestion {
  id: number;
  categoria: string;
  pergunta: string;
  explicacaoClinica: string;
  opcoes: {
    texto: string;
    pontosRisco: number;
    feedback: string;
  }[];
}

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    categoria: 'Triagem Neonatal (Teste do Olhinho)',
    pergunta:
      'A criança realizou o Teste do Olhinho (Teste do Reflexo Vermelho) ainda na maternidade ou na primeira semana de vida, com registro na Caderneta da Criança?',
    explicacaoClinica:
      'O Teste do Reflexo Vermelho (Teste de Brückner) rastreia precocemente opacidades de meios ópticos como catarata congênita, glaucoma congênito e retinoblastoma.',
    opcoes: [
      {
        texto: 'Sim, realizou na maternidade e o resultado foi normal em ambos os olhos',
        pontosRisco: 0,
        feedback: 'Excelente! Mesmo com o teste neonatal normal, avaliações oftalmológicas periódicas são recomendadas na fase pré-escolar.',
      },
      {
        texto: 'Realizou, porém não lembro o resultado ou não está anotado na Caderneta',
        pontosRisco: 1,
        feedback: 'Recomendado conferir a Caderneta da Criança e agendar avaliação oftalmológica de rotina.',
      },
      {
        texto: 'Não realizou ou houve suspeita de reflexo duvidoso/esbranquiçado',
        pontosRisco: 3,
        feedback: 'Atenção prioritária: Toda criança sem registro ou com reflexo pupilar alterado deve passar por exame oftalmológico completo com fundo de olho.',
      },
    ],
  },
  {
    id: 2,
    categoria: 'Comportamento Visual em Sala de Aula e em Casa',
    pergunta:
      'Em atividades escolares ou de lazer, você observa que a criança se aproxima excessivamente da lousa, da televisão ou segura o caderno muito perto do rosto?',
    explicacaoClinica:
      'A redução da distância focal habitual é um dos sinais comportamentais clássicos de miopia escolar ou baixa acuidade visual não corrigida.',
    opcoes: [
      {
        texto: 'Não, enxerga bem à distância sem precisar se aproximar',
        pontosRisco: 0,
        feedback: 'Comportamento visual a distância dentro do esperado para a faixa etária.',
      },
      {
        texto: 'Às vezes pede para sentar nas primeiras carteiras para copiar do quadro',
        pontosRisco: 2,
        feedback: 'Sinal de alerta moderado para miopia ou astigmatismo em fase inicial.',
      },
      {
        texto: 'Sim, aproxima muito os objetos do rosto com frequência diária',
        pontosRisco: 3,
        feedback: 'Forte indicativo de erro refrativo significativo. A correção óptica precoce evita prejuízo no rendimento escolar.',
      },
    ],
  },
  {
    id: 3,
    categoria: 'Sinal de Fenda Estenopeica (Franzir os Olhos)',
    pergunta:
      'A criança costuma "apertar" ou franzir os olhos (semicerrar as pálpebras) ou inclinar a cabeça quando tenta focar objetos distantes?',
    explicacaoClinica:
      'Ao semicerrar as pálpebras, a criança cria inconscientemente um efeito estenopeico para reduzir a dispersão luminosa na retina em quadros de miopia ou astigmatismo.',
    opcoes: [
      {
        texto: 'Nunca observei esse comportamento',
        pontosRisco: 0,
        feedback: 'Ausência de manobra compensatória palpebral.',
      },
      {
        texto: 'Ocorre ocasionalmente em ambientes muito iluminados ou ao ler longe',
        pontosRisco: 2,
        feedback: 'Vale observar se há associação com fotofobia ou dificuldade para focar letras pequenas.',
      },
      {
        texto: 'Sim, franze os olhos ou inclina a cabeça repetidamente para enxergar',
        pontosRisco: 3,
        feedback: 'Sinal clínico clássico de ametropia ou torcicolo ocular compensatório.',
      },
    ],
  },
  {
    id: 4,
    categoria: 'Astenopia Pediátrica (Cansaço Visual e Cefaleia)',
    pergunta:
      'Após o período de aula ou tarefas de leitura, a criança relata dor de cabeça na região da testa, ardência ocular, lacrimejamento ou coça muito os olhos?',
    explicacaoClinica:
      'Esforço acomodativo excessivo (comum na hipermetropia e astigmatismo) causa cefaleia frontal/periorbitária vespertina, além do hábito de coçar os olhos ser fator de risco para ceratocone.',
    opcoes: [
      {
        texto: 'Não apresenta queixas de dor de cabeça nem coceira ocular frequente',
        pontosRisco: 0,
        feedback: 'Sem sinais evidentes de fadiga acomodativa ou alergia ocular.',
      },
      {
        texto: 'Queixa-se de dor de cabeça ou cansaço visual no final da tarde escolar',
        pontosRisco: 2,
        feedback: 'A cefaleia vespertina após esforço visual é típica de ametropias não corrigidas na infância.',
      },
      {
        texto: 'Sim, apresenta dor de cabeça frequente e coça os olhos intensamente',
        pontosRisco: 3,
        feedback: 'Importante avaliar refração sob cicloplegia e orientar a criança a não esfregar os olhos (prevenção de ceratocone).',
      },
    ],
  },
  {
    id: 5,
    categoria: 'Alinhamento Ocular e Reflexo Pupilar em Fotografias',
    pergunta:
      'Você já notou algum desvio no olhar da criança (olho "torto" / estrabismo) ou percebeu uma mancha branca na pupila em fotografias com flash?',
    explicacaoClinica:
      'Qualquer desvio ocular após os 4-6 meses de vida ou reflexo pupilar esbranquiçado (leucocoria) exige avaliação oftalmológica imediata para prevenir ambliopia ("olho preguiçoso") e afastar patologias graves.',
    opcoes: [
      {
        texto: 'Olhos sempre alinhados e reflexo avermelhado simétrico nas fotos',
        pontosRisco: 0,
        feedback: 'Alinhamento motor e reflexo pupilar simétricos.',
      },
      {
        texto: 'Notei um leve desvio ocasional quando a criança está muito cansada',
        pontosRisco: 2,
        feedback: 'Desvios intermitentes devem ser investigados antes dos 7 anos (janela de plasticidade neural da visão).',
      },
      {
        texto: 'Sim, há desvio perceptível ou reflexo branco/assimétrico em fotos',
        pontosRisco: 4,
        feedback: 'Prioridade máxima: Sinais de estrabismo ou leucocoria demandam consulta oftalmológica imediata na rede de referência.',
      },
    ],
  },
  {
    id: 6,
    categoria: 'Exposição a Telas e Higiene Visual Infantil',
    pergunta:
      'Qual é o tempo médio diário de uso recreativo de telas próximas (celular/tablet) pela criança fora das atividades escolares?',
    explicacaoClinica:
      'O trabalho visual prolongado para perto e a baixa exposição à luz natural ao ar livre estão diretamente associados ao avanço epidêmico da miopia infantil.',
    opcoes: [
      {
        texto: 'Até 1 hora por dia, com brincadeiras diárias ao ar livre (luz solar)',
        pontosRisco: 0,
        feedback: 'Excelente! A exposição diária a ambientes externos com luz natural protege contra a progressão da miopia.',
      },
      {
        texto: 'Entre 2 e 3 horas por dia, com poucas pausas visuais',
        pontosRisco: 1,
        feedback: 'Recomenda-se aplicar a Regra 20-20-20 e ampliar as atividades externas ao ar livre.',
      },
      {
        texto: 'Mais de 3 horas diárias de celular/tablet muito próximo ao rosto',
        pontosRisco: 2,
        feedback: 'Risco elevado para miopia precoce e olho seco pediátrico. Adote pausas regulares e distância mínima de 35-40 cm.',
      },
    ],
  },
];

export interface EbookChapter {
  numero: string;
  titulo: string;
  subtitulo: string;
  resumoDestaque: string;
  conteudo: string[];
  dicaPraticaTitulo: string;
  dicaPraticaTexto: string;
  referenciaOficial: string;
  tipoIlustracao: 'reflexo-vermelho' | 'sinais-escola' | 'janela-ambliopia' | 'fluxo-sus';
}

export const EBOOK_CHAPTERS: EbookChapter[] = [
  {
    numero: 'Capítulo 01',
    titulo: 'O que é o Teste do Olhinho (Teste do Reflexo Vermelho)?',
    subtitulo: 'Triagem Neonatal Rápida, Indolor e Essencial nas Primeiras Horas de Vida',
    resumoDestaque:
      'Realizado com um oftalmoscópio direto em ambiente de penumbra, o exame projeta um feixe de luz nos olhos do recém-nascido: quando saudável, a pupila reflete um brilho avermelhado-alaranjado homogêneo e simétrico.',
    conteudo: [
      'O Teste do Reflexo Vermelho (TRV), popularmente conhecido como Teste do Olhinho, é um exame de triagem neonatal universal preconizado pelo Ministério da Saúde e pela Sociedade Brasileira de Oftalmologia Pediátrica (SBOP). Ele deve ser realizado ainda na maternidade, preferencialmente antes da alta hospitalar, e repetido nas consultas de puericultura.',
      'O princípio óptico é simples e seguro: não há necessidade de pingar colírios agressivos nem de encostar qualquer aparelho no olho do bebê. A luz do oftalmoscópio atravessa as estruturas transparentes do olho (córnea, humor aquoso, cristalino e humor vítreo) e ilumina a retina ricamente vascularizada, devolvendo um reflexo vermelho ou alaranjado brilhante.',
      'Quando existe qualquer obstáculo à passagem da luz — como na Catarata Congênita, no Glaucoma Congênito, em hemorragias vítreas ou no Retinoblastoma (tumor intraocular mais frequente na infância) — o reflexo torna-se ausente, assimétrico ou esbranquiçado (fenômeno chamado clinicamente de Leucocoria).',
    ],
    dicaPraticaTitulo: 'Alerta em Fotografias com Flash (Leucocoria)',
    dicaPraticaTexto:
      'Se em fotografias tiradas com flash um dos olhos da criança apresentar a pupila branca ("olho de gato") enquanto o outro apresenta o reflexo vermelho habitual, procure imediatamente atendimento oftalmológico no SUS.',
    referenciaOficial: 'Diretrizes de Atenção à Saúde Ocular na Infância — Ministério da Saúde / CBO / SBOP',
    tipoIlustracao: 'reflexo-vermelho',
  },
  {
    numero: 'Capítulo 02',
    titulo: '7 Sinais de Alerta Visual na Idade Escolar',
    subtitulo: 'Como Pais e Professores Podem Identificar Dificuldades Visuais na Sala de Aula',
    resumoDestaque:
      'Até 80% do aprendizado na infância ocorre por estímulos visuais. Muitas vezes, crianças rotuladas como "distraídas" ou com baixo rendimento escolar apenas não conseguem enxergar nitidamente o quadro.',
    conteudo: [
      'As crianças pequenas raramente sabem verbalizar que estão enxergando embaçado, pois acreditam que todo mundo vê o mundo da mesma forma que elas. Por isso, a observação conjunta entre pais em casa e professores na escola é a ferramenta mais poderosa de detecção precoce.',
      'Fique atento aos 7 sinais clássicos: (1) Aproximar-se demais da TV, da lousa ou segurar livros colados ao rosto; (2) Semicerrar ou franzir as pálpebras para tentar focar à distância; (3) Dor de cabeça frontal ou nos olhos no final da tarde escolar; (4) Pular linhas ao ler ou perder o foco rápido nas tarefas; (5) Coçar os olhos repetidamente (risco para ceratocone); (6) Sensibilidade exagerada à luz (fotofobia) ou lacrimejamento; e (7) Inclinar a cabeça para um dos lados ao olhar para frente.',
      'A identificação de qualquer um desses sinais justifica o encaminhamento para exame oftalmológico completo com refração sob cicloplegia (dilatação pupilar que relaxa o músculo da acomodação infantil e revela o grau exato).',
    ],
    dicaPraticaTitulo: 'Mito vs. Verdade: "Usar óculos cedo vicia o olho?"',
    dicaPraticaTexto:
      'MITO! Óculos não viciam nem enfraquecem os olhos. Pelo contrário: na infância, o uso correto dos óculos estimula o cérebro a desenvolver 100% do potencial da visão.',
    referenciaOficial: 'Programa Saúde na Escola (PSE) — Caderno de Saúde Ocular do Ministério da Saúde',
    tipoIlustracao: 'sinais-escola',
  },
  {
    numero: 'Capítulo 03',
    titulo: 'Janela Crítica da Visão e Prevenção da Ambliopia',
    subtitulo: 'Por que o Diagnóstico Antes dos 7 Anos Muda o Futuro Visual da Criança',
    resumoDestaque:
      'O sistema visual humano não nasce pronto: o córtex visual cerebral amadurece intensamente do nascimento até cerca de 7 a 8 anos de idade. Tratar nessa janela evita a cegueira funcional irreversível.',
    conteudo: [
      'A Ambliopia — conhecida popularmente como "olho preguiçoso" — ocorre quando um dos olhos (ou ambos) não envia imagens nítidas para o cérebro durante o período crítico de maturação neurovisual na primeira infância. As principais causas são o estrabismo (desvio ocular) e a anisometropia (diferença grande de grau entre um olho e outro).',
      'Como a criança enxerga bem com o olho bom, ela não reclama de dificuldade visual, e o olho com grau alto passa despercebido se não houver exame preventivo. Se a ambliopia for descoberta até os 6–7 anos, o tratamento com óculos adequados e oclusão (tampão ocular) recupera a visão com altíssima taxa de sucesso.',
      'Além disso, orientamos a Higiene Visual na Era Digital: limitar o tempo de telas próximas conforme a idade (Sociedade Brasileira de Pediatria), manter distância mínima de 35 cm do celular/tablet e garantir pelo menos 1 a 2 horas diárias de atividades ao ar livre sob luz natural.',
    ],
    dicaPraticaTitulo: 'Regra 20-20-20 e Luz Solar Natural',
    dicaPraticaTexto:
      'A cada 20 minutos de estudo em telas ou livros próximos, incentive a criança a olhar para longe (6 metros / janela) por 20 segundos. Brincar ao ar livre reduz significativamente o avanço da miopia!',
    referenciaOficial: 'Consenso Brasileiro de Miopia e Ambliopia na Infância — CBO / SBOP',
    tipoIlustracao: 'janela-ambliopia',
  },
  {
    numero: 'Capítulo 04',
    titulo: 'Fluxo de Acesso Oficial pelo SUS e Caderneta da Criança',
    subtitulo: 'Onde Buscar Atendimento Oftalmológico Gratuito e Como Atualizar a Caderneta',
    resumoDestaque:
      'Da Maternidade à Unidade Básica de Saúde (UBS): conheça os canais oficiais do Sistema Único de Saúde para triagem ocular, consultas oftalmológicas pediátricas e proteção integral da infância.',
    conteudo: [
      '1. Na Maternidade (0 a 30 dias): Todo recém-nascido tem direito ao Teste do Reflexo Vermelho antes da alta. Caso haja reflexo alterado ou duvidoso, a maternidade encaminha o bebê com prioridade aos Centros de Referência em Oftalmologia do SUS.',
      '2. Na Atenção Primária (UBS / Saúde da Família): Durante as consultas de puericultura e pré-escolar, o médico ou enfermeiro verifica os marcos visuais e a Caderneta da Criança (incluindo a atualização vacinal do PNI, já que infecções congênitas evitáveis por vacina como a Rubéola são causas importantes de catarata e cegueira infantil).',
      '3. No Programa Saúde na Escola (PSE) e Meu SUS Digital: Escolas públicas articuladas às equipes de Saúde da Família realizam triagens de acuidade visual com a Tabela de Snellen e encaminham escolares com baixa visão para consulta especializada e fornecimento gratuito de óculos pelo SUS.',
    ],
    dicaPraticaTitulo: 'Canais Oficiais de Saúde Pública',
    dicaPraticaTexto:
      'Consulte a Caderneta Digital da Criança no aplicativo oficial Meu SUS Digital (Ministério da Saúde) ou procure a Unidade Básica de Saúde (UBS) mais próxima da sua residência. Em urgências oculares ou traumas, acione o SAMU 192.',
    referenciaOficial: 'Portal Meu SUS Digital (gov.br/saude) e Rede de Atenção Oftalmológica do SUS',
    tipoIlustracao: 'fluxo-sus',
  },
];

export const EPIDEMIOLOGICAL_STATS = {
  totalParticipantes: 418,
  periodoColeta: '11 a 13 de setembro de 2025',
  distribuicaoRespondentes: [
    { grupo: 'Mães, Pais e Responsáveis Legais', quantidade: 284, percentual: 67.9 },
    { grupo: 'Professores da Educação Infantil e Fundamental I', quantidade: 98, percentual: 23.4 },
    { grupo: 'Coordenadores Pedagógicos e Agentes Escolares', quantidade: 36, percentual: 8.7 },
  ],
  principaisAchados: [
    {
      indicador: 'Crianças de 5 a 10 anos que nunca haviam passado por exame oftalmológico completo',
      percentual: 46.4,
      detalhe: '194 de 418 escolares avaliados dependiam exclusivamente da observação em sala de aula.',
    },
    {
      indicador: 'Relato de aproximação excessiva da lousa, TV ou caderno no último semestre',
      percentual: 34.2,
      detalhe: '143 escolares apresentavam comportamento sugestivo de miopia ou astigmatismo escolar.',
    },
    {
      indicador: 'Queixa de cefaleia vespertina (dor de cabeça após a aula) ou franzimento palpebral',
      percentual: 28.9,
      detalhe: '121 relatos compatíveis com esforço acomodativo e astenopia na infância.',
    },
    {
      indicador: 'Desconhecimento prévio sobre o significado da mancha branca pupilar (leucocoria) em fotos',
      percentual: 71.5,
      detalhe: '299 participantes desconheciam o alerta fotográfico antes da leitura do Mini E-book do Teste do Olhinho.',
    },
  ],
};

export const GITHUB_REPOSITORY_COMMAND = `# COMANDO MESTRE PARA REPOSITÓRIO GITHUB & DEPLOY VERCEL
# Projeto: Portal Interinstitucional de Extensão em Saúde Visual na Infância + Certificado Nº 09 (EMS-CDP-2025-0914)

CONTEXTO E OBJETIVO DO REPOSITÓRIO:
Atue como Arquiteto de Software Full-Stack e Designer Editorial Sênior. Construa e publique uma plataforma web pública interativa de Extensão Universitária, Coleta de Dados Populacionais e Autenticação Criptográfica de Documentos Acadêmicos emitidos em parceria pela **Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)** e pelo **Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)**.

O sistema deve operar como o portal oficial e validador público do **Certificado de Atividade de Extensão Nº 09 (Código: EMS-CDP-2025-0914 | Chave: 0914-6283-4910-7E9B)**, referente à ação:
"Ação Educativa e Coleta de Dados Populacionais com Pais e Escolares: Enquete Digital sobre Dificuldades Visuais na Infância e Mini E-book do Teste do Olhinho"
Titular: LUCAS GONÇALVES SILVEIRA | Médico | CPF: 702.794.941-57 | Centro Universitário Alfredo Nasser (UNIFAN).

---

## 1. ARQUITETURA DE ROTEAMENTO E VALIDAÇÃO AUTOMÁTICA POR URL
- O portal deve responder nativamente à query string \`?codigo=EMS-CDP-2025-0914#validador\` (padrão idêntico a \`https://extensao-saude-fadiga-visual.vercel.app/?codigo=EMS-CDP-2024-0318#validador\`).
- Quando um avaliador de banca (ex.: FUBOG) escanear o QR Code do certificado ou acessar o link com \`?codigo=EMS-CDP-2025-0914\`, a aplicação deve:
  1. Reconhecer instantaneamente o código \`EMS-CDP-2025-0914\` ou a chave \`0914-6283-4910-7E9B\`;
  2. Exibir o Painel Oficial de Fé Pública com status "DOCUMENTO AUTÊNTICO E VÁLIDO EM TODO O TERRITÓRIO NACIONAL";
  3. Apresentar o registro completo (Livro 01/2025, Folha 64, Hash SHA-256: \`9e4b7c12a8f03d65e1928b4c7a30f6d8e2c15b9a4d70f3e81c6a2b5d904e0914\`);
  4. Renderizar logo abaixo o Certificado Nº 09 completo (Lauda 1 — Frente e Lauda 2 — Verso/Memorial Descritivo) em estilo PDF A4 Paisagem interativo e permitir o download imediato em PDF de alta resolução.

---

## 2. DIREÇÃO DE DESIGN E PALETA DE CORES ("CLÍNICO OFTALMOLÓGICO SOLAR")
- Paleta de Cores Original:
  - Fundo Dominante (60%): Areia Solar / Alabastro Quente (\`#FAF8F3\`) e Papel Acadêmico do Certificado (\`#FAF9F6\`).
  - Superfícies Estruturais (30%): Marfim Editorial (\`#F2EFE7\`), Branco Puro (\`#FFFFFF\`) e divisórias finas (\`#E2DCCE\`).
  - Cores Institucionais e Acento Solar (10%): Verde Esmeralda Institucional (\`#0F4C3A\`), Azul Marinho Acadêmico (\`#1B365D\`) e Âmbar Dourado Solar (\`#D97706\`).
- Tipografia:
  - Títulos e Certificado: \`Fraunces\` e \`Playfair Display\` (serifadas editoriais de alta autoridade).
  - Corpo e Controles: \`Plus Jakarta Sans\`.
  - Códigos, Chaves e Hashes: \`IBM Plex Mono\` (\`tabular-nums\`).

---

## 3. MÓDULOS INTERATIVOS OBRIGATÓRIOS DA PLATAFORMA EDUCATIVA
1. **Simulador Óptico Infantil & Teste do Olhinho (Interativo)**:
   - Simulador de visão escolar (comparando em tempo real como uma criança enxerga a lousa escolar com Visão Normal 20/20, Miopia Escolar, Astigmatismo e Ambliopia).
   - Simulador do Teste do Reflexo Vermelho (Teste de Brückner): comparativo visual interativo entre o Reflexo Vermelho Fisiológico Simétrico e a Leucocoria (reflexo pupilar esbranquiçado em catarata congênita/retinoblastoma).
2. **Enquete Digital Interativa para Pais e Professores (Coleta de Dados Populacionais)**:
   - Questionário estruturado de 6 perguntas clínicas e comportamentais (Teste do Olhinho na maternidade, aproximação da lousa, franzimento palpebral, cefaleia vespertina, alinhamento ocular/leucocoria em fotos e tempo de telas).
   - Cálculo imediato de escore de orientação preventiva e liberação do Mini E-book em PDF.
3. **Leitor Interativo do Mini E-book "Teste do Olhinho e Visão na Infância"**:
   - Navegação por 4 capítulos ilustrados com diretrizes do CBO, SBOP e Ministério da Saúde, desmistificação de fake news ("óculos viciam?") e fluxo de acesso ao SUS / Programa Saúde na Escola (PSE).
4. **Painel Epidemiológico da Coleta Populacional (Setembro/2025)**:
   - Visualização dos indicadores consolidados (n = 418 famílias e educadores participantes).

---

## 4. ESPECIFICAÇÃO MILIMÉTRICA DO CERTIFICADO Nº 09 (A4 PAISAGEM — 297mm × 210mm — FRENTE E VERSO)
Mantenha exatamente o layout acadêmico de 2 laudas (Frente e Verso) com moldura dupla em Verde Institucional (\`#0F4C3A\`) e Azul Marinho (\`#1B365D\`) sobre fundo creme (\`#FAF9F6\`):

### HIGIENIZAÇÃO DE LOGOTIPOS E ASSINATURAS:
- **Logo Esquerda (Editora Mente e Saúde)**: Brasão verde-esmeralda com perfil humano, cérebro com folhas e livro aberto em fundo 100% transparente. CNPJ: \`51.372.335/0001-71\`.
- **Logo Direita (Centro Profissionalizante Maria Dalva de Araújo)**: Emblema circular azul-marinho com lâmpada em quebra-cabeça em fundo 100% transparente, SEM números de telefone e com CNPJ corrigido: \`51.269.112/0001-83\`.
- **Assinatura Esquerda**: Rubrica vetorial limpa de **BÁRBARA LIMA DOS SANTOS** — Editora-Chefe e Coordenadora de Extensão Editorial | Editora Mente e Saúde (CNPJ: 51.372.335/0001-71).
- **Assinatura Direita**: Rubrica vetorial limpa de **JAMES ARAÚJO DE SANTANA** — Coordenador de Extensão e Projetos Educativos | Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83).
- **Centro do Rodapé (Frente)**: Selo Oficial Dourado de Fé Pública (\`EMS-CDP-2025-0914\`) + QR Code escaneável de alta densidade apontando para a URL do site (\`?codigo=EMS-CDP-2025-0914#validador\`) + Caixa de Autenticação Pública Manual.

### TEXTO OFICIAL DA PÁGINA 1 (FRENTE DO CERTIFICADO Nº 09):
- Cabeçalho Central:
  \`PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA E EDUCAÇÃO EM SAÚDE\`
  \`Certificado Nº 09 · Livro de Extensão nº 01/2025 · Cód. EMS-CDP-2025-0914\`
- Título Principal: \`CERTIFICADO DE ATIVIDADE DE EXTENSÃO\`
- Corpo:
  A **Editora Mente e Saúde** (CNPJ: 51.372.335/0001-71), em parceria institucional com o **Centro Profissionalizante Maria Dalva de Araújo** (CNPJ: 51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica que
  **LUCAS GONÇALVES SILVEIRA**
  \`Médico | CPF: 702.794.941-57 | Centro Universitário Alfredo Nasser (UNIFAN)\`
  participou de forma efetiva da **Atividade de Extensão** intitulada **“Ação Educativa e Coleta de Dados Populacionais com Pais e Escolares: Enquete Digital sobre Dificuldades Visuais na Infância e Mini E-book do Teste do Olhinho”**, desenvolvida na modalidade de **Coleta de Dados Populacionais, Campanha Educativa e Atividade Comunitária**, realizada no período de **11 a 13 de setembro de 2025**, contabilizando carga horária total de **12 (doze) horas**.
  No âmbito desta ação extensionista, o profissional atuou na aplicação de questionário digital estruturado para pais, responsáveis e professores identificarem sinais precoces de ametropias e ambliopia na infância (**coleta de dados populacionais**), acompanhada da elaboração e **distribuição comunitária gratuita de materiais educativos (folhetos e mini e-book ilustrado sobre o Teste do Olhinho)**, **comunicação científica para combate à desinformação (fake news)** sobre saúde ocular pediátrica e **divulgação dos canais oficiais de triagem neonatal e oftalmologia do SUS**.
- Data: \`Goiânia - GO, 19 de setembro de 2025.\`

### TEXTO OFICIAL DA PÁGINA 2 (VERSO — MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO):
- Título: \`MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO\`
- Subtítulo: \`Verso Oficial do Certificado Nº 09 · Fé Pública Interinstitucional e Validação Curricular\`
- Quadro 1 (Dados do Profissional): Titular \`LUCAS GONÇALVES SILVEIRA\`, CPF \`702.794.941-57\`, Qualificação \`Médico\`, Origem \`Centro Universitário Alfredo Nasser (UNIFAN)\`.
- Quadro 2 (Enquadramento Curricular): \`Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias\` | \`Período: 11 a 13 de setembro de 2025 | Total: 12h\`.
- Quadro 3 (Matriz de Atividades Práticas — 12 Horas):
  - Eixo I (03h 00min): Curadoria Científica e Produção Editorial Pediátrica (Mini E-book do Teste do Olhinho).
  - Eixo II (03h 30min): Coleta de Dados Populacionais com Pais e Escolares via Enquete Digital Interativa.
  - Eixo III (03h 00min): Educação em Saúde Ocular e Combate a Fake News sobre Ambliopia, Leucocoria e Telas.
  - Eixo IV (02h 30min): Ação Comunitária e Divulgação dos Canais Oficiais do SUS, PSE e Caderneta da Criança.
- Quadro 4 (Registro Oficial de Fé Pública + QR Code no Verso):
  Livro de Extensão nº 01/2025, Folha 64 | Código: \`EMS-CDP-2025-0914\` | Chave: \`0914-6283-4910-7E9B\` | Hash SHA-256: \`9e4b7c12a8f03d65e1928b4c7a30f6d8e2c15b9a4d70f3e81c6a2b5d904e0914\`.

---

## 5. REQUISITO TÉCNICO CRÍTICO: PDF 100% VETORIAL ACESSÍVEL/EDITÁVEL + LINKS CLICÁVEIS DE AUTENTICAÇÃO
- **Proibido PDF Rasterizado (Imagem Achatada)**: O botão de download de PDF NÃO deve gerar uma foto/JPEG da tela. O arquivo \`.pdf\` (297mm × 210mm, 2 páginas A4 Paisagem) deve ser construído com primitivas vetoriais e texto nativo (\`jsPDF\` com \`pdf.text\`, \`pdf.rect\`, \`pdf.line\`), garantindo que 100% do texto seja **selecionável, pesquisável, acessível por leitores de tela e editável em softwares de PDF** sem perder a formatação milimétrica.
- **Links Clicáveis Ativos no PDF e no Site (\`pdf.link\` & \`<a href>\`)**:
  - Todas as menções ao endereço de verificação online (na Caixa de Autenticação Pública Manual da Frente, no rodapé da Frente e no Quadro 4 do Verso), bem como os **QR Codes da Frente e do Verso**, devem conter anotações de hiperlink clicáveis (\`pdf.link(x, y, w, h, { url: '.../?codigo=EMS-CDP-2025-0914#validador' })\`) para que o avaliador da banca possa clicar diretamente no PDF e abrir o autenticador oficial.
- **Modo Editável no Próprio Site**: Inclua uma barra de edição estruturada acima do certificado permitindo editar Nome, CPF, Datas, Código, Chave e URL Base sem desalinhar a moldura A4.`;
