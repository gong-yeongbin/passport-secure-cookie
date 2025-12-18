import { Strategy as PassportStrategy } from 'passport-strategy';

type VerifyFunction = (token: string, done: (error: any, user?: any, info?: any) => void) => void;
type RequestVerifyFunction<C = any> = (
  request: any,
  context: C,
  token: string,
  done: (error: any, user?: any, info?: any) => void,
) => void;

export interface StrategyOptions<C = any> {
  cookienameField?: string;
  passReqToCallback?: boolean;
  context?: C;
}

export class Strategy<C> extends PassportStrategy {
  public readonly name: string = 'secure-cookie';
  private readonly _cookienameField: string;
  private readonly _passReqToCallback: boolean;
  private readonly _context: C | null;
  private readonly _verify: VerifyFunction | RequestVerifyFunction;

  constructor(options: StrategyOptions<C>, verify: VerifyFunction | RequestVerifyFunction) {
    super();
    this._cookienameField = options.cookienameField || 'access_token';
    this._passReqToCallback = options.passReqToCallback || false;
    this._context = options.context ?? null;
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
      (this._verify as RequestVerifyFunction<C>)(request, this._context as C, token, verified);
    } else {
      (this._verify as VerifyFunction)(token, verified);
    }
  }
}
