const { Client, ConnectConfig } = require('ssh2');
const fs = require('fs');
const { SftpClient } = require('ssh2-sftp-client');

const conn = new Client();
const sftp = new SftpClient();

const config = {
  host: '54.87.47.202',
  port: 22,
  username: 'ec2-user',
  privateKey: fs.readFileSync('../../blog.pem')
};

const localFilePath = '/ruta/local/archivo.txt';
const remoteFilePath = '/home/ec2-user/home/nodejs_blogs';

conn.on('ready', () => {
  console.log('Conexión SSH establecida.');

  sftp.connect(config).then(() => {
    console.log('Conexión SFTP establecida.');

    // Subir archivo local al servidor remoto
    sftp.fastPut(localFilePath, remoteFilePath).then(() => {
      console.log('Archivo transferido correctamente.');
      conn.end();
    }).catch((err) => {
      console.error('Error al transferir archivo:', err);
      conn.end();
    });
  }).catch((err) => {
    console.error('Error al conectar mediante SFTP:', err);
    conn.end();
  });
});

conn.on('error', (err) => {
  console.error('Error al conectar mediante SSH:', err.message);
});

conn.connect(config);
