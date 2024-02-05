Essa pasta serve apenas para criar e configurar a função lambda que deve ser importada na AWS.
Por isso está fora da pasta `src/` e possui seu próprio `package.json` e `node_modules/`.

A função em si é o arquivo `lambda/index.ts`, e ao terminar de configurar/alterar a função,
deve-se rodar o script de build que está no package.json, que vai criar um arquivo .zip
contendo o arquivo .ts transpilado para .js e a pasta node_modules
