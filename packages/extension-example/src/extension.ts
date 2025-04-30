import * as vscode from 'vscode';
import { SidebarViewProvider } from './views/SidebarViewProvider';

export function activate(context: vscode.ExtensionContext) {

    const sidebarViewProvider = new SidebarViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            SidebarViewProvider.viewType, // 页面 ID
            sidebarViewProvider, // 页面实例
            {webviewOptions: { retainContextWhenHidden: true }} // 界面不可见时仍然保留内容
        )
    );

    const disposable = vscode.commands.registerCommand('extension-example.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from extension-example!');
    });
    context.subscriptions.push(disposable);
}

export function deactivate() { }
