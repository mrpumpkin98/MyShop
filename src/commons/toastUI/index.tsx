import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Modal } from "antd";
import { MutableRefObject, useEffect } from "react";
import { UseMutationUploadFile } from "../../commons/hooks/mutations/UseMutationUploadFile";
import { useMutation } from "@apollo/client";

interface IEditorPageProps {
  contentsRef: MutableRefObject<any> | undefined;
  onChangeContents: (text: any) => void;
  initialValue: string | undefined;
}

function ToastEditor(props: IEditorPageProps) {
  const [uploadFile] = UseMutationUploadFile();

  return (
    <Editor
      placeholder="상품을 설명해주세요."
      previewStyle="vertical"
      height="auto"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      onChange={props.onChangeContents}
      ref={props.contentsRef}
      autofocus={false}
      language="ko-KR"
      initialValue={props.initialValue}
      hideModeSwitch={true}
      hooks={{
        addImageBlobHook: async (blob, callback) => {
          const result = await uploadFile({ variables: { file: blob } });
          callback(
            `https://storage.googleapis.com/${result?.data?.uploadFile?.url}`
          );
        },
      }}
    />
  );
}

export default ToastEditor;
