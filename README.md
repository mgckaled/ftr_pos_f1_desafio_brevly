<!-- markdownlint-disable MD024 -->

# Avaliação Prática: Fase 1 - Brev.ly

## Descrição do desafio

Vamos desenvolver uma aplicação FullStack de encurtador de URL: o **Brev.ly**!

O objetivo é criar uma aplicação que permita o cadastro, listagem e remoção de links encurtados, geração de relatório dos acessos de cada link e também o redirecionamento correto do link encurtado para o link original

## Descrições e Requisitos - Back-end

Nesse projeto back-end, será desenvolvido uma API para gerenciar o encurtamento de URL’s.

### Funcionalidades e Regras

> [!WARNING]
> Para esse desafio é esperado que você utilize o banco de dados Postgres.

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com URL encurtada mal formatada
  - [x] Não deve ser possível criar um link com URL encurtada já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio de uma URL encurtada
- [x] Deve ser possível listar todas as URL’s cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível exportar os links criados em um CSV
  - [x] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
  - [x] Deve ser gerado um nome aleatório e único para o arquivo
  - [x] Deve ser possível realizar a listagem de forma performática
  - [x] O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.

> [!TIP]
> Dica: Copie os checkbox acima para o README do seu projeto.
>
> Assim irá poder ir marcando na medida que implementar as funcionalidades.

Veja que não especificamos se nas funcionalidades de deletar ou incrementar acessos, deve ser utilizado um campo `id` ou URL encurtada para realizar tais operações. Essa é uma decisão que cabe a você, desenvolvedor, escolher. Não há certo ou errado aqui, mas o recomendado é manter um padrão, se escolher `id`, que seja em ambas. Consistência e padrão são importantes.

> [!IMPORTANT]
> Lembrando que essa escolha irá impactar também no front-end.

### Ferramentas

É obrigatório o uso de:

- TypeScript
- Fastify
- Drizzle
- Postgres

### Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias.

```env
PORT=
DATABASE_URL=

CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

### Scripts

Crie um script com a exata chave `db:migrate` responsável por executar as migrations do banco de dados.

### Docker

Para esse projeto back-end você deve construir um `Dockerfile`, seguindo as boas práticas, que deve ser responsável por gerar a imagem da aplicação.

> [!TIP]
> Não se esqueça de habilitar o CORS na aplicação.
>
> Em caso de dúvidas, utilize o espaço da comunidade e do nosso fórum para interagir com outros alunos/instrutores e encontrar uma solução que funcione para você.

## Descrição e Requisitos - Front-end

Nesse projeto front-end será desenvolvido uma aplicação React que, em conjunto com a API, permite o gerenciamento de URL’s encurtadas.

### Funcionalidades e Regras

Assim como na API, temos as seguintes funcionalidades e regras:

- [ ] Deve ser possível criar um link
  - [ ] Não deve ser possível criar um link com encurtamento mal formatado
  - [ ] Não deve ser possível criar um link com encurtamento já existente
- [ ] Deve ser possível deletar um link
- [ ] Deve ser possível obter a URL original por meio do encurtamento
- [ ] Deve ser possível listar todas as URL’s cadastradas
- [ ] Deve ser possível incrementar a quantidade de acessos de um link
- [ ] Deve ser possível baixar um CSV com o relatório dos links criados

Além disso, também temos algumas regras importantes específicas para o front-end:

- [ ] É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`;
- [ ] Siga o mais fielmente possível o layout do Figma;
- [ ] Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação);
- [ ] Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares.

> [!TIP]
> Dica: Copie os checkbox acima para o README do seu projeto.
>
> Assim irá poder ir marcando na medida que implementar as funcionalidades.

### Páginas

Essa aplicação possui 3 páginas:

- A página raiz (`/`) que exibe o formulário de cadastro e a listagem dos links cadastrados;
- A página de redirecionamento (`/:url-encurtada`) que busca o valor dinâmico da URL e faz a pesquisa na API por aquela URL encurtada;
- A página de recurso não encontrado (qualquer página que não seguir o padrão acima) que é exibida caso o usuário digite o endereço errado ou a url encurtada informada não exista.

### Ferramentas

É obrigatório o uso de:

- Typescript
- React
- Vite sem framework

É flexível o uso de:

- TailwindCSS
- React Query
- React Hook Form
- Zod

### Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias:

```env
VITE_FRONTEND_URL=
VITE_BACKEND_URL=
```

> [!TIP]
> Comece o projeto pela aba `Style Guide` no Figma. Dessa forma, você prepara todo o seu tema, fontes e componentes e quando for criar as páginas vai ser bem mais tranquilo;
>
> Trabalhe com o desenvolvimento `mobile first`, principalmente se estiver utilizando ferramentas que se favorecem disso como Tailwind;
>
> Assim com a experiência do usuário é importante (UX), a sua experiência no desenvolvimento (DX) também é muito importante. Por isso, apesar de ser possível criar essa aplicação sem nenhuma biblioteca, recomendamos utilizar algumas bibliotecas que vão facilitar tanto o desenvolvimento inicial quanto a manutenção do código;
>
> Em caso de dúvidas, utilize o espaço da comunidade e do nosso fórum para interagir com outros alunos/instrutores e encontrar uma solução que funcione para você.

### Quer ir além?

Se você quer se desafiar e explorar conceitos além do que foram propostos no desafio, temos algumas ideias em mente para te inspirar:

> [!WARNING]
> A correção do seu desafio é apenas levando em conta as regras e funcionalidades obrigatórias mencionadas nas etapas anteriores. Portanto, envie o seu código para correção antes de implementar novas funcionalidades (ou crie uma nova `branch` com o seu código alterado)

- SPA → SSR: Em vez de criar sua aplicação utilizando o Vite, que tal explorar o poder da renderização do lado do servidor e utilizar o SSR? Você pode tanto trabalhar com o Next.js quanto simplesmente utilizar o React Router como um framework (Remix) em vez de um simples router.
- Metadados: Esse tipo de aplicação se favorece muito de alguns metadados, e um bem interessante que não exploramos foram os relacionados ao protocolo OpenGraph. Seria interessante que no formulário de cadastro, também fossem informados dados como descrição do link e imagem de preview que pudessem ser utilizadas nesses metadados.
- Upload de imagem: Utilizando o ponto anterior como base, o upload de imagens para o protocolo OpenGraph pode ser bem interessante.
- Interface otimista: Um ponto que pode trazer uma boa experiência nesse tipo de aplicação é trabalhar com interface otimista. Já exibir o link na interface como se tivesse ocorrido com sucesso o cadastro na API e, caso dê algum erro, fazer o `rollback`.
