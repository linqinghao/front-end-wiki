## Nginx

1. 反向代理

```bash
server {
    listen 5000;
    server_name 127.0.0.1;

    location / {
        proxy_pass http://127.0.0.1:[port];
    }
    
}
```

2. 静态文件转发

```bash
location /static/ {
  alias [your-static-dir];
}
```

3. socket 配置

```bash
location ~ ^/(socket.io) {
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection"upgrade";
  proxy_set_header Host $http_host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_pass http://127.0.0.1:[port];
  if ($remote_addr ~"127.0.0.1") {
      access_log on;
  }
}
```

###  Q&A

1. nginx的location、root、alias指令用法和区别?

## [SSH](/guide/server/ssh.md)



## [常用Linux命令](/guide/server/in-common-use-linux-command.md)

1. cd/mv/mkdir/rm/touch 文件操作命令
2. chmod 权限命令
3. 查找命令
4. cat/more/less/tail 查看文件命令
