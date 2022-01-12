import * as vscode from "vscode";


export async function createFileOpen(outputpipe: string) {
  const we = new vscode.WorkspaceEdit();

  // @ts-ignore
  const thisWorkspace = vscode.workspace.workspaceFolders[0].uri.toString();

  if (thisWorkspace === undefined) {
    vscode.window.showInformationMessage("You need to be inside a workspace!");
  }

  const newUri = vscode.Uri.parse(`${thisWorkspace}/pipe.output`);

  we.createFile(newUri, { ignoreIfExists: false, overwrite: true });

  await vscode.workspace.applyEdit(we);

  await vscode.workspace.openTextDocument(newUri).then(async (document) => {
    await vscode.window.showTextDocument(document);
    const snippetpipe = new vscode.SnippetString(outputpipe);
    vscode.window.activeTextEditor?.insertSnippet(snippetpipe);
  });
}
