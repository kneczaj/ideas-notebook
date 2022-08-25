import React from 'react';
import {
  RenderResult,
  render,
  cleanup,
  fireEvent
} from '@testing-library/react';
import { generate } from '../client/commands';
import { Props, SampleComponent } from './sample-component';
import { MOCKS } from './test';
import { useState } from './hooks/state';
import * as useStateParent from './hooks/state';

describe('SampleComponent', () => {
  let rendered: RenderResult;

  const getElement = {
    button: () => rendered.getByRole('button', { name: 'show D' }),
    a: () => rendered.getByText('A'),
    b: () => rendered.getByText('B'),
    c: () => rendered.getByText('C'),
    d: () => rendered.getByText('D')
  };

  const queryElement = {
    button: () => rendered.queryByRole('button', { name: 'show D' }),
    a: () => rendered.queryByText('A'),
    b: () => rendered.queryByText('B'),
    c: () => rendered.queryByText('C'),
    d: () => rendered.queryByText('D')
  };

  describe('with all false and useState true', () => {
    const props1: any = {
      ...MOCKS.allFalse,
      onClick: jest.fn()
    };
    const hooks1 = {
      useState: [true, jest.fn()]
    };

    let props_onClick: jest.SpyInstance<any, any>;
    let hooks_useState: jest.SpyInstance<any, any>;
    let hooks_useState_1: jest.SpyInstance<any, any>;

    beforeEach(() => {
      rendered = render(<SampleComponent {...props1} />);

      props_onClick = jest
        .spyOn(props1, 'onClick')
        .mockImplementation((...args: any[]) => undefined as any);
      hooks_useState = jest
        .spyOn(useStateParent, 'useState')
        .mockImplementation((...args: any[]) => hooks1.useState as any);
      hooks_useState_1 = (jest.spyOn(
        hooks1.useState,
        '1' as any
      ) as any).mockImplementation((...args: any[]) => undefined as any);
    });
    afterEach(() => {
      props_onClick.mockClear();
      hooks_useState.mockClear();
      hooks_useState_1.mockClear();
    });

    it('not toggles state to false', () => {
      expect(hooks_useState_1).not.toHaveBeenCalledWith(false);
    });

    it('not toggles state to true', () => {
      expect(hooks_useState_1).not.toHaveBeenCalledWith(true);
    });

    describe('after clicking the button', () => {
      beforeEach(() => {
        {
          fireEvent.click(getElement.button());
        }
      });

      it('toggles state to false', () => {
        expect(hooks_useState_1).toHaveBeenCalledWith(false);
      });

      it('not toggles state to true', () => {
        expect(hooks_useState_1).not.toHaveBeenCalledWith(true);
      });
    });

    describe('with useState false', () => {
      const hooks2 = {
        useState: [false, jest.fn()]
      };

      let hooks_useState: jest.SpyInstance<any, any>;
      let hooks_useState_1: jest.SpyInstance<any, any>;

      beforeEach(() => {
        hooks_useState = jest
          .spyOn(useStateParent, 'useState')
          .mockImplementation((...args: any[]) => hooks2.useState as any);
        hooks_useState_1 = (jest.spyOn(
          hooks2.useState,
          '1' as any
        ) as any).mockImplementation((...args: any[]) => undefined as any);
      });
      afterEach(() => {
        hooks_useState.mockClear();
        hooks_useState_1.mockClear();
      });

      it('not toggles state to false', () => {
        expect(hooks_useState_1).not.toHaveBeenCalledWith(false);
      });

      it('not toggles state to true', () => {
        expect(hooks_useState_1).not.toHaveBeenCalledWith(true);
      });

      describe('after clicking the button', () => {
        beforeEach(() => {
          {
            fireEvent.click(getElement.button());
          }
        });

        it('not toggles state to false', () => {
          expect(hooks_useState_1).not.toHaveBeenCalledWith(false);
        });

        it('toggles state to true', () => {
          expect(hooks_useState_1).toHaveBeenCalledWith(true);
        });
      });
    });
  });
});
