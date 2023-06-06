import { config } from 'dotenv';
import { readdir, readFile } from 'fs/promises';
import http from 'http';
import path from 'path';
import { createLink } from './utils.js';
config()
const port = process.env.PORT || 3333;
const server = http.createServer(async (req, res) => {
  const directory = './files';

  if (req.url === '/') {
    try {
      const files = await readdir(directory);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

      files.forEach((file) => {
        res.write(createLink(file));
      });
      res.end();
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('Erro ao ler o diretório');
      res.end();
    }
  }else{
    console.log('Entered Else')
    let filePath = path.join(directory, req.url)
    console.log(filePath)
    try{
      const data = await readFile(filePath, 'utf8');
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(`<a href="/">Voltar</a><br><br>`);
      res.write(`<pre>${data}</pre>`);
      res.end();
    }catch (err) {
      console.log(err)
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.write("Erro ao ler o arquivo");
      res.end();
    }  
  }
});

server.listen(port);