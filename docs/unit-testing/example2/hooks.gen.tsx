import { generate } from '../client/commands';
import { Props, SampleComponent } from './sample-component';
import { fireEvent, RenderResult } from '@testing-library/react';
import { MOCKS } from './test';
// import { useState } from './hooks/state';
import * as useStateParent from './hooks/state';
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
    data.setup(() => {
      console.log('hello world');
    });

    data.setBase(
      {
        ...MOCKS.allFalse,
        onClick: data.spy()
      },
      {
        useState: [true, data.spy()]
      },
      'with all false and useState true'
    );

    data.setStateChanges((rendered, props, hooks, getElement) => ({
      'after clicking the button': () => {
        fireEvent.click(getElement.button());
      }
    }));

    data.setHooksChanges({
      'with useState false': {
        useState: [false, data.spy()]
      }
    });

    data.setTests((it, rendered, props, hooks, expectResult, queryElement) => {
      it('toggles state to false', () => {
        expectResult(hooks.useState[1]).toHaveBeenCalledWith(false);
      });

      it('toggles state to true', () => {
        expectResult(hooks.useState[1]).toHaveBeenCalledWith(true);
      });
    });
  }
);
