import * as vscode from "vscode";
import { exec } from "child_process";
import { createFileOpen } from "./filehandler";


export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vscode-pipe" is now active!');

  let disposable = vscode.commands.registerCommand("vscode-pipe.pipe", () => {
    let execCommand = (shellCommand: string) => {
      exec(shellCommand, (error, stdout, stderr) => {
        if (error) {
          console.log(error.message);
        }
        if (stderr) {
          console.log(stderr);
        }
        createFileOpen(stdout);
      });
    };

    vscode.window.showInputBox({
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
