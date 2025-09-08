# 👮‍♀️ Pessoas Desaparecidas - SPA (React + TypeScript + Tailwind)

![Badge](https://img.shields.io/badge/Status-Desenvolvimento%20Concluído-green) ![License](https://img.shields.io/badge/License-MIT-blue)

Aplicação front-end desenvolvida como parte de avaliação técnica do processso para a vaga de Desenvolvedor, realizado pela Desenvolve MT. Consome a **API pública da Polícia Judiciária Civil de Mato Grosso** para consulta de pessoas desaparecidas e localizadas.

#### 🔗 Link para visualização do projeto: https://desaparecido.netlify.app/

---

## 🚀 Tecnologias utilizadas

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) - Framework principal para desenvolvimento da aplicação.
- [React Router DOM](https://reactrouter.com/) - Para carregamento eficiente das páginas.
- [Axios](https://axios-http.com/) - Para requisições HTTP
- [Tailwind CSS v4](https://tailwindcss.com/) - Para estilização responsiva e moderna.
- [Vite](https://vitejs.dev/) - Para build e dev server
- [Docker](https://www.docker.com/) - Para empacotamento da aplicação em um container isolado.

---

## 📌 Funcionalidades

### 1️⃣ Tela Inicial
- 📌 Exibe uma lista de pessoas desaparecidas ou localizadas em forma de cards.
- 📷 Cada card contém a imagem e informações básicas sobre o caso.
- 🔄 Implementação de paginação para exibir pelo menos 10 registros por vez.
- 🔍 Barra de pesquisa para filtrar os resultados com base nos parâmetros da API.

### 2️⃣ Tela de Detalhamento
- 🔗 Ao clicar no botão de mais detalhes em um card, o usuário é redirecionado para a tela de detalhes do desaparecido.
- 📝 Exibe informações adicionais sobre a pessoa.
- 🎨 Destaque visual para a situação do desaparecido (desaparecido/localizado).

### 3️⃣ Tela de Inclusão de Informações
- 📨 Permite ao cidadão enviar informações sobre uma pessoa desaparecida.
- 🔢 Implementação de máscaras de formatação para entrada de dados.
- 🖼 Upload de fotografias.

---
## 🛠 Instalação e Execução

### ⚡ Pré-requisitos
Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)

### 🔧 Rodando o projeto localmente

1️⃣ Clone o repositório:
```bash
git clone https://github.com/karinewagner/desaparecidos.git
```
2️⃣ Acesse o diretório do projeto:
```bash
cd desaparecidos
```
3️⃣ Instale as dependências:
```bash
npm install
```
4️⃣ Rode em ambiente de desenvolvimento:
```bash
npm run dev
```
5️⃣ Acesse no navegador:

http://localhost:5173/


### 🐳 Rodando com Docker
1️⃣ Construa a imagem Docker:
```bash
docker build -t karine-desaparecidos .
```

2️⃣ Execute o container:
```bash
docker run -p 8080:80 karine-desaparecidos
```

3️⃣ Acesse no navegador:

http://localhost:8080/


### 🐳 Rodando a imagem do DockerHub
Puxe a imagem diretamente do DockerHub e execute.

1️⃣ Puxe a imagem do DockerHub:
   ```bash
   docker pull karinewagner/projeto-desaparecidos-2025
   ```
2️⃣ Rode o container:
   ```bash
   docker run -p 8080:80 karinewagner/projeto-desaparecidos-2025
   ```
3️⃣ Acesse no navegador: 

http://localhost:8080

> **Nota**: Certifique-se de que o Docker está instalado e rodando em sua máquina para as opções 2 e 3.

---
## 🔗 API utilizada

Documentação dos endpoints:  
[https://abitus-api.geia.vip/swagger-ui/index.html](https://abitus-api.geia.vip/swagger-ui/index.html)

### Endpoints principais
- `GET /v1/pessoas/aberto/filtro` → busca de registros
- `GET /v1/pessoas/{id}` → detalhes de pessoa
- `POST /v1/ocorrencias/informacoes-desaparecido` → envio de informações adicionais
- `GET /v1/pessoas/aberto/estatistico` → estatísticas de desaparecidos/localizados

---
## **📬 Contato**

Para dúvidas ou sugestões, entre em contato pelo e-mail: [karinedwagner@gmail.com](mailto:karinedwagner@gmail.com)

---
## **📜 Licença**
Este projeto é de uso livre para estudo e melhorias.
