import { ChangeEvent } from "react";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: any;
  updateBoardInput?: any;
}

export interface myVariables {
  contents?: string;
  title?: string;
  boardId?: string;
}

export interface IBoardWriteUIProps {
  onClickSubmit: () => void;
  onClickUpdate: () => void;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickCancel: () => void;
  onChangeYoutubeUrl: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeAddressDetail: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickAddressSearch: () => void;
  writerError: string;
  passwordError: string;
  titleError: string;
  contentsError: string;
  isEdit: boolean;
  data?: any;
  inputRef?: any;
  Active: boolean;
  isOpen: boolean;
  zipcode: string;
  address: string;
}

export interface ISubmitButtonProps {
  Active: boolean;
}
