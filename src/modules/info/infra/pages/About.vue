<script setup lang="ts"></script>

<template>
  <div class="grid gap-8 px-5 indent-4 text-justify sm:px-10 md:px-15 lg:px-20 xl:px-25">
    <h1 class="mb-10 hidden text-center text-2xl font-semibold lg:block">Sobre nós</h1>
    <section class="my-4 grid gap-5">
      <h2 class="text-center font-semibold lg:text-2xl">A nossa história</h2>
      <img src="" alt="História" class="w-full mx-auto rounded-2xl bg-[#D9D9D9] object-cover lg:w-[40%]" />
      <p class="text-justify">
        Em 2025, um grupo de estudantes do curso técnico em Informática do Instituto Federal Catarinense - IFC
        participou do Hackathon, uma maratona anual de inovação para todas as turmas do 2º ano. O tema proposto para o
        evento foi desafios sociais do cotidiano, e, entre várias possibilidades, nosso grupo decidiu focar em um
        problema que afeta diretamente a vida de muitas pessoas em nossa região: os alagamentos. Cada grupo tem três
        meses para tirar a ideia do papel, passando desde o planejamento até a entrega do protótipo final. Diante dessas
        condições, escolhemos desenvolver o AQUA, uma plataforma voltada para informar, alertar e auxiliar a população
        em situações de alagamento. Para fortalecer nosso projeto, contamos com o apoio e a orientação da Defesa Civil
        de Joinville, que nos ajudou a compreender melhor o assunto e nos forneceu dados importantes que serviram de
        base para o desenvolvimento da plataforma.
      </p>
    </section>

    <section class="my-4 grid gap-5">
      <h2 class="text-center font-semibold lg:text-2xl">Nossos objetivos</h2>
      <img src="/public/about/27cdc945-b5f5-4404-be59-15c95e7c601e.jpg" alt="Objetivos"
        class="w-full mx-auto rounded-2xl bg-[#D9D9D9] object-cover lg:w-[40%]" />
      <p>O sistema tem como objetivo principal oferecer uma plataforma web integrada para o monitoramento em tempo real
        de alagamentos e eventos hidrológicos extremos em Joinville, apoiando a tomada de decisões preventivas e
        estratégicas. Para isso, busca:</p>
      <ul class="text-justify list-disc mx-5">
        <li class="my-2">
          <p>Monitorar em tempo real áreas críticas da cidade, utilizando câmeras públicas estrategicamente posicionadas
            e técnicas de visão computacional para detectar ocorrências de alagamentos;</p>
        </li>
        <li class="my-2">
          <p>Analisar imagens e dados históricos de eventos passados, permitindo a identificação de padrões recorrentes
            e a atualização contínua da base de dados, aprimorando a capacidade preditiva da plataforma;</p>
        </li>
        <li class="my-2">
          <p>Integrar múltiplas fontes de dados meteorológicos, hidrológicos e topográficos, como precipitação,
            temperatura, umidade, pressão atmosférica, nível dos rios e elevação do terreno, fornecendo uma visão
            completa e contextualizada do cenário urbano;</p>
        </li>
        <li class="my-2">
          <p>Disponibilizar um mapa interativo, no qual usuários possam visualizar áreas em risco em tempo real, além de
            cadastrar pontos de alagamento em localizações específicas e períodos determinados, possibilitando análises
            espaciais e temporais detalhadas;</p>
        </li>
        <li class="my-2">Emitir alertas de risco à população e aos órgãos públicos, por meio da atuação de
          administradores responsáveis pelo gerenciamento do sistema, aumentando a agilidade da resposta a situações
          emergenciais;</li>
        <li class="my-2">Apoiar o planejamento urbano e a mitigação de riscos, oferecendo uma ferramenta robusta para
          análise preditiva e para a elaboração de estratégias de prevenção e resposta a eventos hidrológicos extremos;
        </li>
        <li class="my-2">Garantir alinhamento institucional e técnico, com a participação ativa da Defesa Civil na
          definição de critérios de risco, validação de prioridades e integração com o Plano de Contingência de Proteção
          e Defesa Civil (Plancon).</li>
      </ul>
    </section>
  </div>
</template>
