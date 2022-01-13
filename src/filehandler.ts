import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { insertTextInFile } from "./inserttext";


const outputFileName: string = vscode.workspace.getConfiguration().get("vscode-pipe.outputFileName")!;

export async function createFileOpen(commandOutput: string) {
  let outputFilePath: string;

  // if no editor is open, the file is created in root workspace directory
  if (!vscode.window.activeTextEditor) {
    // if workspace exists
    if (vscode.workspace.workspaceFolders) {
      const workspacePath = vscode.workspace.workspaceFolders[0].uri.path;
      outputFilePath = workspacePath + outputFileName;
    } else {
      vscode.window.showErrorMessage("No file or workspace open");
      return new Error("No file or workspace open");
    }
  }
  // a editor file is currently open
  else {
    // if editor has no path, TODO
    const fileDirPath = path.dirname(
      vscode.window.activeTextEditor.document.uri.path
    );
    outputFilePath = path.join(fileDirPath, outputFileName);
  }
  fs.writeFileSync(outputFilePath, "");
  // it is impossible to error handle this openTextDocument function, tried everything
  vscode.workspace.openTextDocument(outputFilePath).then(async (document) => {
    await vscode.window.showTextDocument(document);
    insertTextInFile(commandOutput);
  });
}
