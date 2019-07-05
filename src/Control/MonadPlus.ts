import { Generic1, Generic2 } from '../Generic';
import { MonadZero, MonadZero2 } from './MonadZero';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MonadPlus<m extends Generic1> extends MonadZero<m> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MonadPlus2<m extends Generic2> extends MonadZero2<m> {}
