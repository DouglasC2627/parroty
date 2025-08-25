// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "parroty" is now active!');

	const disposable = vscode.commands.registerCommand('parroty.helloWorld', () => {
		const pythonScriptPath = path.join(context.extensionPath, '.._backend', 'main.py');
		const pythonProcess = spawn('python', [pythonScriptPath]);

		pythonProcess.stdout.on('data', (data) => {
			vscode.window.showInformationMessage(data.toString());
		});

		pythonProcess.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
			vscode.window.showErrorMessage(`Error: ${data}`);
		});

		pythonProcess.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
