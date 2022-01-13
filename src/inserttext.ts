import * as vscode from "vscode";


export function insertTextInFile(commandOutput: string) {
  const commandOutputSnippet = new vscode.SnippetString(commandOutput);
  if (!vscode.window.activeTextEditor) {
    vscode.window.showErrorMessage("Something went wrong, please report this issue");
    return new Error("Something went wrong, please report this issue");
  }
  vscode.window.activeTextEditor?.insertSnippet(commandOutputSnippet);
}
