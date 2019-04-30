/* eslint-disable @typescript-eslint/no-empty-interface */
import { Prop1, Prop2 } from '../Types';
import { MonadZero1, MonadZero2 } from './MonadZero';

export interface MonadPlus1<f extends Prop1> extends MonadZero1<f> {}
export interface MonadPlus2<f extends Prop2> extends MonadZero2<f> {}
