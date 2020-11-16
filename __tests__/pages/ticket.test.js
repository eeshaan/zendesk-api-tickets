import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { getPage } from "next-page-tester";

describe("Individual ticket view page", () => {
  it("should be a non-empty page with a back button", async () => {
    const Page = await getPage({
      route: "/ticket?id=1",
    });

    render(Page);
    expect(screen.getByText("Back")).toBeInTheDocument();
  });
});
