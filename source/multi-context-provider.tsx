import { Context, createElement, Fragment, FunctionComponent } from 'react';

export interface ContextPair {
  context: Context<any>,
  value: any;
}

export interface MultiContextProviderProps {
  children?: any,
  contexts: ContextPair[]
}

export const MultiContextProvider: FunctionComponent<MultiContextProviderProps> = ({ children, contexts }) => {
  if (!contexts || !Array.isArray(contexts) || contexts.length === 0) {
    return createElement(Fragment, null, children);
  }

  const { context, value } = contexts[0];

  return createElement(
    context.Provider,
    { value },
    createElement(MultiContextProvider, { contexts: contexts.slice(1) }, children)
  );
};
