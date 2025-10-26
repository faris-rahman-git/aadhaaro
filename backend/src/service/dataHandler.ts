import { textract } from "./awsService";

export const detectText = async (buffer: Buffer) => {
  const params = {
    Document: { Bytes: buffer },
  };

  const result = await textract.detectDocumentText(params).promise();
  const text = result.Blocks?.filter((block) => block.BlockType === "LINE")
    .map((block) => block.Text)
    .join(" ");
  return text;
};
