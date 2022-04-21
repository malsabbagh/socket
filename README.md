# Socket Demo
## Setup 
`npm install`
## Running
MacOS: `npm run start`

Windows `npm run start:win`

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

