import { Applicative } from './Applicative';
import { Bind } from './Bind';

export interface Monad<f> extends Applicative<f>, Bind<f> {}
