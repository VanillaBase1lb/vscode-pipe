import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { insertTextInFile } from "./inserttext";


export async function createFileOpen(commandOutput: string) {
  const outputFileName: string = vscode.workspace
    .getConfiguration()
    .get("vscode-pipe.outputFileName")!;

  // if no editor is open, the file is created in root workspace directory
  if (!vscode.window.activeTextEditor) {
    vscode.window.showErrorMessage("No file open");
    return new Error("No file open");
  }
  const fileDirPath = path.dirname(
    vscode.window.activeTextEditor.document.uri.path
  );

  const outputFilePath = path.join(fileDirPath, outputFileName);
  fs.writeFileSync(outputFilePath, "");
  // it is impossible to error handle this openTextDocument function, I tried everything
  vscode.workspace.openTextDocument(outputFilePath).then(async (document) => {
    await vscode.window.showTextDocument(document);
    insertTextInFile(commandOutput);
  });
}
