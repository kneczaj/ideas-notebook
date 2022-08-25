import { generate } from '../client/commands';
import { Props, SampleComponent } from './sample-component';
import { fireEvent, RenderResult } from '@testing-library/react';
import { MOCKS } from './test';
import { useState } from './hooks/state';

const elements = (rendered: RenderResult) => ({
  button: () => rendered.queryByRole('button', { name: 'show D' }),
  a: () => rendered.queryByText('A'),
  b: () => rendered.queryByText('B'),
  c: () => rendered.queryByText('C'),
  d: () => rendered.queryByText('D')
});

type Hooks = {
  useState: ReturnType<typeof useState>;
};

generate<Props, Hooks, keyof ReturnType<typeof elements>>(
  __filename,
  SampleComponent,
  elements,
  data => {
    data.setBase(
      {
        ...MOCKS.allFalse,
        onClick: data.spy()
      },
      {
        useState: [true, data.spy()]
      }
    );

    data.setPropsChanges({
      'with A set': { a: true },
      'with B set': { b: true }
    });

    data.setStateChanges((rendered, props, hooks, getElement) => ({
      'after clicking the button': () => {
        fireEvent.click(getElement.button());
      }
    }));

    data.setTests((it, rendered, props, hooks, expectResult, queryElement) => {
      it('showing A', () => {
        expectResult(queryElement.a()).toBeInTheDocument();
      });
      it('showing B', () => {
        expectResult(queryElement.b()).toBeInTheDocument();
      });
      it('showing C', () => {
        expectResult(queryElement.c()).toBeInTheDocument();
      });
      it('showing button', () => {
        expectResult(queryElement.button()).toBeInTheDocument();
      });
      it('showing D', () => {
        expectResult(queryElement.d()).toBeInTheDocument();
      });
      it('calls onClick with `hello`', () => {
        expectResult(props.onClick).toHaveBeenCalledWith('hello');
      });
      it('toggles state', () => {
        expectResult(hooks.useState[1]).toHaveBeenCalledWith(false);
      });
    });
  }
);
