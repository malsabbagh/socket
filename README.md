# Socket Demo
## Deploy
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/malsabbagh/socket-demo)

## Setup 
`npm install`
## Running
MacOS: `npm run dev`

Windows `npm run dev:win`

## Testing with Embedded Webex
- After running the project with nginx setup to use `https://demo.dummy-server.com` locally. 
- Create a new Embedded app integration here https://developer.webex.com/my-apps/new
- Use the following url as `Start page URL`: `https://demo.dummy-server.com/embedWebex.html`
- Admin approve the application to be used inside the org.
- Run the application in a `Meeting` space or `Messaging` space. 

- To test the bug in `Messaging` space please use the following URL `https://demo.dummy-server.com`


## Certificate 
Execute the following command to generate a new certificate on MacOS (didn't get the chance to test this on Windows but it should be similar) for `dummy-server.com`
```
openssl req \
-newkey rsa:2048 \
-x509 \
-nodes \
-keyout ./cert/dummy-server.com.key \
-new \
-out ./cert/dummy-server.com.crt \
-subj /CN=Hostname \
-reqexts SAN \
-extensions SAN \
-config <(cat /etc/ssl/openssl.cnf <(printf '[SAN]\nsubjectAltName=DNS:hostname,DNS:dummy-server.com,DNS:*.dummy-server.com')) \
-sha256 \
-days 3650
```

## Notes
- Always generate a new certificate for new development. 
- Make sure to add the generated certificate as a trusted certificate.
- Make sure you add `dummy-server.conf` to your `nginx.conf` and reference the proper trusted certificate
- Make sure to add `127.0.0.1   demo.dummy-server.com` to your /etc/hosts file


## Detailed setup 
### Install nginx 
  - MacOS: https://formulae.brew.sh/formula/nginx
  - Windows: https://nginx.org/en/download.html
### Include this [dummy-server.conf](./dummy-server.conf) in nginx configs
  - [How to do it](https://docs.nginx.com/nginx/admin-guide/basic-functionality/managing-configuration-files/#feature-specific-configuration-files) and/or [include](http://nginx.org/en/docs/ngx_core_module.html#include)
  - nginx.conf path:
    - MacOS: `/opt/homebrew/etc/nginx` or `/etc/nginx/conf.d`
    - Windows: `[nginxInstallationPath]/conf/nginx.conf`
  - Make sure the certificate is added as a trusted one.
    - `dummy-server.conf` has the certificate path, make sure the certificates are in a proper location. On Windows you might need to supply absolute path for it to work.
    - For example:
```
ssl_certificate      C:\\lib\\nginx\\conf\\servers\\cert\\dummy-server.com.crt;
ssl_certificate_key  C:\\lib\\nginx\\conf\\servers\\cert\\dummy-server.com.key;
```
### Update dns records for `demo.dummy-server.com` domain 
  - By adding  `127.0.0.1   demo.dummy-server.com` to your hosts file
    -  MacOS: `/etc/hosts`
    -  Windows: `c:\Windows\System32\Drivers\etc\hosts` or windows could be installed on another drive.
###  Make sure no nginx is running, if we do we need to stop all of them
  -  MacOS: `sudo nginx -s stop`
  - Windows: `nginx -s stop`
      -  Note on Windows you can use this command to check if we have anything running `tasklist /fi "imagename eq nginx.exe"`
### Start nginx again
  -  MacOS: `sudo nginx`
  -  Windows: `start nginx`
