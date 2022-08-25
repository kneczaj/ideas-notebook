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

  describe('base', () => {
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

    it('not showing A', () => {
      expect(queryElement.a()).not.toBeInTheDocument();
    });

    it('not showing B', () => {
      expect(queryElement.b()).not.toBeInTheDocument();
    });

    it('not showing C', () => {
      expect(queryElement.c()).not.toBeInTheDocument();
    });

    it('showing button', () => {
      expect(getElement.button()).toBeInTheDocument();
    });

    it('showing D', () => {
      expect(getElement.d()).toBeInTheDocument();
    });

    it('not calls onClick with `hello`', () => {
      expect(props_onClick).not.toHaveBeenCalledWith('hello');
    });

    it('not toggles state', () => {
      expect(hooks_useState_1).not.toHaveBeenCalledWith(false);
    });

    describe('after clicking the button', () => {
      beforeEach(() => {
        {
          fireEvent.click(getElement.button());
        }
      });

      it('not showing A', () => {
        expect(queryElement.a()).not.toBeInTheDocument();
      });

      it('not showing B', () => {
        expect(queryElement.b()).not.toBeInTheDocument();
      });

      it('not showing C', () => {
        expect(queryElement.c()).not.toBeInTheDocument();
      });

      it('showing button', () => {
        expect(getElement.button()).toBeInTheDocument();
      });

      it('showing D', () => {
        expect(getElement.d()).toBeInTheDocument();
      });

      it('calls onClick with `hello`', () => {
        expect(props_onClick).toHaveBeenCalledWith('hello');
      });

      it('toggles state', () => {
        expect(hooks_useState_1).toHaveBeenCalledWith(false);
      });
    });

    describe('with A set', () => {
      const props2: any = {
        ...props1,
        a: true
      };

      beforeEach(() => {
        cleanup();
        rendered = render(<SampleComponent {...props2} />);
      });

      it('showing A', () => {
        expect(getElement.a()).toBeInTheDocument();
      });

      it('not showing B', () => {
        expect(queryElement.b()).not.toBeInTheDocument();
      });

      it('not showing C', () => {
        expect(queryElement.c()).not.toBeInTheDocument();
      });

      it('not showing button', () => {
        expect(queryElement.button()).not.toBeInTheDocument();
      });

      it('not showing D', () => {
        expect(queryElement.d()).not.toBeInTheDocument();
      });

      it('not calls onClick with `hello`', () => {
        expect(props_onClick).not.toHaveBeenCalledWith('hello');
      });

      it('not toggles state', () => {
        expect(hooks_useState_1).not.toHaveBeenCalledWith(false);
      });

      describe('with B set', () => {
        const props3: any = {
          ...props2,
          b: true
        };

        beforeEach(() => {
          cleanup();
          rendered = render(<SampleComponent {...props3} />);
        });

        it('showing A', () => {
          expect(getElement.a()).toBeInTheDocument();
        });

        it('not showing B', () => {
          expect(queryElement.b()).not.toBeInTheDocument();
        });

        it('not showing C', () => {
          expect(queryElement.c()).not.toBeInTheDocument();
        });

        it('not showing button', () => {
          expect(queryElement.button()).not.toBeInTheDocument();
        });

        it('not showing D', () => {
          expect(queryElement.d()).not.toBeInTheDocument();
        });

        it('not calls onClick with `hello`', () => {
          expect(props_onClick).not.toHaveBeenCalledWith('hello');
        });

        it('not toggles state', () => {
          expect(hooks_useState_1).not.toHaveBeenCalledWith(false);
        });
      });
    });

    describe('with B set', () => {
      const props2: any = {
        ...props1,
        b: true
      };

      beforeEach(() => {
        cleanup();
        rendered = render(<SampleComponent {...props2} />);
      });

      it('not showing A', () => {
        expect(queryElement.a()).not.toBeInTheDocument();
      });

      it('showing B', () => {
        expect(getElement.b()).toBeInTheDocument();
      });

      it('not showing C', () => {
        expect(queryElement.c()).not.toBeInTheDocument();
      });

      it('not showing button', () => {
        expect(queryElement.button()).not.toBeInTheDocument();
      });

      it('not showing D', () => {
        expect(queryElement.d()).not.toBeInTheDocument();
      });

      it('not calls onClick with `hello`', () => {
        expect(props_onClick).not.toHaveBeenCalledWith('hello');
      });

      it('not toggles state', () => {
        expect(hooks_useState_1).not.toHaveBeenCalledWith(false);
      });
    });
  });
});
