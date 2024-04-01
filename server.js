const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Lógica do servidor
    if (req.url === '/' || req.url === '/index.html') {
        // Lógica para servir a página inicial
        serveFile('index.html', 'text/html', res);
    } else if (req.url === '/style.css') {
        // Lógica para servir o arquivo CSS
        serveFile('style.css', 'text/css', res);
    } 
    
    // Lógica para servir arquivos de imagem para cada pasta
    else if (req.url.startsWith('/Logo/')) {
        const imagePath = path.join(__dirname, req.url);
        serveFile(imagePath, getImageContentType(imagePath), res);
    } else if (req.url.startsWith('/Produtos/')) {
        const imagePath = path.join(__dirname, req.url);
        serveFile(imagePath, getImageContentType(imagePath), res); 
    } else if (req.url.startsWith('/Avatares/')) {
        const imagePath = path.join(__dirname, req.url);
        serveFile(imagePath, getImageContentType(imagePath), res);
    }
    
    else {
        // Lógica para lidar com rotas não encontradas
        res.writeHead(404);
        res.end('Página não encontrada');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Função para servir um arquivo
function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Erro interno do servidor');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// Função para determinar o tipo de conteúdo da imagem
function getImageContentType(imagePath) {
    const extname = path.extname(imagePath).toLowerCase();
    switch (extname) {
        case '.png':
            return 'image/png';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.svg':
            return 'image/svg+xml';
        default:
            return 'application/octet-stream';
    }
}
