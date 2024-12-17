import React from "react";
import{ render, screen } from "@testing-library/react";
import Login from "../src/components/Login";
import { describe } from "node:test";

describe("Login Component", () => {
    test("レンダリング", () => {
        render(<Login title = "ログイン" />);
        expect(screen.getByText("ログイン")).toBeInTheDocument();
    })
})