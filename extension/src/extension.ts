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

	const generateCommentDisposable = vscode.commands.registerCommand('parroty.generateComment', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			if (selectedText) {
				const pythonScriptPath = path.join(context.extensionPath, '../backend', 'main.py');
				const pythonProcess = spawn('python3', [pythonScriptPath, 'comment', selectedText]);

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
						editor.edit(editBuilder => {
							editBuilder.insert(selection.start, stdout);
						});
					} else {
						vscode.window.showErrorMessage(`Python script exited with code ${code}: ${stderr}`);
					}
				});

				pythonProcess.on('error', (err) => {
					console.error('Failed to start subprocess.', err);
					vscode.window.showErrorMessage('Failed to start Python process. Make sure "python3" is in your PATH.');
				});
			}
		}
	});

	const generateReadmeDisposable = vscode.commands.registerCommand('parroty.generateReadme', async () => {
		const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**');
		const fileList = files.map(file => file.path).join('\n');

		let keyFilesContent = '';
		const packageJsonFile = files.find(file => file.path.endsWith('package.json'));
		const requirementsTxtFile = files.find(file => file.path.endsWith('requirements.txt'));

		if (packageJsonFile) {
			const content = await vscode.workspace.fs.readFile(packageJsonFile);
			keyFilesContent += `package.json:\n${content.toString()}\n\n`;
		}

		if (requirementsTxtFile) {
			const content = await vscode.workspace.fs.readFile(requirementsTxtFile);
			keyFilesContent += `requirements.txt:\n${content.toString()}\n\n`;
		}

		const pythonScriptPath = path.join(context.extensionPath, '../backend', 'main.py');
		const pythonProcess = spawn('python3', [pythonScriptPath, 'readme', fileList, keyFilesContent]);

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

	context.subscriptions.push(disposable, generateCommentDisposable, generateReadmeDisposable);
}
export function deactivate() {}
