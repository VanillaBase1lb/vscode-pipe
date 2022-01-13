import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { insertTextInFile } from "./inserttext";


export async function createFileOpen(commandOutput: string) {
  if (
    vscode.workspace.getConfiguration().get("vscode-pipe.createNewFile") ===
    false
  ) {
    insertTextInFile(commandOutput);
    return;
  }
  const outputFileName: string = vscode.workspace
    .getConfiguration()
    .get("vscode-pipe.outputFileName")!;

  const fileDirPath = path.dirname(
    vscode.window.activeTextEditor!.document.uri.path
  );

  const outputFilePath = path.join(fileDirPath, outputFileName);
  fs.writeFileSync(outputFilePath, "");
  // it is impossible to error handle this openTextDocument function, I tried everything
  vscode.workspace.openTextDocument(outputFilePath).then(async (document) => {
    await vscode.window.showTextDocument(document);
    insertTextInFile(commandOutput);
  });
}
