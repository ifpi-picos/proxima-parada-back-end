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


### Documentação simples
Documentação simples para facilitar o desenvolvimento do fornt end.

| Method   | URL                          | Descrição                                | Entrada | Saida |
| -------- | ---------------------------- | ---------------------------------------- | ------- | ----- |
| `POST`   | `/api/users`                 | Cadastra novo usuário.                   | {
	"name":"Teste Teste",
	"email":"teste@teste.com",
	"password":"123456",
	"samePasswords": "123456",
	"occupation":"Aluno"
} | {
	"id": "67ab6914-fdd5-49f3-aa60-d32886ce0d1a",
	"name": "Teste Teste",
	"email": "teste@teste.com",
	"phone_number": null,
	"occupation": "Aluno",
	"avatar": null,
	"status": false,
	"created_at": "2022-11-01T13:50:16.306Z",
	"updated_at": "2022-11-01T13:50:16.306Z"
} |
| `PUT`    | `/api/users`                 | Atualiza informações de usuário.         | {
	"name":"Teste 2 Teste",
	"phone_number":"(00) 0 0000-0000",
	"occupation":"Aluno"
} | {
	"id": "67ab6914-fdd5-49f3-aa60-d32886ce0d1a",
	"name": "Teste 2 Teste",
	"email": "teste@teste.com",
	"phone_number": "(00) 0 0000-0000",
	"occupation": "Aluno",
	"avatar": null,
	"status": false,
	"created_at": "2022-11-01T13:50:16.306Z",
	"updated_at": "2022-11-01T13:50:16.306Z"
} |
| `GET`    | `/api/users`                 | Recupera informações de usuário.         |  NONE   | {
	"id": "67ab6914-fdd5-49f3-aa60-d32886ce0d1a",
	"name": "Teste Teste",
	"email": "teste@teste.com",
	"phone_number": null,
	"occupation": "Aluno",
	"avatar": null,
	"status": false,
	"created_at": "2022-11-01T13:50:16.306Z",
	"updated_at": "2022-11-01T13:50:16.306Z"
} |
| `GET`    | `/api/adminUsers`            | Recupera todos os usuários cadastrados.  |  NONE   | [
	{
		"id": "e8458b0b-2b9a-43fd-ae8f-a43f5c5ec610",
		"name": "Rafhael Gaspar",
		"email": "rafhael11@teste.com",
		"phone_number": "(34) 5 3453-4534",
		"occupation": "Aluno(a)",
		"avatar": null,
		"status": false,
		"created_at": "2022-10-31T15:54:34.251Z",
		"updated_at": "2022-10-31T15:54:34.251Z"
	},
	{
		"id": "1fe42d97-f671-4b85-8b19-5c0653b34ac2",
		"name": "joao campelo",
		"email": "Joao@gmail.com",
		"phone_number": null,
		"occupation": "Professor(a)",
		"avatar": null,
		"status": false,
		"created_at": "2022-10-31T20:40:35.731Z",
		"updated_at": "2022-10-31T20:40:35.731Z"
	},
	{
		"id": "67ab6914-fdd5-49f3-aa60-d32886ce0d1a",
		"name": "Teste Teste",
		"email": "teste@teste.com",
		"phone_number": null,
		"occupation": "Aluno",
		"avatar": null,
		"status": false,
		"created_at": "2022-11-01T13:50:16.306Z",
		"updated_at": "2022-11-01T13:50:16.306Z"
	}
] |
| `POST`   | `/api/sessions`              | Inicia uma nova seção (login).           | {
	"email":"teste@teste.com",
	"password":"123456"
} | {
	"userReturn": {
		"id": "67ab6914-fdd5-49f3-aa60-d32886ce0d1a",
		"name": "Teste Teste",
		"email": "teste@teste.com",
		"phone_number": null,
		"occupation": "Aluno",
		"avatar": null,
		"status": false,
		"created_at": "2022-11-01T13:50:16.306Z",
		"updated_at": "2022-11-01T13:50:16.306Z"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2FiNjkxNC1mZGQ1LTQ5ZjMtYWE2MC1kMzI4ODZjZTBkMWEiLCJpYXQiOjE2NjczMTA2MzgsImV4cCI6MTY2NzM5NzAzOH0.mppKenR4-v5mo02R0IU-vry7gjcZQ2mll0TRLrb_c6E"
} |
| `POST`   | `/api/adminUsers`            | Cadastra um novo admin no sistema.       | {
	"name":"Teste Admin",
	"email":"teste@teste.com",
	"password":"123456",
	"samePasswords": "123456"
} |       |

