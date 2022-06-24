export interface Handler<a> {
  (value: a): void;
}

export interface Future<a> extends Handler<Handler<a>> {}
