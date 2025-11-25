# passport-secure-cookie

커스텀 Passport Strategy 패키지로, 안전한 쿠키를 기반 인증을 Node.js/Express 프로젝트에 적용할 수 있습니다.

## 특징

- Passport.js 전략 확장 : Express에서 `passport.use()`로 바로 등록
- Secure Cookie 기반 인증 : HTTP(S) 환경에서 쿠키를 통해 사용자 검증
- TypeScript 지원

## 설치

```npm install passport-secure-cookie```
```pnpm add passport-secure-cookie```

## 옵션

- `cookienameField`: 검사할 쿠키명 (기본값: `'access_token'`)
- `passReqToCallback`: 콜백에 `req` 객체 전달 여부(기본값: `false`)

## 라이선스

MIT

---

## 참고

- [Passport.js 공식 문서](https://www.passportjs.org/)
- [Express 공식 문서](https://expressjs.com/)