import * as  io from 'socket.io-client';
import env from "../configs/env";


export const Socket = io.connect(env.REACT_APP_BASE_URL, {});   