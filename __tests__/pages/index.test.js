import { render, screen } from "@testing-library/react";
import { getPage } from "next-page-tester";

describe("List view page", () => {
  it("should exist at the index route", async () => {
    const Page = await getPage({
      route: "/index",
    });

    expect(Page !== null);
  });

  it("should render a list of all tickets", async () => {
    const Page = await getPage({
      route: "/index",
    });

    render(Page);
    expect(screen.getByText("Subject")).toBeInTheDocument();
  });
});
