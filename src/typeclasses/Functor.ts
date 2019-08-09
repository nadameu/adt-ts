import { Generic1, Identified1, Type1 } from "../Generic";

export interface Functor1<f extends Generic1> extends Identified1<f> {
  map: <a, b>(f: (_: a) => b) => (fa: Type1<f, a>) => Type1<f, b>;
}
