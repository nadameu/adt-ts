import { Generic1, Type1 } from "../Generic";
import { Apply1 } from "./Apply";

export interface Bind1<f extends Generic1> extends Apply1<f> {
  bind: <a, b>(f: (_: a) => Type1<f, b>) => (fa: Type1<f, a>) => Type1<f, b>;
}
