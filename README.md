# Socket Demo
## Setup 
`npm install`
## Running
MacOS: `npm run start`

Windows `npm run start:win`

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
- Make sure to add `127.0.0.1   demo.dummy-server.conf` to your /etc/hosts file
