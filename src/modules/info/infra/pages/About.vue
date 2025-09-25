<script setup lang="ts"></script>

<template>
    <div
        class="mx-auto max-w-5xl gap-8 px-5 py-8 text-justify indent-4 sm:px-10 md:px-15 lg:px-20 xl:px-25"
    >
        <h1
            class="mb-8 hidden text-center text-2xl font-semibold tracking-tight text-gray-900 lg:block dark:text-gray-100"
        >
            Sobre nós
        </h1>
        <section class="my-4 grid gap-5">
            <h2
                class="text-center text-lg font-semibold text-gray-900 lg:text-2xl dark:text-gray-100"
            >
                A nossa história
            </h2>
            <Transition
                appear
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
            >
                <div
                    class="overflow-hidden rounded-2xl ring-1 ring-gray-200 ring-inset dark:ring-zinc-800"
                >
                    <div
                        class="h-48 w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-zinc-900 dark:to-zinc-800"
                    ></div>
                </div>
            </Transition>
            <Transition
                appear
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
            >
                <div class="text-justify text-gray-800 lg:text-lg dark:text-gray-200">
                    <p>
                        Em 2025, um grupo de estudantes do curso técnico de Informática para
                        Internet do Instituto Federal Catarinense (IFC) participou do Hackathon, uma
                        maratona anual de inovação destinada a todas as turmas do 2º ano. O tema
                        proposto para o evento foi “Desafios sociais do cotidiano” e, entre várias
                        possibilidades, nosso grupo decidiu focar em um problema que afeta
                        diretamente a vida de muitas pessoas em nossa região: os alagamentos.
                    </p>
                    <p>
                        Cada grupo teve três meses para tirar a ideia do papel, passando pelo
                        planejamento até a entrega do protótipo final. Diante desse desafio,
                        escolhemos desenvolver o AQUA, uma plataforma voltada a informar, alertar e
                        auxiliar a população em situações de alagamento.
                    </p>
                    <p>
                        Para fortalecer nosso projeto, contamos com o apoio e a orientação da Defesa
                        Civil de Joinville, que nos ajudou a compreender melhor o tema e nos
                        forneceu dados importantes, os quais serviram de base para o desenvolvimento
                        da plataforma.
                    </p>
                </div>
            </Transition>
        </section>

        <section class="my-4 grid gap-5">
            <h2
                class="text-center text-lg font-semibold text-gray-900 lg:text-2xl dark:text-gray-100"
            >
                Nossos objetivos
            </h2>
            <Transition
                appear
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
            >
                <div
                    class="overflow-hidden rounded-2xl ring-1 ring-gray-200 ring-inset dark:ring-zinc-800"
                >
                    <img
                        src="/public/about/27cdc945-b5f5-4404-be59-15c95e7c601e.jpg"
                        alt="Objetivos"
                        class="mx-auto w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </Transition>
            <p class="text-justify text-gray-800 lg:text-lg dark:text-gray-200">
                O sistema tem como objetivo principal oferecer uma plataforma web integrada para o
                monitoramento em tempo real de alagamentos e eventos hidrológicos extremos em
                Joinville, apoiando a tomada de decisões preventivas e estratégicas. Para isso,
                busca:
            </p>
            <ul class="mx-5 list-disc text-justify text-gray-800 lg:text-lg dark:text-gray-200">
                <li class="my-2">
                    <p>
                        Monitorar em tempo real áreas críticas da cidade, utilizando câmeras
                        públicas estrategicamente posicionadas e técnicas de visão computacional
                        para detectar ocorrências de alagamentos;
                    </p>
                </li>
                <li class="my-2">
                    <p>
                        Analisar imagens e dados históricos de eventos passados, permitindo a
                        identificação de padrões recorrentes e a atualização contínua da base de
                        dados, aprimorando a capacidade preditiva da plataforma;
                    </p>
                </li>
                <li class="my-2">
                    <p>
                        Integrar múltiplas fontes de dados meteorológicos, hidrológicos e
                        topográficos, como precipitação, temperatura, umidade, pressão atmosférica,
                        nível dos rios e elevação do terreno, fornecendo uma visão completa e
                        contextualizada do cenário urbano;
                    </p>
                </li>
                <li class="my-2">
                    <p>
                        Disponibilizar um mapa interativo, no qual usuários possam visualizar áreas
                        em risco em tempo real, além de cadastrar pontos de alagamento em
                        localizações específicas e períodos determinados, possibilitando análises
                        espaciais e temporais detalhadas;
                    </p>
                </li>
                <li class="my-2">
                    Emitir alertas de risco à população e aos órgãos públicos, por meio da atuação
                    de administradores responsáveis pelo gerenciamento do sistema, aumentando a
                    agilidade da resposta a situações emergenciais;
                </li>
                <li class="my-2">
                    Apoiar o planejamento urbano e a mitigação de riscos, oferecendo uma ferramenta
                    robusta para análise preditiva e para a elaboração de estratégias de prevenção e
                    resposta a eventos hidrológicos extremos;
                </li>
                <li class="my-2">
                    Garantir alinhamento institucional e técnico, com a participação ativa da Defesa
                    Civil na definição de critérios de risco, validação de prioridades e integração
                    com o Plano de Contingência de Proteção e Defesa Civil (Plancon).
                </li>
            </ul>
        </section>
    </div>
</template>
