export interface Visitable<V> {
  accept<TR>(visitor: V): TR;
}
