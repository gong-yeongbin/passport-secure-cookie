import { Strategy } from 'passport-strategy';

type VerifyFunction = (token: string, done: (error: any, user?: any, info?: any) => void) => void;
type RequestVerifyFunction = (request: any, token: string, done: (error: any, user?: any, info?: any) => void) => void;

interface StrategyOptions {
  cookienameField?: string;
  passReqToCallback?: boolean;
}

export class SecureCookieStrategy extends Strategy {
  public readonly name: string = 'secure-cookie';
  private readonly _cookienameField: string;
  private readonly _passReqToCallback: boolean;
  private readonly _verify: VerifyFunction | RequestVerifyFunction;

  constructor(options: StrategyOptions, verify: VerifyFunction | RequestVerifyFunction) {
    super();
    this._cookienameField = options.cookienameField || 'access_token';
    this._passReqToCallback = options.passReqToCallback || false;
    this._verify = verify;
  }

  authenticate(request: any, options?: any): void {
    const token = request.cookies[this._cookienameField];

    const verified = (err: any, user?: any, info?: any) => {
      if (err) return this.error(err);
      if (!token) return this.fail(401);
      this.success({ access_token: token }, null);
    };

    if (this._passReqToCallback) {
      (this._verify as any)(request, token, verified);
    } else {
      (this._verify as any)(token, verified);
    }
  }
}
