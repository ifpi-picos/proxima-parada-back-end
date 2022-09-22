# Próxima Parada
Repositório referente a disciplina de projeto integrador II, o qual tem como objetivo final o desenvolvimento de um sistema que facilite o compartilhamento de caronas.

# Nodemon
O [nodemon](https://nodemon.io/) é uma biblioteca de código aberto que ajuda bastante no processo de desenvolvimento. A função dele é monitorar alterações no código, e apartir do momento que você salva essas mudanças, o nodemon reinicia o servidor automaticamente.

Para instalar o nodemon, é necessário ter o Node.js e em seguida executar o seguinte comando no terminal:

```html
npm install -g nodemon
```

Ou

```html
npm install -D nodemon
```



Para resolver o problema do prisma adicione isso no arquivo .env
```html
PRISMA_CLIENT_ENGINE_TYPE="binary"
PRISMA_CLI_QUERY_ENGINE_TYPE="binary"
```