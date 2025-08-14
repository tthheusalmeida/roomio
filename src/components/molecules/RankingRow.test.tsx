import { render, screen } from "@testing-library/react";
import { RankingRow } from "./RankingRow";

const tableWrapper = (component: React.ReactElement) => {
  return (
    <table>
      <tbody>{component}</tbody>
    </table>
  );
};

describe("RankingRow component", () => {
  it("renders position, name, and score correctly", () => {
    render(
      tableWrapper(
        <RankingRow position={4} name="Alice" userId="user123" score={50} />
      )
    );

    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("shows a medal for top 3 positions", () => {
    const { container: first } = render(
      tableWrapper(
        <RankingRow position={1} name="Bob" userId="u1" score={100} />
      )
    );
    const { container: second } = render(
      tableWrapper(
        <RankingRow position={2} name="Carol" userId="u2" score={90} />
      )
    );
    const { container: third } = render(
      tableWrapper(
        <RankingRow position={3} name="Dave" userId="u3" score={80} />
      )
    );
    const { container: fourth } = render(
      tableWrapper(
        <RankingRow position={4} name="Eve" userId="u4" score={70} />
      )
    );

    expect(first.querySelector("svg")).toBeInTheDocument();
    expect(second.querySelector("svg")).toBeInTheDocument();
    expect(third.querySelector("svg")).toBeInTheDocument();

    expect(fourth.querySelector("svg")).not.toBeInTheDocument();
  });

  it("truncates userId if name is missing and ID is long", () => {
    const longId = "abcdefghijklmno";
    render(
      tableWrapper(
        <RankingRow position={5} name="" userId={longId} score={30} />
      )
    );

    expect(screen.getByText(/^abcd\.\.\.mno$/)).toBeInTheDocument();
  });

  it("shows userId fully if short and name is missing", () => {
    const shortId = "abc123";
    render(
      tableWrapper(
        <RankingRow position={6} name="" userId={shortId} score={20} />
      )
    );

    expect(screen.getByText(shortId)).toBeInTheDocument();
  });
});
