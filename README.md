# SimulaCred MVP

## Contexto do Problema
O SimulaCred ataca um desafio comum em operacoes financeiras: transformar trafego em leads qualificados para emprestimos com alta velocidade comercial. Este MVP entrega uma jornada de simulacao orientada a conversao para o cliente final e uma visao executiva para o gestor.

## Stack Tecnologica
- React
- TypeScript
- TailwindCSS
- Lucide-React
- Recharts
- Vite

## Como Executar Localmente
1. Instale dependencias:
   ```bash
   npm install
   ```
2. Rode o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse:
   `http://localhost:5173`

## Visoes do Produto
- **Visao do Cliente:** Landing page com simulador de emprestimo, captura de lead e CTA via WhatsApp.
- **Visao do Gestor:** Dashboard B2B com metricas, graficos e tabela de ultimos leads.

## Visao de Arquitetura Cloud (AWS/OCI)
Este front-end foi estruturado como MVP de captacao escalavel, preparado para integracao com backend orientado a APIs. Em evolucao full stack, a arquitetura pode operar em AWS ou OCI com:
- API Gateway + servicos de aplicacao (containers/serverless)
- persistencia de leads e trilha de eventos para BI/CRM
- filas para automacoes comerciais (WhatsApp/Email)
- observabilidade e tracing para monitoramento de funil

Essa base permite crescimento gradual do produto mantendo modularidade, tipagem forte e rapidez de iteracao.
