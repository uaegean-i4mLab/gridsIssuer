# GRIDS-VC-ISSUER

---

The "GRIDSD-VC-ISSUER" is a Verifiable Credential (VC) Issuer developed during the course of the [GRIDS project](https://www.grids-cef.eu/).
It enables natural persons to combine their legal person identity with their state issued eIDAS-eID to faciliate and the issuance of Verifiable Credentials (VCs) that can be used for
KYC Checks for other Business Sectors, KYC Data for LEI Checks, Onboarding of Business Accounts by Banks / Financial Institutions

 

# Code

---

*Disclaimer: Although we tested the code extensively, the "GRIDS-VC-ISSUER" is a research
prototype that may contain bugs. We take no responsibility for and give no warranties in respect of using the code.*

## Layout# vc-issuer
2
SSI Verifiable Credential Issuer for GRIDS
3
​
4
## Deployment
5
  ```
6
  uportissuer:
7
    image: endimion13/grids-issuer:0.0.3d
8
    environment:
9
      NODE_ENV: "production"
10
      ENDPOINT: https://dss1.aegean.gr
11
      HTTPS_COOKIES: "true"
12
      BASE_PATH: "issuer"
13
      SENDER_ID: "IdPms001"
14
      RECEIVER_ID: "IdPms001"
15
      MEMCACHED_URL: memcached:11211
16
    ports:
17
      - 4000:3000
18
​
19
  memcached:
20
    image: sameersbn/memcached:1.5.6-2
21
    ports:
22
      - 11112:11211    
23
```
24
 
40
  

The "GRIDS-VC-ISSUER" microservice is implemented
via a Spring boot application.  As a result it adheres to the typical Spring boot structure:
- `src/main` contains the main logic of the application
- `src/test` contains the executed unit tests


# Deployment

---
The "GRIDS-VC-ISSUER" microservice is implemented via Spring Boot and is Dockerized in order to
facilitate its deployment, a typical Docker-compose file for its deployment would look as follows:
```
 
version: '2'
services:
  uportissuer:
  image: endimion13/grids-issuer:0.0.3d
  environment:
    NODE_ENV: "production"
    ENDPOINT: https://dss1.aegean.gr
    HTTPS_COOKIES: "true"
    BASE_PATH: "issuer"
    SENDER_ID: "IdPms001"
    RECEIVER_ID: "IdPms001"
    MEMCACHED_URL: memcached:11211
  ports:
    - 4000:3000

memcached:
  image: sameersbn/memcached:1.5.6-2
  ports:
    - 11112:11211    
```
 

# Further Reading and Documentation

---
If you want to learn more about the "GRIDS-VC-ISSUER" please read the material available at the official project [web page](https://www.grids-cef.eu/)

# Code

---

*Disclaimer: Although we tested the code extensively, the "GRIDS-VC-ISSUER" is a research
prototype that may contain bugs. We take no responsibility for and give no warranties in respect of using the code.*


