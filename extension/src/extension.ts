import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as path from 'path';

// Helper to get the platform-specific python executable path within the venv
function getVenvPython(extensionPath: string): string {
    const venvDir = path.join(extensionPath, 'backend', 'venv');
    return process.platform === 'win32'
        ? path.join(venvDir, 'Scripts', 'python.exe')
        : path.join(venvDir, 'bin', 'python');
}

// Helper to check if the python environment is ready
async function isPythonReady(pythonExecutable: string): Promise<boolean> {
    try {
        await vscode.workspace.fs.stat(vscode.Uri.file(pythonExecutable));
        return true;
    } catch {
        return false;
    }
}

// Helper to show the setup prompt
function promptForSetup() {
    const setupAction = 'Setup Python Environment';
    vscode.window.showInformationMessage(
        'The Parroty extension needs to set up a Python environment to work. This is a one-time setup.',
        setupAction
    ).then(selection => {
        if (selection === setupAction) {
            vscode.commands.executeCommand('parroty.setupPython');
        }
    });
}

// The main setup function
async function setupPythonEnvironment(context: vscode.ExtensionContext, pythonExecutable: string): Promise<boolean> {
    return vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Setting up Parroty's Python environment…",
        cancellable: false
    }, async (progress): Promise<boolean> => {
        try {
            progress.report({ message: "Finding system Python..." });
            const systemPython = await findSystemPython();

            progress.report({ message: "Creating virtual environment..." });
            const venvDir = path.join(context.extensionPath, 'backend', 'venv');
            await runCommand(systemPython, ['-m', 'venv', venvDir]);

            progress.report({ message: "Installing dependencies..." });
            const requirementsPath = path.join(context.extensionPath, 'backend', 'requirements.txt');
            await runCommand(pythonExecutable, ['-m', 'pip', 'install', '-r', requirementsPath]);

            vscode.window.showInformationMessage('Parroty Python environment setup complete!');
            return true;
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to set up Python environment: ${error.message}`);
            return false;
        }
    });
}

// Helper to find python3 or python
async function findSystemPython(): Promise<string> {
    for (const python of ['python3', 'python']) {
        try {
            await runCommand(python, ['--version']);
            return python;
        } catch (error) {
            // continue
        }
    }
    throw new Error('Python is not installed or not in your PATH. Please install Python 3.');
}

// Helper to run a command and return a promise
function runCommand(command: string, args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args);
        let stderr = '';
        process.stderr.on('data', (data) => stderr += data.toString());
        process.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command '${command} ${args.join(' ')}' failed with exit code ${code}. Stderr: ${stderr}`));
            }
        });
        process.on('error', (err) => reject(err));
    });
}


export async function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "parroty" is now active!');

    const pythonExecutable = getVenvPython(context.extensionPath);
    let pythonIsReady = await isPythonReady(pythonExecutable);

    if (!pythonIsReady) {
        promptForSetup();
    }

    const setupCommand = vscode.commands.registerCommand('parroty.setupPython', async () => {
        pythonIsReady = await setupPythonEnvironment(context, pythonExecutable);
    });
    context.subscriptions.push(setupCommand);


    const generateCommentDisposable = vscode.commands.registerCommand('parroty.generateComment', () => {
        if (!pythonIsReady) {
            promptForSetup();
            return;
        }
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
                        const pythonProcess = spawn(pythonExecutable, [pythonScriptPath, 'comment', selectedText], {
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
                            vscode.window.showErrorMessage('Failed to start Python process. Your environment might be corrupted. Please run "Parroty: Setup Python Environment" again.');
                            resolve();
                        });
                    });
                });
            }
        }
    });

    const generateDocstringDisposable = vscode.commands.registerCommand('parroty.generateDocstring', () => {
        if (!pythonIsReady) {
            promptForSetup();
            return;
        }
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
                        const pythonProcess = spawn(pythonExecutable, [pythonScriptPath, 'docstring', selectedText], {
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
                            vscode.window.showErrorMessage('Failed to start Python process. Your environment might be corrupted. Please run "Parroty: Setup Python Environment" again.');
                            resolve();
                        });
                    });
                });
            }
        }
    });

    const generateReadmeDisposable = vscode.commands.registerCommand('parroty.generateReadme', async () => {
        if (!pythonIsReady) {
            promptForSetup();
            return;
        }
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
                const pythonProcess = spawn(pythonExecutable, [pythonScriptPath, 'readme', fileList, keyFilesContent], {
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
                    vscode.window.showErrorMessage('Failed to start Python process. Your environment might be corrupted. Please run "Parroty: Setup Python Environment" again.');
                    resolve();
                });
            });
        });
    });

    context.subscriptions.push(generateCommentDisposable, generateDocstringDisposable, generateReadmeDisposable);
}

export function deactivate() {}