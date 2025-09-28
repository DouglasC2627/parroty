// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "parroty" is now active!');

	const generateCommentDisposable = vscode.commands.registerCommand('parroty.generateComment', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			if (selectedText) {
				vscode.window.withProgress({
					location: vscode.ProgressLocation.Notification,
					title: "Parroty Generating Comment…",
					cancellable: false
				}, (progress) => {
					return new Promise<void>(resolve => {
						const config = vscode.workspace.getConfiguration('parroty');
						const apiKey = config.get<string>('geminiApiKey');

						if (!apiKey) {
							vscode.window.showErrorMessage('Please set your Gemini API key in the Parroty settings.');
							resolve();
							return;
						}

						const pythonScriptPath = path.join(context.extensionPath, 'backend', 'main.py');
						const pythonProcess = spawn('python3', [pythonScriptPath, 'comment', selectedText], {
							env: { ...process.env, GEMINI_API_KEY: apiKey }
						});

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
							if (code === 0 && !stdout.startsWith('Error:')) {
								editor.edit(editBuilder => {
									editBuilder.insert(selection.start, stdout);
								});
							} else {
								vscode.window.showErrorMessage(stdout || `Python script exited with code ${code}: ${stderr}`);
							}
							resolve();
						});

						pythonProcess.on('error', (err) => {
							console.error('Failed to start subprocess.', err);
							vscode.window.showErrorMessage('Failed to start Python process. Make sure "python3" is in your PATH.');
							resolve();
						});
					});
				});
			}
		}
	});

	const generateDocstringDisposable = vscode.commands.registerCommand('parroty.generateDocstring', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			if (selectedText) {
				vscode.window.withProgress({
					location: vscode.ProgressLocation.Notification,
					title: "Parroty Generating Docstring…",
					cancellable: false
				}, (progress) => {
					return new Promise<void>(resolve => {
						const config = vscode.workspace.getConfiguration('parroty');
						const apiKey = config.get<string>('geminiApiKey');

						if (!apiKey) {
							vscode.window.showErrorMessage('Please set your Gemini API key in the Parroty settings.');
							resolve();
							return;
						}

						const pythonScriptPath = path.join(context.extensionPath, 'backend', 'main.py');
						const pythonProcess = spawn('python3', [pythonScriptPath, 'docstring', selectedText], {
							env: { ...process.env, GEMINI_API_KEY: apiKey }
						});

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
							if (code === 0 && !stdout.startsWith('Error:')) {
								editor.edit(editBuilder => {
									editBuilder.insert(selection.start, stdout);
								});
							} else {
								vscode.window.showErrorMessage(stdout || `Python script exited with code ${code}: ${stderr}`);
							}
							resolve();
						});

						pythonProcess.on('error', (err) => {
							console.error('Failed to start subprocess.', err);
							vscode.window.showErrorMessage('Failed to start Python process. Make sure "python3" is in your PATH.');
							resolve();
						});
					});
				});
			}
		}
	});

	const generateReadmeDisposable = vscode.commands.registerCommand('parroty.generateReadme', async () => {
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Parroty Generating README…",
			cancellable: false
		}, (progress) => {
			return new Promise<void>(async resolve => {
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

				const config = vscode.workspace.getConfiguration('parroty');
				const apiKey = config.get<string>('geminiApiKey');

					if (!apiKey) {
						vscode.window.showErrorMessage('Please set your Gemini API key in the Parroty settings.');
						resolve();
						return;
					}

					const pythonScriptPath = path.join(context.extensionPath, 'backend', 'main.py');
					const pythonProcess = spawn('python3', [pythonScriptPath, 'readme', fileList, keyFilesContent], {
						env: { ...process.env, GEMINI_API_KEY: apiKey }
					});

					let stdout = '';
					let stderr = '';

					pythonProcess.stdout.on('data', (data) => {
						stdout += data.toString();
					});

					pythonProcess.stderr.on('data', (data) => {
						stderr += data.toString();
						console.error(`stderr: ${data}`);
					});

					pythonProcess.on('close', async (code) => {
						console.log(`child process exited with code ${code}`);
						if (code === 0 && !stdout.startsWith('Error:')) {
							const workspaceFolders = vscode.workspace.workspaceFolders;
							if (workspaceFolders) {
								const readmePath = vscode.Uri.joinPath(workspaceFolders[0].uri, 'README.md');
								await vscode.workspace.fs.writeFile(readmePath, Buffer.from(stdout, 'utf8'));
								vscode.window.showInformationMessage('README.md created successfully!');
							}
						} else {
							vscode.window.showErrorMessage(stdout || `Python script exited with code ${code}: ${stderr}`);
						}
						resolve();
					});

					pythonProcess.on('error', (err) => {
						console.error('Failed to start subprocess.', err);
						vscode.window.showErrorMessage('Failed to start Python process. Make sure "python3" is in your PATH.');
						resolve();
					});
			});
		});
	});

	context.subscriptions.push(generateCommentDisposable, generateDocstringDisposable, generateReadmeDisposable);
}
export function deactivate() {}
