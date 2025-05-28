# NODE CLIENT CRYPTO

## NPM INSTALL

- npm install --save-dev webpack webpack-cli webpack-dev-server
- npm install --save-dev babel-loader @babel/core @babel/preset-env
- npm install --save-dev sass-loader sass css-loader mini-css-extract-plugin
- npm install --save-dev html-webpack-plugin html-loader

## 인증서 검증을 비활성화

- npm config set strict-ssl false

## 암호 패턴 분석

> 서버를 거치지 않고, client에서만 암호화할 경우 -

1. 단방향 암호화 :

1) CRC32, SHA-256 -

- 암호화 : 평문으로 hash를 만들어서, sessionStorage에 등록
- 복호화 : 평문으로 hash를 만들어서, sessionStorage에 등록된 key나 value와 같은지 검사
- 문제점 : 평문이 client 코드에 노출됨

2. 양방향 암호화 :

1) AES -

- 암호화 : secret key와 평문으로 암호화해서, sessionStorage에 등록
- 복호화 : secret key와 평문으로 복호화 해서, sessionStorage에 등록된 key나 value와 같은지 검사
- 문제점 : secret key와 평문이 client 코드에 노출됨

2. bcryptjs -

- 암호화 : secret key와 평문으로 암호화해서, sessionStorage에 등록
- 복호화 : secret key와 평문을 비교하여sessionStorage에 등록된 key나 value와 같은지 true, false 결과값으로 확인 가능
- 문제점 : secret key와 평문이 client 코드에 노출됨

> 과제 :

- 브라우저 사용자가 암호화된 sessionStorage의 key와 value를 해석 할 수 없어야 됨
- 관리자는 서버를 거치지 않고, 암호화된 sessionStorage의 key와 value를 복호화 할 수 있어야됨
