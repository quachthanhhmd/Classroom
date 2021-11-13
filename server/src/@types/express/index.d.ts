import { Request, Response } from "express";
import { HttpResponse } from './../../exceptions/http-response.exception';

declare global {
  namespace Express {
    interface Response {
      composer: HttpResponse;
    }
    
  }
}