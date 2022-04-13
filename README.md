# Socket Demo
## Setup 
`npm install`
## Running
`npm run start`

## Certificate 
Execute the following command to generate a new certificate for `dummy-server.com`
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