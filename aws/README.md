Essa pasta serve apenas para criar e configurar a função lambda que deve ser importada na AWS.
Por isso está fora da pasta `src/` e possui seu próprio `package.json` e `node_modules/`.

---

A função em si é o arquivo `lambda/index.ts`
Ao terminar de configurar/alterar a função, rodar o script `build` do package.json
O script vai buildar

```bash
pnpm build
```
