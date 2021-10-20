import { HttpResponse } from './../../exceptions/http-response.exception';

declare global {
    namespace Express {
      interface Response  {
          composer: HttpResponse;
      }
    }
  }