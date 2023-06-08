import { render, screen, fireEvent } from "@testing-library/react";
import BoardDetailPage from "../../../src/components/units/board/detail/BoardDetail.index";
import { FETCH_BOARD } from "../../../src/commons/hooks/queries/UseQueryFetchBoard";

describe("BoardDetailPage", () => {
  test("should call onClickDelete function when delete button is clicked", () => {
    const mockDeleteBoard = jest.fn();
    const mockRouterPush = jest.fn();

    jest.mock("next/router", () => ({
      useRouter: () => ({
        push: mockRouterPush,
        query: { boardId: "123" },
      }),
    }));

    jest.mock("@apollo/client", () => ({
      useMutation: () => [mockDeleteBoard],
      useQuery: () => ({
        data: { fetchBoard: { writer: "John" } },
        refetch: jest.fn(),
      }),
    }));

    render(<BoardDetailPage />);

    const deleteButton = screen.getByText("삭제하기");
    fireEvent.click(deleteButton);

    expect(mockDeleteBoard).toHaveBeenCalledWith({
      variables: { boardId: "123" },
    });
    expect(mockRouterPush).toHaveBeenCalledWith("/Board");
  });

  test("should call onClickLike function when like button is clicked", () => {
    const mockLikeBoard = jest.fn();
    const mockRouterPush = jest.fn();

    jest.mock("next/router", () => ({
      useRouter: () => ({
        push: mockRouterPush,
        query: { boardId: "123" },
      }),
    }));

    jest.mock("@apollo/client", () => ({
      useMutation: () => [mockLikeBoard],
      useQuery: () => ({
        data: { fetchBoard: { writer: "John" } },
        refetch: jest.fn(),
      }),
    }));

    render(<BoardDetailPage />);

    const likeButton = screen.getByLabelText("like-button");
    fireEvent.click(likeButton);

    expect(mockLikeBoard).toHaveBeenCalledWith({
      variables: { boardId: "123" },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: "123" },
        },
      ],
    });
  });

  test("should call onClickDisLike function when dislike button is clicked", () => {
    const mockDislikeBoard = jest.fn();
    const mockRouterPush = jest.fn();

    jest.mock("next/router", () => ({
      useRouter: () => ({
        push: mockRouterPush,
        query: { boardId: "123" },
      }),
    }));

    jest.mock("@apollo/client", () => ({
      useMutation: () => [mockDislikeBoard],
      useQuery: () => ({
        data: { fetchBoard: { writer: "John" } },
        refetch: jest.fn(),
      }),
    }));

    render(<BoardDetailPage />);

    const dislikeButton = screen.getByLabelText("dislike-button");
    fireEvent.click(dislikeButton);

    expect(mockDislikeBoard).toHaveBeenCalledWith({
      variables: { boardId: "123" },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: "123" },
        },
      ],
    });
  });
});
