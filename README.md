# PwaAngular

Construção de PWA com Angular, simulando o cadastramento de seguros de carros.
A aplicação utiliza estrategia sincronização para armazenar os dados salvos quando a aplicação está offline e realizar o envio dos itns quando houver conexão.
O banco de dados local offline utilizao é o Indexed.db

A aplicação utiliza:
* Angular
* Node.js
* Semantic-ui
* Dexie.js

```
Para executar a aplicação:
Entre na pasta server e rode o comando: node index.js
Para rodar a aplicacao como PWA:
	ng build --prod
	Acesse a pasta dist/nomeProjeto e use o comando: npx serve
Para rodar a aplicacao normal:
  ng serve (neste caso o server worker nao funciona)
```
