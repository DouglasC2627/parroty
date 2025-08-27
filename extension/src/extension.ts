// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "parroty" is now active!');

	const disposable = vscode.commands.registerCommand('parroty.helloWorld', () => {
		const pythonScriptPath = path.join(context.extensionPath, '../backend', 'main.py');
		// Use 'python3' which is more standard. Add error handling for spawn.
		const pythonProcess = spawn('python3', [pythonScriptPath]);

		let stdout = '';
		let stderr = '';

		pythonProcess.stdout.on('data', (data) => {
			stdout += data.toString();
		});

		pythonProcess.stderr.on('data', (data) => {
			stderr += data.toString();
			console.error(`stderr: ${data}`);
		});

		pythonProcess.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
			if (code === 0) {
				vscode.window.showInformationMessage(stdout);
			} else {
				vscode.window.showErrorMessage(`Python script exited with code ${code}: ${stderr}`);
			}
		});

		pythonProcess.on('error', (err) => {
			console.error('Failed to start subprocess.', err);
			vscode.window.showErrorMessage('Failed to start Python process. Make sure "python3" is in your PATH.');
		});
	});

	context.subscriptions.push(disposable);
}
export function deactivate() {}
