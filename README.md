# 🎰 Lottery Front

Aplicação web frontend para interação com um contrato inteligente de loteria na blockchain Ethereum.

## 📋 Sobre o Projeto

Este projeto é uma interface de usuário moderna e responsiva desenvolvida em React + TypeScript que permite aos usuários interagirem com um contrato inteligente de loteria. Os usuários podem:

- 🎫 Entrar na loteria enviando Ether
- 👥 Visualizar a lista de participantes
- 🏆 Ver o último vencedor
- 🎲 Sortear um vencedor (apenas para o gerenciador do contrato)

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca para construção da interface
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS utilitário
- **Web3.js** - Biblioteca para interação com a blockchain Ethereum
- **TanStack Query** - Gerenciamento de estado assíncrono
- **Lucide React** - Ícones
- **Radix UI** - Componentes acessíveis
- **Class Variance Authority** - Gerenciamento de variantes de componentes

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **pnpm** (gerenciador de pacotes)
- **MetaMask** ou outra carteira Web3 instalada no navegador

Para instalar o pnpm, execute:
```bash
npm install -g pnpm
```

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório (se ainda não o fez)

```bash
git clone <url-do-repositorio>
cd lottery-front
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure sua carteira Web3

- Instale a extensão MetaMask no seu navegador
- Conecte-se à rede Ethereum desejada (mainnet, testnet, etc.)
- Certifique-se de ter Ether suficiente para participar da loteria

### 4. Inicie o servidor de desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📜 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Compila o projeto para produção
- `pnpm preview` - Visualiza a build de produção localmente
- `pnpm lint` - Executa o linter para verificar problemas no código

## 🏗️ Estrutura do Projeto

```
lottery-front/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── styles/         # Estilos globais
│   ├── lib/            # Utilitários e configurações
│   ├── types/          # Definições de tipos TypeScript
│   ├── utils/          # Funções utilitárias
│   ├── lottery.ts      # Configuração do contrato de loteria
│   ├── web3.ts         # Configuração do Web3
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Ponto de entrada da aplicação
├── public/             # Arquivos estáticos
├── index.html          # HTML principal
├── package.json        # Dependências e scripts
├── vite.config.ts      # Configuração do Vite
└── tsconfig.json       # Configuração do TypeScript
```

## 🔗 Contrato Inteligente

O contrato de loteria está implantado no endereço:
```
0xeA5eFF33dCe8d8AF84cC25BcB596CCB350F91CC5
```

### Funções do Contrato

- **enter()** - Permite que um usuário entre na loteria enviando Ether
- **getPlayers()** - Retorna a lista de endereços dos participantes
- **lastWinner()** - Retorna o endereço do último vencedor
- **manager()** - Retorna o endereço do gerenciador do contrato
- **pickWinner()** - Sorteia um vencedor aleatoriamente (apenas o gerenciador pode executar)

## 🎨 Funcionalidades

### Para Participantes
1. Conecte sua carteira Web3
2. Insira o valor em Ether que deseja apostar
3. Clique em "Entrar na Loteria"
4. Confirme a transação na sua carteira
5. Aguarde o sorteio do vencedor

### Para o Gerenciador
- Além de participar, o gerenciador pode executar a função de sortear o vencedor
- O vencedor recebe todo o saldo acumulado no contrato

## 🔒 Segurança

- Todas as transações são executadas através da carteira Web3 do usuário
- O código do contrato inteligente é imutável e verificável na blockchain
- Nunca compartilhe suas chaves privadas ou seed phrases

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do repositório.

---

Desenvolvido com ❤️ usando React e Web3
