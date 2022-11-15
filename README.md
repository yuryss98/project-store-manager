# Boas vindas ao repositório do projeto store-manager!

---

## Esse foi o primeiro projeto em que juntei tudo que vinha aprendendo ultimamente (Docker, Node, Mysql, Arquitetura de software de camadas MSC):

O objetivo era desenvolver uma API utilizando a arquitetura MSC (model-service-controller)!

A API construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Utilizei o banco de dados MySQL para a gestão de dados. Além disso, a API foi contruida no padrão RESTful.


## 🛠 Tecnologias usadas:

* JavaScript;
* Docker;
* Express;
* Node;
* Mysql;

## Execute localmente:
  
Clone o projeto

-- git clone git@github.com:yuryss98/project-store-manager.git

Va para o diretorio do projeto

-- cd project-store-manager

Use os comandos:

-- docker-compose up -d (é preciso ter o docker instalado na maquina);
-- docker exec -it store_manager bash (isso te dará acesso ao terminal do container)
-- depois use o npm install (para instalar as dependencias);

Inicie a aplicação com:

-- npm start ou npm run debug

Execute os testes da aplicação com:

-- npm test
