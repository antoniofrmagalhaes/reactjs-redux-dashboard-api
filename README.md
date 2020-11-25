



<h3 align="center">
  ReactJS Redux Dashboard API
</h3>

<h1 align="center">
    <img alt="nodejs" src="https://user-images.githubusercontent.com/49319968/100260563-f1135600-2f1f-11eb-94f6-647482c1559d.png" width="75" />
    <img alt="typescript" src="https://user-images.githubusercontent.com/49319968/98042676-56c96200-1dfa-11eb-9302-9c9f53df5610.png" width="75" />
    <img alt="mongo" src="https://user-images.githubusercontent.com/49319968/100261073-9d553c80-2f20-11eb-8f49-9ede216fc961.png" width="75" />
</h1>

<p>Codigo fonte do backend da aplicação <a href="https://github.com/antoniofrmagalhaes/reactjs-redux-dashboard" target="_blank" ref="noreferrer">reactjs-redux-dashboard</a></p>

## Banco de dados

Esta aplicação utiliza MongoDB

Certifique-se de que tenha uma instância do banco MongoDB rodando na porta 27017 sem usuário e senha.

### Docker

Caso não tenha a instância do banco MongoDB rodando na maquina e possua o docker instalado, apenas execute o comando:

Linux:
```sh
sudo docker run --name mongo -p 27017:27017 -d -t mongo
```

Windows:
https://docs.docker.com/docker-for-windows/install/


## Instalação

Clone este repositório
```sh
git clone git@github.com:antoniofrmagalhaes/reactjs-redux-dashboard-api.git
```
Navegue para a pasta recem criada.
```sh
cd reactjs-redux-dashboard-api
```
Execute o comando `yarn` ou `npm install` para instalar as dependências.

Depois execute  `yarn dev` ou `npm run dev` para iniciar a aplicação em modo desenvolvimento.

## License

This project is under MIT license. See the file [LICENSE](LICENSE.md) for more details.
