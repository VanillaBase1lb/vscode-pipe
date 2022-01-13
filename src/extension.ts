import * as vscode from "vscode";
import * as path from "path";
import { exec } from "child_process";
import { createFileOpen } from "./filehandler";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("vscode-pipe.pipe", () => {
    if (!vscode.window.activeTextEditor) {
      vscode.window.showErrorMessage("No file opened, terminating!");
      return new Error("No file opened, terminating!");
    }
    const fileDirPath = path.dirname(
      vscode.window.activeTextEditor.document.uri.path
    );
    const shellRelativePwd: string = vscode.workspace
      .getConfiguration()
      .get("vscode-pipe.shellRelativePwd")!;
    const shellPwd = fileDirPath.concat(shellRelativePwd);

    let execCommand = (shellCommand: string) => {
      exec(shellCommand, { cwd: shellPwd }, (error, stdout, stderr) => {
        if (error) {
          vscode.window.showErrorMessage(error.message);
          return new Error(error.message);
        }
        if (stderr) {
          vscode.window.showErrorMessage(stderr);
          return new Error(stderr);
        }
        createFileOpen(stdout);
      });
    };

    vscode.window
      .showInputBox({
        placeHolder: "Your shell command. Eg.: ls -al",
      })
      .then((value) => {
        if (!value) {
          throw new Error("input cancelled");
        }
        execCommand(value);
      });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
