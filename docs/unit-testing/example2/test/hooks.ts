import { useState as useStateHook } from '../hooks/state';

export const useState: ReturnType<typeof useStateHook> = [true, jest.fn()];
