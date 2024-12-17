import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../../src/components/Login';

describe("Login Component", () => {
  test("レンダリング", () => {
    render(<Login title="ログイン" />);
    const loginElements = screen.getAllByText("ログイン");
    expect(loginElements.length).toBeGreaterThan(0);
  });
});
