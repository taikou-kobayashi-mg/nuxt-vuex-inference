import { Store } from 'vuex'
import Counter from './counter/index.d'

declare module 'vuex' {
  // ______________________________________________________
  //
  export type Getters<S, G> = {
    [K in keyof G]: (
      state: S,
      getters: G,
      rootState: RootState,
      rootGetters: RootGetters
    ) => G[K]
  }
  // ______________________________________________________
  //
  type Mutations<S, M> = { [K in keyof M]: (state: S, payload: M[K]) => void }
  // ______________________________________________________
  //
  type ExCommit<M> = <T extends keyof M>(type: T, payload?: M[T]) => void
  type ExDispatch<A> = <T extends keyof A>(type: T, payload?: A[T]) => any
  type ExContext<S, A, G, M> = {
    commit: ExCommit<M>
    dispatch: ExDispatch<A>
    state: S
    getters: G
    rootState: RootState
    rootGetters: RootGetters
  }
  type Actions<S, A, G = {}, M = {}> = {
    [K in keyof A]: (ctx: ExContext<S, A, G, M>, payload: A[K]) => any
  }
  // ______________________________________________________
  //
  export interface ExStore extends Store<RootState> {
    getters: RootGetters
    commit: ExCommit<RootMutations>
    dispatch: ExDispatch<RootActions>
  }
  export type StoreContext = ExContext<
    RootState,
    RootActions,
    RootGetters,
    RootMutations
  >
}
